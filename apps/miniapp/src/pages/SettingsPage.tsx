import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from '@tanstack/react-router'
import { 
  ArrowLeft, 
  Bell, 
  Shield, 
  Palette, 
  HelpCircle, 
  Info,
  Globe,
  Vibrate,
  ChevronRight
} from 'lucide-react'

// Design System Components
import { Card } from '../design-system/components/card/index'
import { Typography } from '../design-system/components/typography/index'

// Theme Components
import { ThemeModal } from '../components/theme/ThemeModal'
import { useTheme } from '../contexts/ThemeContext'

// Telegram Integration
import { getTelegramApi } from '../lib/telegram/api'

const containerVariants = {
  hidden: { opacity: 0, x: 100 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.46, 0.45, 0.94],
      staggerChildren: 0.1
    }
  },
  exit: {
    opacity: 0,
    x: -100,
    transition: {
      duration: 0.3,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: {
      duration: 0.3,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
}

interface SettingsItemProps {
  icon: React.ReactNode
  title: string
  description?: string
  onClick?: () => void
  rightElement?: React.ReactNode
}

function SettingsItem({ icon, title, description, onClick, rightElement }: SettingsItemProps) {
  const telegramApi = getTelegramApi()

  const handleClick = () => {
    // Haptic feedback
    if (telegramApi.isAvailable()) {
      telegramApi.getWebApp()?.HapticFeedback?.selectionChanged()
    }
    onClick?.()
  }

  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ 
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
      whileTap={{ 
        scale: 0.98,
        transition: { duration: 0.1 }
      }}
      className="cursor-pointer"
      onClick={handleClick}
    >
      <Card className="p-4 mb-3 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300 border border-transparent hover:border-blue-200/50 dark:hover:border-blue-800/50 group">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <motion.div 
              className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center group-hover:bg-blue-200 dark:group-hover:bg-blue-800/50 transition-colors duration-300"
              whileHover={{ rotate: 5, scale: 1.1 }}
              whileTap={{ rotate: -5, scale: 0.95 }}
            >
              {icon}
            </motion.div>
            <div>
              <Typography variant="body-md" className="font-medium group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors duration-300">
                {title}
              </Typography>
              {description && (
                <Typography variant="body-sm" className="text-muted-foreground group-hover:text-blue-600/70 dark:group-hover:text-blue-400/70 transition-colors duration-300">
                  {description}
                </Typography>
              )}
            </div>
          </div>
          <motion.div
            initial={{ x: 0 }}
            whileHover={{ x: 5 }}
            transition={{ duration: 0.2 }}
          >
            {rightElement}
          </motion.div>
        </div>
      </Card>
    </motion.div>
  )
}

export function SettingsPage() {
  const navigate = useNavigate()
  const telegramApi = getTelegramApi()
  const { theme, resolvedTheme } = useTheme()
  const [isThemeModalOpen, setIsThemeModalOpen] = useState(false)

  // Setup Telegram back button
  useEffect(() => {
    if (telegramApi.isAvailable()) {
      const webApp = telegramApi.getWebApp()
      
      // Show back button
      webApp?.BackButton?.show()
      
      // Enhanced back button click with smooth animation
      const handleBackClick = () => {
        // Enhanced haptic feedback sequence
        webApp?.HapticFeedback?.impactOccurred('medium')
        setTimeout(() => {
          webApp?.HapticFeedback?.selectionChanged()
        }, 50)
        
        // Smooth navigation back to profile
        navigate({ to: '/profile' })
      }
      
      webApp?.BackButton?.onClick(handleBackClick)
      
      // Cleanup on unmount
      return () => {
        webApp?.BackButton?.hide()
      }
    }
  }, [navigate, telegramApi])

  const handleNotifications = () => {
    // Handle notifications settings
    // TODO: Implement notifications settings
  }

  const handlePrivacy = () => {
    // Handle privacy settings
    // TODO: Implement privacy settings
  }

  const handleTheme = () => {
    // Open theme modal
    setIsThemeModalOpen(true)
  }

  // Get current theme description
  const getThemeDescription = () => {
    switch (theme) {
      case 'light':
        return 'Светлая тема'
      case 'dark':
        return 'Темная тема'
      case 'system':
        return `Системная (${resolvedTheme === 'dark' ? 'темная' : 'светлая'})`
      default:
        return 'Системная'
    }
  }

  const handleLanguage = () => {
    // Handle language settings
    // TODO: Implement language settings
  }

  const handleHaptics = () => {
    // Handle haptic settings
    if (telegramApi.isAvailable()) {
      telegramApi.getWebApp()?.HapticFeedback?.notificationOccurred('success')
    }
    // TODO: Implement haptic settings
  }

  const handleHelp = () => {
    // Handle help
    // TODO: Implement help functionality
  }

  const handleAbout = () => {
    // Handle about
    // TODO: Implement about functionality
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-slate-900 p-4"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="mb-6">
        <Typography variant="display-sm" className="font-bold text-gray-900 dark:text-white">
          Настройки
        </Typography>
        <Typography variant="body-md" className="text-muted-foreground dark:text-gray-400">
          Персонализируйте свой опыт обучения
        </Typography>
      </motion.div>

      {/* Settings Sections */}
      <div className="space-y-6">
        {/* General Settings */}
        <motion.div variants={itemVariants}>
          <Typography variant="body-lg" className="font-semibold mb-3 text-gray-900 dark:text-white">
            Основные
          </Typography>
          
          <SettingsItem
            icon={<Bell className="w-5 h-5 text-blue-600" />}
            title="Уведомления"
            description="Управление push-уведомлениями"
            onClick={handleNotifications}
          />
          
          <SettingsItem
            icon={<Shield className="w-5 h-5 text-green-600" />}
            title="Приватность"
            description="Настройки конфиденциальности"
            onClick={handlePrivacy}
          />
          
          <SettingsItem
            icon={<Palette className="w-5 h-5 text-purple-600" />}
            title="Тема"
            description={getThemeDescription()}
            onClick={handleTheme}
            rightElement={<ChevronRight className="w-5 h-5 text-gray-400" />}
          />
          
          <SettingsItem
            icon={<Globe className="w-5 h-5 text-orange-600" />}
            title="Язык"
            description="Русский"
            onClick={handleLanguage}
          />
          
          <SettingsItem
            icon={<Vibrate className="w-5 h-5 text-indigo-600" />}
            title="Тактильная отдача"
            description="Вибрация при нажатиях"
            onClick={handleHaptics}
          />
        </motion.div>

        {/* Support */}
        <motion.div variants={itemVariants}>
          <Typography variant="body-lg" className="font-semibold mb-3 text-gray-900 dark:text-white">
            Поддержка
          </Typography>
          
          <SettingsItem
            icon={<HelpCircle className="w-5 h-5 text-yellow-600" />}
            title="Справка"
            description="Часто задаваемые вопросы"
            onClick={handleHelp}
          />
          
          <SettingsItem
            icon={<Info className="w-5 h-5 text-gray-600" />}
            title="О приложении"
            description="Версия 1.0.0"
            onClick={handleAbout}
          />
        </motion.div>
      </div>

      {/* Theme Modal */}
      <ThemeModal 
        isOpen={isThemeModalOpen} 
        onClose={() => setIsThemeModalOpen(false)} 
      />
    </motion.div>
  )
}