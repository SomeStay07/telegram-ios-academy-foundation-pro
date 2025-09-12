import { Injectable } from '@nestjs/common'
import { register, collectDefaultMetrics, Histogram, Counter } from 'prom-client'

@Injectable()
export class MetricsService {
  private httpDuration: Histogram<string>
  private httpRequests: Counter<string>
  private interviewAttempts: Counter<string>
  private lessonCheckpoints: Counter<string>
  private courseProgress: Histogram<string>

  constructor() {
    // Collect default metrics (CPU, memory, etc.)
    collectDefaultMetrics()

    // HTTP request duration histogram with p95 percentile
    this.httpDuration = new Histogram({
      name: 'http_request_duration_seconds',
      help: 'Duration of HTTP requests in seconds',
      labelNames: ['method', 'route', 'status_code'],
      buckets: [0.001, 0.005, 0.015, 0.05, 0.1, 0.2, 0.3, 0.4, 0.5, 1, 2, 5, 10]
    })

    // HTTP request counter
    this.httpRequests = new Counter({
      name: 'http_requests_total',
      help: 'Total number of HTTP requests',
      labelNames: ['method', 'route', 'status_code']
    })

    // Interview attempts counter
    this.interviewAttempts = new Counter({
      name: 'interview_attempts_total',
      help: 'Total number of interview attempts',
      labelNames: ['interview_id', 'mode', 'user_id', 'result']
    })

    // Lesson checkpoint counter
    this.lessonCheckpoints = new Counter({
      name: 'lesson_checkpoints_total',
      help: 'Total number of lesson checkpoints reached',
      labelNames: ['lesson_id', 'checkpoint_type', 'user_id']
    })

    // Course progress histogram
    this.courseProgress = new Histogram({
      name: 'course_progress_duration_seconds',
      help: 'Time taken to complete course milestones',
      labelNames: ['course_id', 'milestone', 'user_id'],
      buckets: [60, 300, 900, 1800, 3600, 7200, 14400, 28800, 86400] // 1min to 1day
    })
  }

  // Record HTTP request metrics
  recordHttpRequest(method: string, route: string, statusCode: number, duration: number) {
    const labels = {
      method: method.toUpperCase(),
      route: this.normalizeRoute(route),
      status_code: statusCode.toString()
    }

    this.httpDuration.observe(labels, duration / 1000) // Convert to seconds
    this.httpRequests.inc(labels)
  }

  // Record interview attempt
  recordInterviewAttempt(
    interviewId: string,
    mode: 'drill' | 'explain' | 'mock',
    userId: string,
    result: 'started' | 'completed' | 'abandoned'
  ) {
    this.interviewAttempts.inc({
      interview_id: interviewId,
      mode,
      user_id: userId,
      result
    })
  }

  // Record lesson checkpoint
  recordLessonCheckpoint(
    lessonId: string,
    checkpointType: 'started' | 'quiz_answered' | 'completed' | 'video_watched',
    userId: string
  ) {
    this.lessonCheckpoints.inc({
      lesson_id: lessonId,
      checkpoint_type: checkpointType,
      user_id: userId
    })
  }

  // Record course progress milestone
  recordCourseProgress(
    courseId: string,
    milestone: 'enrolled' | 'first_lesson' | '25_percent' | '50_percent' | '75_percent' | 'completed',
    userId: string,
    durationSeconds: number
  ) {
    this.courseProgress.observe({
      course_id: courseId,
      milestone,
      user_id: userId
    }, durationSeconds)
  }

  // Get metrics for Prometheus scraping
  async getMetrics(): Promise<string> {
    return await register.metrics()
  }

  // Normalize route for consistent labeling
  private normalizeRoute(route: string): string {
    // Replace dynamic segments with placeholders
    return route
      .replace(/\/api\//, '/')
      .replace(/\/\d+/g, '/:id')
      .replace(/\/[a-f0-9-]{36}/g, '/:uuid')
      .replace(/\/[a-zA-Z0-9-]+/g, '/:param')
  }

  // Helper method to measure execution time
  startTimer() {
    const start = Date.now()
    return () => Date.now() - start
  }
}