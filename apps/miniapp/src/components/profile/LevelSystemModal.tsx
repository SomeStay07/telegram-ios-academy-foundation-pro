import React, { useMemo, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  X, 
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
  CheckCircle
} from 'lucide-react'

// Design System Components
import { Typography } from '../../design-system/components/typography/index'
import { Button } from '../../design-system/components/button/index'

// Design Tokens
import { Z_INDEX, ANIMATION, TYPOGRAPHY } from '../../shared/constants/design-tokens'
import { getUserLevel } from '../../shared'

interface LevelSystemModalProps {
  isOpen: boolean
  onClose: () => void
  userData: {
    totalXP: number
    streak: number
    firstName: string
    lastName: string
  }
  currentRank: {
    name: string
    minXP?: number
  }
  nextRank?: {
    name: string
    minXP?: number
  }
  progressPercentage: number
  isMaxRank: boolean
}

// Level system data
const levelSystem = {
  ranks: [
    {
      name: "Новичок",
      minXP: 0,
      maxXP: 999,
      icon: Target,
      color: "rgba(156, 163, 175, 0.8)",
      bgColor: "rgba(156, 163, 175, 0.1)",
      description: "Начинающий разработчик",
      benefits: ["Доступ к базовым урокам", "Система достижений", "Профиль пользователя"]
    },
    {
      name: "Ученик",
      minXP: 1000,
      maxXP: 2999,
      icon: BookOpen,
      color: "rgba(59, 130, 246, 0.8)",
      bgColor: "rgba(59, 130, 246, 0.1)",
      description: "Изучает основы",
      benefits: ["Продвинутые уроки", "Система стриков", "Персонализация профиля"]
    },
    {
      name: "Практик",
      minXP: 3000,
      maxXP: 7499,
      icon: Zap,
      color: "rgba(139, 92, 246, 0.8)",
      bgColor: "rgba(139, 92, 246, 0.1)",
      description: "Применяет знания на практике",
      benefits: ["Практические проекты", "Код-ревью", "Менторство новичков"]
    },
    {
      name: "Специалист",
      minXP: 7500,
      maxXP: 14999,
      icon: Star,
      color: "rgba(16, 185, 129, 0.8)",
      bgColor: "rgba(16, 185, 129, 0.1)",
      description: "Опытный разработчик",
      benefits: ["Сложные проекты", "Техническое лидерство", "Эксклюзивный контент"]
    },
    {
      name: "Эксперт",
      minXP: 15000,
      maxXP: 29999,
      icon: Award,
      color: "rgba(245, 158, 11, 0.8)",
      bgColor: "rgba(245, 158, 11, 0.1)",
      description: "Признанный эксперт",
      benefits: ["Архитектурные решения", "Создание контента", "Участие в интервью"]
    },
    {
      name: "Мастер",
      minXP: 30000,
      maxXP: 99999,
      icon: Trophy,
      color: "rgba(251, 191, 36, 0.9)",
      bgColor: "rgba(251, 191, 36, 0.15)",
      description: "Мастер своего дела",
      benefits: ["Стратегическое планирование", "Наставничество", "Влияние на продукт", "Особый статус"]
    }
  ],
  xpSources: [
    { activity: "Завершение урока", xp: "50-200 XP", icon: CheckCircle },
    { activity: "Ежедневный стрик", xp: "10-50 XP", icon: Calendar },
    { activity: "Практическое задание", xp: "100-500 XP", icon: Zap },
    { activity: "Участие в обсуждениях", xp: "5-25 XP", icon: Users },
    { activity: "Помощь другим", xp: "25-100 XP", icon: Lightbulb }
  ]
}

