import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ArrowLeft, 
  Smartphone, 
  Code, 
  Users, 
  Target, 
  Zap, 
  BookOpen, 
  Trophy, 
  ChevronDown,
  ChevronUp,
  Calendar,
  Plus,
  Bug,
  Sparkles
} from 'lucide-react'

// Design System Components
import { Card } from '../design-system/components/card'
import { Typography } from '../design-system/components/typography'
import { Button } from '../design-system/components/button'
import { Progress } from '../design-system/components/progress'

// Telegram Integration
import { getTelegramApi } from '../lib/telegram/api'

// Version data
const versionHistory = [
  {
    version: "1.2.0",
    date: "2025-01-15",
    type: "major",
    title: "Профиль и геймификация",
    description: "Полная система профиля с достижениями и метриками",
    changes: [
      { type: "new", text: "Система профиля пользователя с аватаром и статистикой" },
      { type: "new", text: "Горизонтальные метрики с красивой анимацией" },
      { type: "new", text: "Система достижений и бейджей" },
      { type: "new", text: "Отслеживание прогресса по технологиям" },
      { type: "improved", text: "Полностью переработанный дизайн в духе СПОКОЙНАЯ ЭЛЕГАНТНОСТЬ" },
      { type: "improved", text: "100% compliance с дизайн-системой" }
    ]
  },
  {
    version: "1.1.0", 
    date: "2025-01-10",
    type: "minor",
    title: "Дизайн-система и компоненты",
    description: "Внедрение единой дизайн-системы",
    changes: [
      { type: "new", text: "Typography компонент с вариантами" },
      { type: "new", text: "Card компонент с различными стилями" },
      { type: "new", text: "Button система с размерами и вариантами" },
      { type: "improved", text: "Единообразие всех компонентов" },
      { type: "fixed", text: "Проблемы с адаптивностью на мобильных устройствах" }
    ]
  },
  {
    version: "1.0.0",
    date: "2025-01-01", 
    type: "major",
    title: "Первый релиз",
    description: "Базовая версия приложения для изучения iOS",
    changes: [
      { type: "new", text: "Структура курсов по iOS разработке" },
      { type: "new", text: "Интерактивные уроки и задания" },
      { type: "new", text: "Система навигации" },
      { type: "new", text: "Telegram Mini App интеграция" }
    ]
  }
]

const features = [
  {
    icon: Smartphone,
    title: "SwiftUI & UIKit",
    description: "Изучайте современные и классические подходы к разработке iOS интерфейсов",
    color: "text-blue-500"
  },
  {
    icon: Code,
    title: "Swift Programming",
    description: "От основ языка до продвинутых концепций: протоколы, generics, concurrency",
    color: "text-orange-500"
  },
  {
    icon: BookOpen,
    title: "Интерактивные уроки",
    description: "Практические задания с мгновенной обратной связью и проверкой кода",
    color: "text-green-500"
  },
  {
    icon: Trophy,
    title: "Система достижений",
    description: "Геймификация обучения с наградами, рейтингами и отслеживанием прогресса",
    color: "text-purple-500"
  },
  {
    icon: Users,
    title: "Сообщество",
    description: "Telegram-интеграция для общения с другими разработчиками и менторами",
    color: "text-pink-500"
  },
  {
    icon: Target,
    title: "Карьерные цели",
    description: "Структурированный путь от начинающего до профессионального iOS разработчика",
    color: "text-indigo-500"
  }
]

const getChangeIcon = (type: string) => {
  switch (type) {
    case 'new': return <Plus className="w-4 h-4 text-green-500" />
    case 'improved': return <Sparkles className="w-4 h-4 text-blue-500" />
    case 'fixed': return <Bug className="w-4 h-4 text-red-500" />
    default: return <Zap className="w-4 h-4 text-gray-500" />
  }
}

const getVersionBadgeColor = (type: string) => {
  switch (type) {
    case 'major': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
    case 'minor': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
    case 'patch': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
    default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
  }
}

