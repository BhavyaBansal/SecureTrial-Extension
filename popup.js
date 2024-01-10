// popup.js

document.getElementById("showInteractions").addEventListener("click", () => {
  chrome.storage.local.get("interactions", (data) => {
    const interactions = data.interactions || [];
    displayInteractions(interactions);
  });
});

function displayInteractions(interactions) {
  const interactionsDataDiv = document.getElementById("interactionsData");

  // Clear existing content
  interactionsDataDiv.innerHTML = "";

  // Create a new paragraph for each interaction and append it to the div
  interactions.forEach((interaction) => {
    const paragraph = document.createElement("p");
    paragraph.textContent = `URL: ${interaction.url}\nVisit Count: ${
      interaction.interactionCount
    }\nDuration: ${interaction.duration} milliseconds\nTimestamp: ${new Date(
      interaction.timestamp
    ).toLocaleString()}`;
    interactionsDataDiv.appendChild(paragraph);
  });
}
