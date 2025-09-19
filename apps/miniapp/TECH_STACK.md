# 🛠️ TECHNICAL STACK
# Telegram iOS Academy MiniApp

## 📋 Обзор архитектуры

Современное Telegram Mini App с enterprise-grade дизайн-системой, построенное на лучших практиках 2024 года.

---

## 🏗️ Core Technologies

### Frontend Framework
- **React 18** - Современная библиотека с Concurrent Features
- **TypeScript 5** - Строгая типизация для безопасности и DX
- **Vite** - Молниеносная сборка и HMR

### Styling & Design System
- **Tailwind CSS** - Utility-first CSS фреймворк
- **CVA (Class Variance Authority)** - Современная система вариантов компонентов
- **Headless UI** - Unstyled, accessible UI компоненты
- **Lucide React** - Минималистичные SVG иконки

### State Management & Data
- **TanStack Query (React Query)** - Серверное состояние и кеширование
- **Zustand** - Легковесный state management (если необходим)

### Telegram Integration
- **@twa-dev/sdk** - Official Telegram WebApp SDK
- **@twa-dev/types** - TypeScript типы для Telegram WebApp

### Development & Build
- **ESLint** - Линтер для качества кода
- **Prettier** - Автоматическое форматирование
- **Husky** - Git hooks для pre-commit проверок
- **Changeset** - Версионирование и changelog

---

## 🎨 Design System Architecture

### Модульная архитектура компонентов

Каждый компонент следует единой **4-файловой структуре**:

```
src/design-system/components/
├── ComponentName.tsx          ← Barrel export
└── component-name/
    ├── ComponentTypes.ts      ← TypeScript интерфейсы
    ├── ComponentVariants.ts   ← CVA варианты стилей  
    ├── ComponentLogic.ts      ← Утилиты и бизнес-логика
    └── index.tsx              ← Основной React компонент
```

### 📊 Компонентная библиотека (18 компонентов)

**Базовые UI:**
- `Button` - 30+ вариантов с группировкой и toggle
- `Input` - с валидацией, иконками, состояниями
- `Card` - контейнеры с вариантами стилей
- `Modal` - модальные окна + ConfirmationModal
- `Tooltip` - умное позиционирование + анимации

**Typography:**
- `Typography` - 23 варианта (Display, Heading, Body, Caption, Label, Code)
- `ProfileName` - специализированные имена пользователей
- `UsernameBadge` - бейджи юзернеймов с интерактивностью

**Navigation:**
- `NavLink` - навигационные ссылки с состояниями
- `Tabs` - табы с различными стилями

**Data Display:**
- `Avatar` - аватары с группировкой + статусы
- `Progress` - индикаторы прогресса с анимациями
- `StatCard` - статистические карточки + группировка
- `LevelBadge` - бейджи уровней с анимациями

**Interactive:**
- `QuizItem` - интерактивные викторины
- `CodeBlock` - блоки кода с подсветкой + копированием

**Layout:**
- `Spacer` - утилиты для отступов
- `DemoLayout` - демонстрационные лейауты

### 🎯 CVA Pattern (Class Variance Authority)

```typescript
const componentVariants = cva(
  // Базовые стили
  ["base-styles", "common-classes"],
  {
    variants: {
      variant: {
        default: ["default-styles"],
        primary: ["primary-styles"],
        secondary: ["secondary-styles"]
      },
      size: {
        sm: ["small-size"],
        md: ["medium-size"], 
        lg: ["large-size"]
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md"
    }
  }
)

interface ComponentProps extends VariantProps<typeof componentVariants> {
  children: React.ReactNode
  // ... other props
}
```

---

## 🚀 Development Workflow

### Setup & Installation

```bash
# Установка зависимостей
npm install

# Запуск dev сервера
npm run dev

# Запуск Storybook (если настроен)
npm run storybook

# Линтинг
npm run lint
npm run lint:fix

# Типизация
npm run type-check

# Сборка production
npm run build
```

### File Structure

```
apps/miniapp/
├── src/
│   ├── components/           ← App-specific компоненты
│   ├── design-system/        ← UI компоненты
│   │   ├── components/       ← 18 модульных компонентов
│   │   ├── index.ts         ← Barrel exports
│   │   └── tokens.ts        ← Design tokens
│   ├── pages/               ← Страницы приложения
│   ├── hooks/               ← Custom React hooks
│   ├── utils/               ← Утилиты и helpers
│   ├── types/               ← TypeScript типы
│   └── styles/              ← Глобальные стили
├── public/                  ← Статические файлы
├── DESIGN_AGREEMENTS.md     ← Дизайн-документация
├── TECH_STACK.md           ← Этот файл
└── package.json
```

