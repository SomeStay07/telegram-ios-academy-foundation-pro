import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

const meta: Meta = {
  title: 'Design System/Design Tokens',
  parameters: {
    docs: {
      description: {
        component: `
# Design Tokens

This page showcases all the design tokens used throughout the Telegram iOS Academy UI library. 
Design tokens ensure consistency across all components and make theming possible.

## Token Categories

- **Colors**: Surface, content, border, and interactive colors
- **Typography**: Font families, sizes, weights, and line heights  
- **Spacing**: Consistent spacing scale for margins, padding, and gaps
- **Radius**: Border radius values for different component types
- **Shadows**: Elevation shadows for depth and hierarchy
- **Motion**: Animation durations and easing functions
        `,
      },
    },
  },
};

export default meta;

type Story = StoryObj;

// Color Token Display Component
const ColorToken = ({ name, value, description }: { name: string; value: string; description?: string }) => (
  <div style={{ marginBottom: 'var(--ds-spacing-4)' }}>
    <div 
      style={{ 
        backgroundColor: value,
        width: '100px',
        height: '60px',
        borderRadius: 'var(--ds-radius-md)',
        border: '1px solid var(--ds-border-default)',
        marginBottom: 'var(--ds-spacing-2)'
      }}
    />
    <div style={{ fontSize: 'var(--ds-typography-size-sm)', fontWeight: 'var(--ds-typography-weight-medium)' }}>
      {name}
    </div>
    <div style={{ fontSize: 'var(--ds-typography-size-xs)', color: 'var(--ds-content-secondary)' }}>
      {value}
    </div>
    {description && (
      <div style={{ fontSize: 'var(--ds-typography-size-xs)', color: 'var(--ds-content-tertiary)' }}>
        {description}
      </div>
    )}
  </div>
);

// Typography Token Display Component
const TypographyToken = ({ name, property, value }: { name: string; property: string; value: string }) => (
  <div style={{ marginBottom: 'var(--ds-spacing-3)', padding: 'var(--ds-spacing-3)', border: '1px solid var(--ds-border-default)', borderRadius: 'var(--ds-radius-sm)' }}>
    <div style={{ fontSize: 'var(--ds-typography-size-sm)', fontWeight: 'var(--ds-typography-weight-medium)', marginBottom: 'var(--ds-spacing-1)' }}>
      {name}
    </div>
    <div style={{ fontSize: 'var(--ds-typography-size-xs)', color: 'var(--ds-content-secondary)', marginBottom: 'var(--ds-spacing-2)' }}>
      {property}: {value}
    </div>
    <div style={{ [property]: value }}>
      The quick brown fox jumps over the lazy dog
    </div>
  </div>
);

// Spacing Token Display Component
const SpacingToken = ({ name, value }: { name: string; value: string }) => (
  <div style={{ marginBottom: 'var(--ds-spacing-3)', display: 'flex', alignItems: 'center', gap: 'var(--ds-spacing-3)' }}>
    <div 
      style={{ 
        backgroundColor: 'var(--ds-interactive-primary)',
        width: value,
        height: '20px',
        borderRadius: 'var(--ds-radius-xs)'
      }}
    />
    <div>
      <div style={{ fontSize: 'var(--ds-typography-size-sm)', fontWeight: 'var(--ds-typography-weight-medium)' }}>
        {name}
      </div>
      <div style={{ fontSize: 'var(--ds-typography-size-xs)', color: 'var(--ds-content-secondary)' }}>
        {value}
      </div>
    </div>
  </div>
);

