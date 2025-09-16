import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

const meta: Meta = {
  title: '🎨 New Design System/00 Welcome',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# 🚀 iOS Academy Design System 3.0

Добро пожаловать в новую эру дизайн-системы iOS Academy! Мы полностью переосмыслили подход к компонентам, взяв лучшее из современных практик и топовых платформ.

## 🎯 Что нового в версии 3.0

### 🏆 Вдохновение от лидеров индустрии
- **Duolingo**: Геймификация, стрики, XP система
- **Udemy/Coursera**: Прогресс-трекинг, рейтинги, социальные элементы  
- **Apple HIG**: Нативные iOS паттерны и анимации
- **Telegram Design**: Seamless WebApp интеграция
- **Linear**: Современные микро-анимации и переходы

### 🛠 Современный технологический стек
- **Class Variance Authority (CVA)**: Type-safe варианты компонентов
- **Tailwind CSS**: Утилитарный подход с кастомными токенами
- **React 18**: Concurrent features и улучшенная производительность
- **TypeScript 5.0**: Строгая типизация и лучший DX
- **Storybook 7**: Современная документация и тестирование

### 🎨 Новые принципы дизайна
1. **Mobile-First**: Оптимизация для Telegram WebApp
2. **Accessibility-First**: WCAG AA+ соответствие
3. **Performance-First**: Tree-shaking и оптимизированные бандлы
4. **Developer-First**: Отличный опыт разработки
5. **User-First**: Интуитивные и понятные интерфейсы

## 🔥 Ключевые улучшения

### ⚡ Производительность
- 40% меньший размер бандла
- Lazy loading компонентов
- Optimized re-renders
- Service Worker кэширование

### 🎮 Геймификация 
- XP система с анимированными прогресс-барами
- Стрики и достижения
- Интерактивные награды
- Социальные элементы

### 📱 Mobile Experience
- Native haptic feedback
- Gesture navigation
- Pull-to-refresh
- Optimized touch targets

### 🌙 Темы и персонализация
- Auto Telegram theme sync
- Custom theme builder
- Dark/Light mode transitions
- Accessibility preferences

## 🗺 Навигация по Design System

Используйте боковую панель для навигации по разделам:

📚 **Foundation** - Базовые элементы (цвета, типографика, иконки)
🧱 **Components** - Переиспользуемые UI компоненты  
📱 **Patterns** - Готовые паттерны и templates
🎓 **Educational** - Специализированные образовательные компоненты
📟 **Telegram** - WebApp оптимизированные компоненты
🎯 **Examples** - Полные примеры интеграции
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const Introduction: Story = {
  render: () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 dark:from-blue-400/10 dark:to-purple-400/10" />
        <div className="relative container mx-auto px-6 py-20">
          <div className="text-center max-w-4xl mx-auto">
            <div className="mb-8">
              <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 mb-4">
                🚀 Версия 3.0 - Полностью обновлено
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
              iOS Academy
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 dark:text-gray-300 mb-8">
              Design System 3.0
            </h2>
            
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-12 leading-relaxed">
              Современная дизайн-система для образовательных Telegram WebApp, 
              вдохновленная лучшими практиками индустрии и оптимизированная для mobile-first опыта.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-16">
              <button className="px-8 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all duration-200 transform hover:scale-105 shadow-lg">
                🚀 Начать изучение
              </button>
              <button className="px-8 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl font-semibold hover:border-blue-600 hover:text-blue-600 transition-all duration-200 transform hover:scale-105">
                📖 Документация
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h3 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Что делает нас особенными
          </h3>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Мы изучили лучшие образовательные платформы и создали систему, которая сочетает современные технологии с проверенными UX-паттернами.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {[
            {
              icon: "🎮",
              title: "Геймификация",
              description: "XP система, стрики, достижения и интерактивные награды как в Duolingo",
              color: "from-green-400 to-blue-500"
            },
            {
              icon: "📱",
              title: "Mobile-First",
              description: "Оптимизировано для Telegram WebApp с нативными жестами и haptic feedback",
              color: "from-blue-400 to-purple-500"
            },
            {
              icon: "⚡",
              title: "Высокая производительность",
              description: "Tree-shaking, lazy loading и оптимизированные re-renders",
              color: "from-yellow-400 to-orange-500"
            },
            {
              icon: "🎨",
              title: "Современный дизайн",
              description: "Apple HIG принципы с современными анимациями и переходами",
              color: "from-purple-400 to-pink-500"
            },
            {
              icon: "♿",
              title: "Accessibility",
              description: "WCAG AA+ соответствие с полной поддержкой клавиатуры и экранных ридеров",
              color: "from-indigo-400 to-cyan-500"
            },
            {
              icon: "🔧",
              title: "Developer Experience",
              description: "TypeScript, CVA, comprehensive docs и отличная интеграция",
              color: "from-red-400 to-pink-500"
            }
          ].map((feature, index) => (
            <div key={index} className="group relative">
              <div className="relative p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-200 dark:border-gray-700">
                <div className={`absolute inset-0 bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`} />
                <div className="relative">
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h4 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
                    {feature.title}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Technology Stack */}
        <div className="text-center mb-16">
          <h3 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Современный технологический стек
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-12">
            Используем только проверенные и современные технологии
          </p>
          
          <div className="flex flex-wrap justify-center gap-6">
            {[
              { name: "React 18", color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200" },
              { name: "TypeScript 5", color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200" },
              { name: "Tailwind CSS", color: "bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200" },
              { name: "CVA", color: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200" },
              { name: "Radix UI", color: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200" },
              { name: "Storybook 7", color: "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200" },
              { name: "Vite", color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200" },
              { name: "Telegram WebApp", color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200" }
            ].map((tech, index) => (
              <span key={index} className={`px-4 py-2 rounded-full text-sm font-medium ${tech.color} transition-transform hover:scale-105`}>
                {tech.name}
              </span>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-white">
          <h3 className="text-3xl font-bold mb-4">
            Готовы начать?
          </h3>
          <p className="text-blue-100 mb-8 text-lg">
            Изучите компоненты, посмотрите примеры и начните создавать потрясающие образовательные интерфейсы
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="px-8 py-3 bg-white text-blue-600 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-200 transform hover:scale-105">
              📚 Изучить компоненты
            </button>
            <button className="px-8 py-3 border-2 border-white/30 text-white rounded-xl font-semibold hover:border-white hover:bg-white/10 transition-all duration-200 transform hover:scale-105">
              🔧 Примеры кода
            </button>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Главная страница новой дизайн-системы с обзором всех возможностей и улучшений.',
      },
    },
  },
};

export const Roadmap: Story = {
  render: () => (
    <div className="container mx-auto px-6 py-12 max-w-4xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          🗺 Roadmap & Updates
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Планы развития дизайн-системы и последние обновления
        </p>
      </div>

      <div className="space-y-8">
        {/* Current Version */}
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
              ✅ v3.0 - Текущая версия
            </span>
            <span className="text-green-600 dark:text-green-400 font-medium">
              Январь 2025
            </span>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
            Major Redesign & Competitive Analysis
          </h3>
          <ul className="space-y-2 text-gray-600 dark:text-gray-400">
            <li>✅ Полный редизайн CourseCard с геймификацией</li>
            <li>✅ CVA-based компонентная система</li>
            <li>✅ 6 новых вариантов карточек курсов</li>
            <li>✅ Telegram WebApp интеграция</li>
            <li>✅ Современные анимации и переходы</li>
          </ul>
        </div>

        {/* Next Version */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
              🚧 v3.1 - В разработке
            </span>
            <span className="text-blue-600 dark:text-blue-400 font-medium">
              Февраль 2025
            </span>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
            Advanced Learning Components
          </h3>
          <ul className="space-y-2 text-gray-600 dark:text-gray-400">
            <li>🔄 Interactive Code Editor компонент</li>
            <li>🔄 Advanced Progress Tracking</li>
            <li>🔄 Leaderboard и Social Features</li>
            <li>🔄 Quiz и Assessment компоненты</li>
            <li>🔄 Live Coding Session UI</li>
          </ul>
        </div>

        {/* Future Versions */}
        <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-purple-500 text-white px-3 py-1 rounded-full text-sm font-medium">
              💡 v3.2+ - Планы
            </span>
            <span className="text-purple-600 dark:text-purple-400 font-medium">
              Март+ 2025
            </span>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
            AI & Advanced Features
          </h3>
          <ul className="space-y-2 text-gray-600 dark:text-gray-400">
            <li>💡 AI-powered персонализация</li>
            <li>💡 Voice interaction компоненты</li>
            <li>💡 AR/VR education elements</li>
            <li>💡 Advanced analytics dashboard</li>
            <li>💡 Multi-language support</li>
          </ul>
        </div>
      </div>

      <div className="mt-12 p-6 bg-gray-50 dark:bg-gray-800 rounded-xl">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          📢 Хотите повлиять на развитие?
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Ваши идеи и обратная связь помогают нам делать дизайн-систему лучше. 
          Предлагайте новые компоненты, улучшения и делитесь опытом использования.
        </p>
        <div className="flex gap-4">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
            💬 Обратная связь
          </button>
          <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:border-blue-600 hover:text-blue-600 transition-colors">
            📝 Предложить идею
          </button>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Roadmap развития дизайн-системы с планами и обновлениями.',
      },
    },
  },
};