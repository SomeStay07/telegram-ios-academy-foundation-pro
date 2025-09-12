import { Module } from '@nestjs/common'
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler'
import { APP_GUARD } from '@nestjs/core'
import { HealthController } from './health.controller'
import { PrismaService } from '../prisma/prisma.service'
import { AuthController } from './auth.controller'
import { IdempotencyInterceptorProvider } from './idempotency'
import { LessonController } from '../controllers/lesson.controller'
import { CourseController } from '../controllers/course.controller'
import { LessonService } from '../services/lesson.service'
import { CourseService } from '../services/course.service'

@Module({ 
  imports: [
    ThrottlerModule.forRoot([{
      name: 'short',
      ttl: 60000, // 1 minute
      limit: 100, // 100 requests per minute globally
    }])
  ],
  controllers: [HealthController, AuthController, LessonController, CourseController], 
  providers: [
    PrismaService, 
    LessonService, 
    CourseService, 
    ...IdempotencyInterceptorProvider,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    }
  ] 
})
export class AppModule {}