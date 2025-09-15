import { Calendar, Trophy, Target, Zap, Clock, Award } from 'lucide-react'
import { CardSurface, StatCard, StreakCounter } from '@telegram-ios-academy/ui'

interface ActivityStatsSectionProps {
  interviewsAttempted: number
  averageScore: number
  currentStreak?: number
  bestStreak?: number
  totalStudyTime?: number // in minutes
  weeklyXP?: number
  monthlyXP?: number
  achievements?: number
}

export function ActivityStatsSection({
  interviewsAttempted,
  averageScore,
  currentStreak = 7,
  bestStreak = 12,
  totalStudyTime = 1440, // 24 hours
  weeklyXP = 350,
  monthlyXP = 1250,
  achievements = 8,
}: ActivityStatsSectionProps) {
  const studyHours = Math.floor(totalStudyTime / 60)
  const studyMinutes = totalStudyTime % 60

  const weeklyGrowth = Math.random() * 20 + 5 // Mock growth %
  const monthlyGrowth = Math.random() * 15 + 10 // Mock growth %

  return (
    <CardSurface interactive className="p-4 sm:p-5 transition-all duration-200">
      <div className="flex items-center gap-3 mb-6">
        <Zap className="card-icon w-5 h-5 text-muted-foreground" />
        <h3 className="card-section-header text-lg font-semibold text-foreground">
          Activity & Achievements
        </h3>
      </div>

      {/* Streak Section */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-3">
          <Calendar className="card-icon w-4 h-4 text-muted-foreground" />
          <h4 className="font-medium text-foreground">Learning Streak</h4>
        </div>
        
        <div className="flex justify-center">
          <StreakCounter
            currentStreak={currentStreak}
            bestStreak={bestStreak}
            variant="fire"
            size="lg"
            animated={true}
            showBest={true}
          />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="space-y-4">
        <h4 className="font-medium text-foreground flex items-center gap-2">
          <Target className="card-icon w-4 h-4" />
          Performance Stats
        </h4>
        
        <div className="grid grid-cols-2 gap-3">
          {/* Interviews */}
          <StatCard
            title="Mock Interviews"
            value={interviewsAttempted}
            subtitle="Total completed"
            icon={<Trophy className="w-6 h-6" />}
            variant="primary"
            size="sm"
            trend={interviewsAttempted > 5 ? "up" : "neutral"}
            trendValue={interviewsAttempted > 5 ? "+2 this week" : "Keep going!"}
          />

          {/* Average Score */}
          <StatCard
            title="Average Score"
            value={`${averageScore}%`}
            subtitle="Interview performance"
            icon={<Target className="w-6 h-6" />}
            variant={averageScore >= 80 ? "success" : averageScore >= 60 ? "warning" : "danger"}
            size="sm"
            trend={averageScore >= 70 ? "up" : "neutral"}
            trendValue={averageScore >= 70 ? "Excellent!" : "Improving"}
          />

          {/* Study Time */}
          <StatCard
            title="Study Time"
            value={`${studyHours}h ${studyMinutes}m`}
            subtitle="Total learning time"
            icon={<Clock className="w-6 h-6" />}
            variant="info"
            size="sm"
            trend="up"
            trendValue="+3h this week"
          />

          {/* Achievements */}
          <StatCard
            title="Achievements"
            value={achievements}
            subtitle="Badges earned"
            icon={<Award className="w-6 h-6" />}
            variant="warning"
            size="sm"
            trend={achievements > 5 ? "up" : "neutral"}
            trendValue={achievements > 5 ? "Great progress!" : "Keep learning"}
          />
        </div>
      </div>

      {/* XP Progress */}
      <div className="mt-6 pt-4 border-t border-border">
        <h4 className="font-medium text-foreground flex items-center gap-2 mb-3">
          <Zap className="card-icon w-4 h-4" />
          Experience Points
        </h4>
        
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 bg-muted/30 rounded-lg border border-border/50">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium text-foreground">This Week</span>
              <span className="text-xs text-green-600 dark:text-green-400 flex items-center gap-1">
                ↗ {weeklyGrowth.toFixed(1)}%
              </span>
            </div>
            <div className="text-xl font-bold text-foreground">{weeklyXP} XP</div>
            <div className="text-xs text-muted-foreground">+50 XP/day avg</div>
          </div>
          
          <div className="p-3 bg-muted/30 rounded-lg border border-border/50">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium text-foreground">This Month</span>
              <span className="text-xs text-blue-600 dark:text-blue-400 flex items-center gap-1">
                ↗ {monthlyGrowth.toFixed(1)}%
              </span>
            </div>
            <div className="text-xl font-bold text-foreground">{monthlyXP} XP</div>
            <div className="text-xs text-muted-foreground">~40 XP/day avg</div>
          </div>
        </div>
      </div>
    </CardSurface>
  )
}