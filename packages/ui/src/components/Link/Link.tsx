import { forwardRef, type AnchorHTMLAttributes } from 'react'
import { cn } from '../../utils/cn'
import type { ComponentWithSize, ComponentWithColor, BaseProps } from '../../types'

export interface LinkProps 
  extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'color'>,
          ComponentWithSize,
          ComponentWithColor,
          BaseProps {
  variant?: 'default' | 'subtle' | 'button'
  underline?: boolean | 'hover' | 'always'
  external?: boolean
}

const linkStyles = {
  base: [
    'inline-flex items-center gap-1',
    'transition-colors duration-200',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
    'focus-visible:ring-[var(--ds-color-focus-ring)]'
  ],
  variant: {
    default: [
      'text-[var(--ds-color-primary-fg)]',
      'hover:text-[var(--ds-color-primary-fgHover)]'
    ],
    subtle: [
      'text-[var(--ds-color-fg-muted)]',
      'hover:text-[var(--ds-color-fg-default)]'
    ],
    button: [
      'text-[var(--ds-color-fg-default)]',
      'hover:text-[var(--ds-color-primary-fg)]'
    ]
  },
  size: {
    xs: 'text-xs',
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl'
  },
  color: {
    primary: 'text-[var(--ds-color-primary-fg)] hover:text-[var(--ds-color-primary-fgHover)]',
    secondary: 'text-[var(--ds-color-secondary-fg)] hover:text-[var(--ds-color-secondary-fgHover)]',
    success: 'text-[var(--ds-color-success-fg)] hover:text-[var(--ds-color-success-fgHover)]',
    warning: 'text-[var(--ds-color-warning-fg)] hover:text-[var(--ds-color-warning-fgHover)]',
    danger: 'text-[var(--ds-color-danger-fg)] hover:text-[var(--ds-color-danger-fgHover)]',
    info: 'text-[var(--ds-color-info-fg)] hover:text-[var(--ds-color-info-fgHover)]'
  },
  underline: {
    true: 'underline',
    hover: 'hover:underline',
    always: 'underline'
  }
}

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ 
    className,
    variant = 'default',
    size = 'md',
    color,
    underline = 'hover',
    external = false,
    children,
    target,
    rel,
    ...props
  }, ref) => {
    const isExternal = external || target === '_blank'
    
    return (
      <a
        ref={ref}
        className={cn(
          linkStyles.base,
          linkStyles.variant[variant],
          linkStyles.size[size],
          color && linkStyles.color[color as keyof typeof linkStyles.color],
          underline && linkStyles.underline[underline === true ? 'always' : underline],
          className
        )}
        target={isExternal ? '_blank' : target}
        rel={isExternal ? 'noopener noreferrer' : rel}
        {...props}
      >
        {children}
        {isExternal && (
          <svg
            className="w-3 h-3 ml-0.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
            role="img"
            aria-label="Внешняя ссылка"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
        )}
      </a>
    )
  }
)

Link.displayName = 'Link'