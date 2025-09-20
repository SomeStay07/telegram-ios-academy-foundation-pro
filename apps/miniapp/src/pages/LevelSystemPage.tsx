import React, { useMemo } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import { 
  ArrowLeft,
  Trophy, 
  Star, 
  Zap, 
  Target, 
  BookOpen, 
  Award,
  TrendingUp,
  Users,
  Calendar,
  Lightbulb,
  CheckCircle,
  Gift,
  Crown,
  Sparkles
} from 'lucide-react'

// Design System Components
import { Typography } from '../design-system/components/typography/index'
import { Button } from '../design-system/components/button/index'
import { Card } from '../design-system/components/card/index'

// Design Tokens
import { ANIMATION, TYPOGRAPHY } from '../shared/constants/design-tokens'
import { getUserLevel } from '../shared'

// Hooks and Utils
import { useTelegramAnimations } from '../lib/telegram/animations'

// Mock data for now - will be replaced with real data
const mockUserData = {
  totalXP: 4500,
  streak: 14,
  firstName: "Тимур",
  lastName: "Цебердa"
}

const mockCurrentRank = {
  name: "Практик",
  minXP: 3000
}

const mockNextRank = {
  name: "Специалист", 
  minXP: 7500
}

const mockProgressPercentage = 34

// Enhanced level system data
const levelSystem = {
  ranks: [
    {
      name: "Новичок",
      minXP: 0,
      maxXP: 999,
      icon: Target,
      color: "rgba(156, 163, 175, 0.9)",
      bgColor: "rgba(156, 163, 175, 0.1)",
      gradientFrom: "#9CA3AF",
      gradientTo: "#6B7280",
      description: "Начинающий разработчик",
      subtitle: "Первые шаги в программировании",
      benefits: [
        "Доступ к базовым урокам",
        "Система достижений", 
        "Профиль пользователя",
        "Сообщество новичков"
      ],
      tips: "Изучай основы каждый день по 15-30 минут"
    },
    {
      name: "Ученик",
      minXP: 1000,
      maxXP: 2999,
      icon: BookOpen,
      color: "rgba(59, 130, 246, 0.9)",
      bgColor: "rgba(59, 130, 246, 0.1)",
      gradientFrom: "#3B82F6",
      gradientTo: "#1D4ED8",
      description: "Изучает основы",
      subtitle: "Погружение в теорию и практику",
      benefits: [
        "Продвинутые уроки",
        "Система стриков", 
        "Персонализация профиля",
        "Первые проекты"
      ],
      tips: "Практикуйся на реальных примерах"
    },
    {
      name: "Практик",
      minXP: 3000,
      maxXP: 7499,
      icon: Zap,
      color: "rgba(139, 92, 246, 0.9)",
      bgColor: "rgba(139, 92, 246, 0.1)",
      gradientFrom: "#8B5CF6",
      gradientTo: "#7C3AED",
      description: "Применяет знания на практике",
      subtitle: "Создание реальных приложений",
      benefits: [
        "Практические проекты",
        "Код-ревью", 
        "Менторство новичков",
        "Доступ к воркшопам"
      ],
      tips: "Создавай собственные проекты и делись опытом"
    },
    {
      name: "Специалист",
      minXP: 7500,
      maxXP: 14999,
      icon: Star,
      color: "rgba(16, 185, 129, 0.9)",
      bgColor: "rgba(16, 185, 129, 0.1)",
      gradientFrom: "#10B981",
      gradientTo: "#047857",
      description: "Опытный разработчик",
      subtitle: "Экспертиза в выбранной области",
      benefits: [
        "Сложные проекты",
        "Техническое лидерство", 
        "Эксклюзивный контент",
        "Приоритетная поддержка"
      ],
      tips: "Специализируйся в одной области и становись экспертом"
    },
    {
      name: "Эксперт",
      minXP: 15000,
      maxXP: 29999,
      icon: Award,
      color: "rgba(245, 158, 11, 0.9)",
      bgColor: "rgba(245, 158, 11, 0.1)",
      gradientFrom: "#F59E0B",
      gradientTo: "#D97706",
      description: "Признанный эксперт",
      subtitle: "Влияние на индустрию",
      benefits: [
        "Архитектурные решения",
        "Создание контента", 
        "Участие в интервью",
        "Консультации стартапов"
      ],
      tips: "Делись знаниями и влияй на развитие других"
    },
    {
      name: "Мастер",
      minXP: 30000,
      maxXP: 99999,
      icon: Trophy,
      color: "rgba(251, 191, 36, 1)",
      bgColor: "rgba(251, 191, 36, 0.15)",
      gradientFrom: "#FBBF24",
      gradientTo: "#F59E0B",
      description: "Мастер своего дела",
      subtitle: "Легенда программирования",
      benefits: [
        "Стратегическое планирование",
        "Наставничество экспертов", 
        "Влияние на продукт",
        "Особый статус и привилегии"
      ],
      tips: "Вдохновляй следующее поколение разработчиков"
    }
  ],
  xpSources: [
    { activity: "Завершение урока", xp: "50-200 XP", icon: CheckCircle, color: "#10B981" },
    { activity: "Ежедневный стрик", xp: "10-50 XP", icon: Calendar, color: "#F59E0B" },
    { activity: "Практическое задание", xp: "100-500 XP", icon: Zap, color: "#8B5CF6" },
    { activity: "Участие в обсуждениях", xp: "5-25 XP", icon: Users, color: "#3B82F6" },
    { activity: "Помощь другим", xp: "25-100 XP", icon: Lightbulb, color: "#EF4444" },
    { activity: "Создание контента", xp: "200-1000 XP", icon: Sparkles, color: "#EC4899" }
  ]
}

