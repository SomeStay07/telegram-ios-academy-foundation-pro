import React, { useEffect, useRef } from 'react'

export interface ModalProps {
  open: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
  closeOnEscape?: boolean
  closeOnBackdropClick?: boolean
  'aria-describedby'?: string
}

export const Modal: React.FC<ModalProps> = ({
  open,
  onClose,
  title,
  children,
  closeOnEscape = true,
  closeOnBackdropClick = true,
  'aria-describedby': ariaDescribedBy
}) => {
  const modalRef = useRef<HTMLDivElement>(null)
  const lastActiveElement = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (open) {
      // Store the currently focused element
      lastActiveElement.current = document.activeElement as HTMLElement
      
      // Focus the modal
      modalRef.current?.focus()
      
      // Trap focus within modal
      const handleTabKey = (e: KeyboardEvent) => {
        if (e.key !== 'Tab') return
        
        const focusableElements = modalRef.current?.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
        
        if (!focusableElements || focusableElements.length === 0) return
        
        const firstElement = focusableElements[0] as HTMLElement
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement
        
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus()
            e.preventDefault()
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus()
            e.preventDefault()
          }
        }
      }
      
      const handleEscapeKey = (e: KeyboardEvent) => {
        if (e.key === 'Escape' && closeOnEscape) {
          onClose()
        }
      }
      
      document.addEventListener('keydown', handleTabKey)
      document.addEventListener('keydown', handleEscapeKey)
      
      // Prevent scrolling on body
      document.body.style.overflow = 'hidden'
      
      return () => {
        document.removeEventListener('keydown', handleTabKey)
        document.removeEventListener('keydown', handleEscapeKey)
        document.body.style.overflow = ''
        
        // Restore focus to the previously focused element
        if (lastActiveElement.current) {
          lastActiveElement.current.focus()
        }
      }
    }
  }, [open, onClose, closeOnEscape])

  if (!open) return null

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && closeOnBackdropClick) {
      onClose()
    }
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? 'modal-title' : undefined}
      aria-describedby={ariaDescribedBy}
      aria-label={!title ? 'Диалоговое окно' : undefined}
      ref={modalRef}
      tabIndex={-1}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0, 0, 0, 0.4)',
        display: 'grid',
        placeItems: 'center',
        padding: 16,
        zIndex: 1000
      }}
      onClick={handleBackdropClick}
    >
      <section
        style={{
          background: 'var(--color-bg)',
          color: 'var(--color-fg)',
          borderRadius: 12,
          boxShadow: 'var(--shadow)',
          width: 'min(560px, 92vw)',
          padding: 24,
          maxHeight: '90vh',
          overflow: 'auto'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {title && (
          <h3 id="modal-title" style={{ marginTop: 0 }}>
            {title}
          </h3>
        )}
        <div>{children}</div>
      </section>
    </div>
  )
}