import { Injectable } from '@nestjs/common'
import { register, collectDefaultMetrics, Histogram, Counter } from 'prom-client'

@Injectable()
export class MetricsService {
  private httpDuration: Histogram<string>
  private httpRequests: Counter<string>
  private interviewAttempts: Counter<string>
  private lessonCheckpoints: Counter<string>
  private courseProgress: Histogram<string>
  private eventsIngested: Counter<string>
  private eventsDropped: Counter<string>
  private static defaultMetricsInitialized = false

  constructor() {
    // Collect default metrics only once globally to avoid registration conflicts
    if (!MetricsService.defaultMetricsInitialized) {
      try {
        collectDefaultMetrics()
        MetricsService.defaultMetricsInitialized = true
      } catch (error: any) {
        // If metrics are already registered, ignore the error
        console.warn('Default metrics already initialized, skipping:', error?.message)
      }
    }

    // Initialize custom metrics with duplicate registration protection
    this.httpDuration = this.getOrCreateHistogram('http_request_duration_seconds', {
      help: 'Duration of HTTP requests in seconds',
      labelNames: ['method', 'route', 'status_code'],
      buckets: [0.001, 0.005, 0.015, 0.05, 0.1, 0.2, 0.3, 0.4, 0.5, 1, 2, 5, 10]
    })

    this.httpRequests = this.getOrCreateCounter('http_requests_total', {
      help: 'Total number of HTTP requests',
      labelNames: ['method', 'route', 'status_code']
    })

    this.interviewAttempts = this.getOrCreateCounter('interview_attempts_total', {
      help: 'Total number of interview attempts',
      labelNames: ['interview_id', 'mode', 'result']
    })

    this.lessonCheckpoints = this.getOrCreateCounter('lesson_checkpoints_total', {
      help: 'Total number of lesson checkpoints reached',
      labelNames: ['lesson_id', 'checkpoint_type']
    })

    this.courseProgress = this.getOrCreateHistogram('course_progress_duration_seconds', {
      help: 'Time taken to complete course milestones',
      labelNames: ['course_id', 'milestone'],
      buckets: [60, 300, 900, 1800, 3600, 7200, 14400, 28800, 86400] // 1min to 1day
    })

    this.eventsIngested = this.getOrCreateCounter('events_ingested_total', {
      help: 'Total number of analytics events successfully ingested',
      labelNames: ['event_type', 'source']
    })

    this.eventsDropped = this.getOrCreateCounter('events_dropped_total', {
      help: 'Total number of analytics events dropped',
      labelNames: ['event_type', 'reason']
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
    result: 'started' | 'completed' | 'abandoned'
  ) {
    this.interviewAttempts.inc({
      interview_id: interviewId,
      mode,
      result
    })
  }

  // Record lesson checkpoint
  recordLessonCheckpoint(
    lessonId: string,
    checkpointType: 'started' | 'quiz_answered' | 'completed' | 'video_watched'
  ) {
    this.lessonCheckpoints.inc({
      lesson_id: lessonId,
      checkpoint_type: checkpointType
    })
  }

  // Record course progress milestone
  recordCourseProgress(
    courseId: string,
    milestone: 'enrolled' | 'first_lesson' | '25_percent' | '50_percent' | '75_percent' | 'completed',
    durationSeconds: number
  ) {
    this.courseProgress.observe({
      course_id: courseId,
      milestone
    }, durationSeconds)
  }

  // Get metrics for Prometheus scraping
  async getMetrics(): Promise<string> {
    return await register.metrics()
  }

  // Normalize route for consistent labeling
  private normalizeRoute(route: string): string {
    // Replace dynamic segments with placeholders, being more specific to avoid over-matching
    return route
      .replace(/\/api\//, '/') // Remove /api/ prefix
      .replace(/\/\d+(?=\/|$)/g, '/:id') // Replace numeric IDs (only if followed by / or end of string)
      .replace(/\/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}(?=\/|$)/gi, '/:uuid') // Replace UUID format
      .replace(/\/c[a-z0-9]{24}(?=\/|$)/gi, '/:cuid') // Replace CUID format (starts with 'c' + 24 chars)
      .replace(/\/[a-z0-9]{21}(?=\/|$)/gi, '/:nanoid') // Replace common nanoid format (21 chars)
      .toLowerCase() // Ensure consistent casing
  }

  // Record analytics event ingestion
  recordEventIngested(eventType: string, source: 'proxy' | 'direct' = 'proxy') {
    this.eventsIngested.inc({
      event_type: eventType,
      source
    })
  }

  // Record analytics event drop
  recordEventDropped(eventType: string, reason: 'PII' | 'oversize' | 'rate_limit' | 'invalid_format' | 'processing_error') {
    this.eventsDropped.inc({
      event_type: eventType,
      reason
    })
  }

  // Helper method to measure execution time
  startTimer() {
    const start = Date.now()
    return () => Date.now() - start
  }

  // Safe metric creation helpers to avoid duplicate registration errors
  private getOrCreateCounter(name: string, config: any): Counter<string> {
    try {
      return new Counter({ name, ...config })
    } catch (error: any) {
      if (error?.message?.includes('has already been registered')) {
        // Return the existing metric from the registry
        return register.getSingleMetric(name) as Counter<string>
      }
      throw error
    }
  }

  private getOrCreateHistogram(name: string, config: any): Histogram<string> {
    try {
      return new Histogram({ name, ...config })
    } catch (error: any) {
      if (error?.message?.includes('has already been registered')) {
        // Return the existing metric from the registry
        return register.getSingleMetric(name) as Histogram<string>
      }
      throw error
    }
  }
}