// Telegram Mini Apps Haptic Feedback Integration
// Based on our Frontend Tech Stack V4.0

export type HapticType = 'impact' | 'notification' | 'selection'
export type ImpactStyle = 'light' | 'medium' | 'heavy' | 'rigid' | 'soft'
export type NotificationType = 'error' | 'success' | 'warning'

interface TelegramWebApp {
  HapticFeedback?: {
    impactOccurred: (style: ImpactStyle) => void
    notificationOccurred: (type: NotificationType) => void
    selectionChanged: () => void
  }
}

declare global {
  interface Window {
    Telegram?: {
      WebApp?: TelegramWebApp
    }
  }
}

class HapticManager {
  private isEnabled = true
  private isTelegramAvailable = false

  constructor() {
    this.isTelegramAvailable = Boolean(
      window?.Telegram?.WebApp?.HapticFeedback
    )
  }

  enable() {
    this.isEnabled = true
  }

  disable() {
    this.isEnabled = false
  }

  // Impact feedback for button presses, card taps
  impact(style: ImpactStyle = 'medium') {
    if (!this.isEnabled || !this.isTelegramAvailable) return
    
    try {
      window.Telegram?.WebApp?.HapticFeedback?.impactOccurred(style)
    } catch (error) {
      console.warn('Haptic feedback failed:', error)
    }
  }

  // Notification feedback for state changes
  notification(type: NotificationType) {
    if (!this.isEnabled || !this.isTelegramAvailable) return
    
    try {
      window.Telegram?.WebApp?.HapticFeedback?.notificationOccurred(type)
    } catch (error) {
      console.warn('Haptic notification failed:', error)
    }
  }

  // Selection feedback for UI navigation
  selection() {
    if (!this.isEnabled || !this.isTelegramAvailable) return
    
    try {
      window.Telegram?.WebApp?.HapticFeedback?.selectionChanged()
    } catch (error) {
      console.warn('Haptic selection failed:', error)
    }
  }

  // Gaming-specific haptic patterns
  buttonPress() {
    this.impact('light')
  }

  cardTap() {
    this.impact('medium')
  }

  levelUp() {
    this.notification('success')
    setTimeout(() => this.impact('heavy'), 100)
  }

  achievement() {
    this.notification('success')
    setTimeout(() => this.impact('medium'), 50)
    setTimeout(() => this.impact('light'), 150)
  }

  error() {
    this.notification('error')
  }

  success() {
    this.notification('success')
  }

  warning() {
    this.notification('warning')
  }

  // Navigation feedback
  pageTransition() {
    this.selection()
  }

  tabSwitch() {
    this.selection()
  }
}

// Singleton instance
export const haptics = new HapticManager()

// React hook for haptic feedback
export const useHaptics = () => {
  return {
    impact: haptics.impact.bind(haptics),
    notification: haptics.notification.bind(haptics),
    selection: haptics.selection.bind(haptics),
    buttonPress: haptics.buttonPress.bind(haptics),
    cardTap: haptics.cardTap.bind(haptics),
    levelUp: haptics.levelUp.bind(haptics),
    achievement: haptics.achievement.bind(haptics),
    error: haptics.error.bind(haptics),
    success: haptics.success.bind(haptics),
    warning: haptics.warning.bind(haptics),
    pageTransition: haptics.pageTransition.bind(haptics),
    tabSwitch: haptics.tabSwitch.bind(haptics),
    enable: haptics.enable.bind(haptics),
    disable: haptics.disable.bind(haptics)
  }
}