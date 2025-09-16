import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Button } from '../../src/components/Button/Button';
import { Input } from '../../src/components/Input/Input';
import { Card } from '../../src/components/Card/Card';
import { Text } from '../../src/components/Text/Text';

const meta: Meta = {
  title: 'Design System/Developer Guide',
  parameters: {
    docs: {
      description: {
        component: `
# iOS Academy Design System - Developer Guide

This comprehensive guide provides developers with everything needed to build consistent, accessible, and beautiful interfaces for the iOS Academy platform. Our design system combines Apple's Human Interface Guidelines with Telegram's native integration and modern web standards.

## 🏗️ Architecture Overview

### Core Technologies
- **Shadcn/UI**: Component primitives with Radix UI accessibility
- **Class Variance Authority**: Type-safe component variants
- **Tailwind CSS**: Utility-first styling with custom design tokens
- **SF Symbols**: 6900+ iOS-style icons
- **Telegram WebApp API**: Native integration with Telegram themes

### Design Principles
1. **Consistency**: Unified visual language across all components
2. **Accessibility**: WCAG AA compliance with keyboard navigation
3. **Performance**: Tree-shaking, lazy loading, optimized bundles
4. **Developer Experience**: TypeScript support, comprehensive documentation
5. **Apple HIG Compliance**: Following iOS design patterns and guidelines

## 📱 Platform Integration

### Telegram WebApp Features
- Automatic theme synchronization (light/dark)
- Native haptic feedback integration
- Safe area handling for mobile devices
- Telegram-specific UI patterns and interactions

### iOS Design Language
- SF Pro typography system
- Apple's 8pt grid system
- iOS-style animations and transitions
- Native iOS interaction patterns
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj;

// Quick Start Guide
export const QuickStart: Story = {
  render: () => (
    <div style={{ padding: 'var(--ds-spacing-6)', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ 
        fontSize: 'var(--ds-typography-size-xl)', 
        fontWeight: 'var(--ds-typography-weight-bold)',
        marginBottom: 'var(--ds-spacing-6)',
        textAlign: 'center'
      }}>
        🚀 Quick Start Guide
      </h1>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-6)' }}>
        {/* Installation */}
        <Card style={{ padding: 'var(--ds-spacing-4)' }}>
          <h2 style={{ 
            fontSize: 'var(--ds-typography-size-lg)', 
            fontWeight: 'var(--ds-typography-weight-semibold)',
            marginBottom: 'var(--ds-spacing-3)'
          }}>
            1. Installation
          </h2>
          <div style={{ 
            backgroundColor: 'var(--ds-surface-tertiary)', 
            padding: 'var(--ds-spacing-3)', 
            borderRadius: 'var(--ds-radius-md)',
            marginBottom: 'var(--ds-spacing-3)'
          }}>
            <code style={{ fontSize: 'var(--ds-typography-size-sm)' }}>
              npm install @telegram-ios-academy/ui
            </code>
          </div>
          <Text color="secondary" size="sm">
            The UI library includes all components, icons, and Telegram integration utilities.
          </Text>
        </Card>

        {/* Basic Usage */}
        <Card style={{ padding: 'var(--ds-spacing-4)' }}>
          <h2 style={{ 
            fontSize: 'var(--ds-typography-size-lg)', 
            fontWeight: 'var(--ds-typography-weight-semibold)',
            marginBottom: 'var(--ds-spacing-3)'
          }}>
            2. Basic Usage
          </h2>
          <div style={{ 
            backgroundColor: 'var(--ds-surface-tertiary)', 
            padding: 'var(--ds-spacing-3)', 
            borderRadius: 'var(--ds-radius-md)',
            marginBottom: 'var(--ds-spacing-4)',
            fontSize: 'var(--ds-typography-size-sm)',
            fontFamily: 'monospace',
            lineHeight: 1.5
          }}>
{`import { Button, Card, Text } from '@telegram-ios-academy/ui';
import '@telegram-ios-academy/ui/dist/styles/index.css';

function App() {
  return (
    <Card>
      <Text>Welcome to iOS Academy!</Text>
      <Button variant="primary">Start Learning</Button>
    </Card>
  );
}`}
          </div>
          <Text color="secondary" size="sm">
            Import components and styles to start building your interface.
          </Text>
        </Card>

        {/* Telegram Integration */}
        <Card style={{ padding: 'var(--ds-spacing-4)' }}>
          <h2 style={{ 
            fontSize: 'var(--ds-typography-size-lg)', 
            fontWeight: 'var(--ds-typography-weight-semibold)',
            marginBottom: 'var(--ds-spacing-3)'
          }}>
            3. Telegram Integration
          </h2>
          <div style={{ 
            backgroundColor: 'var(--ds-surface-tertiary)', 
            padding: 'var(--ds-spacing-3)', 
            borderRadius: 'var(--ds-radius-md)',
            marginBottom: 'var(--ds-spacing-4)',
            fontSize: 'var(--ds-typography-size-sm)',
            fontFamily: 'monospace',
            lineHeight: 1.5
          }}>
{`import { initTelegramTheme } from '@telegram-ios-academy/ui';

// Initialize Telegram theme integration
useEffect(() => {
  initTelegramTheme();
}, []);`}
          </div>
          <Text color="secondary" size="sm">
            Automatic theme synchronization with Telegram WebApp for native feel.
          </Text>
        </Card>

        {/* TypeScript Support */}
        <Card style={{ padding: 'var(--ds-spacing-4)' }}>
          <h2 style={{ 
            fontSize: 'var(--ds-typography-size-lg)', 
            fontWeight: 'var(--ds-typography-weight-semibold)',
            marginBottom: 'var(--ds-spacing-3)'
          }}>
            4. TypeScript Support
          </h2>
          <div style={{ 
            backgroundColor: 'var(--ds-surface-tertiary)', 
            padding: 'var(--ds-spacing-3)', 
            borderRadius: 'var(--ds-radius-md)',
            marginBottom: 'var(--ds-spacing-4)',
            fontSize: 'var(--ds-typography-size-sm)',
            fontFamily: 'monospace',
            lineHeight: 1.5
          }}>
{`interface CourseProps {
  title: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  progress?: number;
}

const CourseCard: React.FC<CourseProps> = ({ 
  title, 
  difficulty, 
  progress = 0 
}) => {
  return (
    <Card variant="default">
      <Text weight="medium">{title}</Text>
      <Badge variant={difficulty}>{difficulty}</Badge>
    </Card>
  );
};`}
          </div>
          <Text color="secondary" size="sm">
            Full TypeScript support with comprehensive type definitions for all components.
          </Text>
        </Card>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Step-by-step guide to get started with the iOS Academy design system.',
      },
    },
  },
};

// Component Patterns
export const ComponentPatterns: Story = {
  render: () => (
    <div style={{ padding: 'var(--ds-spacing-6)', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ 
        fontSize: 'var(--ds-typography-size-xl)', 
        fontWeight: 'var(--ds-typography-weight-bold)',
        marginBottom: 'var(--ds-spacing-6)',
        textAlign: 'center'
      }}>
        🎨 Component Patterns
      </h1>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: 'var(--ds-spacing-6)' }}>
        {/* Form Patterns */}
        <Card style={{ padding: 'var(--ds-spacing-4)' }}>
          <h2 style={{ 
            fontSize: 'var(--ds-typography-size-lg)', 
            fontWeight: 'var(--ds-typography-weight-semibold)',
            marginBottom: 'var(--ds-spacing-4)'
          }}>
            📝 Form Patterns
          </h2>
          
          <div style={{ marginBottom: 'var(--ds-spacing-4)' }}>
            <h3 style={{ fontSize: 'var(--ds-typography-size-md)', fontWeight: 'var(--ds-typography-weight-medium)', marginBottom: 'var(--ds-spacing-2)' }}>
              Standard Form
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-3)' }}>
              <Input
                label="Email Address"
                placeholder="your@email.com"
                type="email"
              />
              <Input
                label="Password"
                placeholder="Enter your password"
                type="password"
              />
              <Button variant="primary" fullWidth>
                Sign In
              </Button>
            </div>
          </div>

          <div style={{ 
            backgroundColor: 'var(--ds-surface-tertiary)', 
            padding: 'var(--ds-spacing-3)', 
            borderRadius: 'var(--ds-radius-sm)',
            fontSize: 'var(--ds-typography-size-xs)',
            fontFamily: 'monospace'
          }}>
{`<Input 
  label="Email" 
  placeholder="your@email.com" 
  type="email" 
/>
<Button variant="primary" fullWidth>
  Sign In
</Button>`}
          </div>
        </Card>

        {/* Navigation Patterns */}
        <Card style={{ padding: 'var(--ds-spacing-4)' }}>
          <h2 style={{ 
            fontSize: 'var(--ds-typography-size-lg)', 
            fontWeight: 'var(--ds-typography-weight-semibold)',
            marginBottom: 'var(--ds-spacing-4)'
          }}>
            🧭 Navigation Patterns
          </h2>
          
          <div style={{ marginBottom: 'var(--ds-spacing-4)' }}>
            <h3 style={{ fontSize: 'var(--ds-typography-size-md)', fontWeight: 'var(--ds-typography-weight-medium)', marginBottom: 'var(--ds-spacing-2)' }}>
              Primary Actions
            </h3>
            <div style={{ display: 'flex', gap: 'var(--ds-spacing-2)', flexWrap: 'wrap' }}>
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="ghost">Ghost</Button>
            </div>
          </div>

          <div style={{ 
            backgroundColor: 'var(--ds-surface-tertiary)', 
            padding: 'var(--ds-spacing-3)', 
            borderRadius: 'var(--ds-radius-sm)',
            fontSize: 'var(--ds-typography-size-xs)',
            fontFamily: 'monospace'
          }}>
{`<Button variant="primary">
  Start Course
</Button>
<Button variant="secondary">
  Save for Later  
</Button>`}
          </div>
        </Card>

        {/* Content Patterns */}
        <Card style={{ padding: 'var(--ds-spacing-4)' }}>
          <h2 style={{ 
            fontSize: 'var(--ds-typography-size-lg)', 
            fontWeight: 'var(--ds-typography-weight-semibold)',
            marginBottom: 'var(--ds-spacing-4)'
          }}>
            📄 Content Patterns
          </h2>
          
          <div style={{ marginBottom: 'var(--ds-spacing-4)' }}>
            <h3 style={{ fontSize: 'var(--ds-typography-size-md)', fontWeight: 'var(--ds-typography-weight-medium)', marginBottom: 'var(--ds-spacing-2)' }}>
              Text Hierarchy
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-2)' }}>
              <Text size="xl" weight="bold">Main Heading</Text>
              <Text size="lg" weight="medium">Section Title</Text>
              <Text>Body text with normal weight and size for readability</Text>
              <Text size="sm" color="secondary">Supporting information</Text>
            </div>
          </div>

          <div style={{ 
            backgroundColor: 'var(--ds-surface-tertiary)', 
            padding: 'var(--ds-spacing-3)', 
            borderRadius: 'var(--ds-radius-sm)',
            fontSize: 'var(--ds-typography-size-xs)',
            fontFamily: 'monospace'
          }}>
{`<Text size="xl" weight="bold">
  Course Title
</Text>
<Text color="secondary">
  Supporting details
</Text>`}
          </div>
        </Card>

        {/* Status Patterns */}
        <Card style={{ padding: 'var(--ds-spacing-4)' }}>
          <h2 style={{ 
            fontSize: 'var(--ds-typography-size-lg)', 
            fontWeight: 'var(--ds-typography-weight-semibold)',
            marginBottom: 'var(--ds-spacing-4)'
          }}>
            📊 Status Patterns
          </h2>
          
          <div style={{ marginBottom: 'var(--ds-spacing-4)' }}>
            <h3 style={{ fontSize: 'var(--ds-typography-size-md)', fontWeight: 'var(--ds-typography-weight-medium)', marginBottom: 'var(--ds-spacing-2)' }}>
              Status Indicators
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-2)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--ds-spacing-2)' }}>
                <div style={{ 
                  width: '8px', 
                  height: '8px', 
                  borderRadius: '50%', 
                  backgroundColor: 'var(--ds-content-success)' 
                }} />
                <Text size="sm">Course Completed</Text>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--ds-spacing-2)' }}>
                <div style={{ 
                  width: '8px', 
                  height: '8px', 
                  borderRadius: '50%', 
                  backgroundColor: 'var(--ds-content-warning)' 
                }} />
                <Text size="sm">In Progress</Text>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--ds-spacing-2)' }}>
                <div style={{ 
                  width: '8px', 
                  height: '8px', 
                  borderRadius: '50%', 
                  backgroundColor: 'var(--ds-content-secondary)' 
                }} />
                <Text size="sm">Not Started</Text>
              </div>
            </div>
          </div>

          <div style={{ 
            backgroundColor: 'var(--ds-surface-tertiary)', 
            padding: 'var(--ds-spacing-3)', 
            borderRadius: 'var(--ds-radius-sm)',
            fontSize: 'var(--ds-typography-size-xs)',
            fontFamily: 'monospace'
          }}>
{`<Text color="success">
  ✓ Completed
</Text>
<Text color="warning">
  ⏳ In Progress
</Text>`}
          </div>
        </Card>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Common component patterns and usage examples for building consistent interfaces.',
      },
    },
  },
};

// Best Practices
export const BestPractices: Story = {
  render: () => (
    <div style={{ padding: 'var(--ds-spacing-6)', maxWidth: '1000px', margin: '0 auto' }}>
      <h1 style={{ 
        fontSize: 'var(--ds-typography-size-xl)', 
        fontWeight: 'var(--ds-typography-weight-bold)',
        marginBottom: 'var(--ds-spacing-6)',
        textAlign: 'center'
      }}>
        ✨ Best Practices
      </h1>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-6)' }}>
        {/* Accessibility */}
        <Card style={{ padding: 'var(--ds-spacing-5)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--ds-spacing-3)', marginBottom: 'var(--ds-spacing-4)' }}>
            <span style={{ fontSize: '32px' }}>♿</span>
            <h2 style={{ 
              fontSize: 'var(--ds-typography-size-lg)', 
              fontWeight: 'var(--ds-typography-weight-semibold)',
              margin: 0
            }}>
              Accessibility Guidelines
            </h2>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 'var(--ds-spacing-4)' }}>
            <div>
              <h3 style={{ fontSize: 'var(--ds-typography-size-md)', fontWeight: 'var(--ds-typography-weight-medium)', marginBottom: 'var(--ds-spacing-2)' }}>
                ✅ Do
              </h3>
              <ul style={{ margin: 0, paddingLeft: 'var(--ds-spacing-4)', color: 'var(--ds-content-success)' }}>
                <li>Use semantic HTML elements</li>
                <li>Provide alt text for images</li>
                <li>Ensure sufficient color contrast</li>
                <li>Support keyboard navigation</li>
                <li>Include ARIA labels when needed</li>
              </ul>
            </div>
            <div>
              <h3 style={{ fontSize: 'var(--ds-typography-size-md)', fontWeight: 'var(--ds-typography-weight-medium)', marginBottom: 'var(--ds-spacing-2)' }}>
                ❌ Don't
              </h3>
              <ul style={{ margin: 0, paddingLeft: 'var(--ds-spacing-4)', color: 'var(--ds-content-error)' }}>
                <li>Rely solely on color for information</li>
                <li>Use placeholder text as labels</li>
                <li>Create keyboard traps</li>
                <li>Override focus indicators</li>
                <li>Use low contrast text combinations</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Performance */}
        <Card style={{ padding: 'var(--ds-spacing-5)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--ds-spacing-3)', marginBottom: 'var(--ds-spacing-4)' }}>
            <span style={{ fontSize: '32px' }}>⚡</span>
            <h2 style={{ 
              fontSize: 'var(--ds-typography-size-lg)', 
              fontWeight: 'var(--ds-typography-weight-semibold)',
              margin: 0
            }}>
              Performance Optimization
            </h2>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--ds-spacing-4)' }}>
            <div>
              <h3 style={{ fontSize: 'var(--ds-typography-size-md)', fontWeight: 'var(--ds-typography-weight-medium)', marginBottom: 'var(--ds-spacing-2)' }}>
                Import Optimization
              </h3>
              <div style={{ 
                backgroundColor: 'var(--ds-surface-tertiary)', 
                padding: 'var(--ds-spacing-3)', 
                borderRadius: 'var(--ds-radius-sm)',
                fontSize: 'var(--ds-typography-size-sm)',
                fontFamily: 'monospace',
                marginBottom: 'var(--ds-spacing-2)'
              }}>
{`// ✅ Good - Tree-shakable imports
import { Button, Card } from '@telegram-ios-academy/ui';

// ❌ Avoid - Imports entire library
import * from '@telegram-ios-academy/ui';`}
              </div>
            </div>
            <div>
              <h3 style={{ fontSize: 'var(--ds-typography-size-md)', fontWeight: 'var(--ds-typography-weight-medium)', marginBottom: 'var(--ds-spacing-2)' }}>
                Component Lazy Loading
              </h3>
              <div style={{ 
                backgroundColor: 'var(--ds-surface-tertiary)', 
                padding: 'var(--ds-spacing-3)', 
                borderRadius: 'var(--ds-radius-sm)',
                fontSize: 'var(--ds-typography-size-sm)',
                fontFamily: 'monospace'
              }}>
{`// Lazy load heavy components
const LearningProgress = lazy(() => 
  import('./LearningProgress')
);`}
              </div>
            </div>
          </div>
        </Card>

        {/* Theming */}
        <Card style={{ padding: 'var(--ds-spacing-5)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--ds-spacing-3)', marginBottom: 'var(--ds-spacing-4)' }}>
            <span style={{ fontSize: '32px' }}>🎨</span>
            <h2 style={{ 
              fontSize: 'var(--ds-typography-size-lg)', 
              fontWeight: 'var(--ds-typography-weight-semibold)',
              margin: 0
            }}>
              Theming Best Practices
            </h2>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--ds-spacing-4)' }}>
            <div>
              <h3 style={{ fontSize: 'var(--ds-typography-size-md)', fontWeight: 'var(--ds-typography-weight-medium)', marginBottom: 'var(--ds-spacing-2)' }}>
                Use Design Tokens
              </h3>
              <div style={{ 
                backgroundColor: 'var(--ds-surface-tertiary)', 
                padding: 'var(--ds-spacing-3)', 
                borderRadius: 'var(--ds-radius-sm)',
                fontSize: 'var(--ds-typography-size-sm)',
                fontFamily: 'monospace'
              }}>
{`// ✅ Use design tokens
color: 'var(--ds-content-primary)'
fontSize: 'var(--ds-typography-size-md)'

// ❌ Avoid hard-coded values  
color: '#000000'
fontSize: '16px'`}
              </div>
            </div>
            <div>
              <h3 style={{ fontSize: 'var(--ds-typography-size-md)', fontWeight: 'var(--ds-typography-weight-medium)', marginBottom: 'var(--ds-spacing-2)' }}>
                Respect User Preferences
              </h3>
              <Text size="sm" color="secondary">
                The system automatically respects user's Telegram theme preference and 
                system dark/light mode settings. Components adapt seamlessly without 
                additional configuration.
              </Text>
            </div>
          </div>
        </Card>

        {/* Mobile Optimization */}
        <Card style={{ padding: 'var(--ds-spacing-5)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--ds-spacing-3)', marginBottom: 'var(--ds-spacing-4)' }}>
            <span style={{ fontSize: '32px' }}>📱</span>
            <h2 style={{ 
              fontSize: 'var(--ds-typography-size-lg)', 
              fontWeight: 'var(--ds-typography-weight-semibold)',
              margin: 0
            }}>
              Mobile-First Design
            </h2>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 'var(--ds-spacing-4)' }}>
            <div>
              <h3 style={{ fontSize: 'var(--ds-typography-size-md)', fontWeight: 'var(--ds-typography-weight-medium)', marginBottom: 'var(--ds-spacing-2)' }}>
                Touch Targets
              </h3>
              <Text size="sm" color="secondary" style={{ marginBottom: 'var(--ds-spacing-2)' }}>
                Ensure interactive elements are at least 44px in height for comfortable touch interaction.
              </Text>
              <div style={{ display: 'flex', gap: 'var(--ds-spacing-2)' }}>
                <Button size="sm">Small (36px)</Button>
                <Button size="md">Medium (44px)</Button>
              </div>
            </div>
            <div>
              <h3 style={{ fontSize: 'var(--ds-typography-size-md)', fontWeight: 'var(--ds-typography-weight-medium)', marginBottom: 'var(--ds-spacing-2)' }}>
                Safe Areas
              </h3>
              <Text size="sm" color="secondary">
                Components automatically handle safe areas for iOS devices with notches 
                and dynamic islands. No additional configuration needed.
              </Text>
            </div>
            <div>
              <h3 style={{ fontSize: 'var(--ds-typography-size-md)', fontWeight: 'var(--ds-typography-weight-medium)', marginBottom: 'var(--ds-spacing-2)' }}>
                Responsive Layout
              </h3>
              <Text size="sm" color="secondary">
                Use the built-in grid system and responsive utilities to create 
                layouts that work beautifully on all screen sizes.
              </Text>
            </div>
          </div>
        </Card>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Essential best practices for building accessible, performant, and user-friendly interfaces.',
      },
    },
  },
};

// Migration Guide
export const MigrationGuide: Story = {
  render: () => (
    <div style={{ padding: 'var(--ds-spacing-6)', maxWidth: '900px', margin: '0 auto' }}>
      <h1 style={{ 
        fontSize: 'var(--ds-typography-size-xl)', 
        fontWeight: 'var(--ds-typography-weight-bold)',
        marginBottom: 'var(--ds-spacing-6)',
        textAlign: 'center'
      }}>
        🔄 Migration Guide
      </h1>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-6)' }}>
        {/* Version 2.0 Updates */}
        <Card style={{ padding: 'var(--ds-spacing-5)' }}>
          <h2 style={{ 
            fontSize: 'var(--ds-typography-size-lg)', 
            fontWeight: 'var(--ds-typography-weight-semibold)',
            marginBottom: 'var(--ds-spacing-4)'
          }}>
            🆕 Version 2.0 - New Features
          </h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-4)' }}>
            <div>
              <h3 style={{ fontSize: 'var(--ds-typography-size-md)', fontWeight: 'var(--ds-typography-weight-medium)', marginBottom: 'var(--ds-spacing-2)' }}>
                Shadcn/UI Integration
              </h3>
              <Text size="sm" color="secondary" style={{ marginBottom: 'var(--ds-spacing-2)' }}>
                All components now built on Shadcn/UI primitives with Radix UI accessibility features.
              </Text>
              <div style={{ 
                backgroundColor: 'var(--ds-surface-tertiary)', 
                padding: 'var(--ds-spacing-3)', 
                borderRadius: 'var(--ds-radius-sm)',
                fontSize: 'var(--ds-typography-size-sm)',
                fontFamily: 'monospace'
              }}>
{`// Before v2.0
import { Button } from '@telegram-ios-academy/ui/Button';

// v2.0+
import { Button } from '@telegram-ios-academy/ui';`}
              </div>
            </div>

            <div>
              <h3 style={{ fontSize: 'var(--ds-typography-size-md)', fontWeight: 'var(--ds-typography-weight-medium)', marginBottom: 'var(--ds-spacing-2)' }}>
                Educational Components
              </h3>
              <Text size="sm" color="secondary" style={{ marginBottom: 'var(--ds-spacing-2)' }}>
                New specialized components for learning platforms: LearningProgress, InterviewPrep, CourseCard.
              </Text>
              <div style={{ 
                backgroundColor: 'var(--ds-surface-tertiary)', 
                padding: 'var(--ds-spacing-3)', 
                borderRadius: 'var(--ds-radius-sm)',
                fontSize: 'var(--ds-typography-size-sm)',
                fontFamily: 'monospace'
              }}>
{`import { 
  LearningProgress, 
  InterviewPrep, 
  CourseCard 
} from '@telegram-ios-academy/ui';`}
              </div>
            </div>

            <div>
              <h3 style={{ fontSize: 'var(--ds-typography-size-md)', fontWeight: 'var(--ds-typography-weight-medium)', marginBottom: 'var(--ds-spacing-2)' }}>
                SF Symbols Integration
              </h3>
              <Text size="sm" color="secondary" style={{ marginBottom: 'var(--ds-spacing-2)' }}>
                6900+ SF Symbols-style icons organized into educational categories.
              </Text>
              <div style={{ 
                backgroundColor: 'var(--ds-surface-tertiary)', 
                padding: 'var(--ds-spacing-3)', 
                borderRadius: 'var(--ds-radius-sm)',
                fontSize: 'var(--ds-typography-size-sm)',
                fontFamily: 'monospace'
              }}>
{`import { 
  EducationIcons, 
  DeveloperIcons, 
  AchievementIcons 
} from '@telegram-ios-academy/ui';

<EducationIcons.Book />
<DeveloperIcons.Swift />
<AchievementIcons.Trophy />`}
              </div>
            </div>
          </div>
        </Card>

        {/* Breaking Changes */}
        <Card style={{ padding: 'var(--ds-spacing-5)', border: '2px solid var(--ds-content-warning)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--ds-spacing-2)', marginBottom: 'var(--ds-spacing-4)' }}>
            <span style={{ fontSize: '24px' }}>⚠️</span>
            <h2 style={{ 
              fontSize: 'var(--ds-typography-size-lg)', 
              fontWeight: 'var(--ds-typography-weight-semibold)',
              color: 'var(--ds-content-warning)',
              margin: 0
            }}>
              Breaking Changes
            </h2>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-4)' }}>
            <div>
              <h3 style={{ fontSize: 'var(--ds-typography-size-md)', fontWeight: 'var(--ds-typography-weight-medium)', marginBottom: 'var(--ds-spacing-2)' }}>
                CSS Import Path Changed
              </h3>
              <div style={{ 
                backgroundColor: 'var(--ds-surface-tertiary)', 
                padding: 'var(--ds-spacing-3)', 
                borderRadius: 'var(--ds-radius-sm)',
                fontSize: 'var(--ds-typography-size-sm)',
                fontFamily: 'monospace'
              }}>
{`// ❌ Old import (v1.x)
import '@telegram-ios-academy/ui/dist/style.css';

// ✅ New import (v2.0+)
import '@telegram-ios-academy/ui/dist/styles/index.css';`}
              </div>
            </div>

            <div>
              <h3 style={{ fontSize: 'var(--ds-typography-size-md)', fontWeight: 'var(--ds-typography-weight-medium)', marginBottom: 'var(--ds-spacing-2)' }}>
                Component Prop Changes
              </h3>
              <div style={{ 
                backgroundColor: 'var(--ds-surface-tertiary)', 
                padding: 'var(--ds-spacing-3)', 
                borderRadius: 'var(--ds-radius-sm)',
                fontSize: 'var(--ds-typography-size-sm)',
                fontFamily: 'monospace'
              }}>
{`// ❌ Old Button props (v1.x)
<Button type="primary" loading={true} />

// ✅ New Button props (v2.0+)
<Button variant="primary" loading={true} />`}
              </div>
            </div>
          </div>
        </Card>

        {/* Migration Steps */}
        <Card style={{ padding: 'var(--ds-spacing-5)' }}>
          <h2 style={{ 
            fontSize: 'var(--ds-typography-size-lg)', 
            fontWeight: 'var(--ds-typography-weight-semibold)',
            marginBottom: 'var(--ds-spacing-4)'
          }}>
            📝 Migration Steps
          </h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-3)' }}>
            {[
              'Update package version: `npm install @telegram-ios-academy/ui@^2.0.0`',
              'Update CSS import path to use `/dist/styles/index.css`',
              'Replace `type` prop with `variant` in Button components',
              'Update component imports to use named exports',
              'Test Telegram theme integration with `initTelegramTheme()`',
              'Update TypeScript types if using custom component extensions',
            ].map((step, index) => (
              <div key={index} style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--ds-spacing-3)' }}>
                <div style={{
                  minWidth: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--ds-interactive-primary)',
                  color: 'var(--ds-content-inverse)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 'var(--ds-typography-size-sm)',
                  fontWeight: 'var(--ds-typography-weight-medium)'
                }}>
                  {index + 1}
                </div>
                <Text size="sm" style={{ paddingTop: '2px' }}>{step}</Text>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Complete migration guide for upgrading to the latest version of the design system.',
      },
    },
  },
};