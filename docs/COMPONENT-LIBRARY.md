# Component Library Guide

Complete reference for all components in the Telegram iOS Academy Design System.

## Overview

This guide provides comprehensive documentation for using components from the `@telegram-ios-academy/ui` package. All components are built with TypeScript, accessibility features, and design tokens.

## Installation & Setup

```bash
pnpm add @telegram-ios-academy/ui @telegram-ios-academy/tokens
```

```tsx
import '@telegram-ios-academy/tokens/css';
import { Button, Card, Text, Heading } from '@telegram-ios-academy/ui';
```

## Foundation Components

### Text

The Text component provides semantic text rendering with consistent typography.

```tsx
import { Text } from '@telegram-ios-academy/ui';

// Basic usage
<Text>Default body text</Text>

// With variants
<Text size="sm" color="muted">Small muted text</Text>
<Text size="lg" color="primary">Large primary text</Text>
<Text weight="bold">Bold text</Text>

// Custom element
<Text as="span" size="xs">Inline text</Text>
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `as` | `'p' \| 'span' \| 'div'` | `'p'` | HTML element to render |
| `size` | `'xs' \| 'sm' \| 'base' \| 'lg' \| 'xl'` | `'base'` | Text size |
| `color` | `'default' \| 'muted' \| 'subtle' \| 'primary' \| 'success' \| 'danger' \| 'warning'` | `'default'` | Text color |
| `weight` | `'normal' \| 'medium' \| 'semibold' \| 'bold'` | `'normal'` | Font weight |
| `align` | `'left' \| 'center' \| 'right'` | `'left'` | Text alignment |

#### Examples

```tsx
// Status messages
<Text color="success">Operation completed successfully</Text>
<Text color="danger">Error occurred</Text>
<Text color="warning">Warning message</Text>

// Different sizes
<Text size="xs">Fine print</Text>
<Text size="sm">Small text</Text>
<Text size="base">Body text</Text>
<Text size="lg">Large text</Text>
<Text size="xl">Extra large text</Text>

// Weight variations
<Text weight="normal">Normal weight</Text>
<Text weight="medium">Medium weight</Text>
<Text weight="semibold">Semibold weight</Text>
<Text weight="bold">Bold weight</Text>
```

### Heading

Semantic headings with proper hierarchy and styling.

```tsx
import { Heading } from '@telegram-ios-academy/ui';

// Basic usage
<Heading level={1}>Page Title</Heading>
<Heading level={2}>Section Title</Heading>

// With custom size
<Heading level={1} size="xl">Large H1</Heading>
<Heading level={3} size="lg">Large H3</Heading>

// Custom styling
<Heading level={2} color="primary" weight="semibold">
  Primary Section
</Heading>
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `level` | `1 \| 2 \| 3 \| 4 \| 5 \| 6` | `1` | Heading level (h1-h6) |
| `size` | `'sm' \| 'base' \| 'lg' \| 'xl' \| '2xl' \| '3xl' \| '4xl'` | Auto based on level | Visual size |
| `color` | `'default' \| 'muted' \| 'primary'` | `'default'` | Text color |
| `weight` | `'medium' \| 'semibold' \| 'bold'` | `'bold'` | Font weight |

#### Examples

```tsx
// Heading hierarchy
<Heading level={1} size="4xl">Main Title</Heading>
<Heading level={2} size="2xl">Section Title</Heading>
<Heading level={3} size="xl">Subsection</Heading>
<Heading level={4} size="lg">Component Title</Heading>

// Styled headings
<Heading level={1} color="primary">Primary Title</Heading>
<Heading level={2} color="muted" weight="semibold">Muted Section</Heading>
```

### Link

Accessible links with external indicators and proper focus states.

```tsx
import { Link } from '@telegram-ios-academy/ui';

// Basic usage
<Link href="/path">Internal link</Link>

// External link
<Link href="https://example.com" external>
  External link
</Link>

// Custom styling
<Link href="/path" variant="primary" size="lg">
  Styled link
</Link>
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `href` | `string` | Required | Link destination |
| `external` | `boolean` | `false` | External link indicator |
| `variant` | `'default' \| 'primary' \| 'muted'` | `'default'` | Link style |
| `size` | `'sm' \| 'base' \| 'lg'` | `'base'` | Link size |
| `underline` | `'none' \| 'hover' \| 'always'` | `'hover'` | Underline behavior |

#### Examples

```tsx
// Link variants
<Link href="/home" variant="default">Default link</Link>
<Link href="/primary" variant="primary">Primary link</Link>
<Link href="/muted" variant="muted">Muted link</Link>

