import React from 'react'
import { type VariantProps } from 'class-variance-authority'
import { avatarVariants } from './AvatarVariants'

/**
 * 🎯 Avatar Props Interface
 */
export interface AvatarProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof avatarVariants> {
  /** URL изображения */
  src?: string
  /** Альтернативный текст */
  alt?: string
  /** Инициалы пользователя */
  initials?: string
  /** Полное имя для генерации инициалов */
  name?: string
  /** Иконка вместо изображения */
  icon?: React.ReactNode
  /** Статус пользователя */
  status?: 'online' | 'offline' | 'away' | 'busy'
  /** Показать статус */
  showStatus?: boolean
  /** Интерактивный аватар */
  interactive?: boolean
  /** Кольцо вокруг аватара */
  ring?: boolean | 'primary' | 'success' | 'warning' | 'danger'
  /** Функция при клике */
  onClick?: () => void
  /** Кастомные CSS классы */
  className?: string
  /** Кастомные CSS классы для изображения */
  imageClassName?: string
}

/**
 * 🎯 Avatar Group Props Interface
 */
export interface AvatarGroupProps {
  /** Максимальное количество видимых аватаров */
  max?: number
  /** Размер аватаров */
  size?: VariantProps<typeof avatarVariants>['size']
  /** Кастомные CSS классы */
  className?: string
  /** Дочерние элементы (Avatar компоненты) */
  children: React.ReactNode
}

/**
 * 🎯 Type Exports
 */
export type AvatarVariant = VariantProps<typeof avatarVariants>['variant']
export type AvatarSize = VariantProps<typeof avatarVariants>['size']
export type AvatarShape = VariantProps<typeof avatarVariants>['shape']
export type AvatarStatus = 'online' | 'offline' | 'away' | 'busy'