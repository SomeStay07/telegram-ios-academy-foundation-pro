import { useState, useEffect, useRef, useMemo } from 'react'

export interface IntersectionObserverOptions {
  threshold?: number | number[]
  rootMargin?: string
  root?: Element | null
}

/**
 * Optimized Intersection Observer hook for lazy loading
 * Follows Performance Guidelines for component optimization
 */
export const useIntersectionObserver = (
  options: IntersectionObserverOptions = {}
) => {
  const [isIntersecting, setIsIntersecting] = useState(false)
  const [hasIntersected, setHasIntersected] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  // Memoize options to prevent observer recreation
  const memoizedOptions = useMemo(() => ({
    threshold: 0.1,
    rootMargin: '50px',
    ...options
  }), [options.threshold, options.rootMargin, options.root])

  useEffect(() => {
    const currentRef = ref.current
    if (!currentRef) return

    const observer = new IntersectionObserver(([entry]) => {
      const isCurrentlyIntersecting = entry.isIntersecting
      setIsIntersecting(isCurrentlyIntersecting)
      
      // Once intersected, keep it true for lazy loading
      if (isCurrentlyIntersecting && !hasIntersected) {
        setHasIntersected(true)
      }
    }, memoizedOptions)

    observer.observe(currentRef)
    
    return () => {
      observer.disconnect()
    }
  }, [memoizedOptions, hasIntersected])

  return {
    ref,
    isIntersecting,
    hasIntersected
  }
}

/**
 * Hook for infinite scroll implementation
 */
export const useInfiniteScroll = (
  loadMore: () => void,
  options: IntersectionObserverOptions = {}
) => {
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold: 1.0,
    rootMargin: '100px',
    ...options
  })

  useEffect(() => {
    if (isIntersecting) {
      loadMore()
    }
  }, [isIntersecting, loadMore])

  return ref
}