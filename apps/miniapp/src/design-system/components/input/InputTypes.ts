import React from 'react'
import { type VariantProps } from 'class-variance-authority'
import { inputVariants } from './InputVariants'

/**
 * 🎯 Input Props Interface
 */
export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  /** Лейбл инпута */
  label?: string
  /** Текст помощи под инпутом */
  helperText?: string
  /** Текст ошибки */
  errorText?: string
  /** Иконка слева */
  leftIcon?: React.ReactNode
  /** Иконка справа */
  rightIcon?: React.ReactNode
  /** Обязательное поле */
  required?: boolean
  /** Растянуть на всю ширину */
  fullWidth?: boolean
  /** Кастомные CSS классы */
  className?: string
  /** Кастомные CSS классы для контейнера */
  containerClassName?: string
  /** Кастомные CSS классы для лейбла */
  labelClassName?: string
}

// Экспорт типов для использования в других компонентах
export type InputVariant = VariantProps<typeof inputVariants>['variant']
export type InputSize = VariantProps<typeof inputVariants>['size']