export const Colors: Story = {
  render: () => (
    <div style={{ padding: 'var(--ds-spacing-6)' }}>
      <h2 style={{ marginBottom: 'var(--ds-spacing-4)', fontSize: 'var(--ds-typography-size-xl)', fontWeight: 'var(--ds-typography-weight-semibold)' }}>
        Color Tokens
      </h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: 'var(--ds-spacing-4)', marginBottom: 'var(--ds-spacing-8)' }}>
        <div>
          <h3 style={{ marginBottom: 'var(--ds-spacing-3)', fontSize: 'var(--ds-typography-size-lg)', fontWeight: 'var(--ds-typography-weight-medium)' }}>Surface</h3>
          <ColorToken name="Primary" value="var(--ds-surface-primary)" description="Main background" />
          <ColorToken name="Secondary" value="var(--ds-surface-secondary)" description="Card backgrounds" />
          <ColorToken name="Tertiary" value="var(--ds-surface-tertiary)" description="Subtle backgrounds" />
          <ColorToken name="Overlay" value="var(--ds-surface-overlay)" description="Modal overlays" />
        </div>
        
        <div>
          <h3 style={{ marginBottom: 'var(--ds-spacing-3)', fontSize: 'var(--ds-typography-size-lg)', fontWeight: 'var(--ds-typography-weight-medium)' }}>Content</h3>
          <ColorToken name="Primary" value="var(--ds-content-primary)" description="Main text" />
          <ColorToken name="Secondary" value="var(--ds-content-secondary)" description="Supporting text" />
          <ColorToken name="Tertiary" value="var(--ds-content-tertiary)" description="Subtle text" />
          <ColorToken name="Inverse" value="var(--ds-content-inverse)" description="Text on dark backgrounds" />
        </div>
        
        <div>
          <h3 style={{ marginBottom: 'var(--ds-spacing-3)', fontSize: 'var(--ds-typography-size-lg)', fontWeight: 'var(--ds-typography-weight-medium)' }}>Interactive</h3>
          <ColorToken name="Primary" value="var(--ds-interactive-primary)" description="Primary actions" />
          <ColorToken name="Primary Hover" value="var(--ds-interactive-primary-hover)" description="Primary hover state" />
          <ColorToken name="Secondary" value="var(--ds-interactive-secondary)" description="Secondary actions" />
          <ColorToken name="Danger" value="var(--ds-interactive-danger)" description="Destructive actions" />
        </div>
        
        <div>
          <h3 style={{ marginBottom: 'var(--ds-spacing-3)', fontSize: 'var(--ds-typography-size-lg)', fontWeight: 'var(--ds-typography-weight-medium)' }}>Border</h3>
          <ColorToken name="Default" value="var(--ds-border-default)" description="Standard borders" />
          <ColorToken name="Subtle" value="var(--ds-border-subtle)" description="Subtle dividers" />
          <ColorToken name="Strong" value="var(--ds-border-strong)" description="Emphasized borders" />
          <ColorToken name="Focus" value="var(--ds-border-focus)" description="Focus indicators" />
        </div>
      </div>
    </div>
  ),
};

export const Typography: Story = {
  render: () => (
    <div style={{ padding: 'var(--ds-spacing-6)' }}>
      <h2 style={{ marginBottom: 'var(--ds-spacing-4)', fontSize: 'var(--ds-typography-size-xl)', fontWeight: 'var(--ds-typography-weight-semibold)' }}>
        Typography Tokens
      </h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--ds-spacing-6)' }}>
        <div>
          <h3 style={{ marginBottom: 'var(--ds-spacing-3)', fontSize: 'var(--ds-typography-size-lg)', fontWeight: 'var(--ds-typography-weight-medium)' }}>Font Sizes</h3>
          <TypographyToken name="Extra Small" property="fontSize" value="var(--ds-typography-size-xs)" />
          <TypographyToken name="Small" property="fontSize" value="var(--ds-typography-size-sm)" />
          <TypographyToken name="Medium" property="fontSize" value="var(--ds-typography-size-md)" />
          <TypographyToken name="Large" property="fontSize" value="var(--ds-typography-size-lg)" />
          <TypographyToken name="Extra Large" property="fontSize" value="var(--ds-typography-size-xl)" />
        </div>
        
        <div>
          <h3 style={{ marginBottom: 'var(--ds-spacing-3)', fontSize: 'var(--ds-typography-size-lg)', fontWeight: 'var(--ds-typography-weight-medium)' }}>Font Weights</h3>
          <TypographyToken name="Normal" property="fontWeight" value="var(--ds-typography-weight-normal)" />
          <TypographyToken name="Medium" property="fontWeight" value="var(--ds-typography-weight-medium)" />
          <TypographyToken name="Semibold" property="fontWeight" value="var(--ds-typography-weight-semibold)" />
          <TypographyToken name="Bold" property="fontWeight" value="var(--ds-typography-weight-bold)" />
        </div>
      </div>
    </div>
  ),
};

export const Spacing: Story = {
  render: () => (
    <div style={{ padding: 'var(--ds-spacing-6)' }}>
      <h2 style={{ marginBottom: 'var(--ds-spacing-4)', fontSize: 'var(--ds-typography-size-xl)', fontWeight: 'var(--ds-typography-weight-semibold)' }}>
        Spacing Tokens
      </h2>
      
      <div style={{ maxWidth: '400px' }}>
        <SpacingToken name="1" value="var(--ds-spacing-1)" />
        <SpacingToken name="2" value="var(--ds-spacing-2)" />
        <SpacingToken name="3" value="var(--ds-spacing-3)" />
        <SpacingToken name="4" value="var(--ds-spacing-4)" />
        <SpacingToken name="5" value="var(--ds-spacing-5)" />
        <SpacingToken name="6" value="var(--ds-spacing-6)" />
        <SpacingToken name="8" value="var(--ds-spacing-8)" />
        <SpacingToken name="10" value="var(--ds-spacing-10)" />
        <SpacingToken name="12" value="var(--ds-spacing-12)" />
        <SpacingToken name="16" value="var(--ds-spacing-16)" />
        <SpacingToken name="20" value="var(--ds-spacing-20)" />
        <SpacingToken name="24" value="var(--ds-spacing-24)" />
      </div>
    </div>
  ),
};

