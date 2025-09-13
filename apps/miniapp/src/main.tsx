import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { lazyImport } from './utils/lazyImport'
import { applyTelegramTheme, watchTelegramTheme } from './utils/telegram-theme'
import { initThemeSync } from './lib/tmaTheme'
import '@telegram-ios-academy/ui/dist/tokens.css'

// Ленивый импорт аналитики и web vitals
import('./lib/web-vitals').catch(console.error)

// Lazy load router components
const RouterProvider = React.lazy(() => 
  lazyImport(() => import(/* @vite-ignore */ '@tanstack/react-router'))().then(module => ({ 
    default: module.RouterProvider 
  }))
)

const getRouter = async () => {
  const routerModule = await lazyImport(() => import(/* @vite-ignore */ './router'))()
  return routerModule.router
}

// Lazy load QueryClient when needed
let queryClient: any = null
async function getQueryClient() {
  if (!queryClient) {
    const { QueryClient } = await import('@tanstack/react-query')
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: 3,
          staleTime: 5 * 60 * 1000, // 5 minutes
        },
      },
    })
  }
  return queryClient
}

async function initTmaRouting(router: any) {
  const tg = (window as any).Telegram?.WebApp
  if (!tg) return
  
  tg.ready?.()
  tg.expand?.()
  
  // Apply Telegram theme on startup
  applyTelegramTheme()
  
  // Initialize design system theme sync
  initThemeSync(tg)
  
  // Watch for theme changes
  watchTelegramTheme((newTheme) => {
    console.log('🎨 Theme updated:', newTheme)
  })
  
  const setBack = () => {
    const idx = (router.history as any).state.index ?? 0
    idx > 0 ? tg.BackButton?.show?.() : tg.BackButton?.hide?.()
  }
  tg.BackButton?.onClick?.(() => router.history.back())
  router.subscribe(setBack)
  setBack()
  
  // TODO: Re-enable deep-link processing after router is stable
}

function LazyApp() {
  const [router, setRouter] = React.useState<any>(null)

  React.useEffect(() => {
    const initRouter = async () => {
      const routerInstance = await getRouter()
      setRouter(routerInstance)
      
      // Initialize Telegram routing after router is loaded
      await initTmaRouting(routerInstance)
      
      // Preload QueryClient for future use
      setTimeout(async () => {
        await getQueryClient()
      }, 1000)
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
    <Suspense fallback={<div>Loading router...</div>}>
      <RouterProvider router={router} />
    </Suspense>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(<LazyApp />)