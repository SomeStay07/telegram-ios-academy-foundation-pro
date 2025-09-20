import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Clock, Code, Trophy, Zap, BookOpen, Target, ChevronDown, ExternalLink } from 'lucide-react'

interface ActivityItem {
  id: string
  type: 'lesson' | 'achievement' | 'xp' | 'streak'
  title: string
  timeAgo: string
  value?: string | number
  icon: React.ComponentType<any>
  color: string
}

interface RecentActivityProps {
  itemVariants: any
}

export function RecentActivity({ itemVariants }: RecentActivityProps) {
  const [showAll, setShowAll] = useState(false)
  
  const activities: ActivityItem[] = [
    {
      id: '1',
      type: 'lesson',
      title: 'Завершён урок',
      timeAgo: '2 часа назад',
      value: 'React Hooks',
      icon: BookOpen,
      color: 'text-blue-400'
    },
    {
      id: '2', 
      type: 'xp',
      title: 'Получен опыт',
      timeAgo: '2 часа назад',
      value: '+250 XP',
      icon: Zap,
      color: 'text-yellow-400'
    },
    {
      id: '3',
      type: 'achievement',
      title: 'Достижение разблокировано',
      timeAgo: 'Вчера',
      value: 'Мастер React',
      icon: Trophy,
      color: 'text-purple-400'
    },
    {
      id: '4',
      type: 'streak',
      title: 'Серия увеличена',
      timeAgo: 'Вчера',
      value: '7 дней',
      icon: Target,
      color: 'text-orange-400'
    },
    {
      id: '5',
      type: 'lesson',
      title: 'Завершён урок',
      timeAgo: '2 дня назад',
      value: 'TypeScript Basics',
      icon: Code,
      color: 'text-blue-400'
    },
    {
      id: '6',
      type: 'xp',
      title: 'Получен опыт',
      timeAgo: '2 дня назад',
      value: '+180 XP',
      icon: Zap,
      color: 'text-yellow-400'
    },
    {
      id: '7',
      type: 'achievement',
      title: 'Достижение разблокировано',
      timeAgo: '3 дня назад',
      value: 'Первые шаги',
      icon: Trophy,
      color: 'text-green-400'
    },
    {
      id: '8',
      type: 'lesson',
      title: 'Завершён урок',
      timeAgo: '3 дня назад',
      value: 'JavaScript ES6',
      icon: BookOpen,
      color: 'text-blue-400'
    }
  ]
  
  const displayedActivities = showAll ? activities : activities.slice(0, 3)

  return (
    <motion.div 
      variants={itemVariants}
      className="mb-4"
    >
      <div className="bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 p-3">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-gray-600 dark:text-white/60" />
            <span 
              className="text-sm font-medium text-gray-900 dark:text-white/80"
              style={{ fontFamily: 'var(--font-gaming)' }}
            >
              Недавняя активность
            </span>
          </div>
          
          {/* Scroll indicator */}
          {!showAll && activities.length > 3 && (
            <motion.div
              className="flex items-center gap-1 text-gray-500 dark:text-white/40 text-xs"
              animate={{ opacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span>Скролл</span>
              <ChevronDown className="w-3 h-3" />
            </motion.div>
          )}
        </div>
        
        <div className={`space-y-2 ${showAll ? 'max-h-none' : 'max-h-40'} ${showAll ? '' : 'overflow-y-auto'} relative`}>
          {/* Scroll gradient overlay */}
          {!showAll && activities.length > 3 && (
            <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white/5 to-transparent pointer-events-none z-10 rounded-b-lg" />
          )}
          
          {displayedActivities.map((activity, index) => {
            const Icon = activity.icon
            return (
              <motion.div
                key={activity.id}
                className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-white/5 transition-colors duration-200"
                style={{ margin: '2px' }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.01, x: 2 }}
              >
                <div className="flex-shrink-0">
                  <div className="p-1.5 rounded-full bg-gray-200 dark:bg-white/10">
                    <Icon className={`w-3 h-3 ${activity.color}`} />
                  </div>
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-600 dark:text-white/70 truncate">
                      {activity.title}
                    </span>
                    <span 
                      className="text-xs font-medium text-gray-900 dark:text-white/90 ml-2"
                      style={{ 
                        fontFamily: 'var(--font-gaming)',
                        fontVariantNumeric: 'tabular-nums'
                      }}
                    >
                      {activity.value}
                    </span>
                  </div>
                  <span className="text-xs text-gray-500 dark:text-white/50">
                    {activity.timeAgo}
                  </span>
                </div>
              </motion.div>
            )
          })}
        </div>
        
        {/* View All / Show Less Button */}
        {activities.length > 3 && (
          <motion.button
            onClick={() => setShowAll(!showAll)}
            className="w-full mt-3 flex items-center justify-center gap-2 text-xs text-gray-600 dark:text-white/60 hover:text-gray-800 dark:hover:text-white/80 hover:bg-gray-100 dark:hover:bg-white/5 transition-all duration-200 py-2 px-3 rounded-md border border-gray-200 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/20"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            style={{ fontFamily: 'var(--font-gaming)' }}
          >
            {showAll ? (
              <>
                <span>Скрыть</span>
                <motion.div
                  animate={{ rotate: showAll ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="w-3 h-3" />
                </motion.div>
              </>
            ) : (
              <>
                <span>Показать всё ({activities.length})</span>
                <ExternalLink className="w-3 h-3" />
              </>
            )}
          </motion.button>
        )}
      </div>
    </motion.div>
  )
}