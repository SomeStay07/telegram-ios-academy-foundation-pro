// Utility to prevent Vite from preloading dynamic imports
export function lazyImport<T = any>(moduleFactory: () => Promise<T>): () => Promise<T> {
  return () => moduleFactory()
}