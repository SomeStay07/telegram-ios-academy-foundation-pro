import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

// User slice types
interface User {
  username?: string
  languageCode?: string
  avatarUrl?: string
}

interface UserSlice {
  user: User
  updateProfile: (updates: Partial<User>) => void
}

// Roadmap slice types
interface Module {
  id: string
  title: string
  progress: number // 0-100
}

interface RoadmapSlice {
  modules: Module[]
  continueModule: () => void
  setModules: (modules: Module[]) => void
}

// Interview slice types
interface InterviewAttempt {
  attemptId?: string
  status: 'idle' | 'in_progress' | 'completed'
}

interface InterviewSlice {
  selectedCategory?: string
  currentAttempt: InterviewAttempt
  setCategory: (category: string) => void
  startAttempt: () => void
  resumeAttempt: () => void
  finishAttempt: () => void
}

// Combined store type
type AppStore = UserSlice & RoadmapSlice & InterviewSlice

// Initialize user from Telegram WebApp
const initUser = (): User => {
  const webAppUser = window.Telegram?.WebApp?.initDataUnsafe?.user
  return {
    username: webAppUser?.username,
    languageCode: webAppUser?.language_code || 'en',
    avatarUrl: undefined,
  }
}

export const useAppStore = create<AppStore>()(
  devtools(
    (set, get) => ({
      // User slice
      user: initUser(),
      updateProfile: (updates) =>
        set(
          (state) => ({
            user: { ...state.user, ...updates },
          }),
          false,
          'updateProfile'
        ),

      // Roadmap slice
      modules: [
        { id: 'ios-basics', title: 'iOS Basics', progress: 75 },
        { id: 'swift-fundamentals', title: 'Swift Fundamentals', progress: 100 },
        { id: 'uikit', title: 'UIKit', progress: 45 },
        { id: 'swiftui', title: 'SwiftUI', progress: 0 },
        { id: 'networking', title: 'Networking', progress: 0 },
        { id: 'core-data', title: 'Core Data', progress: 0 },
      ],
      continueModule: () => {
        // TODO: Navigate to the module with highest progress < 100
        const { modules } = get()
        const incompleteModule = modules.find(m => m.progress > 0 && m.progress < 100)
        console.log('Continue module:', incompleteModule?.title)
      },
      setModules: (modules) =>
        set({ modules }, false, 'setModules'),

      // Interview slice
      selectedCategory: undefined,
      currentAttempt: { status: 'idle' },
      setCategory: (category) =>
        set({ selectedCategory: category }, false, 'setCategory'),
      startAttempt: () =>
        set(
          {
            currentAttempt: {
              attemptId: `attempt_${Date.now()}`,
              status: 'in_progress',
            },
          },
          false,
          'startAttempt'
        ),
      resumeAttempt: () => {
        const { currentAttempt } = get()
        if (currentAttempt.attemptId) {
          console.log('Resume attempt:', currentAttempt.attemptId)
        }
      },
      finishAttempt: () =>
        set(
          {
            currentAttempt: { status: 'completed' },
          },
          false,
          'finishAttempt'
        ),
    }),
    {
      name: 'telegram-ios-academy-store',
    }
  )
)