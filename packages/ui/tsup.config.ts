import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts', 'src/styles/index.css'],
  format: ['esm', 'cjs'],
  dts: false,
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