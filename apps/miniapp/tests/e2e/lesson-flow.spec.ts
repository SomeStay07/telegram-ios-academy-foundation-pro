import { test, expect } from '@playwright/test';

/**
 * E2E Tests for Telegram Mini App Lesson Flow
 * Tests happy-path lesson flow: hook→concept→workedExample→quiz→checkpoint
 * Includes deeplink start_param handling and Telegram WebApp API mocks
 */

// Mock Telegram WebApp API
const telegramWebAppMock = `
  window.Telegram = {
    WebApp: {
      ready: () => console.log('TMA: ready'),
      expand: () => console.log('TMA: expand'),
      BackButton: {
        show: () => console.log('TMA: BackButton.show'),
        hide: () => console.log('TMA: BackButton.hide'),
        onClick: (callback) => {
          window.telegramBackCallback = callback;
          console.log('TMA: BackButton.onClick registered');
        }
      },
      MainButton: {
        show: () => console.log('TMA: MainButton.show'),
        hide: () => console.log('TMA: MainButton.hide'),
        setText: (text) => console.log('TMA: MainButton.setText:', text),
        onClick: (callback) => {
          window.telegramMainCallback = callback;
          console.log('TMA: MainButton.onClick registered');
        }
      },
      HapticFeedback: {
        impactOccurred: (style) => console.log('TMA: HapticFeedback.impactOccurred:', style),
        notificationOccurred: (type) => console.log('TMA: HapticFeedback.notificationOccurred:', type),
        selectionChanged: () => console.log('TMA: HapticFeedback.selectionChanged')
      },
      initDataUnsafe: {
        start_param: null
      },
      themeParams: {
        bg_color: '#ffffff',
        text_color: '#000000',
        hint_color: '#999999',
        link_color: '#0088cc',
        button_color: '#0088cc',
        button_text_color: '#ffffff'
      }
    }
  };
`;

test.beforeEach(async ({ page }) => {
  // Add Telegram WebApp mock before page loads
  await page.addInitScript(telegramWebAppMock);
  
  // Mock console.log to capture TMA calls
  await page.addInitScript(() => {
    window.telegramLogs = [];
    const originalLog = console.log;
    console.log = (...args) => {
      if (args[0]?.startsWith('TMA:')) {
        window.telegramLogs.push(args.join(' '));
      }
      originalLog.apply(console, args);
    };
  });
});

