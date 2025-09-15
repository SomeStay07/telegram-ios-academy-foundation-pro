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
        <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
          {user.avatarUrl ? (
            <img 
              src={user.avatarUrl} 
              alt="Avatar" 
              className="w-full h-full rounded-full object-cover" 
            />
          ) : (
            <UserIcon className="w-10 h-10 text-gray-400" />
          )}
        </div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          My Profile
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Manage your account settings
        </p>
      </div>

      <Card className="p-4">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Username
            </label>
            <Input
              value={formData.username}
              onChange={(e) => handleInputChange('username', e.target.value)}
              placeholder="Enter your username"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <LanguagesIcon className="inline w-4 h-4 mr-1" />
              Language
            </label>
            <select
              value={formData.languageCode}
              onChange={(e) => handleInputChange('languageCode', e.target.value)}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              <option value="en">English</option>
              <option value="ru">Русский</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <PaletteIcon className="inline w-4 h-4 mr-1" />
              Theme
            </label>
            <select
              value={formData.theme}
              onChange={(e) => handleInputChange('theme', e.target.value as any)}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              <option value="system">System</option>
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </div>
        </div>
      </Card>

      <Card className="p-4">
        <h3 className="font-medium text-gray-900 dark:text-white mb-3">
          Progress Overview
        </h3>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-gray-600 dark:text-gray-400">Modules Completed</span>
            <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">3 of 6</span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-gray-600 dark:text-gray-400">Interview Attempts</span>
            <span className="text-sm bg-gray-100 text-gray-800 px-2 py-1 rounded">12</span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-gray-600 dark:text-gray-400">Average Score</span>
            <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">85%</span>
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