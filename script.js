document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("openSidebarBtn")
    .addEventListener("click", openSidebar);
  document
    .getElementById("closeSidebarBtn")
    .addEventListener("click", closeSidebar);
});
function openSidebar() {
  document.getElementById("sidebar").style.width = "250px";
  document.getElementById("sidebar").style.visibility = "visible";
}

function closeSidebar() {
  document.getElementById("sidebar").style.width = "0";
  document.getElementById("sidebar").style.visibility = "hidden";
}

chrome.storage.local.get("interactions", (data) => {
  const interactions = data.interactions || [];
  const totalInteractions = interactions.reduce((total, interaction) => {
    return total + interaction.interactionCount;
  }, 0);
  document.getElementById(
    "totalCount"
  ).innerHTML = `Total Visit Counts: ${totalInteractions}`;
});
document
  .getElementById("locationToggle")
  .addEventListener("change", function () {
    var dataBox = document.getElementById("locationData");
    var notification = dataBox.querySelector(".notification");
    dataBox.classList.toggle("active", this.checked);
    if (this.checked) {
      notification.style.display = "none";
      // document.addEventListener("DOMContentLoaded", () => {
      chrome.runtime.sendMessage({ action: "getLocation" }, (location) => {
        if (location) {
          const locationData = `Latitude: ${location.latitude}, Longitude: ${location.longitude}`;
          // alert(locationData);
          // document.getElementById("locationData").innerHTML = locationData;
          document.querySelector(
            "#locationData .fetched-data"
          ).textContent = `Fetched location data will look like this: ${locationData}`;
        } else {
          document.querySelector(
            "#locationData .fetched-data"
          ).textContent = `Unable to fetch location`;
        }
      });
      // });
    } else {
      notification.style.display = "block";
    }
  });

// User Agent Toggle
document
  .getElementById("userAgentToggle")
  .addEventListener("change", function () {
    console.log("User Agent Toggle Changed");
    var dataBox = document.getElementById("userAgentData");
    var notification = dataBox.querySelector(".notification");
    dataBox.classList.toggle("active", this.checked);

    // Simulate fetching data (replace with actual fetching logic)
    if (this.checked) {
      notification.style.display = "none";
      chrome.storage.local.get("agentData", (data) => {
        const userAgent = data.agentData || "N/A";
        // alert(userAgent);
        document.querySelector(
          "#userAgentData .fetched-data"
        ).textContent = `Fetched device information data will look like this:  ${userAgent}`;
      });
    } else {
      notification.style.display = "block";
    }
  });

// User Information Toggle
// document
//   .getElementById("userInfoToggle")
//   .addEventListener("change", function () {
//     console.log("User Information Toggle Changed");
//     var dataBox = document.getElementById("userData");
//     var notification = dataBox.querySelector(".notification");
//     dataBox.classList.toggle("active", this.checked);

//     // Simulate fetching data (replace with actual fetching logic)
//     if (this.checked) {
//       notification.style.display = "none";
//       document.querySelector("#userData .fetched-data").textContent =
//         "Fetched user information goes here";
//     } else {
//       notification.style.display = "block";
//     }
//   });

// // Dark and Light Mode Toggle
// document
//   .getElementById("darkModeToggle")
//   .addEventListener("change", function () {
//     console.log("Dark and Light Mode Toggle Changed");
//     document.body.classList.toggle("dark-mode", this.checked);
//   });

// // Cookies Toggle
// document
//   .getElementById("cookiesToggle")
//   .addEventListener("change", function () {
//     console.log("Cookies Toggle Changed");
//     var dataBox = document.getElementById("cookiesData");
//     var notification = dataBox.querySelector(".notification");
//     dataBox.classList.toggle("active", this.checked);

//     // Simulate fetching data (replace with actual fetching logic)
//     if (this.checked) {
//       notification.style.display = "none";
//       document.querySelector("#cookiesData .fetched-data").textContent =
//         "Fetched cookies data goes here";
//     } else {
//       notification.style.display = "block";
//     }
//   });
