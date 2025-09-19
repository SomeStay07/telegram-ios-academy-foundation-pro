import React from 'react'
import { type VariantProps } from 'class-variance-authority'
import { tabsVariants, tabListVariants } from './TabsVariants'

/**
 * 🎯 Tab Interface
 */
export interface TabItem {
  /** Уникальный идентификатор таба */
  id: string
  /** Заголовок таба */
  label: string
  /** Контент таба */
  content: React.ReactNode
  /** Иконка таба */
  icon?: React.ReactNode
  /** Отключен ли таб */
  disabled?: boolean
  /** Значок-уведомление */
  badge?: string | number
}

/**
 * 🎯 Tabs Props Interface
 */
export interface TabsProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof tabsVariants> {
  /** Массив табов */
  tabs: TabItem[]
  /** ID активного таба по умолчанию */
  defaultTab?: string
  /** Контролируемое значение активного таба */
  activeTab?: string
  /** Функция изменения активного таба */
  onTabChange?: (tabId: string) => void
  /** Вариант отображения табов */
  tabVariant?: VariantProps<typeof tabListVariants>['variant']
  /** Кастомные CSS классы */
  className?: string
  /** Кастомные CSS классы для списка табов */
  tabListClassName?: string
  /** Кастомные CSS классы для контента */
  contentClassName?: string
}

/**
 * 🎯 Type Exports
 */
export type TabsVariant = VariantProps<typeof tabsVariants>['variant']
export type TabsSize = VariantProps<typeof tabsVariants>['size']
export type TabVariant = VariantProps<typeof tabListVariants>['variant']