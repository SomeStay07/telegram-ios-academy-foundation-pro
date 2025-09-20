import React, { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Target, Star, TrendingUp, Trophy, Zap, Medal, Crown } from 'lucide-react'

interface MetricCard {
  id: string
  icon: React.ComponentType<any>
  value: string | number
  label: string
  color: string
  bgColor: string
}

interface ScrollableMetricsProps {
  userData: {
    streak: number
    totalXP: number
  }
}

export function ScrollableMetrics({ userData }: ScrollableMetricsProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const metrics: MetricCard[] = [
    {
      id: 'streak',
      icon: Calendar,
      value: userData.streak,
      label: 'дней подряд',
      color: 'text-green-400/80',
      bgColor: 'bg-green-400/10'
    },
    {
      id: 'completed',
      icon: Target,
      value: 24,
      label: 'выполнено',
      color: 'text-blue-400/80',
      bgColor: 'bg-blue-400/10'
    },
    {
      id: 'achievements',
      icon: Trophy,
      value: 12,
      label: 'достижений',
      color: 'text-yellow-400/80',
      bgColor: 'bg-yellow-400/10'
    },
    {
      id: 'growth',
      icon: TrendingUp,
      value: '+15%',
      label: 'рост',
      color: 'text-orange-400/80',
      bgColor: 'bg-orange-400/10'
    },
    {
      id: 'rank',
      icon: Medal,
      value: 'ТОП 15%',
      label: 'рейтинг',
      color: 'text-purple-400/80',
      bgColor: 'bg-purple-400/10'
    },
    {
      id: 'xp',
      icon: Zap,
      value: userData.totalXP >= 1000 ? `${Math.floor(userData.totalXP / 1000)}K` : userData.totalXP,
      label: 'опыта',
      color: 'text-indigo-400/80',
      bgColor: 'bg-indigo-400/10'
    },
    {
      id: 'master',
      icon: Crown,
      value: 'React',
      label: 'мастер',
      color: 'text-pink-400/80',
      bgColor: 'bg-pink-400/10'
    }
  ]

  const checkScrollPosition = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1)
    }
  }

  useEffect(() => {
    checkScrollPosition()
    const container = scrollContainerRef.current
    if (container) {
      container.addEventListener('scroll', checkScrollPosition)
      return () => container.removeEventListener('scroll', checkScrollPosition)
    }
  }, [])

  return (
    <div className="relative">
      {/* Scrollable Container */}
      <div 
        ref={scrollContainerRef}
        className="flex gap-3 overflow-x-auto scrollbar-hide scroll-smooth pb-2"
        style={{
          scrollSnapType: 'x mandatory',
          WebkitOverflowScrolling: 'touch'
        }}
      >
        {metrics.map((metric, index) => {
          const IconComponent = metric.icon
          return (
            <motion.div
              key={metric.id}
              className={`flex-shrink-0 ${metric.bgColor} backdrop-blur-sm rounded-lg border border-gray-200 dark:border-white/20 p-3 min-w-[120px] relative overflow-hidden`}
              style={{ scrollSnapAlign: 'start' }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ 
                scale: 1.02, 
                y: -1,
                transition: { type: "spring", stiffness: 400, damping: 25 }
              }}
            >
              <div className="relative z-10 flex flex-col items-center text-center">
                <IconComponent className={`w-4 h-4 ${metric.color} mb-1`} />
                <div 
                  className={`text-lg font-bold ${metric.color}`}
                  style={{ 
                    fontFamily: 'var(--font-gaming)',
                    fontVariantNumeric: 'tabular-nums'
                  }}
                >
                  {metric.value}
                </div>
                <div className="text-xs text-gray-600 dark:text-white/60 leading-tight">
                  {metric.label}
                </div>
              </div>
              
              {/* Subtle hover glow */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0"
                whileHover={{ opacity: 1, x: ['0%', '100%'] }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
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
}