import { useState, useEffect } from 'react'
import { 
  Card, 
  Avatar, 
  Badge, 
  Button, 
  Input,
  AchievementIcon,
  ProgressIcon,
  LevelIcon,
  SettingsIcon
} from '@telegram-ios-academy/ui'
import { useAppStore } from '../shared/model/store'
import { LanguagesIcon, PaletteIcon, TrophyIcon, CalendarIcon, ClockIcon } from 'lucide-react'

interface TelegramUser {
  id?: number
  first_name?: string
  last_name?: string
  username?: string
  language_code?: string
  photo_url?: string
  is_premium?: boolean
}

export function ProfilePage() {
  const store = useAppStore()
  const user = store?.user || {}
  const updateProfile = store?.updateProfile
  
  const [telegramUser, setTelegramUser] = useState<TelegramUser>({})
  const [formData, setFormData] = useState({
    username: user.username || '',
    languageCode: user.languageCode || 'en',
    theme: 'system' as 'system' | 'light' | 'dark',
  })
  
  const [hasChanges, setHasChanges] = useState(false)

  // Get Telegram user data
  useEffect(() => {
    const webApp = (window as any)?.Telegram?.WebApp
    if (webApp?.initDataUnsafe?.user) {
      const tgUser = webApp.initDataUnsafe.user
      setTelegramUser(tgUser)
      
      // Auto-populate form with Telegram data
      setFormData(prev => ({
        ...prev,
        username: tgUser.username || prev.username,
        languageCode: tgUser.language_code || prev.languageCode,
      }))
    }
  }, [])

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    setHasChanges(true)
  }

  const handleSave = () => {
    updateProfile?.({
      username: formData.username,
      languageCode: formData.languageCode,
    })
    setHasChanges(false)
    
    // Show success feedback
    const webApp = (window as any)?.Telegram?.WebApp
    if (webApp?.HapticFeedback) {
      webApp.HapticFeedback.impactOccurred('light')
    }
  }

  const displayName = telegramUser.first_name 
    ? `${telegramUser.first_name}${telegramUser.last_name ? ` ${telegramUser.last_name}` : ''}`
    : telegramUser.username || 'User'

  const joinDate = new Date(2024, 0, 15) // Demo join date
  const streakDays = 7 // Demo streak

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="text-center relative">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-purple-500/10 rounded-3xl -z-10" />
        
        <div className="p-6">
          <Avatar
            src={telegramUser.photo_url}
            alt={displayName}
            fallback={displayName}
            size="2xl"
            className="mx-auto mb-4 ring-4 ring-primary/20 shadow-xl"
            badge={
              telegramUser.is_premium ? (
                <Badge variant="warning" size="sm" className="rounded-full">
                  ⭐
                </Badge>
              ) : undefined
            }
          />
          
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-foreground">
              {displayName}
            </h1>
            
            {telegramUser.username && (
              <p className="text-primary font-medium">
                @{telegramUser.username}
              </p>
            )}
            
            <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <CalendarIcon className="w-4 h-4" />
                Joined {joinDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
              </div>
              
              <div className="flex items-center gap-1">
                <ClockIcon className="w-4 h-4" />
                {streakDays} day streak
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="p-4 text-center bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/20 dark:to-blue-900/20 border-blue-200 dark:border-blue-800">
          <LevelIcon className="w-8 h-8 mx-auto mb-2 text-blue-600" />
          <div className="text-2xl font-bold text-blue-700 dark:text-blue-400">85</div>
          <div className="text-xs text-blue-600 dark:text-blue-500">Level</div>
        </Card>
        
        <Card className="p-4 text-center bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/20 dark:to-green-900/20 border-green-200 dark:border-green-800">
          <AchievementIcon className="w-8 h-8 mx-auto mb-2 text-green-600" />
          <div className="text-2xl font-bold text-green-700 dark:text-green-400">12</div>
          <div className="text-xs text-green-600 dark:text-green-500">Achievements</div>
        </Card>
        
        <Card className="p-4 text-center bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/20 dark:to-purple-900/20 border-purple-200 dark:border-purple-800">
          <ProgressIcon className="w-8 h-8 mx-auto mb-2 text-purple-600" />
          <div className="text-2xl font-bold text-purple-700 dark:text-purple-400">78%</div>
          <div className="text-xs text-purple-600 dark:text-purple-500">Progress</div>
        </Card>
      </div>

      {/* Learning Progress */}
      <Card className="p-6 bg-gradient-to-r from-card to-card/50">
        <div className="flex items-center gap-3 mb-4">
          <TrophyIcon className="w-6 h-6 text-yellow-600" />
          <h3 className="text-lg font-semibold">Learning Progress</h3>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="font-medium">iOS Development</div>
              <div className="text-sm text-muted-foreground">3 of 6 modules completed</div>
            </div>
            <Badge variant="primary" size="lg">
              50%
            </Badge>
          </div>
          
          <div className="w-full bg-muted rounded-full h-3">
            <div className="bg-gradient-to-r from-primary to-primary/80 h-3 rounded-full transition-all duration-500" style={{ width: '50%' }} />
          </div>
          
          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">24</div>
              <div className="text-sm text-muted-foreground">Lessons completed</div>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">12</div>
              <div className="text-sm text-muted-foreground">Interview attempts</div>
            </div>
          </div>
        </div>
      </Card>

      {/* Settings */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <SettingsIcon className="w-6 h-6 text-muted-foreground" />
          <h3 className="text-lg font-semibold">Settings</h3>
        </div>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-3 text-foreground">
              Username
            </label>
            <Input
              value={formData.username}
              onChange={(e) => handleInputChange('username', e.target.value)}
              placeholder="Enter your username"
              className="border-border bg-background text-foreground h-12"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-3 text-foreground">
              <LanguagesIcon className="inline w-4 h-4 mr-2" />
              Language
            </label>
            <select
              value={formData.languageCode}
              onChange={(e) => handleInputChange('languageCode', e.target.value)}
              className="w-full p-3 border border-border rounded-xl bg-background text-foreground h-12 transition-colors hover:border-primary/50 focus:border-primary focus:ring-2 focus:ring-primary/20"
            >
              <option value="en">🇺🇸 English</option>
              <option value="ru">🇷🇺 Русский</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-3 text-foreground">
              <PaletteIcon className="inline w-4 h-4 mr-2" />
              Theme
            </label>
            <select
              value={formData.theme}
              onChange={(e) => handleInputChange('theme', e.target.value as any)}
              className="w-full p-3 border border-border rounded-xl bg-background text-foreground h-12 transition-colors hover:border-primary/50 focus:border-primary focus:ring-2 focus:ring-primary/20"
            >
              <option value="system">🔄 System</option>
              <option value="light">☀️ Light</option>
              <option value="dark">🌙 Dark</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Telegram Info (Debug) */}
      {telegramUser.id && (
        <Card className="p-4 bg-muted/50">
          <h4 className="text-sm font-medium mb-2 text-muted-foreground">Telegram Info</h4>
          <div className="text-xs text-muted-foreground space-y-1">
            <div>ID: {telegramUser.id}</div>
            <div>Language: {telegramUser.language_code}</div>
            {telegramUser.is_premium && <div className="text-yellow-600">⭐ Premium User</div>}
          </div>
        </Card>
      )}

      {/* Note: Save action handled by MainButton hook */}
    </div>
  )
}