import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  define: {
    'import.meta.env.MODE': JSON.stringify('test'),
    'import.meta.env.VITE_ENABLE_ANALYTICS': JSON.stringify('0'),
    'import.meta.env.VITE_ANALYTICS_PROXY': JSON.stringify('0'),
    'import.meta.env.VITE_POSTHOG_API_KEY': JSON.stringify(''),
    'import.meta.env.PROD': JSON.stringify(false),
    'import.meta.env.DEV': JSON.stringify(false),
    'import.meta.env.VITE_APP_VERSION': JSON.stringify('test'),
    '__DEV__': JSON.stringify(false),
    '__REACT_DEVTOOLS_GLOBAL_HOOK__.isDisabled': JSON.stringify(true)
  },
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
    testTimeout: 15000,
    hookTimeout: 15000,
    teardownTimeout: 15000,
    isolate: false,
    pool: 'threads',
    poolOptions: {
      threads: {
        singleThread: true
      }
    },
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