import React from 'react'
import { motion } from 'framer-motion'
import { useHaptics } from '../lib/haptics'
import { useAchievement } from './AchievementNotification'

interface Skill {
  name: string
  level: number
  category: 'frontend' | 'backend' | 'mobile' | 'devops'
  xp: number
  maxXP: number
}

interface Activity {
  id: string
  title: string
  description: string
  type: 'completed' | 'in_progress' | 'upcoming'
  timestamp: Date
  xpGained?: number
}

interface ActivitySectionProps {
  className?: string
}

// Mock data - в реальном проекте будет приходить из API
const mockSkills: Skill[] = [
  { name: 'React', level: 8, category: 'frontend', xp: 850, maxXP: 1000 },
  { name: 'TypeScript', level: 7, category: 'frontend', xp: 720, maxXP: 1000 },
  { name: 'Node.js', level: 6, category: 'backend', xp: 600, maxXP: 1000 },
  { name: 'Swift', level: 5, category: 'mobile', xp: 480, maxXP: 1000 },
]

const mockActivities: Activity[] = [
  {
    id: '1',
    title: 'Завершил React Challenge',
    description: 'Создание интерактивного компонента',
    type: 'completed',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 часа назад
    xpGained: 150
  },
  {
    id: '2', 
    title: 'Изучаю TypeScript Generics',
    description: 'Продвинутые типы и дженерики',
    type: 'in_progress',
    timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 минут назад
  },
  {
    id: '3',
    title: 'Swift UI Basics',
    description: 'Основы создания iOS интерфейсов',
    type: 'upcoming',
    timestamp: new Date(Date.now() + 24 * 60 * 60 * 1000), // завтра
  }
]

export const ActivitySection: React.FC<ActivitySectionProps> = ({ className = '' }) => {
  const haptics = useHaptics()
  const achievement = useAchievement()

  const getCategoryBadgeClass = (category: Skill['category']) => {
    switch (category) {
      case 'frontend': return 'badge badge-primary'
      case 'backend': return 'badge badge-secondary' 
      case 'mobile': return 'badge badge-tertiary'
      case 'devops': return 'badge badge-ghost'
      default: return 'badge badge-subtle'
    }
  }

  const getActivityBadgeClass = (type: Activity['type']) => {
    switch (type) {
      case 'completed': return 'badge badge-success'
      case 'in_progress': return 'badge badge-primary'
      case 'upcoming': return 'badge badge-outline'
      default: return 'badge badge-subtle'
    }
  }

  const getActivityIcon = (type: Activity['type']) => {
    switch (type) {
      case 'completed': return '✅'
      case 'in_progress': return '⚡'
      case 'upcoming': return '📅'
      default: return '📝'
    }
  }

  const formatTimeAgo = (date: Date) => {
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))
    
    if (diffInMinutes < 0) {
      const hoursUntil = Math.ceil(Math.abs(diffInMinutes) / 60)
      return `через ${hoursUntil}ч`
    }
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes}м назад`
    }
    
    const hoursAgo = Math.floor(diffInMinutes / 60)
    return `${hoursAgo}ч назад`
  }

  const handleSkillClick = (skill: Skill) => {
    haptics.impact('medium')
    achievement.trigger(
      `${skill.name} Мастерство! 🚀`,
      `Уровень ${skill.level} • ${skill.xp}/${skill.maxXP} XP`,
      '💪'
    )
  }

  const handleActivityClick = (activity: Activity) => {
    haptics.selection()
    achievement.trigger(
      `${getActivityIcon(activity.type)} ${activity.title}`,
      activity.description,
      getActivityIcon(activity.type)
    )
  }

  return (
    <motion.section
      className={`activity-section-container ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      role="region"
      aria-labelledby="activity-section-title"
    >
      {/* Навыки и Технологии */}
      <motion.div 
        className="skills-subsection"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="subsection-header">
          <h3 id="activity-section-title" className="subsection-title">
            💻 Навыки & Технологии
          </h3>
          <p className="subsection-subtitle">Твой технический стек</p>
        </div>

        <div className="skills-grid">
          {mockSkills.map((skill, index) => (
            <motion.button
              key={skill.name}
              className="skill-card"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 * index + 0.3, type: "spring" }}
              whileHover={{ 
                scale: 1.02,
                y: -2
              }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleSkillClick(skill)}
              aria-label={`${skill.name}: уровень ${skill.level}, ${skill.xp} из ${skill.maxXP} опыта`}
            >
              <div className="skill-header">
                <span className="skill-name">{skill.name}</span>
                <span className={getCategoryBadgeClass(skill.category)}>
                  Level {skill.level}
                </span>
              </div>
              
              <div className="skill-progress">
                <div className="skill-progress-bar">
                  <motion.div
                    className="skill-progress-fill"
                    initial={{ width: 0 }}
                    animate={{ width: `${(skill.xp / skill.maxXP) * 100}%` }}
                    transition={{ delay: 0.5 + index * 0.1, duration: 1, ease: "easeOut" }}
                  />
                </div>
                <span className="skill-progress-text">
                  {skill.xp}/{skill.maxXP} XP
                </span>
              </div>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Последние Активности */}
      <motion.div 
        className="activities-subsection"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="subsection-header">
          <h3 className="subsection-title">
            🎯 Последние Активности
          </h3>
          <p className="subsection-subtitle">Твой прогресс в обучении</p>
        </div>

        <div className="activities-list">
          {mockActivities.map((activity, index) => (
            <motion.button
              key={activity.id}
              className={`activity-card activity-${activity.type}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index + 0.6 }}
              whileHover={{ 
                scale: 1.01,
                x: 4
              }}
              whileTap={{ scale: 0.99 }}
              onClick={() => handleActivityClick(activity)}
              aria-label={`${activity.title}: ${activity.description}`}
            >
              <div className="activity-icon">
                {getActivityIcon(activity.type)}
              </div>
              
              <div className="activity-content">
                <div className="activity-header">
                  <h4 className="activity-title">{activity.title}</h4>
                  <span className={getActivityBadgeClass(activity.type)}>
                    {activity.type === 'completed' ? 'Завершено' :
                     activity.type === 'in_progress' ? 'В процессе' : 'Запланировано'}
                  </span>
                </div>
                <p className="activity-description">{activity.description}</p>
                <div className="activity-meta">
                  <span className="activity-time">{formatTimeAgo(activity.timestamp)}</span>
                  {activity.xpGained && (
                    <span className="activity-xp">+{activity.xpGained} XP</span>
                  )}
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </motion.div>
    </motion.section>
  )
}