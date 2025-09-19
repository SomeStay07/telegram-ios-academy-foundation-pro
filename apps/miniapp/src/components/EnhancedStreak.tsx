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
      // Для демонстрации создаем разные типы дней
      let completed = false
      if (i === 6) completed = true  // Самый старый день - завершен
      if (i === 5) completed = true  // Предпоследний - завершен  
      if (i === 4) completed = false // Пропущенный день
      if (i === 3) completed = true  // Завершен
      if (i === 2) completed = true  // Завершен (вчера)
      if (i === 1) completed = false // Не завершен
      if (i === 0) completed = false // Сегодня - в процессе
      
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
    if (currentStreak === 0) return "Начните серию сегодня!"
    if (currentStreak < 3) return "Набираете обороты!"
    if (currentStreak < 7) return "Отличная стабильность!"
    if (currentStreak < 14) return "Вы в огне!"
    if (currentStreak < 30) return "Мастер серий!"
    return "Легендарная преданность!"
  }

  const getRussianDayName = (date: Date) => {
    const days = ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота']
    return days[date.getDay()]
  }

  const getRussianDayShort = (date: Date) => {
    const days = ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб']
    return days[date.getDay()]
  }

  const getDateNumber = (date: Date) => {
    return date.getDate()
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
            ⚡
          </motion.div>
          <div>
            <h2 id="streak-title" className="streak-title">Ежедневная Серия</h2>
            <p className="streak-subtitle">{getStreakMessage()}</p>
          </div>
        </div>
        
        <motion.button 
          className="streak-counter"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onTap={() => {
            haptics.impact('medium')
            // Streak interaction tracked for user engagement
          }}
          aria-label={`Текущая серия: ${currentStreak} дней. Нажмите для подробностей`}
          tabIndex={0}
        >
          <span className="streak-number" aria-hidden="true">{currentStreak}</span>
          <span className="streak-days-label">дней</span>
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
                // Day interaction tracked for calendar engagement
              }}
              role="gridcell"
              aria-label={`${getRussianDayName(day.date)}, ${getDateNumber(day.date)} число${day.completed ? ', выполнено' : ''}${day.isToday ? ', сегодня' : ''}`}
              aria-pressed={day.completed}
              disabled={day.isFuture}
              tabIndex={day.isFuture ? -1 : 0}
            >
              {/* Day info display */}
              <div className="day-info">
                <span className="day-name">{getRussianDayShort(day.date)}</span>
                <span className="day-number">{getDateNumber(day.date)}</span>
              </div>

              
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
          <span className="progress-label">Прогресс до {maxStreak} дней</span>
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
                aria-label="Чемпион недели: серия 7+ дней достигнута"
                tabIndex={0}
              >
                🏃 Чемпион Недели
              </motion.button>
            )}
            {currentStreak >= 14 && (
              <motion.button 
                className="streak-badge biweek-badge"
                whileHover={{ scale: 1.1, rotate: -5 }}
                role="listitem"
                aria-label="Воин двух недель: серия 14+ дней достигнута"
                tabIndex={0}
              >
                🏆 Воин Двух Недель
              </motion.button>
            )}
            {currentStreak >= 30 && (
              <motion.button 
                className="streak-badge month-badge"
                whileHover={{ scale: 1.1, rotate: 5 }}
                role="listitem"
                aria-label="Мастер месяца: серия 30+ дней достигнута"
                tabIndex={0}
              >
                👑 Мастер Месяца
              </motion.button>
            )}
          </div>
        </motion.div>
      )}
    </motion.section>
  )
}