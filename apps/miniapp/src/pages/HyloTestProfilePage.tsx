import React, { useMemo } from 'react'
import { motion } from 'framer-motion'
import { Trophy, Crown, Zap, Target, Calendar, Flame, Star, Award } from 'lucide-react'

/**
 * Hylo-стиль тестовый профиль 
 * Полная копия дизайна для тестирования
 */
export function HyloTestProfilePage() {
  // Тестовые данные в стиле Hylo
  const userData = useMemo(() => ({
    totalXP: 1_847_293,
    level: 47,
    rank: "Swift Master",
    globalRank: 156,
    weeklyRank: 23,
    crowns: 847,
    streak: 15,
    completedCourses: 12,
    xpToday: 2_847,
    activeBoost: 150, // %
    nextLevel: {
      level: 48,
      xpNeeded: 52_707
    }
  }), [])

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white p-4">
      {/* Header */}
      <div className="text-center mb-8 pt-4">
        <h1 className="text-2xl font-bold text-white mb-2">iOS Academy Season 1</h1>
        <p className="text-gray-400">Master Swift, build apps, climb the ranks. That's it, that's our learning system.</p>
      </div>

      {/* Hero Card - главная карточка */}
      <motion.div 
        className="relative mb-6 p-6 rounded-2xl border-2 border-yellow-400/50 bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{
          boxShadow: '0 0 30px rgba(250, 204, 21, 0.3)'
        }}
      >
        <div className="flex items-center gap-6">
          {/* iOS Badge/Shield */}
          <div className="relative">
            <div 
              className="w-20 h-20 rounded-2xl flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 50%, #1E40AF 100%)',
                boxShadow: '0 8px 32px rgba(59, 130, 246, 0.4), inset 0 2px 8px rgba(255,255,255,0.2)'
              }}
            >
              <div className="text-white text-2xl font-bold">📱</div>
            </div>
            {/* Glow effect */}
            <div 
              className="absolute inset-0 w-20 h-20 rounded-2xl blur-xl opacity-60"
              style={{ background: 'linear-gradient(135deg, #3B82F6, #1D4ED8)' }}
            />
          </div>

          {/* XP Number - очень большой */}
          <div className="flex-1">
            <div 
              className="text-5xl md:text-6xl font-black mb-1"
              style={{
                background: 'linear-gradient(135deg, #FBBF24 0%, #F59E0B 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontVariantNumeric: 'tabular-nums',
                textShadow: '0 0 30px rgba(251, 191, 36, 0.5)'
              }}
            >
              {userData.totalXP.toLocaleString()}
            </div>
            <div className="text-gray-400 text-sm font-medium">Total XP</div>
          </div>

          {/* Level */}
          <div className="text-right">
            <div className="text-4xl font-bold text-white mb-1">Level {userData.level}</div>
            <div className="text-yellow-400 text-sm font-medium">{userData.rank}</div>
          </div>
        </div>
      </motion.div>

      {/* Progress Bar */}
      <motion.div 
        className="mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <div className="flex justify-between text-sm text-gray-400 mb-2">
          <span>Progress to Level {userData.nextLevel.level}</span>
          <span>Lv. {userData.nextLevel.level}</span>
        </div>
        <div className="relative h-3 bg-gray-800 rounded-full overflow-hidden">
          <motion.div 
            className="h-full rounded-full"
            style={{
              background: 'linear-gradient(90deg, #8B5CF6 0%, #7C3AED 50%, #6D28D9 100%)',
              width: '73%'
            }}
            initial={{ width: 0 }}
            animate={{ width: '73%' }}
            transition={{ duration: 1, delay: 0.5 }}
          />
          <div 
            className="absolute inset-0 rounded-full"
            style={{
              background: 'linear-gradient(90deg, transparent 0%, rgba(139, 92, 246, 0.5) 50%, transparent 100%)',
              animation: 'shimmer 2s infinite'
            }}
          />
        </div>
      </motion.div>

      {/* 2x2 Metrics Grid */}
      <motion.div 
        className="grid grid-cols-2 gap-4 mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {/* Global Rank */}
        <div className="bg-gray-900/80 backdrop-blur-sm border border-gray-700 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div 
              className="w-12 h-12 rounded-lg flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                boxShadow: '0 4px 16px rgba(245, 158, 11, 0.3)'
              }}
            >
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white">#{userData.globalRank}</div>
              <div className="text-gray-400 text-sm">Global Rank</div>
            </div>
          </div>
        </div>

        {/* Crowns */}
        <div className="bg-gray-900/80 backdrop-blur-sm border border-gray-700 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div 
              className="w-12 h-12 rounded-lg flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, #FBBF24 0%, #F59E0B 100%)',
                boxShadow: '0 4px 16px rgba(251, 191, 36, 0.3)'
              }}
            >
              <Crown className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white">{userData.crowns}</div>
              <div className="text-gray-400 text-sm">Crowns</div>
            </div>
          </div>
        </div>

        {/* XP Today */}
        <div className="bg-gray-900/80 backdrop-blur-sm border border-gray-700 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div 
              className="w-12 h-12 rounded-lg flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, #06B6D4 0%, #0891B2 100%)',
                boxShadow: '0 4px 16px rgba(6, 182, 212, 0.3)'
              }}
            >
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white">{userData.xpToday.toLocaleString()}</div>
              <div className="text-gray-400 text-sm">XP Today</div>
            </div>
          </div>
        </div>

        {/* Active Boost */}
        <div className="bg-gray-900/80 backdrop-blur-sm border border-gray-700 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div 
              className="w-12 h-12 rounded-lg flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                boxShadow: '0 4px 16px rgba(16, 185, 129, 0.3)'
              }}
            >
              <Target className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white">{userData.activeBoost}%</div>
              <div className="text-gray-400 text-sm">Active Boost</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Flash Boost Section */}
      <motion.div 
        className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 backdrop-blur-sm border border-purple-500/30 rounded-xl p-4 mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-purple-400" />
            <span className="text-white font-medium">Swift Learning Boost</span>
          </div>
          <div className="text-gray-400 text-sm">End in: 24:15:30</div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            {/* Boost icons */}
            {[
              { icon: '📱', color: 'bg-blue-500' },
              { icon: '⚡', color: 'bg-yellow-500' },
              { icon: '🚀', color: 'bg-green-500' },
              { icon: '💎', color: 'bg-purple-500' },
              { icon: '🔥', color: 'bg-red-500' }
            ].map((item, i) => (
              <div 
                key={i}
                className={`w-8 h-8 ${item.color} rounded-lg flex items-center justify-center text-sm`}
              >
                {item.icon}
              </div>
            ))}
          </div>
          <div className="text-right">
            <div className="text-gray-400 text-sm">XP multiplier:</div>
            <div className="text-2xl font-bold text-white">x2</div>
          </div>
        </div>
      </motion.div>

      {/* Weekly Stats */}
      <motion.div 
        className="grid grid-cols-1 gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        {/* Weekly Rank */}
        <div className="bg-gray-900/80 backdrop-blur-sm border border-gray-700 rounded-xl p-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div 
                className="w-12 h-12 rounded-lg flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)',
                  boxShadow: '0 4px 16px rgba(139, 92, 246, 0.3)'
                }}
              >
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-xl font-bold text-white">Weekly Rank</div>
                <div className="text-gray-400 text-sm">This week's performance</div>
              </div>
            </div>
            <div className="text-3xl font-bold text-purple-400">#{userData.weeklyRank}</div>
          </div>
        </div>

        {/* Current Streak */}
        <div className="bg-gray-900/80 backdrop-blur-sm border border-gray-700 rounded-xl p-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div 
                className="w-12 h-12 rounded-lg flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, #F97316 0%, #EA580C 100%)',
                  boxShadow: '0 4px 16px rgba(249, 115, 22, 0.3)'
                }}
              >
                <Flame className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-xl font-bold text-white">Learning Streak</div>
                <div className="text-gray-400 text-sm">Days in a row</div>
              </div>
            </div>
            <div className="text-3xl font-bold text-orange-400">{userData.streak}</div>
          </div>
        </div>
      </motion.div>

      {/* Next Tier Preview */}
      <motion.div 
        className="mt-6 bg-gradient-to-r from-amber-900/30 to-yellow-900/30 backdrop-blur-sm border border-amber-500/30 rounded-xl p-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <div className="flex justify-between items-center">
          <div>
            <div className="text-white font-medium">Next Tier</div>
            <div className="text-gray-400 text-sm">iOS Expert at Level {userData.nextLevel.level} • {userData.nextLevel.xpNeeded.toLocaleString()} XP needed</div>
          </div>
          <div 
            className="w-12 h-12 rounded-lg flex items-center justify-center"
            style={{
              background: 'linear-gradient(135deg, #92400E 0%, #78350F 100%)',
              boxShadow: '0 4px 16px rgba(146, 64, 14, 0.3)'
            }}
          >
            <Star className="w-6 h-6 text-amber-400" />
          </div>
        </div>
      </motion.div>

      {/* CSS для анимации */}
      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  )
}