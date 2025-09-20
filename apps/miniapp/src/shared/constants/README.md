# Design Tokens Usage Guide

## 📋 Overview

This document describes how to use the centralized design tokens in `/shared/constants/design-tokens.ts` to eliminate magic numbers and ensure consistency across the application.

## 🎯 Z-Index System

### Hierarchy
```
SYSTEM_MODAL     500   ← System modals (theme, critical alerts)
TOAST           400   ← Toast notifications  
TOOLTIP         450   ← Tooltips (always on top)
MODAL_CONTENT   350   ← Modal content
MODAL_BACKDROP  300   ← Modal backdrops
OVERLAY_MID     250   ← Temporary overlays
OVERLAY_LOW     200   ← Achievement notifications
FLOATING_UI     150   ← Floating buttons, badges
NAVIGATION      100   ← Tab bars, navigation
CONTENT_STICKY   30   ← Sticky headers within content
CONTENT_OVERLAY  20   ← Dropdowns, tooltips relative to content
CONTENT         10   ← General content
BASE             0   ← Base layer
BEHIND          -1   ← Behind elements
```

### Usage Examples
```tsx
// ❌ Before (Magic numbers)
className="fixed inset-0 z-[9999]"
className="absolute z-50"

// ✅ After (Semantic constants)
import { Z_INDEX } from '../../shared/constants/design-tokens'

className={`fixed inset-0 z-[${Z_INDEX.SYSTEM_MODAL}]`}
className={`absolute z-[${Z_INDEX.FLOATING_UI}]`}
```

## ⚡ Animation System

### Duration Constants
```tsx
// ❌ Before
transition={{ duration: 0.2 }}
transition={{ duration: 300 }}

// ✅ After  
import { ANIMATION } from '../../shared/constants/design-tokens'

transition={{ duration: ANIMATION.DURATION.NORMAL / 1000 }} // 200ms
transition={{ duration: ANIMATION.DURATION.SLOW / 1000 }}   // 300ms
```

### Spring Animations
```tsx
// ❌ Before
transition={{ type: "spring", stiffness: 300, damping: 25 }}

// ✅ After
transition={{ type: "spring", ...ANIMATION.SPRING.GENTLE }}
```

### Easing Functions
```tsx
// ❌ Before
transition={{ ease: [0.4, 0, 0.2, 1] }}

// ✅ After
transition={{ ease: ANIMATION.EASING.TELEGRAM }}
```

### Staggered Animations
```tsx
// ❌ Before
transition={{ delay: 0.1 * index }}

// ✅ After
transition={{ delay: getAnimationDelay(index, 'ITEMS') }}
```

## 📐 Size System

### Modal Sizes
```tsx
// ❌ Before
className="max-w-md w-full mx-4 max-h-[90vh]"

// ✅ After
import { SIZE } from '../../shared/constants/design-tokens'

className={`${SIZE.MODAL.MAX_WIDTH} w-full ${SIZE.MODAL.PADDING.MOBILE} ${SIZE.MODAL.PADDING.DESKTOP} ${SIZE.MODAL.MAX_HEIGHT}`}
```

### Icon Sizes
```tsx
// ❌ Before
className="w-5 h-5"

// ✅ After
className={SIZE.ICON.MD}
```

## 🎨 Color System

### Design Colors
```tsx
// ❌ Before
const progressColor = progress >= 70 ? '#10b981' : progress >= 40 ? '#f59e0b' : '#6366f1'

// ✅ After
import { getProgressColor } from '../../shared/constants/design-tokens'

const progressColor = getProgressColor(progress)
```

### Achievement Colors
```tsx
// ❌ Before
background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)'

// ✅ After
import { COLORS } from '../../shared/constants/design-tokens'

background: COLORS.ACHIEVEMENT.UNLOCKED.background
```

## 🚀 Best Practices

### 1. Always Import Required Constants
```tsx
import { Z_INDEX, ANIMATION, SIZE, COLORS } from '../../shared/constants/design-tokens'
```

### 2. Use Semantic Names
```tsx
// ❌ Bad
z-[9999]

// ✅ Good
z-[${Z_INDEX.SYSTEM_MODAL}]
```

### 3. Prefer Utility Functions
```tsx
// ❌ Manual calculation
const delay = index * 0.05

// ✅ Utility function
const delay = getAnimationDelay(index, 'ITEMS')
```

### 4. Document Custom Values
```tsx
// If you must use a custom value, document why
const CUSTOM_DELAY = 0.8 // Specific timing for celebration effect
```

## 🔧 Migration Checklist

When refactoring existing components:

- [ ] Replace all `z-[number]` with `Z_INDEX` constants
- [ ] Replace animation durations with `ANIMATION.DURATION`
- [ ] Replace spring values with `ANIMATION.SPRING`
- [ ] Replace easing with `ANIMATION.EASING`
- [ ] Replace size classes with `SIZE` constants
- [ ] Replace color values with `COLORS` constants
- [ ] Use utility functions where applicable
- [ ] Add imports for used constants

## 🎯 Component-Specific Guidelines

### Modals
- Use `Z_INDEX.SYSTEM_MODAL` for critical system modals
- Use `Z_INDEX.MODAL_CONTENT` for regular content modals
- Use `SIZE.MODAL.*` for responsive sizing

### Animations
- Use `ANIMATION.SPRING.GENTLE` for UI transitions
- Use `ANIMATION.SPRING.BOUNCY` for interactive elements
- Use `ANIMATION.EASING.TELEGRAM` for Telegram-like feel

### Notifications
- Use `Z_INDEX.TOAST` for toast notifications
- Use `Z_INDEX.OVERLAY_LOW` for achievement notifications

This system ensures consistency, maintainability, and a professional codebase! 🎉