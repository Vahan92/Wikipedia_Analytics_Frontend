// src/ui.js
import { fetchMatomo, fetchPlausible, getViews } from "./api.js";
import { createBarChart } from "./chart.js";
let homeChart = null;
const app = document.getElementById("app");

// Home page: dynamic period dropdown + chart
export async function initHome() {
  const app = document.getElementById("app");

  // create dropdown
  const sel = document.createElement("select");
  [30, 90, 365].forEach((p) => {
    const opt = document.createElement("option");
    opt.value = p;
    opt.textContent = `Last ${p} days`;
    sel.appendChild(opt);
  });

  // create canvas
  const canvas = document.createElement("canvas");
  canvas.id = "homeChart";
  canvas.className = "w-full h-80";

  // append both in order
  app.appendChild(sel);
  app.appendChild(canvas);

  // handler to fetch & update chart
  sel.addEventListener("change", async (e) => {
    const { current, previous } = await getViews(e.target.value);

    if (homeChart) {
      // update existing chart
      homeChart.data.labels = current.map((d) => d.date);
      homeChart.data.datasets[0].data = current.map((d) => d.views);
      homeChart.data.datasets[1].data = previous.map((d) => d.views);
      homeChart.update();
    } else {
      // first-time create
      homeChart = createBarChart("homeChart", current, previous);
    }
  });

  // initial load
  sel.value = 30;
  sel.dispatchEvent(new Event("change"));
}

// Analytics page binding
// export function initAnalyticsPage() {
//   document.getElementById("load-btn").addEventListener("click", async () => {
//     const type = document.getElementById("metric-type").value;
//     const period = document.getElementById("metric-period").value;
//     const data = await getMetrics(type, period);
//     document.getElementById("page-title").textContent = `${type} – ${period}`;
//     createBarChart(
//       "metricsChart",
//       data.map((d) => ({ date: d.date, views: d.pageviews })),
//       []
//     );
//   });
// }

export async function displayMetrics() {
  const [plausible, matomo] = await Promise.all([
    fetchPlausible(),
    fetchMatomo(),
  ]);

  document.getElementById("pageviews").textContent =
    plausible.results.pageviews;
  document.getElementById("visits").textContent = matomo;
}

// Decide which init to run based on DOM
if (document.getElementById("homeChart")) initHome();
// if (document.getElementById("metricsChart")) initAnalyticsPage();
