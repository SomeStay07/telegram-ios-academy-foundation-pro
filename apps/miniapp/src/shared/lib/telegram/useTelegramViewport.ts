import { useEffect } from 'react';

export function useTelegramViewport() {
  useEffect(() => {
    const { WebApp } = (window as any).Telegram;
    
    const setVph = () => {
      const h = WebApp?.viewportStableHeight || window.innerHeight;
      document.documentElement.style.setProperty('--tg-vph', `${h}px`);
    };
    
    // Set initial viewport height
    setVph();
    
    // Listen for viewport changes
    WebApp?.onEvent?.('viewportChanged', setVph);
    
    return () => {
      WebApp?.offEvent?.('viewportChanged', setVph);
    };
  }, []);
}