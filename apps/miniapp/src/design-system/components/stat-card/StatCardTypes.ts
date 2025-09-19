import React from 'react'
import { type VariantProps } from 'class-variance-authority'
import { statCardVariants } from './StatCardVariants'

/**
 * 🎯 StatCard Props Interface
 */
export interface StatCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof statCardVariants> {
  /** Основное значение статистики */
  value: string | number
  /** Подпись к статистике */
  label: string
  /** Дополнительное значение */
  subValue?: string
  /** Описание статистики */
  description?: string
  /** Иконка */
  icon?: React.ReactNode
  /** Тренд: направление изменения */
  trend?: 'up' | 'down' | 'neutral'
  /** Значение тренда */
  trendValue?: string
  /** Цвет основного значения */
  valueColor?: string
  /** Фоновый градиент */
  backgroundGradient?: string
  /** Функция при клике */
  onClick?: () => void
  /** Кастомные CSS классы */
  className?: string
  /** Показать анимацию загрузки */
  loading?: boolean
}

/**
 * 🎯 StatCard Group Props Interface
 */
export interface StatCardGroupProps {
  /** Статистические данные */
  stats: Array<Omit<StatCardProps, 'key'> & { id: string }>
  /** Количество колонок */
  columns?: 1 | 2 | 3 | 4
  /** Размер карточек */
  size?: VariantProps<typeof statCardVariants>['size']
  /** Вариант карточек */
  variant?: VariantProps<typeof statCardVariants>['variant']
  /** Кастомные CSS классы */
  className?: string
  /** Показать анимацию загрузки */
  loading?: boolean
}

/**
 * 🎯 Type Exports
 */
export type StatCardVariant = VariantProps<typeof statCardVariants>['variant']
export type StatCardSize = VariantProps<typeof statCardVariants>['size']
export type StatCardAccent = VariantProps<typeof statCardVariants>['accent']
export type StatCardTrend = 'up' | 'down' | 'neutral'