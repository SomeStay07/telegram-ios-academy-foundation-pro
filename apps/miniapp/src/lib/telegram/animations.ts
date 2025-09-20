/**
 * Telegram Mini App специфичные анимации
 * Интеграция с native Telegram transitions и haptic feedback
 */

import { Variants } from 'framer-motion'
import { getTelegramApi } from './api'

// Telegram-специфичные timing функции
export const TelegramEasing = {
  // iOS-подобные кривые для естественности в Telegram
  enter: [0.25, 0.46, 0.45, 0.94] as const,
  exit: [0.55, 0.06, 0.68, 0.19] as const,
  spring: [0.68, -0.55, 0.265, 1.55] as const,
  // Telegram native timing
  native: [0.4, 0.0, 0.2, 1] as const
}

// Durations оптимизированные для Telegram WebApp
export const TelegramDurations = {
  instant: 0.1,    // Immediate feedback
  fast: 0.2,       // Button interactions
  normal: 0.3,     // Modal/page transitions
  slow: 0.5,       // Complex animations
  telegram: 0.25   // Native Telegram timing
}

/**
 * Page Transitions в стиле Telegram
 */
export const TelegramPageVariants: Variants = {
  initial: {
    opacity: 0,
    x: '100%',
    scale: 0.95
  },
  animate: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: TelegramDurations.telegram,
      ease: TelegramEasing.enter,
      staggerChildren: 0.05
    }
  },
  exit: {
    opacity: 0,
    x: '-50%',
    scale: 1.05,
    transition: {
      duration: TelegramDurations.fast,
      ease: TelegramEasing.exit
    }
  }
}

/**
 * Telegram Back Navigation Animation
 */
export const TelegramBackVariants: Variants = {
  initial: {
    opacity: 0,
    x: '-100%',
    scale: 0.95
  },
  animate: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: TelegramDurations.telegram,
      ease: TelegramEasing.enter
    }
  },
  exit: {
    opacity: 0,
    x: '100%',
    scale: 0.95,
    transition: {
      duration: TelegramDurations.fast,
      ease: TelegramEasing.exit
    }
  }
}

/**
 * Telegram Modal Variants (снизу вверх как в Telegram)
 */
export const TelegramModalVariants: Variants = {
  initial: {
    opacity: 0,
    y: '100%',
    scale: 0.9
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: TelegramDurations.normal,
      ease: TelegramEasing.spring
    }
  },
  exit: {
    opacity: 0,
    y: '100%',
    scale: 0.9,
    transition: {
      duration: TelegramDurations.fast,
      ease: TelegramEasing.exit
    }
  }
}

/**
 * List Item Animation (как в чатах Telegram)
 */
export const TelegramListItemVariants: Variants = {
  initial: {
    opacity: 0,
    y: 20,
    scale: 0.95
  },
  animate: (index: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: TelegramDurations.normal,
      ease: TelegramEasing.enter,
      delay: index * 0.05
    }
  }),
  exit: {
    opacity: 0,
    y: -20,
    scale: 0.95,
    transition: {
      duration: TelegramDurations.fast,
      ease: TelegramEasing.exit
    }
  },
  hover: {
    y: -2,
    scale: 1.02,
    transition: {
      duration: TelegramDurations.fast,
      ease: TelegramEasing.native
    }
  }
}

/**
 * Telegram Card Reveal (для профильных карточек)
 */
export const TelegramCardVariants: Variants = {
  initial: {
    opacity: 0,
    scale: 0.8,
    rotateY: -15
  },
  animate: {
    opacity: 1,
    scale: 1,
    rotateY: 0,
    transition: {
      duration: TelegramDurations.normal,
      ease: TelegramEasing.spring,
      staggerChildren: 0.1
    }
  },
  hover: {
    scale: 1.02,
    rotateY: 2,
    transition: {
      duration: TelegramDurations.fast,
      ease: TelegramEasing.native
    }
  }
}

/**
 * Achievement Animation (геймификация)
 */
