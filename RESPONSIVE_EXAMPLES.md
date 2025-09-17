# Practical Implementation Examples - Modern Responsive Design

## Container Query Implementation Examples

### 1. Profile Card with Container Queries

```tsx
// ProfileCard.tsx
import React from 'react'
import { motion } from 'framer-motion'

const ProfileCard: React.FC = () => {
  return (
    <div className="profile-container">
      <motion.div 
        className="profile-card"
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <div className="profile-content">
          <div className="avatar-section">
            {/* Avatar component */}
          </div>
          <div className="info-section">
            {/* Name, username, stats */}
          </div>
        </div>
      </motion.div>
    </div>
  )
}
```

```css
/* Container queries CSS for ProfileCard */
.profile-container {
  container-type: inline-size;
  width: 100%;
}

.profile-card {
  background: var(--glass-background);
  border: 1px solid var(--glass-border);
  border-radius: clamp(1rem, 2vw, 1.5rem);
  padding: clamp(1rem, 3cqw, 2rem);
  backdrop-filter: var(--backdrop-blur);
}

.profile-content {
  display: flex;
  flex-direction: column;
  gap: clamp(0.75rem, 2cqw, 1.25rem);
}

/* Container breakpoints */
@container (min-width: 400px) {
  .profile-content {
    flex-direction: row;
    align-items: center;
  }
  
  .avatar-section {
    flex-shrink: 0;
  }
  
  .info-section {
    flex: 1;
    margin-left: clamp(1rem, 3cqw, 1.5rem);
  }
}

@container (min-width: 600px) {
  .profile-card {
    padding: clamp(1.5rem, 4cqw, 2.5rem);
  }
  
  .profile-content {
    gap: clamp(1rem, 3cqw, 2rem);
  }
}
```

### 2. XP Progress Bar with Fluid Typography

```tsx
// XPProgressBar.tsx
import React from 'react'
import { motion } from 'framer-motion'

interface XPProgressProps {
  current: number
  target: number
  level: number
}

const XPProgressBar: React.FC<XPProgressProps> = ({ current, target, level }) => {
  const percentage = (current / target) * 100
  
  return (
    <div className="xp-progress-container">
      <div className="xp-header">
        <motion.span 
          className="xp-level-badge"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          Level {level}
        </motion.span>
        <span className="xp-values">
          {current.toLocaleString()} / {target.toLocaleString()} XP
        </span>
      </div>
      
      <div className="xp-bar-track">
        <motion.div 
          className="xp-bar-fill"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
        <div className="xp-bar-glow" />
      </div>
    </div>
  )
}
```

```css
/* Fluid XP Progress styling */
.xp-progress-container {
  container-type: inline-size;
  width: 100%;
  margin: clamp(0.5rem, 2vh, 1rem) 0;
}

.xp-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: clamp(0.5rem, 1cqh, 0.75rem);
}

.xp-level-badge {
  background: var(--gradient-primary);
  color: white;
  padding: clamp(0.25rem, 1cqw, 0.5rem) clamp(0.5rem, 2cqw, 1rem);
  border-radius: clamp(0.5rem, 1.5cqw, 0.75rem);
  font-size: clamp(0.75rem, 2.5cqw, 1rem);
  font-weight: 600;
  cursor: pointer;
  user-select: none;
}

.xp-values {
  font-size: clamp(0.7rem, 2cqw, 0.9rem);
  color: var(--color-text-secondary);
  font-weight: 500;
  font-variant-numeric: tabular-nums;
}

.xp-bar-track {
  position: relative;
  height: clamp(8px, 1.5cqw, 12px);
  background: rgba(255, 255, 255, 0.1);
  border-radius: clamp(4px, 0.75cqw, 6px);
  overflow: hidden;
}

.xp-bar-fill {
  height: 100%;
  background: var(--gradient-xp);
  border-radius: inherit;
  position: relative;
  z-index: 1;
}

.xp-bar-glow {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--gradient-xp);
  filter: blur(clamp(4px, 1cqw, 8px));
  opacity: 0.5;
  z-index: 0;
}

/* Container query responsive adjustments */
@container (min-width: 300px) {
  .xp-header {
    margin-bottom: clamp(0.75rem, 1.5cqh, 1rem);
  }
}

@container (min-width: 500px) {
  .xp-level-badge {
    padding: clamp(0.375rem, 1.2cqw, 0.5rem) clamp(0.75rem, 2.5cqw, 1.25rem);
  }
  
  .xp-bar-track {
    height: clamp(10px, 2cqw, 16px);
  }
}
```

