import type { Meta, StoryObj } from '@storybook/react';
import { Text } from '../../../src/components/Text/Text';
import { action } from '@storybook/addon-actions';

/**
 * The Text component is a versatile text element that provides consistent typography
 * throughout the application. It supports various sizes, weights, colors, and styling options.
 */
const meta: Meta<typeof Text> = {
  title: 'Components/Typography/Text',
  component: Text,
  parameters: {
    docs: {
      description: {
        component: `
The Text component provides a consistent way to display text content with design token-based styling.
It can render as different HTML elements (span, p, div, label) and supports comprehensive typography options.

## Features

- **Semantic HTML**: Can render as span, p, div, or label
- **Size variants**: xs, sm, md, lg, xl with corresponding line heights
- **Weight options**: normal, medium, semibold, bold
- **Color variants**: primary, secondary, success, warning, danger, info
- **Text styling**: italic, underline, strikethrough, truncation
- **Alignment**: left, center, right, justify
- **Design tokens**: Uses CSS custom properties for consistent theming

## Accessibility

- Proper semantic HTML elements for screen readers
- High contrast colors that meet WCAG guidelines
- Flexible text sizing that respects user preferences
        `,
      },
    },
  },
  argTypes: {
    as: {
      control: { type: 'select' },
      options: ['span', 'p', 'div', 'label'],
      description: 'The HTML element to render as',
      defaultValue: 'span',
    },
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Text size variant',
      defaultValue: 'md',
    },
    weight: {
      control: { type: 'select' },
      options: ['normal', 'medium', 'semibold', 'bold'],
      description: 'Font weight',
      defaultValue: 'normal',
    },
    color: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'success', 'warning', 'danger', 'info'],
      description: 'Text color variant',
    },
    align: {
      control: { type: 'select' },
      options: ['left', 'center', 'right', 'justify'],
      description: 'Text alignment',
      defaultValue: 'left',
    },
    truncate: {
      control: { type: 'boolean' },
      description: 'Truncate text with ellipsis',
      defaultValue: false,
    },
    italic: {
      control: { type: 'boolean' },
      description: 'Apply italic styling',
      defaultValue: false,
    },
    underline: {
      control: { type: 'boolean' },
      description: 'Apply underline styling',
      defaultValue: false,
    },
    strikethrough: {
      control: { type: 'boolean' },
      description: 'Apply strikethrough styling',
      defaultValue: false,
    },
    children: {
      control: { type: 'text' },
      description: 'Text content',
      defaultValue: 'Sample text',
    },
    onClick: { action: 'clicked' },
  },
  args: {
    children: 'Sample text content',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Text>;

/**
 * The default Text component with medium size and normal weight.
 */
export const Default: Story = {
  args: {
    children: 'This is the default text component',
  },
};

/**
 * All available text sizes from extra small to extra large.
 */
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-3)' }}>
      <Text size="xs">Extra Small (xs) - 12px</Text>
      <Text size="sm">Small (sm) - 14px</Text>
      <Text size="md">Medium (md) - 16px</Text>
      <Text size="lg">Large (lg) - 18px</Text>
      <Text size="xl">Extra Large (xl) - 20px</Text>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Text component supports five size variants, each with appropriate line heights for optimal readability.',
      },
    },
  },
};

/**
 * All available font weights from normal to bold.
 */
export const Weights: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-3)' }}>
      <Text weight="normal">Normal weight (400)</Text>
      <Text weight="medium">Medium weight (500)</Text>
      <Text weight="semibold">Semibold weight (600)</Text>
      <Text weight="bold">Bold weight (700)</Text>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different font weights provide visual hierarchy and emphasis in your text content.',
      },
    },
  },
};

/**
 * All available color variants for different semantic meanings.
 */
export const Colors: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-3)' }}>
      <Text>Default color (no color prop)</Text>
      <Text color="primary">Primary color text</Text>
      <Text color="secondary">Secondary color text</Text>
      <Text color="success">Success color text</Text>
      <Text color="warning">Warning color text</Text>
      <Text color="danger">Danger color text</Text>
      <Text color="info">Info color text</Text>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Color variants provide semantic meaning and help users understand the importance or context of text.',
      },
    },
  },
};

/**
 * Different text alignment options.
 */
