import { Injectable } from '@nestjs/common';
import { CommandHandler } from '../../../shared/application/command';
import { UpdateProgressCommand } from '../commands/update-progress.command';
import { LearningPathRepository } from '../repositories/learning-path.repository';
import { LearningPath } from '../entities/learning-path.entity';

@Injectable()
export class UpdateProgressHandler implements CommandHandler<UpdateProgressCommand> {
  constructor(
    private readonly learningPathRepository: LearningPathRepository
  ) {}

  async execute(command: UpdateProgressCommand): Promise<void> {
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

      // Update progress
      learningPath.updateProgress(
        command.lessonId,
        command.score,
        command.timeSpent
      );

      // Save the aggregate
      await this.learningPathRepository.save(learningPath);

    } catch (error) {
      console.error('Error executing UpdateProgressCommand:', error);
      throw error;
    }
  }
}