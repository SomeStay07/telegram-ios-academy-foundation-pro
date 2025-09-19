import { Injectable } from '@nestjs/common';
import { QueryHandler } from '../../../shared/application/query';
import { GetLessonProgressQuery } from '../queries/get-lesson-progress.query';
import { ProgressDto } from '../../../dto/lesson.dto';
import { LearningPathRepository } from '../repositories/learning-path.repository';

@Injectable()
export class GetLessonProgressHandler implements QueryHandler<GetLessonProgressQuery, ProgressDto> {
  constructor(
    private readonly learningPathRepository: LearningPathRepository
  ) {}

  async execute(query: GetLessonProgressQuery): Promise<ProgressDto> {
    try {
      const streamId = `learning-path-${query.userId}`;
      const learningPath = await this.learningPathRepository.getById(streamId);

      if (!learningPath) {
        return {
          userId: query.userId,
          lessonId: query.lessonId,
          score: 0,
          completed: false,
          timeSpent: 0,
          updatedAt: new Date()
        };
      }

      const lessonProgress = learningPath.getLessonProgress(query.lessonId);
      
      if (!lessonProgress) {
        return {
          userId: query.userId,
          lessonId: query.lessonId,
          score: 0,
          completed: false,
          timeSpent: 0,
          updatedAt: new Date()
        };
      }

      return {
        userId: query.userId,
        lessonId: query.lessonId,
        score: lessonProgress.score,
        completed: lessonProgress.completed,
        timeSpent: lessonProgress.timeSpentSeconds,
        updatedAt: lessonProgress.completedAt || lessonProgress.startedAt
      };

    } catch (error) {
      console.error('Error executing GetLessonProgressQuery:', error);
      throw error;
    }
  }
}