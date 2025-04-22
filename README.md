# Wikipedia Analytics Frontend

A minimal, performant frontend built with Vite, Tailwind CSS, and Chart.js that displays Wikipedia pageview statistics over user‑selected periods. It features an ES‑module architecture, utility‑first styling, time‑series bar charts, and 1‑hour localStorage caching for API responses.

## Architecture Overview

### ES‑Module Entry (main.js)

main.js imports global styles and bootstraps the home page logic, leveraging Vite’s native ES‑module resolution and hot‑module replacement (vite.dev).

### Components

All chart rendering logic lives in src/components/, where chart.js registers and initializes a grouped bar chart via Chart.js’s modular API (chartjs.org).

### Service Layer

src/service/api.js encapsulates all fetch calls, dynamically selecting import.meta.env.VITE_API_BASE_URL in production or proxying /api in development, relying on Vite’s import.meta.env API (dev.to).

### Utilities

src/utils/cache.js implements a simple localStorage‑based cache with TTL, storing API responses for one hour to minimize redundant network requests.

## Build Tooling

Vite: Provides lightning-fast dev server with HMR and optimized production builds via vite build, targeting modern browsers by default (vite.dev).

Tailwind CSS: Integrated as a Vite plugin (@tailwindcss/vite), processing @tailwind directives in index.css and purging unused classes for small CSS bundles (tailwindcss.com).

PostCSS/Autoprefixer: Automatically adds vendor prefixes and processes future CSS features.

## Styling

Utility classes defined in index.css (@tailwind base; @tailwind components; @tailwind utilities;) drive all UI styling, enabling responsive, mobile‑first layouts without writing custom CSS (v3.tailwindcss.com).

## Charting

Charts utilize Chart.js v4. We import and register only the CategoryScale, LinearScale, BarController, BarElement, Legend, and Tooltip components to minimize bundle size via tree‑shaking (chartjs.org).

## Caching Strategy

API responses are cached in localStorage with an expiry timestamp. The helper functions getWithTTL and setWithTTL check and purge stale entries, ensuring data is refreshed hourly.

## Environment Variables

.env.development: VITE_API_BASE_URL= (defaults to Vite proxy /api)

.env.production: VITE_API_BASE_URL=https://api.yourdomain.com

Vite exposes import.meta.env.VITE_* to the client, facilitating environment‑specific configuration without bundling secrets (dev.to).
