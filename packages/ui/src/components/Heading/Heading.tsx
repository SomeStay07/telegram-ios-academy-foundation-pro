import { forwardRef, type HTMLAttributes } from 'react'
import { cn } from '../../utils/cn'
import type { ComponentWithColor, BaseProps } from '../../types'

export interface HeadingProps 
  extends Omit<HTMLAttributes<HTMLHeadingElement>, 'color'> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  level?: 1 | 2 | 3 | 4 | 5 | 6
  weight?: 'normal' | 'medium' | 'semibold' | 'bold'
  align?: 'left' | 'center' | 'right'
  truncate?: boolean
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info'
}

const headingStyles = {
  base: [
    'text-[var(--ds-color-fg-default)]',
    'font-semibold'
  ],
  level: {
    1: 'text-4xl leading-10 tracking-tight lg:text-5xl lg:leading-12',
    2: 'text-3xl leading-9 tracking-tight lg:text-4xl lg:leading-10',
    3: 'text-2xl leading-8 tracking-tight lg:text-3xl lg:leading-9',
    4: 'text-xl leading-7 tracking-tight lg:text-2xl lg:leading-8',
    5: 'text-lg leading-6 tracking-tight lg:text-xl lg:leading-7',
    6: 'text-base leading-6 tracking-tight lg:text-lg lg:leading-6'
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
    right: 'text-right'
  }
}

export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ 
    className,
    as,
    level = 1,
    weight = 'semibold',
    color,
    align = 'left',
    truncate = false,
    children,
    ...props
  }, ref) => {
    const Component = as || (`h${level}` as keyof JSX.IntrinsicElements)

    return (
      <Component
        ref={ref as any}
        className={cn(
          headingStyles.base,
          headingStyles.level[level],
          headingStyles.weight[weight],
          color && headingStyles.color[color],
          headingStyles.align[align],
          truncate && 'truncate',
          className
        )}
        {...props}
      >
        {children}
      </Component>
    )
  }
)

Heading.displayName = 'Heading'