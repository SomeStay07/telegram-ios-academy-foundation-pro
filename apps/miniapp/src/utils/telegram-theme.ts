/**
 * Telegram WebApp Theme Integration
 * Converts Telegram theme parameters to CSS custom properties
 */

interface TelegramTheme {
  bg_color?: string;
  text_color?: string;
  hint_color?: string;
  link_color?: string;
  button_color?: string;
  button_text_color?: string;
  secondary_bg_color?: string;
  header_bg_color?: string;
  accent_text_color?: string;
  section_bg_color?: string;
  section_header_text_color?: string;
  subtitle_text_color?: string;
  destructive_text_color?: string;
}

/**
 * Apply Telegram WebApp theme parameters as CSS custom properties
 * CSP-safe implementation using nonce
 */
export function applyTelegramTheme(): void {
  const tg = (window as any).Telegram?.WebApp;
  if (!tg || !tg.themeParams) {
    console.log('🎨 Telegram theme not available, using default colors');
    return;
  }

  const theme: TelegramTheme = tg.themeParams;
  const nonce = document.querySelector('meta[name="csp-nonce"]')?.getAttribute('content');
  
  // Create CSS custom properties from theme parameters
  const cssVars = Object.entries(theme)
    .filter(([_, value]) => value && typeof value === 'string' && value.startsWith('#'))
    .map(([key, value]) => `--tg-${key.replace(/_/g, '-')}: ${value};`)
    .join('\n    ');

  if (!cssVars) {
    console.log('🎨 No valid theme colors found');
    return;
  }

  // Apply theme with CSP nonce
  const styleContent = `
    :root {
      ${cssVars}
    }
    
    /* Apply theme colors to Tailwind CSS classes */
    .bg-telegram-bg { background-color: var(--tg-bg-color, #ffffff); }
    .bg-telegram-secondary { background-color: var(--tg-secondary-bg-color, #f8f9fa); }
    .bg-telegram-button { background-color: var(--tg-button-color, #0088cc); }
    .bg-telegram-section { background-color: var(--tg-section-bg-color, #ffffff); }
    
    .text-telegram-text { color: var(--tg-text-color, #000000); }
    .text-telegram-hint { color: var(--tg-hint-color, #999999); }
    .text-telegram-link { color: var(--tg-link-color, #0088cc); }
    .text-telegram-button { color: var(--tg-button-text-color, #ffffff); }
    .text-telegram-accent { color: var(--tg-accent-text-color, #0088cc); }
    .text-telegram-subtitle { color: var(--tg-subtitle-text-color, #999999); }
    .text-telegram-destructive { color: var(--tg-destructive-text-color, #e53e3e); }
    
    .border-telegram-hint { border-color: var(--tg-hint-color, #e2e8f0); }
  `;

  // Use nonce for CSP compliance
  const styleElement = document.createElement('style');
  if (nonce) {
    styleElement.nonce = nonce;
  }
  styleElement.textContent = styleContent;
  document.head.appendChild(styleElement);

  console.log('🎨 Telegram theme applied:', Object.keys(theme));
}

/**
 * Get current theme parameters for debugging
 */
export function getTelegramTheme(): TelegramTheme | null {
  const tg = (window as any).Telegram?.WebApp;
  return tg?.themeParams || null;
}

/**
 * Watch for theme changes (when user switches light/dark mode)
 */
export function watchTelegramTheme(callback?: (theme: TelegramTheme) => void): () => void {
  const tg = (window as any).Telegram?.WebApp;
  if (!tg) return () => {};

  let currentTheme = JSON.stringify(tg.themeParams || {});
  
  const checkTheme = () => {
    const newTheme = JSON.stringify(tg.themeParams || {});
    if (newTheme !== currentTheme) {
      currentTheme = newTheme;
      applyTelegramTheme();
      callback?.(tg.themeParams);
    }
  };

  // Check for theme changes every second
  const interval = setInterval(checkTheme, 1000);
  
  return () => clearInterval(interval);
}