### 3. Adaptive Card Grid System

```tsx
// CardGrid.tsx
import React from 'react'

interface CardGridProps {
  children: React.ReactNode
  variant?: 'stats' | 'achievements' | 'leaderboard'
}

const CardGrid: React.FC<CardGridProps> = ({ children, variant = 'stats' }) => {
  return (
    <div className={`card-grid card-grid--${variant}`}>
      {children}
    </div>
  )
}
```

```css
/* Adaptive grid with container queries */
.card-grid {
  container-type: inline-size;
  display: grid;
  gap: clamp(0.75rem, 2cqw, 1.5rem);
  width: 100%;
}

/* Base mobile layout */
.card-grid {
  grid-template-columns: 1fr;
}

/* Container query breakpoints */
@container (min-width: 400px) {
  .card-grid--stats {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .card-grid--achievements {
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  }
}

@container (min-width: 600px) {
  .card-grid--stats {
    grid-template-columns: repeat(3, 1fr);
  }
  
  .card-grid--leaderboard {
    grid-template-columns: 1fr;
    max-width: 500px;
    margin: 0 auto;
  }
}

@container (min-width: 800px) {
  .card-grid--stats {
    grid-template-columns: repeat(4, 1fr);
  }
  
  .card-grid--achievements {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  }
}
```

## Clamp() Implementation Examples

### 1. Responsive Typography System

```css
/* Design tokens with clamp() */
:root {
  /* Fluid typography scale */
  --text-xs: clamp(0.7rem, 1.5vw, 0.75rem);
  --text-sm: clamp(0.8rem, 2vw, 0.875rem);
  --text-base: clamp(0.9rem, 2.5vw, 1rem);
  --text-lg: clamp(1rem, 3vw, 1.125rem);
  --text-xl: clamp(1.1rem, 3.5vw, 1.25rem);
  --text-2xl: clamp(1.25rem, 4vw, 1.5rem);
  --text-3xl: clamp(1.5rem, 5vw, 1.875rem);
  --text-4xl: clamp(1.75rem, 6vw, 2.25rem);
  --text-5xl: clamp(2rem, 8vw, 3rem);
  
  /* Gaming-specific typography */
  --text-gaming-number: clamp(1.25rem, 4vw, 2rem);
  --text-gaming-level: clamp(0.9rem, 3vw, 1.1rem);
  --text-gaming-xp: clamp(0.8rem, 2.5vw, 1rem);
  
  /* Spacing scale with clamp */
  --space-xs: clamp(0.25rem, 1vw, 0.5rem);
  --space-sm: clamp(0.5rem, 2vw, 0.75rem);
  --space-md: clamp(0.75rem, 3vw, 1rem);
  --space-lg: clamp(1rem, 4vw, 1.5rem);
  --space-xl: clamp(1.5rem, 5vw, 2rem);
  --space-2xl: clamp(2rem, 6vw, 3rem);
}

/* Component implementations */
.hero-title {
  font-size: var(--text-5xl);
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: var(--space-lg);
}

.card-title {
  font-size: var(--text-2xl);
  font-weight: 600;
  margin-bottom: var(--space-sm);
}

.gaming-number {
  font-size: var(--text-gaming-number);
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  color: var(--color-gaming-green);
}
```

### 2. Adaptive Component Sizing

```tsx
// AdaptiveButton.tsx
interface ButtonProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  variant?: 'primary' | 'secondary' | 'gaming'
}

const Button: React.FC<ButtonProps> = ({ size = 'md', variant = 'primary', children }) => {
  return (
    <button className={`btn btn--${variant} btn--${size}`}>
      {children}
    </button>
  )
}
```

