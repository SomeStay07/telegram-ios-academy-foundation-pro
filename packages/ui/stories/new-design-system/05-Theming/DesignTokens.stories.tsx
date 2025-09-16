import type { Meta, StoryObj } from '@storybook/react';
import { Card, CardHeader, CardTitle, CardContent, Button, Input } from '../../../src/components/Enhanced';
import '../../../src/styles/design-tokens.css';

const meta = {
  title: 'Design System 3.0/05-Theming/Design Tokens',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# Design Tokens System

Централизованная система дизайн-токенов для Telegram iOS Academy Design System 3.0. Обеспечивает последовательность дизайна и упрощает поддержку тем.

## Основные категории

- **Colors** - Цветовая палитра и семантические цвета
- **Typography** - Шрифты, размеры и межстрочные интервалы
- **Spacing** - Отступы и размеры компонентов
- **Border Radius** - Радиусы скругления
- **Shadows** - Тени и глубина
- **Transitions** - Анимации и переходы

## Telegram WebApp Integration

Автоматическая интеграция с CSS переменными Telegram WebApp для нативного вида в мессенджере.

## Темизация

Поддержка светлой/темной темы с автоматическим переключением на основе системных настроек.
        `
      }
    }
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;

export const ColorTokens: StoryObj = {
  name: 'Цветовые токены',
  render: () => (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gray-900">Color Tokens</h1>
          <p className="text-xl text-gray-600">
            Системные цвета Design System 3.0 с поддержкой тем
          </p>
        </div>

        {/* Primary Colors */}
        <Card variant="elevated">
          <CardHeader>
            <CardTitle>Primary Colors</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-5 md:grid-cols-11 gap-3">
              {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950].map((shade) => (
                <div key={shade} className="text-center">
                  <div 
                    className="w-full h-16 rounded-lg shadow-sm border border-gray-200 mb-2"
                    style={{ backgroundColor: `var(--color-primary-${shade})` }}
                  />
                  <div className="text-xs font-medium text-gray-700">{shade}</div>
                  <div className="text-xs text-gray-500 font-mono">
                    primary-{shade}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Semantic Colors */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Success */}
          <Card variant="elevated">
            <CardHeader>
              <CardTitle className="text-green-700">Success Colors</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-2">
                {[400, 500, 600].map((shade) => (
                  <div key={shade} className="text-center">
                    <div 
                      className="w-full h-12 rounded-lg mb-2"
                      style={{ backgroundColor: `var(--color-success-${shade})` }}
                    />
                    <div className="text-xs text-gray-600">{shade}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Warning */}
          <Card variant="elevated">
            <CardHeader>
              <CardTitle className="text-orange-700">Warning Colors</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-2">
                {[400, 500, 600].map((shade) => (
                  <div key={shade} className="text-center">
                    <div 
                      className="w-full h-12 rounded-lg mb-2"
                      style={{ backgroundColor: `var(--color-warning-${shade})` }}
                    />
                    <div className="text-xs text-gray-600">{shade}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Error */}
          <Card variant="elevated">
            <CardHeader>
              <CardTitle className="text-red-700">Error Colors</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-2">
                {[400, 500, 600].map((shade) => (
                  <div key={shade} className="text-center">
                    <div 
                      className="w-full h-12 rounded-lg mb-2"
                      style={{ backgroundColor: `var(--color-error-${shade})` }}
                    />
                    <div className="text-xs text-gray-600">{shade}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Educational */}
          <Card variant="elevated">
            <CardHeader>
              <CardTitle className="text-purple-700">Educational Colors</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {[
                  { name: 'Purple', var: '--color-education-purple' },
                  { name: 'Indigo', var: '--color-education-indigo' },
                  { name: 'Teal', var: '--color-education-teal' }
                ].map((color) => (
                  <div key={color.name} className="flex items-center gap-3">
                    <div 
                      className="w-8 h-8 rounded-lg"
                      style={{ backgroundColor: `var(${color.var})` }}
                    />
                    <span className="text-sm font-medium">{color.name}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Text Colors Demo */}
        <Card variant="elevated">
          <CardHeader>
            <CardTitle>Text Colors</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-4 h-4 rounded" style={{ backgroundColor: 'var(--text-primary)' }} />
                <span style={{ color: 'var(--text-primary)' }} className="font-medium">
                  Primary Text - основной текст для заголовков и важного контента
                </span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-4 h-4 rounded" style={{ backgroundColor: 'var(--text-secondary)' }} />
                <span style={{ color: 'var(--text-secondary)' }}>
                  Secondary Text - вторичный текст для описаний и подписей
                </span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-4 h-4 rounded" style={{ backgroundColor: 'var(--text-tertiary)' }} />
                <span style={{ color: 'var(--text-tertiary)' }}>
                  Tertiary Text - третичный текст для вспомогательной информации
                </span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-4 h-4 rounded" style={{ backgroundColor: 'var(--text-disabled)' }} />
                <span style={{ color: 'var(--text-disabled)' }}>
                  Disabled Text - текст для отключенных элементов
                </span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-4 h-4 rounded" style={{ backgroundColor: 'var(--text-link)' }} />
                <span style={{ color: 'var(--text-link)' }} className="underline cursor-pointer">
                  Link Text - цвет для ссылок и интерактивных элементов
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
};

export const TypographyTokens: StoryObj = {
  name: 'Типографические токены',
  render: () => (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-gray-900">Typography Scale</h1>
        <p className="text-lg text-gray-600">
          Типографическая система с поддержкой SF Pro и system fonts
        </p>
      </div>

      {/* Font Sizes */}
      <Card variant="elevated">
        <CardHeader>
          <CardTitle>Font Sizes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { token: 'text-xs', size: '12px', sample: 'Extra Small Text' },
              { token: 'text-sm', size: '14px', sample: 'Small Text' },
              { token: 'text-base', size: '16px', sample: 'Base Text' },
              { token: 'text-lg', size: '18px', sample: 'Large Text' },
              { token: 'text-xl', size: '20px', sample: 'Extra Large Text' },
              { token: 'text-2xl', size: '24px', sample: 'Heading Text' },
              { token: 'text-3xl', size: '30px', sample: 'Large Heading' },
              { token: 'text-4xl', size: '36px', sample: 'Display Text' },
              { token: 'text-5xl', size: '48px', sample: 'Hero Text' }
            ].map((item) => (
              <div key={item.token} className="flex items-center justify-between py-2 border-b border-gray-100">
                <div className="flex items-center gap-4">
                  <code className="text-sm bg-gray-100 px-2 py-1 rounded font-mono">
                    {item.token}
                  </code>
                  <span className="text-sm text-gray-500">{item.size}</span>
                </div>
                <span style={{ fontSize: `var(--${item.token})` }} className="font-medium">
                  {item.sample}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Font Weights */}
      <Card variant="elevated">
        <CardHeader>
          <CardTitle>Font Weights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { token: 'font-light', weight: '300', sample: 'Light Weight' },
              { token: 'font-normal', weight: '400', sample: 'Normal Weight' },
              { token: 'font-medium', weight: '500', sample: 'Medium Weight' },
              { token: 'font-semibold', weight: '600', sample: 'Semibold Weight' },
              { token: 'font-bold', weight: '700', sample: 'Bold Weight' }
            ].map((item) => (
              <div key={item.token} className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <code className="text-sm bg-gray-100 px-2 py-1 rounded font-mono">
                    {item.token}
                  </code>
                  <span className="text-sm text-gray-500">{item.weight}</span>
                </div>
                <span 
                  style={{ fontWeight: `var(--${item.token})` }}
                  className="text-lg"
                >
                  {item.sample}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Line Heights */}
      <Card variant="elevated">
        <CardHeader>
          <CardTitle>Line Heights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { token: 'leading-tight', value: '1.25', sample: 'Tight line height for headings and compact text blocks. Perfect for titles and labels.' },
              { token: 'leading-normal', value: '1.5', sample: 'Normal line height for body text. Provides good readability for paragraphs and longer content.' },
              { token: 'leading-relaxed', value: '1.625', sample: 'Relaxed line height for improved readability. Great for educational content and articles.' }
            ].map((item) => (
              <div key={item.token} className="space-y-2">
                <div className="flex items-center gap-4">
                  <code className="text-sm bg-gray-100 px-2 py-1 rounded font-mono">
                    {item.token}
                  </code>
                  <span className="text-sm text-gray-500">{item.value}</span>
                </div>
                <p 
                  style={{ lineHeight: `var(--${item.token})` }}
                  className="text-sm text-gray-700 max-w-md"
                >
                  {item.sample}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
};

export const SpacingTokens: StoryObj = {
  name: 'Spacing токены',
  render: () => (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-gray-900">Spacing Scale</h1>
        <p className="text-lg text-gray-600">
          Система отступов и размеров для последовательного дизайна
        </p>
      </div>

      {/* Spacing Scale */}
      <Card variant="elevated">
        <CardHeader>
          <CardTitle>Spacing Values</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { token: 'space-1', size: '4px', value: '0.25rem' },
              { token: 'space-2', size: '8px', value: '0.5rem' },
              { token: 'space-3', size: '12px', value: '0.75rem' },
              { token: 'space-4', size: '16px', value: '1rem' },
              { token: 'space-5', size: '20px', value: '1.25rem' },
              { token: 'space-6', size: '24px', value: '1.5rem' },
              { token: 'space-8', size: '32px', value: '2rem' },
              { token: 'space-10', size: '40px', value: '2.5rem' },
              { token: 'space-12', size: '48px', value: '3rem' },
              { token: 'space-16', size: '64px', value: '4rem' }
            ].map((item) => (
              <div key={item.token} className="flex items-center gap-4">
                <code className="text-sm bg-gray-100 px-2 py-1 rounded font-mono w-20">
                  {item.token}
                </code>
                <div className="flex items-center gap-4 flex-1">
                  <div 
                    className="bg-blue-500 h-4"
                    style={{ width: `var(--${item.token})` }}
                  />
                  <span className="text-sm text-gray-600">{item.size}</span>
                  <span className="text-sm text-gray-500">({item.value})</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Component Sizes */}
      <Card variant="elevated">
        <CardHeader>
          <CardTitle>Component Sizes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold mb-3">Button Heights</h4>
              <div className="space-y-3">
                {[
                  { size: 'xs', height: '24px' },
                  { size: 'sm', height: '32px' },
                  { size: 'md', height: '40px' },
                  { size: 'lg', height: '48px' },
                  { size: 'xl', height: '56px' }
                ].map((item) => (
                  <div key={item.size} className="flex items-center gap-4">
                    <span className="w-8 text-sm font-medium">{item.size}</span>
                    <Button size={item.size as any} variant="outline">
                      Button {item.size}
                    </Button>
                    <span className="text-sm text-gray-500">{item.height}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Input Heights</h4>
              <div className="space-y-3 max-w-sm">
                {[
                  { size: 'sm', height: '32px' },
                  { size: 'md', height: '40px' },
                  { size: 'lg', height: '48px' }
                ].map((item) => (
                  <div key={item.size} className="space-y-1">
                    <div className="flex items-center gap-4">
                      <span className="w-8 text-sm font-medium">{item.size}</span>
                      <span className="text-sm text-gray-500">{item.height}</span>
                    </div>
                    <Input 
                      size={item.size as any} 
                      placeholder={`Input ${item.size}`}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
};

export const BorderRadiusTokens: StoryObj = {
  name: 'Border Radius токены',
  render: () => (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-gray-900">Border Radius Scale</h1>
        <p className="text-lg text-gray-600">
          Радиусы скругления для создания современного дизайна
        </p>
      </div>

      <Card variant="elevated">
        <CardHeader>
          <CardTitle>Radius Values</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { token: 'radius-none', size: '0px', label: 'None' },
              { token: 'radius-sm', size: '2px', label: 'Small' },
              { token: 'radius-base', size: '4px', label: 'Base' },
              { token: 'radius-md', size: '6px', label: 'Medium' },
              { token: 'radius-lg', size: '8px', label: 'Large' },
              { token: 'radius-xl', size: '12px', label: 'XL' },
              { token: 'radius-2xl', size: '16px', label: '2XL' },
              { token: 'radius-full', size: '50%', label: 'Full' }
            ].map((item) => (
              <div key={item.token} className="text-center space-y-3">
                <div 
                  className="w-16 h-16 bg-blue-500 mx-auto"
                  style={{ borderRadius: `var(--${item.token})` }}
                />
                <div>
                  <div className="font-medium text-gray-900">{item.label}</div>
                  <code className="text-xs text-gray-600">{item.token}</code>
                  <div className="text-xs text-gray-500">{item.size}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Component Examples */}
      <Card variant="elevated">
        <CardHeader>
          <CardTitle>Component Examples</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold mb-3">Buttons with different radius</h4>
              <div className="flex flex-wrap gap-3">
                <Button variant="primary" className="rounded-none">
                  None (0px)
                </Button>
                <Button variant="primary" className="rounded">
                  Base (4px)
                </Button>
                <Button variant="primary" className="rounded-lg">
                  Large (8px)
                </Button>
                <Button variant="primary" className="rounded-xl">
                  XL (12px)
                </Button>
                <Button variant="primary" className="rounded-full">
                  Full (50%)
                </Button>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Cards with different radius</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card className="rounded-none">
                  <CardContent size="sm">
                    <p className="text-sm">None</p>
                  </CardContent>
                </Card>
                <Card className="rounded-lg">
                  <CardContent size="sm">
                    <p className="text-sm">Large</p>
                  </CardContent>
                </Card>
                <Card className="rounded-xl">
                  <CardContent size="sm">
                    <p className="text-sm">XL</p>
                  </CardContent>
                </Card>
                <Card className="rounded-2xl">
                  <CardContent size="sm">
                    <p className="text-sm">2XL</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
};

export const TelegramIntegration: StoryObj = {
  name: 'Telegram WebApp Integration',
  render: () => (
    <div className="telegram-webapp min-h-screen p-6" style={{ 
      backgroundColor: 'var(--tg-color-bg)', 
      color: 'var(--tg-color-text)' 
    }}>
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold">Telegram Theme Integration</h1>
          <p className="text-lg opacity-80">
            Автоматическая адаптация к темам Telegram WebApp
          </p>
        </div>

        {/* Theme Variables */}
        <Card variant="telegram">
          <CardHeader>
            <CardTitle>Telegram CSS Variables</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { var: '--tg-theme-bg-color', name: 'Background Color', fallback: '#ffffff' },
                { var: '--tg-theme-text-color', name: 'Text Color', fallback: '#000000' },
                { var: '--tg-theme-hint-color', name: 'Hint Color', fallback: '#999999' },
                { var: '--tg-theme-link-color', name: 'Link Color', fallback: '#007AFF' },
                { var: '--tg-theme-button-color', name: 'Button Color', fallback: '#007AFF' },
                { var: '--tg-theme-button-text-color', name: 'Button Text', fallback: '#ffffff' },
                { var: '--tg-theme-secondary-bg-color', name: 'Secondary BG', fallback: '#f1f1f1' },
                { var: '--tg-theme-header-bg-color', name: 'Header BG', fallback: '#ffffff' }
              ].map((item) => (
                <div key={item.var} className="flex items-center gap-3 p-3 rounded-lg border border-gray-200">
                  <div 
                    className="w-8 h-8 rounded border border-gray-300"
                    style={{ backgroundColor: `var(${item.var}, ${item.fallback})` }}
                  />
                  <div>
                    <div className="font-medium text-sm">{item.name}</div>
                    <code className="text-xs opacity-70">{item.var}</code>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Component Examples */}
        <Card variant="telegram">
          <CardHeader>
            <CardTitle>Components with Telegram Theme</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold mb-3">Buttons</h4>
                <div className="flex flex-wrap gap-3">
                  <Button variant="telegram">Telegram Button</Button>
                  <Button variant="outline">Outline Button</Button>
                  <Button variant="ghost">Ghost Button</Button>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3">Input Fields</h4>
                <div className="space-y-3 max-w-sm">
                  <Input variant="telegram" placeholder="Telegram styled input" />
                  <Input variant="filled" placeholder="Filled input" />
                  <Input variant="outlined" placeholder="Outlined input" />
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3">Cards</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card variant="telegram">
                    <CardContent>
                      <h5 className="font-semibold mb-2">Telegram Card</h5>
                      <p className="text-sm opacity-80">
                        Автоматически адаптируется к теме Telegram
                      </p>
                    </CardContent>
                  </Card>
                  <Card variant="elevated">
                    <CardContent>
                      <h5 className="font-semibold mb-2">Standard Card</h5>
                      <p className="text-sm text-gray-600">
                        Использует стандартные цвета системы
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Usage Instructions */}
        <Card variant="gradient">
          <CardContent>
            <div className="text-center text-white space-y-4">
              <h3 className="text-xl font-bold">How to Use Telegram Theming</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <h4 className="font-semibold mb-2">CSS Class</h4>
                  <code className="text-sm">
                    &lt;div className="telegram-webapp"&gt;
                  </code>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <h4 className="font-semibold mb-2">Component Variant</h4>
                  <code className="text-sm">
                    &lt;Button variant="telegram"&gt;
                  </code>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
};