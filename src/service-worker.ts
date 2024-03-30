/// <reference types="chrome"/>
//
//
type WebRequestListener = (d: chrome.webRequest.WebRequestBodyDetails) => void;

// Global variable tracking all URLs that we have in the set.
let urls = new Set([]);

function siteKey(u: URL): string {
  return `watch-me.${u.hostname}`
}

function blockListener(details: chrome.webRequest.WebRequestBodyDetails): void {

  // Parse latest URLs that we've seen through this function and cache them, only alert if not 
  // present in the cache, clear out the cache after a certain amount of time.
  console.log("Received request for", details.url.toString());
  const seen = new URL(details.url.toString());

  // Get the URL hash table
  chrome.storage.sync.get(siteKey(seen), (o) => {
    // Have we seen this before and we're within the 5 second window? Return early
    if (o[siteKey(seen)] !== undefined) {
      return;
    }

    // Send a notification
    let notification: chrome.notifications.NotificationOptions = {
      message: `Shouldn't be visiting ${seen.origin}`,
      iconUrl: 'https://www.google.com/favicon.ico',
      title: "Violation Detected",
      type: "basic"
    }

    chrome.notifications.create(`notification-${Date.now()}`, notification)
    // Set our site key - using computed property with site key
    chrome.storage.sync.set({[`${siteKey(seen)}`]: 1});
    // Set the timeout to delete it.
    setTimeout(() => chrome.storage.sync.remove(siteKey(seen)), 5000);
  });


}

// Read the value from storage, and check to see if less than now.
function shouldClearSession() {
  chrome.storage.sync.get('session').then(function(o) {
    // The session object should have the key that we are interested in it.
    const session = o.session;

    // If the session endAt is greater than now, clear the session.
    const endAt = new Date(session.endAt);
    if (endAt.getTime() >= new Date().getTime()) {
      chrome.storage.sync.remove('session', function() {
        console.log("removed session, session is complete")
      })
      // With the session clear, remove the listener that is listening for site requests as well.
      chrome.webRequest.onBeforeRequest.removeListener(blockListener)
    } else {
      setTimeout(shouldClearSession, 1000);
    }
  });
}
shouldClearSession();

/**
 * Create a new web request filter when new sessions are started.
 **/
function makeWebRequestListener(sites: string[]): [WebRequestListener, chrome.webRequest.RequestFilter, string[]] {
    return [blockListener, {urls: sites}, ['blocking']]
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
