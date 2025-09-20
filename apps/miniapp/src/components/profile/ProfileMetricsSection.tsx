import React from 'react'
import { motion } from 'framer-motion'
import { Card } from '../../design-system'
import { ScrollableMetrics } from './ScrollableMetrics'

interface ProfileMetricsSectionProps {
  userData: {
    streak: number
    totalXP: number
  }
  itemVariants: any
}

export function ProfileMetricsSection({ userData, itemVariants }: ProfileMetricsSectionProps) {
  return (
    <motion.div variants={itemVariants}>
      <Card className="p-4 mb-6 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50">
        <ScrollableMetrics userData={userData} />
      </Card>
    </motion.div>
  )
}