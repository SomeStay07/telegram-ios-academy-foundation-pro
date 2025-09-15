import React, { forwardRef } from 'react'
import { cn } from '../../utils/cn'
import type { HTMLProps } from 'react'

export interface InteractiveCardProps extends HTMLProps<HTMLDivElement> {
  /** Card variant with different hover effects */
  variant?: 'lift' | 'glow' | 'spotlight'
  /** Enable/disable hover effects */
  interactive?: boolean
  /** Additional custom className */
  className?: string
  /** Children content */
  children: React.ReactNode
  /** Click handler for interactive behavior */
  onClick?: () => void
}

export const InteractiveCard = forwardRef<HTMLDivElement, InteractiveCardProps>(({
  variant = 'lift',
  interactive = true,
  className,
  children,
  onClick,
  ...props
}, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        // Base card styles
        'relative rounded-lg overflow-hidden',
        'transition-all duration-200 ease-out',
        'bg-card border border-border',
        
        // Interactive states
        interactive && [
          'cursor-pointer',
          'interactive-card-base',
          `interactive-card-${variant}`,
          
          // Focus states
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
          
          // Active states
          'active:scale-[0.98]',
        ],
        
        className
      )}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick && interactive ? 0 : undefined}
      onClick={onClick}
      onKeyDown={(e) => {
        if (onClick && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault()
          onClick()
        }
      }}
      {...props}
    >
      {/* Gradient outline overlay */}
      {interactive && (
        <div 
          className="interactive-card-outline"
          aria-hidden="true"
        />
      )}
      
      {/* Spotlight effect overlay */}
      {interactive && variant === 'spotlight' && (
        <div 
          className="interactive-card-spotlight"
          aria-hidden="true"
        />
      )}
      
      {/* Content wrapper */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
})

InteractiveCard.displayName = 'InteractiveCard'