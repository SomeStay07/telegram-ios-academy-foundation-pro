import React, { useMemo } from 'react'
import { motion } from 'framer-motion'
import { useHaptics } from '../lib/haptics'

interface StreakDay {
  date: Date
  completed: boolean
  isToday: boolean
  isFuture: boolean
}

interface EnhancedStreakProps {
  currentStreak: number
  maxStreak?: number
  className?: string
}

export const EnhancedStreak: React.FC<EnhancedStreakProps> = ({ 
  currentStreak, 
  maxStreak = 30,
  className = '' 
}) => {
  const haptics = useHaptics()

  // Generate last 7 days data
  const streakData = useMemo(() => {
    const today = new Date()
    const days: StreakDay[] = []
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today)
      date.setDate(today.getDate() - i)
      
      const isToday = i === 0
      const isFuture = i < 0
      const completed = i < currentStreak && !isFuture
      
      days.push({
        date,
        completed,
        isToday,
        isFuture
      })
    }
    
    return days
  }, [currentStreak])

  const streakPercentage = Math.min((currentStreak / maxStreak) * 100, 100)
  
  const getStreakMessage = () => {
    if (currentStreak === 0) return "Start your streak today! 🚀"
    if (currentStreak < 3) return "Building momentum! 💪"
    if (currentStreak < 7) return "Great consistency! 🔥"
    if (currentStreak < 14) return "On fire! 🌟"
    if (currentStreak < 30) return "Streak master! ⚡"
    return "Legendary dedication! 👑"
  }

  const getDayAbbr = (date: Date) => {
    return date.toLocaleDateString('en', { weekday: 'short' }).slice(0, 1)
  }

  return (
    <motion.section
      className={`enhanced-streak-container ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      aria-labelledby="streak-title"
      role="region"
    >
      {/* Header */}
      <motion.header 
        className="streak-header"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-center gap-3">
          <motion.div
            className="streak-icon"
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            aria-hidden="true"
          >
            🔥
          </motion.div>
          <div>
            <h2 id="streak-title" className="streak-title">Daily Streak</h2>
            <p className="streak-subtitle">{getStreakMessage()}</p>
          </div>
        </div>
        
        <motion.button 
          className="streak-counter"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onTap={() => {
            haptics.impact('medium')
            console.log('Streak tapped:', currentStreak)
          }}
          aria-label={`Current streak: ${currentStreak} days. Tap for details`}
          tabIndex={0}
        >
          <span className="streak-number" aria-hidden="true">{currentStreak}</span>
          <span className="streak-days-label">days</span>
        </motion.button>
      </motion.header>

      {/* 7-Day Calendar Visual */}
      <motion.div 
        className="streak-calendar"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        role="grid"
        aria-label="7-day streak calendar"
      >
        <div className="calendar-grid" role="row">
          {streakData.map((day, index) => (
            <motion.button
              key={day.date.toISOString()}
              className={`calendar-day ${day.completed ? 'completed' : ''} ${day.isToday ? 'today' : ''} ${day.isFuture ? 'future' : ''}`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                delay: 0.1 * index + 0.5,
                type: "spring",
                stiffness: 300
              }}
              whileHover={{ 
                scale: 1.1,
                y: -2
              }}
              whileTap={{ scale: 0.9 }}
              onTap={() => {
                haptics.selection()
                console.log('Day tapped:', day.date.toDateString())
              }}
              role="gridcell"
              aria-label={`${day.date.toLocaleDateString('en', { 
                weekday: 'long', 
                month: 'short', 
                day: 'numeric' 
              })}${day.completed ? ', completed' : ''}${day.isToday ? ', today' : ''}`}
              aria-pressed={day.completed}
              disabled={day.isFuture}
              tabIndex={day.isFuture ? -1 : 0}
            >
              <span className="day-letter" aria-hidden="true">{getDayAbbr(day.date)}</span>
              <span className="day-number">{day.date.getDate()}</span>
              
              {/* Completion indicator */}
              {day.completed && (
                <motion.div
                  className="completion-indicator"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ 
                    delay: 0.1 * index + 0.7,
                    type: "spring",
                    stiffness: 400
                  }}
                  aria-hidden="true"
                >
                  ✓
                </motion.div>
              )}
              
              {/* Today indicator */}
              {day.isToday && (
                <motion.div
                  className="today-pulse"
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  aria-hidden="true"
                />
              )}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Progress Bar */}
      <motion.div 
        className="streak-progress"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        role="progressbar"
        aria-valuenow={currentStreak}
        aria-valuemin={0}
        aria-valuemax={maxStreak}
        aria-label={`Streak progress: ${currentStreak} of ${maxStreak} days`}
      >
        <div className="progress-info">
          <span className="progress-label">Progress to {maxStreak} days</span>
          <span className="progress-percentage" aria-live="polite">{Math.round(streakPercentage)}%</span>
        </div>
        
        <div className="progress-bar-container">
          <motion.div
            className="progress-bar-fill"
            initial={{ width: 0 }}
            animate={{ width: `${streakPercentage}%` }}
            transition={{ 
              delay: 1,
              duration: 1.5,
              ease: "easeOut"
            }}
            aria-hidden="true"
          />
          <motion.div
            className="progress-bar-glow"
            initial={{ width: 0 }}
            animate={{ width: `${streakPercentage}%` }}
            transition={{ 
              delay: 1.2,
              duration: 1.5,
              ease: "easeOut"
            }}
            aria-hidden="true"
          />
        </div>
      </motion.div>

      {/* Milestone badges */}
      {currentStreak >= 7 && (
        <motion.div
          className="streak-badges"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.5, type: "spring" }}
          role="list"
          aria-label="Streak milestone achievements"
        >
          <div className="badge-container">
            {currentStreak >= 7 && (
              <motion.button 
                className="streak-badge week-badge"
                whileHover={{ scale: 1.1, rotate: 5 }}
                role="listitem"
                aria-label="Week Champion: 7+ day streak achieved"
                tabIndex={0}
              >
                🏃 Week Champion
              </motion.button>
            )}
            {currentStreak >= 14 && (
              <motion.button 
                className="streak-badge biweek-badge"
                whileHover={{ scale: 1.1, rotate: -5 }}
                role="listitem"
                aria-label="Two Week Warrior: 14+ day streak achieved"
                tabIndex={0}
              >
                🏆 Two Week Warrior
              </motion.button>
            )}
            {currentStreak >= 30 && (
              <motion.button 
                className="streak-badge month-badge"
                whileHover={{ scale: 1.1, rotate: 5 }}
                role="listitem"
                aria-label="Monthly Master: 30+ day streak achieved"
                tabIndex={0}
              >
                👑 Monthly Master
              </motion.button>
            )}
          </div>
        </motion.div>
      )}
    </motion.section>
  )
}