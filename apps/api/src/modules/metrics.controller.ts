import { Controller, Get, Res } from '@nestjs/common'
import { Response } from 'express'
import * as client from 'prom-client'

@Controller()
export class MetricsController {
  private register = new client.Registry()

  constructor() {
    // Collect default metrics (CPU, memory, etc.)
    client.collectDefaultMetrics({ register: this.register })

    // Custom metrics for the application
    this.setupCustomMetrics()
  }

  private setupCustomMetrics() {
    // HTTP request metrics
    const httpRequestDuration = new client.Histogram({
      name: 'http_request_duration_seconds',
      help: 'HTTP request duration in seconds',
      labelNames: ['method', 'route', 'status_code'],
      buckets: [0.005, 0.01, 0.025, 0.05, 0.1, 0.25, 0.5, 1, 2.5, 5, 10]
    })

    const httpRequestsTotal = new client.Counter({
      name: 'http_requests_total',
      help: 'Total number of HTTP requests',
      labelNames: ['method', 'route', 'status_code']
    })

    // Database connection metrics
    const dbConnectionsActive = new client.Gauge({
      name: 'db_connections_active',
      help: 'Number of active database connections'
    })

    const dbQueryDuration = new client.Histogram({
      name: 'db_query_duration_seconds',
      help: 'Database query duration in seconds',
      labelNames: ['operation', 'table'],
      buckets: [0.001, 0.005, 0.01, 0.025, 0.05, 0.1, 0.25, 0.5, 1, 2.5, 5]
    })

    // Redis metrics
    const redisConnectionsActive = new client.Gauge({
      name: 'redis_connections_active',
      help: 'Number of active Redis connections'
    })

    const redisOperationDuration = new client.Histogram({
      name: 'redis_operation_duration_seconds',
      help: 'Redis operation duration in seconds',
      labelNames: ['operation'],
      buckets: [0.001, 0.005, 0.01, 0.025, 0.05, 0.1, 0.25, 0.5]
    })

    const redisErrors = new client.Counter({
      name: 'redis_errors_total',
      help: 'Total number of Redis errors',
      labelNames: ['operation', 'error_type']
    })

    // Application-specific metrics
    const lessonsCompleted = new client.Counter({
      name: 'lessons_completed_total',
      help: 'Total number of lessons completed',
      labelNames: ['lesson_id', 'user_type']
    })

    const interviewsStarted = new client.Counter({
      name: 'interviews_started_total',
      help: 'Total number of interviews started',
      labelNames: ['interview_id', 'mode']
    })

    const interviewsCompleted = new client.Counter({
      name: 'interviews_completed_total',
      help: 'Total number of interviews completed',
      labelNames: ['interview_id', 'mode', 'completion_rate']
    })

    const quizAttempts = new client.Counter({
      name: 'quiz_attempts_total',
      help: 'Total number of quiz attempts',
      labelNames: ['lesson_id', 'question_id', 'correct']
    })

    const userSessions = new client.Gauge({
      name: 'user_sessions_active',
      help: 'Number of active user sessions'
    })

    const telegramWebAppEvents = new client.Counter({
      name: 'telegram_webapp_events_total',
      help: 'Total number of Telegram WebApp events',
      labelNames: ['event_type', 'platform']
    })

    // Error rate metrics
    const errorRate5xx = new client.Counter({
      name: 'http_errors_5xx_total',
      help: 'Total number of 5xx HTTP errors',
      labelNames: ['route', 'error_type']
    })

    const errorRate4xx = new client.Counter({
      name: 'http_errors_4xx_total',
      help: 'Total number of 4xx HTTP errors',
      labelNames: ['route', 'error_type']
    })

    // Register all metrics
    this.register.registerMetric(httpRequestDuration)
    this.register.registerMetric(httpRequestsTotal)
    this.register.registerMetric(dbConnectionsActive)
    this.register.registerMetric(dbQueryDuration)
    this.register.registerMetric(redisConnectionsActive)
    this.register.registerMetric(redisOperationDuration)
    this.register.registerMetric(redisErrors)
    this.register.registerMetric(lessonsCompleted)
    this.register.registerMetric(interviewsStarted)
    this.register.registerMetric(interviewsCompleted)
    this.register.registerMetric(quizAttempts)
    this.register.registerMetric(userSessions)
    this.register.registerMetric(telegramWebAppEvents)
    this.register.registerMetric(errorRate5xx)
    this.register.registerMetric(errorRate4xx)
  }

