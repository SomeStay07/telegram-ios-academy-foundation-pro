import type { Meta, StoryObj } from '@storybook/react';
import { Card, CardHeader, CardTitle, CardContent, Button, Input } from '../../../src/components/Enhanced';
import { 
  CodeBracketIcon, 
  DocumentTextIcon, 
  CubeIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';

const meta = {
  title: 'Design System 3.0/04-Documentation/Component Guide',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# Component Usage Guide

Подробное руководство по использованию компонентов Design System 3.0, включая best practices, примеры кода и распространенные паттерны.

## Содержание

1. **Базовые принципы** - Как правильно использовать компоненты
2. **Code Examples** - Практические примеры кода
3. **Best Practices** - Рекомендации и правила
4. **Common Patterns** - Часто используемые паттерны
5. **Do's and Don'ts** - Что делать и чего избегать

## Импорт компонентов

\`\`\`typescript
import { Button, Input, Card } from '@telegram-ios-academy/ui/enhanced';
import { MainButton, BackButton } from '@telegram-ios-academy/ui/telegram';
\`\`\`

## Theming и кастомизация

Все компоненты поддерживают темизацию через CSS переменные и Tailwind CSS классы.
        `
      }
    }
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;

export const ComponentOverview: StoryObj = {
  name: 'Обзор компонентов',
  render: () => (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gray-900">Component Guide</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Полное руководство по использованию компонентов Telegram iOS Academy Design System
          </p>
        </div>

        {/* Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Enhanced Components */}
          <Card variant="elevated" interactive className="group">
            <CardContent>
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                  <CubeIcon className="h-8 w-8 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Enhanced Components</h3>
                  <p className="text-gray-600 text-sm">
                    Продвинутые компоненты с микроинтеракциями: Button, Input, Card
                  </p>
                </div>
                <div className="pt-4 space-y-2">
                  <div className="flex gap-2 justify-center">
                    <Button size="xs" variant="primary">Button</Button>
                    <Input className="w-20" size="sm" placeholder="Input" />
                  </div>
                  <p className="text-xs text-gray-500">8 компонентов</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Telegram Components */}
          <Card variant="elevated" interactive className="group">
            <CardContent>
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-[#007AFF]/10 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                  <DevicePhoneMobileIcon className="h-8 w-8 text-[#007AFF]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Telegram WebApp</h3>
                  <p className="text-gray-600 text-sm">
                    Нативные компоненты для интеграции с Telegram WebApp API
                  </p>
                </div>
                <div className="pt-4 space-y-2">
                  <div className="text-[#007AFF] text-xs font-medium">
                    MainButton • BackButton • StatusBar
                  </div>
                  <p className="text-xs text-gray-500">4 компонента</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Legacy Components */}
          <Card variant="outlined" interactive className="group opacity-75">
            <CardContent>
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                  <DocumentTextIcon className="h-8 w-8 text-gray-500" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-700 mb-2">Legacy Components</h3>
                  <p className="text-gray-500 text-sm">
                    Устаревшие компоненты для обратной совместимости
                  </p>
                </div>
                <div className="pt-4 space-y-2">
                  <div className="text-orange-600 text-xs font-medium">
                    ⚠️ Deprecated
                  </div>
                  <p className="text-xs text-gray-500">15+ компонентов</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Start */}
        <Card variant="gradient" size="lg">
          <CardContent>
            <div className="text-center space-y-6">
              <h2 className="text-2xl font-bold text-white">Quick Start</h2>
              <p className="text-white/90 max-w-2xl mx-auto">
                Начните использовать компоненты Design System 3.0 в несколько простых шагов
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold text-xl">1</span>
                  </div>
                  <h3 className="text-white font-semibold mb-2">Установка</h3>
                  <p className="text-white/80 text-sm">
                    npm install @telegram-ios-academy/ui
                  </p>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold text-xl">2</span>
                  </div>
                  <h3 className="text-white font-semibold mb-2">Импорт</h3>
                  <p className="text-white/80 text-sm">
                    import {"{ Button }"} from '@telegram-ios-academy/ui'
                  </p>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold text-xl">3</span>
                  </div>
                  <h3 className="text-white font-semibold mb-2">Использование</h3>
                  <p className="text-white/80 text-sm">
                    &lt;Button variant="primary"&gt;Click me&lt;/Button&gt;
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
};

const DevicePhoneMobileIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a1 1 0 001-1V4a1 1 0 00-1-1H8a1 1 0 00-1 1v16a1 1 0 001 1z" />
  </svg>
);

