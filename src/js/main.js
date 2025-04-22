import { displayMetrics, initHome } from "./ui.js";

document.addEventListener("DOMContentLoaded", () => {
  const appContainer = document.getElementById("app");
  const analyticsContainer = document.getElementById("analytics");
  if (appContainer) {
    initHome();
  }
  if (analyticsContainer) {
    displayMetrics();
  }
});
