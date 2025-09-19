import React from 'react'
import { type VariantProps } from 'class-variance-authority'
import { spacerVariants } from './SpacerVariants'

/**
 * 🎯 Spacer Props Interface
 */
export interface SpacerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof spacerVariants> {
  /** Размер отступа */
  size?: VariantProps<typeof spacerVariants>['size']
  /** Направление отступа */
  direction?: VariantProps<typeof spacerVariants>['direction']
  /** Адаптивный отступ */
  responsive?: boolean
  /** Кастомные CSS классы */
  className?: string
  /** Скрытие на определенных размерах экрана */
  hideOn?: 'mobile' | 'tablet' | 'desktop'
  /** Дети компонента (обычно не используется) */
  children?: React.ReactNode
}

// Экспорт типов для использования в других компонентах
export type SpacerSize = VariantProps<typeof spacerVariants>['size']
export type SpacerDirection = VariantProps<typeof spacerVariants>['direction']