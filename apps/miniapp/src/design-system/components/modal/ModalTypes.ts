import React from 'react'

/**
 * 🎭 Modal Props Interface
 */
export interface ModalProps {
  /** Открыт ли модал */
  isOpen: boolean
  /** Функция закрытия модала */
  onClose: () => void
  /** Заголовок модала */
  title?: string
  /** Описание модала */
  description?: string
  /** Контент модала */
  children: React.ReactNode
  /** Размер модала */
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  /** Можно ли закрыть модал кликом вне его */
  closable?: boolean
  /** Кнопки в footer модала */
  footer?: React.ReactNode
  /** Кастомные CSS классы */
  className?: string
  /** Кастомные CSS классы для панели */
  panelClassName?: string
}

/**
 * 🎯 Confirmation Modal - Специализированный модал для подтверждений
 */
export interface ConfirmationModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  description: string
  confirmText?: string
  cancelText?: string
  variant?: 'danger' | 'warning' | 'info'
  loading?: boolean
}