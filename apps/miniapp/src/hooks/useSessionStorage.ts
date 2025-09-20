import { useState, useCallback } from 'react'

/**
 * Hook for temporary state persistence to sessionStorage
 * Follows Performance Guidelines for session data caching
 */
export const useSessionStorage = <T>(
  key: string, 
  defaultValue: T
): [T, (value: T) => void] => {
  const [state, setState] = useState<T>(() => {
    try {
      const item = sessionStorage.getItem(key)
      return item ? JSON.parse(item) : defaultValue
    } catch (error) {
      console.warn(`Failed to load session state for key "${key}":`, error)
      return defaultValue
    }
  })

  const setSessionState = useCallback((value: T) => {
    try {
      setState(value)
      sessionStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.warn(`Failed to persist session state for key "${key}":`, error)
      // Still update state even if persistence fails
      setState(value)
    }
  }, [key])

  return [state, setSessionState]
}