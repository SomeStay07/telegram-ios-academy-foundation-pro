import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Text } from '../../src/components/Text/Text';
import { Button } from '../../src/components/Button/Button';
import { Input } from '../../src/components/Input/Input';
import { Card } from '../../src/components/Card/Card';

const meta: Meta = {
  title: 'Design System/Telegram Theme Integration',
  parameters: {
    docs: {
      description: {
        component: `
# Telegram Theme Integration

This page demonstrates how the UI components integrate with Telegram's theming system and 
adapt to light/dark themes seamlessly.

## Theme System

The design system uses CSS custom properties that automatically adapt to:
- **Light Theme**: Clean, bright interface optimized for daytime usage
- **Dark Theme**: Comfortable, low-light interface for evening usage
- **Telegram Integration**: Respects user's theme preference in Telegram Mini Apps

## Component Integration

All components are built with theme-awareness:
- Colors automatically switch between light and dark variants
- Focus states maintain accessibility contrast requirements
- Interactive elements provide clear visual feedback
- Text remains readable across all theme combinations

## Testing

Use the theme toggle in the Storybook toolbar to test component behavior
across different themes and ensure consistent user experience.
        `,
      },
    },
  },
};

export default meta;

type Story = StoryObj;

// Theme-aware component showcase
const ThemeShowcase = () => {
  const [inputValue, setInputValue] = React.useState('Sample input text');
  const [isLoading, setIsLoading] = React.useState(false);

  const handleButtonClick = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      gap: 'var(--ds-spacing-6)',
      maxWidth: '600px',
      margin: '0 auto'
    }}>
      {/* Header Section */}
      <div style={{ textAlign: 'center' }}>
        <Text size="xl" weight="bold" style={{ marginBottom: 'var(--ds-spacing-2)' }}>
          Telegram Mini App
        </Text>
        <Text color="secondary">
          This interface adapts to your Telegram theme preference
        </Text>
      </div>

      {/* Cards showcasing surface levels */}
      <Card variant="default" style={{ padding: 'var(--ds-spacing-4)' }}>
        <Text weight="medium" style={{ marginBottom: 'var(--ds-spacing-2)' }}>
          Primary Surface
        </Text>
        <Text size="sm" color="secondary">
          This card uses the primary surface color that automatically adapts to light/dark themes.
        </Text>
        
        <Card variant="secondary" style={{ padding: 'var(--ds-spacing-3)', marginTop: 'var(--ds-spacing-3)' }}>
          <Text size="sm" weight="medium" style={{ marginBottom: 'var(--ds-spacing-1)' }}>
            Secondary Surface
          </Text>
          <Text size="xs" color="secondary">
            Nested cards create visual hierarchy with elevated surfaces.
          </Text>
        </Card>
      </Card>

      {/* Interactive Elements */}
      <Card variant="default" style={{ padding: 'var(--ds-spacing-4)' }}>
        <Text weight="medium" style={{ marginBottom: 'var(--ds-spacing-3)' }}>
          Interactive Components
        </Text>
        
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: 'var(--ds-spacing-3)' 
        }}>
          <Input
            label="Message"
            placeholder="Type your message..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          
          <div style={{ 
            display: 'flex', 
            gap: 'var(--ds-spacing-3)',
            flexWrap: 'wrap'
          }}>
            <Button 
              variant="primary" 
              loading={isLoading}
              onClick={handleButtonClick}
            >
              Primary Action
            </Button>
            <Button variant="secondary">
              Secondary Action
            </Button>
            <Button variant="ghost" size="sm">
              Ghost Button
            </Button>
          </div>
        </div>
      </Card>

      {/* Color Variants */}
      <Card variant="default" style={{ padding: 'var(--ds-spacing-4)' }}>
        <Text weight="medium" style={{ marginBottom: 'var(--ds-spacing-3)' }}>
          Semantic Colors
        </Text>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
          gap: 'var(--ds-spacing-3)' 
        }}>
          <div style={{ textAlign: 'center' }}>
            <Button variant="primary" size="sm" fullWidth>
              Primary
            </Button>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Button variant="success" size="sm" fullWidth>
              Success
            </Button>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Button variant="warning" size="sm" fullWidth>
              Warning
            </Button>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Button variant="danger" size="sm" fullWidth>
              Danger
            </Button>
          </div>
        </div>
      </Card>

      {/* Status Messages */}
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: 'var(--ds-spacing-2)' 
      }}>
        <Text size="sm" color="success">
          ✓ Theme integration is working correctly
        </Text>
        <Text size="sm" color="info">
          ℹ Switch themes to see automatic color adaptation
        </Text>
        <Text size="sm" color="warning">
          ⚠ Ensure sufficient contrast in custom components
        </Text>
      </div>
    </div>
  );
};