### Component Development Pattern

```typescript
// 1. Создание интерфейса (ComponentTypes.ts)
export interface ButtonProps 
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

// 2. Определение вариантов (ComponentVariants.ts)  
export const buttonVariants = cva(
  ["base-button-styles"],
  {
    variants: {
      variant: { primary: "...", secondary: "..." },
      size: { sm: "...", md: "...", lg: "..." }
    }
  }
)

// 3. Бизнес-логика (ComponentLogic.ts)
export const createClickHandler = (...) => { ... }
export const generateButtonId = (...) => { ... }

// 4. Основной компонент (index.tsx)
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant, size, loading, children, ...props }, ref) => {
    return (
      <button 
        ref={ref}
        className={cn(buttonVariants({ variant, size }))}
        {...props}
      >
        {children}
      </button>
    )
  }
)
```

---

## 📱 Telegram WebApp Integration

### Основные возможности

```typescript
import { useWebApp, useMainButton } from '@twa-dev/react'

// Получение данных пользователя
const webApp = useWebApp()
const user = webApp?.initDataUnsafe?.user

// Управление кнопкой
const [mainButton] = useMainButton()
mainButton.setText('Продолжить')
mainButton.show()
mainButton.onClick(() => {
  // Handle click
})

// Haptic feedback
webApp?.HapticFeedback.impactOccurred('medium')

// Закрытие приложения
webApp?.close()
```

### Конфигурация манифеста

```json
{
  "name": "Telegram iOS Academy",
  "short_name": "iOS Academy",
  "description": "Learn iOS development",
  "start_url": "/",
  "display": "standalone",
  "theme_color": "#6366F1",
  "background_color": "#FFFFFF"
}
```

---

## 🎨 Styling Guidelines

### Tailwind Configuration

```javascript
// tailwind.config.js
module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        indigo: { 500: '#6366F1' },
        telegram: '#229ED9'
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif']
      }
    }
  },
  plugins: []
}
```

### CSS Custom Properties

```css
:root {
  /* Design System Colors */
  --color-accent: #6366F1;
  --color-telegram: #229ED9;
  
  /* Semantic Colors */
  --color-success: #059669;
  --color-warning: #D97706;
  --color-danger: #DC2626;
  --color-info: #0284C7;
  
  /* Typography Scale */
  --text-xs: 0.75rem;
  --text-sm: 0.875rem;
  --text-base: 1rem;
  --text-lg: 1.125rem;
  --text-xl: 1.25rem;
  --text-2xl: 1.5rem;
  
  /* Spacing Scale */
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-6: 1.5rem;
  --space-8: 2rem;
}
```

---

## 🔧 Configuration Files

### TypeScript Configuration

```json
// tsconfig.json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "allowJs": false,
    "skipLibCheck": true,
    "esModuleInterop": false,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@/components/*": ["./src/components/*"],
      "@/design-system/*": ["./src/design-system/*"]
    }
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

### ESLint Configuration

```json
// .eslintrc.json
{
  "extends": [
    "eslint:recommended",
    "@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended"
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module",
    "ecmaFeatures": { "jsx": true }
  },
  "plugins": ["react-refresh"],
  "rules": {
    "react-refresh/only-export-components": [
      "warn",
      { "allowConstantExport": true }
    ]
  },
  "settings": {
    "react": { "version": "18.2" }
  }
}
```

---

## 📊 Performance & Optimization

### Bundle Optimization

- **Tree Shaking**: Автоматическое удаление неиспользуемого кода
- **Code Splitting**: Lazy loading компонентов и страниц
- **Asset Optimization**: Сжатие изображений и оптимизация шрифтов
- **CSS Purging**: Удаление неиспользуемых Tailwind классов

### Performance Metrics

- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **First Input Delay**: < 100ms
- **Bundle Size**: < 200KB gzipped

---

## 🧪 Testing Strategy

### Testing Tools (рекомендуемые)

```bash
# Unit & Integration Testing
npm install -D @testing-library/react
npm install -D @testing-library/jest-dom
npm install -D vitest

