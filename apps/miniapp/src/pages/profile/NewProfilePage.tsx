import { useState, useEffect } from 'react'
import { Card, Badge, Button, ProfileHeroCard } from '@telegram-ios-academy/ui'
import { Languages, Palette, Bell, Smartphone, User, Hash, Copy, LogOut, RotateCcw } from 'lucide-react'
import { EnhancedProgressSection } from './sections/EnhancedProgressSection'
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

  // Mock stats for progress section
  const mockStats = {
    completed: 3,
    hours: 12,
    streak: 5
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
        console.log('Reset settings requested')
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
      <div className="space-y-4">
        <ProfileHeroCard 
          user={user || {
            first_name: 'Telegram',
            last_name: 'User',
            username: undefined,
            photo_url: undefined
          }}
          onCopyId={handleCopyId}
          className="mb-3"
        />

        {/* Progress Section */}
        <EnhancedProgressSection
          coursesCompleted={mockStats.completed}
          totalCourses={6}
          timeSpent={mockStats.hours}
          currentStreak={mockStats.streak}
          weeklyStreak={[1, 1, 0, 1, 1, 1, 0]} // Mon-Sun pattern
        />

        {/* Settings placeholder */}
        <Card className="bg-card text-card-foreground border-border rounded-2xl p-4 sm:p-5">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Settings & Preferences</h3>
            <p className="text-sm text-muted-foreground">
              Theme, language, notifications and other preferences will be available here.
            </p>
          </div>
        </Card>

        {/* Danger Zone */}
        <DangerZoneSection
          onSignOut={handleSignOut}
          onResetSettings={handleResetSettings}
        />
      </div>
    </main>
  )
}