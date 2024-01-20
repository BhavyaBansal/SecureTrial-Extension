document.getElementById("showInteractions").addEventListener("click", () => {
  chrome.storage.local.get("interactions", (data) => {
    const interactions = data.interactions || [];
    displayInteractions(interactions);
  });
  chrome.storage.local.get("partitions", (data) => {
    const partitions = data.partitions || {};
    // alert(JSON.stringify(partitions));
  });
});

function displayInteractions(interactions) {
  const interactionsDataDiv = document.getElementById("interactionsData");

  interactionsDataDiv.innerHTML = "";
  let count = 1;
  if (interactions.length > 0) {
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
  } else {
    const paragraph = document.createElement("p");
    paragraph.innerHTML = `<b>No website interactions</b>`;
    paragraph.style.color = "red";
    paragraph.style.width = "250px";
    paragraph.style.overflow = "auto";
    paragraph.style.letterSpacing = "1px";
    paragraph.style.fontSize = "10px";
    interactionsDataDiv.appendChild(paragraph);
  }
}

// document.getElementById("downloadPDF").addEventListener("click", () => {
//   const interactionsDataDiv = document.getElementById("interactionsData");
//   window.print();
//   downloadPDF(interactionsDataDiv);
// });
// function downloadPDF(element) {
//   // alert("Hello");
//   const pdf = new jsPDF();
//   pdf.text("All My Interactions", 20, 10);
//   pdf.fromHTML(element, 15, 20);
//   pdf.save("interactions.pdf");
// }
// popup.js
