import { forwardRef, type ButtonHTMLAttributes } from 'react'
import { cn } from '../../utils/cn'
import type { ComponentWithSize, ComponentWithVariant } from '../../types'

export interface ButtonProps 
  extends ButtonHTMLAttributes<HTMLButtonElement>, 
          ComponentWithSize, 
          ComponentWithVariant {
  loading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

const buttonStyles = {
  base: [
    'inline-flex items-center justify-center gap-2',
    'font-medium text-sm transition-colors duration-200',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
    'disabled:pointer-events-none disabled:opacity-50'
  ],
  size: {
    xs: 'h-7 px-2 text-xs',
    sm: 'h-8 px-3 text-sm',
    md: 'h-10 px-4 text-sm',
    lg: 'h-11 px-6 text-base', 
    xl: 'h-12 px-8 text-base'
  },
  variant: {
    primary: [
      'bg-[var(--ds-component-button-primary-bg)]',
      'text-[var(--ds-component-button-primary-fg)]',
      'border border-[var(--ds-component-button-primary-border)]',
      'hover:bg-[var(--ds-component-button-primary-bgHover)]',
      'focus-visible:ring-[var(--ds-component-button-primary-focusRing)]'
    ],
    secondary: [
      'bg-[var(--ds-component-button-secondary-bg)]',
      'text-[var(--ds-component-button-secondary-fg)]',
      'border border-[var(--ds-component-button-secondary-border)]',
      'hover:bg-[var(--ds-component-button-secondary-bgHover)]',
      'focus-visible:ring-[var(--ds-component-button-secondary-focusRing)]'
    ],
    destructive: [
      'bg-[var(--ds-component-button-destructive-bg)]',
      'text-[var(--ds-component-button-destructive-fg)]',
      'border border-[var(--ds-component-button-destructive-border)]',
      'hover:bg-[var(--ds-component-button-destructive-bgHover)]',
      'focus-visible:ring-[var(--ds-component-button-destructive-focusRing)]'
    ],
    outline: [
      'bg-transparent',
      'text-[var(--ds-color-fg-default)]',
      'border border-[var(--ds-color-border-default)]',
      'hover:bg-[var(--ds-color-bg-subtle)]',
      'focus-visible:ring-[var(--ds-color-focus-ring)]'
    ],
    ghost: [
      'bg-transparent',
      'text-[var(--ds-color-fg-default)]',
      'border-transparent',
      'hover:bg-[var(--ds-color-bg-subtle)]',
      'focus-visible:ring-[var(--ds-color-focus-ring)]'
    ]
  }
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className,
    variant = 'primary',
    size = 'md',
    loading = false,
    disabled,
    leftIcon,
    rightIcon,
    children,
    ...props
  }, ref) => {
    const isDisabled = disabled || loading

    return (
      <button
        ref={ref}
        className={cn(
          buttonStyles.base,
          buttonStyles.size[size],
          buttonStyles.variant[variant],
          'rounded-[var(--ds-radius-md)]',
          className
        )}
        disabled={isDisabled}
        {...props}
      >
        {loading && (
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        )}
        {!loading && leftIcon && leftIcon}
        {children}
        {!loading && rightIcon && rightIcon}
      </button>
    )
  }
)

Button.displayName = 'Button'