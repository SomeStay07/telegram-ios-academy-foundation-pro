/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  future: {
    hoverOnlyWhenSupported: true,
  },
  theme: {
    extend: {
      // Apple-inspired iOS colors
      colors: {
        'ios-blue': '#007AFF',
        'ios-green': '#34C759',
        'ios-orange': '#FF9500',
        'ios-red': '#FF3B30',
        'ios-purple': '#AF52DE',
        'ios-pink': '#FF2D92',
        'ios-yellow': '#FFCC02',
        'ios-gray': '#8E8E93',
        'ios-gray-2': '#AEAEB2',
        'ios-gray-3': '#C7C7CC',
        'ios-gray-4': '#D1D1D6',
        'ios-gray-5': '#E5E5EA',
        'ios-gray-6': '#F2F2F7',
        'telegram-bg': '#17212B',
        'telegram-secondary': '#242F3D',
        'telegram-accent': '#5288C1',
      },
      // Modern shadows from Apple HIG
      boxShadow: {
        'ios-small': '0 2px 4px rgba(0, 0, 0, 0.1)',
        'ios-medium': '0 4px 12px rgba(0, 0, 0, 0.15)',
        'ios-large': '0 8px 24px rgba(0, 0, 0, 0.2)',
        'glass': '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
        'glow-blue': '0 0 20px rgba(0, 122, 255, 0.3)',
        'glow-green': '0 0 20px rgba(52, 199, 89, 0.3)',
      },
      // Glassmorphism backdrop blur
      backdropBlur: {
        'xs': '2px',
        'sm': '4px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
        '2xl': '24px',
        '3xl': '40px',
      },
      // Modern border radius from iOS 18
      borderRadius: {
        'ios': '12px',
        'ios-large': '20px',
        'ios-xl': '28px',
      },
      // Typography scale
      fontFamily: {
        'system': ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      fontSize: {
        'ios-caption': ['11px', { lineHeight: '13px', letterSpacing: '0.4px' }],
        'ios-footnote': ['13px', { lineHeight: '16px', letterSpacing: '0.2px' }],
        'ios-body': ['17px', { lineHeight: '22px', letterSpacing: '-0.4px' }],
        'ios-headline': ['17px', { lineHeight: '22px', letterSpacing: '-0.4px', fontWeight: '600' }],
        'ios-title': ['22px', { lineHeight: '28px', letterSpacing: '-0.6px', fontWeight: '700' }],
        'ios-large-title': ['34px', { lineHeight: '41px', letterSpacing: '-1px', fontWeight: '700' }],
      },
      // Animation durations from Apple HIG
      transitionDuration: {
        'ios': '300ms',
        'ios-slow': '500ms',
      },
      // Gaming-inspired gradients
      backgroundImage: {
        'rank-gradient': 'linear-gradient(135deg, #007AFF 0%, #00C7FF 100%)',
        'xp-gradient': 'linear-gradient(90deg, #007AFF 0%, #00C7FF 100%)',
        'hero-gradient': 'radial-gradient(ellipse at center top, rgba(0, 122, 255, 0.15) 0%, rgba(0, 122, 255, 0.05) 40%, transparent 70%)',
        'glass-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('daisyui'),
  ],
  daisyui: {
    themes: [
      {
        'ios-dark': {
          'primary': '#007AFF',
          'secondary': '#5AC8FA', 
          'accent': '#FF9500',
          'neutral': '#1C1C1E',
          'base-100': '#000000',
          'base-200': '#111111',
          'base-300': '#1C1C1E',
          'info': '#007AFF',
          'success': '#34C759',
          'warning': '#FF9500',
          'error': '#FF3B30',
        },
      },
      'dark',
    ],
    darkTheme: 'ios-dark',
    base: true,
    styled: true,
    utils: true,
  },
}

