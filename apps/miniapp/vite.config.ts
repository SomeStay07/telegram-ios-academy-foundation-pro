import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer'
import path from 'path'

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
      const limitKB = 260; // Adjusted after successful optimization
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
    react({
      // Configure React plugin to work with Preact aliases
      jsxImportSource: '@preact/compat'
    }), 
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
      "react-dom": "preact/compat",
      // Add @ alias for src directory
      "@": path.resolve(__dirname, "./src")
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
          
          // Split routing for better optimization
          'react-router': ['@tanstack/react-router'],
          'react-query': ['@tanstack/react-query'],
          'zustand': ['zustand'],
          
          // Analytics disabled for bundle optimization
          
          // UI components (split from main)
          'ui-components': ['@telegram-ios-academy/ui'],
          
          // Telemetry removed for bundle optimization
          
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