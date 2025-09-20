import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  // In CI, run core routing tests and smoke tests
  testMatch: process.env.CI ? ['**/basic-smoke.spec.ts.playwright', '**/route-navigation.spec.ts.playwright'] : '**/*.spec.ts.playwright',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://127.0.0.1:5173',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  // webServer disabled in CI - manually started in GitHub Actions
  ...(process.env.CI ? {} : {
    webServer: {
      command: 'pnpm dev',
      url: 'http://127.0.0.1:5173',
      reuseExistingServer: true,
      timeout: 120 * 1000,
    },
  }),
});