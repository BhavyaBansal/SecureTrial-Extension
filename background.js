// background.js

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({ interactions: [], blockedCookies: [] });
});

chrome.webNavigation.onCompleted.addListener((details) => {
  chrome.tabs.sendMessage(details.tabId, {
    action: "trackInteraction",
    url: details.url,
  });
});


