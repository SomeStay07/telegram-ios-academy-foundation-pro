import React from 'react'
import { motion } from 'framer-motion'
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
    <div className="magic-progress-container">
      {/* XP Range Indicators - Magical floating orbs */}
      <motion.div 
        className="flex justify-between items-center px-1 mb-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: animationDelays.XP_RANGE }}
      >
        <motion.div 
          className="magic-xp-orb cursor-pointer"
          whileHover={{ 
            scale: animationConstants.SCALE.HOVER_LARGE,
            x: 2
          }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            haptics.selection()
            achievement.trigger(
              'Current Level! 🎯',
              `You're at ${currentRank.minXP.toLocaleString()} XP`,
              '📊'
            )
          }}
        >
          <motion.div 
            className="orb-glow-current"
            animate={{
              boxShadow: [
                '0 0 8px rgba(255, 255, 255, 0.4)',
                '0 0 16px rgba(255, 255, 255, 0.6)',
                '0 0 8px rgba(255, 255, 255, 0.4)'
              ]
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          <span className="orb-text">
            {currentRank.minXP.toLocaleString()} XP
          </span>
        </motion.div>
        
        <motion.div 
          className="magic-xp-orb cursor-pointer"
          whileHover={{ 
            scale: animationConstants.SCALE.HOVER_LARGE,
            x: -2
          }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            haptics.selection()
            achievement.trigger(
              !isMaxRank ? 'Next Level! 🚀' : 'Maximum Level! 👑',
              !isMaxRank ? `Reach ${nextRank.minXP.toLocaleString()} XP for ${nextRank.name}` : 'You\'ve reached the highest level!',
              !isMaxRank ? '🎯' : '👑'
            )
          }}
        >
          <motion.div 
            className="orb-glow-next"
            style={{ 
              background: currentRank.gradient
            }}
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
          <span className="orb-text orb-text-next">
            {!isMaxRank ? nextRank.minXP.toLocaleString() : userData.totalXP.toLocaleString()} XP
          </span>
        </motion.div>
      </motion.div>

      {/* Magical Progress Bar */}
      <motion.div 
        className="relative"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: animationDelays.PROGRESS }}
        whileHover={{ scale: 1.005 }}
        role="progressbar"
        aria-valuenow={Math.round(progressPercentage)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`Progress to ${isMaxRank ? 'maximum rank' : nextRank.name}: ${Math.round(progressPercentage)}%`}
      >
        {/* Magical Progress Bar Background */}
        <div 
          className="magic-progress-bar-bg"
          onClick={() => {
            haptics.impact('heavy')
            achievement.trigger(
              'Progress Explorer! 📊',
              `You're ${Math.round(progressPercentage)}% of the way to ${!isMaxRank ? nextRank.name : 'maximum level'}!`,
              '🎯'
            )
          }}
        >
          {/* Floating background particles */}
          <div className="magic-bg-particles" />

          {/* Magical Progress Fill */}
          <motion.div 
            className="magic-progress-fill"
            style={{ 
              background: currentRank.gradient
            }}
            initial={{ width: 0 }}
            animate={{ 
              width: `${progressPercentage}%`
            }}
            transition={{ 
              delay: 0.8, 
              duration: 1.5, 
              ease: "easeOut" 
            }}
            onAnimationComplete={() => haptics.levelUp()}
          >
            {/* Magic shimmer effect */}
            <div className="magic-shimmer" />
            
            {/* Progress end glow */}
            {progressPercentage > 5 && progressPercentage < 100 && (
              <div className="magic-progress-end-glow" />
            )}
          </motion.div>

          {/* Magic particles */}
          {progressPercentage < 100 && (
            <div className="magic-progress-particles" />
          )}
        </div>

        {/* Progress Percentage */}
        <motion.div 
          className="magic-progress-text"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.6 }}
        >
          <span className="progress-percentage">
            {Math.round(progressPercentage)}%
          </span>
        </motion.div>
      </motion.div>
    </div>
  )
}