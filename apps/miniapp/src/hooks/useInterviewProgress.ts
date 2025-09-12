import { useState, useCallback, useEffect } from 'react'
import type { InterviewProgress } from '../ui/src/renderer/InterviewRenderer'

const STORAGE_KEY = 'interview_progress'

interface StoredProgress {
  [interviewId: string]: InterviewProgress
}

export function useInterviewProgress() {
  const [progress, setProgress] = useState<StoredProgress>({})

  // Load progress from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored)
        setProgress(parsed)
      }
    } catch (error) {
      console.error('Failed to load interview progress:', error)
    }
  }, [])

  // Save progress to localStorage
  const saveProgress = useCallback((interviewProgress: InterviewProgress) => {
    try {
      setProgress(prev => {
        const updated = {
          ...prev,
          [interviewProgress.interview_id]: interviewProgress
        }
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
        return updated
      })
    } catch (error) {
      console.error('Failed to save interview progress:', error)
    }
  }, [])

  // Get progress for specific interview
  const getProgress = useCallback((interviewId: string): InterviewProgress | undefined => {
    return progress[interviewId]
  }, [progress])

  // Clear progress for specific interview
  const clearProgress = useCallback((interviewId: string) => {
    try {
      setProgress(prev => {
        const updated = { ...prev }
        delete updated[interviewId]
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
        return updated
      })
    } catch (error) {
      console.error('Failed to clear interview progress:', error)
    }
  }, [])

  // Clear all progress
  const clearAllProgress = useCallback(() => {
    try {
      setProgress({})
      localStorage.removeItem(STORAGE_KEY)
    } catch (error) {
      console.error('Failed to clear all progress:', error)
    }
  }, [])

  return {
    progress,
    saveProgress,
    getProgress,
    clearProgress,
    clearAllProgress
  }
}