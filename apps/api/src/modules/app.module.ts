import { Module, MiddlewareConsumer } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler'
import { APP_GUARD } from '@nestjs/core'
import { HealthController } from './health.controller'
import { IdempotencyInterceptorProvider } from './idempotency'
import { MetricsModule } from '../metrics/metrics.module'
import { MetricsMiddleware } from '../metrics/metrics.middleware'
import { EventsModule } from '../events/events.module'

// New DDD Domain Modules
import { SharedModule } from '../shared/shared.module'
import { UserModule } from '../domains/user/user.module'
import { LearningModule } from '../domains/learning/learning.module'
import { CourseModule } from '../domains/course/course.module'
import { AssessmentModule } from '../domains/assessment/assessment.module'

// Legacy imports - TODO: Remove after full migration
import { LessonController } from '../controllers/lesson.controller'
import { CourseController } from '../controllers/course.controller'
import { InterviewController } from '../controllers/interview.controller'
import { LessonService } from '../services/lesson.service'
import { CourseService } from '../services/course.service'
import { InterviewService } from '../services/interview.service'

@Module({ 
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ThrottlerModule.forRoot([{
      name: 'short',
      ttl: 60000, // 1 minute
      limit: 100, // 100 requests per minute globally
    }]),
    
    // Core Infrastructure
    SharedModule,
    MetricsModule,
    EventsModule,
    
    // Domain Modules (DDD Architecture)
    UserModule,
    LearningModule,
    CourseModule,
    AssessmentModule,
  ],
  controllers: [
    HealthController,
    // Legacy controllers - TODO: Remove after domain migration
    LessonController, 
    CourseController, 
    InterviewController
  ], 
  providers: [
    // Legacy services - TODO: Remove after domain migration
    LessonService, 
    CourseService, 
    InterviewService, 
    ...IdempotencyInterceptorProvider,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    }
  ] 
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(MetricsMiddleware)
      .forRoutes('*')
  }
}