import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  treeshake: true,
  external: [
    'react', 
    'react-dom',
    'react-aria',
    'react-stately',
    'clsx',
    'dompurify',
    'marked',
    'prismjs',
    'sanitize-html'
  ],
  esbuildOptions(options) {
    options.banner = {
      js: '"use client"',
    }
    // Enhanced tree-shaking
    options.treeShaking = true
  },
  // Skip dts build issues for now
  onSuccess: 'echo "Build completed successfully"',
  // Enable conditional exports for better tree-shaking
  outExtension({ format }) {
    return {
      js: format === 'cjs' ? '.cjs' : '.js',
    }
  },
})