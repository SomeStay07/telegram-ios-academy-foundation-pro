import React from 'react'
import { motion } from 'framer-motion'
import { Progress } from '../../design-system/components/progress/index'
import { Button } from '../../design-system/components/button/index'
import { Typography } from '../../design-system/components/typography/index'
import { haptics } from '../../lib/haptics'
import { useAchievement } from '../AchievementNotification'

interface ProgressBarProps {
  progressPercentage: number
  currentRank: {
    id: number
    gradient: string
    minXP: number
  }
  nextRank: {
    name: string
    minXP: number
  }
  userData: {
    totalXP: number
  }
  isMaxRank: boolean
  animationDelays: {
    PROGRESS: number
    XP_RANGE: number
  }
  animationConstants: {
    SCALE: {
      HOVER_LARGE: number
    }
  }
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progressPercentage,
  currentRank,
  nextRank,
  userData,
  isMaxRank,
  animationDelays,
  animationConstants
}) => {
  const achievement = useAchievement()

  return (
    <div className="space-y-6 p-4">
      {/* XP Range Indicators with Design System */}
      <motion.div 
        className="flex justify-between items-center gap-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: animationDelays.XP_RANGE }}
      >
        <motion.div
          whileHover={{ scale: animationConstants.SCALE.HOVER_LARGE }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              haptics.selection()
              achievement.trigger(
                'Current Level! 🎯',
                `You're at ${currentRank.minXP.toLocaleString()} XP`,
                '📊'
              )
            }}
            className="flex flex-col items-center p-3 rounded-xl border-2 border-transparent hover:border-indigo-200 dark:hover:border-indigo-800"
          >
            <motion.div
              className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 mb-1"
              animate={{
                boxShadow: [
                  '0 0 8px rgba(99, 102, 241, 0.4)',
                  '0 0 16px rgba(99, 102, 241, 0.6)',
                  '0 0 8px rgba(99, 102, 241, 0.4)'
                ]
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
            <Typography variant="caption" className="text-gray-600 dark:text-gray-400">
              {currentRank.minXP.toLocaleString()} XP
            </Typography>
          </Button>
        </motion.div>
        
        <motion.div
          whileHover={{ scale: animationConstants.SCALE.HOVER_LARGE }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              haptics.selection()
              achievement.trigger(
                !isMaxRank ? 'Next Level! 🚀' : 'Maximum Level! 👑',
                !isMaxRank ? `Reach ${nextRank.minXP.toLocaleString()} XP for ${nextRank.name}` : 'You\'ve reached the highest level!',
                !isMaxRank ? '🎯' : '👑'
              )
            }}
            className="flex flex-col items-center p-3 rounded-xl border-2 border-transparent hover:border-yellow-200 dark:hover:border-yellow-800"
          >
            <motion.div
              className="w-3 h-3 rounded-full mb-1"
              style={{ background: currentRank.gradient }}
              animate={{
                scale: [1, 1.15, 1],
                boxShadow: [
                  '0 0 8px rgba(255, 215, 0, 0.4)',
                  '0 0 20px rgba(255, 215, 0, 0.6)',
                  '0 0 8px rgba(255, 215, 0, 0.4)'
                ]
              }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            />
            <Typography variant="caption" className="text-gray-600 dark:text-gray-400">
              {!isMaxRank ? nextRank.minXP.toLocaleString() : userData.totalXP.toLocaleString()} XP
            </Typography>
          </Button>
        </motion.div>
      </motion.div>

      {/* Progress Bar with Design System */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: animationDelays.PROGRESS }}
        whileHover={{ scale: 1.005 }}
        className="cursor-pointer"
        onClick={() => {
          haptics.impact('heavy')
          achievement.trigger(
            'Progress Explorer! 📊',
            `You're ${Math.round(progressPercentage)}% of the way to ${!isMaxRank ? nextRank.name : 'maximum level'}!`,
            '🎯'
          )
        }}
      >
        <Progress
          value={progressPercentage}
          variant="gradient"
          size="lg"
          showLabel
          animated
          className="w-full"
          style={{
            '--progress-color': currentRank.gradient
          } as React.CSSProperties}
          onComplete={() => haptics.levelUp()}
        />
      </motion.div>
    </div>
  )
}