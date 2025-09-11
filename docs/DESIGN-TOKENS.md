# Design Tokens & Theme System

## Telegram WebApp Theme Integration

### Theme Detection & CSS Variables

```typescript
// apps/miniapp/src/theme/telegram.ts
import { useEffect, useState } from 'react'

interface TelegramTheme {
  bg_color: string
  text_color: string
  hint_color: string
  link_color: string
  button_color: string
  button_text_color: string
  secondary_bg_color: string
  header_bg_color: string
  accent_text_color: string
  section_bg_color: string
  section_header_text_color: string
  subtitle_text_color: string
  destructive_text_color: string
}

export function useTelegramTheme() {
  const [theme, setTheme] = useState<TelegramTheme | null>(null)
  const [colorScheme, setColorScheme] = useState<'light' | 'dark'>('light')

  useEffect(() => {
    const tg = (window as any).Telegram?.WebApp
    if (tg?.themeParams) {
      setTheme(tg.themeParams)
      setColorScheme(tg.colorScheme || 'light')
      
      // Apply CSS variables
      applyThemeToCSS(tg.themeParams, tg.colorScheme)
    }

    const handleThemeChange = () => {
      if (tg?.themeParams) {
        setTheme(tg.themeParams)
        setColorScheme(tg.colorScheme || 'light')
        applyThemeToCSS(tg.themeParams, tg.colorScheme)
      }
    }

    tg?.onEvent('themeChanged', handleThemeChange)
    return () => tg?.offEvent('themeChanged', handleThemeChange)
  }, [])

  return { theme, colorScheme }
}

function applyThemeToCSS(theme: TelegramTheme, scheme: 'light' | 'dark') {
  const root = document.documentElement
  
  // Primary Colors
  root.style.setProperty('--tg-bg-color', theme.bg_color || '#ffffff')
  root.style.setProperty('--tg-text-color', theme.text_color || '#000000')
  root.style.setProperty('--tg-hint-color', theme.hint_color || '#999999')
  root.style.setProperty('--tg-link-color', theme.link_color || '#2481cc')
  root.style.setProperty('--tg-button-color', theme.button_color || '#2481cc')
  root.style.setProperty('--tg-button-text-color', theme.button_text_color || '#ffffff')
  
  // Secondary Colors
  root.style.setProperty('--tg-secondary-bg-color', theme.secondary_bg_color || '#f1f1f1')
  root.style.setProperty('--tg-header-bg-color', theme.header_bg_color || '#527da3')
  root.style.setProperty('--tg-accent-text-color', theme.accent_text_color || '#2481cc')
  root.style.setProperty('--tg-section-bg-color', theme.section_bg_color || '#ffffff')
  root.style.setProperty('--tg-section-header-text-color', theme.section_header_text_color || '#6d6d71')
  root.style.setProperty('--tg-subtitle-text-color', theme.subtitle_text_color || '#999999')
  root.style.setProperty('--tg-destructive-text-color', theme.destructive_text_color || '#cc2929')

  // Color scheme class
  root.setAttribute('data-theme', scheme)
}
```

### Design System CSS Variables