export const CodeExamples: StoryObj = {
  name: 'Примеры кода',
  render: () => (
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-gray-900">Code Examples</h1>
        <p className="text-lg text-gray-600">
          Практические примеры использования компонентов в реальных проектах
        </p>
      </div>

      {/* Button Examples */}
      <Card variant="elevated">
        <CardHeader>
          <div className="flex items-center gap-3">
            <CodeBracketIcon className="h-6 w-6 text-blue-600" />
            <CardTitle>Enhanced Button</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Basic Usage */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Базовое использование</h4>
              <div className="bg-gray-900 rounded-lg p-4 mb-4">
                <pre className="text-green-400 text-sm">
{`import { Button } from '@telegram-ios-academy/ui/enhanced';

function MyComponent() {
  return (
    <Button variant="primary" size="md">
      Start Learning
    </Button>
  );
}`}
                </pre>
              </div>
              <div className="flex gap-3">
                <Button variant="primary">Start Learning</Button>
                <Button variant="outline">View Courses</Button>
                <Button variant="ghost">Cancel</Button>
              </div>
            </div>

            {/* With Icons */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">С иконками</h4>
              <div className="bg-gray-900 rounded-lg p-4 mb-4">
                <pre className="text-green-400 text-sm">
{`import { PlayIcon } from '@heroicons/react/24/outline';

<Button 
  variant="primary" 
  leftIcon={<PlayIcon className="h-5 w-5" />}
  rippleEffect
  hapticFeedback
>
  Play Video
</Button>`}
                </pre>
              </div>
              <Button 
                variant="primary" 
                leftIcon={<span>▶️</span>}
                rippleEffect
              >
                Play Video
              </Button>
            </div>

            {/* Loading State */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Состояние загрузки</h4>
              <div className="bg-gray-900 rounded-lg p-4 mb-4">
                <pre className="text-green-400 text-sm">
{`<Button 
  variant="primary" 
  loading={isLoading}
  loadingText="Saving..."
  disabled={isLoading}
>
  Save Progress
</Button>`}
                </pre>
              </div>
              <Button 
                variant="primary" 
                loading={true}
                loadingText="Saving..."
              >
                Save Progress
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Input Examples */}
      <Card variant="elevated">
        <CardHeader>
          <div className="flex items-center gap-3">
            <CodeBracketIcon className="h-6 w-6 text-green-600" />
            <CardTitle>Enhanced Input</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Floating Label */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Floating Label</h4>
              <div className="bg-gray-900 rounded-lg p-4 mb-4">
                <pre className="text-green-400 text-sm">
{`<Input
  floating
  label="Email Address"
  type="email"
  placeholder=" "
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>`}
                </pre>
              </div>
              <Input
                floating
                label="Email Address"
                type="email"
                placeholder=" "
                className="max-w-sm"
              />
            </div>

            {/* With Validation */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">С валидацией</h4>
              <div className="bg-gray-900 rounded-lg p-4 mb-4">
                <pre className="text-green-400 text-sm">
{`<Input
  label="Password"
  type="password"
  showPasswordToggle
  state={isValid ? "success" : "error"}
  errorMessage={!isValid ? "Password is required" : undefined}
  successMessage={isValid ? "Password is strong" : undefined}
/>`}
                </pre>
              </div>
              <div className="space-y-3 max-w-sm">
                <Input
                  label="Password"
                  type="password"
                  showPasswordToggle
                  state="error"
                  errorMessage="Password is required"
                />
                <Input
                  label="Confirm Password"
                  type="password"
                  showPasswordToggle
                  state="success"
                  successMessage="Passwords match"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Telegram Components */}
      <Card variant="elevated">
        <CardHeader>
          <div className="flex items-center gap-3">
            <CodeBracketIcon className="h-6 w-6 text-[#007AFF]" />
            <CardTitle>Telegram WebApp Components</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">MainButton с Telegram интеграцией</h4>
              <div className="bg-gray-900 rounded-lg p-4 mb-4">
                <pre className="text-green-400 text-sm">
{`import { MainButton } from '@telegram-ios-academy/ui/telegram';

<MainButton 
  variant="telegram"
  hapticFeedback
  onClick={() => {
    // Telegram WebApp API integration
    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.sendData('course_completed');
    }
  }}
>
  Complete Course
</MainButton>`}
                </pre>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-3">ViewportContainer для полного экрана</h4>
              <div className="bg-gray-900 rounded-lg p-4 mb-4">
                <pre className="text-green-400 text-sm">
{`import { ViewportContainer } from '@telegram-ios-academy/ui/telegram';

<ViewportContainer 
  theme="telegram"
  expandViewport
  enableClosingConfirmation
  safeArea="both"
>
  <YourAppContent />
</ViewportContainer>`}
                </pre>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
};

export const BestPractices: StoryObj = {
  name: 'Best Practices',
  render: () => (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-gray-900">Best Practices</h1>
        <p className="text-lg text-gray-600">
          Рекомендации по использованию компонентов для создания качественных интерфейсов
        </p>
      </div>

      {/* Do's */}
      <Card variant="elevated">
        <CardHeader>
          <div className="flex items-center gap-3">
            <CheckCircleIcon className="h-6 w-6 text-green-600" />
            <CardTitle className="text-green-800">✅ Рекомендуется</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <h4 className="font-semibold text-gray-900">Используйте последовательные размеры</h4>
                <p className="text-gray-600 text-sm">
                  Придерживайтесь размеров sm, md, lg для всех компонентов в рамках одного интерфейса.
                </p>
                <div className="mt-2 flex gap-2">
                  <Button size="sm" variant="outline">Small</Button>
                  <Button size="md" variant="outline">Medium</Button>
                  <Button size="lg" variant="outline">Large</Button>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <h4 className="font-semibold text-gray-900">Применяйте semantic цвета</h4>
                <p className="text-gray-600 text-sm">
                  Используйте success для подтверждений, error для ошибок, warning для предупреждений.
                </p>
                <div className="mt-2 flex gap-2">
                  <Button size="sm" variant="success">Success</Button>
                  <Button size="sm" variant="destructive">Error</Button>
                  <Button size="sm" variant="warning">Warning</Button>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <h4 className="font-semibold text-gray-900">Включайте haptic feedback для Telegram</h4>
                <p className="text-gray-600 text-sm">
                  Активируйте тактильную обратную связь для улучшения UX в Telegram WebApp.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <h4 className="font-semibold text-gray-900">Используйте floating labels для форм</h4>
                <p className="text-gray-600 text-sm">
                  Floating labels экономят место и улучшают UX на мобильных устройствах.
                </p>
                <div className="mt-2 max-w-sm">
                  <Input floating label="Username" placeholder=" " />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Don'ts */}
      <Card variant="elevated">
        <CardHeader>
          <div className="flex items-center gap-3">
            <ExclamationTriangleIcon className="h-6 w-6 text-red-600" />
            <CardTitle className="text-red-800">❌ Не рекомендуется</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <h4 className="font-semibold text-gray-900">Не смешивайте разные стили кнопок</h4>
                <p className="text-gray-600 text-sm">
                  Избегайте использования разных вариантов кнопок для одинаковых действий.
                </p>
                <div className="mt-2 p-3 bg-red-50 rounded-lg border border-red-200">
                  <div className="flex gap-2">
                    <Button size="sm" variant="primary">Save</Button>
                    <Button size="lg" variant="outline">Save</Button>
                    <Button size="md" variant="ghost">Save</Button>
                  </div>
                  <p className="text-red-600 text-xs mt-1">❌ Разные стили для одного действия</p>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <h4 className="font-semibold text-gray-900">Не используйте слишком много анимаций</h4>
                <p className="text-gray-600 text-sm">
                  Избыточные анимации могут замедлить интерфейс и отвлекать пользователей.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <h4 className="font-semibold text-gray-900">Не забывайте про accessibility</h4>
                <p className="text-gray-600 text-sm">
                  Обязательно тестируйте компоненты с screen readers и клавиатурной навигацией.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <h4 className="font-semibold text-gray-900">Не используйте deprecated компоненты</h4>
                <p className="text-gray-600 text-sm">
                  Избегайте старых компонентов, мигрируйте на Enhanced версии для лучшей производительности.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Performance Tips */}
      <Card variant="gradient">
        <CardContent>
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-bold text-white">Performance Tips</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <h4 className="text-white font-semibold mb-3">🚀 Ленивая загрузка</h4>
                <p className="text-white/80 text-sm">
                  Импортируйте только необходимые компоненты для уменьшения bundle size.
                </p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <h4 className="text-white font-semibold mb-3">⚡ Мемоизация</h4>
                <p className="text-white/80 text-sm">
                  Используйте React.memo для предотвращения лишних ре-рендеров компонентов.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
};