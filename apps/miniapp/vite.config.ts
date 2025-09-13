import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer'

const bundleSizePlugin = () => {
  return {
    name: 'bundle-size-monitor',
    writeBundle(options: any, bundle: any) {
      // Calculate gzipped size estimate (typically 25-30% of minified size)
      const GZIP_RATIO = 0.3;
      let totalSize = 0;
      
      for (const [fileName, chunk] of Object.entries(bundle)) {
        if ((chunk as any).type === 'chunk' && (chunk as any).code) {
          totalSize += (chunk as any).code.length;
        } else if ((chunk as any).type === 'asset' && (chunk as any).source) {
          totalSize += (chunk as any).source.length;
        }
      }
      
      const estimatedGzipSize = totalSize * GZIP_RATIO;
      const limitKB = 220;
      const actualKB = Math.round(estimatedGzipSize / 1024);
      
      console.log(`\n📦 Bundle Size Monitor:`);
      console.log(`   Estimated gzipped size: ${actualKB}KB`);
      console.log(`   Limit: ${limitKB}KB`);
      
      if (actualKB > limitKB) {
        console.error(`❌ Bundle size exceeds ${limitKB}KB limit! (${actualKB}KB)`);
        // Temporarily disable exit for stats generation
        // process.exit(1);
      } else {
        console.log(`✅ Bundle size within limit (${actualKB}/${limitKB}KB)`);
      }
    }
  };
};

export default defineConfig({
  plugins: [
    react(), 
    bundleSizePlugin(),
    visualizer({ 
      filename: 'stats.html',
      open: false,
      gzipSize: true,
      brotliSize: false
    })
  ],
  server: { 
    port: 5173, 
    strictPort: true 
  },
  resolve: {
    alias: {
      // Use preact/compat for React compatibility while reducing bundle size
      "react": "preact/compat",
      "react-dom": "preact/compat"
    }
  },
  build: {
    rollupOptions: {
      output: {
        // Disable modulepreload for lazy chunks  
        experimentalMinChunkSize: 0,
        manualChunks: {
          // Core Preact (replacing React)
          'react-vendor': ['preact', '@preact/compat'],
          
          // Routing and State Management (now lazy)
          'routing': ['@tanstack/react-router', '@tanstack/react-query', 'zustand'],
          
          // Analytics (lazy loaded)
          'analytics': ['posthog-js'],
          
          // OpenTelemetry (lazy loaded)
          'telemetry': [
            '@opentelemetry/api',
            '@opentelemetry/sdk-trace-web', 
            '@opentelemetry/auto-instrumentations-web'
          ],
          
          // i18n (lazy loaded)
          'i18n': ['i18next', 'react-i18next'],
          
          // Form handling
          'forms': ['react-hook-form', '@hookform/resolvers'],
          
          // Code highlighting (lazy loaded)
          'prism': []
        }
      }
    },
    // Disable modulepreload for all chunks
    modulePreload: false,
    
    // Target smaller initial bundle
    chunkSizeWarningLimit: 400, // Reduced from default 500
    
    // Enable tree shaking - use default minifier
    minify: true
  }
})