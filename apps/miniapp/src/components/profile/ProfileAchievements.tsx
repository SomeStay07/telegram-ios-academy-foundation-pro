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
    if (!achieved) return 'text-muted-foreground'
    
    const colors = {
      bronze: 'text-warning',
      silver: 'text-muted-foreground', 
      gold: 'text-warning',
      platinum: 'text-primary',
      diamond: 'text-primary'
    }
    return colors[rarity as keyof typeof colors] || 'text-muted-foreground'
  }

  return (
    <motion.div variants={itemVariants}>
      <Card className="p-6">
        
        <div className="space-y-4">
          {achievements.map((achievement, index) => {
            const IconComponent = achievement.icon
            return (
              <motion.div 
                key={index} 
                className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-300 backdrop-blur-sm border ${
                  achievement.achieved 
                    ? 'bg-muted border-border' 
                    : 'bg-muted/50 border-border/50'
                }`}
                whileHover={{ scale: 1.02, y: -1 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                <div className={`p-2 rounded-lg ${
                  achievement.achieved 
                    ? 'bg-background' 
                    : 'bg-muted'
                }`}>
                  <IconComponent 
                    className={`w-6 h-6 ${getRarityColor(achievement.rarity, achievement.achieved)}`}
                  />
                </div>
                <div className="flex-1">
                  <Typography 
                    variant="body-md" 
                    className={`font-medium ${
                      achievement.achieved ? 'text-foreground' : 'text-muted-foreground'
                    }`}
                  >
                    {achievement.title}
                  </Typography>
                  <Typography 
                    variant="caption-sm" 
                    className={
                      achievement.achieved ? 'text-muted-foreground' : 'text-muted-foreground/60'
                    }
                  >
                    {achievement.description}
                  </Typography>
                </div>
                {achievement.achieved && (
                  <Award className="w-5 h-5 text-warning" />
                )}
              </motion.div>
            )
          })}
        </div>
      </Card>
    </motion.div>
  )
}