// External links
<Link href="https://telegram.org" external>
  Telegram Website
</Link>

// Underline options
<Link href="/no-underline" underline="none">No underline</Link>
<Link href="/always-underlined" underline="always">Always underlined</Link>
```

### Icon

SVG icon system with consistent sizing and accessibility.

```tsx
import { Icon } from '@telegram-ios-academy/ui';

// Basic usage
<Icon name="check" />

// With size
<Icon name="arrow-right" size="lg" />

// With color
<Icon name="warning" color="warning" />

// Custom props
<Icon name="info" size="sm" aria-label="Information" />
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `name` | `IconName` | Required | Icon name |
| `size` | `'xs' \| 'sm' \| 'base' \| 'lg' \| 'xl'` | `'base'` | Icon size |
| `color` | `'current' \| 'primary' \| 'success' \| 'danger' \| 'warning' \| 'muted'` | `'current'` | Icon color |

#### Available Icons

```tsx
// Status icons
<Icon name="check" color="success" />
<Icon name="x" color="danger" />
<Icon name="warning" color="warning" />
<Icon name="info" color="primary" />

// Navigation icons
<Icon name="arrow-left" />
<Icon name="arrow-right" />
<Icon name="chevron-up" />
<Icon name="chevron-down" />

// Interface icons
<Icon name="menu" />
<Icon name="search" />
<Icon name="settings" />
<Icon name="user" />
```

### Divider

Visual content separation with semantic meaning.

```tsx
import { Divider } from '@telegram-ios-academy/ui';

// Horizontal divider
<Divider />

// Vertical divider
<Divider orientation="vertical" />

// With custom spacing
<Divider spacing="lg" />

// Decorative divider
<Divider decorative />
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Divider direction |
| `spacing` | `'sm' \| 'base' \| 'lg'` | `'base'` | Spacing around divider |
| `decorative` | `boolean` | `false` | Decorative (aria-hidden) |

## Layout Components

### Stack

Flexible layout primitive for consistent spacing.

```tsx
import { Stack } from '@telegram-ios-academy/ui';

// Vertical stack
<Stack direction="column" spacing="md">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</Stack>

// Horizontal stack
<Stack direction="row" spacing="sm" align="center">
  <Icon name="check" />
  <Text>Completed</Text>
</Stack>

// Responsive stack
<Stack 
  direction={{ base: "column", md: "row" }}
  spacing={{ base: "sm", md: "lg" }}
>
  <div>Responsive item 1</div>
  <div>Responsive item 2</div>
</Stack>
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `direction` | `'row' \| 'column'` | `'column'` | Flex direction |
| `spacing` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Gap between items |
| `align` | `'start' \| 'center' \| 'end' \| 'stretch'` | `'stretch'` | Cross-axis alignment |
| `justify` | `'start' \| 'center' \| 'end' \| 'between' \| 'around'` | `'start'` | Main-axis alignment |
| `wrap` | `boolean` | `false` | Allow items to wrap |

#### Examples

```tsx
// Layout patterns
<Stack direction="column" spacing="lg">
  <Heading level={1}>Page Title</Heading>
  <Stack direction="row" spacing="sm" align="center">
    <Icon name="calendar" />
    <Text>Posted on March 15, 2024</Text>
  </Stack>
  <Text>Page content...</Text>
</Stack>

// Card grid
<Stack direction="row" spacing="md" wrap>
  <Card>Card 1</Card>
  <Card>Card 2</Card>
  <Card>Card 3</Card>
</Stack>

// Toolbar
<Stack direction="row" spacing="sm" align="center" justify="between">
  <Stack direction="row" spacing="sm" align="center">
    <Icon name="menu" />
    <Heading level={2} size="lg">Dashboard</Heading>
  </Stack>
  <Button>Settings</Button>
</Stack>
```

## Form Components

### Button

Accessible buttons with multiple variants and states.

```tsx
import { Button } from '@telegram-ios-academy/ui';

// Basic buttons
<Button variant="primary">Primary Action</Button>
<Button variant="secondary">Secondary Action</Button>
<Button variant="outline">Outline Button</Button>
<Button variant="ghost">Ghost Button</Button>

// With icons
<Button variant="primary" leftIcon={<Icon name="check" />}>
  Confirm
</Button>

<Button variant="outline" rightIcon={<Icon name="arrow-right" />}>
  Continue
</Button>

// Sizes
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>

// States
<Button loading>Loading...</Button>
<Button disabled>Disabled</Button>
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'primary' \| 'secondary' \| 'outline' \| 'ghost' \| 'danger'` | `'primary'` | Button style |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Button size |
| `loading` | `boolean` | `false` | Loading state |
| `disabled` | `boolean` | `false` | Disabled state |
| `fullWidth` | `boolean` | `false` | Full width button |
| `leftIcon` | `ReactNode` | - | Icon before text |
| `rightIcon` | `ReactNode` | - | Icon after text |

