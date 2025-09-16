import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

const meta: Meta = {
  title: '🎨 New Design System/01 Foundation/Colors',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# 🎨 Color System

Наша цветовая система основана на принципах Apple HIG с адаптацией для Telegram WebApp и обеспечивает:

- **Accessibility**: WCAG AA+ соответствие
- **Consistency**: Единая цветовая палитра
- **Flexibility**: Adaptive themes и dark mode
- **Platform Integration**: Seamless Telegram integration

## Color Tokens

Все цвета определены как CSS custom properties и автоматически адаптируются к теме Telegram.

### Semantic Colors
Семантические цвета передают значение и состояние:
- **Primary**: Основные действия и активные элементы
- **Success**: Успешные операции и положительные состояния  
- **Warning**: Предупреждения и важные уведомления
- **Error**: Ошибки и критические состояния
- **Info**: Информационные сообщения

### Educational Colors
Специальные цвета для образовательного контента:
- **Swift**: #FF6B35 - для Swift-related контента
- **UIKit**: #007AFF - для UI/UX материалов
- **Architecture**: #5856D6 - для архитектурных паттернов
- **Testing**: #34C759 - для тестирования
- **Performance**: #FF3B30 - для производительности
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj;

const colors = {
  primary: [
    { name: 'Primary 50', value: '#eff6ff', token: '--primary-50' },
    { name: 'Primary 100', value: '#dbeafe', token: '--primary-100' },
    { name: 'Primary 200', value: '#bfdbfe', token: '--primary-200' },
    { name: 'Primary 300', value: '#93c5fd', token: '--primary-300' },
    { name: 'Primary 400', value: '#60a5fa', token: '--primary-400' },
    { name: 'Primary 500', value: '#3b82f6', token: '--primary-500' },
    { name: 'Primary 600', value: '#2563eb', token: '--primary-600' },
    { name: 'Primary 700', value: '#1d4ed8', token: '--primary-700' },
    { name: 'Primary 800', value: '#1e40af', token: '--primary-800' },
    { name: 'Primary 900', value: '#1e3a8a', token: '--primary-900' },
  ],
  semantic: [
    { name: 'Success', value: '#10b981', token: '--success', description: 'Успешные операции' },
    { name: 'Warning', value: '#f59e0b', token: '--warning', description: 'Предупреждения' },
    { name: 'Error', value: '#ef4444', token: '--error', description: 'Ошибки' },
    { name: 'Info', value: '#3b82f6', token: '--info', description: 'Информация' },
  ],
  educational: [
    { name: 'Swift', value: '#ff6b35', token: '--educational-swift', description: 'Swift курсы' },
    { name: 'UIKit', value: '#007aff', token: '--educational-uikit', description: 'UI/UX материалы' },
    { name: 'Architecture', value: '#5856d6', token: '--educational-architecture', description: 'Архитектура' },
    { name: 'Testing', value: '#34c759', token: '--educational-testing', description: 'Тестирование' },
    { name: 'Performance', value: '#ff3b30', token: '--educational-performance', description: 'Производительность' },
  ],
  neutral: [
    { name: 'Gray 50', value: '#f9fafb', token: '--gray-50' },
    { name: 'Gray 100', value: '#f3f4f6', token: '--gray-100' },
    { name: 'Gray 200', value: '#e5e7eb', token: '--gray-200' },
    { name: 'Gray 300', value: '#d1d5db', token: '--gray-300' },
    { name: 'Gray 400', value: '#9ca3af', token: '--gray-400' },
    { name: 'Gray 500', value: '#6b7280', token: '--gray-500' },
    { name: 'Gray 600', value: '#4b5563', token: '--gray-600' },
    { name: 'Gray 700', value: '#374151', token: '--gray-700' },
    { name: 'Gray 800', value: '#1f2937', token: '--gray-800' },
    { name: 'Gray 900', value: '#111827', token: '--gray-900' },
  ]
};

const ColorSwatch: React.FC<{ 
  name: string; 
  value: string; 
  token: string; 
  description?: string;
  large?: boolean;
}> = ({ name, value, token, description, large = false }) => (
  <div className={`group ${large ? 'col-span-2' : ''}`}>
    <div 
      className={`${large ? 'h-24' : 'h-16'} w-full rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer group-hover:scale-105`}
      style={{ backgroundColor: value }}
    />
    <div className="mt-3 space-y-1">
      <h4 className="font-medium text-gray-900 dark:text-gray-100 text-sm">
        {name}
      </h4>
      <p className="text-xs text-gray-500 dark:text-gray-400 font-mono">
        {value}
      </p>
      <p className="text-xs text-gray-400 dark:text-gray-500 font-mono">
        var({token})
      </p>
      {description && (
        <p className="text-xs text-gray-500 dark:text-gray-400">
          {description}
        </p>
      )}
    </div>
  </div>
);

export const PrimaryColors: Story = {
  render: () => (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          🔵 Primary Colors
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Основная цветовая палитра для ключевых элементов интерфейса. Автоматически синхронизируется с темой Telegram.
        </p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
        {colors.primary.map((color) => (
          <ColorSwatch
            key={color.name}
            name={color.name}
            value={color.value}
            token={color.token}
          />
        ))}
      </div>

      <div className="mt-12 p-6 bg-gray-50 dark:bg-gray-800 rounded-xl">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          💡 Usage Guidelines
        </h3>
        <div className="grid md:grid-cols-2 gap-6 text-sm">
          <div>
            <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">✅ Do</h4>
            <ul className="space-y-1 text-gray-600 dark:text-gray-400">
              <li>• Use Primary 500-600 for main actions</li>
              <li>• Use lighter shades for backgrounds</li>
              <li>• Use darker shades for text on light</li>
              <li>• Maintain contrast ratios WCAG AA+</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">❌ Don't</h4>
            <ul className="space-y-1 text-gray-600 dark:text-gray-400">
              <li>• Use too many primary color variations</li>
              <li>• Override Telegram theme colors</li>
              <li>• Use primary for errors or warnings</li>
              <li>• Create custom primary shades</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Primary color palette для основных элементов интерфейса с автоматической синхронизацией с Telegram темами.',
      },
    },
  },
};