```css
/* Adaptive button sizing with clamp */
.btn {
  border: none;
  border-radius: clamp(0.5rem, 2vw, 0.75rem);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: clamp(0.25rem, 1vw, 0.5rem);
}

/* Size variants with clamp */
.btn--sm {
  height: clamp(2rem, 8vw, 2.5rem);
  padding: 0 clamp(0.75rem, 3vw, 1rem);
  font-size: clamp(0.8rem, 2.5vw, 0.875rem);
}

.btn--md {
  height: clamp(2.5rem, 10vw, 3rem);
  padding: 0 clamp(1rem, 4vw, 1.5rem);
  font-size: clamp(0.9rem, 3vw, 1rem);
}

.btn--lg {
  height: clamp(3rem, 12vw, 3.5rem);
  padding: 0 clamp(1.5rem, 5vw, 2rem);
  font-size: clamp(1rem, 3.5vw, 1.125rem);
}

.btn--xl {
  height: clamp(3.5rem, 14vw, 4rem);
  padding: 0 clamp(2rem, 6vw, 2.5rem);
  font-size: clamp(1.1rem, 4vw, 1.25rem);
}

/* Gaming variant with special effects */
.btn--gaming {
  background: var(--gradient-primary);
  color: white;
  box-shadow: 
    0 clamp(2px, 0.5vw, 4px) clamp(8px, 2vw, 12px) rgba(59, 130, 246, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
}

.btn--gaming:hover {
  transform: translateY(clamp(-1px, -0.2vw, -2px));
  box-shadow: 
    0 clamp(4px, 1vw, 8px) clamp(16px, 4vw, 24px) rgba(59, 130, 246, 0.4),
    inset 0 1px 0 rgba(255, 255, 255, 0.15);
}
```

## Telegram Mini Apps Specific Examples

### 1. Safe Area Aware Layout

```tsx
// TelegramLayout.tsx
import React, { useEffect, useState } from 'react'

const TelegramLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [viewportHeight, setViewportHeight] = useState('100vh')
  
  useEffect(() => {
    const updateHeight = () => {
      setViewportHeight(`${window.innerHeight}px`)
    }
    
    window.addEventListener('resize', updateHeight)
    updateHeight()
    
    return () => window.removeEventListener('resize', updateHeight)
  }, [])
  
  return (
    <div 
      className="telegram-app-container"
      style={{ '--viewport-height': viewportHeight } as React.CSSProperties}
    >
      <div className="telegram-safe-area">
        {children}
      </div>
    </div>
  )
}
```

```css
/* Telegram-specific safe area implementation */
.telegram-app-container {
  width: 100vw;
  height: var(--viewport-height, 100vh);
  overflow: hidden;
  overscroll-behavior: none;
  position: relative;
}

.telegram-safe-area {
  height: 100%;
  padding-left: max(
    clamp(0.5rem, 2vw, 1rem), 
    env(safe-area-inset-left)
  );
  padding-right: max(
    clamp(0.5rem, 2vw, 1rem), 
    env(safe-area-inset-right)
  );
  padding-top: max(
    clamp(0.25rem, 1vh, 0.5rem), 
    env(safe-area-inset-top)
  );
  padding-bottom: max(
    clamp(0.5rem, 2vh, 1rem), 
    env(safe-area-inset-bottom)
  );
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}

/* Responsive adjustments for different screen sizes */
@media (min-width: 768px) {
  .telegram-safe-area {
    padding-left: max(
      clamp(1rem, 3vw, 1.5rem), 
      env(safe-area-inset-left)
    );
    padding-right: max(
      clamp(1rem, 3vw, 1.5rem), 
      env(safe-area-inset-right)
    );
  }
}

@media (min-width: 1024px) {
  .telegram-safe-area {
    max-width: 800px;
    margin: 0 auto;
    padding-left: max(
      clamp(1.5rem, 4vw, 2rem), 
      env(safe-area-inset-left)
    );
    padding-right: max(
      clamp(1.5rem, 4vw, 2rem), 
      env(safe-area-inset-right)
    );
  }
}
```

### 2. Haptic-Enhanced Interactive Elements

```tsx
// HapticButton.tsx
import React from 'react'
import { motion } from 'framer-motion'
import { useHaptics } from '../lib/haptics'

interface HapticButtonProps {
  children: React.ReactNode
  hapticType?: 'light' | 'medium' | 'heavy'
  onClick?: () => void
}

const HapticButton: React.FC<HapticButtonProps> = ({ 
  children, 
  hapticType = 'medium',
  onClick
}) => {
  const haptics = useHaptics()
  
  const handlePress = () => {
    haptics.impact(hapticType)
    onClick?.()
  }
  
  return (
    <motion.button
      className="haptic-button"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onTapStart={() => haptics.selection()}
      onClick={handlePress}
      transition={{ type: "spring", stiffness: 400 }}
    >
      {children}
    </motion.button>
  )
}
```

