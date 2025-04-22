import { getViews } from "../service/api.js";
import { createBarChart } from "../components/chart.js";

let homeChart = null;
const app = document.getElementById("app");

export async function initHome() {
  const app = document.getElementById("app");

  const sel = document.createElement("select");
  [30, 90, 365].forEach((p) => {
    const opt = document.createElement("option");
    opt.value = p;
    opt.textContent = `Last ${p} days`;
    sel.appendChild(opt);
  });

  const canvas = document.createElement("canvas");
  canvas.id = "homeChart";
  canvas.className = "w-full h-80";

  const loader = document.createElement("h4");
  loader.id = "loader";
  loader.className = "text-center text-black-500";
  loader.textContent = "Loading analytics...";

  app.appendChild(sel);
  app.appendChild(loader);
  app.appendChild(canvas);

  async function updateChart(period) {
    loader.style.display = "block";
    const { current, previous } = await getViews(period);
    loader.style.display = "none";

    if (homeChart) {
      homeChart.data.labels = current.map((d) => d.date);
      homeChart.data.datasets[0].data = current.map((d) => d.views);
      homeChart.data.datasets[1].data = previous.map((d) => d.views);
      homeChart.update();
    } else {
      homeChart = createBarChart("homeChart", current, previous);
    }
  }

  sel.addEventListener("change", (e) => updateChart(e.target.value));

  sel.value = 30;
  sel.dispatchEvent(new Event("change"));
}
