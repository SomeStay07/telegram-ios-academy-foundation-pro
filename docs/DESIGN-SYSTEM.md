# Design System Architecture

This document provides a comprehensive overview of the Telegram iOS Academy Design System architecture, implementation patterns, and usage guidelines.

## Overview

The Telegram iOS Academy Design System is a comprehensive component library and design token system built specifically for the academy's educational platform. It ensures consistency, accessibility, and maintainability across all digital touchpoints.

## Architecture

### Core Components

```
telegram-ios-academy-foundation-pro/
├── packages/
│   ├── tokens/          # Design tokens (colors, spacing, typography)
│   └── ui/              # React component library
├── apps/
│   └── miniapp/         # Example implementation
└── docs/                # Documentation
```

### Design Tokens (`@telegram-ios-academy/tokens`)

The foundation of our design system, providing:

- **Colors**: Semantic color palette with light/dark/high-contrast themes
- **Typography**: Font families, sizes, weights, and line heights
- **Spacing**: Consistent spacing scale (4px grid system)
- **Border Radius**: Unified border radius values
- **Shadows**: Elevation system for depth and hierarchy
- **Motion**: Animation durations and easing curves

**Key Features:**
- Multi-theme support (light, dark, high-contrast, AMOLED)
- CSS custom properties output
- TypeScript types for design tokens
- Automatic contrast ratio validation

### UI Components (`@telegram-ios-academy/ui`)

Production-ready React components built on design tokens:

#### Foundation Components
- **Text**: Typography with semantic variants
- **Heading**: Hierarchical headings (h1-h6)
- **Link**: Accessible links with external indicators
- **Icon**: SVG icon system with consistent sizing
- **Divider**: Visual content separation

#### Layout Components
- **Stack**: Flexible layout primitive for spacing
- **Card**: Content containers with elevation
- **Modal**: Accessible overlays and dialogs

#### Form Components
- **Button**: Primary, secondary, outline, and ghost variants
- **Input**: Text inputs with validation states
- **Checkbox**: Accessible form controls

#### Content Components
- **CodeBlock**: Syntax-highlighted code with Prism.js
- **Markdown**: Secure markdown rendering with sanitization
- **Spinner**: Loading indicators
- **Alert**: Status messages and notifications

### Bundle Architecture

The system is optimized for performance:

- **Tree Shaking**: Only imported components are bundled
- **Dual Format**: ESM and CommonJS builds
- **External Dependencies**: React and utilities marked as peer deps
- **Bundle Size Monitoring**: Automated ≤220KB enforcement

## Design Principles

### 1. Accessibility First
- WCAG 2.1 AA compliance
- Screen reader support
- Keyboard navigation
- RTL language support
- High contrast mode compatibility

### 2. Security by Design
- HTML sanitization (DOMPurify)
- XSS protection in markdown rendering
- Content Security Policy compliance

### 3. Performance Optimized
- Bundle size constraints (≤220KB gzipped)
- Lazy loading patterns
- Minimal runtime overhead
- Tree-shaking friendly exports

### 4. Developer Experience
- TypeScript-first development
- Comprehensive Storybook documentation
- ESLint rules for design token usage
- Automated testing and CI/CD

## Implementation Patterns

### Design Token Usage

```tsx
// ✅ Correct - Using design tokens
const Button = styled.button`
  padding: var(--ds-spacing-3) var(--ds-spacing-4);
  color: var(--ds-color-primary-fg);
  background: var(--ds-color-primary-bg);
`;

// ❌ Incorrect - Raw values (caught by ESLint)
const BadButton = styled.button`
  padding: 12px 16px;
  color: #007AFF;
`;
```

### Component Composition

```tsx
import { Stack, Card, Heading, Text, Button } from '@telegram-ios-academy/ui';

function FeatureCard({ title, description, onLearnMore }) {
  return (
    <Card>
      <Stack direction="column" spacing="md">
        <Heading level={3} size="lg">{title}</Heading>
        <Text color="secondary">{description}</Text>
        <Button variant="primary" onClick={onLearnMore}>
          Learn More
        </Button>
      </Stack>
    </Card>
  );
}
```

### Theming Integration

```tsx
import '@telegram-ios-academy/tokens/css';

// Components automatically inherit theme variables
function App() {
  return (
    <ThemeProvider theme="dark">
      <DesignSystemComponents />
    </ThemeProvider>
  );
}
```

## Build System

### Development Workflow

1. **Token Updates**: Style Dictionary generates CSS and TypeScript
2. **Component Development**: React components with Storybook
3. **Testing**: Automated accessibility and visual regression tests
4. **Bundle Validation**: Size monitoring and tree-shaking verification

### CI/CD Pipeline

- **Smart Triggers**: Path-based workflow execution
- **Bundle Size Checks**: Automated ≤220KB enforcement
- **Accessibility Testing**: Storybook + Playwright
- **Security Scanning**: Trivy vulnerability detection
- **Release Management**: Changesets for versioning

## Performance Characteristics

### Bundle Analysis
- **Base Bundle**: ~28KB (minified)
- **Tree Shaking**: 85%+ unused code elimination
- **Gzip Compression**: ~30% size reduction
- **Runtime**: Zero-cost abstractions

### Loading Performance
- **Initial Load**: <100ms (cached)
- **Component Mounting**: <16ms per component
- **Theme Switching**: <50ms transition

## Browser Support

- **Modern Browsers**: Chrome 90+, Firefox 88+, Safari 14+
- **Mobile**: iOS Safari 14+, Chrome Mobile 90+
- **Legacy**: IE11 via polyfills (optional)

## Migration Guide

### From v0.x to v1.x
- Design tokens moved from `--color-primary` to `--ds-color-primary-bg`
- Component props normalized (breaking changes documented)
- New accessibility requirements (aria-labels required)

### Upgrade Path
```bash
# Update packages
pnpm update @telegram-ios-academy/ui @telegram-ios-academy/tokens

# Run migration codemod
npx @telegram-ios-academy/ui-codemod v0-to-v1

# Update imports
# Before: import { Button } from '@telegram-ios-academy/ui/Button'
# After: import { Button } from '@telegram-ios-academy/ui'
```

## Monitoring and Analytics

### Bundle Size Tracking
- Real-time bundle size monitoring in CI
- Historical size trends
- Performance regression alerts

### Usage Analytics
- Component adoption metrics
- Performance monitoring
- Error tracking and reporting

## Contributing

See [CONTRIBUTING.md](../CONTRIBUTING.md) for:
- Development setup
- Component creation guidelines
- Testing requirements
- Release process

## Troubleshooting

### Common Issues
1. **Bundle Size Exceeded**: Check for unnecessary imports
2. **Theme Not Applied**: Ensure CSS import is present
3. **TypeScript Errors**: Update @types/react version
4. **Accessibility Failures**: Review ARIA labels and roles

### Debug Tools
- Bundle analyzer: `npx webpack-bundle-analyzer`
- Accessibility audit: Storybook a11y addon
- Performance profiling: React DevTools Profiler

---

For specific component usage, see [COMPONENT-LIBRARY.md](./COMPONENT-LIBRARY.md).
For design token reference, see [DESIGN-TOKENS.md](./DESIGN-TOKENS.md).