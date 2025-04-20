import { Chart, CategoryScale, LinearScale, BarController, BarElement, Legend, Tooltip } from 'chart.js';

Chart.register(CategoryScale, LinearScale, BarController, BarElement, Legend, Tooltip);

export function createBarChart(ctxId, curr, prev) {
  const ctx = document.getElementById(ctxId).getContext('2d');
  return new Chart(ctx, {
    type: 'bar',
    data: {
      labels: curr.map(d => d.date),
      datasets: [
        {
          label: 'Current',
          data: curr.map(d => d.views),
          backgroundColor: 'rgba(54, 162, 235, 0.7)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        },
        {
          label: 'Previous',
          data: prev.map(d => d.views),
          backgroundColor: 'rgba(255, 99, 132, 0.7)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1
        }
      ]
    },
    options: {
      responsive: true,
      scales: {
        x: {
          stacked: false
        },
        y: {
          beginAtZero: true
        }
      }
    }
  });
}
