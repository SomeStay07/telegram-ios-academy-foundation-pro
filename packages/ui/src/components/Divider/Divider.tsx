import { forwardRef, type HTMLAttributes } from 'react'
import { cn } from '../../utils/cn'
import type { BaseProps } from '../../types'

export interface DividerProps 
  extends HTMLAttributes<HTMLDivElement>,
          BaseProps {
  orientation?: 'horizontal' | 'vertical'
  decorative?: boolean
  label?: string
}

const dividerStyles = {
  base: [
    'border-[var(--ds-color-border-default)]'
  ],
  orientation: {
    horizontal: [
      'w-full h-px border-t'
    ],
    vertical: [
      'h-full w-px border-l'
    ]
  }
}

export const Divider = forwardRef<HTMLDivElement, DividerProps>(
  ({ 
    className,
    orientation = 'horizontal',
    decorative = true,
    label,
    ...props
  }, ref) => {
    if (label) {
      return (
        <div 
          ref={ref}
          className={cn('relative', className)}
          role={decorative ? 'presentation' : 'separator'}
          aria-orientation={orientation}
          {...props}
        >
          <div className={cn(dividerStyles.base, dividerStyles.orientation[orientation])} />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="bg-[var(--ds-color-bg-default)] px-2 text-sm text-[var(--ds-color-fg-muted)]">
              {label}
            </span>
          </div>
        </div>
      )
    }

    return (
      <div
        ref={ref}
        className={cn(
          dividerStyles.base,
          dividerStyles.orientation[orientation],
          className
        )}
        role={decorative ? 'presentation' : 'separator'}
        aria-orientation={orientation}
        {...props}
      />
    )
  }
)

Divider.displayName = 'Divider'