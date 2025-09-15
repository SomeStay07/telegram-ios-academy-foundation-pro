import { useState, useEffect } from 'react'
import { Badge } from '@telegram-ios-academy/ui'
import { useTelegramUser } from '../../shared/lib/telegram/useTelegramUser'
import { useTelegramTheme } from '../../shared/lib/telegram/useTelegramTheme'
import { useTelegramViewport } from '../../shared/lib/telegram/useTelegramViewport'
import { useAppStore } from '../../shared/model/store'

import { AccountSection } from './sections/AccountSection'
import { PreferencesSection } from './sections/PreferencesSection'
import { ProgressSection } from './sections/ProgressSection'
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
    if (user) {
      const newPrefs = {
        languageCode: user.languageCode,
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
    if (!WebApp?.MainButton) return

    if (hasUnsavedChanges) {
      WebApp.MainButton.text = 'Save'
      WebApp.MainButton.show()
      WebApp.MainButton.enable()
      
      const handleSave = () => {
        // Save preferences
        store?.updateProfile?.(preferences)
        setInitialPreferences(preferences)
        
        // Show success feedback
        WebApp.HapticFeedback?.impactOccurred?.('light')
        WebApp.showAlert('Settings saved successfully!')
      }

      WebApp.MainButton.onClick(handleSave)
      
      return () => {
        WebApp.MainButton.offClick(handleSave)
      }
    } else {
      WebApp.MainButton.hide()
    }
  }, [hasUnsavedChanges, preferences, store])

  // Handlers
  const handleCopyId = (id: number) => {
    navigator.clipboard.writeText(id.toString())
    const { WebApp } = (window as any)?.Telegram || {}
    WebApp?.HapticFeedback?.impactOccurred?.('light')
    WebApp?.showAlert('User ID copied to clipboard!')
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
    WebApp?.showConfirm('Are you sure you want to sign out?', (confirmed: boolean) => {
      if (confirmed) {
        store?.signOut?.()
        WebApp?.HapticFeedback?.impactOccurred?.('medium')
      }
    })
  }

  const handleResetSettings = () => {
    const { WebApp } = (window as any)?.Telegram || {}
    WebApp?.showConfirm('Reset all settings to defaults?', (confirmed: boolean) => {
      if (confirmed) {
        const defaultPrefs = {
          languageCode: user?.languageCode || 'en',
          theme: 'system' as const,
          notificationsEnabled: true,
        }
        setPreferences(defaultPrefs)
        WebApp?.HapticFeedback?.impactOccurred?.('medium')
      }
    })
  }

  if (!user) {
    return (
      <main className="mx-auto w-full max-w-[640px] px-3 sm:px-4 py-3 pb-24 min-h-[calc(var(--tg-vph,100svh))]">
        <div className="flex items-center justify-center h-64">
          <p className="text-muted-foreground">Loading profile...</p>
        </div>
      </main>
    )
  }

  return (
    <main className="mx-auto w-full max-w-[640px] px-3 sm:px-4 py-3 pb-24 min-h-[calc(var(--tg-vph,100svh))] bg-background text-foreground">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-4 mb-2">
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl font-bold text-foreground truncate">
              {user.fullName}
            </h1>
            <div className="flex items-center gap-2 mt-1">
              {user.username && (
                <p className="text-muted-foreground truncate">@{user.username}</p>
              )}
              <Badge variant="outline" className="text-xs">
                {user.languageCode.toUpperCase()}
              </Badge>
            </div>
          </div>
        </div>
        <p className="text-xs text-muted-foreground">
          Data synced from Telegram
        </p>
      </div>

      {/* Content */}
      <div className="space-y-4">
        <AccountSection
          user={user}
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

        <ProgressSection
          coursesCompleted={3}
          totalCourses={6}
          interviewsAttempted={12}
          averageScore={85}
        />

        <DangerZoneSection
          onSignOut={handleSignOut}
          onResetSettings={handleResetSettings}
        />
      </div>
    </main>
  )
}