import { BookOpen, Trophy, Target } from 'lucide-react'
import { CardSurface, Progress, Badge } from '@telegram-ios-academy/ui'

interface ProgressSectionProps {
  coursesCompleted: number
  totalCourses: number
  interviewsAttempted: number
  averageScore: number
}

export function ProgressSection({
  coursesCompleted,
  totalCourses,
  interviewsAttempted,
  averageScore,
}: ProgressSectionProps) {
  const completionPercentage = Math.round((coursesCompleted / totalCourses) * 100)

  return (
    <CardSurface interactive className="p-4 sm:p-5 space-y-4 transition-all duration-200">
      <div className="flex items-center gap-3 mb-4">
        <Target className="card-icon w-5 h-5 text-muted-foreground" />
        <h3 className="card-section-header text-lg font-semibold text-foreground">Learning Progress</h3>
      </div>
      
      <div className="space-y-4">
        <div>
          <div className="flex items-center justify-between mb-2 min-w-0">
            <div className="flex items-center gap-2 min-w-0 flex-1">
              <BookOpen className="card-icon w-4 h-4 text-muted-foreground flex-shrink-0" />
              <span className="text-sm font-medium text-foreground truncate">Course Progress</span>
            </div>
            <Badge variant="outline" className="text-xs flex-shrink-0 ml-2">
              {coursesCompleted}/{totalCourses}
            </Badge>
          </div>
          <Progress value={completionPercentage} className="h-2" />
          <p className="text-xs text-muted-foreground mt-1 truncate">
            {completionPercentage}% complete
          </p>
        </div>

        <div className="border-t border-border pt-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center min-w-0">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Trophy className="card-icon w-4 h-4 text-muted-foreground" />
              </div>
              <p className="text-lg font-semibold text-foreground truncate">{interviewsAttempted}</p>
              <p className="text-xs text-muted-foreground truncate">Interviews</p>
            </div>
            
            <div className="text-center min-w-0">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Target className="card-icon w-4 h-4 text-muted-foreground" />
              </div>
              <p className="text-lg font-semibold text-foreground truncate">{averageScore}%</p>
              <p className="text-xs text-muted-foreground truncate">Avg Score</p>
            </div>
          </div>
        </div>
      </div>
    </CardSurface>
  )
}