/// <reference types="chrome"/>
//
//
type WebRequestListener = (d: chrome.webRequest.WebRequestBodyDetails) => void;
function blockListener(details: chrome.webRequest.WebRequestBodyDetails): void {
    console.log(details.url.toString());
}

// Initial empty request filter.
chrome.webRequest.onBeforeRequest.addListener(
    blockListener,
    {urls: []},
    []
);

/**
 * Create a new web request filter when new sessions are started.
 **/
function makeWebRequestListener(sites: string[]): [WebRequestListener, chrome.webRequest.RequestFilter] {
    return [blockListener, {urls: sites}]
}

chrome.storage.onChanged.addListener((changes) => {
  for (let [key, { newValue }] of Object.entries(changes)) {
      if (key === 'session') {
          chrome.webRequest.onBeforeRequest.removeListener(blockListener);
          const [listener, filter] = makeWebRequestListener(newValue.sites);
          chrome.webRequest.onBeforeRequest.addListener(listener, filter);
      }
  }
});
