# @telegram-ios-academy/ui

Production-ready React components for the Telegram iOS Academy Design System.

[![Version](https://img.shields.io/npm/v/@telegram-ios-academy/ui)](https://www.npmjs.com/package/@telegram-ios-academy/ui)
[![Bundle Size](https://img.shields.io/bundlephobia/minzip/@telegram-ios-academy/ui)](https://bundlephobia.com/package/@telegram-ios-academy/ui)
[![License](https://img.shields.io/npm/l/@telegram-ios-academy/ui)](LICENSE)

## Features

- 🎨 **Design Tokens**: Built on semantic design tokens with multi-theme support
- ♿ **Accessible**: WCAG 2.1 AA compliant with screen reader support
- 🌙 **Dark Mode**: Automatic theme switching with light/dark/high-contrast themes
- 📱 **Responsive**: Mobile-first approach with container queries
- 🔒 **Secure**: HTML sanitization and XSS protection
- 📦 **Tree Shakable**: Only import what you need (≤220KB bundle limit)
- 🔧 **TypeScript**: Full TypeScript support with comprehensive types
- 📚 **Storybook**: Interactive documentation and testing

## Installation

```bash
# Using pnpm (recommended)
pnpm add @telegram-ios-academy/ui @telegram-ios-academy/tokens

# Using npm
npm install @telegram-ios-academy/ui @telegram-ios-academy/tokens

# Using yarn
yarn add @telegram-ios-academy/ui @telegram-ios-academy/tokens
```

## Quick Start

```tsx
import '@telegram-ios-academy/tokens/css';
import { Button, Card, Heading, Text, Stack } from '@telegram-ios-academy/ui';

function App() {
  return (
    <Card>
      <Stack direction="column" spacing="md">
        <Heading level={1}>Welcome to Telegram Academy</Heading>
        <Text>Start building with our design system components.</Text>
        <Button variant="primary">Get Started</Button>
      </Stack>
    </Card>
  );
}
```

## Components

### Foundation Components
- **Text** - Typography with semantic variants
- **Heading** - Hierarchical headings (h1-h6)  
- **Link** - Accessible links with external indicators
- **Icon** - SVG icon system with consistent sizing
- **Divider** - Visual content separation

### Layout Components
- **Stack** - Flexible layout primitive for spacing
- **Card** - Content containers with elevation

### Form Components
- **Button** - Primary, secondary, outline, and ghost variants
- **Input** - Text inputs with validation states

### Content Components
- **CodeBlock** - Syntax-highlighted code with Prism.js
- **Markdown** - Secure markdown rendering with sanitization

## Usage Examples

### Basic Form

```tsx
import { Card, Stack, Heading, Input, Button } from '@telegram-ios-academy/ui';

export function ContactForm() {
  return (
    <Card>
      <Stack direction="column" spacing="lg">
        <Heading level={2}>Contact Us</Heading>
        
        <Stack direction="column" spacing="md">
          <Input 
            label="Full Name"
            placeholder="Enter your name"
            required
          />
          <Input 
            label="Email"
            type="email"
            placeholder="you@example.com"
            required
          />
        </Stack>
        
        <Button variant="primary" fullWidth>
          Send Message
        </Button>
      </Stack>
    </Card>
  );
}
```

### Feature Grid

```tsx
import { Stack, Card, Icon, Heading, Text } from '@telegram-ios-academy/ui';

const features = [
  { icon: 'check', title: 'Accessible', description: 'WCAG 2.1 AA compliant' },
  { icon: 'moon', title: 'Dark Mode', description: 'Automatic theme switching' },
  { icon: 'mobile', title: 'Responsive', description: 'Mobile-first design' }
];

export function FeatureGrid() {
  return (
    <Stack direction="row" spacing="lg" wrap>
      {features.map((feature) => (
        <Card key={feature.title} variant="interactive" padding="lg">
          <Stack direction="column" spacing="md" align="center">
            <Icon name={feature.icon} size="xl" color="primary" />
            <Heading level={3}>{feature.title}</Heading>
            <Text align="center" color="muted">
              {feature.description}
            </Text>
          </Stack>
        </Card>
      ))}
    </Stack>
  );
}
```

### Code Documentation

```tsx
import { Stack, Heading, Text, CodeBlock } from '@telegram-ios-academy/ui';

export function CodeExample() {
  return (
    <Stack direction="column" spacing="lg">
      <Heading level={2}>React Hook Example</Heading>
      
      <Text>
        The <CodeBlock inline>useState</CodeBlock> hook lets you add state to function components:
      </Text>
      
      <CodeBlock language="tsx" filename="Counter.tsx">
{`import { useState } from 'react';
import { Button, Text, Stack } from '@telegram-ios-academy/ui';

export function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <Stack direction="column" spacing="md" align="center">
      <Text size="lg">Count: {count}</Text>
      <Button onClick={() => setCount(count + 1)}>
        Increment
      </Button>
    </Stack>
  );
}`}
      </CodeBlock>
    </Stack>
  );
}
```

## Theming

The design system automatically adapts to different themes:

```tsx
import '@telegram-ios-academy/tokens/css';

// Themes are automatically applied based on:
// 1. Telegram WebApp theme (when used in Telegram)
// 2. System preference (prefers-color-scheme)
// 3. Manual theme switching

function ThemeExample() {
  // Components automatically use theme-aware tokens
  return (
    <Card>
      <Text>This text adapts to light/dark themes</Text>
      <Button variant="primary">Themed button</Button>
    </Card>
  );
}
```

### Manual Theme Switching

```tsx
import { useEffect, useState } from 'react';

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);
  
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };
  
  return (
    <div>
      <Button onClick={toggleTheme}>
        Switch to {theme === 'light' ? 'dark' : 'light'} theme
      </Button>
      {children}
    </div>
  );
}
```

## Accessibility

All components follow WCAG 2.1 AA guidelines:

```tsx
// ✅ Good - Proper labeling and structure
<Stack direction="column" spacing="md">
  <Heading level={2} id="form-title">Contact Form</Heading>
  <Input 
    label="Email Address"
    type="email"
    aria-describedby="email-help"
    required
  />
  <Text id="email-help" size="sm" color="muted">
    We'll never share your email.
  </Text>
  <Button type="submit">Submit</Button>
</Stack>

// ✅ Good - Icon with proper labeling
<Button leftIcon={<Icon name="plus" />} aria-label="Add new item">
  Add
</Button>

// ✅ Good - External link indication
<Link href="https://external.com" external>
  External Site
</Link>
```

### Keyboard Navigation

All interactive components support keyboard navigation:

- **Tab/Shift+Tab**: Navigate between focusable elements
- **Enter/Space**: Activate buttons and links
- **Arrow keys**: Navigate within composite components
- **Escape**: Close modals and dropdowns

### Screen Reader Support

Components include proper ARIA attributes:

```tsx
// Automatically includes appropriate ARIA attributes
<Input 
  label="Search"
  error="Please enter a search term"
  // Generates: aria-label, aria-describedby, aria-invalid
/>

<Button loading>
  Save Changes
  {/* Automatically includes aria-busy="true" when loading */}
</Button>
```

## Bundle Size

The library is optimized for performance:

- **Base Bundle**: ~28KB (minified + gzipped)
- **Tree Shaking**: 85%+ unused code elimination
- **Bundle Limit**: ≤220KB enforced in CI
- **External Dependencies**: React marked as peer dependency

### Import Optimization

```tsx
// ✅ Good - Tree shaking friendly
import { Button, Card } from '@telegram-ios-academy/ui';

// ❌ Avoid - Imports entire library
import * as UI from '@telegram-ios-academy/ui';

// ✅ Good - Specific component imports (if needed)
import { Button } from '@telegram-ios-academy/ui/Button';
```

## Development

### Prerequisites

- Node.js 20+
- pnpm 9+

### Setup

```bash
# Clone repository
git clone https://github.com/SomeStay07/telegram-ios-academy-foundation-pro.git
cd telegram-ios-academy-foundation-pro

# Install dependencies
pnpm install

# Build tokens first
pnpm --filter @telegram-ios-academy/tokens build

# Start development
pnpm --filter @telegram-ios-academy/ui dev
```

### Available Scripts

```bash
# Development
pnpm dev                # Watch mode development
pnpm build             # Production build
pnpm typecheck         # TypeScript checking

# Testing
pnpm test              # Run tests in watch mode
pnpm test:run          # Run tests once
pnpm test:ui           # Visual test interface

# Linting
pnpm lint              # ESLint
pnpm lint:design       # Design token usage validation

# Storybook
pnpm storybook         # Start Storybook dev server
pnpm build-storybook   # Build Storybook static files
```

### Creating New Components

1. Create component in `src/components/ComponentName/`
2. Add stories in `ComponentName.stories.tsx`
3. Add tests in `ComponentName.test.tsx`
4. Export from `src/components/index.ts`
5. Update documentation

### Design Token Usage

Always use design tokens instead of raw values:

```tsx
// ✅ Good - Using design tokens
const StyledButton = styled.button`
  background: var(--ds-color-primary-bg);
  color: var(--ds-color-primary-fg-on-bg);
  padding: var(--ds-spacing-3) var(--ds-spacing-4);
  border-radius: var(--ds-border-radius-md);
`;

// ❌ Bad - Raw values (caught by ESLint)
const BadButton = styled.button`
  background: #007AFF;
  color: white;
  padding: 12px 16px;
  border-radius: 8px;
`;
```

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-component`
3. Make your changes following our guidelines
4. Add tests and documentation
5. Ensure all CI checks pass
6. Submit a pull request

### Contribution Guidelines

- Follow TypeScript best practices
- Maintain accessibility standards (WCAG 2.1 AA)
- Use design tokens for all styling
- Include comprehensive tests
- Update Storybook stories
- Add proper documentation

## Browser Support

- **Modern Browsers**: Chrome 90+, Firefox 88+, Safari 14+
- **Mobile**: iOS Safari 14+, Chrome Mobile 90+
- **Legacy**: IE11 via polyfills (optional)

## License

MIT License - see [LICENSE](../../LICENSE) for details.

## Links

- 📚 [Documentation](../../docs/COMPONENT-LIBRARY.md)
- 🎨 [Design Tokens](../../docs/DESIGN-TOKENS.md)
- 🏗️ [Architecture](../../docs/DESIGN-SYSTEM.md)
- 📖 [Storybook](https://storybook.telegram-academy.dev)
- 🐛 [Issues](https://github.com/SomeStay07/telegram-ios-academy-foundation-pro/issues)
- 💬 [Discussions](https://github.com/SomeStay07/telegram-ios-academy-foundation-pro/discussions)

---

Built with ❤️ for the Telegram iOS Academy