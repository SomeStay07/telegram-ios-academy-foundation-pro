import { useState, useEffect } from 'react'
import { Card, Badge, Button, ProfileHeroCard } from '@telegram-ios-academy/ui'
import { ProfileStatsSection } from './sections/ProfileStatsSection'
import { ProfileSettingsSection } from './sections/ProfileSettingsSection'
import { DangerZoneSection } from './sections/DangerZoneSection'
import { useTelegramTheme } from '../../shared/lib/telegram/useTelegramTheme'
import { useTelegramViewport } from '../../shared/lib/telegram/useTelegramViewport'
import { getDataSource } from '../../shared/data/source'

export function NewProfilePage() {
  // Initialize Telegram integrations
  useTelegramTheme()
  useTelegramViewport()

  const [user, setUser] = useState<any | null>(null)
  const [loading, setLoading] = useState(true)
  const [preferences, setPreferences] = useState({
    theme: 'system' as 'system' | 'light' | 'dark',
    language: 'ru',
    notifications: true
  })

  // Enhanced mock stats
  const mockStats = {
    completed: 3,
    hours: 12,
    streak: 5,
    level: 8
  }

  // Load data on mount
  useEffect(() => {
    getDataSource()
      .getProfile()
      .then(r => {
        setUser(r.user)
        setLoading(false)
      })
  }, [])

  // MainButton integration - hide for profile page
  useEffect(() => {
    const { WebApp } = (window as any)?.Telegram || {}
    const mainButton = WebApp?.MainButton
    
    if (mainButton) {
      mainButton.hide()
    }
  }, [])

  // BackButton integration - hide on profile root
  useEffect(() => {
    const { WebApp } = (window as any)?.Telegram || {}
    const backButton = WebApp?.BackButton
    
    if (backButton) {
      backButton.hide()
    }
  }, [])

  // Handlers
  const handleCopyId = async (id?: number) => {
    if (!id) return
    await navigator.clipboard.writeText(String(id))
    const { WebApp } = (window as any)?.Telegram || {}
    
    if (WebApp?.HapticFeedback?.selectionChanged) {
      WebApp.HapticFeedback.selectionChanged()
    }
    
    if (WebApp?.showAlert) {
      WebApp.showAlert('User ID copied to clipboard!')
    } else if (import.meta.env.DEV) {
      console.log('User ID copied to clipboard!')
    }
  }

  // Handlers for profile actions
  const handleSignOut = () => {
    const { WebApp } = (window as any)?.Telegram || {}
    
    const confirmAction = (confirmed: boolean) => {
      if (confirmed) {
        console.log('Sign out requested')
        if (WebApp?.HapticFeedback) {
          WebApp.HapticFeedback.impactOccurred('medium')
        }
      }
    }
    
    if (WebApp?.showConfirm) {
      WebApp.showConfirm('Are you sure you want to sign out?', confirmAction)
    } else if (import.meta.env.DEV) {
      const confirmed = confirm('Are you sure you want to sign out?')
      confirmAction(confirmed)
    }
  }

  const handleResetSettings = () => {
    const { WebApp } = (window as any)?.Telegram || {}
    
    const confirmAction = (confirmed: boolean) => {
      if (confirmed) {
        setPreferences({
          theme: 'system',
          language: 'ru',
          notifications: true
        })
        console.log('Settings reset to defaults')
        if (WebApp?.HapticFeedback) {
          WebApp.HapticFeedback.impactOccurred('medium')
        }
      }
    }
    
    if (WebApp?.showConfirm) {
      WebApp.showConfirm('Reset all settings to defaults?', confirmAction)
    } else if (import.meta.env.DEV) {
      const confirmed = confirm('Reset all settings to defaults?')
      confirmAction(confirmed)
    }
  }

  // Settings handlers
  const handleThemeChange = (theme: 'system' | 'light' | 'dark') => {
    setPreferences(prev => ({ ...prev, theme }))
    console.log('Theme changed to:', theme)
  }

  const handleLanguageChange = (language: string) => {
    setPreferences(prev => ({ ...prev, language }))
    console.log('Language changed to:', language)
  }

  const handleNotificationsToggle = (notifications: boolean) => {
    setPreferences(prev => ({ ...prev, notifications }))
    console.log('Notifications toggled:', notifications)
  }

  if (loading) {
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

  return (
    <main className="mx-auto w-full max-w-[640px] px-3 sm:px-4 py-3 pb-24 min-h-[calc(var(--tg-vph,100svh))] bg-background text-foreground">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-4 mb-2 min-w-0">
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl font-bold text-foreground truncate">
              Profile
            </h1>
            <div className="flex items-center gap-2 mt-1 min-w-0">
              <Badge variant="outline" className="text-xs flex-shrink-0">
                EN
              </Badge>
            </div>
          </div>
        </div>
        <p className="text-xs text-muted-foreground line-clamp-2">
          {user ? 'Data synced from Telegram' : 'Using mock profile data'}
        </p>
      </div>

      {/* Content */}
      <div className="space-y-6">
        {/* Hero Card with enhanced features */}
        <ProfileHeroCard 
          user={{
            ...user,
            first_name: user?.first_name || 'Timur',
            last_name: user?.last_name || 'C.',
            username: user?.username || 'somestay07',
            photo_url: user?.photo_url,
            is_premium: true, // Mock premium status
            language_code: preferences.language
          }}
          stats={mockStats}
          onCopyId={handleCopyId}
        />

        {/* Statistics Section */}
        <ProfileStatsSection
          stats={mockStats}
          totalCourses={6}
          weeklyStreak={[1, 1, 0, 1, 1, 1, 0]}
        />

        {/* Settings Section */}
        <ProfileSettingsSection
          preferences={preferences}
          onThemeChange={handleThemeChange}
          onLanguageChange={handleLanguageChange}
          onNotificationsToggle={handleNotificationsToggle}
        />

        {/* Danger Zone */}
        <DangerZoneSection
          onSignOut={handleSignOut}
          onResetSettings={handleResetSettings}
        />
      </div>
    </main>
  )
}