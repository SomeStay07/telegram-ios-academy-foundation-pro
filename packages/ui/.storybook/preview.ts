import type { Preview } from "@storybook/react";
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import React from 'react';

// Import the design tokens CSS
import '@telegram-ios-academy/tokens/css/tokens.css';
import '../src/styles/globals.css';

// Theme decorator to switch between light and dark themes
const ThemeDecorator = (Story: any, context: any) => {
  const theme = context.globals.theme || 'light';
  
  React.useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', theme);
    
    if (theme === 'dark') {
      root.style.colorScheme = 'dark';
    } else {
      root.style.colorScheme = 'light';
    }
  }, [theme]);

  return React.createElement('div', {
    style: {
      minHeight: '100vh',
      padding: '1rem',
      backgroundColor: theme === 'dark' ? 'var(--ds-surface-primary)' : 'var(--ds-surface-primary)',
      color: theme === 'dark' ? 'var(--ds-content-primary)' : 'var(--ds-content-primary)',
      fontFamily: 'var(--ds-typography-font-family-body)',
      transition: 'background-color 0.3s ease, color 0.3s ease',
    }
  }, Story());
};

const preview: Preview = {
  parameters: {
    // Actions configuration
    actions: { 
      argTypesRegex: "^on[A-Z].*" 
    },
    
    // Controls configuration
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
      expanded: true,
      sort: 'requiredFirst',
    },
    
    // Viewport configuration with custom Telegram viewports
    viewport: {
      viewports: {
        ...INITIAL_VIEWPORTS,
        telegramMobile: {
          name: 'Telegram Mobile',
          styles: {
            width: '375px',
            height: '812px',
          },
        },
        telegramDesktop: {
          name: 'Telegram Desktop',
          styles: {
            width: '1200px',
            height: '800px',
          },
        },
        telegramTablet: {
          name: 'Telegram Tablet',
          styles: {
            width: '768px',
            height: '1024px',
          },
        },
      },
      defaultViewport: 'telegramMobile',
    },
    
    // Backgrounds configuration with Telegram theme variants
    backgrounds: {
      default: 'telegram-light',
      values: [
        {
          name: 'telegram-light',
          value: 'var(--ds-surface-primary)',
        },
        {
          name: 'telegram-dark',
          value: 'var(--ds-surface-primary)',
        },
        {
          name: 'white',
          value: '#ffffff',
        },
        {
          name: 'light-gray',
          value: '#f8f9fa',
        },
        {
          name: 'dark-gray',
          value: '#343a40',
        },
        {
          name: 'black',
          value: '#000000',
        },
      ],
    },
    
    // A11y addon configuration
    a11y: {
      config: {
        rules: [
          {
            id: 'color-contrast',
            enabled: true,
          },
          {
            id: 'focus-visible',
            enabled: true,
          },
          {
            id: 'keyboard-navigation',
            enabled: true,
          },
        ],
      },
      options: {
        checks: { 'color-contrast': { options: { noScroll: true } } },
        restoreScroll: true,
      },
    },
    
    // Documentation configuration
    docs: {
      toc: true,
      source: {
        state: 'open',
      },
    },
    
    // Layout configuration
    layout: 'padded',
    
    // Options to hide certain panels by default
    options: {
      storySort: {
        method: 'alphabetical',
        order: [
          'Design System',
          ['Design Tokens', 'Telegram Theme Integration', 'Component Status'],
          'Components',
          ['Typography', ['Text', 'Heading'], 'Layout', ['Stack', 'Divider'], 'Interactive', ['Button', 'Input', 'Link'], 'Feedback', ['Alert'], 'Content', ['Card', 'CodeBlock', 'Markdown'], 'Navigation'],
        ],
      },
    },
  },
  
  // Global types for theme switching
  globalTypes: {
    theme: {
      description: 'Global theme for components',
      defaultValue: 'light',
      toolbar: {
        title: 'Theme',
        icon: 'paintbrush',
        items: [
          { value: 'light', title: 'Light', icon: 'sun' },
          { value: 'dark', title: 'Dark', icon: 'moon' },
        ],
        dynamicTitle: true,
      },
    },
  },
  
  // Global decorators
  decorators: [ThemeDecorator],
};

export default preview;
