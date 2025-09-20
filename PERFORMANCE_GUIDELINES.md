# 🚀 PERFORMANCE GUIDELINES
## React Performance Best Practices для Telegram Mini App

*Версия 1.0 | 2025 | Профессиональная оптимизация*

---

## 📋 ОБЯЗАТЕЛЬНЫЕ ПРИНЦИПЫ

### 🎯 **ВСЕГДА ИСПОЛЬЗУЙ ПРИ СОЗДАНИИ КОМПОНЕНТОВ:**

#### 1. **React.memo() - Мемоизация компонентов**
```tsx
// ✅ ПРАВИЛЬНО - Всегда оборачивай функциональные компоненты
export const MyComponent = React.memo(function MyComponent({ props }) {
  // компонент
})

// ❌ НЕПРАВИЛЬНО - Компонент без мемоизации
export function MyComponent({ props }) {
  // компонент
}
```

#### 2. **useMemo() - Мемоизация вычислений**
```tsx
// ✅ ПРАВИЛЬНО - Кешируй массивы, объекты и вычисления
const processedData = useMemo(() => {
  return data.map(item => ({
    ...item,
    computed: heavyCalculation(item)
  }))
}, [data])

// ✅ ПРАВИЛЬНО - Мемоизируй стили
const buttonStyle = useMemo(() => ({
  '--progress-color': getColor(progress),
  '--bg-opacity': opacity
} as React.CSSProperties), [progress, opacity])

// ❌ НЕПРАВИЛЬНО - Пересоздание на каждом рендере
const processedData = data.map(item => ({ ...item, computed: heavyCalculation(item) }))
```

#### 3. **useCallback() - Мемоизация функций**
```tsx
// ✅ ПРАВИЛЬНО - Мемоизируй все обработчики событий
const handleClick = useCallback(() => {
  doSomething()
}, [dependency])

const handleSubmit = useCallback((formData) => {
  submitForm(formData)
}, [submitForm])

// ❌ НЕПРАВИЛЬНО - Создание новой функции на каждом рендере
const handleClick = () => doSomething()
```

---

## 🎨 СПЕЦИФИКА ДЛЯ DESIGN SYSTEM

### **Компоненты дизайн-системы:**
```tsx
// Шаблон для всех компонентов дизайн-системы
export const DesignSystemComponent = React.memo(function DesignSystemComponent({
  variant,
  size,
  children,
  onClick,
  ...props
}: ComponentProps) {
  // 1. Мемоизируй варианты стилей
  const className = useMemo(() => 
    cn(baseStyles, variantStyles[variant], sizeStyles[size])
  , [variant, size])
  
  // 2. Мемоизируй обработчики
  const handleClick = useCallback((e: React.MouseEvent) => {
    if (onClick) onClick(e)
  }, [onClick])
  
  // 3. Мемоизируй сложные вычисления
  const computedProps = useMemo(() => ({
    'aria-label': generateAriaLabel(variant, children),
    role: getSemanticRole(variant)
  }), [variant, children])
  
  return (
    <element 
      className={className}
      onClick={handleClick}
      {...computedProps}
      {...props}
    >
      {children}
    </element>
  )
})
```

---

## 📱 TELEGRAM MINI APP СПЕЦИФИКА

### **Haptic Feedback оптимизация:**
```tsx
// ✅ ПРАВИЛЬНО - Мемоизируй Telegram API
const handleTelegramAction = useCallback(() => {
  try {
    if (telegramApi.isAvailable() && telegramApi.hapticFeedback) {
      telegramApi.hapticFeedback.impactOccurred('light')
    }
  } catch (error) {
    console.warn('Haptic feedback not available:', error)
  }
  
  performAction()
}, [telegramApi, performAction])
```

### **Navigation оптимизация:**
```tsx
// ✅ ПРАВИЛЬНО - Мемоизируй навигационные функции
const navigateToPage = useCallback((path: string) => {
  navigate({ to: path })
}, [navigate])
```

---

## 🖼️ ИЗОБРАЖЕНИЯ И МЕДИА

### **Lazy Loading - ВСЕГДА:**
```tsx
// ✅ ПРАВИЛЬНО - Всегда добавляй lazy loading
<img 
  src={src}
  alt={alt}
  loading="lazy"
  decoding="async"
  className="optimized-image"
/>

// Avatar компонент уже оптимизирован в дизайн-системе
<Avatar src={userAvatar} loading="lazy" />
```

---

## 🎮 АНИМАЦИИ И FRAMER MOTION

