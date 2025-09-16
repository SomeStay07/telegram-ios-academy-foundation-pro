import type { Meta, StoryObj } from '@storybook/react';
import { 
  MainButton, 
  BackButton, 
  StatusBar, 
  ViewportContainer 
} from '../../../src/components/TelegramWebApp';
import { PlayIcon, BookOpenIcon, StarIcon } from '@heroicons/react/24/solid';

const meta = {
  title: 'Design System 3.0/03-TelegramWebApp/Components',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# Telegram WebApp Components

Специализированные компоненты для интеграции с Telegram Web Apps API, оптимизированные для нативного опыта в мессенджере.

## Ключевые особенности

- **Нативная интеграция**: Автоматическое использование Telegram WebApp API
- **Тематизация**: Поддержка CSS переменных Telegram
- **Haptic Feedback**: Тактильная обратная связь для лучшего UX
- **Адаптивность**: Автоматическая адаптация под размеры viewport

## Компоненты

### MainButton
Основная кнопка действия с поддержкой Telegram стилей и haptic feedback.

### BackButton  
Кнопка возврата с интеграцией в нативную кнопку Telegram.

### StatusBar
Строка состояния с информацией о времени, батарее и сигнале.

### ViewportContainer
Контейнер для управления viewport и safe areas в Telegram.
        `
      }
    }
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;

export const MainButtonShowcase: StoryObj = {
  name: 'MainButton - Варианты',
  render: () => (
    <div className="p-6 space-y-4 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold mb-6">MainButton Варианты</h2>
      
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold mb-2">Telegram Theme</h3>
          <MainButton variant="telegram">
            Начать обучение
          </MainButton>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">С иконкой</h3>
          <MainButton variant="telegram" icon={<PlayIcon className="w-5 h-5" />}>
            Начать курс
          </MainButton>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Состояние загрузки</h3>
          <MainButton variant="telegram" loading={true} loadingText="Загружаем...">
            Сохранить прогресс
          </MainButton>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Размеры</h3>
          <div className="space-y-2">
            <MainButton variant="primary" size="sm">Маленькая</MainButton>
            <MainButton variant="primary" size="md">Средняя</MainButton>
            <MainButton variant="primary" size="lg">Большая</MainButton>
            <MainButton variant="primary" size="xl">Очень большая</MainButton>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Цветовые варианты</h3>
          <div className="space-y-2">
            <MainButton variant="primary">Primary</MainButton>
            <MainButton variant="success">Success</MainButton>
            <MainButton variant="warning">Warning</MainButton>
            <MainButton variant="destructive">Destructive</MainButton>
            <MainButton variant="outline">Outline</MainButton>
            <MainButton variant="ghost">Ghost</MainButton>
          </div>
        </div>
      </div>
    </div>
  )
};

export const BackButtonShowcase: StoryObj = {
  name: 'BackButton - Варианты',
  render: () => (
    <div className="p-6 space-y-4 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold mb-6">BackButton Варианты</h2>
      
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold mb-2">Telegram Style</h3>
          <BackButton 
            variant="telegram" 
            useTelegramBackButton={false}
            onBack={() => console.log('Back pressed')}
          />
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Размеры</h3>
          <div className="flex items-center gap-4">
            <BackButton variant="default" size="sm" useTelegramBackButton={false} />
            <BackButton variant="default" size="md" useTelegramBackButton={false} />
            <BackButton variant="default" size="lg" useTelegramBackButton={false} />
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Варианты стилей</h3>
          <div className="flex items-center gap-4">
            <BackButton variant="default" useTelegramBackButton={false} />
            <BackButton variant="ghost" useTelegramBackButton={false} />
            <BackButton variant="outline" useTelegramBackButton={false} />
          </div>
        </div>
      </div>
    </div>
  )
};

export const StatusBarShowcase: StoryObj = {
  name: 'StatusBar - Варианты',
  render: () => (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold p-6">StatusBar Варианты</h2>
      
      <div className="space-y-1">
        <div>
          <h3 className="text-lg font-semibold px-6 mb-2">Telegram Theme</h3>
          <StatusBar variant="telegram" title="Telegram Academy" />
        </div>

        <div>
          <h3 className="text-lg font-semibold px-6 mb-2">Default Theme</h3>
          <StatusBar variant="default" title="iOS Academy" />
        </div>

        <div>
          <h3 className="text-lg font-semibold px-6 mb-2">Dark Theme</h3>
          <StatusBar variant="dark" title="Dark Mode" />
        </div>

        <div>
          <h3 className="text-lg font-semibold px-6 mb-2">Transparent</h3>
          <StatusBar variant="transparent" title="Transparent" />
        </div>

        <div>
          <h3 className="text-lg font-semibold px-6 mb-2">Только время</h3>
          <StatusBar 
            variant="telegram" 
            showBattery={false} 
            showSignal={false} 
          />
        </div>

        <div>
          <h3 className="text-lg font-semibold px-6 mb-2">Кастомный контент</h3>
          <StatusBar 
            variant="telegram"
            customLeft={
              <div className="flex items-center gap-2">
                <StarIcon className="w-4 h-4 text-yellow-500" />
                <span className="font-semibold">Premium</span>
              </div>
            }
            customRight={
              <div className="flex items-center gap-1">
                <BookOpenIcon className="w-4 h-4" />
                <span className="text-sm">5/10</span>
              </div>
            }
          />
        </div>
      </div>
    </div>
  )
};

export const ViewportContainerShowcase: StoryObj = {
  name: 'ViewportContainer - Демо',
  render: () => (
    <ViewportContainer 
      theme="telegram" 
      safeArea="both"
      padding="md"
      expandViewport={false}
    >
      <div className="flex flex-col h-full">
        <StatusBar 
          variant="telegram" 
          title="Telegram Academy"
          position="sticky"
        />
        
        <div className="flex-1 flex flex-col justify-center items-center space-y-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-2">
              Добро пожаловать!
            </h1>
            <p className="text-gray-600 mb-8">
              Изучайте iOS разработку в Telegram
            </p>
          </div>
          
          <div className="w-full max-w-sm space-y-4">
            <MainButton 
              variant="telegram" 
              icon={<PlayIcon className="w-5 h-5" />}
            >
              Начать обучение
            </MainButton>
            
            <MainButton variant="outline">
              Посмотреть курсы
            </MainButton>
          </div>
        </div>
        
        <div className="p-4">
          <div className="flex justify-between items-center">
            <BackButton 
              variant="telegram" 
              useTelegramBackButton={false}
            />
            <p className="text-sm text-gray-500">
              Powered by Telegram WebApp API
            </p>
          </div>
        </div>
      </div>
    </ViewportContainer>
  ),
  parameters: {
    layout: 'fullscreen'
  }
};

export const TelegramIntegrationDemo: StoryObj = {
  name: 'Полная интеграция с Telegram',
  render: () => (
    <ViewportContainer 
      theme="telegram"
      safeArea="both" 
      expandViewport={true}
      enableClosingConfirmation={true}
      headerColor="#007AFF"
    >
      <div className="flex flex-col h-full">
        {/* Status Bar */}
        <StatusBar 
          variant="telegram"
          title="iOS Academy"
          position="sticky"
        />
        
        {/* Main Content */}
        <div className="flex-1 p-6 space-y-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-2">
              Swift Основы
            </h1>
            <p className="text-gray-600">
              Урок 1 из 12 • 15 минут
            </p>
          </div>
          
          {/* Progress */}
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-blue-500 h-2 rounded-full" style={{ width: '25%' }} />
          </div>
          
          {/* Content */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-4">
              Что такое переменные?
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Переменные в Swift позволяют хранить и изменять данные. 
              Они объявляются с помощью ключевого слова var.
            </p>
          </div>
          
          {/* Code Example */}
          <div className="bg-gray-900 rounded-xl p-4">
            <code className="text-green-400 text-sm">
              var message = "Hello, World!"<br/>
              print(message)
            </code>
          </div>
        </div>
        
        {/* Bottom Actions */}
        <div className="p-6 space-y-4">
          <MainButton 
            variant="telegram"
            icon={<PlayIcon className="w-5 h-5" />}
            hapticFeedback={true}
          >
            Продолжить урок
          </MainButton>
          
          <div className="flex justify-between">
            <BackButton 
              variant="telegram"
              hapticFeedback={true}
              onBack={() => console.log('Назад к курсам')}
            />
            
            <MainButton 
              variant="ghost" 
              size="sm"
            >
              Пропустить
            </MainButton>
          </div>
        </div>
      </div>
    </ViewportContainer>
  ),
  parameters: {
    layout: 'fullscreen'
  }
};