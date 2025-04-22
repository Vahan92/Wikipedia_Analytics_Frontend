
export function setWithTTL(key, value, ttlMs) {
  const record = {
    value,
    expiry: Date.now() + ttlMs
  };
  localStorage.setItem(key, JSON.stringify(record));
}

export function getWithTTL(key) {
  const raw = localStorage.getItem(key);
  if (!raw) return null;

  try {
    const { value, expiry } = JSON.parse(raw);
    if (Date.now() > expiry) {
      localStorage.removeItem(key);
      return null;
    }
    return value;
  } catch (e) {
    localStorage.removeItem(key);
    return null;
  }
}
