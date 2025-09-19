import { type VariantProps } from 'class-variance-authority'
import { buttonVariants, gradientVariants, neonVariants, socialVariants } from './ButtonVariants'

/**
 * 🎯 Button TypeScript Types
 * 
 * Модульный файл содержащий все типы для кнопок
 * Разделен из основного Button.tsx для улучшения типизации
 */

/**
 * 🔧 Базовые типы кнопок
 */
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /** Состояние загрузки */
  loading?: boolean
  /** Иконка слева от текста */
  leftIcon?: React.ReactNode
  /** Иконка справа от текста */
  rightIcon?: React.ReactNode
  /** Только иконка (без текста) */
  iconOnly?: React.ReactNode
  /** Кастомные CSS классы */
  className?: string
  /** Дети компонента */
  children?: React.ReactNode
  /** Рендерить как ссылку */
  asChild?: boolean
  /** Полная ширина */
  fullWidth?: boolean
  /** Градиентный вариант */
  gradientVariant?: keyof typeof gradientVariants
  /** Неоновый вариант */
  neonVariant?: keyof typeof neonVariants
  /** Социальный вариант */
  socialVariant?: keyof typeof socialVariants
}

/**
 * ⚡ Типы для ButtonGroup
 */
export interface ButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Размер всех кнопок в группе */
  size?: VariantProps<typeof buttonVariants>['size']
  /** Вариант всех кнопок в группе */
  variant?: VariantProps<typeof buttonVariants>['variant']
  /** Направление группы */
  orientation?: 'horizontal' | 'vertical'
  /** Связанные кнопки (без отступов между ними) */
  attached?: boolean
  /** Дети компонента */
  children: React.ReactNode
  /** Кастомные CSS классы */
  className?: string
}

/**
 * 🔄 Типы для ToggleButton
 */
export interface ToggleButtonProps extends Omit<ButtonProps, 'pressed'> {
  /** Нажато ли (toggle состояние) */
  pressed?: boolean
  /** Callback при изменении состояния */
  onPressedChange?: (pressed: boolean) => void
  /** Значение для toggle группы */
  value?: string
}

/**
 * 📊 Типы для ToggleGroup
 */
export interface ToggleGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Тип группы */
  type: 'single' | 'multiple'
  /** Значение для single режима */
  value?: string
  /** Значения для multiple режима */
  values?: string[]
  /** Значение по умолчанию */
  defaultValue?: string
  /** Значения по умолчанию для multiple */
  defaultValues?: string[]
  /** Callback при изменении значения */
  onValueChange?: (value: string) => void
  /** Callback при изменении значений */
  onValuesChange?: (values: string[]) => void
  /** Размер всех кнопок */
  size?: VariantProps<typeof buttonVariants>['size']
  /** Вариант всех кнопок */
  variant?: VariantProps<typeof buttonVariants>['variant']
  /** Направление группы */
  orientation?: 'horizontal' | 'vertical'
  /** Дети компонента */
  children: React.ReactNode
  /** Кастомные CSS классы */
  className?: string
  /** Отключить всю группу */
  disabled?: boolean
}

/**
 * 🎨 Расширенные варианты типов
 */
export type ButtonVariant = VariantProps<typeof buttonVariants>['variant']
export type ButtonSize = VariantProps<typeof buttonVariants>['size']
export type GradientVariant = keyof typeof gradientVariants
export type NeonVariant = keyof typeof neonVariants
export type SocialVariant = keyof typeof socialVariants

/**
 * 📱 Типы для иконок
 */
export interface IconProps {
  /** Размер иконки */
  size?: number | string
  /** Цвет иконки */
  color?: string
  /** CSS класс */
  className?: string
}

/**
 * 🔧 Утилитарные типы
 */
export type ButtonElement = React.ElementRef<"button">
export type ButtonRef = React.ForwardedRef<ButtonElement>

/**
 * 🎭 Составные типы для сложных кнопок
 */
export interface ActionButtonProps extends ButtonProps {
  /** Подтверждение действия */
  confirmAction?: boolean
  /** Текст подтверждения */
  confirmText?: string
  /** Опасное действие */
  destructive?: boolean
  /** Tooltip текст */
  tooltip?: string
}

export interface SplitButtonProps extends ButtonProps {
  /** Основное действие */
  mainAction: () => void
  /** Дополнительные действия */
  menuItems: Array<{
    label: string
    action: () => void
    icon?: React.ReactNode
    disabled?: boolean
    destructive?: boolean
  }>
  /** Позиция меню */
  menuPosition?: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right'
}

/**
 * 📊 Типы состояний
 */
export interface ButtonState {
  /** Активное состояние */
  isActive: boolean
  /** Состояние загрузки */
  isLoading: boolean
  /** Отключенное состояние */
  isDisabled: boolean
  /** Состояние наведения */
  isHovered: boolean
  /** Состояние фокуса */
  isFocused: boolean
  /** Нажатое состояние */
  isPressed: boolean
}

/**
 * 🎪 Типы для анимаций
 */
export interface ButtonAnimation {
  /** Тип анимации */
  type: 'bounce' | 'pulse' | 'shake' | 'spin' | 'ping'
  /** Длительность анимации */
  duration?: number
  /** Задержка анимации */
  delay?: number
  /** Повторения анимации */
  iterations?: number | 'infinite'
}

/**
 * 🔊 Типы для accessibility
 */
export interface ButtonA11y {
  /** Aria label */
  'aria-label'?: string
  /** Aria описание */
  'aria-describedby'?: string
  /** Расширенное состояние */
  'aria-expanded'?: boolean
  /** Нажатое состояние */
  'aria-pressed'?: boolean
  /** Текущее состояние */
  'aria-current'?: boolean | 'page' | 'step' | 'location' | 'date' | 'time'
  /** Роль элемента */
  role?: string
}

/**
 * ⚡ Обобщенный тип для всех кнопок
 */
export type AnyButtonProps = 
  | ButtonProps 
  | ToggleButtonProps 
  | ActionButtonProps 
  | SplitButtonProps

/**
 * 🔗 Типы для ссылок-кнопок
 */
export interface LinkButtonProps extends Omit<ButtonProps, 'onClick'> {
  /** URL для перехода */
  href: string
  /** Открыть в новом окне */
  external?: boolean
  /** Заменить текущую страницу в истории */
  replace?: boolean
  /** Префetch ссылки */
  prefetch?: boolean
}