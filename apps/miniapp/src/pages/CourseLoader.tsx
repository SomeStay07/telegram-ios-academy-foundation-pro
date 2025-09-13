import React from 'react'
import { useParams, useRouter } from '@tanstack/react-router'
import { CourseView } from '../features/course/CourseView'
import { getCourse, getCourseProgress, transformCourseData } from '../features/course/api'
import { analytics } from '../analytics/lazy'

export const CourseLoader = () => {
  const { courseId } = useParams({ from: '/course/$courseId' })
  const router = useRouter()
  const [courseData, setCourseData] = React.useState<any>(null)
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)

  React.useEffect(() => {
    let mounted = true
    
    const loadCourseData = async () => {
      try {
        setLoading(true)
        setError(null)

        const [course, progress] = await Promise.all([
          getCourse(courseId),
          getCourseProgress(courseId)
        ])

        if (!mounted) return

        if (!course) {
          setError('Course not found')
          return
        }

        const transformedCourse = transformCourseData(course, progress)
        setCourseData(transformedCourse)

        analytics.courseViewed?.({
          course_id: course.id,
          course_title: course.title,
          difficulty: course.difficulty,
          user_progress: progress?.overallProgress || 0
        })
      } catch (err: any) {
        if (!mounted) return
        console.error('Failed to load course:', err)
        setError('Failed to load course data')
      } finally {
        if (mounted) setLoading(false)
      }
    }

    loadCourseData()
    return () => { mounted = false }
  }, [courseId])

  const handleLessonSelect = (lessonId: string) => {
    router.navigate({ to: `/lesson/${lessonId}` })
    
    analytics.lessonStarted?.({
      lesson_id: lessonId,
      lesson_title: lessonId.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()),
      source: 'course_navigation',
      course_id: courseId
    })
  }

  const handleInterviewSelect = (interviewId: string, mode: 'drill' | 'explain' | 'mock') => {
    router.navigate({ to: `/interview/${interviewId}/${mode}` })
    
    analytics.interviewStarted?.({
      interview_id: interviewId,
      mode,
      source: 'course_navigation',
      course_id: courseId
    })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading course...</p>
        </div>
      </div>
    )
  }

  if (error || !courseData) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="text-4xl mb-4">⚠️</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Course Not Found</h3>
          <p className="text-gray-600 mb-4">{error || 'The requested course could not be loaded'}</p>
          <button 
            onClick={() => router.navigate({ to: '/' })}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    )
  }

  return (
    <CourseView
      course={courseData}
      onLessonSelect={handleLessonSelect}
      onInterviewSelect={handleInterviewSelect}
    />
  )
}