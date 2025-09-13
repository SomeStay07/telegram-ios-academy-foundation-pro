import React, { forwardRef, type HTMLAttributes } from 'react'
import { cn } from '../../utils/cn'
import type { ComponentWithSpacing, BaseProps } from '../../types'

export interface StackProps 
  extends HTMLAttributes<HTMLDivElement>,
          ComponentWithSpacing,
          BaseProps {
  direction?: 'row' | 'column'
  align?: 'start' | 'center' | 'end' | 'stretch'
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'
  wrap?: boolean
  divider?: React.ReactNode
}

const stackStyles = {
  base: [
    'flex'
  ],
  direction: {
    row: 'flex-row',
    column: 'flex-col'
  },
  align: {
    start: 'items-start',
    center: 'items-center',
    end: 'items-end',
    stretch: 'items-stretch'
  },
  justify: {
    start: 'justify-start',
    center: 'justify-center',
    end: 'justify-end',
    between: 'justify-between',
    around: 'justify-around',
    evenly: 'justify-evenly'
  },
  spacing: {
    none: 'gap-0',
    xs: 'gap-1',
    sm: 'gap-2',
    md: 'gap-4',
    lg: 'gap-6',
    xl: 'gap-8',
    '2xl': 'gap-12',
    '3xl': 'gap-16'
  }
}

export const Stack = forwardRef<HTMLDivElement, StackProps>(
  ({ 
    className,
    direction = 'column',
    align = 'stretch',
    justify = 'start',
    spacing = 'md',
    wrap = false,
    divider,
    children,
    ...props
  }, ref) => {
    const childrenArray = React.Children.toArray(children)
    
    return (
      <div
        ref={ref}
        className={cn(
          stackStyles.base,
          stackStyles.direction[direction],
          stackStyles.align[align],
          stackStyles.justify[justify],
          spacing && stackStyles.spacing[spacing],
          wrap && 'flex-wrap',
          className
        )}
        {...props}
      >
        {divider
          ? childrenArray.map((child, index) => (
              <React.Fragment key={index}>
                {child}
                {index < childrenArray.length - 1 && divider}
              </React.Fragment>
            ))
          : children
        }
      </div>
    )
  }
)

Stack.displayName = 'Stack'