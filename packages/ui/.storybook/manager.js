import { addons } from '@storybook/manager-api';
import { create } from '@storybook/theming/create';

const theme = create({
  base: 'light',
  
  // Brand
  brandTitle: 'Telegram iOS Academy UI',
  brandImage: undefined,
  brandTarget: '_self',
  
  // Typography
  fontBase: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  fontCode: '"Fira Code", "SF Mono", Consolas, monospace',
  
  // Colors
  colorPrimary: '#0d6efd',
  colorSecondary: '#6c757d',
  
  // UI
  appBg: '#ffffff',
  appContentBg: '#ffffff',
  appBorderColor: '#dee2e6',
  appBorderRadius: 8,
  
  // Text colors
  textColor: '#212529',
  textInverseColor: '#ffffff',
  textMutedColor: '#6c757d',
  
  // Toolbar default and active colors
  barTextColor: '#6c757d',
  barSelectedColor: '#0d6efd',
  barBg: '#ffffff',
  
  // Form colors
  inputBg: '#ffffff',
  inputBorder: '#ced4da',
  inputTextColor: '#212529',
  inputBorderRadius: 6,
});

addons.setConfig({
  theme,
  panelPosition: 'bottom',
  selectedPanel: 'storybook/controls/panel',
});