import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { InterviewMode, InterviewAttemptStatus, Prisma } from '@prisma/client'

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

export interface StartInterviewAttemptDto {
  interviewId: string
  questionId: string
  mode: InterviewMode
  idempotencyKey?: string
}

export interface FinishInterviewAttemptDto {
  attemptId: string
  correct?: boolean
  answerJson?: any
  timeSpent: number
}

export interface InterviewAttemptResponse {
  id: string
  interviewId: string
  questionId: string
  mode: InterviewMode
  status: InterviewAttemptStatus
  correct?: boolean | null
  timeSpent: number
  answeredAt: string
  finishedAt?: string | null
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

  async startInterviewAttempt(
    userId: string,
    data: StartInterviewAttemptDto
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
          status: existing.status,
          correct: existing.correct,
          timeSpent: existing.timeSpent,
          answeredAt: existing.answeredAt.toISOString(),
          finishedAt: existing.finishedAt?.toISOString() ?? null
        }
      }
    }

    // Create new started attempt
    const attempt = await this.prisma.interviewAttempt.create({
      data: {
        userId,
        interviewId: data.interviewId,
        questionId: data.questionId,
        mode: data.mode,
        status: InterviewAttemptStatus.started,
        timeSpent: 0,
        idempotencyKey: data.idempotencyKey
      }
    })

    return {
      id: attempt.id,
      interviewId: attempt.interviewId,
      questionId: attempt.questionId,
      mode: attempt.mode,
      status: attempt.status,
      correct: attempt.correct,
      timeSpent: attempt.timeSpent,
      answeredAt: attempt.answeredAt.toISOString(),
      finishedAt: attempt.finishedAt?.toISOString() ?? null
    }
  }

  async finishInterviewAttempt(
    userId: string,
    data: FinishInterviewAttemptDto
  ): Promise<InterviewAttemptResponse> {
    // Find the attempt and verify ownership
    const existingAttempt = await this.prisma.interviewAttempt.findFirst({
      where: {
        id: data.attemptId,
        userId,
        status: InterviewAttemptStatus.started
      }
    })

    if (!existingAttempt) {
      throw new Error('Interview attempt not found or already finished')
    }

    // Determine status based on whether answer is correct
    const status = data.correct === undefined 
      ? InterviewAttemptStatus.abandoned 
      : InterviewAttemptStatus.completed

    // Update the attempt with results
    const attempt = await this.prisma.interviewAttempt.update({
      where: { id: data.attemptId },
      data: {
        status,
        correct: data.correct,
        answerJson: data.answerJson,
        timeSpent: data.timeSpent,
        finishedAt: new Date()
      }
    })

    return {
      id: attempt.id,
      interviewId: attempt.interviewId,
      questionId: attempt.questionId,
      mode: attempt.mode,
      status: attempt.status,
      correct: attempt.correct,
      timeSpent: attempt.timeSpent,
      answeredAt: attempt.answeredAt.toISOString(),
      finishedAt: attempt.finishedAt?.toISOString() ?? null
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
      status: attempt.status,
      correct: attempt.correct,
      timeSpent: attempt.timeSpent,
      answeredAt: attempt.answeredAt.toISOString(),
      finishedAt: attempt.finishedAt?.toISOString() ?? null
    }))
  }
}