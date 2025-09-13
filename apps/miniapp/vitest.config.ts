import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    include: ['src/**/*.{test,spec}.{js,ts,jsx,tsx}'],
    coverage: {
      provider: 'v8',
      include: ['src/**/*.{js,ts,jsx,tsx}'],
      exclude: [
        'src/**/*.test.{js,ts,jsx,tsx}',
        'src/**/*.spec.{js,ts,jsx,tsx}',
        'src/test/**',
        'src/vite-env.d.ts'
      ]
    }
  }
})