# E2E Testing  
npm install -D playwright

# Component Testing
npm install -D @storybook/react
npm install -D chromatic
```

### Test Structure

```typescript
// Component.test.tsx
import { render, screen } from '@testing-library/react'
import { Button } from './Button'

describe('Button', () => {
  test('renders with correct text', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button')).toHaveTextContent('Click me')
  })

  test('applies variant styles correctly', () => {
    render(<Button variant="primary">Primary</Button>)
    expect(screen.getByRole('button')).toHaveClass('bg-indigo-500')
  })
})
```

---

## 🚀 Deployment

### Build Process

```bash
# Production build
npm run build

# Preview build locally
npm run preview

# Type checking
npm run type-check
```

### Environment Variables

```bash
# .env
VITE_APP_TITLE="Telegram iOS Academy"
VITE_TELEGRAM_BOT_NAME="@telegram_ios_academy_bot"
VITE_APP_URL="https://your-app-url.com"

# .env.production
VITE_API_BASE_URL="https://api.production.com"
VITE_ANALYTICS_ID="GA_MEASUREMENT_ID"
```

### Hosting Options

- **Vercel** - Рекомендуется для React приложений
- **Netlify** - Альтернатива с хорошим CI/CD
- **GitHub Pages** - Для статических билдов
- **Railway** - Для fullstack приложений

---

## 📋 Best Practices

### Code Style

- **Functional Components** с hooks вместо классов
- **TypeScript everywhere** - строгая типизация
- **Consistent naming** - camelCase для переменных, PascalCase для компонентов
- **Single responsibility** - один компонент = одна ответственность
- **Composition over inheritance** - используем композицию

### Component Design

- **Props interface first** - сначала определяем API компонента
- **Forward refs** - всегда используем для DOM элементов
- **Variant-driven development** - CVA для всех стилевых вариаций
- **Accessibility by default** - ARIA атрибуты и keyboard navigation
- **Mobile-first responsive** - сначала мобильная версия

### Performance

- **Lazy loading** для тяжелых компонентов
- **React.memo** для предотвращения лишних ререндеров
- **useMemo/useCallback** для оптимизации вычислений
- **Bundle analysis** регулярный анализ размера бандла

---

## 🐛 Troubleshooting

### Частые проблемы

**1. TypeScript ошибки с CVA**
```typescript
// ❌ Неправильно
const Component: FC<ComponentProps> = ({ variant }) => { ... }

// ✅ Правильно  
const Component = React.forwardRef<HTMLElement, ComponentProps>(
  ({ variant }, ref) => { ... }
)
```

**2. Tailwind классы не применяются**
```bash
# Проверить настройки purge в tailwind.config.js
# Убедиться что файл включен в content: []
```

**3. Telegram WebApp не работает в dev режиме**
```typescript
// Добавить проверку на наличие Telegram WebApp
if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
  // Telegram WebApp код
}
```

### Debug Tools

- **React DevTools** - инспекция компонентов
- **Tailwind DevTools** - отладка CSS классов  
- **TypeScript Compiler** - проверка типов
- **Vite DevTools** - анализ сборки

---

## 📚 Resources & Documentation

### Официальная документация

- [React](https://react.dev/) - Основы React 18
- [TypeScript](https://www.typescriptlang.org/) - Типизация
- [Tailwind CSS](https://tailwindcss.com/) - Утилитарный CSS
- [CVA](https://cva.style/docs) - Class Variance Authority
- [Headless UI](https://headlessui.com/) - Unstyled компоненты
- [Telegram WebApp](https://core.telegram.org/bots/webapps) - Telegram Mini Apps

### Полезные инструменты

- [Tailwind UI](https://tailwindui.com/) - Компоненты для вдохновения
- [Radix Colors](https://www.radix-ui.com/colors) - Продвинутые цветовые палитры
- [React Hook Form](https://react-hook-form.com/) - Формы с валидацией
- [Framer Motion](https://www.framer.com/motion/) - Анимации
- [React Query DevTools](https://tanstack.com/query/v4/docs/devtools) - Отладка запросов

---

**Последнее обновление**: Сентябрь 2024  
**Версия**: 3.0 - MODULAR ARCHITECTURE + ENTERPRISE READY  
**Maintainer**: @timurceberda

---

*Этот стек обеспечивает современную, производительную и поддерживаемую архитектуру для enterprise Telegram Mini Apps.*