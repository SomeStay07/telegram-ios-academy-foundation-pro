/**
 * 🎯 DemoLayout Logic & Utilities
 * 
 * Модульный файл содержащий утилиты и бизнес-логику для демо компонентов
 * Разделен из основного DemoLayout.tsx для улучшения организации кода
 */

/**
 * 🔧 Утилитарные функции для демо компонентов
 */

/**
 * Определяет должен ли компонент быть интерактивным
 */
export const isInteractiveComponent = (onClick?: () => void): boolean => {
  return !!onClick
}

/**
 * Определяет вариант для интерактивного компонента
 */
export const getInteractiveVariant = (
  onClick?: () => void,
  variant: string = "default"
): string => {
  return isInteractiveComponent(onClick) && variant === "default" 
    ? "interactive" 
    : variant
}

/**
 * Генерирует accessibility атрибуты для интерактивных компонентов
 */
export const getA11yProps = (onClick?: () => void) => {
  if (!isInteractiveComponent(onClick)) {
    return {}
  }

  return {
    role: "button" as const,
    tabIndex: 0
  }
}

/**
 * 🎨 Функции для работы с заголовками и описаниями
 */

/**
 * Проверяет есть ли контент для отображения
 */
export const hasHeaderContent = (title?: string, description?: string): boolean => {
  return !!(title || description)
}

/**
 * Генерирует класс для секции заголовка
 */
export const getHeaderClassName = (size: 'section' | 'component' = 'section'): string => {
  return size === 'section' ? "mb-6" : "mb-4"
}

/**
 * Генерирует стили для заголовков
 */
export const getTitleClassName = (size: 'section' | 'component' = 'section'): string => {
  const baseClasses = "font-bold text-gray-900 dark:text-white"
  
  return size === 'section' 
    ? `text-2xl mb-2 ${baseClasses}`
    : `text-lg mb-2 ${baseClasses}`
}

/**
 * Генерирует стили для описаний
 */
export const getDescriptionClassName = (size: 'section' | 'component' = 'section'): string => {
  const baseClasses = "text-gray-600 dark:text-gray-300"
  
  return size === 'section' 
    ? baseClasses
    : `text-sm ${baseClasses.replace('gray-300', 'gray-400')}`
}

/**
 * 📊 Функции для работы с сетками
 */

/**
 * Валидирует количество колонок
 */
export const validateColumns = (columns: number | string): boolean => {
  if (typeof columns === 'string') {
    return columns === 'auto'
  }
  
  return Number.isInteger(columns) && columns >= 1 && columns <= 4
}

/**
 * Генерирует CSS класс для минимальной высоты контента
 */
export const getContentMinHeight = (hasContent: boolean): string => {
  return hasContent ? "min-h-[60px]" : ""
}

/**
 * 🎭 Предустановленные конфигурации
 */

/**
 * Конфигурация для демонстрации кнопок
 */
export const buttonDemoConfig = {
  variant: "highlighted" as const,
  size: "md" as const
}

/**
 * Конфигурация для демонстрации форм
 */
export const formDemoConfig = {
  size: "lg" as const,
  variant: "default" as const
}

/**
 * Конфигурации для различных типов сеток
 */
export const gridConfigs = {
  twoColumn: {
    columns: 2 as const,
    gap: "md" as const,
    responsive: true as const
  },
  fourColumn: {
    columns: 4 as const,
    gap: "md" as const,
    responsive: true as const
  },
  autoFit: {
    columns: "auto" as const,
    gap: "md" as const,
    responsive: true as const
  }
} as const

/**
 * 🔄 Функции для обработки событий
 */

/**
 * Создает обработчик клавиатурных событий для интерактивных компонентов
 */
export const createKeyboardHandler = (onClick?: () => void) => {
  if (!onClick) return undefined

  return (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      onClick()
    }
  }
}

/**
 * 🎪 Анимационные утилиты
 */

/**
 * Генерирует классы для плавных переходов
 */
export const getTransitionClasses = (duration: number = 200): string => {
  return `transition-colors duration-${duration}`
}

/**
 * Генерирует классы для hover эффектов
 */
export const getHoverClasses = (interactive: boolean = false): string => {
  if (!interactive) return ""
  
  return "hover:bg-gray-100 dark:hover:bg-gray-700"
}

/**
 * 📏 Утилиты для spacing
 */
export const spacingMap = {
  sm: { padding: "p-4", gap: "gap-4", margin: "mb-8" },
  md: { padding: "p-6", gap: "gap-6", margin: "mb-10" },
  lg: { padding: "p-8", gap: "gap-8", margin: "mb-12" },
  xl: { padding: "p-10", gap: "gap-10", margin: "mb-16" }
} as const

/**
 * Получает конфигурацию spacing для размера
 */
export const getSpacing = (size: keyof typeof spacingMap) => {
  return spacingMap[size] || spacingMap.md
}