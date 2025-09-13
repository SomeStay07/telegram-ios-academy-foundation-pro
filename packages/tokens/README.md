# @telegram-ios-academy/tokens

Design tokens for the Telegram iOS Academy design system, built with Style Dictionary.

## Overview

This package provides design tokens in multiple formats:
- **CSS Custom Properties** - For styling web applications
- **TypeScript exports** - For programmatic access in JavaScript/TypeScript
- **Theme variants** - Light, Dark, High Contrast, and AMOLED themes
- **Accessibility analysis** - Contrast ratio validation

## Token Layers

### 1. Raw Tokens (`tokens.raw.json`)
Base design values like color palettes, spacing scales, typography settings.

### 2. Semantic Tokens (`tokens.semantic.json`)  
Interface roles mapped to raw tokens (primary, secondary, success, danger, etc.).

### 3. Component Tokens (`tokens.component.json`)
Slot-specific tokens for UI components (Button.bg, Card.shadow, etc.).

### 4. Theme Tokens (`themes/`)
Theme-specific overrides for different color schemes.

## Usage

### CSS
```css
@import '@telegram-ios-academy/tokens/css';

/* Or theme-specific */
@import '@telegram-ios-academy/tokens/css/dark';

.my-button {
  background-color: var(--ds-component-button-primary-bg);
  color: var(--ds-component-button-primary-fg);
  border-radius: var(--ds-radius-md);
}
```

### TypeScript
```typescript
import { tokens } from '@telegram-ios-academy/tokens';

const buttonStyle = {
  backgroundColor: tokens.component.button.primary.bg.variable,
  padding: tokens.spacing[4].variable,
  borderRadius: tokens.radius.md.variable
};
```

## Development

### Build Tokens
```bash
pnpm build
```

### Check Contrast
```bash
pnpm check:contrast
```

### Watch Mode
```bash
pnpm dev
```

## Output Files

- `dist/css/tokens.css` - All themes with CSS variables
- `dist/css/tokens.light.css` - Light theme only  
- `dist/css/tokens.dark.css` - Dark theme only
- `dist/css/tokens.high-contrast.css` - High contrast theme
- `dist/css/tokens.amoled.css` - AMOLED theme
- `dist/ts/index.ts` - TypeScript token exports
- `dist/analysis/contrast-map.json` - Accessibility analysis

## Token Naming Convention

CSS variables follow the pattern: `--ds-{category}-{item}-{property}`

Examples:
- `--ds-color-primary-bg`
- `--ds-spacing-4`
- `--ds-component-button-primary-bg`
- `--ds-radius-md`

## Accessibility

All color combinations are automatically checked against WCAG 2.2 AA standards. Run `pnpm check:contrast` to validate contrast ratios.

## Contributing

1. Edit token files in `src/`
2. Run `pnpm build` to generate outputs
3. Run `pnpm check:contrast` to validate accessibility
4. Test in Storybook or consuming applications