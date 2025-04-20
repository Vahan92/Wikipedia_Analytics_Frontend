// src/utils/cache.js

/**
 * Store a value in localStorage with an expiry timestamp.
 * @param {string} key
 * @param {any} value
 * @param {number} ttlMs  // time-to-live in milliseconds
 */
export function setWithTTL(key, value, ttlMs) {
  const record = {
    value,
    expiry: Date.now() + ttlMs
  };
  localStorage.setItem(key, JSON.stringify(record));
}

/**
 * Retrieve a wrapped value from localStorage, or null if expired/missing.
 * @param {string} key
 * @returns {any|null}
 */
export function getWithTTL(key) {
  const raw = localStorage.getItem(key);
  if (!raw) return null;  // nothing cached :contentReference[oaicite:0]{index=0}

  try {
    const { value, expiry } = JSON.parse(raw);
    if (Date.now() > expiry) {
      localStorage.removeItem(key);  // expired :contentReference[oaicite:1]{index=1}
      return null;
    }
    return value;  // still valid :contentReference[oaicite:2]{index=2}
  } catch (e) {
    localStorage.removeItem(key);
    return null;
  }
}
