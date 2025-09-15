import { BookOpen, Code, Brain, Trophy } from 'lucide-react'
import { CardSurface, CircularProgress } from '@telegram-ios-academy/ui'

interface Skill {
  name: string
  progress: number
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert'
  icon: React.ReactNode
}

interface SkillsProgressSectionProps {
  coursesCompleted: number
  totalCourses: number
  skills?: Skill[]
}

const defaultSkills: Skill[] = [
  {
    name: 'iOS Development',
    progress: 75,
    level: 'intermediate',
    icon: <Code className="w-4 h-4" />
  },
  {
    name: 'Swift Language',
    progress: 85,
    level: 'advanced',
    icon: <Brain className="w-4 h-4" />
  },
  {
    name: 'UI/UX Design',
    progress: 60,
    level: 'intermediate',
    icon: <BookOpen className="w-4 h-4" />
  },
  {
    name: 'Problem Solving',
    progress: 90,
    level: 'expert',
    icon: <Trophy className="w-4 h-4" />
  }
]

const levelColors = {
  beginner: 'success',
  intermediate: 'warning',
  advanced: 'error',
  expert: 'primary'
} as const

export function SkillsProgressSection({
  coursesCompleted,
  totalCourses,
  skills = defaultSkills,
}: SkillsProgressSectionProps) {
  const overallProgress = Math.round((coursesCompleted / totalCourses) * 100)

  return (
    <CardSurface interactive className="p-4 sm:p-5 transition-all duration-200">
      <div className="flex items-center gap-3 mb-6">
        <BookOpen className="card-icon w-5 h-5 text-muted-foreground" />
        <h3 className="card-section-header text-lg font-semibold text-foreground">
          Skills Progress
        </h3>
      </div>

      {/* Overall Course Progress */}
      <div className="mb-6 p-4 bg-muted/30 rounded-xl border border-border/50">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h4 className="font-medium text-foreground">Course Completion</h4>
            <p className="text-sm text-muted-foreground">
              {coursesCompleted} of {totalCourses} courses completed
            </p>
          </div>
          <div className="flex items-center gap-3">
            <CircularProgress
              value={overallProgress}
              size="lg"
              color="primary"
              className="text-primary"
            />
          </div>
        </div>
        
        {/* Progress indicators */}
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-primary"></div>
            <span>Completed</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-muted-foreground/30"></div>
            <span>Remaining</span>
          </div>
        </div>
      </div>

      {/* Individual Skills */}
      <div className="space-y-4">
        <h4 className="font-medium text-foreground flex items-center gap-2">
          <Brain className="card-icon w-4 h-4" />
          Skill Breakdown
        </h4>
        
        <div className="grid grid-cols-2 gap-3">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="p-3 rounded-lg bg-card border border-border/50 hover:border-border transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2 min-w-0 flex-1">
                  <div className="card-icon flex-shrink-0">
                    {skill.icon}
                  </div>
                  <span className="text-sm font-medium text-foreground truncate">
                    {skill.name}
                  </span>
                </div>
                <CircularProgress
                  value={skill.progress}
                  size="sm"
                  color={levelColors[skill.level]}
                  showValue={false}
                  className={`skill-${skill.level}`}
                >
                  <span className="text-xs font-semibold">
                    {skill.progress}%
                  </span>
                </CircularProgress>
              </div>
              
              {/* Skill level badge */}
              <div className="flex justify-between items-center">
                <span className={`text-xs px-2 py-1 rounded-full border ${
                  skill.level === 'beginner' ? 'bg-green-50 text-green-700 border-green-200 dark:bg-green-950/20 dark:text-green-400 dark:border-green-800' :
                  skill.level === 'intermediate' ? 'bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-950/20 dark:text-yellow-400 dark:border-yellow-800' :
                  skill.level === 'advanced' ? 'bg-red-50 text-red-700 border-red-200 dark:bg-red-950/20 dark:text-red-400 dark:border-red-800' :
                  'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/20 dark:text-purple-400 dark:border-purple-800'
                }`}>
                  {skill.level.charAt(0).toUpperCase() + skill.level.slice(1)}
                </span>
                
                <span className="text-xs text-muted-foreground">
                  {skill.progress < 30 ? '🌱' : 
                   skill.progress < 60 ? '📈' : 
                   skill.progress < 90 ? '🔥' : '🏆'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </CardSurface>
  )
}