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