```css
/* packages/ui/src/styles/design-tokens.css */
:root {
  /* Telegram Theme Colors (dynamic) */
  --color-bg: var(--tg-bg-color, #ffffff);
  --color-text: var(--tg-text-color, #000000);
  --color-hint: var(--tg-hint-color, #999999);
  --color-link: var(--tg-link-color, #2481cc);
  --color-button: var(--tg-button-color, #2481cc);
  --color-button-text: var(--tg-button-text-color, #ffffff);
  --color-secondary-bg: var(--tg-secondary-bg-color, #f1f1f1);
  --color-accent: var(--tg-accent-text-color, #2481cc);
  --color-destructive: var(--tg-destructive-text-color, #cc2929);

  /* Semantic Colors */
  --color-success: #22c55e;
  --color-warning: #f59e0b;
  --color-error: #ef4444;
  --color-info: #3b82f6;

  /* Gray Scale */
  --color-gray-50: #f9fafb;
  --color-gray-100: #f3f4f6;
  --color-gray-200: #e5e7eb;
  --color-gray-300: #d1d5db;
  --color-gray-400: #9ca3af;
  --color-gray-500: #6b7280;
  --color-gray-600: #4b5563;
  --color-gray-700: #374151;
  --color-gray-800: #1f2937;
  --color-gray-900: #111827;

  /* Spacing Scale (8px base) */
  --spacing-0: 0;
  --spacing-1: 0.25rem; /* 4px */
  --spacing-2: 0.5rem;  /* 8px */
  --spacing-3: 0.75rem; /* 12px */
  --spacing-4: 1rem;    /* 16px */
  --spacing-5: 1.25rem; /* 20px */
  --spacing-6: 1.5rem;  /* 24px */
  --spacing-8: 2rem;    /* 32px */
  --spacing-10: 2.5rem; /* 40px */
  --spacing-12: 3rem;   /* 48px */
  --spacing-16: 4rem;   /* 64px */

  /* Typography Scale */
  --font-size-xs: 0.75rem;   /* 12px */
  --font-size-sm: 0.875rem;  /* 14px */
  --font-size-base: 1rem;    /* 16px */
  --font-size-lg: 1.125rem;  /* 18px */
  --font-size-xl: 1.25rem;   /* 20px */
  --font-size-2xl: 1.5rem;   /* 24px */
  --font-size-3xl: 1.875rem; /* 30px */
  --font-size-4xl: 2.25rem;  /* 36px */

  /* Font Weights */
  --font-weight-normal: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;

  /* Line Heights */
  --line-height-tight: 1.25;
  --line-height-snug: 1.375;
  --line-height-normal: 1.5;
  --line-height-relaxed: 1.625;
  --line-height-loose: 2;

  /* Border Radius */
  --radius-sm: 0.125rem;  /* 2px */
  --radius-base: 0.25rem; /* 4px */
  --radius-md: 0.375rem;  /* 6px */
  --radius-lg: 0.5rem;    /* 8px */
  --radius-xl: 0.75rem;   /* 12px */
  --radius-2xl: 1rem;     /* 16px */
  --radius-full: 9999px;

  /* Shadows */
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-base: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);

  /* Transitions */
  --transition-fast: 150ms ease;
  --transition-normal: 300ms ease;
  --transition-slow: 500ms ease;

  /* Z-Index Scale */
  --z-dropdown: 1000;
  --z-sticky: 1020;
  --z-fixed: 1030;
  --z-modal-backdrop: 1040;
  --z-modal: 1050;
  --z-popover: 1060;
  --z-tooltip: 1070;
}

/* Dark Theme Overrides */
[data-theme="dark"] {
  --color-gray-50: #1f2937;
  --color-gray-100: #374151;
  --color-gray-200: #4b5563;
  --color-gray-300: #6b7280;
  --color-gray-400: #9ca3af;
  --color-gray-500: #d1d5db;
  --color-gray-600: #e5e7eb;
  --color-gray-700: #f3f4f6;
  --color-gray-800: #f9fafb;
  --color-gray-900: #ffffff;

  /* Adjust shadows for dark theme */
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.3);
  --shadow-base: 0 1px 3px 0 rgb(0 0 0 / 0.4), 0 1px 2px -1px rgb(0 0 0 / 0.4);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.4), 0 2px 4px -2px rgb(0 0 0 / 0.4);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.4), 0 4px 6px -4px rgb(0 0 0 / 0.4);
}
```

### Component Design Tokens

```css
/* Module Type Styling */
.module-hook {
  --module-bg: #fef3c7;
  --module-border: #f59e0b;
  --module-icon: '🎯';
  --module-label: 'Мотивация';
}

.module-concept {
  --module-bg: #dbeafe;
  --module-border: #3b82f6;
  --module-icon: '💡';
  --module-label: 'Концепция';
}

.module-worked-example {
  --module-bg: #d1fae5;
  --module-border: #10b981;
  --module-icon: '👨‍💻';
  --module-label: 'Пример';
}

.module-quiz {
  --module-bg: #f3e8ff;
  --module-border: #8b5cf6;
  --module-icon: '❓';
  --module-label: 'Вопрос';
}

.module-checkpoint {
  --module-bg: #fed7aa;
  --module-border: #f97316;
  --module-icon: '🏁';
  --module-label: 'Контрольная точка';
}

/* Interactive States */
.interactive-base {
  transition: all var(--transition-fast);
}

.interactive-base:hover {
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
}

.interactive-base:active {
  transform: translateY(0);
  box-shadow: var(--shadow-sm);
}

/* Focus Styles */
.focus-ring {
  outline: 2px solid transparent;
  outline-offset: 2px;
}

.focus-ring:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
}
```

### Tailwind CSS Integration

```javascript
// apps/miniapp/tailwind.config.cjs
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    '../ui/src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Telegram theme colors
        'tg-bg': 'var(--color-bg)',
        'tg-text': 'var(--color-text)',
        'tg-hint': 'var(--color-hint)',
        'tg-link': 'var(--color-link)',
        'tg-button': 'var(--color-button)',
        'tg-button-text': 'var(--color-button-text)',
        'tg-secondary-bg': 'var(--color-secondary-bg)',
        'tg-accent': 'var(--color-accent)',
        'tg-destructive': 'var(--color-destructive)',
        
        // Semantic colors
        success: 'var(--color-success)',
        warning: 'var(--color-warning)',
        error: 'var(--color-error)',
        info: 'var(--color-info)',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.15s ease-out',
        'bounce-in': 'bounceIn 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        bounceIn: {
          '0%': { transform: 'scale(0.3)', opacity: '0' },
          '50%': { transform: 'scale(1.05)', opacity: '0.8' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
```

