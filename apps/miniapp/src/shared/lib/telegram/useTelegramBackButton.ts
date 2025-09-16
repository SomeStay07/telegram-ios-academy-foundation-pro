import { useEffect } from 'react'
import { useRouterState, useNavigate } from '@tanstack/react-router'

export function useTelegramBackButton() {
  const routerState = useRouterState()
  const navigate = useNavigate()
  const currentPath = routerState.location.pathname

  useEffect(() => {
    const { WebApp } = (window as any)?.Telegram || {}
    if (!WebApp?.BackButton) return

    // Define root tabs where BackButton should be hidden
    const isRootTab = ['/', '/roadmap', '/interview', '/profile'].includes(currentPath)
    
    if (isRootTab) {
      WebApp.BackButton.hide()
    } else {
      WebApp.BackButton.show()
      
      const handleBack = () => {
        // Add haptic feedback
        WebApp.HapticFeedback?.impactOccurred?.('light')
        navigate({ to: -1 } as any)
      }
      
      WebApp.BackButton.onClick(handleBack)
      
      return () => {
        WebApp.BackButton.offClick?.(handleBack)
      }
    }
  }, [currentPath, navigate])
}