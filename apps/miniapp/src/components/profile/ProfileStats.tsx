import React from 'react'
import { motion } from 'framer-motion'
import { Calendar, Target, Star, TrendingUp } from 'lucide-react'

// Design System Components
import { InfoCard } from '../../design-system/components/info-card/InfoCard'

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
      {/* Streak Card */}
      <InfoCard
        icon={Calendar}
        value={userData.streak}
        title="дней"
        variant="green"
        size="md"
        animated={true}
      />

      {/* Completed Card */}
      <InfoCard
        icon={Target}
        value={24}
        title="выполнено"
        variant="primary"
        size="md"
        animated={true}
      />

      {/* Achievements Card */}
      <InfoCard
        icon={Star}
        value={12}
        title="достижений"
        variant="purple"
        size="md"
        animated={true}
      />

      {/* Growth Card */}
      <InfoCard
        icon={TrendingUp}
        value="+15%"
        title="рост"
        variant="orange"
        size="md"
        animated={true}
      />
    </motion.div>
  )
}