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
  SettingsIcon,
  StatCard,
  ProgressRing,
  AchievementBadge
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
      <div className="grid grid-cols-3 gap-3">
        <StatCard
          title="Level"
          value="85"
          subtitle="iOS Dev"
          icon={<LevelIcon />}
          variant="primary"
          trend="up"
          trendValue="+3"
          progress={85}
          animated
        />
        
        <StatCard
          title="Achievements"
          value="12"
          subtitle="Unlocked"
          icon={<AchievementIcon />}
          variant="success"
          trend="up"
          trendValue="+2"
          animated
          badge={<Badge variant="success" size="sm">New!</Badge>}
        />
        
        <StatCard
          title="Progress"
          value="78%"
          subtitle="Complete"
          icon={<ProgressIcon />}
          variant="info"
          trend="up"
          trendValue="+12%"
          progress={78}
          animated
        />
      </div>

      {/* Learning Progress */}
      <Card className="p-6 bg-gradient-to-r from-card to-card/50">
        <div className="flex items-center gap-3 mb-6">
          <TrophyIcon className="w-6 h-6 text-yellow-600" />
          <h3 className="text-lg font-semibold">Learning Progress</h3>
        </div>
        
        <div className="flex items-center gap-8 mb-6">
          <ProgressRing
            progress={78}
            size="lg"
            variant="primary"
            label="Overall"
            animated
          />
          
          <div className="flex-1 space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <div className="font-medium">iOS Development</div>
                <div className="text-sm text-muted-foreground">3 of 6 modules completed</div>
              </div>
              <Badge variant="primary" size="lg">
                50%
              </Badge>
            </div>
            
            <div className="w-full bg-muted rounded-full h-2">
              <div className="bg-gradient-to-r from-primary to-primary/80 h-2 rounded-full transition-all duration-1000" style={{ width: '50%' }} />
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-4">
          <StatCard
            title="Lessons"
            value="24"
            subtitle="Completed"
            size="sm"
            variant="success"
            animated
          />
          
          <StatCard
            title="Interviews"
            value="12"
            subtitle="Attempts"
            size="sm"
            variant="warning"
            animated
          />
          
          <StatCard
            title="Score"
            value="85%"
            subtitle="Average"
            size="sm"
            variant="primary"
            trend="up"
            trendValue="+5%"
            animated
          />
        </div>
      </Card>

      {/* Achievements Section */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <AchievementIcon className="w-6 h-6 text-yellow-600" />
            <h3 className="text-lg font-semibold">Recent Achievements</h3>
          </div>
          <Badge variant="info" size="sm">12/25</Badge>
        </div>
        
        <div className="grid grid-cols-4 gap-3">
          <AchievementBadge
            title="First Steps"
            description="Complete first lesson"
            emoji="🎯"
            unlocked
            tier="bronze"
            date="Jan 15"
            rarity="common"
          />
          
          <AchievementBadge
            title="Week Warrior"
            description="7 day streak"
            emoji="🔥"
            unlocked
            tier="silver"
            date="Jan 22"
            rarity="rare"
          />
          
          <AchievementBadge
            title="Swift Master"
            description="Complete Swift module"
            emoji="⚡"
            unlocked
            tier="gold"
            date="Feb 01"
            rarity="epic"
          />
          
          <AchievementBadge
            title="Perfect Score"
            description="100% on interview"
            emoji="💎"
            progress={85}
            tier="diamond"
            rarity="legendary"
          />
        </div>
        
        <div className="mt-4 text-center">
          <button className="text-primary text-sm font-medium hover:underline">
            View All Achievements →
          </button>
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