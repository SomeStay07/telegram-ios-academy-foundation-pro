import React from 'react'
import { motion } from 'framer-motion'
import { Award, Trophy } from 'lucide-react'

// Design System Components
import { Card } from '../../design-system/components/card/index'
import { Typography } from '../../design-system/components/typography/index'

interface ProfileAchievementsProps {
  itemVariants: any
}

export function ProfileAchievements({ itemVariants }: ProfileAchievementsProps) {
  const achievements = [
    { icon: '🏆', title: 'Первый уровень', description: 'Достигли 1000 XP', achieved: true },
    { icon: '🔥', title: 'Неделя подряд', description: '7 дней активности', achieved: true },
    { icon: '⭐', title: 'Мастер React', description: 'Изучили основы React', achieved: true },
    { icon: '🎯', title: 'Целеустремленный', description: 'Выполнили 20 заданий', achieved: false },
  ]

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
          {achievements.map((achievement, index) => (
            <div 
              key={index} 
              className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                achievement.achieved 
                  ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800' 
                  : 'bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700'
              }`}
            >
              <div className="text-2xl">{achievement.icon}</div>
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
                <div className="text-green-500">
                  <Trophy className="w-5 h-5" />
                </div>
              )}
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  )
}