import { Module } from '@nestjs/common';
import { CourseController } from './controllers/course.controller';
import { CourseRepository } from './repositories/course.repository';
import { UnlockCourseHandler } from './handlers/unlock-course.handler';

@Module({
  controllers: [
    CourseController,
  ],
  providers: [
    // Repositories
    CourseRepository,
    
    // Command Handlers
    UnlockCourseHandler,
  ],
  exports: [
    CourseRepository,
  ],
})
export class CourseModule {}