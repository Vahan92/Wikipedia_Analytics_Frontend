
import { getWithTTL, setWithTTL } from '../utils/cache.js';

const API_ROOT = import.meta.env.VITE_API_BASE_URL + '/api';
const CACHE_TTL = 1000 * 60 * 60;  // 1 hour in ms :contentReference[oaicite:5]{index=5}

export async function getViews(period) {
  const cacheKey = `views_${period}`;
  const cached = getWithTTL(cacheKey);
  if (cached) return cached;  // serve from cache :contentReference[oaicite:6]{index=6}

  const res = await fetch(`${API_ROOT}/get_views?period=${period}`);
  if (!res.ok) throw new Error(res.statusText);
  const data = await res.json();
  
  setWithTTL(cacheKey, data, CACHE_TTL);  // cache for next hour :contentReference[oaicite:7]{index=7}
  return data;
}

/**
 * Fetch analytics metrics (Plausible/Matomo) with 1 hour caching.
 */
export async function getMetrics(type, period) {
  const cacheKey = `metrics_${type}_${period}`;
  const cached = getWithTTL(cacheKey);
  if (cached) return cached;  // serve from cache :contentReference[oaicite:8]{index=8}

  const res = await fetch(`${API_ROOT}/metrics/${type}?period=${period}`);
  if (!res.ok) throw new Error(res.statusText);
  const data = await res.json();

  setWithTTL(cacheKey, data, CACHE_TTL);
  return data;
}
