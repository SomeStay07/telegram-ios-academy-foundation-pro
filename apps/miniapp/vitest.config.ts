import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@telegram-ios-academy/ui': path.resolve(__dirname, '../../packages/ui/src'),
      '@telegram-ios-academy/tokens': path.resolve(__dirname, '../../packages/tokens/src')
    }
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    include: ['src/**/*.{test,spec}.{js,ts,jsx,tsx}'],
    exclude: ['src/**/*.e2e.{js,ts,jsx,tsx}', 'node_modules/**'],
    testTimeout: 10000,
    hookTimeout: 10000,
    teardownTimeout: 10000,
    isolate: true,
    pool: 'forks',
    coverage: {
      provider: 'v8',
      include: ['src/**/*.{js,ts,jsx,tsx}'],
      exclude: [
        'src/**/*.test.{js,ts,jsx,tsx}',
        'src/**/*.spec.{js,ts,jsx,tsx}',
        'src/**/*.e2e.{js,ts,jsx,tsx}',
        'src/test/**',
        'src/vite-env.d.ts',
        'src/main.tsx'
      ],
      reporter: ['text', 'json', 'html'],
      reportsDirectory: './coverage'
    },
    mockReset: true,
    clearMocks: true,
    restoreMocks: true
  }
})