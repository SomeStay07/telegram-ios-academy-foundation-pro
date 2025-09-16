import { forwardRef, type InputHTMLAttributes } from 'react'
import { cn } from '../../utils/cn'
import type { ComponentWithSize, BaseProps } from '../../types'

export interface InputProps 
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>, 
          ComponentWithSize,
          BaseProps {
  error?: boolean
  errorMessage?: string
  leftAddon?: React.ReactNode
  rightAddon?: React.ReactNode
}

const inputStyles = {
  base: [
    'flex w-full transition-colors duration-200',
    'bg-[var(--ds-component-input-bg)]',
    'text-[var(--ds-component-input-fg)]',
    'border border-[var(--ds-component-input-border)]',
    'placeholder:text-[var(--ds-component-input-placeholder)]',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
    'focus-visible:ring-[var(--ds-component-input-focusRing)]',
    'disabled:cursor-not-allowed disabled:opacity-50'
  ],
  size: {
    xs: 'h-7 px-2 text-xs',
    sm: 'h-8 px-3 text-sm',
    md: 'h-10 px-3 text-sm',
    lg: 'h-11 px-4 text-base',
    xl: 'h-12 px-4 text-base'
  },
  error: [
    'border-[var(--ds-color-danger-border)]',
    'focus-visible:ring-[var(--ds-color-danger-focusRing)]'
  ]
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ 
    className,
    type = 'text',
    size = 'md',
    error = false,
    errorMessage,
    leftAddon,
    rightAddon,
    id,
    ...props
  }, ref) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`
    const errorId = error && errorMessage ? `${inputId}-error` : undefined
    
    const inputElement = (
      <input
        ref={ref}
        id={inputId}
        type={type}
        aria-invalid={error}
        aria-describedby={errorId}
        className={cn(
          inputStyles.base,
          inputStyles.size[size],
          error && inputStyles.error,
          'rounded-[var(--ds-radius-md)]',
          leftAddon && 'rounded-l-none',
          rightAddon && 'rounded-r-none',
          className
        )}
        {...props}
      />
    )

    const inputGroup = (leftAddon || rightAddon) ? (
      <div className={cn('flex items-stretch', className)}>
        {leftAddon && (
          <div className={cn(
            'flex items-center px-3 border border-r-0',
            'bg-[var(--ds-color-bg-muted)]',
            'border-[var(--ds-component-input-border)]',
            'rounded-l-[var(--ds-radius-md)]',
            'text-[var(--ds-color-fg-muted)]',
            error && 'border-[var(--ds-color-danger-border)]'
          )}>
            {leftAddon}
          </div>
        )}
        {inputElement}
        {rightAddon && (
          <div className={cn(
            'flex items-center px-3 border border-l-0',
            'bg-[var(--ds-color-bg-muted)]',
            'border-[var(--ds-component-input-border)]',
            'rounded-r-[var(--ds-radius-md)]',
            'text-[var(--ds-color-fg-muted)]',
            error && 'border-[var(--ds-color-danger-border)]'
          )}>
            {rightAddon}
          </div>
        )}
      </div>
    ) : inputElement

    return (
      <div>
        {inputGroup}
        {error && errorMessage && (
          <div
            id={errorId}
            role="alert"
            aria-live="polite"
            className={cn(
              'mt-1 text-sm',
              'text-[var(--ds-color-danger-fg)]'
            )}
          >
            {errorMessage}
          </div>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'