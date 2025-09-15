'use client'

import React, { useEffect, useState } from 'react'
import { cn } from '../../utils/cn'

export interface ProgressRingProps {
  value: number // 0-100
  size?: number
  stroke?: number
  className?: string
  showLabel?: boolean
  label?: string
  children?: React.ReactNode
}

export function ProgressRing({
  value,
  size = 88,
  stroke = 10,
  className,
  showLabel = true,
  label,
  children,
  ...props
}: ProgressRingProps) {
  const [animatedValue, setAnimatedValue] = useState(0)
  
  // Respect reduced motion
  const prefersReducedMotion = typeof window !== 'undefined' && 
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  // Animate the progress value
  useEffect(() => {
    if (prefersReducedMotion) {
      setAnimatedValue(value)
      return
    }

    const timer = setTimeout(() => {
      setAnimatedValue(value)
    }, 100)

    return () => clearTimeout(timer)
  }, [value, prefersReducedMotion])

  const pct = Math.max(0, Math.min(100, animatedValue))
  const deg = (pct / 100) * 360

  return (
    <div
      className={cn('relative grid place-items-center', className)}
      style={{ width: size, height: size }}
      aria-label={`Progress ${Math.round(value)}%`}
      role="progressbar"
      aria-valuenow={Math.round(value)}
      aria-valuemin={0}
      aria-valuemax={100}
      {...props}
    >
      {/* Outer ring with conic gradient */}
      <div
        className="rounded-full transition-all duration-1000 ease-out"
        style={{
          width: size,
          height: size,
          backgroundImage: `conic-gradient(from -90deg, var(--accent-2) ${deg}deg, transparent ${deg}deg)`,
          transition: prefersReducedMotion 
            ? 'none' 
            : 'background-image 800ms cubic-bezier(.2,.8,.2,1)'
        }}
      />
      
      {/* Inner hole */}
      <div
        className="absolute rounded-full bg-card border border-border"
        style={{ inset: stroke }}
      />
      
      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {children || (showLabel && (
          <>
            <span className="text-sm font-medium text-foreground">
              {Math.round(value)}%
            </span>
            {label && (
              <span className="text-xs text-muted-foreground font-medium leading-tight text-center mt-0.5">
                {label}
              </span>
            )}
          </>
        ))}
      </div>
    </div>
  )
}

ProgressRing.displayName = 'ProgressRing'