export const BorderRadius: Story = {
  render: () => (
    <div style={{ padding: 'var(--ds-spacing-6)' }}>
      <h2 style={{ marginBottom: 'var(--ds-spacing-4)', fontSize: 'var(--ds-typography-size-xl)', fontWeight: 'var(--ds-typography-weight-semibold)' }}>
        Border Radius Tokens
      </h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 'var(--ds-spacing-4)' }}>
        {[
          { name: 'None', value: 'var(--ds-radius-none)' },
          { name: 'XS', value: 'var(--ds-radius-xs)' },
          { name: 'SM', value: 'var(--ds-radius-sm)' },
          { name: 'MD', value: 'var(--ds-radius-md)' },
          { name: 'LG', value: 'var(--ds-radius-lg)' },
          { name: 'XL', value: 'var(--ds-radius-xl)' },
          { name: 'Full', value: 'var(--ds-radius-full)' },
        ].map(({ name, value }) => (
          <div key={name} style={{ textAlign: 'center' }}>
            <div 
              style={{ 
                backgroundColor: 'var(--ds-interactive-primary)',
                width: '80px',
                height: '80px',
                borderRadius: value,
                margin: '0 auto var(--ds-spacing-2)'
              }}
            />
            <div style={{ fontSize: 'var(--ds-typography-size-sm)', fontWeight: 'var(--ds-typography-weight-medium)' }}>
              {name}
            </div>
            <div style={{ fontSize: 'var(--ds-typography-size-xs)', color: 'var(--ds-content-secondary)' }}>
              {value}
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
};

export const Shadows: Story = {
  render: () => (
    <div style={{ padding: 'var(--ds-spacing-6)' }}>
      <h2 style={{ marginBottom: 'var(--ds-spacing-4)', fontSize: 'var(--ds-typography-size-xl)', fontWeight: 'var(--ds-typography-weight-semibold)' }}>
        Shadow Tokens
      </h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--ds-spacing-6)' }}>
        {[
          { name: 'SM', value: 'var(--ds-shadow-sm)' },
          { name: 'MD', value: 'var(--ds-shadow-md)' },
          { name: 'LG', value: 'var(--ds-shadow-lg)' },
          { name: 'XL', value: 'var(--ds-shadow-xl)' },
        ].map(({ name, value }) => (
          <div key={name} style={{ textAlign: 'center' }}>
            <div 
              style={{ 
                backgroundColor: 'var(--ds-surface-secondary)',
                width: '120px',
                height: '80px',
                borderRadius: 'var(--ds-radius-md)',
                boxShadow: value,
                margin: '0 auto var(--ds-spacing-3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 'var(--ds-typography-size-sm)',
                color: 'var(--ds-content-secondary)'
              }}
            >
              Shadow {name}
            </div>
            <div style={{ fontSize: 'var(--ds-typography-size-sm)', fontWeight: 'var(--ds-typography-weight-medium)' }}>
              {name}
            </div>
            <div style={{ fontSize: 'var(--ds-typography-size-xs)', color: 'var(--ds-content-secondary)' }}>
              {value}
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
};

export const Motion: Story = {
  render: () => (
    <div style={{ padding: 'var(--ds-spacing-6)' }}>
      <h2 style={{ marginBottom: 'var(--ds-spacing-4)', fontSize: 'var(--ds-typography-size-xl)', fontWeight: 'var(--ds-typography-weight-semibold)' }}>
        Motion Tokens
      </h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 'var(--ds-spacing-6)' }}>
        {[
          { name: 'Fast', duration: 'var(--ds-motion-duration-fast)', easing: 'var(--ds-motion-easing-ease-out)' },
          { name: 'Normal', duration: 'var(--ds-motion-duration-normal)', easing: 'var(--ds-motion-easing-ease-in-out)' },
          { name: 'Slow', duration: 'var(--ds-motion-duration-slow)', easing: 'var(--ds-motion-easing-ease-in)' },
        ].map(({ name, duration, easing }) => {
          const [isAnimating, setIsAnimating] = React.useState(false);
          
          return (
            <div key={name} style={{ textAlign: 'center' }}>
              <div 
                style={{ 
                  backgroundColor: 'var(--ds-interactive-primary)',
                  width: '60px',
                  height: '60px',
                  borderRadius: 'var(--ds-radius-md)',
                  margin: '0 auto var(--ds-spacing-3)',
                  transform: isAnimating ? 'translateX(100px) rotate(180deg)' : 'translateX(0) rotate(0deg)',
                  transition: `transform ${duration} ${easing}`,
                  cursor: 'pointer'
                }}
                onClick={() => setIsAnimating(!isAnimating)}
              />
              <div style={{ fontSize: 'var(--ds-typography-size-sm)', fontWeight: 'var(--ds-typography-weight-medium)', marginBottom: 'var(--ds-spacing-1)' }}>
                {name}
              </div>
              <div style={{ fontSize: 'var(--ds-typography-size-xs)', color: 'var(--ds-content-secondary)' }}>
                Duration: {duration}<br />
                Easing: {easing}
              </div>
              <div style={{ fontSize: 'var(--ds-typography-size-xs)', color: 'var(--ds-content-tertiary)', marginTop: 'var(--ds-spacing-1)' }}>
                Click to animate
              </div>
            </div>
          );
        })}
      </div>
    </div>
  ),
};