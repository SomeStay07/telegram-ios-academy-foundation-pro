import { describe, test, expect } from 'vitest'
import { routeTree, rootRoute, indexRoute, courseRoute, lessonRoute, lessonByIdRoute, interviewRoute } from '../routeTree'

describe('Route Tree Structure', () => {
  test('should have correct root route configuration', () => {
    expect(rootRoute.id).toBe('__root__')
    expect(rootRoute.options.component).toBeDefined()
    expect(rootRoute.options.errorComponent).toBeDefined()
  })

  test('should have all expected child routes', () => {
    const routeIds = routeTree.children?.map(route => route.id) || []
    
    expect(routeIds).toEqual([
      '/',
      '/course/$courseId',
      '/lesson',
      '/lesson/$lessonId', 
      '/interview/$interviewId/$mode'
    ])
  })

  test('should have correct index route configuration', () => {
    expect(indexRoute.id).toBe('/')
    expect(indexRoute.path).toBe('/')
    expect(indexRoute.options.component).toBeDefined()
  })

  test('should have correct course route configuration', () => {
    expect(courseRoute.id).toBe('/course/$courseId')
    expect(courseRoute.path).toBe('course/$courseId')
    expect(courseRoute.options.component).toBeDefined()
  })

  test('should have correct lesson routes configuration', () => {
    expect(lessonRoute.id).toBe('/lesson')
    expect(lessonRoute.path).toBe('lesson')
    expect(lessonRoute.options.component).toBeDefined()

    expect(lessonByIdRoute.id).toBe('/lesson/$lessonId')
    expect(lessonByIdRoute.path).toBe('lesson/$lessonId')
    expect(lessonByIdRoute.options.component).toBeDefined()
  })

  test('should have correct interview route configuration', () => {
    expect(interviewRoute.id).toBe('/interview/$interviewId/$mode')
    expect(interviewRoute.path).toBe('interview/$interviewId/$mode')
    expect(interviewRoute.options.component).toBeDefined()
  })

  test('should not have leading slashes in child route paths', () => {
    const childRoutes = [courseRoute, lessonRoute, lessonByIdRoute, interviewRoute]
    
    childRoutes.forEach(route => {
      expect(route.path).not.toMatch(/^\//)
    })
  })

  test('should have valid parent-child relationships', () => {
    const childRoutes = [indexRoute, courseRoute, lessonRoute, lessonByIdRoute, interviewRoute]
    
    childRoutes.forEach(route => {
      expect(route.getParentRoute()).toBe(rootRoute)
    })
  })

  test('route tree snapshot', () => {
    const treeStructure = {
      root: {
        id: rootRoute.id,
        path: rootRoute.path,
        hasComponent: !!rootRoute.options.component,
        hasErrorComponent: !!rootRoute.options.errorComponent,
        children: routeTree.children?.map(route => ({
          id: route.id,
          path: route.path,
          hasComponent: !!route.options.component,
          parentId: route.getParentRoute()?.id
        })) || []
      }
    }

    expect(treeStructure).toMatchSnapshot()
  })

  test('should match expected route structure for deep linking compatibility', () => {
    const routePaths = routeTree.children?.map(route => route.path) || []
    
    // These paths should match what deep-linking.ts generates
    expect(routePaths).toContain('lesson/$lessonId') // for lesson routes
    expect(routePaths).toContain('course/$courseId') // for course routes  
    expect(routePaths).toContain('interview/$interviewId/$mode') // for interview routes
    expect(routePaths).toContain('/') // for home route
  })

  test('should have proper path parameter naming', () => {
    // Verify parameter names match what we expect in the components
    expect(courseRoute.path).toMatch(/\$courseId/)
    expect(lessonByIdRoute.path).toMatch(/\$lessonId/)
    expect(interviewRoute.path).toMatch(/\$interviewId.*\$mode/)
  })
})