#### Examples

```tsx
// Button variants
<Stack direction="row" spacing="sm">
  <Button variant="primary">Primary</Button>
  <Button variant="secondary">Secondary</Button>
  <Button variant="outline">Outline</Button>
  <Button variant="ghost">Ghost</Button>
  <Button variant="danger">Danger</Button>
</Stack>

// Icon buttons
<Button variant="primary" leftIcon={<Icon name="plus" />}>
  Add Item
</Button>

<Button variant="outline" rightIcon={<Icon name="external-link" />}>
  Open External
</Button>

// Loading and disabled states
<Button loading>Saving...</Button>
<Button disabled>Unavailable</Button>

// Full width
<Button variant="primary" fullWidth>
  Full Width Button
</Button>
```

### Input

Form inputs with validation states and accessibility.

```tsx
import { Input } from '@telegram-ios-academy/ui';

// Basic input
<Input 
  label="Email Address"
  placeholder="Enter your email"
  type="email"
/>

// With validation
<Input 
  label="Password"
  type="password"
  error="Password must be at least 8 characters"
  required
/>

// With help text
<Input 
  label="Username"
  placeholder="Choose a username"
  helpText="Must be 3-20 characters"
/>

// Disabled input
<Input 
  label="Read Only"
  value="Cannot edit this"
  disabled
/>
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | - | Input label |
| `placeholder` | `string` | - | Placeholder text |
| `type` | `'text' \| 'email' \| 'password' \| 'number' \| 'tel' \| 'url'` | `'text'` | Input type |
| `value` | `string` | - | Input value |
| `defaultValue` | `string` | - | Default value |
| `error` | `string` | - | Error message |
| `helpText` | `string` | - | Help text |
| `required` | `boolean` | `false` | Required field |
| `disabled` | `boolean` | `false` | Disabled state |
| `fullWidth` | `boolean` | `true` | Full width input |

#### Examples

```tsx
// Form inputs
<Stack direction="column" spacing="md">
  <Input 
    label="First Name"
    placeholder="Enter first name"
    required
  />
  
  <Input 
    label="Email"
    type="email"
    placeholder="you@example.com"
    helpText="We'll never share your email"
    required
  />
  
  <Input 
    label="Phone"
    type="tel"
    placeholder="+1 (555) 123-4567"
  />
  
  <Input 
    label="Website"
    type="url"
    placeholder="https://yoursite.com"
  />
</Stack>

// Validation states
<Stack direction="column" spacing="md">
  <Input 
    label="Valid Input"
    value="Valid value"
  />
  
  <Input 
    label="Error Input"
    value="Invalid value"
    error="This field has an error"
  />
</Stack>
```

## Container Components

### Card

Content containers with elevation and consistent styling.

```tsx
import { Card } from '@telegram-ios-academy/ui';

// Basic card
<Card>
  <Text>Card content</Text>
</Card>

// Interactive card
<Card variant="interactive" onClick={() => console.log('clicked')}>
  <Heading level={3}>Clickable Card</Heading>
  <Text>This card is interactive</Text>
</Card>

// Elevated card
<Card variant="elevated">
  <Text>Elevated card with shadow</Text>
</Card>

// Custom padding
<Card padding="lg">
  <Text>Large padding</Text>
</Card>
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'default' \| 'interactive' \| 'elevated'` | `'default'` | Card style |
| `padding` | `'sm' \| 'md' \| 'lg'` | `'md'` | Internal padding |
| `onClick` | `() => void` | - | Click handler |

#### Examples

```tsx
// Card grid
<Stack direction="row" spacing="md" wrap>
  <Card variant="interactive">
    <Icon name="user" size="lg" />
    <Heading level={3} size="lg">Profile</Heading>
    <Text color="muted">Manage your profile</Text>
  </Card>
  
  <Card variant="interactive">
    <Icon name="settings" size="lg" />
    <Heading level={3} size="lg">Settings</Heading>
    <Text color="muted">Configure preferences</Text>
  </Card>
  
  <Card variant="elevated">
    <Icon name="warning" size="lg" color="warning" />
    <Heading level={3} size="lg">Important</Heading>
    <Text>This requires attention</Text>
  </Card>
