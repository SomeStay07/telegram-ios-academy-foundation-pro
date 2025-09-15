import { useEffect } from 'react'
import { useRouterState, useNavigate } from '@tanstack/react-router'

interface TelegramWebApp {
  BackButton: {
    show(): void
    hide(): void
    onClick(callback: () => void): void
    offClick(callback: () => void): void
  }
  MainButton: {
    text: string
    isVisible: boolean
    isActive: boolean
    show(): void
    hide(): void
    enable(): void
    disable(): void
    onClick(callback: () => void): void
    offClick(callback: () => void): void
  }
  HapticFeedback: {
    selectionChanged(): void
    impactOccurred(style: 'light' | 'medium' | 'heavy'): void
  }
  viewportStableHeight: number
  onEvent(eventType: 'viewportChanged', callback: () => void): void
  offEvent(eventType: 'viewportChanged', callback: () => void): void
  initDataUnsafe: {
    start_param?: string
    user?: {
      username?: string
      language_code?: string
    }
  }
  themeParams: Record<string, string>
}

declare global {
  interface Window {
    Telegram?: {
      WebApp: TelegramWebApp
    }
  }
}

export function useTelegramUI() {
  const routerState = useRouterState()
  const navigate = useNavigate()
  const currentPath = routerState.location.pathname
  
  useEffect(() => {
    const webApp = window.Telegram?.WebApp
    if (!webApp) return

    // Handle deep links on app start
    const startParam = webApp.initDataUnsafe.start_param || 
      new URLSearchParams(window.location.search).get('tgWebAppStartParam')
    
    if (startParam?.startsWith('tab=')) {
      const tab = startParam.split('=')[1]
      if (['roadmap', 'interview', 'profile'].includes(tab)) {
        navigate({ to: `/${tab}` })
      }
    }

    // Configure BackButton
    const isRootTab = ['/', '/roadmap', '/interview', '/profile'].includes(currentPath)
    
    if (isRootTab) {
      webApp.BackButton.hide()
    } else {
      webApp.BackButton.show()
      const handleBack = () => navigate({ to: -1 })
      webApp.BackButton.onClick(handleBack)
      
      return () => {
        webApp.BackButton.offClick(handleBack)
      }
    }
  }, [currentPath, navigate])

  useEffect(() => {
    const webApp = window.Telegram?.WebApp
    if (!webApp) return

    // Configure MainButton based on current route
    let buttonConfig: { text: string; isVisible: boolean; isActive: boolean } = {
      text: '',
      isVisible: false,
      isActive: false
    }

    if (currentPath === '/roadmap') {
      buttonConfig = {
        text: 'Continue',
        isVisible: true,
        isActive: true // TODO: check if there's an incomplete module
      }
    } else if (currentPath === '/interview') {
      buttonConfig = {
        text: 'Start Interview',
        isVisible: true,
        isActive: true // TODO: check if category is selected
      }
    } else if (currentPath === '/profile') {
      buttonConfig = {
        text: 'Save',
        isVisible: true,
        isActive: false // TODO: check if there are changes
      }
    }

    webApp.MainButton.text = buttonConfig.text
    
    if (buttonConfig.isVisible) {
      webApp.MainButton.show()
    } else {
      webApp.MainButton.hide()
    }
    
    if (buttonConfig.isActive) {
      webApp.MainButton.enable()
    } else {
      webApp.MainButton.disable()
    }

  }, [currentPath])

  useEffect(() => {
    const webApp = window.Telegram?.WebApp
    if (!webApp) return

    // Apply Telegram theme
    const themeParams = webApp.themeParams
    const root = document.documentElement

    // Set CSS variables for Telegram theme
    Object.entries(themeParams).forEach(([key, value]) => {
      root.style.setProperty(`--tg-theme-${key.replace(/_/g, '-')}`, value)
    })

    // Handle viewport changes
    const handleViewportChange = () => {
      root.style.setProperty('--tg-vph', `${webApp.viewportStableHeight}px`)
    }
    
    handleViewportChange() // Set initial value
    webApp.onEvent('viewportChanged', handleViewportChange)

    return () => {
      webApp.offEvent('viewportChanged', handleViewportChange)
    }
  }, [])
}