export const ComponentShowcase: Story = {
  render: ThemeShowcase,
  parameters: {
    docs: {
      description: {
        story: 'A comprehensive showcase of how components adapt to different themes while maintaining usability and visual hierarchy.',
      },
    },
  },
};

// Color adaptation demo
const ColorAdaptationDemo = () => (
  <div style={{ 
    display: 'grid', 
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: 'var(--ds-spacing-4)'
  }}>
    <Card variant="default" style={{ padding: 'var(--ds-spacing-4)' }}>
      <Text weight="medium" style={{ marginBottom: 'var(--ds-spacing-3)' }}>
        Text Colors
      </Text>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-2)' }}>
        <Text>Primary text content</Text>
        <Text color="secondary">Secondary text content</Text>
        <Text size="sm" color="secondary">Subtle supporting text</Text>
      </div>
    </Card>

    <Card variant="secondary" style={{ padding: 'var(--ds-spacing-4)' }}>
      <Text weight="medium" style={{ marginBottom: 'var(--ds-spacing-3)' }}>
        Surface Variants
      </Text>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-2)' }}>
        <div style={{ 
          padding: 'var(--ds-spacing-2)', 
          backgroundColor: 'var(--ds-surface-primary)',
          borderRadius: 'var(--ds-radius-sm)',
          border: '1px solid var(--ds-border-subtle)'
        }}>
          <Text size="sm">Primary Surface</Text>
        </div>
        <div style={{ 
          padding: 'var(--ds-spacing-2)', 
          backgroundColor: 'var(--ds-surface-secondary)',
          borderRadius: 'var(--ds-radius-sm)',
          border: '1px solid var(--ds-border-subtle)'
        }}>
          <Text size="sm">Secondary Surface</Text>
        </div>
      </div>
    </Card>

    <Card variant="elevated" style={{ padding: 'var(--ds-spacing-4)' }}>
      <Text weight="medium" style={{ marginBottom: 'var(--ds-spacing-3)' }}>
        Interactive States
      </Text>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-2)' }}>
        <Button variant="primary" size="sm">Normal State</Button>
        <Button variant="primary" size="sm" style={{ opacity: 0.8 }}>
          Hover Simulation
        </Button>
        <Button variant="primary" size="sm" disabled>
          Disabled State
        </Button>
      </div>
    </Card>
  </div>
);

export const ColorAdaptation: Story = {
  render: ColorAdaptationDemo,
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates how colors automatically adapt between light and dark themes while maintaining semantic meaning.',
      },
    },
  },
};

