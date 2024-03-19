/// <reference types="chrome"/>
chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
      console.log(details.url.toString())
    },
    {urls: ['https://*/']},
    []
);