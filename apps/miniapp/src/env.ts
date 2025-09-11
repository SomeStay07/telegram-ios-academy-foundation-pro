export const VITE = (() => {
  const api = import.meta.env.VITE_API_BASE_URL;
  if (!api) throw new Error('Missing VITE_API_BASE_URL');
  return { API_BASE_URL: api };
})();