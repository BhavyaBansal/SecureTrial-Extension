document
  .getElementById("totalInteractionsBtn")
  .addEventListener("click", () => {
    // alert("Hello");
    chrome.storage.local.get("interactions", (data) => {
      const interactions = data.interactions || [];
      const interactionsDataDiv = document.getElementById("visitsData");

      // Clear existing content
      interactionsDataDiv.innerHTML = "";
      let count = 1;
      // Create a new paragraph for each interaction and append it to the div
      interactions.forEach((interaction) => {
        const paragraph = document.createElement("p");

        paragraph.innerHTML = `<b>${count})</b>`;
        paragraph.innerHTML += `<b>Website Name:</b> ${interaction.websiteName}<br>`;
        paragraph.innerHTML += `<b>Visit Count:</b> ${interaction.interactionCount}<br>`;
        count += 1;
        paragraph.style.width = "250px";
        paragraph.style.overflow = "auto";
        paragraph.style.letterSpacing = "1px";
        paragraph.style.fontSize = "10px";
        paragraph.style.textAlign = "left";
        interactionsDataDiv.appendChild(paragraph);
      });
    });
  });
