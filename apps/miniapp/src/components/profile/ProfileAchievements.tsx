import React from 'react'
import { motion } from 'framer-motion'
import { Award, Trophy, Target, Flame, Star, Crown } from 'lucide-react'

// Design System Components
import { Card } from '../../design-system/components/card/index'
import { Typography } from '../../design-system/components/typography/index'

interface ProfileAchievementsProps {
  itemVariants: any
}

export function ProfileAchievements({ itemVariants }: ProfileAchievementsProps) {
  const achievements = [
    { 
      icon: Trophy, 
      title: 'Первый уровень', 
      description: 'Достигли 1000 XP', 
      achieved: true,
      rarity: 'gold' as const
    },
    { 
      icon: Flame, 
      title: 'Неделя подряд', 
      description: '7 дней активности', 
      achieved: true,
      rarity: 'silver' as const
    },
    { 
      icon: Star, 
      title: 'Мастер React', 
      description: 'Изучили основы React', 
      achieved: true,
      rarity: 'platinum' as const
    },
    { 
      icon: Target, 
      title: 'Целеустремленный', 
      description: 'Выполнили 20 заданий', 
      achieved: false,
      rarity: 'bronze' as const
    },
  ]

  const getRarityColor = (rarity: string, achieved: boolean) => {
    if (!achieved) return 'text-gray-400'
    
    const colors = {
      bronze: 'text-orange-600',
      silver: 'text-gray-300', 
      gold: 'text-yellow-500',
      platinum: 'text-blue-400',
      diamond: 'text-cyan-400'
    }
    return colors[rarity as keyof typeof colors] || 'text-gray-400'
  }

  return (
    <motion.div variants={itemVariants}>
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <Typography variant="heading-lg" className="font-bold">
            Достижения
          </Typography>
          <Award className="w-6 h-6 text-yellow-500" />
        </div>
        
        <div className="space-y-4">
          {achievements.map((achievement, index) => {
            const IconComponent = achievement.icon
            return (
              <motion.div 
                key={index} 
                className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-300 ${
                  achievement.achieved 
                    ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 hover:shadow-lg hover:shadow-green-500/10' 
                    : 'bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700/50'
                }`}
                whileHover={{ scale: 1.02, y: -1 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                <div className={`p-2 rounded-lg ${
                  achievement.achieved 
                    ? 'bg-green-100 dark:bg-green-800/50' 
                    : 'bg-gray-100 dark:bg-gray-700'
                }`}>
                  <IconComponent 
                    className={`w-6 h-6 ${getRarityColor(achievement.rarity, achievement.achieved)}`}
                  />
                </div>
                <div className="flex-1">
                  <Typography 
                    variant="body-md" 
                    className={`font-medium ${
                      achievement.achieved ? 'text-green-800 dark:text-green-200' : 'text-gray-600 dark:text-gray-400'
                    }`}
                  >
                    {achievement.title}
                  </Typography>
                  <Typography 
                    variant="caption-sm" 
                    className={
                      achievement.achieved ? 'text-green-600 dark:text-green-300' : 'text-gray-500'
                    }
                  >
                    {achievement.description}
                  </Typography>
                </div>
                {achievement.achieved && (
                  <motion.div 
                    className="text-green-500"
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity, 
                      repeatDelay: 3,
                      ease: "easeInOut"
                    }}
                  >
                    <Award className="w-5 h-5" />
                  </motion.div>
                )}
              </motion.div>
            )
          })}
        </div>
      </Card>
    </motion.div>
  )
}