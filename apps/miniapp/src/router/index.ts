import { createRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree'

// Create router directly without HMR singleton to avoid timing issues
export const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
})