export const TelegramAchievementVariants: Variants = {
  initial: {
    opacity: 0,
    scale: 0,
    rotate: -180
  },
  animate: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      duration: TelegramDurations.slow,
      ease: TelegramEasing.spring,
      staggerChildren: 0.15
    }
  },
  celebration: {
    scale: [1, 1.2, 1],
    rotate: [0, 5, -5, 0],
    transition: {
      duration: 0.6,
      ease: TelegramEasing.spring,
      repeat: 2
    }
  }
}

/**
 * Haptic Feedback Integration
 */
export class TelegramHaptics {
  private static api = getTelegramApi()

  static async impact(style: 'light' | 'medium' | 'heavy' = 'medium') {
    try {
      if (this.api.isAvailable()) {
        const webApp = this.api.getWebApp()
        if (webApp?.HapticFeedback?.impactOccurred) {
          webApp.HapticFeedback.impactOccurred(style)
        }
      }
    } catch (error) {
      console.warn('Haptic feedback not available:', error)
    }
  }

  static async notification(type: 'success' | 'warning' | 'error') {
    try {
      if (this.api.isAvailable()) {
        const webApp = this.api.getWebApp()
        if (webApp?.HapticFeedback?.notificationOccurred) {
          webApp.HapticFeedback.notificationOccurred(type)
        }
      }
    } catch (error) {
      console.warn('Haptic feedback not available:', error)
    }
  }

  static async selection() {
    try {
      if (this.api.isAvailable()) {
        const webApp = this.api.getWebApp()
        if (webApp?.HapticFeedback?.selectionChanged) {
          webApp.HapticFeedback.selectionChanged()
        }
      }
    } catch (error) {
      console.warn('Haptic feedback not available:', error)
    }
  }

  // Комплексные haptic последовательности
  static async pageTransition() {
    await this.impact('light')
    setTimeout(() => this.selection(), 100)
  }

  static async achievementUnlock() {
    await this.notification('success')
    setTimeout(() => this.impact('heavy'), 200)
    setTimeout(() => this.impact('medium'), 400)
  }

  static async levelUp() {
    await this.notification('success')
    setTimeout(() => this.impact('heavy'), 100)
    setTimeout(() => this.impact('medium'), 250)
    setTimeout(() => this.impact('light'), 400)
  }
}

/**
 * Theme-aware анимации
 */
export const TelegramThemeVariants = {
  light: {
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(0, 0, 0, 0.1)'
  },
  dark: {
    background: 'rgba(30, 30, 30, 0.95)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.1)'
  }
}

/**
 * Telegram Platform Utilities
 */
export class TelegramPlatform {
  private static api = getTelegramApi()

  static getViewportClass() {
    try {
      if (this.api.isAvailable()) {
        const webApp = this.api.getWebApp()
        const platform = webApp?.platform || 'unknown'
        
        return {
          ios: platform.includes('ios'),
          android: platform.includes('android'),
          mobile: platform.includes('mobile'),
          desktop: platform.includes('desktop')
        }
      }
    } catch (error) {
      console.warn('Platform detection failed:', error)
    }
    
    return {
      ios: false,
      android: false,
      mobile: true,
      desktop: false
    }
  }

  static getPlatformTransition() {
    const { ios, android } = this.getViewportClass()
    
    if (ios) {
      return {
        duration: TelegramDurations.telegram,
        ease: TelegramEasing.enter
      }
    }
    
    if (android) {
      return {
        duration: TelegramDurations.normal,
        ease: TelegramEasing.native
      }
    }
    
    return {
      duration: TelegramDurations.normal,
      ease: TelegramEasing.native
    }
  }
}

/**
 * Hook для использования Telegram анимаций
 */
export const useTelegramAnimations = () => {
  const platform = TelegramPlatform.getViewportClass()
  const transition = TelegramPlatform.getPlatformTransition()

  return {
    // Variants
    pageVariants: TelegramPageVariants,
    backVariants: TelegramBackVariants,
    modalVariants: TelegramModalVariants,
    listItemVariants: TelegramListItemVariants,
    cardVariants: TelegramCardVariants,
    achievementVariants: TelegramAchievementVariants,
    
    // Haptics
    haptics: TelegramHaptics,
    
    // Platform info
    platform,
    transition,
    
    // Theme variants
    themeVariants: TelegramThemeVariants
  }
}