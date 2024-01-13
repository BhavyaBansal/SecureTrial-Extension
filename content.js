// content.js

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "trackInteraction") {
    if (request.url !== "about:blank") {
      const interactionData = {
        url: request.url,
        timestamp: new Date().toISOString(),
        interactionCount: 1,
        duration: 0,
      };

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
        // interactions.push(interactionData);
        chrome.storage.local.set({ interactions: interactions });
      });
    }
  } else if (request.action === "set_user_agent") {
    // alert(request.userAgent);
    chrome.storage.local.set({ agentData: request.userAgent });
  }
});
