import { useEffect } from 'react';

export function useTelegramTheme() {
  useEffect(() => {
    const { WebApp } = (window as any)?.Telegram || {};
    
    const apply = () => {
      if (!WebApp) return;
      
      const isDark = WebApp.colorScheme === 'dark';
      document.documentElement.classList.toggle('dark', !!isDark);
      
      // Apply theme parameters to CSS variables
      const themeParams = WebApp.themeParams || {};
      const root = document.documentElement;
      
      // Set CSS variables for Telegram theme
      Object.entries(themeParams).forEach(([key, value]) => {
        root.style.setProperty(`--tg-theme-${key.replace(/_/g, '-')}`, value as string);
      });
      
      // Set color scheme
      if (WebApp.colorScheme) {
        root.style.setProperty('--tg-color-scheme', WebApp.colorScheme);
      }
    };
    
    // Apply theme immediately
    apply();
    
    // Listen for theme changes
    WebApp?.onEvent?.('themeChanged', apply);
    
    return () => {
      WebApp?.offEvent?.('themeChanged', apply);
    };
  }, []);
}