export const Alignment: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-4)' }}>
      <div style={{ border: '1px dashed var(--ds-border-default)', padding: 'var(--ds-spacing-3)' }}>
        <Text align="left">Left aligned text (default)</Text>
      </div>
      <div style={{ border: '1px dashed var(--ds-border-default)', padding: 'var(--ds-spacing-3)' }}>
        <Text align="center">Center aligned text</Text>
      </div>
      <div style={{ border: '1px dashed var(--ds-border-default)', padding: 'var(--ds-spacing-3)' }}>
        <Text align="right">Right aligned text</Text>
      </div>
      <div style={{ border: '1px dashed var(--ds-border-default)', padding: 'var(--ds-spacing-3)' }}>
        <Text align="justify">
          Justified text alignment distributes text evenly across the full width of the container, 
          creating clean edges on both sides. This is particularly useful for longer paragraphs.
        </Text>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Text alignment controls how text is positioned within its container.',
      },
    },
  },
};

/**
 * Text styling options including italic, underline, and strikethrough.
 */
export const Styling: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-3)' }}>
      <Text>Normal text styling</Text>
      <Text italic>Italic text styling</Text>
      <Text underline>Underlined text styling</Text>
      <Text strikethrough>Strikethrough text styling</Text>
      <Text italic underline>Combined italic and underline</Text>
      <Text weight="bold" color="primary" underline>
        Bold primary underlined text
      </Text>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Various text styling options that can be combined for emphasis and meaning.',
      },
    },
  },
};

/**
 * Text truncation for handling overflow content.
 */
export const Truncation: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-3)' }}>
      <div style={{ width: '200px', border: '1px dashed var(--ds-border-default)', padding: 'var(--ds-spacing-2)' }}>
        <Text>
          This is a very long text that will wrap normally to multiple lines when it exceeds the container width.
        </Text>
      </div>
      <div style={{ width: '200px', border: '1px dashed var(--ds-border-default)', padding: 'var(--ds-spacing-2)' }}>
        <Text truncate>
          This is a very long text that will be truncated with an ellipsis when it exceeds the container width.
        </Text>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Text truncation helps manage long content in constrained spaces by showing an ellipsis (...).',
      },
    },
  },
};

/**
 * Different HTML elements that can be rendered.
 */
export const SemanticElements: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-3)' }}>
      <Text as="span">Rendered as span (inline)</Text>
      <Text as="p">Rendered as paragraph (block)</Text>
      <Text as="div">Rendered as div (block)</Text>
      <Text as="label">Rendered as label (for forms)</Text>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'The Text component can render as different HTML elements for proper semantic markup.',
      },
    },
  },
};

/**
 * Interactive text with click handlers.
 */
export const Interactive: Story = {
  args: {
    children: 'Click me!',
    color: 'primary',
    weight: 'medium',
    onClick: action('text-clicked'),
    style: { cursor: 'pointer' },
  },
  parameters: {
    docs: {
      description: {
        story: 'Text components can be interactive with click handlers and hover states.',
      },
    },
  },
};

/**
 * Complex example combining multiple props.
 */
export const Complex: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-4)' }}>
      <Text size="xl" weight="bold" color="primary" align="center">
        Main Heading
      </Text>
      <Text size="lg" weight="medium" color="secondary" italic>
        Subtitle with emphasis
      </Text>
      <Text as="p" align="justify">
        This is a paragraph of body text that demonstrates how the Text component
        can be used for longer content with justified alignment. It shows how the
        text flows naturally across multiple lines.
      </Text>
      <div style={{ display: 'flex', gap: 'var(--ds-spacing-4)' }}>
        <Text size="sm" color="success" weight="medium">
          ✓ Success message
        </Text>
        <Text size="sm" color="warning" weight="medium">
          ⚠ Warning message
        </Text>
        <Text size="sm" color="danger" weight="medium">
          ✗ Error message
        </Text>
      </div>
      <Text size="xs" color="secondary" align="center">
        Footer text or additional information
      </Text>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'A complex example showing how multiple Text components work together to create a rich content layout.',
      },
    },
  },
};

/**
 * Playground story for experimenting with all props.
 */
export const Playground: Story = {
  args: {
    children: 'Customize this text using the controls below',
    size: 'md',
    weight: 'normal',
    align: 'left',
    as: 'span',
  },
  parameters: {
    docs: {
      description: {
        story: 'Use the controls panel to experiment with all available props and see how they affect the text rendering.',
      },
    },
  },
};