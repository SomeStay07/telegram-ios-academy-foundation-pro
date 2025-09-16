'use client'

import React from 'react'
import { cn } from '../utils/cn'

export interface ProgressProps {
  value: number
  max?: number
  label?: string
  className?: string
  showValue?: boolean
}

export const Progress: React.FC<ProgressProps> = ({ 
  value, 
  max = 100, 
  label, 
  className,
  showValue = false 
}) => {
  const pct = Math.max(0, Math.min(100, Math.round((value / max) * 100)))
  
  // Respect reduced motion preference
  const prefersReducedMotion = typeof window !== 'undefined' && 
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  return (
    <div className={cn('space-y-2', className)}>
      {(label || showValue) && (
        <div className="flex items-center justify-between text-sm">
          {label && (
            <span className="font-medium text-foreground truncate min-w-0">
              {label}
            </span>
          )}
          {showValue && (
            <span className="text-muted-foreground font-medium">
              {pct}%
            </span>
          )}
        </div>
      )}
      <div 
        className="relative overflow-hidden rounded-full bg-muted border border-border h-2.5"
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label || `Progress ${pct}%`}
      >
        <div
          className="h-full rounded-full will-change-transform"
          style={{
            width: `${pct}%`,
            backgroundImage: 'var(--accent-gradient)',
            transition: prefersReducedMotion 
              ? 'width 160ms linear' 
              : 'width 320ms cubic-bezier(.2,.8,.2,1)'
          }}
        />
      </div>
    </div>
  )
}