</Stack>

// Feature card
<Card padding="lg">
  <Stack direction="column" spacing="md">
    <Stack direction="row" spacing="sm" align="center">
      <Icon name="check" color="success" />
      <Heading level={3}>Feature Complete</Heading>
    </Stack>
    <Text>
      This feature has been successfully implemented and tested.
    </Text>
    <Button variant="primary" size="sm">
      Learn More
    </Button>
  </Stack>
</Card>
```

## Content Components

### CodeBlock

Syntax-highlighted code blocks with copy functionality.

```tsx
import { CodeBlock } from '@telegram-ios-academy/ui';

// Basic code block
<CodeBlock language="typescript">
{`function hello(name: string) {
  return \`Hello, \${name}!\`;
}`}
</CodeBlock>

// With filename
<CodeBlock language="jsx" filename="components/Button.tsx">
{`export function Button({ children, ...props }) {
  return <button {...props}>{children}</button>;
}`}
</CodeBlock>

// Inline code
<CodeBlock inline>npm install @telegram-ios-academy/ui</CodeBlock>
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `language` | `string` | `'text'` | Programming language |
| `filename` | `string` | - | File name display |
| `inline` | `boolean` | `false` | Inline code style |
| `copyable` | `boolean` | `true` | Show copy button |
| `children` | `string` | Required | Code content |

#### Examples

```tsx
// Different languages
<Stack direction="column" spacing="md">
  <CodeBlock language="typescript" filename="utils.ts">
{`export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}`}
  </CodeBlock>

  <CodeBlock language="css" filename="styles.css">
{`.button {
  background: var(--ds-color-primary-bg);
  color: var(--ds-color-primary-fg-on-bg);
  border-radius: var(--ds-border-radius-md);
}`}
  </CodeBlock>

  <CodeBlock language="bash">
{`pnpm add @telegram-ios-academy/ui
pnpm add @telegram-ios-academy/tokens`}
  </CodeBlock>
</Stack>

// Inline code in text
<Text>
  Install the package with <CodeBlock inline>pnpm add @telegram-ios-academy/ui</CodeBlock> command.
</Text>
```

### Markdown

Secure markdown rendering with sanitization.

```tsx
import { Markdown } from '@telegram-ios-academy/ui';

// Basic markdown
<Markdown>
{`# Heading

This is **bold** and *italic* text.

- List item 1
- List item 2

[Link](https://example.com)`}
</Markdown>

// Custom components
<Markdown
  components={{
    h1: ({ children }) => <Heading level={1}>{children}</Heading>,
    p: ({ children }) => <Text>{children}</Text>
  }}
>
{`# Custom Heading

This paragraph uses custom components.`}
</Markdown>
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `string` | Required | Markdown content |
| `components` | `object` | - | Custom component overrides |
| `allowedElements` | `string[]` | Default safe list | Allowed HTML elements |

#### Examples

```tsx
// Rich content
<Markdown>
{`# Getting Started

Welcome to the **Telegram iOS Academy** design system!

## Features

- 🎨 **Design Tokens**: Consistent styling
- ♿ **Accessibility**: WCAG 2.1 AA compliant  
- 🌙 **Dark Mode**: Automatic theme switching
- 📱 **Responsive**: Mobile-first approach

### Installation

\`\`\`bash
pnpm add @telegram-ios-academy/ui
\`\`\`

> **Note**: This package requires React 18+

For more information, visit our [documentation](https://docs.telegram-academy.dev).`}
</Markdown>

// Learning content
<Markdown>
{`## React Hooks

React Hooks let you use state and other React features without writing a class.

### useState

The \`useState\` Hook lets you add React state to function components:

\`\`\`tsx
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
\`\`\`

**Key Points:**
- Hooks must be called in the same order every time
- Only call Hooks at the top level of your React function
- Hooks can't be called inside loops, conditions, or nested functions`}
</Markdown>
```

## Composition Patterns

### Form Layout

```tsx
<Card>
  <Stack direction="column" spacing="lg">
    <Heading level={2}>Contact Information</Heading>
    
    <Stack direction="column" spacing="md">
      <Input 
        label="Full Name"
        placeholder="Enter your full name"
        required
      />
      
      <Input 
        label="Email"
        type="email"
        placeholder="you@example.com"
        required
      />
      
      <Input 
        label="Phone"
        type="tel"
        placeholder="+1 (555) 123-4567"
      />
    </Stack>
    
    <Stack direction="row" spacing="sm" justify="end">
      <Button variant="secondary">Cancel</Button>
      <Button variant="primary">Save</Button>
    </Stack>
  </Stack>
