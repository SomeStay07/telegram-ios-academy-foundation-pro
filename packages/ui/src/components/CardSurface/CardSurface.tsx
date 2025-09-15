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
          // Base card styles with elevation
          'bg-card text-card-foreground border border-border rounded-2xl',
          'card-surface-base transition-[transform,box-shadow,background] duration-150',
          
          // Interactive states
          interactive && [
            'cursor-pointer card-surface-interactive',
            
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