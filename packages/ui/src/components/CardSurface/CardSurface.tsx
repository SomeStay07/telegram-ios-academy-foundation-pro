import { forwardRef, type HTMLAttributes } from 'react'
import { cn } from '../../utils/cn'

export interface CardSurfaceProps extends HTMLAttributes<HTMLDivElement> {
  interactive?: boolean
  as?: 'div' | 'button' | 'a'
  disabled?: boolean
}

export const CardSurface = forwardRef<HTMLDivElement, CardSurfaceProps>(
  ({ className, interactive, as = 'div', disabled, children, ...props }, ref) => {
    const Component = as as any
    
    return (
      <Component
        ref={ref}
        role={interactive ? 'button' : undefined}
        tabIndex={interactive && !disabled ? 0 : undefined}
        aria-disabled={disabled}
        className={cn(
          // Base card styles
          'bg-card text-card-foreground border border-border rounded-2xl',
          'shadow-[var(--elev-1)] transition-[transform,box-shadow,background] duration-150',
          
          // Interactive states
          interactive && [
            'cursor-pointer',
            
            // Hover state (desktop only)
            '@media(hover:hover) { &:hover { box-shadow: var(--elev-2) } }',
            'hover:shadow-[var(--elev-2)]',
            
            // Press state (all devices)
            'active:translate-y-[1px] active:shadow-[var(--elev-2)]',
            
            // Focus state
            'focus-visible:outline-none focus-visible:shadow-[var(--elev-2),var(--ring)]',
            
            // Disabled state
            disabled && 'opacity-50 cursor-not-allowed pointer-events-none',
          ],
          
          // Reduce motion support
          'motion-reduce:transition-none',
          
          className
        )}
        {...props}
      >
        {children}
      </Component>
    )
  }
)

CardSurface.displayName = 'CardSurface'