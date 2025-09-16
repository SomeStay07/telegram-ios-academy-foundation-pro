import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { getDataSource, type ProfileData, type TGUser } from '../data/source'

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

// Profile slice types
interface ProfilePreferences {
  languageCode: string
  theme: 'system' | 'light' | 'dark'
  notificationsEnabled: boolean
}

interface ProfileSlice {
  profile: ProfileData | null
  activity: Array<{ id: string; title: string; subtitle: string; at: string }>
  preferences: ProfilePreferences
  dirty: boolean
  loading: boolean
  
  // Actions
  loadProfile: () => Promise<void>
  loadActivity: () => Promise<void>
  updatePreferences: (updates: Partial<ProfilePreferences>) => void
  savePreferences: () => Promise<void>
  signOut: () => void
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
type AppStore = UserSlice & RoadmapSlice & ProfileSlice & InterviewSlice

// Initialize user from Telegram WebApp
const initUser = (): User => {
  try {
    const webAppUser = (window as any)?.Telegram?.WebApp?.initDataUnsafe?.user
    return {
      username: webAppUser?.username || '',
      languageCode: webAppUser?.language_code || 'en',
      avatarUrl: undefined,
    }
  } catch (error) {
    return {
      username: '',
      languageCode: 'en',
      avatarUrl: undefined,
    }
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

      // Profile slice
      profile: null,
      activity: [],
      preferences: {
        languageCode: 'en',
        theme: 'system',
        notificationsEnabled: true,
      },
      dirty: false,
      loading: false,

      loadProfile: async () => {
        set({ loading: true }, false, 'profile:loadStart')
        try {
          const dataSource = getDataSource()
          const profile = await dataSource.getProfile()
          
          set(
            (state) => ({
              profile,
              preferences: {
                ...state.preferences,
                languageCode: profile.user.language_code || 'en',
              },
              loading: false,
            }),
            false,
            'profile:loadSuccess'
          )
        } catch (error) {
          console.error('Failed to load profile:', error)
          set({ loading: false }, false, 'profile:loadError')
        }
      },

      loadActivity: async () => {
        try {
          const dataSource = getDataSource()
          const activity = await dataSource.getActivity()
          set({ activity }, false, 'profile:activityLoaded')
        } catch (error) {
          console.error('Failed to load activity:', error)
        }
      },

      updatePreferences: (updates) =>
        set(
          (state) => ({
            preferences: { ...state.preferences, ...updates },
            dirty: true,
          }),
          false,
          'profile:updatePreferences'
        ),

      savePreferences: async () => {
        try {
          // TODO: Save to backend when available
          console.log('Saving preferences:', get().preferences)
          
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 500))
          
          set({ dirty: false }, false, 'profile:savePreferences')
          
          // Show success feedback
          const { WebApp } = (window as any)?.Telegram || {}
          if (WebApp?.showAlert) {
            WebApp.showAlert('Settings saved successfully!')
          } else if (import.meta.env.DEV) {
            console.log('Settings saved successfully!')
          }
        } catch (error) {
          console.error('Failed to save preferences:', error)
        }
      },

      signOut: () => {
        set(
          {
            profile: null,
            activity: [],
            preferences: {
              languageCode: 'en',
              theme: 'system',
              notificationsEnabled: true,
            },
            dirty: false,
          },
          false,
          'profile:signOut'
        )
        
        // Navigate to main or show sign out feedback
        console.log('User signed out')
      },

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