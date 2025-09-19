import React from 'react'
import { type VariantProps } from 'class-variance-authority'
import { usernameBadgeVariants } from './UsernameBadgeVariants'

/**
 * 🎯 UsernameBadge Props Interface
 */
export interface UsernameBadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof usernameBadgeVariants> {
  /** Юзернейм (без @) */
  username: string
  /** Показать символ @ */
  showAtSymbol?: boolean
  /** Иконка (например, для верификации) */
  icon?: React.ReactNode
  /** Функция при клике */
  onClick?: () => void
  /** Кастомные CSS классы */
  className?: string
  /** Показать индикатор онлайн */
  online?: boolean
  /** Копировать юзернейм при клике */
  copyOnClick?: boolean
}

// Экспорт типов для использования в других компонентах
export type UsernameBadgeVariant = VariantProps<typeof usernameBadgeVariants>['variant']
export type UsernameBadgeSize = VariantProps<typeof usernameBadgeVariants>['size']