import { useState, useEffect } from 'react'
import { Badge } from '@telegram-ios-academy/ui'
import { useTelegramUser } from '../../shared/lib/telegram/useTelegramUser'
import { useTelegramTheme } from '../../shared/lib/telegram/useTelegramTheme'
import { useTelegramViewport } from '../../shared/lib/telegram/useTelegramViewport'
import { useAppStore } from '../../shared/model/store'

import { AccountSection } from './sections/AccountSection'
import { PreferencesSection } from './sections/PreferencesSection'
import { SkillsProgressSection } from './sections/SkillsProgressSection'
import { ActivityStatsSection } from './sections/ActivityStatsSection'
import { DangerZoneSection } from './sections/DangerZoneSection'

interface ProfilePreferences {
  languageCode: string
  theme: 'system' | 'light' | 'dark'
  notificationsEnabled: boolean
}

export function ProfilePage() {
  const user = useTelegramUser()
  const store = useAppStore()
  
  // Initialize Telegram integrations
  useTelegramTheme()
  useTelegramViewport()

  // Local state for preferences
  const [preferences, setPreferences] = useState<ProfilePreferences>({
    languageCode: user?.languageCode || 'en',
    theme: 'system',
    notificationsEnabled: true,
  })

  const [initialPreferences, setInitialPreferences] = useState<ProfilePreferences>(preferences)
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)

  // Sync with user data when available
  useEffect(() => {
    if (user || !preferences.languageCode) {
      const currentUser = user || {
        languageCode: 'en',
      }
      const newPrefs = {
        languageCode: currentUser.languageCode,
        theme: 'system' as const,
        notificationsEnabled: true,
      }
      setPreferences(newPrefs)
      setInitialPreferences(newPrefs)
    }
  }, [user])

  // Track changes for MainButton
  useEffect(() => {
    const hasChanges = JSON.stringify(preferences) !== JSON.stringify(initialPreferences)
    setHasUnsavedChanges(hasChanges)
  }, [preferences, initialPreferences])

  // MainButton integration
  useEffect(() => {
    const { WebApp } = (window as any)?.Telegram || {}
    
    // Mock MainButton for development
    const isDevelopment = import.meta.env.DEV
    const mainButton = WebApp?.MainButton || (isDevelopment ? {
      text: '',
      show: () => console.log('MainButton.show()'),
      hide: () => console.log('MainButton.hide()'),
      enable: () => console.log('MainButton.enable()'),
      disable: () => console.log('MainButton.disable()'),
      onClick: (fn: () => void) => {
        console.log('MainButton.onClick() - simulating click')
        if (isDevelopment) {
          // Auto-trigger save in development after 2 seconds
          setTimeout(fn, 100)
        }
      },
      offClick: () => console.log('MainButton.offClick()'),
    } : null)

    if (!mainButton) return

    if (hasUnsavedChanges) {
      mainButton.text = 'Save'
      mainButton.show()
      mainButton.enable()
      
      const handleSave = () => {
        // Save preferences
        store?.updateProfile?.(preferences)
        setInitialPreferences(preferences)
        
        // Show success feedback
        if (WebApp?.HapticFeedback) {
          WebApp.HapticFeedback.impactOccurred('light')
        }
        
        if (WebApp?.showAlert) {
          WebApp.showAlert('Settings saved successfully!')
        } else if (isDevelopment) {
          console.log('Settings saved successfully!')
          alert('Settings saved successfully!')
        }
      }

      mainButton.onClick(handleSave)
      
      return () => {
        mainButton.offClick(handleSave)
      }
    } else {
      mainButton.hide()
    }
  }, [hasUnsavedChanges, preferences, store])

  // Handlers
  const handleCopyId = (id: number) => {
    navigator.clipboard.writeText(id.toString())
    const { WebApp } = (window as any)?.Telegram || {}
    const isDevelopment = import.meta.env.DEV
    
    if (WebApp?.HapticFeedback) {
      WebApp.HapticFeedback.impactOccurred('light')
    }
    
    if (WebApp?.showAlert) {
      WebApp.showAlert('User ID copied to clipboard!')
    } else if (isDevelopment) {
      console.log('User ID copied to clipboard!')
      alert('User ID copied to clipboard!')
    }
  }

  const handleLanguageChange = (languageCode: string) => {
    setPreferences(prev => ({ ...prev, languageCode }))
  }

  const handleThemeChange = (theme: 'system' | 'light' | 'dark') => {
    setPreferences(prev => ({ ...prev, theme }))
  }

  const handleNotificationsToggle = (notificationsEnabled: boolean) => {
    setPreferences(prev => ({ ...prev, notificationsEnabled }))
  }

  const handleSignOut = () => {
    const { WebApp } = (window as any)?.Telegram || {}
    const isDevelopment = import.meta.env.DEV
    
    const confirmAction = (confirmed: boolean) => {
      if (confirmed) {
        store?.signOut?.()
        if (WebApp?.HapticFeedback) {
          WebApp.HapticFeedback.impactOccurred('medium')
        }
      }
    }
    
    if (WebApp?.showConfirm) {
      WebApp.showConfirm('Are you sure you want to sign out?', confirmAction)
    } else if (isDevelopment) {
      const confirmed = confirm('Are you sure you want to sign out?')
      confirmAction(confirmed)
    }
  }

  const handleResetSettings = () => {
    const { WebApp } = (window as any)?.Telegram || {}
    const isDevelopment = import.meta.env.DEV
    
    const confirmAction = (confirmed: boolean) => {
      if (confirmed) {
        const defaultPrefs = {
          languageCode: user?.languageCode || 'en',
          theme: 'system' as const,
          notificationsEnabled: true,
        }
        setPreferences(defaultPrefs)
        if (WebApp?.HapticFeedback) {
          WebApp.HapticFeedback.impactOccurred('medium')
        }
      }
    }
    
    if (WebApp?.showConfirm) {
      WebApp.showConfirm('Reset all settings to defaults?', confirmAction)
    } else if (isDevelopment) {
      const confirmed = confirm('Reset all settings to defaults?')
      confirmAction(confirmed)
    }
  }

  // Show loading state briefly, but don't block indefinitely
  const [isLoading, setIsLoading] = useState(true)
  
  useEffect(() => {
    if (user) {
      setIsLoading(false)
    } else {
      // Stop loading after a reasonable time even if no user data
      const timer = setTimeout(() => setIsLoading(false), 2000)
      return () => clearTimeout(timer)
    }
  }, [user])

  if (isLoading && !user) {
    return (
      <main className="mx-auto w-full max-w-[640px] px-3 sm:px-4 py-3 pb-24 min-h-[calc(var(--tg-vph,100svh))] bg-background text-foreground">
        <div className="flex items-center justify-center h-64">
          <div className="text-center space-y-2">
            <div className="animate-spin w-6 h-6 border-2 border-primary border-t-transparent rounded-full mx-auto"></div>
            <p className="text-muted-foreground text-sm">Loading profile...</p>
          </div>
        </div>
      </main>
    )
  }

  // Fallback user if still no data after loading
  const displayUser = user || {
    id: 999999999,
    username: undefined,
    fullName: 'Telegram User',
    languageCode: 'en',
    avatarUrl: undefined,
  }

  return (
    <main className="mx-auto w-full max-w-[640px] px-3 sm:px-4 py-3 pb-24 min-h-[calc(var(--tg-vph,100svh))] bg-background text-foreground">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-4 mb-2 min-w-0">
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl font-bold text-foreground truncate">
              {displayUser.fullName}
            </h1>
            <div className="flex items-center gap-2 mt-1 min-w-0">
              {displayUser.username && (
                <p className="text-muted-foreground truncate flex-shrink">@{displayUser.username}</p>
              )}
              <Badge variant="outline" className="text-xs flex-shrink-0">
                {displayUser.languageCode.toUpperCase()}
              </Badge>
            </div>
          </div>
        </div>
        <p className="text-xs text-muted-foreground line-clamp-2">
          {user ? 'Data synced from Telegram' : 'Using default profile data'}
        </p>
      </div>

      {/* Content */}
      <div className="space-y-4">
        <AccountSection
          user={displayUser}
          onCopyId={handleCopyId}
        />

        <PreferencesSection
          languageCode={preferences.languageCode}
          theme={preferences.theme}
          notificationsEnabled={preferences.notificationsEnabled}
          onLanguageChange={handleLanguageChange}
          onThemeChange={handleThemeChange}
          onNotificationsToggle={handleNotificationsToggle}
        />

        <SkillsProgressSection
          coursesCompleted={3}
          totalCourses={6}
        />

        <ActivityStatsSection
          interviewsAttempted={12}
          averageScore={85}
          currentStreak={7}
          bestStreak={14}
          totalStudyTime={1680}
          weeklyXP={420}
          monthlyXP={1580}
          achievements={12}
        />

        <DangerZoneSection
          onSignOut={handleSignOut}
          onResetSettings={handleResetSettings}
        />
      </div>
    </main>
  )
}