
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({
    interactions: [],
    blockedCookies: [],
    agentData: [],
    partitions: {},
  });
});

chrome.webNavigation.onCompleted.addListener((details) => {
  chrome.tabs.sendMessage(details.tabId, {
    action: "trackInteraction",
    url: details.url,
  });
});

chrome.webRequest.onBeforeSendHeaders.addListener(
  (details) => {
    for (const header of details.requestHeaders) {
      if (header.name.toLowerCase() === "user-agent") {
        const userAgent = header.value;
        // console.log("Background Script: User-Agent captured:", userAgent);
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
          const activeTab = tabs[0];

          // Check if activeTab exists before accessing its id
          if (activeTab) {
            chrome.tabs.sendMessage(activeTab.id, {
              action: "set_user_agent",
              userAgent,
            });
          } else {
            console.error(
              "Active tab is undefined. Cannot send User-Agent string."
            );
          }
        });

        break;
      }
    }
    return { requestHeaders: details.requestHeaders };
  },
  { urls: ["<all_urls>"] },
  ["requestHeaders"]
);

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getLocation") {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          // console.log(location);
          chrome.storage.local.set({ location: location });
          sendResponse(location);
        },
        (error) => {
          console.error(`Error getting location: ${error.message}`);
          sendResponse(null);
        }
      );
    } else {
      console.error("Geolocation is not supported");
      sendResponse(null);
    }
    return true;
  }
});
