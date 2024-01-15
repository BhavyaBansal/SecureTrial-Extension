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
  let count = 1;
  // Create a new paragraph for each interaction and append it to the div
  interactions.forEach((interaction) => {
    const paragraph = document.createElement("p");

    paragraph.innerHTML = `<b>${count})</b>`;
    paragraph.innerHTML += `<b>Website Name:</b> ${interaction.websiteName}<br>`;
    paragraph.innerHTML += `<b>URL:</b> ${interaction.url}<br>`;
    paragraph.innerHTML += `<b>Visit Count:</b> ${interaction.interactionCount}<br>`;
    paragraph.innerHTML += `<b>Duration:</b> ${interaction.duration} milliseconds<br>`;
    paragraph.innerHTML += `<b>Time Zone:</b> ${interaction.timeZone}<br>`;
    paragraph.innerHTML += `<b>Cookies Enabled:</b> ${interaction.cookiesEnabled}<br>`;
    paragraph.innerHTML += `<b>Loading Time:</b> ${interaction.loadingTime} milliseconds<br>`;
    paragraph.innerHTML += `<b>Timestamp:</b> ${new Date(
      interaction.timestamp
    ).toLocaleString()}<br>`;
    count += 1;
    paragraph.style.width = "250px";
    paragraph.style.overflow = "auto";
    paragraph.style.letterSpacing = "1px";
    paragraph.style.fontSize = "10px";
    interactionsDataDiv.appendChild(paragraph);
  });
}
// document.getElementById("agentbtn").addEventListener("click", () => {
// chrome.storage.local.get("agentData", (data) => {
//   const userAgent = data.agentData || "N/A";
//   // alert(userAgent);
//   document.getElementById("userAgent").innerHTML = `User-Agent: ${userAgent}`;
// });
// });

// if (window.confirm("Allow this extension to access your location?")) {
// document.addEventListener("DOMContentLoaded", () => {
//   chrome.runtime.sendMessage({ action: "getLocation" }, (location) => {
//     if (location) {
//       const locationData = `Latitude: ${location.latitude}, Longitude: ${location.longitude}`;
//       // alert(locationData);
//       document.getElementById("locationData").innerHTML = locationData;
//     } else {
//       document.getElementById("locationData").innerText =
//         "Unable to fetch location";
//     }
//   });
// });
// } else {
//   document.getElementById("locationData").innerText =
//     "Permission not granted for location";
// }
