import React from 'react'
import { type VariantProps } from 'class-variance-authority'
import { cardVariants, cardHeaderVariants } from './CardVariants'

/**
 * 🎯 Card Props Interface
 */
export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  /** Заголовок карточки */
  title?: string
  /** Описание карточки */
  description?: string
  /** Иконка в заголовке */
  icon?: React.ReactNode
  /** Контент карточки */
  children: React.ReactNode
  /** Интерактивная карточка */
  interactive?: boolean
  /** Растянуть на всю ширину */
  fullWidth?: boolean
  /** Вариант заголовка */
  headerVariant?: VariantProps<typeof cardHeaderVariants>['variant']
  /** Кастомные CSS классы */
  className?: string
  /** Кастомные CSS классы для заголовка */
  headerClassName?: string
  /** Кастомные CSS классы для контента */
  contentClassName?: string
}

// Экспорт типов для использования в других компонентах
export type CardVariant = VariantProps<typeof cardVariants>['variant']
export type CardSize = VariantProps<typeof cardVariants>['size']