import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Router } from '@tanstack/react-router'
import { lazyImport } from './utils/lazyImport'
import { initTelegramTheme, isTelegramWebApp } from '@telegram-ios-academy/ui'
import { initThemeSync } from './lib/tmaTheme'
import { getTelegramApi } from './lib/telegram/api'
// Essential styles - modern design system with Tailwind
import '@telegram-ios-academy/ui/dist/styles/index.css'
import './styles/tailwind-base.css'
import './styles.css'
import './styles/touch-optimizations.css'
import './styles/telegram-webapp-optimizations.css'
import './styles/pwa-enhancements.css'

// Lazy import analytics and web vitals
import('./lib/web-vitals').catch(console.error)

// Lazy load router components
const RouterProvider = React.lazy(() => 
  lazyImport(() => import(/* @vite-ignore */ '@tanstack/react-router'))().then(module => ({ 
    default: module.RouterProvider 
  }))
)

const getRouter = async () => {
  const routerModule = await lazyImport(() => import(/* @vite-ignore */ './router/index'))()
  return routerModule.router
}

// Create React Query client with optimized settings
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
      refetchOnWindowFocus: false,
      retry: 2,
      refetchOnReconnect: true,
    },
    mutations: {
      retry: 1,
    },
  },
})


async function initTmaRouting(router: Router<any, any>) {
  try {
    const api = getTelegramApi()
    const tg = api.getWebApp()
    
    if (!api.isAvailable() || !tg) {
      return
    }
    
    // Initialize WebApp
    tg.ready?.()
    tg.expand?.()
    
    // Initialize Telegram theme integration
    initTelegramTheme()
    
    // Initialize design system theme sync
    initThemeSync(tg)
    
    // Setup back button functionality  
    const setBack = () => {
      try {
        // Type-safe access to router history state
        const historyState = router.history.state as { index?: number } | undefined
        const idx = historyState?.index ?? 0
        if (idx > 0) {
          api.showBackButton(() => router.history.back())
        } else {
          api.hideBackButton()
        }
      } catch (error) {
        // Silent fail for back button management
      }
    }
    
    router.subscribe(setBack)
    setBack()
    
    // TODO: Re-enable deep-link processing after router is stable
  } catch (error) {
    // Silent fail for TMA routing initialization
  }
}

function LazyApp() {
  const [router, setRouter] = React.useState<Router<any, any> | null>(null)

  React.useEffect(() => {
    const initRouter = async () => {
      const routerInstance = await getRouter()
      setRouter(routerInstance)
      
      // Initialize Telegram routing after router is loaded
      await initTmaRouting(routerInstance)
    }
    
    initRouter()
  }, [])

  if (!router) {
    return (
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        height: '100vh',
        fontFamily: 'system-ui'
      }}>
        Loading...
      </div>
    )
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<div>Loading router...</div>}>
        <RouterProvider router={router} />
      </Suspense>
    </QueryClientProvider>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(<LazyApp />)