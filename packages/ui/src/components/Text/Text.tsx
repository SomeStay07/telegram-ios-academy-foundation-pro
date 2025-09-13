import { forwardRef, type HTMLAttributes } from 'react'
import { cn } from '../../utils/cn'
import type { ComponentWithSize } from '../../types'

export interface TextProps 
  extends Omit<HTMLAttributes<HTMLSpanElement>, 'color' | 'className'> {
  className?: string
  size?: ComponentWithSize['size']
  as?: 'span' | 'p' | 'div' | 'label'
  weight?: 'normal' | 'medium' | 'semibold' | 'bold'
  align?: 'left' | 'center' | 'right' | 'justify'
  truncate?: boolean
  italic?: boolean
  underline?: boolean
  strikethrough?: boolean
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info'
}

const textStyles = {
  base: [
    'text-[var(--ds-color-fg-default)]'
  ],
  size: {
    xs: 'text-xs leading-4',
    sm: 'text-sm leading-5',
    md: 'text-base leading-6',
    lg: 'text-lg leading-7',
    xl: 'text-xl leading-8'
  },
  weight: {
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold'
  },
  color: {
    primary: 'text-[var(--ds-color-primary-fg)]',
    secondary: 'text-[var(--ds-color-secondary-fg)]',
    success: 'text-[var(--ds-color-success-fg)]',
    warning: 'text-[var(--ds-color-warning-fg)]',
    danger: 'text-[var(--ds-color-danger-fg)]',
    info: 'text-[var(--ds-color-info-fg)]'
  },
  align: {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
    justify: 'text-justify'
  }
}

export const Text = forwardRef<HTMLElement, TextProps>(
  ({ 
    className,
    as: Component = 'span',
    size = 'md',
    weight = 'normal',
    color,
    align = 'left',
    truncate = false,
    italic = false,
    underline = false,
    strikethrough = false,
    children,
    ...props
  }, ref) => {
    return (
      <Component
        ref={ref as any}
        className={cn(
          textStyles.base,
          textStyles.size[size],
          textStyles.weight[weight],
          color && textStyles.color[color],
          textStyles.align[align],
          truncate && 'truncate',
          italic && 'italic',
          underline && 'underline',
          strikethrough && 'line-through',
          className
        )}
        {...props}
      >
        {children}
      </Component>
    )
  }
)

Text.displayName = 'Text'