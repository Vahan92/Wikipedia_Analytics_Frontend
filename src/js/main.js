import { initHome } from "./ui.js";

let homeInitialized = false;

function renderRoute() {
  const hash = window.location.hash || "#/";
  const isAnalytics = hash === "#/analytics";

  document.getElementById("home").classList.toggle("hidden", isAnalytics);
  document.getElementById("analytics").classList.toggle("hidden", !isAnalytics);

  if (!isAnalytics && !homeInitialized) {
    initHome();
    homeInitialized = true;
  }
}

window.addEventListener("DOMContentLoaded", renderRoute);
window.addEventListener("hashchange", renderRoute);
