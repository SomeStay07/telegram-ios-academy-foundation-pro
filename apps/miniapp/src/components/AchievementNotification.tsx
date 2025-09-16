import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAtom } from 'jotai'
import { achievementNotificationAtom } from '../store/profileAtoms'
import { useHaptics } from '../lib/haptics'

// Simple achievement animation - in production you'd use actual Lottie files
const AchievementIcon = ({ icon }: { icon: string }) => (
  <motion.div
    className="text-4xl"
    initial={{ scale: 0, rotate: -180 }}
    animate={{ scale: 1, rotate: 0 }}
    transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
    whileInView={{ 
      scale: [1, 1.2, 1],
      rotate: [0, 5, -5, 0]
    }}
  >
    {icon}
  </motion.div>
)

export const AchievementNotification: React.FC = () => {
  const [achievement, setAchievement] = useAtom(achievementNotificationAtom)
  const haptics = useHaptics()

  React.useEffect(() => {
    if (achievement) {
      haptics.achievement()
      
      // Auto-dismiss after 3 seconds
      const timer = setTimeout(() => {
        setAchievement(null)
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [achievement, haptics, setAchievement])

  return (
    <AnimatePresence>
      {achievement && (
        <motion.div
          className="fixed top-4 left-4 right-4 z-50 pointer-events-none"
          initial={{ opacity: 0, y: -100, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -50, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
          <motion.div
            className="glass-card p-4 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 border-yellow-400/30"
            whileInView={{ 
              boxShadow: [
                "0 8px 32px rgba(0, 0, 0, 0.3)",
                "0 8px 32px rgba(255, 193, 7, 0.4)",
                "0 8px 32px rgba(0, 0, 0, 0.3)"
              ]
            }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            <div className="flex items-center gap-3">
              <AchievementIcon icon={achievement.icon} />
              <div className="flex-1">
                <motion.h3 
                  className="text-white font-semibold text-sm"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  {achievement.title}
                </motion.h3>
                <motion.p 
                  className="text-white/70 text-xs"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  {achievement.description}
                </motion.p>
              </div>
              <motion.button
                className="text-white/50 hover:text-white/80 text-xs px-2 py-1 rounded pointer-events-auto"
                onClick={() => setAchievement(null)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                ✕
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Hook for triggering achievements
export const useAchievement = () => {
  const [, setAchievement] = useAtom(achievementNotificationAtom)

  const trigger = (title: string, description: string, icon: string = '🏆') => {
    setAchievement({
      id: Date.now().toString(),
      title,
      description,
      icon,
      timestamp: Date.now()
    })
  }

  return { trigger }
}