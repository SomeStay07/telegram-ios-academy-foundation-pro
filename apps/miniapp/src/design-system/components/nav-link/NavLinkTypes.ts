import React from 'react'
import { type VariantProps } from 'class-variance-authority'
import { navLinkVariants } from './NavLinkVariants'

/**
 * 🎯 NavLink Props Interface
 */
export interface NavLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof navLinkVariants> {
  /** URL для навигации */
  href: string
  /** Дети компонента (текст или элементы) */
  children: React.ReactNode
  /** Иконка перед текстом */
  icon?: React.ReactNode
  /** Активна ли ссылка (для текущей страницы) */
  isActive?: boolean
  /** Отключена ли ссылка */
  disabled?: boolean
  /** Кастомные CSS классы */
  className?: string
  /** Внешняя ссылка (открыть в новой вкладке) */
  external?: boolean
  /** Функция при клике */
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void
}

// Экспорт типов для использования в других компонентах
export type NavLinkVariant = VariantProps<typeof navLinkVariants>['variant']
export type NavLinkSize = VariantProps<typeof navLinkVariants>['size']