import React from 'react'
import { cn } from '../../utils/cn'
import { Card } from '../Card'
import { Badge } from '../Badge'
import { Button } from '../Button'
import { 
  DeveloperIcons,
  AchievementIcons,
  StatsIcons 
} from '../../icons'

interface InterviewQuestion {
  id: string
  category: 'swift' | 'uikit' | 'architecture' | 'algorithms' | 'behavioral'
  difficulty: 'junior' | 'middle' | 'senior'
  question: string
  answered?: boolean
  correct?: boolean
}

interface InterviewPrepProps {
  questions?: InterviewQuestion[]
  completedQuestions?: number
  totalQuestions?: number
  currentLevel?: 'junior' | 'middle' | 'senior'
  streak?: number
  className?: string
  onStartInterview?: () => void
  onReviewAnswers?: () => void
}

export function InterviewPrep({
  questions = [],
  completedQuestions = 0,
  totalQuestions = 50,
  currentLevel = 'junior',
  streak = 0,
  className,
  onStartInterview,
  onReviewAnswers,
}: InterviewPrepProps) {
  const progress = Math.round((completedQuestions / totalQuestions) * 100)
  
  const getCategoryIcon = (category: InterviewQuestion['category']) => {
    switch (category) {
      case 'swift': return <DeveloperIcons.swift className="w-4 h-4" />
      case 'uikit': return <DeveloperIcons.uikit className="w-4 h-4" />  
      case 'architecture': return <StatsIcons.lightbulb className="w-4 h-4" />
      case 'algorithms': return <DeveloperIcons.code className="w-4 h-4" />
      case 'behavioral': return <StatsIcons.chart className="w-4 h-4" />
      default: return <DeveloperIcons.code className="w-4 h-4" />
    }
  }
  
  const getCategoryColor = (category: InterviewQuestion['category']) => {
    switch (category) {
      case 'swift': return 'bg-orange-500/10 text-orange-600 border-orange-500/20'
      case 'uikit': return 'bg-blue-500/10 text-blue-600 border-blue-500/20'
      case 'architecture': return 'bg-purple-500/10 text-purple-600 border-purple-500/20'
      case 'algorithms': return 'bg-green-500/10 text-green-600 border-green-500/20'
      case 'behavioral': return 'bg-pink-500/10 text-pink-600 border-pink-500/20'
      default: return 'bg-gray-500/10 text-gray-600 border-gray-500/20'
    }
  }
  
  const getDifficultyColor = (difficulty: InterviewQuestion['difficulty']) => {
    switch (difficulty) {
      case 'junior': return 'bg-green-500/10 text-green-600'
      case 'middle': return 'bg-yellow-500/10 text-yellow-600' 
      case 'senior': return 'bg-red-500/10 text-red-600'
      default: return 'bg-gray-500/10 text-gray-600'
    }
  }

  return (
    <Card className={cn("p-6 space-y-6", className)}>
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-xl bg-gradient-to-br from-purple-500/10 to-pink-500/10">
          <StatsIcons.lightbulb className="w-6 h-6 text-purple-600 dark:text-purple-400" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">Interview Preparation</h3>
          <p className="text-sm text-muted-foreground">Practice iOS developer questions</p>
        </div>
      </div>

      {/* Progress Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center p-3 rounded-xl bg-muted/50">
          <div className="text-2xl font-bold text-foreground">{progress}%</div>
          <div className="text-xs text-muted-foreground">Completed</div>
        </div>
        <div className="text-center p-3 rounded-xl bg-muted/50">
          <div className="text-2xl font-bold text-foreground">{completedQuestions}</div>
          <div className="text-xs text-muted-foreground">Questions</div>
        </div>
        <div className="text-center p-3 rounded-xl bg-muted/50">
          <div className="flex items-center justify-center gap-1 text-2xl font-bold text-foreground">
            {streak}
            {streak > 0 && <AchievementIcons.fire className="w-5 h-5 text-orange-500" />}
          </div>
          <div className="text-xs text-muted-foreground">Day Streak</div>
        </div>
      </div>

      {/* Current Level */}
      <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 border border-blue-200 dark:border-blue-800">
        <div className="flex items-center gap-3">
          <AchievementIcons.target className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <div>
            <div className="font-medium text-foreground">Current Level: {currentLevel.charAt(0).toUpperCase() + currentLevel.slice(1)}</div>
            <div className="text-xs text-muted-foreground">
              {currentLevel === 'junior' && 'Focus on Swift basics and UIKit fundamentals'}
              {currentLevel === 'middle' && 'Practice architecture patterns and advanced concepts'}  
              {currentLevel === 'senior' && 'Master system design and leadership questions'}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Questions */}
      {questions.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-foreground">Recent Practice</h4>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {questions.slice(0, 3).map((question) => (
              <div
                key={question.id}
                className="flex items-start gap-3 p-3 rounded-lg bg-muted/30 border border-border/50"
              >
                <div className="flex-shrink-0 mt-0.5">
                  {getCategoryIcon(question.category)}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-medium text-foreground line-clamp-1">
                    {question.question}
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge 
                      variant="secondary" 
                      className={cn("text-xs", getCategoryColor(question.category))}
                    >
                      {question.category}
                    </Badge>
                    <Badge 
                      variant="secondary" 
                      className={cn("text-xs", getDifficultyColor(question.difficulty))}
                    >
                      {question.difficulty}
                    </Badge>
                  </div>
                </div>
                <div className="flex-shrink-0">
                  {question.answered && (
                    <div className={cn(
                      "w-2 h-2 rounded-full",
                      question.correct ? "bg-green-500" : "bg-red-500"
                    )} />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-3">
        <Button
          onClick={onStartInterview}
          className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
        >
          <StatsIcons.rocket className="w-4 h-4 mr-2" />
          Start Interview
        </Button>
        
        {completedQuestions > 0 && (
          <Button
            variant="outline"
            onClick={onReviewAnswers}
            className="flex-1"
          >
            <AchievementIcons.star className="w-4 h-4 mr-2" />
            Review Answers
          </Button>
        )}
      </div>

      {/* Quick Tips */}
      <div className="p-4 rounded-xl bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800">
        <div className="flex items-start gap-3">
          <StatsIcons.lightbulb className="w-5 h-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
          <div>
            <div className="text-sm font-medium text-yellow-800 dark:text-yellow-300">
              Interview Tip
            </div>
            <div className="text-xs text-yellow-700 dark:text-yellow-400 mt-1">
              Practice explaining your code out loud. Many iOS interviews focus on problem-solving communication.
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}

InterviewPrep.displayName = 'InterviewPrep'