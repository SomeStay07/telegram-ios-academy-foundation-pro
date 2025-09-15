import { useEffect } from 'react'
import { useRouterState, useNavigate } from '@tanstack/react-router'
import { useAppStore } from '../../model/store'

export function useTelegramMainButton() {
  const routerState = useRouterState()
  const navigate = useNavigate()
  const store = useAppStore()
  const currentPath = routerState.location.pathname

  useEffect(() => {
    const { WebApp } = (window as any)?.Telegram || {}
    if (!WebApp?.MainButton) return

    // Clear any existing listeners
    const clearMainButton = () => {
      WebApp.MainButton.hide()
      WebApp.MainButton.offClick?.(() => {})
    }

    let buttonConfig: {
      text: string
      isVisible: boolean
      isActive: boolean
      onClick?: () => void
    } = {
      text: '',
      isVisible: false,
      isActive: false
    }

    // Configure button based on current route
    if (currentPath === '/roadmap') {
      const modules = store?.modules || []
      const incompleteModule = modules.find(m => m.progress > 0 && m.progress < 100)
      
      if (incompleteModule) {
        buttonConfig = {
          text: 'Continue',
          isVisible: true,
          isActive: true,
          onClick: () => {
            store?.continueModule?.()
            // Add haptic feedback
            WebApp.HapticFeedback?.impactOccurred?.('light')
          }
        }
      }
    } else if (currentPath === '/interview') {
      const selectedCategory = store?.selectedCategory
      const currentAttempt = store?.currentAttempt || { status: 'idle' }
      
      if (selectedCategory) {
        const isResuming = currentAttempt.status === 'in_progress'
        buttonConfig = {
          text: isResuming ? 'Resume Interview' : 'Start Interview',
          isVisible: true,
          isActive: true,
          onClick: () => {
            if (isResuming) {
              store?.resumeAttempt?.()
            } else {
              store?.startAttempt?.()
            }
            // Add haptic feedback
            WebApp.HapticFeedback?.impactOccurred?.('medium')
          }
        }
      }
    } else if (currentPath === '/profile') {
      // Check if there are unsaved changes
      // For now, we'll assume there are no changes (this would be managed by form state)
      buttonConfig = {
        text: 'Save',
        isVisible: true,
        isActive: false, // Will be activated when form has changes
        onClick: () => {
          // Handle save action
          WebApp.HapticFeedback?.impactOccurred?.('light')
        }
      }
    }

    // Apply configuration
    WebApp.MainButton.text = buttonConfig.text
    
    if (buttonConfig.isVisible) {
      WebApp.MainButton.show()
    } else {
      WebApp.MainButton.hide()
    }
    
    if (buttonConfig.isActive && buttonConfig.onClick) {
      WebApp.MainButton.enable()
      WebApp.MainButton.onClick(buttonConfig.onClick)
    } else {
      WebApp.MainButton.disable()
    }

    // Cleanup function
    return clearMainButton

  }, [currentPath, store?.modules, store?.selectedCategory, store?.currentAttempt])
}