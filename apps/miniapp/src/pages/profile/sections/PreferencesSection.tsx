import { Languages, Palette, Bell, Smartphone } from 'lucide-react'
import { InteractiveCard, Button } from '@telegram-ios-academy/ui'

interface PreferencesSectionProps {
  languageCode: string
  theme: 'system' | 'light' | 'dark'
  notificationsEnabled: boolean
  onLanguageChange: (lang: string) => void
  onThemeChange: (theme: 'system' | 'light' | 'dark') => void
  onNotificationsToggle: (enabled: boolean) => void
}

export function PreferencesSection({
  languageCode,
  theme,
  notificationsEnabled,
  onLanguageChange,
  onThemeChange,
  onNotificationsToggle,
}: PreferencesSectionProps) {
  
  const handleLanguageChange = (lang: string) => {
    onLanguageChange(lang)
    
    // Haptic feedback
    const { WebApp } = (window as any)?.Telegram || {}
    WebApp?.HapticFeedback?.selectionChanged?.()
  }
  
  const handleThemeChange = (themeValue: string) => {
    onThemeChange(themeValue as any)
    
    // Haptic feedback
    const { WebApp } = (window as any)?.Telegram || {}
    WebApp?.HapticFeedback?.selectionChanged?.()
  }
  
  const handleNotificationsToggle = () => {
    onNotificationsToggle(!notificationsEnabled)
    
    // Haptic feedback
    const { WebApp } = (window as any)?.Telegram || {}
    WebApp?.HapticFeedback?.selectionChanged?.()
  }

  return (
    <InteractiveCard variant="lift" className="p-4 sm:p-5 space-y-3">
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
            value={languageCode}
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
            
            {/* Segmented control for theme */}
            <div className="ml-3 flex bg-muted rounded-xl p-1 flex-shrink-0">
              {['system', 'light', 'dark'].map((themeOption) => (
                <button
                  key={themeOption}
                  onClick={() => handleThemeChange(themeOption)}
                  className={`px-3 py-1 text-xs font-medium rounded-lg transition-colors duration-150 ${
                    theme === themeOption
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
              variant={notificationsEnabled ? "default" : "outline"}
              size="sm"
              onClick={handleNotificationsToggle}
              className="ml-3 flex-shrink-0 min-w-[60px]"
            >
              {notificationsEnabled ? 'On' : 'Off'}
            </Button>
          </div>
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-border">
        <p className="text-xs text-muted-foreground text-center line-clamp-2">
          Changes will be saved automatically when you modify settings
        </p>
      </div>
    </InteractiveCard>
  )
}