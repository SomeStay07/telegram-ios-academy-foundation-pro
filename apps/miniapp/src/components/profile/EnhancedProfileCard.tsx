/**
 * 🎯 Enhanced Profile Card - Реальная интеграция с API
 * 
 * Компонент профиля с полной интеграцией новых API хуков,
 * синхронизацией с Telegram и real-time обновлениями.
 */

import React from 'react'
import { motion } from 'framer-motion'
import { Card } from '../../design-system'
import { useUserInitialization, useUserStats, useSyncTelegramData } from '../../lib/api'
import { Button } from '../../design-system/components/button'
import { Avatar } from '../../design-system/components/avatar'
import { Progress } from '../../design-system/components/progress'
import { getUserLevel } from '../../shared'
import { InlineLevelBadge } from '../../design-system/components/level-badge/InlineLevelBadge'

interface EnhancedProfileCardProps {
  className?: string
}

export function EnhancedProfileCard({ className }: EnhancedProfileCardProps) {
  const { profile, isLoading, error, isReady } = useUserInitialization()
  const { data: stats, isLoading: statsLoading } = useUserStats()
  const syncTelegram = useSyncTelegramData()
  
  // Calculate user level
  const userLevel = profile ? getUserLevel(stats?.totalXP || 0) : 0

  // Loading state
  if (isLoading || !isReady) {
    return (
      <Card className={className}>
        <div className="flex items-center space-x-4 p-6">
          <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse" />
          <div className="flex-1">
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-2" />
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-3/4" />
          </div>
        </div>
      </Card>
    )
  }

  // Error state
  if (error) {
    return (
      <Card className={className} variant="elevated">
        <div className="p-6 text-center">
          <div className="text-red-500 mb-4">⚠️ Ошибка загрузки профиля</div>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => syncTelegram.mutate(true)}
            disabled={syncTelegram.isPending}
          >
            Повторить
          </Button>
        </div>
      </Card>
    )
  }

  if (!profile) return null

  const completionRate = stats?.lessonStats 
    ? Math.round((stats.lessonStats.completed / stats.lessonStats.total) * 100) 
    : 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className={className} variant="elevated">
        {/* Profile Header */}
        <div className="p-6 border-b border-gray-100 dark:border-gray-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Avatar
                src={profile.photoUrl}
                name={`${profile.firstName} ${profile.lastName || ''}`}
                size="lg"
                variant="default"
              />
              
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                    {profile.firstName} {profile.lastName || ''}
                  </h2>
                  <InlineLevelBadge level={userLevel} size="sm" />
                </div>
                {profile.username && (
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    @{profile.username}
                  </p>
                )}
                {profile.isPremium && (
                  <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-gradient-to-r from-yellow-400 to-yellow-600 text-white rounded-full mt-1">
                    ⭐ Premium
                  </span>
                )}
              </div>
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => syncTelegram.mutate(true)}
              disabled={syncTelegram.isPending}
              className="text-gray-500 hover:text-gray-700"
            >
              {syncTelegram.isPending ? (
                <div className="w-4 h-4 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
              ) : (
                '🔄'
              )}
            </Button>
          </div>
        </div>

        {/* Profile Stats */}
        {stats && !statsLoading && (
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Статистика обучения
            </h3>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {stats.lessonStats.completed}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Уроков завершено
                </div>
              </div>
              
              <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {Math.round(stats.timeStats.totalMinutes / 60)}ч
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Время обучения
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Прогресс курса
                </span>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {completionRate}%
                </span>
              </div>
              <Progress 
                value={completionRate} 
                variant="default"
                size="md"
                className="w-full"
              />
            </div>

            {/* Streak Info */}
            {stats.streakStats.current > 0 && (
              <div className="flex items-center justify-between p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                <div className="flex items-center space-x-2">
                  <span className="text-lg">🔥</span>
                  <span className="text-sm font-medium text-orange-700 dark:text-orange-300">
                    Серия: {stats.streakStats.current} дней
                  </span>
                </div>
                {stats.streakStats.current === stats.streakStats.longest && (
                  <span className="text-xs bg-orange-200 dark:bg-orange-800 text-orange-800 dark:text-orange-200 px-2 py-1 rounded">
                    Рекорд! 🏆
                  </span>
                )}
              </div>
            )}
          </div>
        )}

        {/* Loading state for stats */}
        {statsLoading && (
          <div className="p-6">
            <div className="animate-pulse">
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-4 w-1/3" />
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="h-20 bg-gray-200 dark:bg-gray-700 rounded-lg" />
                <div className="h-20 bg-gray-200 dark:bg-gray-700 rounded-lg" />
              </div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2" />
              <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded" />
            </div>
          </div>
        )}

        {/* Footer with last active */}
        <div className="px-6 py-3 bg-gray-50 dark:bg-gray-800 text-xs text-gray-500 dark:text-gray-400 rounded-b-lg">
          Последняя активность: {new Date(profile.lastActiveAt).toLocaleDateString('ru-RU')}
        </div>
      </Card>
    </motion.div>
  )
}