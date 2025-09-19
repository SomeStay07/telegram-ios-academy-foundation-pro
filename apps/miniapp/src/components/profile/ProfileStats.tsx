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
    <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-3 mb-6 px-2">
      {/* Streak Badge */}
      <Badge 
        variant="primary" 
        icon={Calendar}
        value={userData.streak}
        label="дней"
        interactive={true}
      />

      {/* Completed Badge */}
      <Badge 
        variant="success" 
        icon={Target}
        value={24}
        label="выполнено"
        interactive={true}
      />

      {/* Achievements Badge */}
      <Badge 
        variant="info" 
        icon={Star}
        value={12}
        label="достижений"
        interactive={true}
      />

      {/* Growth Badge */}
      <Badge 
        variant="warning" 
        icon={TrendingUp}
        value="+15%"
        label="рост"
        interactive={true}
      />
    </motion.div>
  )
}