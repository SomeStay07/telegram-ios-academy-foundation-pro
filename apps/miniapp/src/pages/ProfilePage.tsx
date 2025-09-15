import { useState } from 'react'
import { Card, Button, Input } from '@telegram-ios-academy/ui'
import { useAppStore } from '../shared/model/store'
import { UserIcon, LanguagesIcon, PaletteIcon } from 'lucide-react'

export function ProfilePage() {
  const { user, updateProfile } = useAppStore()
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
    updateProfile({
      username: formData.username,
      languageCode: formData.languageCode,
    })
    setHasChanges(false)
    
    // Show success feedback
    if (window.Telegram?.WebApp?.HapticFeedback) {
      window.Telegram.WebApp.HapticFeedback.impactOccurred('light')
    }
  }

  return (
    <div className="p-4 space-y-6">
      <div className="text-center">
        <div 
          className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4"
          style={{ backgroundColor: 'var(--muted)' }}
        >
          {user.avatarUrl ? (
            <img 
              src={user.avatarUrl} 
              alt="Avatar" 
              className="w-full h-full rounded-full object-cover" 
            />
          ) : (
            <UserIcon className="w-10 h-10" style={{ color: 'var(--muted-foreground)' }} />
          )}
        </div>
        <h1 className="text-2xl font-bold mb-2" style={{ color: 'var(--foreground)' }}>
          My Profile
        </h1>
        <p style={{ color: 'var(--muted-foreground)' }}>
          Manage your account settings
        </p>
      </div>

      <Card className="p-4" style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: 'var(--foreground)' }}>
              Username
            </label>
            <Input
              value={formData.username}
              onChange={(e) => handleInputChange('username', e.target.value)}
              placeholder="Enter your username"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: 'var(--foreground)' }}>
              <LanguagesIcon className="inline w-4 h-4 mr-1" />
              Language
            </label>
            <select
              value={formData.languageCode}
              onChange={(e) => handleInputChange('languageCode', e.target.value)}
              className="w-full p-2 border rounded-md"
              style={{
                borderColor: 'var(--border)',
                backgroundColor: 'var(--background)',
                color: 'var(--foreground)'
              }}
            >
              <option value="en">English</option>
              <option value="ru">Русский</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: 'var(--foreground)' }}>
              <PaletteIcon className="inline w-4 h-4 mr-1" />
              Theme
            </label>
            <select
              value={formData.theme}
              onChange={(e) => handleInputChange('theme', e.target.value as any)}
              className="w-full p-2 border rounded-md"
              style={{
                borderColor: 'var(--border)',
                backgroundColor: 'var(--background)',
                color: 'var(--foreground)'
              }}
            >
              <option value="system">System</option>
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </div>
        </div>
      </Card>

      <Card className="p-4" style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}>
        <h3 className="font-medium mb-3" style={{ color: 'var(--foreground)' }}>
          Progress Overview
        </h3>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span style={{ color: 'var(--muted-foreground)' }}>Modules Completed</span>
            <span 
              className="text-sm px-2 py-1 rounded"
              style={{ backgroundColor: 'var(--muted)', color: 'var(--primary)' }}
            >
              3 of 6
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <span style={{ color: 'var(--muted-foreground)' }}>Interview Attempts</span>
            <span 
              className="text-sm px-2 py-1 rounded"
              style={{ backgroundColor: 'var(--muted)', color: 'var(--muted-foreground)' }}
            >
              12
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <span style={{ color: 'var(--muted-foreground)' }}>Average Score</span>
            <span 
              className="text-sm px-2 py-1 rounded"
              style={{ backgroundColor: '#f0fdf4', color: '#166534' }}
            >
              85%
            </span>
          </div>
        </div>
      </Card>

      {hasChanges && (
        <Button onClick={handleSave} className="w-full">
          Save Changes
        </Button>
      )}
    </div>
  )
}