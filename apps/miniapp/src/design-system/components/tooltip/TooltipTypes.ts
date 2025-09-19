import { type VariantProps } from 'class-variance-authority'
import { tooltipVariants } from './TooltipVariants'

/**
 * 🎯 Tooltip Props Interface
 */
export interface TooltipProps
  extends VariantProps<typeof tooltipVariants> {
  /** Контент тултипа */
  content: React.ReactNode
  /** Элементы, при наведении на которые показывается тултип */
  children: React.ReactNode
  /** Позиция тултипа относительно элемента */
  position?: 'top' | 'bottom' | 'left' | 'right'
  /** Задержка перед показом (мс) */
  delay?: number
  /** Отключить тултип */
  disabled?: boolean
  /** Показать стрелку */
  showArrow?: boolean
  /** Разрешить rich контент (HTML, многострочный текст) */
  richContent?: boolean
  /** Показать на touch устройствах при tap */
  touchEnabled?: boolean
  /** Кастомные CSS классы */
  className?: string
  /** Кастомные CSS классы для контейнера */
  containerClassName?: string
}

/**
 * 🎯 Tooltip Position Utilities Types
 */
export type TooltipPosition = 'top' | 'bottom' | 'left' | 'right'
export type TooltipVariant = VariantProps<typeof tooltipVariants>['variant']
export type TooltipSize = VariantProps<typeof tooltipVariants>['size']

/**
 * 🎯 Internal State Types
 */
export interface TooltipState {
  isVisible: boolean
  actualPosition: TooltipPosition
}

/**
 * 🎯 Position Classes Configuration
 */
export interface PositionConfig {
  [key: string]: string
}