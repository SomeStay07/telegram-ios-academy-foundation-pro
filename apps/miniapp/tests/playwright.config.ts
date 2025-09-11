import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  testIgnore: '**/contracts/**',
  timeout: 60000,
  use: {
    baseURL: process.env.MINIAPP_BASE_URL || 'http://localhost:5173',
    headless: true,
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] }
    }
  ],
  // webServer: {
  //   command: 'pnpm build && NODE_ENV=development pnpm serve',
  //   port: 5173,
  //   reuseExistingServer: !process.env.CI,
  // },
});