### Usage Examples

```tsx
// Button component using design tokens
export function Button({ variant = 'primary', size = 'medium', children, ...props }) {
  return (
    <button
      className={`
        inline-flex items-center justify-center
        transition-all duration-150 ease-in-out
        focus:outline-none focus:ring-2 focus:ring-tg-accent focus:ring-offset-2
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variant === 'primary' && 'bg-tg-button text-tg-button-text hover:opacity-90'}
        ${variant === 'secondary' && 'bg-tg-secondary-bg text-tg-text hover:bg-opacity-90'}
        ${variant === 'ghost' && 'text-tg-accent hover:bg-tg-secondary-bg'}
        ${size === 'small' && 'px-3 py-1.5 text-sm rounded-md'}
        ${size === 'medium' && 'px-4 py-2 text-base rounded-lg'}
        ${size === 'large' && 'px-6 py-3 text-lg rounded-xl'}
      `}
      {...props}
    >
      {children}
    </button>
  )
}

// ModuleCard using design tokens
export function ModuleCard({ module, children }) {
  return (
    <div 
      className={`
        p-4 rounded-xl border-l-4 
        transition-all duration-150 ease-in-out
        hover:shadow-md hover:-translate-y-0.5
        ${module.kind === 'hook' && 'bg-yellow-50 border-yellow-500'}
        ${module.kind === 'concept' && 'bg-blue-50 border-blue-500'}
        ${module.kind === 'quiz' && 'bg-purple-50 border-purple-500'}
      `}
    >
      <div className="flex items-center gap-3 mb-3">
        <span className="text-2xl" role="img" aria-label={module.kind}>
          {getModuleIcon(module.kind)}
        </span>
        <div>
          <span className="text-xs uppercase tracking-wide text-tg-hint font-medium">
            {getModuleLabel(module.kind)}
          </span>
          {module.title && (
            <h3 className="text-lg font-semibold text-tg-text">
              {module.title}
            </h3>
          )}
        </div>
      </div>
      {children}
    </div>
  )
}
```

## Responsive Design System

### Breakpoints

```css
/* Mobile-first responsive design */
:root {
  --breakpoint-sm: 640px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 1024px;
  --breakpoint-xl: 1280px;
}

@media (max-width: 639px) {
  :root {
    --spacing-container: var(--spacing-4); /* 16px */
    --font-size-display: var(--font-size-2xl);
  }
}

@media (min-width: 640px) {
  :root {
    --spacing-container: var(--spacing-6); /* 24px */
    --font-size-display: var(--font-size-3xl);
  }
}

@media (min-width: 768px) {
  :root {
    --spacing-container: var(--spacing-8); /* 32px */
    --font-size-display: var(--font-size-4xl);
  }
}
```

### Container Queries (Progressive Enhancement)

```css
/* Container-based responsive design */
.lesson-container {
  container-type: inline-size;
}

@container (max-width: 400px) {
  .module-card {
    padding: var(--spacing-3);
  }
  
  .module-icon {
    font-size: var(--font-size-lg);
  }
}

@container (min-width: 600px) {
  .module-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: var(--spacing-6);
  }
}
```

## Acceptance Criteria

### Design System Implementation ✅
- [ ] **Theme Detection**: Telegram WebApp theme automatically applied
- [ ] **CSS Variables**: All design tokens available as CSS custom properties  
- [ ] **Dark Mode**: Automatic switching based on Telegram color scheme
- [ ] **Component Variants**: Consistent styling across all UI components
- [ ] **Typography Scale**: Harmonious font sizes and line heights
- [ ] **Color Palette**: Accessible contrast ratios (WCAG AA)
- [ ] **Spacing System**: 8px grid system consistently applied
- [ ] **Interactive States**: Hover, focus, active states defined
- [ ] **Animation System**: Consistent timing and easing functions
- [ ] **Responsive Design**: Mobile-first approach with container queries

**Verification Commands:**
```bash
# Test theme integration
open http://localhost:5173
# Switch Telegram theme (light/dark) and verify CSS variables update

# Check color contrast
npm install -g pa11y
pa11y --standard WCAG2AA http://localhost:5173

# Validate CSS custom properties
grep -r "var(--" packages/ui/src/
```

**Done = Design system provides consistent theming that adapts to Telegram WebApp appearance**