import { useState } from 'react'
import { Card, Button, Input } from '@telegram-ios-academy/ui'
import { useAppStore } from '../shared/model/store'
import { UserIcon, LanguagesIcon, PaletteIcon } from 'lucide-react'

export function ProfilePage() {
  const store = useAppStore()
  const user = store?.user || {}
  const updateProfile = store?.updateProfile
  const [formData, setFormData] = useState({
    username: user.username || '',
    languageCode: user.languageCode || 'en',
    theme: 'system' as 'system' | 'light' | 'dark',
  })
  
  const [hasChanges, setHasChanges] = useState(false)

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

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="text-center">
        <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 bg-muted">
          {user.avatarUrl ? (
            <img 
              src={user.avatarUrl} 
              alt="Avatar" 
              className="w-full h-full rounded-full object-cover" 
            />
          ) : (
            <UserIcon className="w-10 h-10 text-muted-foreground" />
          )}
        </div>
        <h1 className="text-2xl font-bold mb-2 text-foreground">
          My Profile
        </h1>
        <p className="text-muted-foreground">
          Manage your account settings
        </p>
      </div>

      {/* Settings Card */}
      <Card className="bg-card text-card-foreground border border-border rounded-2xl shadow-sm p-4">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2 text-foreground">
              Username
            </label>
            <Input
              value={formData.username}
              onChange={(e) => handleInputChange('username', e.target.value)}
              placeholder="Enter your username"
              className="border-border bg-background text-foreground"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-foreground">
              <LanguagesIcon className="inline w-4 h-4 mr-1" />
              Language
            </label>
            <select
              value={formData.languageCode}
              onChange={(e) => handleInputChange('languageCode', e.target.value)}
              className="w-full p-2 border border-border rounded-md bg-background text-foreground"
            >
              <option value="en">English</option>
              <option value="ru">Русский</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-foreground">
              <PaletteIcon className="inline w-4 h-4 mr-1" />
              Theme
            </label>
            <select
              value={formData.theme}
              onChange={(e) => handleInputChange('theme', e.target.value as any)}
              className="w-full p-2 border border-border rounded-md bg-background text-foreground"
            >
              <option value="system">System</option>
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Progress Overview */}
      <Card className="bg-card text-card-foreground border border-border rounded-2xl shadow-sm p-4">
        <h3 className="font-medium mb-4 text-card-foreground">
          Progress Overview
        </h3>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Modules Completed</span>
            <span className="text-sm px-2 py-1 rounded bg-primary/10 text-primary">
              3 of 6
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Interview Attempts</span>
            <span className="text-sm px-2 py-1 rounded bg-muted text-muted-foreground">
              12
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Average Score</span>
            <span className="text-sm px-2 py-1 rounded bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400">
              85%
            </span>
          </div>
        </div>
      </Card>

      {/* Note: Save action handled by MainButton hook */}
    </div>
  )
}