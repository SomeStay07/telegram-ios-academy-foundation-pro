import React from 'react'
import { createRouter, createRootRoute, createRoute, redirect } from '@tanstack/react-router'
import { TabBar } from '../widgets/tab-bar/TabBar'
import { Outlet } from '@tanstack/react-router'
import { RoadmapPage } from '../pages/RoadmapPage'
import { InterviewPage } from '../pages/InterviewPage'
import { ProfilePage } from '../pages/ProfilePage'

// Root route with TabBar layout
const rootRoute = createRootRoute({
  component: () => (
    <div className="min-h-screen bg-background flex flex-col">
      <main className="flex-1 pb-16 safe-bottom">
        <Outlet />
      </main>
      <TabBar />
    </div>
  ),
})

// Index route - redirect to roadmap
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  beforeLoad: () => {
    throw redirect({ to: '/roadmap' })
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
  component: ProfilePage,
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