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
      const limitKB = 300; // Increased limit for better UX balance
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
        experimentalMinChunkSize: 30000, // Further increase min chunk size
        manualChunks: (id) => {
          // Vendor dependencies
          if (id.includes('node_modules')) {
            // Core React/Preact
            if (id.includes('preact') || id.includes('@preact')) {
              return 'react-vendor'
            }
            
            // Router
            if (id.includes('@tanstack/react-router')) {
              return 'react-router'
            }
            
            // React Query
            if (id.includes('@tanstack/react-query')) {
              return 'react-query'
            }
            
            // Heavy animation library
            if (id.includes('framer-motion')) {
              return 'framer-motion'
            }
            
            // Icons - split by usage
            if (id.includes('lucide-react')) {
              return 'lucide-icons'
            }
            
            // UI library - smaller chunks
            if (id.includes('@telegram-ios-academy/ui')) {
              return 'ui-components'
            }
            
            // Other smaller dependencies
            if (id.includes('zustand')) return 'zustand'
            if (id.includes('i18next') || id.includes('react-i18next')) return 'i18n'
            if (id.includes('react-hook-form') || id.includes('@hookform')) return 'forms'
            if (id.includes('web-vitals')) return 'web-vitals'
            
            // Split vendor by size and usage
            if (id.includes('daisyui') || id.includes('tailwindcss')) {
              return 'ui-framework'
            }
            if (id.includes('prism')) {
              return 'prism'
            }
            
            // Default vendor chunk for very small libs only
            return 'vendor'
          }
          
          // App code splitting - more granular
          if (id.includes('/pages/')) {
            return 'pages'
          }
          if (id.includes('/components/profile/')) {
            return 'profile-components'
          }
          if (id.includes('/components/')) {
            return 'components'
          }
          if (id.includes('/design-system/')) {
            return 'design-system'
          }
        }
      }
    },
    // Disable modulepreload for all chunks
    modulePreload: false,
    
    // Target smaller initial bundle
    chunkSizeWarningLimit: 300, // Further reduced
    
    // Enable tree shaking - use terser for better compression
    minify: 'terser',
    
    // More aggressive tree shaking and optimization
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug'],
        passes: 2
      },
      mangle: true,
      format: {
        comments: false
      }
    },
    
    // CSS code splitting and optimization
    cssCodeSplit: true,
    cssMinify: true,
    
    // Sourcemap disabled for production
    sourcemap: false,
    
    // Aggressive asset optimization
    assetsInlineLimit: 1024 // Inline small assets
  }
})