import React, { useState, useEffect } from 'react'

interface AnimatedCounterProps {
  target: number
  duration?: number
  className?: string
}

export function AnimatedCounter({ target, duration = 1000, className }: AnimatedCounterProps) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const startTime = Date.now()
    const startValue = 0

    const animate = () => {
      const now = Date.now()
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      
      // Easing function for smooth animation
      const easeOutCubic = 1 - Math.pow(1 - progress, 3)
      const currentValue = Math.round(startValue + (target - startValue) * easeOutCubic)
      
      setCount(currentValue)
      
      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    const timer = setTimeout(animate, 100)
    return () => clearTimeout(timer)
  }, [target, duration])

  return <span className={className}>{count}</span>
}