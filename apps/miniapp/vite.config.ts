import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: { 
    port: 5173, 
    strictPort: true 
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Core React
          'react-vendor': ['react', 'react-dom'],
          
          // Routing and State Management
          'routing': ['@tanstack/react-router', '@tanstack/react-query', 'zustand'],
          
          // Analytics (lazy loaded)
          'analytics': ['posthog-js'],
          
          // OpenTelemetry (lazy loaded)
          'telemetry': [
            '@opentelemetry/api',
            '@opentelemetry/sdk-trace-web', 
            '@opentelemetry/auto-instrumentations-web'
          ],
          
          // i18n
          'i18n': ['i18next', 'react-i18next'],
          
          // Form handling
          'forms': ['react-hook-form', '@hookform/resolvers']
        }
      }
    },
    // Target smaller initial bundle
    chunkSizeWarningLimit: 400, // Reduced from default 500
    
    // Enable tree shaking - use default minifier
    minify: true
  }
})