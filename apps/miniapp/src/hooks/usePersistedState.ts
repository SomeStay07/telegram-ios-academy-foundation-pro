import { useState, useCallback } from 'react'

/**
 * Hook for persisting state to localStorage
 * Follows Performance Guidelines for UI caching
 */
export const usePersistedState = <T>(
  key: string, 
  defaultValue: T
): [T, (value: T) => void] => {
  const [state, setState] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : defaultValue
    } catch (error) {
      console.warn(`Failed to load persisted state for key "${key}":`, error)
      return defaultValue
    }
  })

  const setPersistedState = useCallback((value: T) => {
    try {
      setState(value)
      localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.warn(`Failed to persist state for key "${key}":`, error)
      // Still update state even if persistence fails
      setState(value)
    }
  }, [key])

  return [state, setPersistedState]
}