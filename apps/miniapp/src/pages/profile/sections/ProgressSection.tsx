import { BookOpen, Trophy, Target } from 'lucide-react'
import { Card, Progress, Badge } from '@telegram-ios-academy/ui'

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
    <Card className="p-4 bg-card text-card-foreground border border-border rounded-2xl shadow-sm">
      <div className="flex items-center gap-3 mb-4">
        <Target className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold text-foreground">Learning Progress</h3>
      </div>
      
      <div className="space-y-4">
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">Course Progress</span>
            </div>
            <Badge variant="outline" className="text-xs">
              {coursesCompleted}/{totalCourses}
            </Badge>
          </div>
          <Progress value={completionPercentage} className="h-2" />
          <p className="text-xs text-muted-foreground mt-1">
            {completionPercentage}% complete
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-2">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Trophy className="w-4 h-4 text-muted-foreground" />
            </div>
            <p className="text-lg font-semibold text-foreground">{interviewsAttempted}</p>
            <p className="text-xs text-muted-foreground">Interviews</p>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Target className="w-4 h-4 text-muted-foreground" />
            </div>
            <p className="text-lg font-semibold text-foreground">{averageScore}%</p>
            <p className="text-xs text-muted-foreground">Avg Score</p>
          </div>
        </div>
      </div>
    </Card>
  )
}