// Focus and accessibility states
const AccessibilityDemo = () => {
  const [focusedButton, setFocusedButton] = React.useState<string | null>(null);

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      gap: 'var(--ds-spacing-4)',
      maxWidth: '500px',
      margin: '0 auto'
    }}>
      <Card variant="default" style={{ padding: 'var(--ds-spacing-4)' }}>
        <Text weight="medium" style={{ marginBottom: 'var(--ds-spacing-3)' }}>
          Focus States & Accessibility
        </Text>
        
        <Text size="sm" color="secondary" style={{ marginBottom: 'var(--ds-spacing-4)' }}>
          Focus indicators maintain proper contrast ratios across all themes.
          Use Tab key to navigate between elements.
        </Text>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-3)' }}>
          <Button
            variant="primary"
            onFocus={() => setFocusedButton('primary')}
            onBlur={() => setFocusedButton(null)}
            style={{
              outline: focusedButton === 'primary' ? '2px solid var(--ds-border-focus)' : 'none',
              outlineOffset: '2px'
            }}
          >
            Primary Button (Tab 1)
          </Button>

          <Input
            label="Focus this input field"
            placeholder="Tab to focus here..."
          />

          <Button
            variant="secondary"
            onFocus={() => setFocusedButton('secondary')}
            onBlur={() => setFocusedButton(null)}
            style={{
              outline: focusedButton === 'secondary' ? '2px solid var(--ds-border-focus)' : 'none',
              outlineOffset: '2px'
            }}
          >
            Secondary Button (Tab 3)
          </Button>
        </div>
      </Card>

      <Card variant="secondary" style={{ padding: 'var(--ds-spacing-4)' }}>
        <Text weight="medium" style={{ marginBottom: 'var(--ds-spacing-2)' }}>
          Contrast Requirements
        </Text>
        <Text size="sm" color="secondary" style={{ marginBottom: 'var(--ds-spacing-3)' }}>
          All text meets WCAG AA contrast requirements (4.5:1) in both themes.
        </Text>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-2)' }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 'var(--ds-spacing-2)',
            backgroundColor: 'var(--ds-surface-tertiary)',
            borderRadius: 'var(--ds-radius-sm)'
          }}>
            <Text size="sm">Primary Text</Text>
            <Text size="xs" color="success">✓ AA</Text>
          </div>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 'var(--ds-spacing-2)',
            backgroundColor: 'var(--ds-surface-tertiary)',
            borderRadius: 'var(--ds-radius-sm)'
          }}>
            <Text size="sm" color="secondary">Secondary Text</Text>
            <Text size="xs" color="success">✓ AA</Text>
          </div>
        </div>
      </Card>
    </div>
  );
};

export const Accessibility: Story = {
  render: AccessibilityDemo,
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates focus states and accessibility features that work consistently across all themes.',
      },
    },
  },
};

// Real-world usage example
const TelegramChatExample = () => (
  <div style={{ maxWidth: '400px', margin: '0 auto' }}>
    <Card variant="default" style={{ 
      padding: 'var(--ds-spacing-4)',
      border: '1px solid var(--ds-border-default)',
      borderRadius: 'var(--ds-radius-lg)'
    }}>
      {/* Header */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        paddingBottom: 'var(--ds-spacing-3)',
        borderBottom: '1px solid var(--ds-border-subtle)',
        marginBottom: 'var(--ds-spacing-4)'
      }}>
        <div>
          <Text weight="medium">Telegram Bot</Text>
          <Text size="sm" color="secondary">Online</Text>
        </div>
        <Button variant="ghost" size="sm">⋯</Button>
      </div>

      {/* Messages */}
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: 'var(--ds-spacing-3)',
        marginBottom: 'var(--ds-spacing-4)'
      }}>
        {/* Bot message */}
        <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
          <Card variant="secondary" style={{ 
            padding: 'var(--ds-spacing-3)',
            maxWidth: '80%',
            borderRadius: 'var(--ds-radius-lg) var(--ds-radius-lg) var(--ds-radius-lg) var(--ds-radius-sm)'
          }}>
            <Text size="sm">
              Welcome! How can I help you today?
            </Text>
            <Text size="xs" color="secondary" style={{ marginTop: 'var(--ds-spacing-1)' }}>
              12:34
            </Text>
          </Card>
        </div>

        {/* User message */}
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Card style={{ 
            padding: 'var(--ds-spacing-3)',
            backgroundColor: 'var(--ds-interactive-primary)',
            color: 'var(--ds-content-inverse)',
            maxWidth: '80%',
            borderRadius: 'var(--ds-radius-lg) var(--ds-radius-lg) var(--ds-radius-sm) var(--ds-radius-lg)'
          }}>
            <Text size="sm" style={{ color: 'inherit' }}>
              I need help with the design system
            </Text>
            <Text size="xs" style={{ 
              color: 'inherit', 
              opacity: 0.8,
              marginTop: 'var(--ds-spacing-1)' 
            }}>
              12:35 ✓✓
            </Text>
          </Card>
        </div>
      </div>

      {/* Input area */}
      <div style={{ 
        display: 'flex', 
        gap: 'var(--ds-spacing-2)',
        alignItems: 'flex-end'
      }}>
        <Input
          placeholder="Type a message..."
          style={{ flex: 1 }}
        />
        <Button variant="primary" size="sm">
          Send
        </Button>
      </div>
    </Card>
  </div>
);

export const TelegramChatInterface: Story = {
  render: TelegramChatExample,
  parameters: {
    docs: {
      description: {
        story: 'A realistic chat interface example showing how components work together in a Telegram-style layout.',
      },
    },
  },
};