export const LevelSystemPage: React.FC = () => {
  const navigate = useNavigate()
  const { cardVariants } = useTelegramAnimations()
  const userLevel = getUserLevel(mockUserData.totalXP)
  
  // Find current rank data
  const currentRankData = useMemo(() => 
    levelSystem.ranks.find(rank => rank.name === mockCurrentRank.name) || levelSystem.ranks[0]
  , [])

  // Calculate remaining XP
  const remainingXP = useMemo(() => {
    if (!mockNextRank?.minXP) return 0
    return Math.max(0, mockNextRank.minXP - mockUserData.totalXP)
  }, [])

  const handleBackClick = () => {
    navigate({ to: '/profile' })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <motion.div 
        className="sticky top-0 z-50 p-4 backdrop-blur-md bg-white/80 dark:bg-gray-900/80 border-b border-gray-200/50 dark:border-gray-700/50"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleBackClick}
            className="p-2"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex-1">
            <Typography variant="heading-md" className="font-bold text-gray-900 dark:text-gray-100">
              Система уровней
            </Typography>
            <Typography variant="body-sm" className="text-gray-600 dark:text-gray-400">
              Твой путь к мастерству
            </Typography>
          </div>
        </div>
      </motion.div>

      <div className="p-4 pb-20 space-y-6">
        {/* Current Status Hero */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.2 }}
        >
          <Card 
            className="p-6 border-0 shadow-xl overflow-hidden relative"
            style={{
              background: `linear-gradient(135deg, ${currentRankData.gradientFrom} 0%, ${currentRankData.gradientTo} 100%)`
            }}
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-4 right-4">
                <currentRankData.icon className="w-32 h-32 text-white" />
              </div>
            </div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-sm">
                  <currentRankData.icon className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <Typography variant="heading-xl" className="font-bold text-white mb-1">
                    Уровень {userLevel}
                  </Typography>
                  <Typography variant="heading-md" className="text-white/90 mb-1">
                    {mockCurrentRank.name}
                  </Typography>
                  <Typography variant="body-md" className="text-white/80">
                    {currentRankData.subtitle}
                  </Typography>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between text-white/90">
                  <span style={{ fontFamily: TYPOGRAPHY.FONT_FAMILY.GAMING }}>
                    {mockUserData.totalXP.toLocaleString()} XP
                  </span>
                  {mockNextRank && (
                    <span style={{ fontFamily: TYPOGRAPHY.FONT_FAMILY.GAMING }}>
                      {mockNextRank.minXP?.toLocaleString()} XP
                    </span>
                  )}
                </div>
                
                {mockNextRank && (
                  <>
                    <div className="bg-white/20 rounded-full p-1">
                      <motion.div 
                        className="bg-white rounded-full h-3"
                        initial={{ width: 0 }}
                        animate={{ width: `${mockProgressPercentage}%` }}
                        transition={{ delay: 0.5, duration: 1 }}
                      />
                    </div>
                    
                    <div className="text-center">
                      <Typography variant="body-md" className="text-white/90 font-medium">
                        {remainingXP.toLocaleString()} XP до звания "{mockNextRank.name}"
                      </Typography>
                    </div>
                  </>
                )}
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Rank System */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Typography variant="heading-lg" className="font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
            <Crown className="w-6 h-6 text-yellow-500" />
            Все ранги
          </Typography>
          
          <div className="space-y-4">
            {levelSystem.ranks.map((rank, index) => {
              const isCurrent = rank.name === mockCurrentRank.name
              const isCompleted = mockUserData.totalXP >= rank.minXP
              const IconComponent = rank.icon
              
              return (
                <motion.div
                  key={rank.name}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.4 + index * ANIMATION.STAGGER.ITEMS }}
                >
                  <Card 
                    className={`p-4 transition-all ${
                      isCurrent 
                        ? 'ring-2 ring-offset-2 dark:ring-offset-gray-900 shadow-xl' 
                        : 'hover:shadow-lg hover:scale-[1.02]'
                    }`}
                    style={{
                      backgroundColor: isCurrent ? rank.bgColor : undefined,
                      ringColor: isCurrent ? rank.color : 'transparent'
                    }}
                  >
                    <div className="flex items-start gap-4">
                      <div 
                        className="p-3 rounded-xl flex-shrink-0"
                        style={{ 
                          backgroundColor: rank.bgColor,
                          opacity: isCompleted ? 1 : 0.5 
                        }}
                      >
                        <IconComponent 
                          className="w-6 h-6" 
                          style={{ color: rank.color }}
                        />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <Typography 
                              variant="heading-md" 
                              className={`font-bold ${
                                isCurrent ? 'text-gray-900 dark:text-gray-100' : 'text-gray-800 dark:text-gray-200'
                              }`}
                            >
                              {rank.name}
                            </Typography>
                            <Typography variant="body-sm" className="text-gray-600 dark:text-gray-400">
                              {rank.description}
                            </Typography>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <Typography 
                              variant="body-md" 
                              className="font-bold text-gray-900 dark:text-gray-100"
                              style={{ fontFamily: TYPOGRAPHY.FONT_FAMILY.GAMING }}
                            >
                              {rank.minXP.toLocaleString()}+ XP
                            </Typography>
                            {isCompleted && (
                              <CheckCircle className="w-5 h-5 text-green-500 ml-auto mt-1" />
                            )}
                          </div>
                        </div>

                        <div className="mb-3">
                          <Typography variant="body-sm" className="text-gray-700 dark:text-gray-300 mb-2 font-medium">
                            Преимущества:
                          </Typography>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {rank.benefits.map((benefit, idx) => (
                              <div key={idx} className="flex items-center gap-2">
                                <Gift className="w-3 h-3 text-green-500 flex-shrink-0" />
                                <Typography variant="body-sm" className="text-gray-600 dark:text-gray-400">
                                  {benefit}
                                </Typography>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div 
                          className="p-3 rounded-lg"
                          style={{ backgroundColor: 'rgba(59, 130, 246, 0.1)' }}
                        >
                          <Typography variant="body-sm" className="text-blue-700 dark:text-blue-300 font-medium">
                            💡 {rank.tips}
                          </Typography>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* How to Get XP */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Typography variant="heading-lg" className="font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-blue-500" />
            Как получать XP
          </Typography>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {levelSystem.xpSources.map((source, index) => {
              const IconComponent = source.icon
              return (
                <motion.div
                  key={source.activity}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6 + index * ANIMATION.STAGGER.ITEMS }}
                >
                  <Card className="p-4 hover:shadow-lg hover:scale-[1.02] transition-all">
                    <div className="flex items-center gap-3 mb-2">
                      <div 
                        className="p-2 rounded-lg"
                        style={{ backgroundColor: `${source.color}20` }}
                      >
                        <IconComponent 
                          className="w-5 h-5" 
                          style={{ color: source.color }}
                        />
                      </div>
                      <div className="flex-1">
                        <Typography variant="body-md" className="font-semibold text-gray-900 dark:text-gray-100">
                          {source.activity}
                        </Typography>
                        <Typography 
                          variant="body-sm" 
                          className="font-bold"
                          style={{ 
                            color: source.color,
                            fontFamily: TYPOGRAPHY.FONT_FAMILY.GAMING 
                          }}
                        >
                          {source.xp}
                        </Typography>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-center pt-4"
        >
          <Button
            onClick={handleBackClick}
            variant="primary"
            size="lg"
            className="w-full max-w-xs"
          >
            <Zap className="w-5 h-5 mr-2" />
            Продолжить обучение
          </Button>
        </motion.div>
      </div>
    </div>
  )
}