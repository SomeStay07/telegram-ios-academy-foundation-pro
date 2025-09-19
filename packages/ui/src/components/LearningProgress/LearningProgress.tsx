import React from 'react'
import { cn } from '../../utils/cn'
import { Card } from '../Card'
import { Progress } from '../Progress'
import { Achievement } from '../Achievement'
import { StatsCard } from '../StatsCard'
import { 
  EducationIcons, 
  AchievementIcons, 
  StatsIcons,
  DeveloperIcons
} from '../../icons'

interface LearningProgressProps {
  coursesCompleted: number
  totalCourses: number
  currentStreak: number
  totalHours: number
  level: number
  recentAchievements?: {
    id: string
    title: string
    description: string
    icon: string
    unlockedAt: Date
  }[]
  weeklyProgress?: number[]
  className?: string
}

export function LearningProgress({
  coursesCompleted,
  totalCourses,
  currentStreak,
  totalHours,
  level,
  recentAchievements = [],
  weeklyProgress = [],
  className,
}: LearningProgressProps) {
  const progressPercentage = Math.round((coursesCompleted / totalCourses) * 100)
  const isOnFire = currentStreak >= 7
  const isExpert = level >= 10

  return (
    <Card className={cn("p-6 space-y-6", className)}>
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-xl bg-gradient-to-br from-blue-500/10 to-purple-500/10">
          <EducationIcons.graduation className="w-6 h-6 text-blue-600 dark:text-blue-400" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">Learning Progress</h3>
          <p className="text-sm text-muted-foreground">Your iOS development journey</p>
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatsCard
          title="Courses"
          value={`${coursesCompleted}/${totalCourses}`}
          subtitle="completed"
          icon={<EducationIcons.book className="w-5 h-5" />}
          variant="primary"
          trend={coursesCompleted > 0 ? 'up' : 'neutral'}
          trendValue={`${progressPercentage}%`}
        />
        
        <StatsCard
          title="Streak"
          value={currentStreak}
          subtitle="days"
          icon={isOnFire ? <AchievementIcons.fire className="w-5 h-5" /> : <AchievementIcons.lightning className="w-5 h-5" />}
          variant={isOnFire ? "warning" : "default"}
          trend={currentStreak > 0 ? 'up' : 'neutral'}
        />
        
        <StatsCard
          title="Hours"
          value={totalHours}
          subtitle="studied"
          icon={<StatsIcons.clock className="w-5 h-5" />}
          variant="success"
          trend="up"
        />
        
        <StatsCard
          title="Level"
          value={level}
          subtitle={isExpert ? "Expert" : "Learning"}
          icon={isExpert ? <AchievementIcons.crown className="w-5 h-5" /> : <AchievementIcons.star className="w-5 h-5" />}
          variant={isExpert ? "purple" : "default"}
          trend="up"
        />
      </div>

      {/* Overall Progress */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-foreground">Course Progress</span>
          <span className="text-sm text-muted-foreground">{progressPercentage}% Complete</span>
        </div>
        <Progress
          value={coursesCompleted}
          max={totalCourses}
          variant="default"
          animated={progressPercentage < 100}
          className="h-2"
        />
      </div>

      {/* Weekly Activity */}
      {weeklyProgress.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-foreground">This Week</h4>
          <div className="flex gap-2">
            {weeklyProgress.map((value, index) => {
              const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
              const isToday = index === new Date().getDay() - 1
              const hasActivity = value > 0
              
              return (
                <div key={index} className="flex-1 space-y-1">
                  <div className="text-xs text-center text-muted-foreground">
                    {dayNames[index]}
                  </div>
                  <div
                    className={cn(
                      "h-8 rounded-md transition-all duration-200",
                      hasActivity
                        ? "bg-gradient-to-t from-green-500 to-green-400 shadow-lg"
                        : "bg-muted",
                      isToday && "ring-2 ring-blue-400 ring-offset-1"
                    )}
                    style={{
                      opacity: hasActivity ? Math.max(0.3, value / 100) : 0.3,
                    }}
                  />
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Recent Achievements */}
      {recentAchievements.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <AchievementIcons.trophy className="w-4 h-4 text-yellow-500" />
            <h4 className="text-sm font-medium text-foreground">Recent Achievements</h4>
          </div>
          <div className="flex flex-wrap gap-2">
            {recentAchievements.slice(0, 3).map((achievement) => (
              <Achievement
                key={achievement.id}
                title={achievement.title}
                description={achievement.description}
                variant="gold"
                size="sm"
                icon={
                  achievement.icon === 'swift' ? <DeveloperIcons.swift className="w-4 h-4" /> :
                  achievement.icon === 'course' ? <EducationIcons.certificate className="w-4 h-4" /> :
                  <AchievementIcons.star className="w-4 h-4" />
                }
              />
            ))}
          </div>
        </div>
      )}

      {/* Next Milestone */}
      <div className="p-4 rounded-xl bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 border border-blue-200 dark:border-blue-800">
        <div className="flex items-center gap-3">
          <StatsIcons.rocket className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <div>
            <h5 className="text-sm font-medium text-foreground">Next Milestone</h5>
            <p className="text-xs text-muted-foreground">
              {totalCourses - coursesCompleted} courses until level {level + 1}
            </p>
          </div>
        </div>
      </div>
    </Card>
  )
}

LearningProgress.displayName = 'LearningProgress'