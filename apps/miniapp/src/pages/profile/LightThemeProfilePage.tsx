import React, { useState, useEffect } from 'react'
import { Card, Badge, Button, ProfileHeroCard } from '@telegram-ios-academy/ui'
import { EnhancedProfileStatsSection } from './sections/EnhancedProfileStatsSection'
import { EnhancedProfileSettingsSection } from './sections/EnhancedProfileSettingsSection'
import { EnhancedDangerZoneSection } from './sections/EnhancedDangerZoneSection'
import { ProfilePageSkeleton } from '../../components/SkeletonLoader'
import { ThemeToggle, useTheme } from '../../components/ThemeToggle'
import { useTelegramTheme, getStoredTheme, type ThemeMode } from '../../shared/lib/telegram/useTelegramTheme'
import { useTelegramViewport } from '../../shared/lib/telegram/useTelegramViewport'
import { getDataSource } from '../../shared/data/source'
import { Sparkles, Sun, Palette, Star } from 'lucide-react'

export function LightThemeProfilePage() {
  // Initialize Telegram integrations
  useTelegramTheme()
  useTelegramViewport()
  const { isLight, resolvedTheme } = useTheme()

  const [user, setUser] = useState<any | null>(null)
  const [loading, setLoading] = useState(true)
  const [preferences, setPreferences] = useState({
    theme: getStoredTheme(),
    language: 'ru',
    notifications: true
  })

  // Enhanced mock stats with light theme emphasis
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

  // MainButton integration
  useEffect(() => {
    const { WebApp } = (window as any)?.Telegram || {}
    const mainButton = WebApp?.MainButton
    
    if (mainButton) {
      mainButton.hide()
    }
  }, [])

  // BackButton integration
  useEffect(() => {
    const { WebApp } = (window as any)?.Telegram || {}
    const backButton = WebApp?.BackButton
    
    if (backButton) {
      backButton.hide()
    }
  }, [])

  // Enhanced handlers
  const handleCopyId = async (id?: number) => {
    if (!id) return
    await navigator.clipboard.writeText(String(id))
    const { WebApp } = (window as any)?.Telegram || {}
    
    if (WebApp?.HapticFeedback?.selectionChanged) {
      WebApp.HapticFeedback.selectionChanged()
    }
    
    if (WebApp?.showAlert) {
      WebApp.showAlert('✨ User ID copied to clipboard!')
    } else if (import.meta.env.DEV) {
      console.log('✨ User ID copied to clipboard!')
    }
  }

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
  const handleThemeChange = (theme: ThemeMode) => {
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
    return <ProfilePageSkeleton />
  }

  return (
    <main className={`mx-auto w-full max-w-[640px] px-3 sm:px-4 py-3 pb-24 min-h-[calc(var(--tg-vph,100svh))] transition-all duration-700 ${
      isLight 
        ? 'light-theme-bg' 
        : 'bg-background'
    } text-foreground relative overflow-hidden`}>
      
      {/* Background decorative elements for light theme */}
      {isLight && (
        <div className="absolute inset-0 light-floating-particles" aria-hidden="true" />
      )}
      
      {/* Enhanced Header with light theme styling */}
      <div className="relative mb-6">
        <div className={`flex items-center gap-4 mb-2 min-w-0 ${
          isLight ? 'light-glass-card' : ''
        } ${isLight ? 'p-4 rounded-2xl' : ''} transition-all duration-500`}>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-2">
              <div className={`p-2 rounded-xl transition-all duration-300 ${
                isLight 
                  ? 'bg-gradient-to-br from-blue-500/10 to-purple-500/10 light-glow-effect' 
                  : 'bg-muted/20'
              }`}>
                {isLight ? (
                  <Sun className="w-6 h-6 text-blue-600" />
                ) : (
                  <Palette className="w-6 h-6 text-primary" />
                )}
              </div>
              <h1 className={`text-3xl font-bold truncate transition-all duration-300 ${
                isLight 
                  ? 'light-text-gradient' 
                  : 'text-foreground'
              }`}>
                Profile
              </h1>
              {isLight && (
                <Sparkles className="w-5 h-5 text-amber-500 animate-pulse" />
              )}
            </div>
            
            <div className="flex items-center gap-2 mt-1 min-w-0">
              <Badge variant="outline" className={`text-xs flex-shrink-0 transition-all duration-300 ${
                isLight 
                  ? 'light-badge' 
                  : ''
              }`}>
                EN
              </Badge>
              <ThemeToggle size="sm" />
              {isLight && (
                <div className="flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-amber-100 to-yellow-100 border border-amber-200 rounded-full">
                  <Star className="w-3 h-3 text-amber-600" />
                  <span className="text-xs font-medium text-amber-700">Light Mode</span>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <p className={`text-xs line-clamp-2 transition-colors duration-300 ${
          isLight ? 'px-4' : ''
        } ${
          isLight 
            ? 'light-text-secondary' 
            : 'text-muted-foreground'
        }`}>
          {user ? 'Data synced from Telegram' : 'Using mock profile data'}
          {isLight && ' ☀️ Enhanced Light Theme Experience'}
        </p>
      </div>

      {/* Enhanced Content with light theme styling */}
      <div className="space-y-6 relative">
        {/* Hero Card with light theme enhancements */}
        <div className={isLight ? 'light-hero-card p-1 rounded-2xl' : ''}>
          <ProfileHeroCard 
            user={{
              ...user,
              first_name: user?.first_name || 'Timur',
              last_name: user?.last_name || 'C.',
              username: user?.username || 'somestay07',
              photo_url: user?.photo_url,
              is_premium: true,
              language_code: preferences.language
            }}
            stats={mockStats}
            onCopyId={handleCopyId}
            className={isLight ? 'light-interactive' : ''}
          />
        </div>

        {/* Enhanced Statistics Section */}
        <EnhancedProfileStatsSection
          stats={mockStats}
          totalCourses={6}
          weeklyStreak={[1, 1, 0, 1, 1, 1, 0]}
        />

        {/* Enhanced Settings Section */}
        <EnhancedProfileSettingsSection
          preferences={preferences}
          onThemeChange={handleThemeChange}
          onLanguageChange={handleLanguageChange}
          onNotificationsToggle={handleNotificationsToggle}
        />

        {/* Enhanced Danger Zone */}
        <EnhancedDangerZoneSection
          onSignOut={handleSignOut}
          onResetSettings={handleResetSettings}
        />
        
        {/* Light theme footer */}
        {isLight && (
          <div className="light-glass-card rounded-2xl p-6 text-center space-y-3">
            <div className="flex items-center justify-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-semibold light-text-gradient">
                Premium Light Experience
              </span>
            </div>
            <p className="text-sm light-text-secondary">
              Enjoying the enhanced light theme? Share your feedback!
            </p>
            <div className="flex justify-center">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}