import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sun, Moon, Monitor, Check } from 'lucide-react'
import { useTheme, type Theme } from '../../contexts/ThemeContext'
import { getTelegramApi } from '../../lib/telegram/api'

interface ThemeModalProps {
  isOpen: boolean
  onClose: () => void
}

interface ThemeOptionProps {
  theme: Theme
  icon: React.ReactNode
  title: string
  description: string
  isSelected: boolean
  onClick: () => void
}

function ThemeOption({ theme, icon, title, description, isSelected, onClick }: ThemeOptionProps) {
  const telegramApi = getTelegramApi()

  const handleClick = () => {
    // Haptic feedback
    if (telegramApi.isAvailable()) {
      telegramApi.getWebApp()?.HapticFeedback?.selectionChanged()
    }
    onClick()
  }

  return (
    <motion.button
      onClick={handleClick}
      className={`w-full p-4 rounded-xl border-2 transition-all duration-300 text-left group ${
        isSelected 
          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
          : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 bg-white dark:bg-gray-800'
      }`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <motion.div 
            className={`p-2 rounded-lg ${
              isSelected 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 group-hover:bg-blue-100 dark:group-hover:bg-blue-800/50'
            }`}
            whileHover={{ rotate: isSelected ? 0 : 5 }}
          >
            {icon}
          </motion.div>
          <div>
            <h3 className={`font-medium ${
              isSelected 
                ? 'text-blue-700 dark:text-blue-300' 
                : 'text-gray-900 dark:text-white'
            }`}>
              {title}
            </h3>
            <p className={`text-sm ${
              isSelected 
                ? 'text-blue-600 dark:text-blue-400' 
                : 'text-gray-500 dark:text-gray-400'
            }`}>
              {description}
            </p>
          </div>
        </div>
        
        <AnimatePresence>
          {isSelected && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center"
            >
              <Check className="w-4 h-4 text-white" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.button>
  )
}

export function ThemeModal({ isOpen, onClose }: ThemeModalProps) {
  const { theme, setTheme } = useTheme()
  const telegramApi = getTelegramApi()

  const handleThemeSelect = (selectedTheme: Theme) => {
    setTheme(selectedTheme)
    
    // Enhanced haptic feedback
    if (telegramApi.isAvailable()) {
      telegramApi.getWebApp()?.HapticFeedback?.notificationOccurred('success')
    }
    
    // Close modal after a brief delay
    setTimeout(() => {
      onClose()
    }, 300)
  }

  const handleClose = () => {
    if (telegramApi.isAvailable()) {
      telegramApi.getWebApp()?.HapticFeedback?.impactOccurred('light')
    }
    onClose()
  }

  const themeOptions = [
    {
      theme: 'light' as Theme,
      icon: <Sun className="w-5 h-5" />,
      title: 'Светлая',
      description: 'Светлый интерфейс'
    },
    {
      theme: 'dark' as Theme,
      icon: <Moon className="w-5 h-5" />,
      title: 'Темная',
      description: 'Темный интерфейс'
    },
    {
      theme: 'system' as Theme,
      icon: <Monitor className="w-5 h-5" />,
      title: 'Системная',
      description: 'Следует настройкам системы'
    }
  ]

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999] flex items-center justify-center p-4"
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ 
              type: "spring", 
              stiffness: 300, 
              damping: 25 
            }}
            className="bg-white dark:bg-gray-900 rounded-2xl p-6 w-full max-w-md shadow-2xl border border-gray-200 dark:border-gray-700"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Выберите тему
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Настройте внешний вид приложения под себя
              </p>
            </div>

            {/* Theme Options */}
            <div className="space-y-3 mb-6">
              {themeOptions.map((option) => (
                <ThemeOption
                  key={option.theme}
                  theme={option.theme}
                  icon={option.icon}
                  title={option.title}
                  description={option.description}
                  isSelected={theme === option.theme}
                  onClick={() => handleThemeSelect(option.theme)}
                />
              ))}
            </div>

            {/* Close Button */}
            <motion.button
              onClick={handleClose}
              className="w-full py-3 px-4 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Закрыть
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}