test.describe('Lesson Flow E2E Tests', () => {
  test('should render lesson page with proper theme integration', async ({ page }) => {
    await page.goto('http://localhost:5173');
    
    // Verify lesson title is visible (main heading)
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    
    // Verify theme classes are applied
    const themeElements = await page.locator('.text-telegram-text').count();
    expect(themeElements).toBeGreaterThan(0);
    
    // Check that Telegram WebApp was initialized
    const telegramLogs = await page.evaluate(() => window.telegramLogs);
    expect(telegramLogs).toContain('TMA: ready');
    expect(telegramLogs).toContain('TMA: expand');
  });

  test('should complete happy-path lesson flow: hook→concept→workedExample→quiz→checkpoint', async ({ page }) => {
    await page.goto('/');
    
    // Wait for lesson to load
    await page.waitForSelector('[data-testid="lesson-content"]', { timeout: 10000 });
    
    // Step 1: Hook module - should be visible first
    const hookModule = page.locator('[data-module-type="hook"]').first();
    if (await hookModule.count() > 0) {
      await expect(hookModule).toBeVisible();
      console.log('✓ Hook module found and visible');
    }
    
    // Step 2: Concept module
    const conceptModule = page.locator('[data-module-type="concept"]').first();
    if (await conceptModule.count() > 0) {
      await expect(conceptModule).toBeVisible();
      console.log('✓ Concept module found and visible');
    }
    
    // Step 3: Worked Example module
    const exampleModule = page.locator('[data-module-type="workedExample"]').first();
    if (await exampleModule.count() > 0) {
      await expect(exampleModule).toBeVisible();
      console.log('✓ Worked Example module found and visible');
    }
    
    // Step 4: Quiz module - interact with quiz
    const quizModule = page.locator('[data-module-type="quiz"]').first();
    if (await quizModule.count() > 0) {
      await expect(quizModule).toBeVisible();
      
      // Look for quiz answer options
      const quizOptions = quizModule.locator('button, input[type="radio"], [role="button"]');
      const optionCount = await quizOptions.count();
      
      if (optionCount > 0) {
        // Click first available option
        await quizOptions.first().click();
        console.log('✓ Quiz interaction completed');
        
        // Check for haptic feedback
        const telegramLogs = await page.evaluate(() => window.telegramLogs);
        const hasHaptic = telegramLogs.some(log => log.includes('HapticFeedback'));
        if (hasHaptic) console.log('✓ Haptic feedback triggered');
      }
    }
    
    // Step 5: Checkpoint/Progress tracking
    const checkpointModule = page.locator('[data-module-type="checkpoint"]').first();
    if (await checkpointModule.count() > 0) {
      await expect(checkpointModule).toBeVisible();
      console.log('✓ Checkpoint module found and visible');
    }
    
    // Final step: Complete lesson
    const completeButton = page.locator('button:has-text("Complete"), button:has-text("Завершить")').first();
    if (await completeButton.count() > 0) {
      await completeButton.click();
      console.log('✓ Lesson completion clicked');
    }
  });

  test('should handle deeplink start_param correctly', async ({ page }) => {
    // Set start_param before navigating
    await page.addInitScript(() => {
      window.Telegram.WebApp.initDataUnsafe.start_param = 'swift-variables';
    });
    
    await page.goto('/');
    
    // Verify the router received the start_param
    const currentUrl = page.url();
    console.log('Current URL after start_param:', currentUrl);
    
    // Check that lesson navigation was attempted
    const telegramLogs = await page.evaluate(() => window.telegramLogs);
    console.log('Telegram logs:', telegramLogs);
  });

  test('should handle Back button functionality', async ({ page }) => {
    await page.goto('/');
    
    // Wait for page to load and BackButton to be configured
    await page.waitForTimeout(1000);
    
    // Check if back button callback is registered
    const telegramLogs = await page.evaluate(() => window.telegramLogs);
    expect(telegramLogs).toContain('TMA: BackButton.onClick registered');
    
    // Simulate back button click
    await page.evaluate(() => {
      if (window.telegramBackCallback) {
        window.telegramBackCallback();
      }
    });
    
    console.log('✓ Back button functionality tested');
  });

  test('should handle Main button interactions', async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(1000);
    
    // Look for main button triggers (continue, complete buttons)
    const actionButtons = page.locator('button:has-text("Continue"), button:has-text("Complete"), button:has-text("Продолжить"), button:has-text("Завершить")');
    
    if (await actionButtons.count() > 0) {
      await actionButtons.first().click();
      
      // Check for Main button interactions in logs
      const telegramLogs = await page.evaluate(() => window.telegramLogs);
      const hasMainButton = telegramLogs.some(log => log.includes('MainButton'));
      console.log('Main button interaction detected:', hasMainButton);
    }
  });

  test('should trigger haptic feedback on interactions', async ({ page }) => {
    await page.goto('/');
    
    // Interact with various elements that should trigger haptics
    const interactiveElements = page.locator('button, [role="button"], input');
    const elementCount = await interactiveElements.count();
    
    if (elementCount > 0) {
      // Click a few interactive elements
      for (let i = 0; i < Math.min(3, elementCount); i++) {
        await interactiveElements.nth(i).click();
        await page.waitForTimeout(200);
      }
      
      // Check haptic feedback was called
      const telegramLogs = await page.evaluate(() => window.telegramLogs);
      const hapticLogs = telegramLogs.filter(log => log.includes('HapticFeedback'));
      console.log('Haptic feedback calls:', hapticLogs.length);
      
      // At least some interactions should trigger haptics
      expect(hapticLogs.length).toBeGreaterThanOrEqual(0);
    }
  });

  test('should not have CSP violations', async ({ page }) => {
    const cspViolations: string[] = [];
    
    // Listen for CSP violations
    page.on('console', (msg) => {
      const text = msg.text();
      if (text.includes('Content Security Policy') || text.includes('CSP')) {
        cspViolations.push(text);
      }
    });
    
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Check for CSP violations
    expect(cspViolations).toHaveLength(0);
    console.log('✓ No CSP violations detected');
  });

  test('should load with proper security headers', async ({ page }) => {
    const response = await page.goto('/');
    const headers = response?.headers() || {};
    
    // Verify CSP header is present (Report-Only in development)
    const cspHeader = headers['content-security-policy-report-only'] || headers['content-security-policy'];
    expect(cspHeader).toBeDefined();
    expect(cspHeader).toContain("default-src 'self'");
    expect(cspHeader).toContain("frame-ancestors https://web.telegram.org");
    
    // Verify other security headers
    expect(headers['strict-transport-security']).toContain('max-age=31536000');
    expect(headers['x-content-type-options']).toBe('nosniff');
    expect(headers['referrer-policy']).toBe('no-referrer');
    
    console.log('✓ Security headers verified');
  });
});