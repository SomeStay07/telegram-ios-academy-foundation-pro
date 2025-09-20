import React from 'react'
import { createRouter, createRootRoute, createRoute, redirect } from '@tanstack/react-router'
import { Outlet } from '@tanstack/react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AppShell } from '../app/AppShell'
import { ProfilePage } from '../pages/ProfilePage'
import { ChallengePage } from '../pages/ChallengePage'
import { SettingsPage } from '../pages/SettingsPage'
import { AboutPage } from '../pages/AboutPage'
import { HyloTestProfilePage } from '../pages/HyloTestProfilePage'
import { ThemeProvider } from '../contexts/ThemeContext'

// Create QueryClient instance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
})

// Root component with ThemeProvider, QueryClientProvider and AppShell
function RootComponent() {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <AppShell>
          <Outlet />
        </AppShell>
      </QueryClientProvider>
    </ThemeProvider>
  )
}

// Root route with TabBar layout
const rootRoute = createRootRoute({
  component: RootComponent,
})

// Helper function to handle deeplinks
function getDeeplinkTab(): string {
  // Check Telegram WebApp start parameter
  const webApp = (window as any)?.Telegram?.WebApp
  const startParam = webApp?.initDataUnsafe?.start_param || 
    new URLSearchParams(window.location.search).get('tgWebAppStartParam')
  
  if (startParam?.startsWith('tab=')) {
    const tab = startParam.split('=')[1]
    if (['challenge', 'profile'].includes(tab)) {
      return `/${tab}`
    }
  }
  
  // Default to profile
  return '/profile'
}

// Index route - redirect to appropriate tab (with deeplink support)
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  beforeLoad: () => {
    const targetTab = getDeeplinkTab()
    throw redirect({ to: targetTab })
  },
})

// Tab routes
const challengeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/challenge',
  component: ChallengePage,
})

const profileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/profile',
  component: ProfilePage,
})

const settingsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/settings',
  component: SettingsPage,
})

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/about',
  component: AboutPage,
})

// Hylo Test Route for design testing
const hyloTestRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/hylo-test',
  component: HyloTestProfilePage,
})

// Create the route tree
const routeTree = rootRoute.addChildren([
  indexRoute,
  challengeRoute,
  profileRoute,
  settingsRoute,
  aboutRoute,
  hyloTestRoute,
])

// Create router
export const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
})