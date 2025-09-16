import { forwardRef, type HTMLAttributes } from 'react'
import { cn } from '../../utils/cn'
import type { BaseProps } from '../../types'

export interface CardProps 
  extends HTMLAttributes<HTMLDivElement>,
          BaseProps {
  variant?: 'default' | 'outlined' | 'elevated'
  padding?: 'none' | 'sm' | 'md' | 'lg'
}

const cardStyles = {
  base: [
    'bg-[var(--ds-component-card-bg)]',
    'border-[var(--ds-component-card-border)]',
    'text-[var(--ds-color-fg-default)]'
  ],
  variant: {
    default: 'border',
    outlined: 'border-2',
    elevated: [
      'border',
      'shadow-[var(--ds-component-card-shadow)]'
    ]
  },
  padding: {
    none: 'p-0',
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6'
  }
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ 
    className,
    variant = 'default',
    padding = 'md',
    children,
    ...props
  }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          cardStyles.base,
          cardStyles.variant[variant],
          cardStyles.padding[padding],
          'rounded-[var(--ds-radius-lg)]',
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)

Card.displayName = 'Card'