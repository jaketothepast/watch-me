/// <reference types="chrome"/>
//
//
type WebRequestListener = (d: chrome.webRequest.WebRequestBodyDetails) => void;
function blockListener(details: chrome.webRequest.WebRequestBodyDetails): void {
    console.log(details.url.toString());
}

// Read the value from storage, and check to see if less than now.
function shouldClearSession() {
  chrome.storage.sync.get('session').then(function(o) {
    // The session object should have the key that we are interested in it.
    const session = o.session;
    console.log("Retrieved:", session);

    // If the session endAt is greater than now, clear the session.
    const endAt = new Date(session.endAt);
    if (endAt.getTime() >= new Date().getTime()) {
      chrome.storage.sync.remove('session', function() {
        console.log("removed session, session is complete")
      })
    } else {
      setTimeout(shouldClearSession, 1000);
    }
  });
}
shouldClearSession();


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
