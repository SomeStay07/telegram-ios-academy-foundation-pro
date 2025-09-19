/**
 * 🎨 Design Tokens - СПОКОЙНАЯ ЭЛЕГАНТНОСТЬ 2025
 * Централизованные константы дизайна для унификации стилей
 */

export const tokens = {
  /**
   * 🌈 Colors - Цветовая система
   * Основана на спокойной элегантности с поддержкой тёмной темы
   */
  colors: {
    // Основные цвета
    primary: {
      50: '#eff6ff',
      100: '#dbeafe', 
      200: '#bfdbfe',
      300: '#93c5fd',
      400: '#60a5fa',
      500: '#6366f1', // Основной акцент - мягкий индиго
      600: '#5a5fcf', // Hover состояние
      700: '#4f46e5',
      800: '#4338ca',
      900: '#3730a3',
      950: '#312e81'
    },

    // Семантические цвета (приглушённые)
    semantic: {
      success: {
        50: '#ecfdf5',
        100: '#d1fae5',
        500: '#059669', // Спокойный зелёный
        600: '#047857',
        900: '#064e3b'
      },
      warning: {
        50: '#fffbeb',
        100: '#fef3c7',
        500: '#d97706', // Тёплый оранжевый
        600: '#c2410c',
        900: '#92400e'
      },
      error: {
        50: '#fef2f2',
        100: '#fee2e2',
        500: '#dc2626', // Сдержанный красный
        600: '#b91c1c',
        900: '#7f1d1d'
      },
      info: {
        50: '#eff6ff',
        100: '#dbeafe',
        500: '#0284c7', // Профессиональный синий
        600: '#0369a1',
        900: '#0c4a6e'
      }
    },

    // Специальные цвета
    special: {
      telegram: '#229ed9', // Фирменный Telegram
      premium: '#f59e0b'   // Элегантное золото
    },

    // Нейтральные цвета (адаптивные к теме)
    neutral: {
      0: '#ffffff',
      50: '#fafbfc',
      100: '#f8fafc',
      200: '#f1f5f9',
      300: '#e2e8f0',
      400: '#cbd5e1',
      500: '#94a3b8',
      600: '#64748b',
      700: '#475569',
      800: '#334155',
      900: '#1e293b',
      950: '#0f172a'
    }
  },

  /**
   * 📐 Spacing - Система отступов
   * Основана на шкале 4px для гармоничности
   */
  spacing: {
    '0': '0',
    'px': '1px',
    '0.5': '0.125rem',  // 2px
    '1': '0.25rem',     // 4px
    '1.5': '0.375rem',  // 6px
    '2': '0.5rem',      // 8px
    '2.5': '0.625rem',  // 10px
    '3': '0.75rem',     // 12px
    '3.5': '0.875rem',  // 14px
    '4': '1rem',        // 16px
    '5': '1.25rem',     // 20px
    '6': '1.5rem',      // 24px
    '7': '1.75rem',     // 28px
    '8': '2rem',        // 32px
    '10': '2.5rem',     // 40px
    '12': '3rem',       // 48px
    '16': '4rem',       // 64px
    '20': '5rem',       // 80px
    '24': '6rem'        // 96px
  },

  /**
   * 🔤 Typography - Типографическая шкала
   * Размеры, веса и высота строк
   */
  typography: {
    // Размеры
    fontSize: {
      'caption': ['0.75rem', { lineHeight: '1rem' }],      // 12px - Подписи
      'small': ['0.875rem', { lineHeight: '1.25rem' }],    // 14px - Мелкий текст
      'body': ['1rem', { lineHeight: '1.5rem' }],          // 16px - Основной текст
      'large': ['1.125rem', { lineHeight: '1.75rem' }],    // 18px - Большой текст
      'h4': ['1.125rem', { lineHeight: '1.75rem' }],       // 18px - Заголовки карточек
      'h3': ['1.25rem', { lineHeight: '1.75rem' }],        // 20px - Подзаголовки
      'h2': ['1.5rem', { lineHeight: '2rem' }],            // 24px - Заголовки разделов
      'h1': ['2rem', { lineHeight: '2.5rem' }]             // 32px - Главные заголовки
    },

    // Веса шрифтов
    fontWeight: {
      light: 300,     // Для очень тонких акцентов
      normal: 400,    // Основной текст
      medium: 500,    // Небольшие акценты
      semibold: 600,  // Заголовки
      bold: 700       // Только для особых случаев
    },

    // Высота строк
    lineHeight: {
      tight: 1.2,     // Для заголовков
      normal: 1.4,    // Для обычного текста
      relaxed: 1.6    // Для длинного текста
    },

    // Семейства шрифтов
    fontFamily: {
      system: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif']
    }
  },

  /**
   * 🎭 Shadows - Тени (тонкие и деликатные)
   * Система глубины для создания иерархии
   */
  shadows: {
    none: 'none',
    subtle: '0 1px 2px rgba(0, 0, 0, 0.05)',              // Базовая
    soft: '0 2px 4px rgba(0, 0, 0, 0.1)',                 // Мягкая
    medium: '0 4px 8px rgba(0, 0, 0, 0.12)',              // Приподнятая
    large: '0 8px 16px rgba(0, 0, 0, 0.15)',              // Глубокая
    xl: '0 20px 25px rgba(0, 0, 0, 0.1)',                 // Очень глубокая
    
    // Цветные тени для hover состояний
    'primary-glow': '0 4px 12px rgba(99, 102, 241, 0.25)',
    'success-glow': '0 4px 12px rgba(5, 150, 105, 0.25)',
    'warning-glow': '0 4px 12px rgba(217, 119, 6, 0.25)',
    'error-glow': '0 4px 12px rgba(220, 38, 38, 0.25)'
  },

  /**
   * 🔘 Border Radius - Скругления
   * iOS-инспирированные радиусы для современного вида
   */
  borderRadius: {
    none: '0',
    sm: '0.125rem',   // 2px
    default: '0.25rem', // 4px
    md: '0.375rem',   // 6px
    lg: '0.5rem',     // 8px
    xl: '0.75rem',    // 12px - iOS стандарт
    '2xl': '1rem',    // 16px
    '3xl': '1.25rem', // 20px - iOS large
    '4xl': '1.75rem', // 28px - iOS XL
    full: '9999px'    // Круглый
  },

  /**
   * ⚡ Transitions - Анимации и переходы
   * Естественные timing functions для плавности
   */
  transitions: {
    // Длительности
    duration: {
      fast: '150ms',
      normal: '200ms',   // Основная
      slow: '300ms',
      slower: '500ms'
    },

    // Timing functions
    easing: {
      default: 'cubic-bezier(0.4, 0, 0.2, 1)',    // Естественная
      'ease-in': 'cubic-bezier(0.4, 0, 1, 1)',
      'ease-out': 'cubic-bezier(0, 0, 0.2, 1)',
      'ease-in-out': 'cubic-bezier(0.4, 0, 0.2, 1)'
    }
  },

  /**
   * 📱 Breakpoints - Адаптивные точки
   * Mobile-first подход
   */
  breakpoints: {
    sm: '640px',    // Mobile large
    md: '768px',    // Tablet
    lg: '1024px',   // Desktop
    xl: '1280px',   // Large desktop
    '2xl': '1536px' // Extra large
  },

  /**
   * 🎯 Z-Index - Слои
   * Управление наложением элементов
   */
  zIndex: {
    auto: 'auto',
    0: 0,
    10: 10,
    20: 20,
    30: 30,
    40: 40,
    50: 50,      // Модальные окна
    modal: 100,  // Модали
    popover: 200, // Поповеры
    tooltip: 300, // Тултипы
    toast: 400   // Уведомления
  }
} as const

// Type для автокомплита
export type DesignTokens = typeof tokens
export type ColorScale = keyof typeof tokens.colors.primary
export type SpacingScale = keyof typeof tokens.spacing
export type FontSize = keyof typeof tokens.typography.fontSize