export const SemanticColors: Story = {
  render: () => (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          🎯 Semantic Colors
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Семантические цвета передают значение и состояние интерфейса. Используйте их для статусов, уведомлений и обратной связи.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {colors.semantic.map((color) => (
          <ColorSwatch
            key={color.name}
            name={color.name}
            value={color.value}
            token={color.token}
            description={color.description}
            large
          />
        ))}
      </div>

      {/* Usage Examples */}
      <div className="space-y-6">
        <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-green-800 dark:text-green-200 font-medium">
              ✅ Курс успешно завершен!
            </span>
          </div>
        </div>

        <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <span className="text-yellow-800 dark:text-yellow-200 font-medium">
              ⚠️ Осталось 2 попытки
            </span>
          </div>
        </div>

        <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span className="text-red-800 dark:text-red-200 font-medium">
              ❌ Ошибка при загрузке
            </span>
          </div>
        </div>

        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span className="text-blue-800 dark:text-blue-200 font-medium">
              ℹ️ Новые материалы доступны
            </span>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Семантические цвета для передачи состояний и статусов с примерами использования.',
      },
    },
  },
};

export const EducationalColors: Story = {
  render: () => (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          🎓 Educational Colors
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Специальные цвета для различных образовательных категорий. Помогают пользователям быстро идентифицировать тип контента.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {colors.educational.map((color) => (
          <ColorSwatch
            key={color.name}
            name={color.name}
            value={color.value}
            token={color.token}
            description={color.description}
            large
          />
        ))}
      </div>

      {/* Course Cards Examples */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {colors.educational.map((color) => (
          <div key={color.name} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-4">
              <div 
                className="w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold"
                style={{ backgroundColor: color.value }}
              >
                {color.name.charAt(0)}
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                  {color.name} Course
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {color.description}
                </p>
              </div>
            </div>
            <div className="space-y-2">
              <div 
                className="h-2 rounded-full"
                style={{ backgroundColor: `${color.value}20` }}
              >
                <div 
                  className="h-2 rounded-full w-3/4"
                  style={{ backgroundColor: color.value }}
                />
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Progress: 75%
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Специализированные цвета для образовательных категорий с примерами применения в курсовых карточках.',
      },
    },
  },
};

export const TelegramIntegration: Story = {
  render: () => (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          📱 Telegram Theme Integration
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Автоматическая синхронизация с темой Telegram WebApp для нативного ощущения.
        </p>
      </div>

      <div className="space-y-8">
        {/* Telegram Variables */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white">
          <h3 className="text-xl font-semibold mb-4">
            Telegram CSS Variables
          </h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm font-mono">
            <div className="space-y-2">
              <div>var(--tg-bg-color)</div>
              <div>var(--tg-text-color)</div>
              <div>var(--tg-hint-color)</div>
              <div>var(--tg-link-color)</div>
            </div>
            <div className="space-y-2">
              <div>var(--tg-button-color)</div>
              <div>var(--tg-button-text-color)</div>
              <div>var(--tg-secondary-bg-color)</div>
              <div>var(--tg-header-bg-color)</div>
            </div>
          </div>
        </div>

        {/* Theme Examples */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Light Theme Example */}
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h4 className="font-semibold text-gray-900 mb-4">☀️ Light Theme</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <span className="text-blue-900">Primary Button</span>
                <div className="w-4 h-4 bg-blue-500 rounded"></div>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-700">Secondary Text</span>
                <div className="w-4 h-4 bg-gray-400 rounded"></div>
              </div>
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <span className="text-green-800">Success State</span>
                <div className="w-4 h-4 bg-green-500 rounded"></div>
              </div>
            </div>
          </div>

          {/* Dark Theme Example */}
          <div className="bg-gray-900 border border-gray-700 rounded-xl p-6">
            <h4 className="font-semibold text-gray-100 mb-4">🌙 Dark Theme</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-blue-900/30 rounded-lg">
                <span className="text-blue-200">Primary Button</span>
                <div className="w-4 h-4 bg-blue-400 rounded"></div>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                <span className="text-gray-300">Secondary Text</span>
                <div className="w-4 h-4 bg-gray-500 rounded"></div>
              </div>
              <div className="flex items-center justify-between p-3 bg-green-900/30 rounded-lg">
                <span className="text-green-200">Success State</span>
                <div className="w-4 h-4 bg-green-400 rounded"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Code Example */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
            🔧 Usage Example
          </h3>
          <pre className="text-sm text-gray-600 dark:text-gray-400 overflow-x-auto">
{`// CSS Custom Properties with Telegram fallbacks
.button-primary {
  background: var(--tg-button-color, theme(colors.blue.500));
  color: var(--tg-button-text-color, white);
}

.text-secondary {
  color: var(--tg-hint-color, theme(colors.gray.500));
}

.background-primary {
  background: var(--tg-bg-color, theme(colors.white));
}`}
          </pre>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Интеграция с цветовой схемой Telegram WebApp для нативного ощущения.',
      },
    },
  },
};