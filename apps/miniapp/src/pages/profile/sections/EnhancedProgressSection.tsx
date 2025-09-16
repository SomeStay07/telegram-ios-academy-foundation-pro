import { CheckCircle, BookOpen, Clock, Trophy } from 'lucide-react'
import { ProgressSummaryCard, ActivityListCard, type ActivityItem } from '@telegram-ios-academy/ui'

interface EnhancedProgressSectionProps {
  coursesCompleted: number
  totalCourses: number
  timeSpent: number
  currentStreak: number
  weeklyStreak?: number[]
  recentActivities?: ActivityItem[]
}

export function EnhancedProgressSection({
  coursesCompleted,
  totalCourses,
  timeSpent,
  currentStreak,
  weeklyStreak,
  recentActivities = []
}: EnhancedProgressSectionProps) {
  const overallProgress = Math.round((coursesCompleted / totalCourses) * 100)

  // Default activities if none provided
  const defaultActivities: ActivityItem[] = [
    {
      id: '1',
      title: 'Completed iOS Fundamentals',
      description: 'Finished the introduction to iOS development module',
      timestamp: '2h ago',
      icon: <CheckCircle className="w-5 h-5" />,
      type: 'success'
    },
    {
      id: '2',
      title: 'Started Swift Language Basics',
      description: 'Beginning the Swift programming language course',
      timestamp: '1d ago',
      icon: <BookOpen className="w-5 h-5" />,
      type: 'info'
    },
    {
      id: '3',
      title: 'Study Session',
      description: 'Spent 2 hours practicing UI/UX design principles',
      timestamp: '2d ago',
      icon: <Clock className="w-5 h-5" />,
      type: 'default'
    },
    {
      id: '4',
      title: 'Achievement Unlocked',
      description: 'Earned "First Week Completed" badge',
      timestamp: '3d ago',
      icon: <Trophy className="w-5 h-5" />,
      type: 'success'
    }
  ]

  const activities = recentActivities.length > 0 ? recentActivities : defaultActivities

  return (
    <div className="space-y-4">
      {/* Progress Summary Card */}
      <ProgressSummaryCard
        overallProgress={overallProgress}
        completedModules={coursesCompleted}
        totalModules={totalCourses}
        timeSpent={timeSpent}
        currentStreak={currentStreak}
        weeklyStreak={weeklyStreak}
      />

      {/* Activity Timeline Card */}
      <ActivityListCard
        activities={activities}
        title="Recent Activity"
        showViewAll={true}
        onViewAll={() => {
          // Handle view all click - could navigate to full activity page
          console.log('Navigate to full activity page')
        }}
      />
    </div>
  )
}