import { Injectable } from '@nestjs/common';
import { CommandHandler } from '../../../shared/application/command';
import { CompleteLessonCommand } from '../commands/complete-lesson.command';
import { LearningPathRepository } from '../repositories/learning-path.repository';
import { LearningPath } from '../entities/learning-path.entity';

@Injectable()
export class CompleteLessonHandler implements CommandHandler<CompleteLessonCommand> {
  constructor(
    private readonly learningPathRepository: LearningPathRepository
  ) {}

  async execute(command: CompleteLessonCommand): Promise<void> {
    try {
      // Get or create learning path
      const streamId = `learning-path-${command.userId}`;
      let learningPath = await this.learningPathRepository.getById(streamId);

      if (!learningPath) {
        // Create new learning path
        learningPath = LearningPath.create(
          streamId,
          command.userId,
          'default-course' // TODO: Get from lesson or command
        );
      }

      // Complete the lesson
      learningPath.completeLesson(
        command.lessonId,
        command.score,
        command.timeSpentSeconds
      );

      // Save the aggregate (this will persist events and publish them)
      await this.learningPathRepository.save(learningPath);

    } catch (error) {
      console.error('Error executing CompleteLessonCommand:', error);
      throw error;
    }
  }
}