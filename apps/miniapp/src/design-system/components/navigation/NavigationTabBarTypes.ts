import { ReactNode } from 'react'
import type { LucideIcon } from 'lucide-react'

export interface NavigationTabItem {
  /** Уникальный идентификатор таба */
  id: string
  /** Путь для навигации */
  path: string
  /** Отображаемый текст */
  label: string
  /** Иконка Lucide */
  icon: LucideIcon
  /** Дополнительные аксессуары (бейдж, индикатор и т.д.) */
  badge?: ReactNode
  /** Отключен ли таб */
  disabled?: boolean
}

export interface NavigationTabBarProps {
  /** Список табов для отображения */
  tabs: NavigationTabItem[]
  /** Текущий активный путь */
  currentPath: string
  /** Размер табов */
  size?: 'sm' | 'md' | 'lg'
  /** Вариант стиля */
  variant?: 'default' | 'minimal' | 'glassmorphism'
  /** Коллбек при клике на таб */
  onTabClick?: (item: NavigationTabItem) => void
  /** Дополнительный CSS класс */
  className?: string
  /** Максимальная ширина контейнера */
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
}

export interface NavigationTabItemProps {
  /** Данные таба */
  item: NavigationTabItem
  /** Активен ли таб */
  isActive: boolean
  /** Размер */
  size: NonNullable<NavigationTabBarProps['size']>
  /** Вариант стиля */
  variant: NonNullable<NavigationTabBarProps['variant']>
  /** Коллбек при клике */
  onClick: (item: NavigationTabItem) => void
}