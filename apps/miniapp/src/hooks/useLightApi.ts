// Lightweight API hooks for initial load
// Full API functionality is loaded lazily when needed
import { useState, useEffect } from 'react'
import { VITE } from '../env'

const API_BASE_URL = VITE.API_BASE_URL

// Simple health check without React Query
export function useLightApiHealth() {
  const [isHealthy, setIsHealthy] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    
    fetch(`${API_BASE_URL}/health`, { 
      method: 'GET',
      timeout: 3000 // 3 second timeout
    } as RequestInit)
      .then(res => {
        if (mounted) {
          setIsHealthy(res.ok)
          setLoading(false)
        }
      })
      .catch(() => {
        if (mounted) {
          setIsHealthy(false)
          setLoading(false)
        }
      })

    return () => { mounted = false }
  }, [])

  return { isHealthy, loading }
}

// Lazy load full API hooks when needed
export async function loadFullApiHooks() {
  const { useApiHealth, useUserProgress, useSubmitLessonAttempt, useUpdateProgress } = await import('./useApi')
  return { useApiHealth, useUserProgress, useSubmitLessonAttempt, useUpdateProgress }
}