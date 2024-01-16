// // content.js

// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//   if (request.action === "trackInteraction") {
//     if (request.url !== "about:blank") {
//       const interactionData = {
//         url: request.url,
//         timestamp: new Date().toISOString(),
//         interactionCount: 1,
//         duration: 0,
//       };

//       chrome.storage.local.get("interactions", (data) => {
//         const interactions = data.interactions || [];
//         const lastInteractionIndex = interactions.findIndex(
//           (interaction) => interaction.url === request.url
//         );
//         if (lastInteractionIndex !== -1) {
//           // Update existing visit with end timestamp and calculate duration
//           const lastInteraction = interactions[lastInteractionIndex];
//           lastInteraction.endTimestamp = interactionData.timestamp;
//           lastInteraction.duration =
//             new Date(lastInteraction.endTimestamp) -
//             new Date(lastInteraction.timestamp);
//           lastInteraction.interactionCount += 1;
//         } else {
//           // Add a new visit
//           interactionData.interactionCount = 1;
//           interactionData.duration = 0;
//           interactions.push(interactionData);
//         }
//         // interactions.push(interactionData);
//         chrome.storage.local.set({ interactions: interactions });
//       });
//     }
//   } else if (request.action === "set_user_agent") {
//     // alert(request.userAgent);
//     chrome.storage.local.set({ agentData: request.userAgent });
//   }
// });

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "trackInteraction") {
    if (request.url !== "about:blank") {
      const domain = getCurrentDomain(request.url);
      const interactionData = {
        url: request.url,
        domain: domain,
        websiteName: window.location.hostname, // Add website name here
        timestamp: new Date().toISOString(),
        interactionCount: 1,
        duration: 0,
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        cookiesEnabled: navigator.cookieEnabled,
      };

      const performanceTiming = window.performance.timing;
      const loadingTime =
        performanceTiming.loadEventEnd - performanceTiming.navigationStart;
      interactionData.loadingTime = loadingTime;

      chrome.storage.local.get("interactions", (data) => {
        const interactions = data.interactions || [];
        const lastInteractionIndex = interactions.findIndex(
          (interaction) => interaction.url === request.url
        );
        if (lastInteractionIndex !== -1) {
          // Update existing visit with end timestamp and calculate duration
          const lastInteraction = interactions[lastInteractionIndex];
          lastInteraction.endTimestamp = interactionData.timestamp;
          lastInteraction.duration =
            new Date(lastInteraction.endTimestamp) -
            new Date(lastInteraction.timestamp);
          lastInteraction.interactionCount += 1;
        } else {
          // Add a new visit
          interactionData.interactionCount = 1;
          interactionData.duration = 0;
          interactions.push(interactionData);
        }
        chrome.storage.local.set({ interactions: interactions });

        const partitions = data.partitions || {};
        if (!partitions[domain]) {
          partitions[domain] = [];
        }
        partitions[domain].push(interactionData);
        chrome.storage.local.set({ partitions: partitions });
      });
    }
  } else if (request.action === "set_user_agent") {
    chrome.storage.local.set({ agentData: request.userAgent });
  }
});

function getCurrentDomain(url) {
  try {
    const urlObject = new URL(url);
    return urlObject.hostname;
  } catch (error) {
    console.error("Error extracting domain:", error);
    return null;
  }
}
