import { forwardRef, type SVGAttributes } from 'react'
import { cn } from '../../utils/cn'
import type { ComponentWithSize, ComponentWithColor, BaseProps } from '../../types'

export interface IconProps 
  extends SVGAttributes<SVGSVGElement>,
          ComponentWithSize,
          ComponentWithColor,
          BaseProps {
  spin?: boolean
}

const iconStyles = {
  base: [
    'inline-block',
    'text-[var(--ds-color-fg-default)]'
  ],
  size: {
    xs: 'w-3 h-3',
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
    xl: 'w-8 h-8'
  },
  color: {
    primary: 'text-[var(--ds-color-primary-fg)]',
    secondary: 'text-[var(--ds-color-secondary-fg)]',
    success: 'text-[var(--ds-color-success-fg)]',
    warning: 'text-[var(--ds-color-warning-fg)]',
    danger: 'text-[var(--ds-color-danger-fg)]',
    info: 'text-[var(--ds-color-info-fg)]'
  }
}

export const Icon = forwardRef<SVGSVGElement, IconProps>(
  ({ 
    className,
    size = 'md',
    color,
    spin = false,
    children,
    ...props
  }, ref) => {
    return (
      <svg
        ref={ref}
        className={cn(
          iconStyles.base,
          iconStyles.size[size],
          color && iconStyles.color[color],
          spin && 'animate-spin',
          className
        )}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        {...props}
      >
        {children}
      </svg>
    )
  }
)

Icon.displayName = 'Icon'