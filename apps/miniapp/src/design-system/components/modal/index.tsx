import React from 'react'
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react'
import { cn } from '../../../lib/utils'
import { Button } from '../Button'
import { ModalProps, ConfirmationModalProps } from './ModalTypes'
import { 
  modalSizeClasses,
  overlayTransition,
  panelTransition,
  basePanelClasses,
  overlayClasses,
  containerClasses,
  centeringClasses
} from './ModalVariants'
import { 
  createCloseHandler,
  CloseIcon,
  shouldShowHeader,
  shouldShowCloseButton
} from './ModalLogic'

/**
 * 🎨 Modal Component - Современный модальный компонент
 * 
 * Основан на Headless UI с полной поддержкой accessibility, анимаций и управления фокусом.
 * Следует принципам "СПОКОЙНАЯ ЭЛЕГАНТНОСТЬ" с тонкими анимациями.
 * 
 * @example
 * // Базовое использование
 * <Modal isOpen={isOpen} onClose={setIsOpen} title="Заголовок">
 *   <p>Контент модала</p>
 * </Modal>
 * 
 * // С кнопками в footer
 * <Modal 
 *   isOpen={isOpen} 
 *   onClose={setIsOpen}
 *   title="Подтверждение"
 *   footer={
 *     <div className="flex gap-3">
 *       <Button variant="secondary" onClick={onClose}>Отмена</Button>
 *       <Button variant="danger" onClick={onConfirm}>Удалить</Button>
 *     </div>
 *   }
 * >
 *   <p>Вы уверены, что хотите удалить этот элемент?</p>
 * </Modal>
 */
export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  size = 'md',
  closable = true,
  footer,
  className,
  panelClassName
}) => {
  const handleClose = createCloseHandler(closable, onClose)
  const showHeader = shouldShowHeader(title, description)
  const showCloseButton = shouldShowCloseButton(closable, title)

  return (
    <Transition show={isOpen} as={React.Fragment}>
      <Dialog 
        as="div" 
        className="relative z-50" 
        onClose={handleClose}
      >
        {/* Фоновый overlay с анимацией */}
        <TransitionChild
          as={React.Fragment}
          enter={overlayTransition.enter}
          enterFrom={overlayTransition.enterFrom}
          enterTo={overlayTransition.enterTo}
          leave={overlayTransition.leave}
          leaveFrom={overlayTransition.leaveFrom}
          leaveTo={overlayTransition.leaveTo}
        >
          <div className={overlayClasses} />
        </TransitionChild>

        {/* Контейнер модала */}
        <div className={containerClasses}>
          <div className={centeringClasses}>
            <TransitionChild
              as={React.Fragment}
              enter={panelTransition.enter}
              enterFrom={panelTransition.enterFrom}
              enterTo={panelTransition.enterTo}
              leave={panelTransition.leave}
              leaveFrom={panelTransition.leaveFrom}
              leaveTo={panelTransition.leaveTo}
            >
              <DialogPanel
                className={cn(
                  basePanelClasses,
                  modalSizeClasses[size],
                  panelClassName
                )}
              >
                {/* Header */}
                {showHeader && (
                  <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800">
                    {title && (
                      <DialogTitle
                        as="h3"
                        className="text-lg font-semibold leading-6 text-gray-900 dark:text-gray-100"
                      >
                        {title}
                      </DialogTitle>
                    )}
                    {description && (
                      <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                        {description}
                      </p>
                    )}
                  </div>
                )}

                {/* Content */}
                <div 
                  className={cn(
                    "px-6 py-4",
                    className
                  )}
                >
                  {children}
                </div>

                {/* Footer */}
                {footer && (
                  <div className="px-6 py-4 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 rounded-b-2xl">
                    <div className="flex justify-end">
                      {footer}
                    </div>
                  </div>
                )}

                {/* Кнопка закрытия (если нет заголовка, но модал можно закрыть) */}
                {showCloseButton && (
                  <div className="absolute top-4 right-4">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={onClose}
                      className="h-8 w-8"
                    >
                      <CloseIcon />
                    </Button>
                  </div>
                )}
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

/**
 * 🎯 Confirmation Modal - Специализированный модал для подтверждений
 */
export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = 'Подтвердить',
  cancelText = 'Отмена',
  variant = 'danger',
  loading = false
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size="sm"
      footer={
        <div className="flex gap-3">
          <Button 
            variant="secondary" 
            onClick={onClose}
            disabled={loading}
          >
            {cancelText}
          </Button>
          <Button 
            variant={variant}
            onClick={onConfirm}
            loading={loading}
          >
            {confirmText}
          </Button>
        </div>
      }
    >
      <p className="text-gray-600 dark:text-gray-400">
        {description}
      </p>
    </Modal>
  )
}

// Re-export types
export type { ModalProps, ConfirmationModalProps } from './ModalTypes'