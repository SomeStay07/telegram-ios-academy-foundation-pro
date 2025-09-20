/**
 * Performance optimization hooks
 * Centralized exports for caching and optimization utilities
 * Follows Performance Guidelines for optimal React patterns
 */

// State persistence hooks
export { usePersistedState } from '../usePersistedState'
export { useSessionStorage } from '../useSessionStorage'

// Telegram-specific caching
export { 
  useTelegramDataCache, 
  useTelegramThemeCache, 
  useTelegramInitDataCache 
} from '../useTelegramCache'

// React Query caching
export { 
  useApiQuery,
  useUserProfileCache,
  useUserAchievementsCache,
  useUserActivityCache,
  usePrefetchProfile,
  useApiMutation
} from '../useReactQueryCache'

// Intersection Observer for lazy loading
export { 
  useIntersectionObserver, 
  useInfiniteScroll 
} from '../useIntersectionObserver'

// Performance utilities
export type { IntersectionObserverOptions } from '../useIntersectionObserver'