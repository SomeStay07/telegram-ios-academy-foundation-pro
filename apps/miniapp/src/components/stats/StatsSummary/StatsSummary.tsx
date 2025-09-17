import React from 'react'
import { motion } from 'framer-motion'
import { StatsSummaryProps } from '../types'
import styles from './StatsSummary.module.css'

export const StatsSummary: React.FC<StatsSummaryProps> = ({ 
  userData, 
  className = '' 
}) => {
  return (
    <motion.div
      className={`${styles.summaryCard} ${className}`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.2, type: "spring" }}
      whileHover={{ scale: 1.02 }}
    >
      <div className={styles.summaryContent}>
        <motion.div 
          className={styles.summaryIcon}
          animate={{ 
            scale: [1, 1.1, 1] 
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          🎯
        </motion.div>
        <div className={styles.summaryText}>
          <h4 className={styles.summaryTitle}>
            This Week's Highlights
          </h4>
          <p className={styles.summaryDescription}>
            You're on track! Keep up the momentum with your {userData.streak}-day streak and 
            {userData.weeklyXP > 1000 ? ' exceptional' : ' solid'} weekly progress.
          </p>
        </div>
      </div>
    </motion.div>
  )
}