import { getWithTTL, setWithTTL } from "../utils/cache.js";

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
