import { getWithTTL, setWithTTL } from "../utils/cache.js";

const PLAUSIBLE_SITE_ID = import.meta.env.VITE_PLAUSIBLE_SITE_ID;
const MATOMO_URL = import.meta.env.VITE_MATOMO_URL;
const MATOMO_SITE_ID = import.meta.env.VITE_MATOMO_SITE_ID;
const MATOMO_TOKEN = import.meta.env.VITE_MATOMO_TOKEN;
const PLAUSIBLE_API_KEY = import.meta.env.VITE_PLAUSIBLE_API_KEY;

const API_ROOT = import.meta.env.VITE_API_BASE_URL + "/api";
const CACHE_TTL = 1000 * 60 * 60;

export async function getViews(period) {
  const cacheKey = `views_${period}`;
  const cached = getWithTTL(cacheKey);
  if (cached) return cached;

  const res = await fetch(`${API_ROOT}/get_views?period=${period}`);
  if (!res.ok) throw new Error(res.statusText);
  const data = await res.json();

  setWithTTL(cacheKey, data, CACHE_TTL);
  return data;
}

export async function fetchPlausible() {
  const url = 'https://plausible.io/api/v2/query';
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${PLAUSIBLE_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      site_id: PLAUSIBLE_SITE_ID,
      metrics: ['pageviews', 'visitors'],
      date_range: '30d',
    }),
  });
  return await res.json();
}


export async function fetchMatomo() {
  const params = new URLSearchParams({
    module: "API",
    method: "VisitsSummary.getVisits",
    idSite: MATOMO_SITE_ID,
    period: "range",
    date: "last30",
    format: "JSON",
    token_auth: MATOMO_TOKEN,
  });
  const res = await fetch(`${MATOMO_URL}?${params}`);
  return await res.json();
}
