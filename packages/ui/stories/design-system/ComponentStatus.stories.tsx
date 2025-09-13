import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Text } from '../../src/components/Text/Text';
import { Card } from '../../src/components/Card/Card';

const meta: Meta = {
  title: 'Design System/Component Status',
  parameters: {
    docs: {
      description: {
        component: `
# Component Status Dashboard

This page provides an overview of all components in the Telegram iOS Academy UI library, 
their implementation status, accessibility compliance, and design token usage.

## Status Indicators

- **✅ Complete**: Fully implemented with comprehensive tests and documentation
- **🚧 In Progress**: Partially implemented or under active development
- **📋 Planned**: Specified but not yet implemented
- **⚠️ Needs Review**: Requires attention or updates

## Quality Criteria

Each component is evaluated against:
- **Implementation**: Core functionality and API completeness
- **Accessibility**: WCAG 2.1 AA compliance and keyboard navigation
- **Design Tokens**: Consistent use of design system tokens
- **Documentation**: Comprehensive stories and usage examples
- **Testing**: Unit tests and visual regression coverage
        `,
      },
    },
  },
};

export default meta;

type Story = StoryObj;

// Component status data
const componentData = [
  // Typography Components
  {
    category: 'Typography',
    components: [
      {
        name: 'Text',
        status: '✅',
        implementation: '✅',
        accessibility: '✅',
        designTokens: '✅',
        documentation: '✅',
        testing: '✅',
        description: 'Versatile text component with size, weight, and color variants',
        stories: ['Default', 'Sizes', 'Weights', 'Colors', 'Styling', 'Interactive'],
      },
      {
        name: 'Heading',
        status: '✅',
        implementation: '✅',
        accessibility: '✅',
        designTokens: '✅',
        documentation: '🚧',
        testing: '🚧',
        description: 'Semantic heading component with proper hierarchy',
        stories: ['Levels', 'Sizes', 'Colors'],
      },
    ],
  },
  // Layout Components
  {
    category: 'Layout',
    components: [
      {
        name: 'Stack',
        status: '✅',
        implementation: '✅',
        accessibility: '✅',
        designTokens: '✅',
        documentation: '🚧',
        testing: '🚧',
        description: 'Flexible layout component for arranging elements',
        stories: ['Direction', 'Spacing', 'Alignment', 'Dividers'],
      },
      {
        name: 'Divider',
        status: '✅',
        implementation: '✅',
        accessibility: '✅',
        designTokens: '✅',
        documentation: '🚧',
        testing: '🚧',
        description: 'Visual separator with optional labels',
        stories: ['Horizontal', 'Vertical', 'With Label'],
      },
    ],
  },
  // Interactive Components
  {
    category: 'Interactive',
    components: [
      {
        name: 'Button',
        status: '✅',
        implementation: '✅',
        accessibility: '✅',
        designTokens: '✅',
        documentation: '🚧',
        testing: '🚧',
        description: 'Interactive button with multiple variants and states',
        stories: ['Variants', 'Sizes', 'States', 'Loading', 'Icons'],
      },
      {
        name: 'Input',
        status: '✅',
        implementation: '✅',
        accessibility: '✅',
        designTokens: '✅',
        documentation: '🚧',
        testing: '🚧',
        description: 'Form input with validation and helper text support',
        stories: ['Basic', 'Variants', 'Validation', 'Types'],
      },
      {
        name: 'Link',
        status: '✅',
        implementation: '✅',
        accessibility: '✅',
        designTokens: '✅',
        documentation: '🚧',
        testing: '🚧',
        description: 'Navigation link component with external link support',
        stories: ['Internal', 'External', 'Styling'],
      },
    ],
  },
  // Feedback Components
  {
    category: 'Feedback',
    components: [
      {
        name: 'Alert',
        status: '🚧',
        implementation: '🚧',
        accessibility: '🚧',
        designTokens: '✅',
        documentation: '📋',
        testing: '📋',
        description: 'Alert component for important messages',
        stories: ['Variants', 'With Actions', 'Dismissible'],
      },
      {
        name: 'Spinner',
        status: '🚧',
        implementation: '🚧',
        accessibility: '🚧',
        designTokens: '✅',
        documentation: '📋',
        testing: '📋',
        description: 'Loading spinner for async operations',
        stories: ['Sizes', 'Colors'],
      },
    ],
  },
  // Content Components
  {
    category: 'Content',
    components: [
      {
        name: 'Card',
        status: '✅',
        implementation: '✅',
        accessibility: '✅',
        designTokens: '✅',
        documentation: '🚧',
        testing: '🚧',
        description: 'Container component with elevation variants',
        stories: ['Variants', 'With Content', 'Interactive'],
      },
      {
        name: 'CodeBlock',
        status: '✅',
        implementation: '✅',
        accessibility: '✅',
        designTokens: '✅',
        documentation: '🚧',
        testing: '🚧',
        description: 'Syntax-highlighted code display with security features',
        stories: ['Languages', 'Features', 'Security'],
      },
      {
        name: 'Markdown',
        status: '✅',
        implementation: '✅',
        accessibility: '✅',
        designTokens: '✅',
        documentation: '🚧',
        testing: '🚧',
        description: 'Safe markdown renderer with sanitization',
        stories: ['Basic', 'Security', 'Custom Renderers'],
      },
    ],
  },
  // Navigation Components
  {
    category: 'Navigation',
    components: [
      {
        name: 'Tabs',
        status: '📋',
        implementation: '📋',
        accessibility: '📋',
        designTokens: '📋',
        documentation: '📋',
        testing: '📋',
        description: 'Tab navigation component',
        stories: ['Basic', 'Variants', 'Keyboard Navigation'],
      },
      {
        name: 'Modal',
        status: '📋',
        implementation: '📋',
        accessibility: '📋',
        designTokens: '📋',
        documentation: '📋',
        testing: '📋',
        description: 'Modal dialog component',
        stories: ['Basic', 'Sizes', 'Actions'],
      },
    ],
  },
];

