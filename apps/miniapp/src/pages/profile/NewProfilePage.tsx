import { useState, useEffect } from 'react'
import { Card, Badge, Button, AccountCard } from '@telegram-ios-academy/ui'
import { Languages, Palette, Bell, Smartphone, User, Hash, Copy, LogOut, RotateCcw } from 'lucide-react'
import { EnhancedProgressSection } from './sections/EnhancedProgressSection'
import { DangerZoneSection } from './sections/DangerZoneSection'
import { useTelegramTheme } from '../../shared/lib/telegram/useTelegramTheme'
import { useTelegramViewport } from '../../shared/lib/telegram/useTelegramViewport'
import { useAppStore } from '../../shared/model/store'

export function NewProfilePage() {
  const {
    profile,
    activity,
    preferences,
    dirty,
    loading,
    loadProfile,
    loadActivity,
    updatePreferences,
    savePreferences,
    signOut,
  } = useAppStore()

  // Initialize Telegram integrations
  useTelegramTheme()
  useTelegramViewport()

  // Load data on mount
  useEffect(() => {
    loadProfile()
    loadActivity()
  }, [loadProfile, loadActivity])

  // MainButton integration for saving preferences
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
        console.log('MainButton.onClick() - will trigger save')
        if (isDevelopment) {
          // Auto-trigger save in development after a short delay
          setTimeout(fn, 100)
        }
      },
      offClick: () => console.log('MainButton.offClick()'),
    } : null)

    if (!mainButton) return

    const handleSave = async () => {
      await savePreferences()
      
      // Show success feedback
      if (WebApp?.HapticFeedback) {
        WebApp.HapticFeedback.impactOccurred('light')
      }
    }

    if (dirty) {
      mainButton.text = 'Save'
      mainButton.show()
      mainButton.enable()
      mainButton.onClick(handleSave)
    } else {
      mainButton.hide()
    }
    
    // Cleanup on unmount or dependency change
    return () => {
      if (mainButton.offClick) {
        mainButton.offClick(handleSave)
      }
      mainButton.hide()
    }
  }, [dirty, savePreferences])

  // BackButton integration - hide on profile root
  useEffect(() => {
    const { WebApp } = (window as any)?.Telegram || {}
    const backButton = WebApp?.BackButton
    
    if (backButton) {
      backButton.hide()
    }
  }, [])

  // Handlers
  const handleCopyId = (id: number) => {
    navigator.clipboard.writeText(id.toString())
    const { WebApp } = (window as any)?.Telegram || {}
    
    if (WebApp?.HapticFeedback) {
      WebApp.HapticFeedback.impactOccurred('light')
    }
    
    if (WebApp?.showAlert) {
      WebApp.showAlert('User ID copied to clipboard!')
    } else if (import.meta.env.DEV) {
      console.log('User ID copied to clipboard!')
    }
  }

  const handleLanguageChange = (languageCode: string) => {
    updatePreferences({ languageCode })
  }

  const handleThemeChange = (theme: 'system' | 'light' | 'dark') => {
    updatePreferences({ theme })
  }

  const handleNotificationsToggle = (notificationsEnabled: boolean) => {
    updatePreferences({ notificationsEnabled })
  }

  const handleSignOut = () => {
    const { WebApp } = (window as any)?.Telegram || {}
    
    const confirmAction = (confirmed: boolean) => {
      if (confirmed) {
        signOut()
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
        updatePreferences({
          languageCode: profile?.user.language_code || 'en',
          theme: 'system',
          notificationsEnabled: true,
        })
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
                {preferences.languageCode.toUpperCase()}
              </Badge>
              {dirty && (
                <Badge variant="secondary" className="text-xs flex-shrink-0">
                  Unsaved Changes
                </Badge>
              )}
            </div>
          </div>
        </div>
        <p className="text-xs text-muted-foreground line-clamp-2">
          {profile ? 'Data synced from Telegram' : 'Using mock profile data'}
        </p>
      </div>

      {/* Content */}
      <div className="space-y-4">
        <AccountCard 
          user={profile?.user || {
            first_name: 'Telegram',
            last_name: 'User',
            username: undefined,
            photo_url: undefined
          }} 
        />

        {/* User Details */}
        {profile && (
          <Card className="bg-card text-card-foreground border-border rounded-2xl p-4 sm:p-5">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <User className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Full Name</p>
                    <p className="text-sm text-foreground truncate">
                      {[profile.user.first_name, profile.user.last_name].filter(Boolean).join(' ') || 'Not specified'}
                    </p>
                  </div>
                </div>
              </div>

              {profile.user.username && (
                <div className="flex items-center justify-between border-t border-border pt-4">
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <span className="w-4 h-4 text-muted-foreground flex-shrink-0 text-sm font-bold">@</span>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Username</p>
                      <p className="text-sm text-foreground truncate">{profile.user.username}</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between border-t border-border pt-4">
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <Hash className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">User ID</p>
                    <p className="text-sm text-foreground font-mono break-all">{profile.user.id}</p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleCopyId(profile.user.id)}
                  className="ml-2 flex-shrink-0"
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* Preferences */}
        <Card className="bg-card text-card-foreground border-border rounded-2xl p-4 sm:p-5 space-y-3">
          <div className="flex items-center gap-3 mb-4">
            <Smartphone className="w-5 h-5 text-muted-foreground" />
            <h3 className="text-lg font-semibold text-foreground">Preferences</h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between min-w-0">
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <Languages className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-foreground">Language</p>
                  <p className="text-xs text-muted-foreground line-clamp-2">App interface language</p>
                </div>
              </div>
              <select
                value={preferences.languageCode}
                onChange={(e) => handleLanguageChange(e.target.value)}
                className="ml-3 px-3 py-2 text-sm bg-background border border-border rounded-xl text-foreground flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                <option value="en">🇺🇸 EN</option>
                <option value="ru">🇷🇺 RU</option>
              </select>
            </div>

            <div className="border-t border-border pt-4">
              <div className="flex items-center justify-between min-w-0">
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <Palette className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-foreground">Theme</p>
                    <p className="text-xs text-muted-foreground line-clamp-2">Follow Telegram or set custom</p>
                  </div>
                </div>
                
                <div className="ml-3 flex bg-muted rounded-xl p-1 flex-shrink-0">
                  {['system', 'light', 'dark'].map((themeOption) => (
                    <button
                      key={themeOption}
                      onClick={() => handleThemeChange(themeOption as any)}
                      className={`px-3 py-1 text-xs font-medium rounded-lg transition-colors duration-150 ${
                        preferences.theme === themeOption
                          ? 'bg-background text-foreground shadow-sm'
                          : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      {themeOption === 'system' && '🔄'}
                      {themeOption === 'light' && '☀️'}
                      {themeOption === 'dark' && '🌙'}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="border-t border-border pt-4">
              <div className="flex items-center justify-between min-w-0">
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <Bell className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-foreground">Notifications</p>
                    <p className="text-xs text-muted-foreground line-clamp-2">Course updates and reminders</p>
                  </div>
                </div>
                <Button
                  variant={preferences.notificationsEnabled ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleNotificationsToggle(!preferences.notificationsEnabled)}
                  className="ml-3 flex-shrink-0 min-w-[60px]"
                >
                  {preferences.notificationsEnabled ? 'On' : 'Off'}
                </Button>
              </div>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-border">
            <p className="text-xs text-muted-foreground text-center line-clamp-2">
              Changes will be saved when you tap the Save button
            </p>
          </div>
        </Card>

        {/* Progress Section */}
        <EnhancedProgressSection
          coursesCompleted={profile?.stats.completed || 0}
          totalCourses={6}
          timeSpent={profile?.stats.hours || 0}
          currentStreak={profile?.stats.streak || 0}
          weeklyStreak={[1, 1, 0, 1, 1, 1, 0]} // Mon-Sun pattern - this could come from activity data
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