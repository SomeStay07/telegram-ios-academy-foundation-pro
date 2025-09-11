import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../modules/prisma.service';
import { CreateAttemptDto, UpdateProgressDto } from '../dto/lesson.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class LessonService {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string) {
    const lesson = await this.prisma.lesson.findUnique({
      where: { id }
    });

    if (!lesson) {
      throw new NotFoundException(`Lesson with ID ${id} not found`);
    }

    return {
      id: lesson.id,
      title: this.extractTitle(lesson.content),
      description: this.extractDescription(lesson.content),
      content: lesson.content,
      estimatedMinutes: this.extractEstimatedMinutes(lesson.content),
      difficulty: this.extractDifficulty(lesson.content),
      tags: this.extractTags(lesson.content)
    };
  }

  async updateProgress(userId: string, lessonId: string, dto: UpdateProgressDto) {
    return this.upsertProgress(userId, lessonId, dto.score);
  }

  // Атомарная транзакция для обновления прогресса
  async upsertProgress(userId: string, lessonId: string, score: number) {
    // Validate score range
    if (score < 0 || score > 1) {
      throw new BadRequestException('Score must be between 0 and 1');
    }

    return this.prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      // Verify lesson exists
      await tx.lesson.findUniqueOrThrow({
        where: { id: lessonId }
      });

      // Upsert progress record with transaction
      const progress = await tx.progress.upsert({
        where: {
          userId_lessonId: {
            userId,
            lessonId
          }
        },
        update: {
          score: score,
          updatedAt: new Date()
        },
        create: {
          userId,
          lessonId,
          score: score
        }
      });

      return progress;
    });
  }

  async createAttempt(userId: string, lessonId: string, dto: CreateAttemptDto, idemKey?: string) {
    return this.createAttemptWithIdempotency(userId, lessonId, dto.payload, dto.score, dto.timeSpentSeconds, idemKey);
  }

  // Создание попытки с защитой от дублирования
  async createAttemptWithIdempotency(userId: string, lessonId: string, payload: any, score: number, timeSpentSeconds: number, idemKey?: string) {
    // Validate score range
    if (score < 0 || score > 1) {
      throw new BadRequestException('Score must be between 0 and 1');
    }

    // Быстрый путь в Redis уже есть (интерсептор),
    // но продублируем защиту в БД, если idemKey передан
    if (idemKey) {
      const exists = await this.prisma.attempt.findUnique({ 
        where: { idempotencyKey: idemKey } as any
      });
      if (exists) return exists;
    }

    return this.prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      // Verify lesson exists
      await tx.lesson.findUniqueOrThrow({
        where: { id: lessonId }
      });

      // Create attempt
      const attempt = await tx.attempt.create({
        data: {
          userId,
          lessonId,
          payload,
          idempotencyKey: idemKey,
          createdAt: new Date()
        } as any
      });

      // Also update progress if this is a better score
      const existingProgress = await tx.progress.findUnique({
        where: {
          userId_lessonId: {
            userId,
            lessonId
          }
        }
      });

      if (!existingProgress || score > existingProgress.score) {
        await tx.progress.upsert({
          where: {
            userId_lessonId: {
              userId,
              lessonId
            }
          },
          update: {
            score: score,
            updatedAt: new Date()
          },
          create: {
            userId,
            lessonId,
            score: score
          }
        });
      }

      return attempt;
    });
  }

  private extractTitle(content: any): string {
    if (content && typeof content === 'object' && content.title) {
      return content.title;
    }
    return 'Untitled Lesson';
  }

  private extractDescription(content: any): string {
    if (content && typeof content === 'object' && content.description) {
      return content.description;
    }
    return '';
  }

  private extractEstimatedMinutes(content: any): number {
    if (content && typeof content === 'object' && content.estimatedMinutes) {
      return content.estimatedMinutes;
    }
    return 30; // Default estimate
  }

  private extractDifficulty(content: any): string {
    if (content && typeof content === 'object' && content.difficulty) {
      return content.difficulty;
    }
    return 'beginner';
  }

  private extractTags(content: any): string[] {
    if (content && typeof content === 'object' && Array.isArray(content.tags)) {
      return content.tags;
    }
    return [];
  }
}