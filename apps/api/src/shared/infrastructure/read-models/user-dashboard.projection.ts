import { Injectable } from '@nestjs/common';
import { EventHandler } from '../../application/event-bus';
import { LessonCompleted } from '../../../domains/learning/events/lesson-completed.event';
import { UserActivityRecorded } from '../../../domains/user/events/user-activity-recorded.event';
import { StreakMaintained } from '../../../domains/user/events/streak-maintained.event';
import { PrismaService } from '../../../prisma/prisma.service';

export interface UserDashboardData {
  userId: string;
  totalLessonsCompleted: number;
  currentStreak: number;
  longestStreak: number;
  averageScore: number;
  totalTimeSpent: number; // minutes
  lastActivity: Date;
  weeklyProgress: number[];
  achievements: string[];
}

@Injectable()
export class UserDashboardProjection implements EventHandler<LessonCompleted | UserActivityRecorded | StreakMaintained> {
  constructor(private readonly prisma: PrismaService) {}

  async handle(event: LessonCompleted | UserActivityRecorded | StreakMaintained): Promise<void> {
    try {
      switch (event.eventType) {
        case 'LessonCompleted':
          await this.handleLessonCompleted(event as LessonCompleted);
          break;
        case 'UserActivityRecorded':
          await this.handleUserActivity(event as UserActivityRecorded);
          break;
        case 'StreakMaintained':
          await this.handleStreakMaintained(event as StreakMaintained);
          break;
      }
    } catch (error) {
      console.error('Error updating user dashboard projection:', error);
    }
  }

  private async handleLessonCompleted(event: LessonCompleted): Promise<void> {
    // Update learning progress table for dashboard queries
    await (this.prisma as any).learningProgress.upsert({
      where: {
        userId_lessonId: {
          userId: event.userId,
          lessonId: event.lessonId
        }
      },
      update: {
        score: event.score,
        completed: event.score >= 0.7,
        timeSpentMinutes: event.timeSpentSeconds / 60,
        updatedAt: event.occurredOn
      },
      create: {
        userId: event.userId,
        lessonId: event.lessonId,
        score: event.score,
        completed: event.score >= 0.7,
        timeSpentMinutes: event.timeSpentSeconds / 60,
        createdAt: event.occurredOn,
        updatedAt: event.occurredOn
      }
    });

    // Refresh materialized view for dashboard performance
    await this.refreshUserProgressSummary();
  }

  private async handleUserActivity(event: UserActivityRecorded): Promise<void> {
    // Record activity in user_activities table for analytics
    await (this.prisma as any).userActivities.create({
      data: {
        userId: event.userId,
        activityType: event.activityType,
        activityData: event as any,
        occurredAt: event.occurredOn
      }
    });
  }

  private async handleStreakMaintained(event: StreakMaintained): Promise<void> {
    // Update user streaks table for real-time dashboard
    await (this.prisma as any).userStreaks.upsert({
      where: { userId: event.userId },
      update: {
        currentStreak: event.newStreakCount,
        longestStreak: event.newStreakCount, // Will be updated by trigger to MAX
        lastActivityDate: new Date(event.maintainedAt),
        updatedAt: new Date()
      },
      create: {
        userId: event.userId,
        currentStreak: event.newStreakCount,
        longestStreak: event.newStreakCount,
        lastActivityDate: new Date(event.maintainedAt),
        streakStartDate: new Date(event.maintainedAt),
        updatedAt: new Date()
      }
    });
  }

  private async refreshUserProgressSummary(): Promise<void> {
    // Refresh materialized view for better dashboard performance
    await this.prisma.$executeRaw`REFRESH MATERIALIZED VIEW CONCURRENTLY user_progress_summary`;
  }

  // Query method for dashboard data
  async getUserDashboardData(userId: string): Promise<UserDashboardData> {
    const [progressSummary, streakData, recentActivities] = await Promise.all([
      (this.prisma as any).userDashboard.findUnique({
        where: { userId }
      }),
      (this.prisma as any).userStreaks.findUnique({
        where: { userId }
      }),
      (this.prisma as any).userActivities.findMany({
        where: { 
          userId,
          occurredAt: {
            gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) // Last 7 days
          }
        },
        orderBy: { occurredAt: 'desc' }
      })
    ]);

    // Calculate weekly progress
    const weeklyProgress = this.calculateWeeklyProgress(recentActivities);

    return {
      userId,
      totalLessonsCompleted: progressSummary?.completedLessons || 0,
      currentStreak: streakData?.currentStreak || 0,
      longestStreak: streakData?.longestStreak || 0,
      averageScore: progressSummary?.averageScore || 0,
      totalTimeSpent: progressSummary?.totalTimeSpent || 0,
      lastActivity: progressSummary?.lastActivity || new Date(),
      weeklyProgress,
      achievements: [] // TODO: Implement achievements system
    };
  }

  private calculateWeeklyProgress(activities: any[]): number[] {
    const weekProgress = new Array(7).fill(0);
    const now = new Date();
    
    activities.forEach(activity => {
      const daysDiff = Math.floor((now.getTime() - activity.occurredAt.getTime()) / (1000 * 60 * 60 * 24));
      if (daysDiff < 7) {
        weekProgress[6 - daysDiff]++;
      }
    });

    return weekProgress;
  }
}