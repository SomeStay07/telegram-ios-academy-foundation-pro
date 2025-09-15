import React, { ReactElement } from 'react'
import { render as rtlRender, RenderOptions } from '@testing-library/react'
import { createMemoryHistory, createRouter, RouterProvider } from '@tanstack/react-router'
import { rootRoute } from '../router/routeTree'

// Mock history.scrollRestoration for TanStack Router
Object.defineProperty(window, 'history', {
  value: {
    ...window.history,
    scrollRestoration: 'auto'
  },
  writable: true
})

// Create a simple route tree for testing
const testRootRoute = rootRoute
const testRouter = createRouter({
  routeTree: testRootRoute,
  history: createMemoryHistory({
    initialEntries: ['/']
  })
})

// Create a wrapper component that provides router context
function TestWrapper({ 
  children,
  initialEntries = ['/']
}: { 
  children: React.ReactNode
  initialEntries?: string[]
}) {
  // Create a new router instance for each test to avoid state sharing
  const router = createRouter({
    routeTree: testRootRoute,
    history: createMemoryHistory({
      initialEntries
    })
  })

  return (
    <RouterProvider router={router}>
      {children}
    </RouterProvider>
  )
}

// Custom render function
export interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  route?: string
  initialEntries?: string[]
}

export function render(
  ui: ReactElement,
  options: CustomRenderOptions = {}
) {
  const { route, initialEntries = [route || '/'], ...renderOptions } = options

  return rtlRender(ui, {
    wrapper: ({ children }) => (
      <TestWrapper initialEntries={initialEntries}>
        {children}
      </TestWrapper>
    ),
    ...renderOptions
  })
}

// Re-export everything from RTL
export * from '@testing-library/react'

// Override render export
export { render as default }