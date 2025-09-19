import React from 'react'
import { motion } from 'framer-motion'
import { Calendar, Target, Star, TrendingUp } from 'lucide-react'

// Design System Components
import { Badge } from '../../design-system/components/badge/index'

interface ProfileStatsProps {
  userData: {
    streak: number
  }
  itemVariants: any
}

export function ProfileStats({ userData, itemVariants }: ProfileStatsProps) {
  return (
    <motion.div 
      variants={itemVariants} 
      className="flex flex-wrap justify-center gap-3 mb-6 px-2"
    >
      {/* Streak Badge */}
      <motion.div
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
      >
        <Badge 
          variant="primary" 
          icon={Calendar}
          value={userData.streak}
          label="дней"
          interactive={true}
        />
      </motion.div>

      {/* Completed Badge */}
      <motion.div
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
      >
        <Badge 
          variant="success" 
          icon={Target}
          value={24}
          label="выполнено"
          interactive={true}
        />
      </motion.div>

      {/* Achievements Badge */}
      <motion.div
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
      >
        <Badge 
          variant="info" 
          icon={Star}
          value={12}
          label="достижений"
          interactive={true}
        />
      </motion.div>

      {/* Growth Badge */}
      <motion.div
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
      >
        <Badge 
          variant="warning" 
          icon={TrendingUp}
          value="+15%"
          label="рост"
          interactive={true}
        />
      </motion.div>
    </motion.div>
  )
}