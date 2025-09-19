import React from 'react'
import { type VariantProps } from 'class-variance-authority'
import { profileNameVariants } from './ProfileNameVariants'

/**
 * 🎯 ProfileName Props Interface
 */
export interface ProfileNameProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof profileNameVariants> {
  /** Имя пользователя */
  children: React.ReactNode
  /** HTML элемент для рендеринга */
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  /** Функция при клике */
  onClick?: () => void
  /** Кастомные CSS классы */
  className?: string
}

// Экспорт типов для использования в других компонентах
export type ProfileNameVariant = VariantProps<typeof profileNameVariants>['variant']
export type ProfileNameSize = VariantProps<typeof profileNameVariants>['size']
export type ProfileNameAlign = VariantProps<typeof profileNameVariants>['align']