export function AboutPage() {
  const telegramApi = getTelegramApi()
  const [expandedVersion, setExpandedVersion] = useState<string | null>("1.2.0")

  // Set up Telegram Back Button navigation
  useEffect(() => {
    try {
      if (telegramApi.isAvailable()) {
        const webApp = telegramApi.getWebApp()
        
        // Show Back Button
        if (webApp?.BackButton) {
          webApp.BackButton.show()
          
          // Handle back button click
          const handleBackButton = () => {
            try {
              // Haptic feedback
              if (telegramApi.hapticFeedback) {
                telegramApi.hapticFeedback.impactOccurred('light')
              }
              
              // Navigate back using browser history or direct navigation
              if (window.history.length > 1) {
                window.history.back()
              } else {
                window.location.href = '/profile'
              }
            } catch (error) {
              console.warn('Back navigation error:', error)
              window.location.href = '/profile'
            }
          }
          
          // Add event listener
          webApp.BackButton.onClick(handleBackButton)
          
          // Cleanup function
          return () => {
            try {
              webApp.BackButton.hide()
              webApp.BackButton.offClick(handleBackButton)
            } catch (error) {
              console.warn('BackButton cleanup error:', error)
            }
          }
        }
      }
    } catch (error) {
      console.warn('Telegram BackButton setup failed:', error)
    }
  }, [telegramApi])

  const handleManualBack = () => {
    try {
      if (telegramApi.isAvailable() && telegramApi.hapticFeedback) {
        telegramApi.hapticFeedback.impactOccurred('light')
      }
    } catch (error) {
      console.warn('Haptic feedback not available:', error)
    }
    
    // Manual back navigation (fallback)
    if (window.history.length > 1) {
      window.history.back()
    } else {
      window.location.href = '/profile'
    }
  }

  const toggleVersion = (version: string) => {
    try {
      if (telegramApi.isAvailable() && telegramApi.hapticFeedback) {
        telegramApi.hapticFeedback.selectionChanged()
      }
    } catch (error) {
      console.warn('Haptic feedback not available:', error)
    }
    
    setExpandedVersion(expandedVersion === version ? null : version)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  }

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-slate-900"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        
        {/* Header */}
        <motion.div variants={itemVariants} className="flex items-center gap-4 mb-6">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleManualBack}
            className="p-2"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <Typography variant="heading-xl" className="font-bold">
            О приложении
          </Typography>
        </motion.div>

        {/* App Overview */}
        <motion.div variants={itemVariants}>
          <Card className="p-8 mb-8 text-center bg-gradient-to-r from-primary/5 to-primary/10 border border-primary/20">
            <div className="w-20 h-20 bg-gradient-to-br from-primary to-primary-light rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl">
              <Code className="w-10 h-10 text-white" />
            </div>
            
            <Typography variant="heading-lg" className="font-bold mb-2">
              Telegram iOS Academy
            </Typography>
            
            <Typography variant="body-lg" className="text-muted-foreground mb-4 max-w-2xl mx-auto">
              Интерактивная платформа для изучения iOS разработки. 
              От основ Swift до создания полноценных приложений в App Store.
            </Typography>
            
            <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>Запущено в 2025</span>
              </div>
              <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span>1000+ студентов</span>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Features Grid */}
        <motion.div variants={itemVariants} className="mb-8">
          <Typography variant="heading-lg" className="font-bold mb-6">
            Возможности платформы
          </Typography>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, index) => {
              const IconComponent = feature.icon
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02, y: -2 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  <Card className="p-6 h-full">
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-xl bg-muted ${feature.color}`}>
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <Typography variant="heading-sm" className="font-semibold mb-2">
                          {feature.title}
                        </Typography>
                        <Typography variant="body-sm" className="text-muted-foreground">
                          {feature.description}
                        </Typography>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* Current Progress */}
        <motion.div variants={itemVariants} className="mt-8">
          <Card className="p-6 bg-gradient-to-r from-success/5 to-success/10 border border-success/20">
            <Typography variant="heading-sm" className="font-semibold mb-4 text-success">
              Текущий прогресс разработки
            </Typography>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <Typography variant="body-sm">iOS Core Features</Typography>
                  <Typography variant="caption-sm" className="text-muted-foreground">85%</Typography>
                </div>
                <Progress value={85} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <Typography variant="body-sm">SwiftUI Modules</Typography>
                  <Typography variant="caption-sm" className="text-muted-foreground">70%</Typography>
                </div>
                <Progress value={70} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <Typography variant="body-sm">Advanced Topics</Typography>
                  <Typography variant="caption-sm" className="text-muted-foreground">45%</Typography>
                </div>
                <Progress value={45} className="h-2" />
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Version History - moved to bottom */}
        <motion.div variants={itemVariants} className="mt-8">
          <Typography variant="heading-lg" className="font-bold mb-6">
            История версий
          </Typography>
          
          <div className="space-y-4">
            {versionHistory.map((version, index) => (
              <motion.div
                key={version.version}
                variants={itemVariants}
                initial={false}
              >
                <Card className="overflow-hidden">
                  <motion.button
                    onClick={() => toggleVersion(version.version)}
                    className="w-full p-6 text-left hover:bg-muted/50 transition-colors"
                    whileHover={{ backgroundColor: "var(--muted)" }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`px-3 py-1 rounded-full text-xs font-medium ${getVersionBadgeColor(version.type)}`}>
                          v{version.version}
                        </div>
                        <div>
                          <Typography variant="heading-sm" className="font-semibold">
                            {version.title}
                          </Typography>
                          <Typography variant="body-sm" className="text-muted-foreground">
                            {version.description}
                          </Typography>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <Typography variant="caption-sm" className="text-muted-foreground">
                          {new Date(version.date).toLocaleDateString('ru-RU')}
                        </Typography>
                        {expandedVersion === version.version ? (
                          <ChevronUp className="w-5 h-5 text-muted-foreground" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-muted-foreground" />
                        )}
                      </div>
                    </div>
                  </motion.button>
                  
                  <AnimatePresence>
                    {expandedVersion === version.version && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      >
                        <div className="px-6 pb-6 border-t border-border">
                          <div className="pt-4 space-y-3">
                            {version.changes.map((change, changeIndex) => (
                              <motion.div
                                key={changeIndex}
                                initial={{ x: -20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: changeIndex * 0.1 }}
                                className="flex items-start gap-3"
                              >
                                {getChangeIcon(change.type)}
                                <Typography variant="body-sm" className="text-muted-foreground">
                                  {change.text}
                                </Typography>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </motion.div>
  )
}