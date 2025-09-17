import React from 'react'
import { motion } from 'framer-motion'
import { StatsHeaderProps } from '../types'
import styles from './StatsHeader.module.css'

export const StatsHeader: React.FC<StatsHeaderProps> = ({ className = '' }) => {
  return (
    <motion.header
      className={`${styles.statsHeader} ${className}`}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className={styles.headerContent}>
        <motion.div
          className={styles.headerIcon}
          animate={{
            rotate: [0, 5, -5, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          aria-hidden="true"
        >
          📊
        </motion.div>
        <div className={styles.headerText}>
          <h2 id="stats-title" className={styles.headerTitle}>
            Performance Analytics
          </h2>
          <p className={styles.headerSubtitle}>
            Your learning insights at a glance
          </p>
        </div>
      </div>
    </motion.header>
  )
}