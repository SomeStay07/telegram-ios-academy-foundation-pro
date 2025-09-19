import React from 'react'
import { type VariantProps } from 'class-variance-authority'
import { progressVariants } from './ProgressVariants'

/**
 * 🎯 Progress Props Interface
 */
export interface ProgressProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof progressVariants> {
  /** Текущее значение прогресса */
  value: number
  /** Максимальное значение (по умолчанию 100) */
  max?: number
  /** Минимальное значение (по умолчанию 0) */
  min?: number
  /** Лейбл для accessibility */
  label?: string
  /** Показать процент текстом */
  showPercentage?: boolean
  /** Показать значения */
  showValue?: boolean
  /** Анимированный прогресс */
  animated?: boolean
  /** Полосатый паттерн */
  striped?: boolean
  /** Кастомный текст */
  customText?: string
  /** Кастомные CSS классы */
  className?: string
  /** Кастомные CSS классы для полоски */
  barClassName?: string
  /** Кастомные CSS классы для текста */
  textClassName?: string
}

/**
 * 🎯 Type Exports
 */
export type ProgressVariant = VariantProps<typeof progressVariants>['variant']
export type ProgressSize = VariantProps<typeof progressVariants>['size']
export type ProgressShape = VariantProps<typeof progressVariants>['shape']