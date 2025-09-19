import React from 'react'
import { createRouter, createRootRoute, createRoute, redirect } from '@tanstack/react-router'
import { Outlet } from '@tanstack/react-router'
import { AppShell } from '../app/AppShell'
import { ProfilePage } from '../pages/ProfilePage'
import { ChallengePage } from '../pages/ChallengePage'

// Root component with AppShell
function RootComponent() {
  return (
    <AppShell>
      <Outlet />
    </AppShell>
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

// Create the route tree
const routeTree = rootRoute.addChildren([
  indexRoute,
  challengeRoute,
  profileRoute,
])

// Create router
export const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
})