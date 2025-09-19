import React from 'react'
import { motion } from 'framer-motion'
import { Calendar, Target, Star, TrendingUp } from 'lucide-react'

// Design System Components
import { Typography } from '../../design-system/components/typography/index'

interface ProfileStatsProps {
  userData: {
    streak: number
  }
  itemVariants: any
}

export function ProfileStats({ userData, itemVariants }: ProfileStatsProps) {
  return (
    <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-3 mb-6 px-2">
      {/* Streak Pill */}
      <div className="flex items-center bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/20 rounded-full px-4 py-2 border border-blue-200/50 dark:border-blue-700/30 hover:scale-105 transition-transform cursor-pointer">
        <Calendar className="w-4 h-4 text-blue-600 dark:text-blue-400 mr-2" />
        <Typography variant="body-sm" className="font-semibold text-blue-800 dark:text-blue-200 mr-1">
          {userData.streak}
        </Typography>
        <Typography variant="caption-sm" className="text-blue-600 dark:text-blue-300">
          дней
        </Typography>
      </div>

      {/* Completed Pill */}
      <div className="flex items-center bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/20 rounded-full px-4 py-2 border border-green-200/50 dark:border-green-700/30 hover:scale-105 transition-transform cursor-pointer">
        <Target className="w-4 h-4 text-green-600 dark:text-green-400 mr-2" />
        <Typography variant="body-sm" className="font-semibold text-green-800 dark:text-green-200 mr-1">
          24
        </Typography>
        <Typography variant="caption-sm" className="text-green-600 dark:text-green-300">
          выполнено
        </Typography>
      </div>

      {/* Achievements Pill */}
      <div className="flex items-center bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/20 rounded-full px-4 py-2 border border-purple-200/50 dark:border-purple-700/30 hover:scale-105 transition-transform cursor-pointer">
        <Star className="w-4 h-4 text-purple-600 dark:text-purple-400 mr-2" />
        <Typography variant="body-sm" className="font-semibold text-purple-800 dark:text-purple-200 mr-1">
          12
        </Typography>
        <Typography variant="caption-sm" className="text-purple-600 dark:text-purple-300">
          достижений
        </Typography>
      </div>

      {/* Growth Pill */}
      <div className="flex items-center bg-gradient-to-r from-yellow-50 to-yellow-100 dark:from-yellow-900/30 dark:to-yellow-800/20 rounded-full px-4 py-2 border border-yellow-200/50 dark:border-yellow-700/30 hover:scale-105 transition-transform cursor-pointer">
        <TrendingUp className="w-4 h-4 text-yellow-600 dark:text-yellow-400 mr-2" />
        <Typography variant="body-sm" className="font-semibold text-yellow-800 dark:text-yellow-200 mr-1">
          +15%
        </Typography>
        <Typography variant="caption-sm" className="text-yellow-600 dark:text-yellow-300">
          рост
        </Typography>
      </div>
    </motion.div>
  )
}