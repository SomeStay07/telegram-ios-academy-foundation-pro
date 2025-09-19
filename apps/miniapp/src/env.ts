export const VITE = (() => {
  const api = import.meta.env.VITE_API_BASE_URL;
  
  // Fallback for production when API is not yet deployed
  const fallbackApiUrl = 'https://api-production-3e0e.up.railway.app/api';
  
  return { 
    API_BASE_URL: api || fallbackApiUrl 
  };
})();