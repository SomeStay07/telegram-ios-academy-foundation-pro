import { Injectable } from '@nestjs/common';
import { CommandHandler } from '../../../shared/application/command';
import { UnlockCourseCommand } from '../commands/unlock-course.command';
import { CourseRepository } from '../repositories/course.repository';

@Injectable()
export class UnlockCourseHandler implements CommandHandler<UnlockCourseCommand> {
  constructor(
    private readonly courseRepository: CourseRepository
  ) {}

  async execute(command: UnlockCourseCommand): Promise<void> {
    try {
      // Get course aggregate
      const course = await this.courseRepository.getById(command.courseId);
      if (!course) {
        throw new Error(`Course ${command.courseId} not found`);
      }

      // Unlock course for user
      course.unlockForUser(command.userId);

      // Save the aggregate
      await this.courseRepository.save(course);

    } catch (error) {
      console.error('Error executing UnlockCourseCommand:', error);
      throw error;
    }
  }
}