### **Оптимизированные анимации:**
```tsx
// ✅ ПРАВИЛЬНО - Мемоизируй варианты анимаций
const animationVariants = useMemo(() => ({
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.2, ease: [0.4, 0, 0.2, 1] }
  }
}), [])

// ✅ ПРАВИЛЬНО - Используй стандартные переходы
const hoverAnimation = {
  scale: 1.02,
  y: -1,
  transition: { duration: 0.2, ease: [0.4, 0, 0.2, 1] }
}
```

---

## 📊 ДАННЫЕ И STATE

### **Мемоизация данных:**
```tsx
// ✅ ПРАВИЛЬНО - Мемоизируй обработку массивов данных
const processedItems = useMemo(() => 
  items.filter(item => item.visible)
       .sort((a, b) => a.priority - b.priority)
       .map(item => ({ ...item, processed: true }))
, [items])

// ✅ ПРАВИЛЬНО - Мемоизируй селекторы
const selectedItems = useMemo(() => 
  items.filter(item => selectedIds.includes(item.id))
, [items, selectedIds])
```

---

## 🎯 ЧЕКЛИСТ ДЛЯ КАЖДОГО КОМПОНЕНТА

### **Перед созданием компонента проверь:**

- [ ] **React.memo()** - Компонент обернут в memo
- [ ] **useMemo()** - Все вычисления и объекты мемоизированы
- [ ] **useCallback()** - Все функции мемоизированы
- [ ] **loading="lazy"** - Все изображения с lazy loading
- [ ] **CSS Containment** - Добавлен `contain: layout style` если нужно
- [ ] **Framer Motion** - Анимации соответствуют СПОКОЙНАЯ ЭЛЕГАНТНОСТЬ
- [ ] **TypeScript** - Типы корректны и не вызывают лишних рендеров

### **Перед коммитом проверь:**

- [ ] **DevTools Profiler** - Нет лишних рендеров
- [ ] **Bundle Analysis** - Размер bundle оптимален
- [ ] **Memory Usage** - Нет утечек памяти
- [ ] **60fps** - Анимации плавные на мобильных
- [ ] **Haptic Feedback** - Работает корректно в Telegram

---

## 🚨 КРАСНЫЕ ФЛАГИ - НИКОГДА НЕ ДЕЛАЙ:

### ❌ **Антипаттерны производительности:**

```tsx
// ❌ НЕПРАВИЛЬНО - Объекты в JSX
<Component style={{ marginTop: 10 }} />

// ✅ ПРАВИЛЬНО - Мемоизированные стили
const styles = useMemo(() => ({ marginTop: 10 }), [])
<Component style={styles} />

// ❌ НЕПРАВИЛЬНО - Функции в JSX  
<Button onClick={() => doSomething()}>Click</Button>

// ✅ ПРАВИЛЬНО - Мемоизированные обработчики
const handleClick = useCallback(() => doSomething(), [])
<Button onClick={handleClick}>Click</Button>

// ❌ НЕПРАВИЛЬНО - Массивы без keys или с индексами
{items.map((item, index) => <Item key={index} />)}

// ✅ ПРАВИЛЬНО - Стабильные уникальные keys
{items.map(item => <Item key={item.id} />)}

// ❌ НЕПРАВИЛЬНО - Сложные вычисления в render
const filtered = items.filter(item => item.active).map(item => transform(item))

// ✅ ПРАВИЛЬНО - Мемоизированные вычисления
const filtered = useMemo(() => 
  items.filter(item => item.active).map(item => transform(item))
, [items])
```

---

## 🎯 РЕЗУЛЬТАТ СОБЛЮДЕНИЯ ПРИНЦИПОВ:

### **📈 ОЖИДАЕМЫЕ МЕТРИКИ:**
- ⚡ **70%+ быстрее** рендер компонентов
- 🚀 **Мгновенная навигация** без задержек  
- 🎯 **60fps** анимации на всех устройствах
- 📱 **50%+ экономия** батареи
- 💾 **60%+ меньше** потребления памяти
- 🎮 **Нативное ощущение** Telegram Mini App

### **🏆 ЦЕЛЬ:**
**Каждый новый компонент должен быть оптимизирован с первого дня разработки!**

---

## 🔧 ИНСТРУМЕНТЫ ДЛЯ МОНИТОРИНГА:

```bash
# Анализ bundle размера
npm run build:analyze

# Профилирование в разработке  
# React DevTools Profiler + Performance вкладка в браузере

# Проверка памяти
# Chrome DevTools Memory tab

# Тестирование на медленных устройствах
# Chrome DevTools CPU Throttling
```

---

**💡 ПОМНИ:** Оптимизация с первого дня разработки намного проще чем рефакторинг позже!

**🎯 РЕЗУЛЬТАТ:** Профессиональное Telegram Mini App с производительностью нативных приложений! 🚀