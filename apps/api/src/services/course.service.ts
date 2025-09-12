import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UnlockCourseDto } from '../dto/course.dto';

@Injectable()
export class CourseService {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string) {
    const course = await this.prisma.course.findUnique({
      where: { id }
    });

    if (!course) {
      throw new NotFoundException(`Course with ID ${id} not found`);
    }

    const lessonIds = await this.getLessonIds(id);

    return {
      id: course.id,
      title: course.title,
      description: this.getDescription(id),
      lessonIds,
      difficulty: this.getDifficulty(id),
      estimatedHours: this.getEstimatedHours(id),
      tags: this.getTags(id)
    };
  }

  async getProgress(userId: string, courseId: string) {
    // Verify course exists
    await this.findById(courseId);

    // Get lesson IDs for this course
    const lessonIds = await this.getLessonIds(courseId);

    // Get progress for all lessons in course
    const progressRecords = await this.prisma.progress.findMany({
      where: {
        userId,
        lessonId: { in: lessonIds }
      }
    });

    // Calculate overall progress
    const lessonProgress: Record<string, any> = {};
    let totalScore = 0;
    let completedLessons = 0;

    for (const lessonId of lessonIds) {
      const progress = progressRecords.find((p: any) => p.lessonId === lessonId);
      if (progress) {
        lessonProgress[lessonId] = {
          score: progress.score,
          completed: progress.score >= 0.7,
          timeSpent: 0, // TODO: Track time spent
          updatedAt: progress.updatedAt
        };
        totalScore += progress.score;
        if (progress.score >= 0.7) completedLessons++;
      } else {
        lessonProgress[lessonId] = {
          score: 0,
          completed: false,
          timeSpent: 0,
          updatedAt: null
        };
      }
    }

    const overallProgress = lessonIds.length > 0 ? totalScore / lessonIds.length : 0;

    return {
      courseId,
      userId,
      overallProgress,
      completedLessons,
      totalLessons: lessonIds.length,
      lessonProgress,
      enrolledAt: new Date(), // TODO: Track enrollment
      lastActivityAt: progressRecords.length > 0 
        ? new Date(Math.max(...progressRecords.map((p: any) => p.updatedAt.getTime()))) 
        : new Date()
    };
  }

  async unlockCourse(userId: string, courseId: string, dto: UnlockCourseDto) {
    // Verify course exists
    await this.findById(courseId);

    // TODO: Check if user already has access
    // TODO: Check payment or prerequisites
    // For now, just grant access

    const accessLevel = dto.accessLevel || 'basic';

    // In a real implementation, this would create an enrollment record
    // For now, we'll just return success
    return {
      courseId,
      userId,
      unlocked: true,
      accessLevel,
      unlockedAt: new Date()
    };
  }

  // Helper methods - in a real implementation these would come from the database
  private getDescription(courseId: string): string {
    const descriptions: Record<string, string> = {
      'ios-fundamentals': 'Master the fundamentals of iOS development with Swift',
      'swift-advanced': 'Advanced Swift programming concepts and patterns',
      'uikit-mastery': 'Complete guide to UIKit framework'
    };
    return descriptions[courseId] || 'Course description';
  }

  async getLessonIds(courseId: string): Promise<string[]> {
    // TODO: Use CourseLesson relation table when migration is complete
    // For now, use hardcoded mapping
    const courseLessons: Record<string, string[]> = {
      'ios-fundamentals': ['swift-variables', 'swift-functions'],
      'swift-advanced': ['swift-generics', 'swift-protocols', 'swift-memory'],
      'uikit-mastery': ['views-basics', 'auto-layout', 'animations']
    };
    return courseLessons[courseId] || [];
  }

  private getDifficulty(courseId: string): string {
    const difficulties: Record<string, string> = {
      'ios-fundamentals': 'beginner',
      'swift-advanced': 'advanced',
      'uikit-mastery': 'intermediate'
    };
    return difficulties[courseId] || 'beginner';
  }

  private getEstimatedHours(courseId: string): number {
    const hours: Record<string, number> = {
      'ios-fundamentals': 20,
      'swift-advanced': 30,
      'uikit-mastery': 25
    };
    return hours[courseId] || 15;
  }

  private getTags(courseId: string): string[] {
    const tags: Record<string, string[]> = {
      'ios-fundamentals': ['swift', 'ios', 'beginner', 'mobile'],
      'swift-advanced': ['swift', 'advanced', 'patterns', 'performance'],
      'uikit-mastery': ['uikit', 'ui', 'ios', 'design']
    };
    return tags[courseId] || [];
  }
}