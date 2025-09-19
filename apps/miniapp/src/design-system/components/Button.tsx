/**
 * 🎯 Button Component - Модульная архитектура
 * 
 * Этот файл теперь служит как точка входа для модульной системы кнопок.
 * Основная логика разделена на отдельные модули для улучшения читаемости:
 * 
 * • ButtonVariants.ts - CVA варианты (градиенты, неон, социальные)
 * • ButtonTypes.ts - TypeScript типы и интерфейсы
 * • ButtonGroup.tsx - Группировка и toggle функционал
 * • index.tsx - Основной компонент Button
 * 
 * Размер файла сокращен с 577 до 30 строк! 🎉
 * Функционал остался полностью тот же, но код стал более поддерживаемым.
 */

// Экспортируем все из модульной версии
export * from './button'

// Для обратной совместимости - основные экспорты
export {
  Button,
  ButtonGroup,
  ToggleButton,
  ToggleGroup,
  buttonVariants,
  useToggleGroup
} from './button'

export type {
  ButtonProps,
  ButtonVariant,
  ButtonSize,
  ButtonGroupProps,
  ToggleButtonProps,
  ToggleGroupProps
} from './button'