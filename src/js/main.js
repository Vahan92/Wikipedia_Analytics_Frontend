import { initHome } from "./ui.js";

let homeInitialized = false;

function renderRoute() {
  const hash = window.location.hash || "#/";
  const isAnalytics = hash === "#/analytics";

  document.getElementById("home").classList.toggle("hidden", isAnalytics);
  document.getElementById("analytics").classList.toggle("hidden", !isAnalytics);

  const homeLink = document.querySelector('a[href="#/"]');
  const analyticsLink = document.querySelector('a[href="#/analytics"]');

  if (isAnalytics) {
    homeLink.classList.remove("font-bold");
    analyticsLink.classList.add("font-bold");
  } else {
    homeLink.classList.add("font-bold");
    analyticsLink.classList.remove("font-bold");
  }

  if (!isAnalytics && !homeInitialized) {
    initHome();
    homeInitialized = true;
  }
}

window.addEventListener("DOMContentLoaded", renderRoute);
window.addEventListener("hashchange", renderRoute);
