import { Card, Button } from '@telegram-ios-academy/ui'
import { Settings, Palette, Bell, Languages, Globe, Shield, Smartphone } from 'lucide-react'
import { ThemeMode, setThemeMode } from '../../../shared/lib/telegram/useTelegramTheme'

interface ProfileSettingsSectionProps {
  preferences?: {
    theme?: ThemeMode
    language?: string
    notifications?: boolean
  }
  onThemeChange?: (theme: ThemeMode) => void
  onLanguageChange?: (language: string) => void
  onNotificationsToggle?: (enabled: boolean) => void
}

export function ProfileSettingsSection({
  preferences = {
    theme: 'system',
    language: 'en',
    notifications: true
  },
  onThemeChange,
  onLanguageChange,
  onNotificationsToggle
}: ProfileSettingsSectionProps) {
  
  const settingsItems = [
    {
      icon: <Palette className="w-5 h-5 text-purple-400" />,
      title: 'Тема оформления',
      description: 'Следовать Telegram или установить свою',
      action: (
        <div className="flex bg-muted rounded-lg p-1">
          {(['system', 'light', 'dark'] as const).map((theme) => (
            <button
              key={theme}
              onClick={() => {
                setThemeMode(theme)
                onThemeChange?.(theme)
              }}
              className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
                preferences.theme === theme
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {theme === 'system' && '🔄 Система'}
              {theme === 'light' && '☀️ Светлая'}
              {theme === 'dark' && '🌙 Темная'}
            </button>
          ))}
        </div>
      )
    },
    {
      icon: <Languages className="w-5 h-5 text-blue-400" />,
      title: 'Язык интерфейса',
      description: 'Выберите язык приложения',
      action: (
        <select
          value={preferences.language}
          onChange={(e) => onLanguageChange?.(e.target.value)}
          className="px-3 py-2 text-sm bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
        >
          <option value="en">🇺🇸 English</option>
          <option value="ru">🇷🇺 Русский</option>
          <option value="es">🇪🇸 Español</option>
        </select>
      )
    },
    {
      icon: <Bell className="w-5 h-5 text-orange-400" />,
      title: 'Уведомления',
      description: 'Обновления курсов и напоминания',
      action: (
        <Button
          variant={preferences.notifications ? "default" : "outline"}
          size="sm"
          onClick={() => onNotificationsToggle?.(!preferences.notifications)}
          className="min-w-[60px]"
        >
          {preferences.notifications ? 'Вкл' : 'Выкл'}
        </Button>
      )
    }
  ]

  const quickActions = [
    {
      icon: <Shield className="w-4 h-4" />,
      label: 'Приватность',
      description: 'Настройки безопасности'
    },
    {
      icon: <Globe className="w-4 h-4" />,
      label: 'Регион',
      description: 'Часовой пояс и локализация'
    },
    {
      icon: <Smartphone className="w-4 h-4" />,
      label: 'Устройства',
      description: 'Управление сессиями'
    }
  ]

  return (
    <div className="space-y-4">
      {/* Main Settings Card */}
      <Card className="bg-card text-card-foreground border-border rounded-2xl p-4 sm:p-5">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-blue-500/20 rounded-lg">
            <Settings className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Настройки</h3>
            <p className="text-sm text-muted-foreground">Персонализация приложения</p>
          </div>
        </div>
        
        <div className="space-y-4">
          {settingsItems.map((item, index) => (
            <div key={index} className="flex items-center justify-between gap-4 py-2">
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <div className="p-2 bg-muted/50 rounded-lg flex-shrink-0">
                  {item.icon}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-foreground">{item.title}</p>
                  <p className="text-xs text-muted-foreground line-clamp-1">{item.description}</p>
                </div>
              </div>
              <div className="flex-shrink-0">
                {item.action}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Quick Actions Grid */}
      <div className="grid grid-cols-3 gap-3">
        {quickActions.map((action, index) => (
          <Card key={index} className="bg-card text-card-foreground border-border rounded-xl p-3 hover:bg-accent/5 transition-colors cursor-pointer">
            <div className="text-center space-y-2">
              <div className="p-2 bg-muted/50 rounded-lg mx-auto w-fit">
                {action.icon}
              </div>
              <div>
                <div className="text-sm font-medium">{action.label}</div>
                <div className="text-xs text-muted-foreground line-clamp-1">{action.description}</div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Info Card */}
      <Card className="bg-muted/30 border-border rounded-xl p-4">
        <div className="text-center space-y-1">
          <p className="text-xs text-muted-foreground">
            Настройки синхронизируются с вашим аккаунтом Telegram
          </p>
          <p className="text-xs text-muted-foreground opacity-75">
            Изменения применяются автоматически
          </p>
        </div>
      </Card>
    </div>
  )
}