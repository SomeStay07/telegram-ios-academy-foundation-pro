import React from 'react'
import { createRouter, createRootRoute, createRoute, redirect } from '@tanstack/react-router'
import { Outlet } from '@tanstack/react-router'
import { AppShell } from '../app/AppShell'
import { RoadmapPage } from '../pages/RoadmapPage'
import { InterviewPage } from '../pages/InterviewPage'
import { NewProfilePage } from '../pages/profile/NewProfilePage'

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
    if (['roadmap', 'interview', 'profile'].includes(tab)) {
      return `/${tab}`
    }
  }
  
  // Default to roadmap
  return '/roadmap'
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
const roadmapRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/roadmap',
  component: RoadmapPage,
})

const interviewRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/interview',
  component: InterviewPage,
})

const profileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/profile',
  component: NewProfilePage,
})

// Create the route tree
const routeTree = rootRoute.addChildren([
  indexRoute,
  roadmapRoute,
  interviewRoute,
  profileRoute,
])

// Create router
export const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
})