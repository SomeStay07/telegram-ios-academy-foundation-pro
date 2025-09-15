import { Card } from '@telegram-ios-academy/ui'
import { ProgressSummaryCard, ActivityListCard, type ActivityItem } from '@telegram-ios-academy/ui'
import { CheckCircle, BookOpen, Clock, Trophy, Target, Calendar } from 'lucide-react'

interface ProfileStatsSectionProps {
  stats: {
    completed: number
    hours: number
    streak: number
  }
  totalCourses?: number
  weeklyStreak?: number[]
  recentActivities?: ActivityItem[]
}

export function ProfileStatsSection({
  stats,
  totalCourses = 6,
  weeklyStreak = [1, 1, 0, 1, 1, 1, 0],
  recentActivities = []
}: ProfileStatsSectionProps) {
  const overallProgress = Math.round((stats.completed / totalCourses) * 100)

  // Default activities if none provided
  const defaultActivities: ActivityItem[] = [
    {
      id: '1',
      title: 'Завершил iOS Fundamentals',
      description: 'Изучил основы разработки iOS приложений',
      timestamp: '2ч назад',
      icon: <CheckCircle className="w-5 h-5" />,
      type: 'success'
    },
    {
      id: '2',
      title: 'Начал Swift Language Basics',
      description: 'Приступил к изучению языка Swift',
      timestamp: '1д назад',
      icon: <BookOpen className="w-5 h-5" />,
      type: 'info'
    },
    {
      id: '3',
      title: 'Учебная сессия',
      description: 'Потратил 2 часа на изучение UI/UX принципов',
      timestamp: '2д назад',
      icon: <Clock className="w-5 h-5" />,
      type: 'default'
    }
  ]

  const displayActivities = recentActivities.length > 0 ? recentActivities : defaultActivities

  return (
    <div className="space-y-4">
      {/* Progress Overview Card */}
      <ProgressSummaryCard
        title="Прогресс обучения"
        description="Ваши достижения в iOS Academy"
        progress={overallProgress}
        stats={[
          {
            label: 'Курсы',
            value: `${stats.completed}/${totalCourses}`,
            icon: <Target className="w-4 h-4" />
          },
          {
            label: 'Часы',
            value: `${stats.hours}ч`,
            icon: <Clock className="w-4 h-4" />
          },
          {
            label: 'Стрик',
            value: `${stats.streak} дней`,
            icon: <Trophy className="w-4 h-4" />
          }
        ]}
        weeklyProgress={weeklyStreak}
      />

      {/* Recent Activity */}
      {displayActivities.length > 0 && (
        <ActivityListCard
          title="Последняя активность"
          description="Ваши недавние достижения"
          activities={displayActivities}
          showViewAll={true}
          onViewAll={() => console.log('View all activities')}
        />
      )}

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 gap-3">
        <Card className="bg-card text-card-foreground border-border rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <Calendar className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <div className="text-lg font-bold">{stats.streak}</div>
              <div className="text-xs text-muted-foreground">Дней подряд</div>
            </div>
          </div>
        </Card>

        <Card className="bg-card text-card-foreground border-border rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-500/20 rounded-lg">
              <Trophy className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <div className="text-lg font-bold">{overallProgress}%</div>
              <div className="text-xs text-muted-foreground">Завершено</div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}