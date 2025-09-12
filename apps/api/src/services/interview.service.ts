import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { InterviewMode, Prisma } from '@prisma/client'

export interface InterviewProgressResponse {
  id: string
  interviewId: string
  mode: InterviewMode
  lastIndex: number
  correct: number
  total: number
  metadata?: any
  updatedAt: string
}

export interface UpdateInterviewProgressDto {
  interviewId: string
  mode: InterviewMode
  lastIndex: number
  correct: number
  total: number
  metadata?: any
}

export interface CreateInterviewAttemptDto {
  interviewId: string
  questionId: string
  mode: InterviewMode
  correct?: boolean
  answerJson?: any
  timeSpent: number
  idempotencyKey?: string
}

export interface InterviewAttemptResponse {
  id: string
  interviewId: string
  questionId: string
  mode: InterviewMode
  correct?: boolean | null
  timeSpent: number
  answeredAt: string
}

@Injectable()
export class InterviewService {
  constructor(private prisma: PrismaService) {}

  async getInterviewProgress(
    userId: string, 
    interviewId: string, 
    mode?: InterviewMode
  ): Promise<InterviewProgressResponse[]> {
    const where: Prisma.InterviewProgressWhereInput = {
      userId,
      interviewId,
      ...(mode && { mode })
    }

    const progressRecords = await this.prisma.interviewProgress.findMany({
      where,
      orderBy: { updatedAt: 'desc' }
    })

    return progressRecords.map(progress => ({
      id: progress.id,
      interviewId: progress.interviewId,
      mode: progress.mode,
      lastIndex: progress.lastIndex,
      correct: progress.correct,
      total: progress.total,
      metadata: progress.metadata,
      updatedAt: progress.updatedAt.toISOString()
    }))
  }

  async updateInterviewProgress(
    userId: string,
    data: UpdateInterviewProgressDto
  ): Promise<InterviewProgressResponse> {
    // Upsert progress record
    const progress = await this.prisma.interviewProgress.upsert({
      where: {
        userId_interviewId_mode: {
          userId,
          interviewId: data.interviewId,
          mode: data.mode
        }
      },
      update: {
        lastIndex: data.lastIndex,
        correct: data.correct,
        total: data.total,
        metadata: data.metadata,
        updatedAt: new Date()
      },
      create: {
        userId,
        interviewId: data.interviewId,
        mode: data.mode,
        lastIndex: data.lastIndex,
        correct: data.correct,
        total: data.total,
        metadata: data.metadata
      }
    })

    return {
      id: progress.id,
      interviewId: progress.interviewId,
      mode: progress.mode,
      lastIndex: progress.lastIndex,
      correct: progress.correct,
      total: progress.total,
      metadata: progress.metadata,
      updatedAt: progress.updatedAt.toISOString()
    }
  }

  async createInterviewAttempt(
    userId: string,
    data: CreateInterviewAttemptDto
  ): Promise<InterviewAttemptResponse> {
    // Handle idempotency - if idempotencyKey provided, check for existing attempt
    if (data.idempotencyKey) {
      const existing = await this.prisma.interviewAttempt.findUnique({
        where: { idempotencyKey: data.idempotencyKey }
      })
      
      if (existing) {
        // Return existing attempt
        return {
          id: existing.id,
          interviewId: existing.interviewId,
          questionId: existing.questionId,
          mode: existing.mode,
          correct: existing.correct,
          timeSpent: existing.timeSpent,
          answeredAt: existing.answeredAt.toISOString()
        }
      }
    }

    // Create new attempt
    const attempt = await this.prisma.interviewAttempt.create({
      data: {
        userId,
        interviewId: data.interviewId,
        questionId: data.questionId,
        mode: data.mode,
        correct: data.correct,
        answerJson: data.answerJson,
        timeSpent: data.timeSpent,
        idempotencyKey: data.idempotencyKey
      }
    })

    return {
      id: attempt.id,
      interviewId: attempt.interviewId,
      questionId: attempt.questionId,
      mode: attempt.mode,
      correct: attempt.correct,
      timeSpent: attempt.timeSpent,
      answeredAt: attempt.answeredAt.toISOString()
    }
  }

  async getInterviewAttempts(
    userId: string,
    interviewId: string,
    questionId?: string
  ): Promise<InterviewAttemptResponse[]> {
    const where: Prisma.InterviewAttemptWhereInput = {
      userId,
      interviewId,
      ...(questionId && { questionId })
    }

    const attempts = await this.prisma.interviewAttempt.findMany({
      where,
      orderBy: { answeredAt: 'desc' },
      take: 50 // Limit to recent attempts
    })

    return attempts.map(attempt => ({
      id: attempt.id,
      interviewId: attempt.interviewId,
      questionId: attempt.questionId,
      mode: attempt.mode,
      correct: attempt.correct,
      timeSpent: attempt.timeSpent,
      answeredAt: attempt.answeredAt.toISOString()
    }))
  }
}