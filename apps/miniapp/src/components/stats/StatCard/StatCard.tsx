import React from 'react'
import { motion } from 'framer-motion'
import { useHaptics } from '../../../lib/haptics'
import { StatCardProps } from '../types'
import styles from './StatCard.module.css'

export const StatCard: React.FC<StatCardProps> = ({ 
  stat, 
  index, 
  size = 'medium' 
}) => {
  const haptics = useHaptics()

  return (
    <motion.article
      className={`${styles.statCard} ${styles[size]}`}
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        delay: index * 0.1,
        duration: 0.5,
        type: "spring",
        stiffness: 300
      }}
      whileHover={{ 
        scale: 1.02,
        y: -4,
        transition: { type: "spring", stiffness: 400 }
      }}
      whileTap={{ scale: 0.98 }}
      onTap={() => {
        haptics.impact('light')
        console.log('Stat tapped:', stat.label)
      }}
      style={{
        background: stat.bgGradient || 'linear-gradient(135deg, rgba(107, 114, 128, 0.2) 0%, rgba(75, 85, 99, 0.2) 100%)'
      }}
      role="button"
      tabIndex={0}
      aria-label={`${stat.label}: ${stat.value}${stat.subValue ? `, ${stat.subValue}` : ''}${stat.trend ? `, trending ${stat.trend} by ${stat.trendValue}` : ''}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          haptics.impact('light')
          console.log('Stat activated via keyboard:', stat.label)
        }
      }}
    >
      {/* Background glow effect */}
      <motion.div
        className={styles.cardGlow}
        animate={{
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{
          background: `radial-gradient(circle at center, ${stat.color}40 0%, transparent 70%)`
        }}
      />

      {/* Content */}
      <div className={styles.cardContent}>
        <div className={styles.cardHeader}>
          <motion.div
            className={styles.statIcon}
            whileHover={{ scale: 1.2, rotate: 10 }}
            transition={{ type: "spring", stiffness: 400 }}
            style={{ color: stat.color }}
          >
            {stat.icon}
          </motion.div>
          
          {stat.trend && (
            <motion.div
              className={`${styles.trendIndicator} ${styles[stat.trend]}`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 + 0.3 }}
            >
              <span className={styles.trendArrow}>
                {stat.trend === 'up' ? '↗' : stat.trend === 'down' ? '↘' : '→'}
              </span>
              <span className={styles.trendValue}>{stat.trendValue}</span>
            </motion.div>
          )}
        </div>

        <motion.div
          className={styles.statValue}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 + 0.2 }}
          style={{ color: stat.color }}
        >
          {stat.value}
        </motion.div>

        <motion.div
          className={styles.statLabel}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: index * 0.1 + 0.4 }}
        >
          {stat.label}
        </motion.div>

        {stat.subValue && (
          <motion.div
            className={styles.statSubvalue}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.1 + 0.5 }}
          >
            {stat.subValue}
          </motion.div>
        )}
      </div>

      {/* Shimmer effect on hover */}
      <div className={styles.cardShimmer} />
    </motion.article>
  )
}