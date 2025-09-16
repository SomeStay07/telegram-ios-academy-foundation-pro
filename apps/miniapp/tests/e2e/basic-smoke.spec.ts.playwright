import { test, expect } from '@playwright/test';

/**
 * Basic smoke test for MiniApp
 * Just verifies the app loads without complex lesson-specific checks
 * Designed to be very tolerant of config/env issues in CI
 */

test.describe('Basic Smoke Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Add Telegram WebApp mock
    await page.addInitScript(() => {
      window.Telegram = {
        WebApp: {
          ready: () => console.log('TMA: ready'),
          expand: () => console.log('TMA: expand'),
          initDataUnsafe: {},
          version: '6.0'
        }
      };
      window.telegramLogs = [];
    });
  });

  test('should load basic HTML structure', async ({ page }) => {
    await page.goto('/');
    
    // Check basic HTML elements
    const html = await page.locator('html').count();
    expect(html).toBe(1);
    
    const body = await page.locator('body').count();
    expect(body).toBe(1);
    
    const root = await page.locator('#root').count();
    expect(root).toBe(1);
    
    console.log('✅ Basic HTML structure loaded');
  });

  test('should respond to HTTP requests', async ({ page }) => {
    const response = await page.goto('/');
    
    // Just check that the server responds
    expect(response?.status()).toBe(200);
    
    // Check basic HTML content is served
    const html = await page.content();
    expect(html).toContain('<html');
    expect(html).toContain('id="root"');
    
    console.log('✅ Server responds with valid HTML');
  });
  
  test('should load page title', async ({ page }) => {
    await page.goto('/');
    
    // Check that the page has a title (from HTML or JS)
    const title = await page.title();
    expect(title.length).toBeGreaterThan(0);
    
    console.log('Page title:', title);
    console.log('✅ Page has title');
  });
});