document.getElementById("latestInteraction").addEventListener("click", () => {
  chrome.storage.local.get("interactions", (data) => {
    const interactions = data.interactions || [];

    // Sort interactions based on timestamp in descending order
    const sortedInteractions = interactions.sort((a, b) => {
      return new Date(b.timestamp) - new Date(a.timestamp);
    });

    // Display the latest interaction
    if (sortedInteractions.length > 0) {
      displayInteraction(sortedInteractions[0]);
    } else {
      alert("No interactions recorded yet.");
    }
  });
});

function displayInteraction(interaction) {
  const interactionsDataDiv = document.getElementById("latestInteractionData");
  interactionsDataDiv.innerHTML = "";
  const paragraph = document.createElement("p");
  paragraph.innerHTML += `<b>Website Name:</b> ${interaction.websiteName}<br>`;
  paragraph.innerHTML += `<b style="width:200px">URL:</b> ${interaction.url}<br>`;
  paragraph.innerHTML += `<b>Visit Count:</b> ${interaction.interactionCount}<br>`;
  paragraph.innerHTML += `<b>Duration:</b> ${interaction.duration} milliseconds<br>`;
  paragraph.innerHTML += `<b>Time Zone:</b> ${interaction.timeZone}<br>`;
  paragraph.innerHTML += `<b>Cookies Enabled:</b> ${interaction.cookiesEnabled}<br>`;
  paragraph.innerHTML += `<b>Loading Time:</b> ${interaction.loadingTime} milliseconds<br>`;
  paragraph.innerHTML += `<b>Timestamp:</b> ${new Date(
    interaction.timestamp
  ).toLocaleString()}<br>`;
  paragraph.style.width = "250px";
  paragraph.style.overflow = "auto";
  paragraph.style.letterSpacing = "1px";
  paragraph.style.fontSize = "10px";
  interactionsDataDiv.appendChild(paragraph);
}