// Status indicator component
const StatusBadge = ({ status, label }: { status: string; label?: string }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case '✅': return 'var(--ds-interactive-success)';
      case '🚧': return 'var(--ds-interactive-warning)';
      case '📋': return 'var(--ds-interactive-secondary)';
      case '⚠️': return 'var(--ds-interactive-danger)';
      default: return 'var(--ds-surface-tertiary)';
    }
  };

  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 'var(--ds-spacing-1)',
      padding: 'var(--ds-spacing-1) var(--ds-spacing-2)',
      backgroundColor: getStatusColor(status),
      color: status === '📋' ? 'var(--ds-content-primary)' : 'var(--ds-content-inverse)',
      borderRadius: 'var(--ds-radius-sm)',
      fontSize: 'var(--ds-typography-size-xs)',
      fontWeight: 'var(--ds-typography-weight-medium)',
    }}>
      {status} {label}
    </span>
  );
};

// Component status card
const ComponentCard = ({ component }: { component: any }) => (
  <Card variant="default" style={{ padding: 'var(--ds-spacing-4)' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: 'var(--ds-spacing-2)' }}>
      <Text weight="medium" size="lg">{component.name}</Text>
      <StatusBadge status={component.status} />
    </div>
    
    <Text size="sm" color="secondary" style={{ marginBottom: 'var(--ds-spacing-4)' }}>
      {component.description}
    </Text>

    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: 'var(--ds-spacing-2)', marginBottom: 'var(--ds-spacing-3)' }}>
      <div>
        <Text size="xs" color="secondary">Implementation</Text>
        <StatusBadge status={component.implementation} />
      </div>
      <div>
        <Text size="xs" color="secondary">A11y</Text>
        <StatusBadge status={component.accessibility} />
      </div>
      <div>
        <Text size="xs" color="secondary">Tokens</Text>
        <StatusBadge status={component.designTokens} />
      </div>
      <div>
        <Text size="xs" color="secondary">Docs</Text>
        <StatusBadge status={component.documentation} />
      </div>
      <div>
        <Text size="xs" color="secondary">Tests</Text>
        <StatusBadge status={component.testing} />
      </div>
    </div>

    {component.stories && component.stories.length > 0 && (
      <div>
        <Text size="xs" color="secondary" style={{ marginBottom: 'var(--ds-spacing-1)' }}>
          Available Stories:
        </Text>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--ds-spacing-1)' }}>
          {component.stories.map((story: string) => (
            <span key={story} style={{
              padding: 'var(--ds-spacing-1)',
              backgroundColor: 'var(--ds-surface-tertiary)',
              borderRadius: 'var(--ds-radius-xs)',
              fontSize: 'var(--ds-typography-size-xs)',
            }}>
              {story}
            </span>
          ))}
        </div>
      </div>
    )}
  </Card>
);

