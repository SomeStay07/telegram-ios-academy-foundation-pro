/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
    '../../packages/ui/src/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        // Surfaces
        surface: {
          primary: 'var(--ds-surface-primary)',
          secondary: 'var(--ds-surface-secondary)',
          tertiary: 'var(--ds-surface-tertiary)',
          accent: 'var(--ds-surface-accent)',
          destructive: 'var(--ds-surface-destructive)',
          warning: 'var(--ds-surface-warning)',
          success: 'var(--ds-surface-success)',
        },
        // Content
        content: {
          primary: 'var(--ds-content-primary)',
          secondary: 'var(--ds-content-secondary)',
          tertiary: 'var(--ds-content-tertiary)',
          accent: 'var(--ds-content-accent)',
          destructive: 'var(--ds-content-destructive)',
          warning: 'var(--ds-content-warning)',
          success: 'var(--ds-content-success)',
          'on-accent': 'var(--ds-content-on-accent)',
          'on-destructive': 'var(--ds-content-on-destructive)',
          'on-warning': 'var(--ds-content-on-warning)',
          'on-success': 'var(--ds-content-on-success)',
        },
        // Borders
        border: {
          primary: 'var(--ds-border-primary)',
          secondary: 'var(--ds-border-secondary)',
          accent: 'var(--ds-border-accent)',
          destructive: 'var(--ds-border-destructive)',
          warning: 'var(--ds-border-warning)',
          success: 'var(--ds-border-success)',
        },
        // Interactive states
        interactive: {
          primary: {
            DEFAULT: 'var(--ds-interactive-primary-default)',
            hover: 'var(--ds-interactive-primary-hover)',
            pressed: 'var(--ds-interactive-primary-pressed)',
            disabled: 'var(--ds-interactive-primary-disabled)',
          },
          secondary: {
            DEFAULT: 'var(--ds-interactive-secondary-default)',
            hover: 'var(--ds-interactive-secondary-hover)',
            pressed: 'var(--ds-interactive-secondary-pressed)',
            disabled: 'var(--ds-interactive-secondary-disabled)',
          }
        }
      },
      spacing: {
        xs: 'var(--ds-spacing-xs)',
        sm: 'var(--ds-spacing-sm)',
        md: 'var(--ds-spacing-md)',
        lg: 'var(--ds-spacing-lg)',
        xl: 'var(--ds-spacing-xl)',
        '2xl': 'var(--ds-spacing-2xl)',
        '3xl': 'var(--ds-spacing-3xl)',
      },
      borderRadius: {
        xs: 'var(--ds-radius-xs)',
        sm: 'var(--ds-radius-sm)',
        md: 'var(--ds-radius-md)',
        lg: 'var(--ds-radius-lg)',
        xl: 'var(--ds-radius-xl)',
      },
      boxShadow: {
        xs: 'var(--ds-shadow-xs)',
        sm: 'var(--ds-shadow-sm)',
        md: 'var(--ds-shadow-md)',
        lg: 'var(--ds-shadow-lg)',
        xl: 'var(--ds-shadow-xl)',
      },
      transitionDuration: {
        fast: 'var(--ds-motion-duration-fast)',
        normal: 'var(--ds-motion-duration-normal)',
        slow: 'var(--ds-motion-duration-slow)',
      },
      transitionTimingFunction: {
        'ease-out': 'var(--ds-motion-ease-out)',
        'ease-in': 'var(--ds-motion-ease-in)',
        'ease-in-out': 'var(--ds-motion-ease-in-out)',
      },
      fontFamily: {
        'display': 'var(--ds-typography-font-family-display)',
        'body': 'var(--ds-typography-font-family-body)',
        'code': 'var(--ds-typography-font-family-code)',
      },
      fontSize: {
        'xs': ['var(--ds-typography-size-xs)', 'var(--ds-typography-line-height-xs)'],
        'sm': ['var(--ds-typography-size-sm)', 'var(--ds-typography-line-height-sm)'],
        'base': ['var(--ds-typography-size-base)', 'var(--ds-typography-line-height-base)'],
        'lg': ['var(--ds-typography-size-lg)', 'var(--ds-typography-line-height-lg)'],
        'xl': ['var(--ds-typography-size-xl)', 'var(--ds-typography-line-height-xl)'],
        '2xl': ['var(--ds-typography-size-2xl)', 'var(--ds-typography-line-height-2xl)'],
        '3xl': ['var(--ds-typography-size-3xl)', 'var(--ds-typography-line-height-3xl)'],
      }
    }
  },
  plugins: []
}