  @Get('metrics')
  async getMetrics(@Res() res: Response) {
    try {
      // Set appropriate content type for Prometheus
      res.set('Content-Type', this.register.contentType)
      
      // Get metrics from registry
      const metrics = await this.register.metrics()
      res.end(metrics)
    } catch (error) {
      console.error('Error collecting metrics:', error)
      res.status(500).send('Error collecting metrics')
    }
  }

  @Get('metrics/health')
  getMetricsHealth() {
    return {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      metrics_endpoint: '/metrics',
      custom_metrics_count: this.register.getSingleMetric ? 
        Object.keys(this.register.getSingleMetric).length : 'unknown'
    }
  }

  // Helper methods to increment metrics (can be used by other services)
  public static incrementHttpRequest(method: string, route: string, statusCode: number) {
    const httpRequestsTotal = client.register.getSingleMetric('http_requests_total') as client.Counter<string>
    if (httpRequestsTotal) {
      httpRequestsTotal.inc({ method, route, status_code: statusCode.toString() })
    }
  }

  public static recordHttpDuration(method: string, route: string, statusCode: number, duration: number) {
    const httpRequestDuration = client.register.getSingleMetric('http_request_duration_seconds') as client.Histogram<string>
    if (httpRequestDuration) {
      httpRequestDuration.observe({ method, route, status_code: statusCode.toString() }, duration)
    }
  }

  public static incrementRedisError(operation: string, errorType: string) {
    const redisErrors = client.register.getSingleMetric('redis_errors_total') as client.Counter<string>
    if (redisErrors) {
      redisErrors.inc({ operation, error_type: errorType })
    }
  }

  public static recordRedisOperation(operation: string, duration: number) {
    const redisOperationDuration = client.register.getSingleMetric('redis_operation_duration_seconds') as client.Histogram<string>
    if (redisOperationDuration) {
      redisOperationDuration.observe({ operation }, duration)
    }
  }

  public static recordDbQuery(operation: string, table: string, duration: number) {
    const dbQueryDuration = client.register.getSingleMetric('db_query_duration_seconds') as client.Histogram<string>
    if (dbQueryDuration) {
      dbQueryDuration.observe({ operation, table }, duration)
    }
  }

  public static incrementLessonCompleted(lessonId: string, userType: string) {
    const lessonsCompleted = client.register.getSingleMetric('lessons_completed_total') as client.Counter<string>
    if (lessonsCompleted) {
      lessonsCompleted.inc({ lesson_id: lessonId, user_type: userType })
    }
  }

  public static incrementInterviewStarted(interviewId: string, mode: string) {
    const interviewsStarted = client.register.getSingleMetric('interviews_started_total') as client.Counter<string>
    if (interviewsStarted) {
      interviewsStarted.inc({ interview_id: interviewId, mode })
    }
  }

  public static incrementInterviewCompleted(interviewId: string, mode: string, completionRate: number) {
    const interviewsCompleted = client.register.getSingleMetric('interviews_completed_total') as client.Counter<string>
    if (interviewsCompleted) {
      interviewsCompleted.inc({ 
        interview_id: interviewId, 
        mode, 
        completion_rate: completionRate >= 0.9 ? 'high' : completionRate >= 0.7 ? 'medium' : 'low'
      })
    }
  }

  public static incrementQuizAttempt(lessonId: string, questionId: string, correct: boolean) {
    const quizAttempts = client.register.getSingleMetric('quiz_attempts_total') as client.Counter<string>
    if (quizAttempts) {
      quizAttempts.inc({ lesson_id: lessonId, question_id: questionId, correct: correct.toString() })
    }
  }

  public static setActiveUserSessions(count: number) {
    const userSessions = client.register.getSingleMetric('user_sessions_active') as client.Gauge<string>
    if (userSessions) {
      userSessions.set(count)
    }
  }

  public static incrementTelegramEvent(eventType: string, platform: string) {
    const telegramWebAppEvents = client.register.getSingleMetric('telegram_webapp_events_total') as client.Counter<string>
    if (telegramWebAppEvents) {
      telegramWebAppEvents.inc({ event_type: eventType, platform })
    }
  }
}