</Card>
```

### Feature Grid

```tsx
<Stack direction="column" spacing="xl">
  <Heading level={1} size="4xl">Features</Heading>
  
  <Stack direction="row" spacing="lg" wrap>
    <Card variant="interactive" padding="lg">
      <Stack direction="column" spacing="md" align="center">
        <Icon name="check" size="xl" color="success" />
        <Heading level={3}>Accessible</Heading>
        <Text align="center" color="muted">
          WCAG 2.1 AA compliant components
        </Text>
      </Stack>
    </Card>
    
    <Card variant="interactive" padding="lg">
      <Stack direction="column" spacing="md" align="center">
        <Icon name="moon" size="xl" color="primary" />
        <Heading level={3}>Dark Mode</Heading>
        <Text align="center" color="muted">
          Automatic theme switching
        </Text>
      </Stack>
    </Card>
    
    <Card variant="interactive" padding="lg">
      <Stack direction="column" spacing="md" align="center">
        <Icon name="mobile" size="xl" color="warning" />
        <Heading level={3}>Responsive</Heading>
        <Text align="center" color="muted">
          Mobile-first design approach
        </Text>
      </Stack>
    </Card>
  </Stack>
</Stack>
```

### Article Layout

```tsx
<Card padding="lg">
  <Stack direction="column" spacing="lg">
    <Stack direction="column" spacing="md">
      <Heading level={1}>Understanding React Hooks</Heading>
      
      <Stack direction="row" spacing="sm" align="center">
        <Icon name="calendar" size="sm" color="muted" />
        <Text size="sm" color="muted">March 15, 2024</Text>
        <Divider orientation="vertical" />
        <Icon name="clock" size="sm" color="muted" />
        <Text size="sm" color="muted">5 min read</Text>
      </Stack>
    </Stack>
    
    <Divider />
    
    <Markdown>
{`React Hooks revolutionized how we write React components...`}
    </Markdown>
    
    <Divider />
    
    <Stack direction="row" spacing="sm" justify="between" align="center">
      <Stack direction="row" spacing="sm">
        <Button variant="outline" size="sm" leftIcon={<Icon name="heart" />}>
          Like
        </Button>
        <Button variant="outline" size="sm" leftIcon={<Icon name="share" />}>
          Share
        </Button>
      </Stack>
      
      <Link href="/articles" variant="primary">
        View all articles
      </Link>
    </Stack>
  </Stack>
</Card>
```

## Best Practices

### ✅ Do

- Use semantic HTML elements (`Button` instead of `div` with `onClick`)
- Provide proper labels and ARIA attributes
- Use design tokens through component props
- Compose components for complex layouts
- Test with keyboard navigation
- Verify color contrast ratios

### ❌ Don't

- Override component styles with custom CSS
- Skip required accessibility props
- Use raw color values instead of semantic tokens
- Create deeply nested component structures
- Ignore responsive design considerations

### Accessibility Guidelines

```tsx
// ✅ Good - Proper labeling and structure
<Stack direction="column" spacing="md">
  <Heading level={2} id="contact-section">Contact Form</Heading>
  <Input 
    label="Email Address" 
    type="email"
    aria-describedby="email-help"
    required
  />
  <Text id="email-help" size="sm" color="muted">
    We'll never share your email with anyone else.
  </Text>
  <Button type="submit">Submit Form</Button>
</Stack>

// ❌ Avoid - Missing labels and structure
<div>
  <input type="email" placeholder="Email" />
  <div onClick={handleSubmit}>Submit</div>
</div>
```

### Performance Considerations

```tsx
// ✅ Good - Tree shaking friendly imports
import { Button, Card } from '@telegram-ios-academy/ui';

// ❌ Avoid - Imports entire library
import * as UI from '@telegram-ios-academy/ui';

// ✅ Good - Compose with Stack for consistent spacing
<Stack direction="column" spacing="md">
  <Card>Content 1</Card>
  <Card>Content 2</Card>
</Stack>

// ❌ Avoid - Custom spacing that breaks consistency
<div style={{ marginBottom: '23px' }}>
  <Card>Content 1</Card>
</div>
```

---

For architecture details, see [DESIGN-SYSTEM.md](./DESIGN-SYSTEM.md).
For token reference, see [DESIGN-TOKENS.md](./DESIGN-TOKENS.md).