```css
/* Haptic button with responsive design */
.haptic-button {
  padding: clamp(0.75rem, 3vw, 1rem) clamp(1.5rem, 5vw, 2rem);
  border: none;
  border-radius: clamp(0.75rem, 3vw, 1rem);
  background: var(--gradient-primary);
  color: white;
  font-size: clamp(0.9rem, 3vw, 1rem);
  font-weight: 600;
  cursor: pointer;
  outline: none;
  position: relative;
  overflow: hidden;
  
  /* Responsive touch target size */
  min-height: 44px;
  min-width: max(44px, clamp(6rem, 20vw, 10rem));
  
  /* Enhanced visual feedback */
  box-shadow: 
    0 clamp(2px, 0.5vw, 4px) clamp(8px, 2vw, 12px) rgba(59, 130, 246, 0.25),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
}

.haptic-button:active {
  transform: scale(0.98);
  box-shadow: 
    0 clamp(1px, 0.25vw, 2px) clamp(4px, 1vw, 6px) rgba(59, 130, 246, 0.4),
    inset 0 1px 0 rgba(255, 255, 255, 0.05);
}

/* Telegram theme integration */
@media (prefers-color-scheme: light) {
  .haptic-button {
    background: var(--tg-theme-button-color, var(--gradient-primary));
    color: var(--tg-theme-button-text-color, white);
  }
}
```

## Performance Optimization Examples

### 1. Lazy Loading with Intersection Observer

```tsx
// LazyCard.tsx
import React, { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'

interface LazyCardProps {
  children: React.ReactNode
  threshold?: number
}

const LazyCard: React.FC<LazyCardProps> = ({ children, threshold = 0.1 }) => {
  const [isVisible, setIsVisible] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold }
    )
    
    if (cardRef.current) {
      observer.observe(cardRef.current)
    }
    
    return () => observer.disconnect()
  }, [threshold])
  
  return (
    <div ref={cardRef} className="lazy-card-container">
      {isVisible ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="lazy-card"
        >
          {children}
        </motion.div>
      ) : (
        <div className="lazy-card-skeleton" />
      )}
    </div>
  )
}
```

```css
/* Optimized lazy loading styles */
.lazy-card-container {
  container-type: inline-size;
  width: 100%;
  min-height: clamp(120px, 15vh, 200px);
}

.lazy-card {
  background: var(--glass-background);
  border: 1px solid var(--glass-border);
  border-radius: clamp(0.75rem, 2vw, 1rem);
  padding: clamp(1rem, 3cqw, 1.5rem);
  backdrop-filter: var(--backdrop-blur);
  
  /* Optimized for performance */
  will-change: transform, opacity;
  contain: layout style paint;
}

.lazy-card-skeleton {
  height: 100%;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.1) 0%,
    rgba(255, 255, 255, 0.15) 50%,
    rgba(255, 255, 255, 0.1) 100%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: clamp(0.75rem, 2vw, 1rem);
}

@keyframes shimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}

/* Remove will-change when animation is complete */
.lazy-card:not(.animating) {
  will-change: auto;
}
```

### 2. Hardware-Accelerated Animations

```css
/* GPU-accelerated transform animations */
.gpu-optimized {
  /* Use transform instead of changing position properties */
  transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
  perspective: 1000px;
}

.level-up-animation {
  animation: levelUpSequence 2s cubic-bezier(0.4, 0, 0.2, 1);
  will-change: transform, opacity;
}

@keyframes levelUpSequence {
  0% {
    transform: scale(1) rotate(0deg) translate3d(0, 0, 0);
    opacity: 1;
  }
  25% {
    transform: scale(1.2) rotate(-5deg) translate3d(0, -10px, 0);
    opacity: 0.9;
  }
  50% {
    transform: scale(1.1) rotate(5deg) translate3d(0, -15px, 0);
    opacity: 0.95;
  }
  75% {
    transform: scale(1.05) rotate(-2deg) translate3d(0, -5px, 0);
    opacity: 0.98;
  }
  100% {
    transform: scale(1) rotate(0deg) translate3d(0, 0, 0);
    opacity: 1;
  }
}

/* Clean up will-change after animation */
.level-up-animation.animation-complete {
  will-change: auto;
}
```

These examples demonstrate practical implementation of modern responsive design techniques specifically tailored for Telegram Mini Apps, focusing on performance, accessibility, and user experience.