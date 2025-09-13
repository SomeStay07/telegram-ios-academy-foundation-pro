import { createRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree'

// Синглтон роутера для HMR (во избежание двойного монтирования)
declare global {
  interface Window {
    __app_router?: ReturnType<typeof createRouter>
  }
}

export const router =
  window.__app_router ??
  (window.__app_router = createRouter({
    routeTree,
    defaultPreload: 'intent',
  }))