export const Overview: Story = {
  render: () => (
    <div style={{ padding: 'var(--ds-spacing-4)' }}>
      <div style={{ marginBottom: 'var(--ds-spacing-6)' }}>
        <Text size="xl" weight="semibold" style={{ marginBottom: 'var(--ds-spacing-2)' }}>
          Component Status Overview
        </Text>
        <Text color="secondary" style={{ marginBottom: 'var(--ds-spacing-4)' }}>
          Track the progress and quality of all design system components
        </Text>
        
        {/* Summary stats */}
        <Card variant="secondary" style={{ padding: 'var(--ds-spacing-4)', marginBottom: 'var(--ds-spacing-6)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: 'var(--ds-spacing-4)', textAlign: 'center' }}>
            <div>
              <Text size="xl" weight="bold" color="success">8</Text>
              <Text size="sm" color="secondary">Complete</Text>
            </div>
            <div>
              <Text size="xl" weight="bold" color="warning">4</Text>
              <Text size="sm" color="secondary">In Progress</Text>
            </div>
            <div>
              <Text size="xl" weight="bold" color="secondary">4</Text>
              <Text size="sm" color="secondary">Planned</Text>
            </div>
            <div>
              <Text size="xl" weight="bold">16</Text>
              <Text size="sm" color="secondary">Total</Text>
            </div>
          </div>
        </Card>
      </div>

      {componentData.map((category) => (
        <div key={category.category} style={{ marginBottom: 'var(--ds-spacing-6)' }}>
          <Text size="lg" weight="semibold" style={{ marginBottom: 'var(--ds-spacing-4)' }}>
            {category.category} Components
          </Text>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', 
            gap: 'var(--ds-spacing-4)' 
          }}>
            {category.components.map((component) => (
              <ComponentCard key={component.name} component={component} />
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Complete overview of all components in the design system with their current status and quality metrics.',
      },
    },
  },
};

// Quality checklist
const QualityChecklist = () => (
  <div style={{ maxWidth: '800px', margin: '0 auto' }}>
    <Text size="xl" weight="semibold" style={{ marginBottom: 'var(--ds-spacing-4)' }}>
      Quality Checklist
    </Text>
    
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-4)' }}>
      <Card variant="default" style={{ padding: 'var(--ds-spacing-4)' }}>
        <Text weight="medium" style={{ marginBottom: 'var(--ds-spacing-3)' }}>
          Implementation Standards
        </Text>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-2)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--ds-spacing-2)' }}>
            <StatusBadge status="✅" />
            <Text size="sm">TypeScript interfaces with comprehensive prop types</Text>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--ds-spacing-2)' }}>
            <StatusBadge status="✅" />
            <Text size="sm">Forward refs for proper component composition</Text>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--ds-spacing-2)' }}>
            <StatusBadge status="✅" />
            <Text size="sm">Consistent naming and API patterns</Text>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--ds-spacing-2)' }}>
            <StatusBadge status="✅" />
            <Text size="sm">Error boundaries and graceful degradation</Text>
          </div>
        </div>
      </Card>

      <Card variant="default" style={{ padding: 'var(--ds-spacing-4)' }}>
        <Text weight="medium" style={{ marginBottom: 'var(--ds-spacing-3)' }}>
          Accessibility Requirements
        </Text>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-2)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--ds-spacing-2)' }}>
            <StatusBadge status="✅" />
            <Text size="sm">WCAG 2.1 AA compliance</Text>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--ds-spacing-2)' }}>
            <StatusBadge status="✅" />
            <Text size="sm">Keyboard navigation support</Text>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--ds-spacing-2)' }}>
            <StatusBadge status="✅" />
            <Text size="sm">Screen reader compatibility</Text>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--ds-spacing-2)' }}>
            <StatusBadge status="🚧" />
            <Text size="sm">High contrast mode support</Text>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--ds-spacing-2)' }}>
            <StatusBadge status="🚧" />
            <Text size="sm">Reduced motion preferences</Text>
          </div>
        </div>
      </Card>

      <Card variant="default" style={{ padding: 'var(--ds-spacing-4)' }}>
        <Text weight="medium" style={{ marginBottom: 'var(--ds-spacing-3)' }}>
          Design Token Integration
        </Text>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-2)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--ds-spacing-2)' }}>
            <StatusBadge status="✅" />
            <Text size="sm">No hardcoded values (colors, spacing, typography)</Text>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--ds-spacing-2)' }}>
            <StatusBadge status="✅" />
            <Text size="sm">Consistent token usage across variants</Text>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--ds-spacing-2)' }}>
            <StatusBadge status="✅" />
            <Text size="sm">Theme-aware styling with CSS custom properties</Text>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--ds-spacing-2)' }}>
            <StatusBadge status="🚧" />
            <Text size="sm">Motion tokens for animations</Text>
          </div>
        </div>
      </Card>

      <Card variant="default" style={{ padding: 'var(--ds-spacing-4)' }}>
        <Text weight="medium" style={{ marginBottom: 'var(--ds-spacing-3)' }}>
          Documentation & Testing
        </Text>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-2)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--ds-spacing-2)' }}>
            <StatusBadge status="🚧" />
            <Text size="sm">Comprehensive Storybook stories</Text>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--ds-spacing-2)' }}>
            <StatusBadge status="📋" />
            <Text size="sm">Unit tests with React Testing Library</Text>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--ds-spacing-2)' }}>
            <StatusBadge status="📋" />
            <Text size="sm">Visual regression testing</Text>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--ds-spacing-2)' }}>
            <StatusBadge status="📋" />
            <Text size="sm">Performance benchmarks</Text>
          </div>
        </div>
      </Card>
    </div>
  </div>
);

export const QualityStandards: Story = {
  render: QualityChecklist,
  parameters: {
    docs: {
      description: {
        story: 'Quality checklist and standards that each component should meet to ensure consistency and reliability.',
      },
    },
  },
};