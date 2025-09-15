import { test, expect } from '@playwright/test'

/**
 * E2E tests for route navigation and deep linking
 * Tests the routing fixes and ensures navigation works correctly
 */

test.describe('Route Navigation Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Add Telegram WebApp mock
    await page.addInitScript(() => {
      window.Telegram = {
        WebApp: {
          ready: () => console.log('TMA: ready'),
          expand: () => console.log('TMA: expand'),
          BackButton: {
            show: () => console.log('TMA: BackButton.show'),
            hide: () => console.log('TMA: BackButton.hide'),
            onClick: (callback: Function) => console.log('TMA: BackButton.onClick')
          },
          initDataUnsafe: {},
          version: '6.0'
        }
      }
      window.telegramLogs = []
    })
  })

  test('should load home page correctly', async ({ page }) => {
    await page.goto('/')
    
    // Check that we're on the home page
    expect(page.url()).toMatch(/\/$/)
    
    // Look for home page content
    await expect(page.locator('h1')).toContainText('Telegram iOS Academy')
    
    // Check for navigation links
    const courseLink = page.locator('a[href="/course/ios-fundamentals"]')
    await expect(courseLink).toBeVisible()
    await expect(courseLink).toContainText('iOS Fundamentals')
    
    const lessonLink = page.locator('a[href="/lesson"]')
    await expect(lessonLink).toBeVisible()
    await expect(lessonLink).toContainText('Lesson Demo')
    
    console.log('✅ Home page loaded with navigation links')
  })

  test('should navigate to lesson page', async ({ page }) => {
    await page.goto('/')
    
    // Click on lesson link
    const lessonLink = page.locator('a[href="/lesson"]')
    await lessonLink.click()
    
    // Check URL changed
    await page.waitForURL('**/lesson')
    expect(page.url()).toMatch(/\/lesson$/)
    
    // Check lesson content loaded
    await expect(page.locator('[data-testid="lesson-content"]')).toBeVisible()
    
    console.log('✅ Navigation to lesson page works')
  })

  test('should navigate to course page', async ({ page }) => {
    await page.goto('/')
    
    // Click on course link
    const courseLink = page.locator('a[href="/course/ios-fundamentals"]')
    await courseLink.click()
    
    // Check URL changed
    await page.waitForURL('**/course/ios-fundamentals')
    expect(page.url()).toMatch(/\/course\/ios-fundamentals$/)
    
    // Give it a moment to load (course loader might be async)
    await page.waitForTimeout(1000)
    
    console.log('✅ Navigation to course page works')
  })

  test('should navigate to interview page', async ({ page }) => {
    await page.goto('/')
    
    // Click on interview link
    const interviewLink = page.locator('a[href="/interview/swift-fundamentals/drill"]')
    await interviewLink.click()
    
    // Check URL changed
    await page.waitForURL('**/interview/swift-fundamentals/drill')
    expect(page.url()).toMatch(/\/interview\/swift-fundamentals\/drill$/)
    
    // Check interview content loaded
    await expect(page.locator('[data-testid="interview-content"]')).toBeVisible()
    
    console.log('✅ Navigation to interview page works')
  })

  test('should handle direct route access', async ({ page }) => {
    // Test direct navigation to lesson route
    await page.goto('/lesson')
    await expect(page.locator('[data-testid="lesson-content"]')).toBeVisible()
    
    // Test direct navigation to interview route
    await page.goto('/interview/swift-fundamentals/explain')
    await expect(page.locator('[data-testid="interview-content"]')).toBeVisible()
    
    console.log('✅ Direct route access works')
  })

  test('should handle deep linking with start param', async ({ page }) => {
    // Mock Telegram WebApp with start_param
    await page.addInitScript(() => {
      window.Telegram.WebApp.initDataUnsafe = {
        start_param: 'lesson_swift-variables'
      }
    })
    
    await page.goto('/')
    
    // Should redirect to lesson page based on start_param
    await page.waitForURL('**/lesson/swift-variables', { timeout: 5000 })
    expect(page.url()).toMatch(/\/lesson\/swift-variables$/)
    
    console.log('✅ Deep linking with start_param works')
  })

  test('should handle deep linking with URL parameter', async ({ page }) => {
    // Test deep linking via URL parameter
    await page.goto('/?startapp=course_ios-fundamentals')
    
    // Should redirect to course page based on startapp param
    await page.waitForURL('**/course/ios-fundamentals', { timeout: 5000 })
    expect(page.url()).toMatch(/\/course\/ios-fundamentals$/)
    
    console.log('✅ Deep linking with URL parameter works')
  })

  test('should handle interview deep linking with mode', async ({ page }) => {
    // Mock Telegram WebApp with interview start_param
    await page.addInitScript(() => {
      window.Telegram.WebApp.initDataUnsafe = {
        start_param: 'interview_swift-fundamentals_mock'
      }
    })
    
    await page.goto('/')
    
    // Should redirect to interview page with mock mode
    await page.waitForURL('**/interview/swift-fundamentals/mock', { timeout: 5000 })
    expect(page.url()).toMatch(/\/interview\/swift-fundamentals\/mock$/)
    
    console.log('✅ Interview deep linking with mode works')
  })

  test('should not crash on invalid routes', async ({ page }) => {
    // Navigate to invalid route
    const response = await page.goto('/invalid/route/path')
    
    // Should not return a server error
    expect(response?.status()).toBeLessThan(500)
    
    // Page should still be functional (not showing error boundary)
    const html = await page.content()
    expect(html).toContain('#root')
    
    console.log('✅ Invalid routes handled gracefully')
  })

  test('should handle browser back/forward navigation', async ({ page }) => {
    // Start at home
    await page.goto('/')
    
    // Navigate to lesson
    await page.locator('a[href="/lesson"]').click()
    await page.waitForURL('**/lesson')
    
    // Navigate to interview
    await page.goto('/interview/swift-fundamentals/drill')
    await page.waitForURL('**/interview/swift-fundamentals/drill')
    
    // Go back
    await page.goBack()
    await page.waitForURL('**/lesson')
    expect(page.url()).toMatch(/\/lesson$/)
    
    // Go back again
    await page.goBack()
    await page.waitForURL('**/')
    expect(page.url()).toMatch(/\/$/)
    
    // Go forward
    await page.goForward()
    await page.waitForURL('**/lesson')
    expect(page.url()).toMatch(/\/lesson$/)
    
    console.log('✅ Browser navigation (back/forward) works')
  })

  test('should not have routing invariant errors', async ({ page }) => {
    // Capture console errors
    const errors: string[] = []
    page.on('pageerror', (error) => {
      errors.push(error.message)
    })
    
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        errors.push(msg.text())
      }
    })
    
    // Navigate through different routes
    await page.goto('/')
    await page.goto('/lesson')
    await page.goto('/course/ios-fundamentals')
    await page.goto('/interview/swift-fundamentals/drill')
    await page.goto('/')
    
    // Check for routing errors
    const routingErrors = errors.filter(error => 
      error.includes('Invariant') || 
      error.includes('routing') ||
      error.includes('router')
    )
    
    expect(routingErrors).toHaveLength(0)
    
    console.log('✅ No routing invariant errors detected')
  })

  test('should handle multiple route types in sequence', async ({ page }) => {
    // Test navigating through all route types to ensure no conflicts
    const routes = [
      { path: '/lesson', testId: 'lesson-content' },
      { path: '/course/ios-fundamentals', testId: null },
      { path: '/interview/swift-fundamentals/drill', testId: 'interview-content' },
      { path: '/interview/swift-fundamentals/explain', testId: 'interview-content' },
      { path: '/interview/swift-fundamentals/mock', testId: 'interview-content' },
      { path: '/', testId: null }
    ]
    
    for (const route of routes) {
      await page.goto(route.path)
      await page.waitForURL(`**${route.path}`)
      
      if (route.testId) {
        await expect(page.locator(`[data-testid="${route.testId}"]`)).toBeVisible()
      }
      
      // Small delay to ensure route is fully loaded
      await page.waitForTimeout(500)
    }
    
    console.log('✅ All route types navigate successfully')
  })
})