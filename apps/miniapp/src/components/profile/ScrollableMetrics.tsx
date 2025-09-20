import React, { useRef, useState, useEffect, useMemo, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Target, Star, TrendingUp, Trophy, Zap, Medal, Crown } from 'lucide-react'
import { Typography } from '../../design-system/components/typography'
import styles from '../../pages/ProfilePage.module.css'

interface MetricCard {
  id: string
  icon: React.ComponentType<any>
  value: string | number
  label: string
  colorToken: string
}

interface ScrollableMetricsProps {
  userData: {
    streak: number
    totalXP: number
    completedLessons?: number
    achievements?: number
    growthRate?: number
    rank?: string
    masterSkill?: string
  }
}

export const ScrollableMetrics = React.memo(function ScrollableMetrics({ userData }: ScrollableMetricsProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  // Memoized metrics calculation - only recalculates when userData changes
  const metrics: MetricCard[] = useMemo(() => [
    {
      id: 'streak',
      icon: Calendar,
      value: userData.streak,
      label: 'дней подряд',
      colorToken: 'streak'
    },
    {
      id: 'completed',
      icon: Target,
      value: userData.completedLessons || 24,
      label: 'выполнено',
      colorToken: 'completed'
    },
    {
      id: 'achievements',
      icon: Trophy,
      value: userData.achievements || 12,
      label: 'достижений',
      colorToken: 'achievement'
    },
    {
      id: 'growth',
      icon: TrendingUp,
      value: userData.growthRate ? `+${userData.growthRate}%` : '+15%',
      label: 'рост',
      colorToken: 'growth'
    },
    {
      id: 'rank',
      icon: Medal,
      value: userData.rank || 'ТОП 15%',
      label: 'рейтинг',
      colorToken: 'rank'
    },
    {
      id: 'xp',
      icon: Zap,
      value: userData.totalXP >= 1000 ? `${Math.floor(userData.totalXP / 1000)}K` : userData.totalXP,
      label: 'опыта',
      colorToken: 'xp'
    },
    {
      id: 'master',
      icon: Crown,
      value: userData.masterSkill || 'React',
      label: 'мастер',
      colorToken: 'master'
    }
  ], [userData.streak, userData.totalXP, userData.completedLessons, userData.achievements, userData.growthRate, userData.rank, userData.masterSkill])

  // Memoized scroll position checker
  const checkScrollPosition = useCallback(() => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1)
    }
  }, [])

  useEffect(() => {
    checkScrollPosition()
    const container = scrollContainerRef.current
    if (container) {
      container.addEventListener('scroll', checkScrollPosition)
      return () => container.removeEventListener('scroll', checkScrollPosition)
    }
  }, [])

  return (
    <div className="relative overflow-visible">
      {/* Scrollable Container */}
      <div 
        ref={scrollContainerRef}
        className="flex gap-3 overflow-x-auto scrollbar-hide scroll-smooth pb-2 px-1 py-2"
        style={{
          scrollSnapType: 'x mandatory',
          WebkitOverflowScrolling: 'touch',
          overflow: 'visible scroll' // Allow vertical overflow for hover effects
        }}
      >
        {metrics.map((metric, index) => {
          const IconComponent = metric.icon
          return (
            <motion.div
              key={metric.id}
              className="flex-shrink-0 backdrop-blur-sm rounded-lg relative overflow-hidden border cursor-pointer"
              style={{ 
                scrollSnapAlign: 'start',
                backgroundColor: `var(--metric-${metric.colorToken}-bg)`,
                borderColor: 'var(--metric-border)',
                '--metric-border': 'var(--metric-border-dark)',
                padding: 'clamp(0.75rem, 2vw, 1rem)',
                minWidth: 'clamp(110px, 25vw, 130px)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
              } as React.CSSProperties}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ 
                scale: 1.01, 
                y: -2,
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                transition: { duration: 0.2, ease: [0.4, 0, 0.2, 1] }
              }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="relative z-10 flex flex-col items-center text-center">
                <IconComponent 
                  className="mb-1" 
                  style={{ 
                    color: `var(--metric-${metric.colorToken}-text)`,
                    width: 'clamp(1rem, 3vw, 1.25rem)',
                    height: 'clamp(1rem, 3vw, 1.25rem)'
                  }}
                />
                <Typography 
                  variant="body-lg"
                  className="font-bold"
                  style={{ 
                    color: `var(--metric-${metric.colorToken}-text)`,
                    fontFamily: 'var(--font-gaming)',
                    fontVariantNumeric: 'tabular-nums',
                    fontSize: 'clamp(0.875rem, 2.5vw, 1rem)',
                    lineHeight: '1.2'
                  }}
                >
                  {metric.value}
                </Typography>
                <Typography 
                  variant="body-xs" 
                  className="text-muted-foreground opacity-75 leading-tight"
                  style={{
                    fontSize: 'clamp(0.7rem, 2vw, 0.8rem)',
                    lineHeight: '1.2'
                  }}
                >
                  {metric.label}
                </Typography>
              </div>
              
              {/* Subtle hover glow */}
              <motion.div
                className="absolute inset-0 opacity-0 rounded-lg"
                style={{
                  background: 'linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.3) 50%, transparent 70%)'
                }}
                whileHover={{ 
                  opacity: [0, 1, 0],
                  x: ['-100%', '200%']
                }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              />
            </motion.div>
          )
        })}
        
        {/* Spacer to show peek effect */}
        <div className="w-4 flex-shrink-0" />
      </div>

      {/* Left Fade Gradient */}
      {canScrollLeft && (
        <div className="absolute left-0 top-0 bottom-2 w-8 bg-gradient-to-r from-gray-50 dark:from-gray-900 to-transparent pointer-events-none z-10" />
      )}

      {/* Right Fade Gradient + Peek Hint */}
      {canScrollRight && (
        <div className="absolute right-0 top-0 bottom-2 w-8 bg-gradient-to-l from-gray-50 dark:from-gray-900 via-gray-50/80 dark:via-gray-900/80 to-transparent pointer-events-none z-10" />
      )}

      {/* Scroll Indicator Dots */}
      <div className="flex justify-center mt-2 gap-1">
        {Array.from({ length: Math.ceil(metrics.length / 3) }).map((_, index) => (
          <div
            key={index}
            className="w-1 h-1 rounded-full bg-gray-400 dark:bg-white/40 opacity-30"
          />
        ))}
      </div>
    </div>
  )
})