export const LevelSystemModal = React.memo(function LevelSystemModal({ 
  isOpen, 
  onClose, 
  userData, 
  currentRank, 
  nextRank, 
  progressPercentage, 
  isMaxRank 
}: LevelSystemModalProps) {
  const userLevel = getUserLevel(userData.totalXP)
  
  // Find current rank in system
  const currentRankData = useMemo(() => 
    levelSystem.ranks.find(rank => rank.name === currentRank.name) || levelSystem.ranks[0]
  , [currentRank.name])

  // Calculate remaining XP
  const remainingXP = useMemo(() => {
    if (isMaxRank || !nextRank?.minXP) return 0
    return Math.max(0, nextRank.minXP - userData.totalXP)
  }, [isMaxRank, nextRank, userData.totalXP])

  const handleClose = useCallback(() => {
    onClose()
  }, [onClose])

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={`fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[${Z_INDEX.SYSTEM_MODAL}]`}
          style={{ 
            padding: 'clamp(1rem, 4vw, 1.5rem)',
            paddingBottom: 'clamp(6rem, 15vw, 8rem)' // Extra space for tab bar
          }}
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", ...ANIMATION.SPRING.GENTLE }}
            className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full overflow-hidden"
            style={{
              maxWidth: 'clamp(320px, 95vw, 520px)',
              maxHeight: 'clamp(600px, 85vh, 700px)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div 
              className="relative p-6 text-white"
              style={{
                background: `linear-gradient(135deg, ${currentRankData.color} 0%, ${currentRankData.color.replace('0.8', '0.6')} 100%)`
              }}
            >
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 p-1 rounded-full hover:bg-white/20 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              
              <motion.div
                initial={{ rotate: -10, scale: 0 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{ delay: ANIMATION.DURATION.NORMAL / 1000, type: "spring", ...ANIMATION.SPRING.GENTLE }}
                className="mb-4"
              >
                <div className="flex items-center gap-4">
                  <div 
                    className="p-4 rounded-2xl"
                    style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
                  >
                    <currentRankData.icon className="w-8 h-8" />
                  </div>
                  <div className="flex-1">
                    <Typography variant="heading-lg" className="font-bold text-white mb-1">
                      Уровень {userLevel}
                    </Typography>
                    <Typography variant="body-md" className="text-white/80 mb-2">
                      {currentRank.name} • {userData.totalXP.toLocaleString()} XP
                    </Typography>
                    {!isMaxRank && nextRank && (
                      <div className="bg-white/20 rounded-full p-1">
                        <div 
                          className="bg-white rounded-full h-2 transition-all duration-500"
                          style={{ width: `${progressPercentage}%` }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>

              {!isMaxRank && nextRank && (
                <div className="text-center">
                  <Typography variant="body-sm" className="text-white/70">
                    {remainingXP.toLocaleString()} XP до звания "{nextRank.name}"
                  </Typography>
                </div>
              )}
            </div>

            <div className="flex-1 overflow-y-auto">
              {/* Rank System */}
              <div className="p-6 space-y-6">
                <div>
                  <Typography variant="heading-md" className="font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-yellow-500" />
                    Система рангов
                  </Typography>
                  
                  <div className="space-y-3">
                    {levelSystem.ranks.map((rank, index) => {
                      const isCurrent = rank.name === currentRank.name
                      const isCompleted = userData.totalXP >= rank.minXP
                      const IconComponent = rank.icon
                      
                      return (
                        <motion.div
                          key={rank.name}
                          initial={{ x: -20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: index * ANIMATION.STAGGER.ITEMS }}
                          className={`flex items-center gap-3 p-3 rounded-xl transition-all ${
                            isCurrent 
                              ? 'ring-2 ring-offset-2 dark:ring-offset-gray-900' 
                              : 'hover:scale-[1.02]'
                          }`}
                          style={{
                            backgroundColor: isCurrent ? rank.bgColor : 'rgba(0, 0, 0, 0.02)',
                            borderColor: isCurrent ? rank.color : 'transparent',
                            ringColor: isCurrent ? rank.color : 'transparent'
                          }}
                        >
                          <div 
                            className="p-2 rounded-lg"
                            style={{ 
                              backgroundColor: rank.bgColor,
                              opacity: isCompleted ? 1 : 0.5 
                            }}
                          >
                            <IconComponent 
                              className="w-4 h-4" 
                              style={{ color: rank.color }}
                            />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <Typography 
                                variant="body-md" 
                                className={`font-semibold ${
                                  isCurrent ? 'text-gray-900 dark:text-gray-100' : 'text-gray-700 dark:text-gray-300'
                                }`}
                              >
                                {rank.name}
                              </Typography>
                              <Typography 
                                variant="body-sm" 
                                className="text-gray-500 dark:text-gray-400"
                                style={{ fontFamily: TYPOGRAPHY.FONT_FAMILY.GAMING }}
                              >
                                {rank.minXP.toLocaleString()}+ XP
                              </Typography>
                            </div>
                            <Typography variant="body-sm" className="text-gray-600 dark:text-gray-400">
                              {rank.description}
                            </Typography>
                          </div>
                          {isCompleted && (
                            <CheckCircle className="w-5 h-5 text-green-500" />
                          )}
                        </motion.div>
                      )
                    })}
                  </div>
                </div>

                {/* How to Get XP */}
                <div>
                  <Typography variant="heading-md" className="font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-blue-500" />
                    Как получать XP
                  </Typography>
                  
                  <div className="space-y-3">
                    {levelSystem.xpSources.map((source, index) => {
                      const IconComponent = source.icon
                      return (
                        <motion.div
                          key={source.activity}
                          initial={{ x: -20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.3 + index * ANIMATION.STAGGER.ITEMS }}
                          className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-xl hover:scale-[1.02] transition-all"
                        >
                          <div className="p-2 bg-blue-100 dark:bg-blue-900/50 rounded-lg">
                            <IconComponent className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                          </div>
                          <div className="flex-1">
                            <Typography variant="body-md" className="font-semibold text-gray-900 dark:text-gray-100">
                              {source.activity}
                            </Typography>
                            <Typography 
                              variant="body-sm" 
                              className="text-blue-600 dark:text-blue-400 font-medium"
                              style={{ fontFamily: TYPOGRAPHY.FONT_FAMILY.GAMING }}
                            >
                              {source.xp}
                            </Typography>
                          </div>
                        </motion.div>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-6">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: ANIMATION.DURATION.NORMAL * 2 / 1000 }}
              >
                <Button
                  onClick={handleClose}
                  variant="primary"
                  className="w-full"
                >
                  <Target className="w-4 h-4 mr-2" />
                  Продолжить обучение
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  )
})