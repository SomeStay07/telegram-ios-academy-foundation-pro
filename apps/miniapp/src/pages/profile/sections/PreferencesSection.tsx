import { Languages, Palette, Bell } from 'lucide-react'
import { Card, Button, Separator } from '@telegram-ios-academy/ui'

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
  return (
    <Card className="p-4 bg-card text-card-foreground border border-border rounded-2xl shadow-sm">
      <h3 className="text-lg font-semibold text-foreground mb-4">Preferences</h3>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Languages className="w-4 h-4 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium text-foreground">Language</p>
              <p className="text-xs text-muted-foreground">App interface language</p>
            </div>
          </div>
          <select
            value={languageCode}
            onChange={(e) => onLanguageChange(e.target.value)}
            className="px-3 py-2 text-sm bg-background border border-border rounded-xl text-foreground min-w-0"
          >
            <option value="en">🇺🇸 English</option>
            <option value="ru">🇷🇺 Русский</option>
          </select>
        </div>

        <Separator />

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Palette className="w-4 h-4 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium text-foreground">Theme</p>
              <p className="text-xs text-muted-foreground">Follow Telegram or set custom</p>
            </div>
          </div>
          <select
            value={theme}
            onChange={(e) => onThemeChange(e.target.value as any)}
            className="px-3 py-2 text-sm bg-background border border-border rounded-xl text-foreground min-w-0"
          >
            <option value="system">🔄 System</option>
            <option value="light">☀️ Light</option>
            <option value="dark">🌙 Dark</option>
          </select>
        </div>

        <Separator />

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Bell className="w-4 h-4 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium text-foreground">Notifications</p>
              <p className="text-xs text-muted-foreground">Course updates and reminders</p>
            </div>
          </div>
          <Button
            variant={notificationsEnabled ? "default" : "outline"}
            size="sm"
            onClick={() => onNotificationsToggle(!notificationsEnabled)}
            className="min-w-0"
          >
            {notificationsEnabled ? 'On' : 'Off'}
          </Button>
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-border">
        <p className="text-xs text-muted-foreground text-center">
          Use the Save button below to apply changes
        </p>
      </div>
    </Card>
  )
}