import React, { useState, useEffect } from 'react'
import { Card } from '../../ui/src/components/Card'
import { Button } from '../../ui/src/components/Button'
import { Progress } from '../../ui/src/components/Progress'

export interface CourseLesson {
  id: string
  title: string
  description: string
  estimatedMinutes: number
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  order: number
  isLocked: boolean
  isCompleted: boolean
  score: number
}

export interface CourseProgress {
  courseId: string
  userId: string
  overallProgress: number
  completedLessons: number
  totalLessons: number
  lessonProgress: Record<string, {
    score: number
    completed: boolean
    timeSpent: number
    updatedAt: string | null
  }>
  enrolledAt: string
  lastActivityAt: string
}

export interface Course {
  id: string
  title: string
  description: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  estimatedHours: number
  tags: string[]
  lessons: CourseLesson[]
  progress?: CourseProgress
}

export interface CourseViewProps {
  course: Course
  onLessonSelect: (lessonId: string) => void
  onInterviewSelect?: (interviewId: string, mode: 'drill' | 'explain' | 'mock') => void
}

const DifficultyBadge: React.FC<{ difficulty: 'beginner' | 'intermediate' | 'advanced' }> = ({ difficulty }) => {
  const colors = {
    beginner: 'bg-green-100 text-green-800',
    intermediate: 'bg-yellow-100 text-yellow-800',
    advanced: 'bg-red-100 text-red-800'
  }
  
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[difficulty]}`}>
      {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
    </span>
  )
}

const ProgressBadge: React.FC<{ score: number; isCompleted: boolean }> = ({ score, isCompleted }) => {
  if (isCompleted) {
    return <span className="text-green-600 text-sm">✅ Completed</span>
  }
  if (score > 0) {
    return <span className="text-blue-600 text-sm">📈 {Math.round(score * 100)}%</span>
  }
  return <span className="text-gray-500 text-sm">🔘 Not started</span>
}

const LockIcon: React.FC = () => (
  <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
  </svg>
)

export const CourseView: React.FC<CourseViewProps> = ({ 
  course, 
  onLessonSelect, 
  onInterviewSelect 
}) => {
  const [expandedLesson, setExpandedLesson] = useState<string | null>(null)

  // Calculate course gating logic
  const getNextAvailableLesson = (): CourseLesson | null => {
    return course.lessons
      .sort((a, b) => a.order - b.order)
      .find(lesson => !lesson.isCompleted) || null
  }

  const isLessonUnlocked = (lesson: CourseLesson): boolean => {
    if (lesson.order === 1) return true // First lesson always unlocked
    
    const previousLesson = course.lessons.find(l => l.order === lesson.order - 1)
    return previousLesson ? previousLesson.isCompleted : false
  }

  const nextLesson = getNextAvailableLesson()
  const progressPercent = course.progress?.overallProgress ? Math.round(course.progress.overallProgress * 100) : 0

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Course Header */}
      <Card className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-2xl font-bold text-gray-900">{course.title}</h1>
              <DifficultyBadge difficulty={course.difficulty} />
            </div>
            <p className="text-gray-600 mb-4">{course.description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {course.tags.map(tag => (
                <span 
                  key={tag}
                  className="px-2 py-1 bg-blue-50 text-blue-700 rounded-md text-sm"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Progress Section */}
        {course.progress && (
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">
                Course Progress: {course.progress.completedLessons}/{course.progress.totalLessons} lessons
              </span>
              <span className="text-sm text-gray-500">{progressPercent}%</span>
            </div>
            <Progress value={progressPercent} max={100} className="w-full" />
          </div>
        )}

        <div className="flex gap-3 text-sm text-gray-500">
          <span>⏱️ ~{course.estimatedHours}h total</span>
          <span>📚 {course.lessons.length} lessons</span>
          {course.progress && (
            <span>📅 Last activity: {new Date(course.progress.lastActivityAt).toLocaleDateString()}</span>
          )}
        </div>
      </Card>

      {/* Next Lesson CTA */}
      {nextLesson && (
        <Card className="p-4 border-l-4 border-blue-500 bg-blue-50">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-semibold text-blue-900">Continue Learning</h3>
              <p className="text-blue-700">Next: {nextLesson.title}</p>
            </div>
            <Button 
              onClick={() => onLessonSelect(nextLesson.id)}
              variant="primary"
              className="px-6 py-3"
            >
              Start Lesson →
            </Button>
          </div>
        </Card>
      )}

      {/* Lessons List */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900">Course Lessons</h2>
        
        {course.lessons
          .sort((a, b) => a.order - b.order)
          .map(lesson => {
            const isUnlocked = isLessonUnlocked(lesson)
            const progress = course.progress?.lessonProgress[lesson.id]
            
            return (
              <Card 
                key={lesson.id}
                className={`p-4 transition-all ${!isUnlocked ? 'opacity-60 bg-gray-50' : 'hover:shadow-md cursor-pointer'}`}
                onClick={() => {
                  if (isUnlocked) {
                    setExpandedLesson(expandedLesson === lesson.id ? null : lesson.id)
                  }
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm font-semibold">
                      {lesson.order}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className={`font-semibold ${!isUnlocked ? 'text-gray-500' : 'text-gray-900'}`}>
                          {lesson.title}
                        </h3>
                        {!isUnlocked && <LockIcon />}
                        <DifficultyBadge difficulty={lesson.difficulty} />
                      </div>
                      <p className={`text-sm ${!isUnlocked ? 'text-gray-400' : 'text-gray-600'}`}>
                        {lesson.description}
                      </p>
                      <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                        <span>⏱️ ~{lesson.estimatedMinutes} min</span>
                        {progress && <ProgressBadge score={progress.score} isCompleted={progress.completed} />}
                      </div>
                    </div>
                  </div>

                  {/* Action Button */}
                  {isUnlocked && (
                    <Button
                      variant={lesson.isCompleted ? "secondary" : "primary"}
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation()
                        onLessonSelect(lesson.id)
                      }}
                    >
                      {lesson.isCompleted ? 'Review' : 'Start'}
                    </Button>
                  )}
                </div>

                {/* Expanded Content */}
                {expandedLesson === lesson.id && isUnlocked && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="flex gap-2">
                      <Button
                        variant="primary" 
                        size="sm"
                        onClick={() => onLessonSelect(lesson.id)}
                      >
                        📚 Start Lesson
                      </Button>
                      {onInterviewSelect && (
                        <>
                          <Button
                            variant="secondary" 
                            size="sm"
                            onClick={() => onInterviewSelect(lesson.id, 'drill')}
                          >
                            ⚡ Drill
                          </Button>
                          <Button
                            variant="secondary" 
                            size="sm"
                            onClick={() => onInterviewSelect(lesson.id, 'explain')}
                          >
                            🎓 Explain
                          </Button>
                          <Button
                            variant="secondary" 
                            size="sm"
                            onClick={() => onInterviewSelect(lesson.id, 'mock')}
                          >
                            ⏱️ Mock
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </Card>
            )
          })
        }
      </div>

      {/* Course Completion */}
      {course.progress && course.progress.completedLessons === course.progress.totalLessons && (
        <Card className="p-6 text-center bg-green-50 border-green-200">
          <div className="text-4xl mb-4">🎉</div>
          <h3 className="text-xl font-bold text-green-800 mb-2">Course Completed!</h3>
          <p className="text-green-700 mb-4">
            Congratulations! You've finished all {course.progress.totalLessons} lessons in this course.
          </p>
          <div className="flex justify-center gap-2">
            <Button variant="primary">
              📜 Get Certificate
            </Button>
            <Button variant="secondary">
              📚 Browse More Courses
            </Button>
          </div>
        </Card>
      )}
    </div>
  )
}