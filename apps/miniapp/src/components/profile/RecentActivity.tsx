import React from 'react'
import { motion } from 'framer-motion'
import { Clock, Code, Trophy, Zap, BookOpen, Target } from 'lucide-react'

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
    }
  ]

  return (
    <motion.div 
      variants={itemVariants}
      className="mb-4"
    >
      <div className="bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 p-3">
        <div className="flex items-center gap-2 mb-3">
          <Clock className="w-4 h-4 text-white/60" />
          <span 
            className="text-sm font-medium text-white/80"
            style={{ fontFamily: 'var(--font-gaming)' }}
          >
            Недавняя активность
          </span>
        </div>
        
        <div className="space-y-2 max-h-32 overflow-y-auto">
          {activities.map((activity, index) => {
            const Icon = activity.icon
            return (
              <motion.div
                key={activity.id}
                className="flex items-center gap-3 p-2 rounded-md hover:bg-white/5 transition-colors duration-200"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02, x: 4 }}
              >
                <div className="flex-shrink-0">
                  <div className="p-1.5 rounded-full bg-white/10">
                    <Icon className={`w-3 h-3 ${activity.color}`} />
                  </div>
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-white/70 truncate">
                      {activity.title}
                    </span>
                    <span 
                      className="text-xs font-medium text-white/90 ml-2"
                      style={{ 
                        fontFamily: 'var(--font-gaming)',
                        fontVariantNumeric: 'tabular-nums'
                      }}
                    >
                      {activity.value}
                    </span>
                  </div>
                  <span className="text-xs text-white/50">
                    {activity.timeAgo}
                  </span>
                </div>
              </motion.div>
            )
          })}
        </div>
        
        {/* View All Button */}
        <motion.button
          className="w-full mt-2 text-xs text-white/60 hover:text-white/80 transition-colors duration-200 text-center py-1"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          style={{ fontFamily: 'var(--font-gaming)' }}
        >
          Показать всё
        </motion.button>
      </div>
    </motion.div>
  )
}