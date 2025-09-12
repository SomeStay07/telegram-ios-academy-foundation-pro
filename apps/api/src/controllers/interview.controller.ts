import { Controller, Get, Put, Post, Param, Body, Headers, UsePipes, ValidationPipe } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody, ApiSecurity } from '@nestjs/swagger'
import { InterviewService, UpdateInterviewProgressDto, StartInterviewAttemptDto, FinishInterviewAttemptDto } from '../services/interview.service'
import { MetricsService } from '../metrics/metrics.service'
import { InterviewMode, InterviewAttemptStatus } from '@prisma/client'
import { IsString, IsOptional, IsNumber, IsBoolean, IsEnum, IsObject } from 'class-validator'
import { Transform } from 'class-transformer'

// DTOs for validation
class UpdateInterviewProgressBodyDto {
  @IsString()
  interviewId!: string

  @IsEnum(InterviewMode)
  mode!: InterviewMode

  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  lastIndex!: number

  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  correct!: number

  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  total!: number

  @IsOptional()
  @IsObject()
  metadata?: any
}

class StartInterviewAttemptBodyDto {
  @IsString()
  interviewId!: string

  @IsString()
  questionId!: string

  @IsEnum(InterviewMode)
  mode!: InterviewMode
}

class FinishInterviewAttemptBodyDto {
  @IsString()
  attemptId!: string

  @IsOptional()
  @IsBoolean()
  correct?: boolean

  @IsOptional()
  @IsObject()
  answerJson?: any

  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  timeSpent!: number
}

@ApiTags('interviews')
@ApiSecurity('telegram-auth')
@Controller('interviews')
export class InterviewController {
  constructor(
    private readonly interviewService: InterviewService,
    private readonly metricsService: MetricsService
  ) {}

  @Get(':id/progress')
  @ApiOperation({ summary: 'Get interview progress for user' })
  @ApiParam({ name: 'id', description: 'Interview ID' })
  @ApiResponse({ status: 200, description: 'Interview progress retrieved successfully' })
  async getInterviewProgress(
    @Param('id') interviewId: string,
    @Headers('x-telegram-init-data') telegramData?: string
  ) {
    // For demo purposes, use hardcoded user ID
    // In production, extract from validated Telegram init data
    const userId = 'demo-user'
    
    return this.interviewService.getInterviewProgress(userId, interviewId)
  }

  @Put('progress/:id')
  @ApiOperation({ summary: 'Update interview progress' })
  @ApiParam({ name: 'id', description: 'Interview ID' })
  @ApiBody({ type: UpdateInterviewProgressBodyDto })
  @ApiResponse({ status: 200, description: 'Interview progress updated successfully' })
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  async updateInterviewProgress(
    @Param('id') interviewId: string,
    @Body() body: UpdateInterviewProgressBodyDto,
    @Headers('x-telegram-init-data') telegramData?: string
  ) {
    // For demo purposes, use hardcoded user ID
    const userId = 'demo-user'
    
    const progressData: UpdateInterviewProgressDto = {
      interviewId: body.interviewId,
      mode: body.mode,
      lastIndex: body.lastIndex,
      correct: body.correct,
      total: body.total,
      metadata: body.metadata
    }

    return this.interviewService.updateInterviewProgress(userId, progressData)
  }

  @Post('attempts/start')
  @ApiOperation({ summary: 'Start interview attempt' })
  @ApiBody({ type: StartInterviewAttemptBodyDto })
  @ApiResponse({ status: 201, description: 'Interview attempt started successfully' })
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  async startInterviewAttempt(
    @Body() body: StartInterviewAttemptBodyDto,
    @Headers('idempotency-key') idempotencyKey?: string,
    @Headers('x-telegram-init-data') telegramData?: string
  ) {
    // For demo purposes, use hardcoded user ID
    const userId = 'demo-user'
    
    const attemptData: StartInterviewAttemptDto = {
      interviewId: body.interviewId,
      questionId: body.questionId,
      mode: body.mode,
      idempotencyKey
    }

    // Record interview attempt start metrics
    this.metricsService.recordInterviewAttempt(
      body.interviewId,
      body.mode as 'drill' | 'explain' | 'mock',
      'started'
    )

    return this.interviewService.startInterviewAttempt(userId, attemptData)
  }

  @Put('attempts/finish')
  @ApiOperation({ summary: 'Finish interview attempt' })
  @ApiBody({ type: FinishInterviewAttemptBodyDto })
  @ApiResponse({ status: 200, description: 'Interview attempt finished successfully' })
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  async finishInterviewAttempt(
    @Body() body: FinishInterviewAttemptBodyDto,
    @Headers('x-telegram-init-data') telegramData?: string
  ) {
    // For demo purposes, use hardcoded user ID
    const userId = 'demo-user'
    
    const attemptData: FinishInterviewAttemptDto = {
      attemptId: body.attemptId,
      correct: body.correct,
      answerJson: body.answerJson,
      timeSpent: body.timeSpent
    }

    const result = await this.interviewService.finishInterviewAttempt(userId, attemptData)

    // Record attempt completion metrics
    this.metricsService.recordInterviewAttempt(
      result.interviewId,
      result.mode as 'drill' | 'explain' | 'mock',
      result.correct ? 'completed' : 'abandoned'
    )

    return result
  }

  @Get(':id/attempts')
  @ApiOperation({ summary: 'Get interview attempts for user' })
  @ApiParam({ name: 'id', description: 'Interview ID' })
  @ApiResponse({ status: 200, description: 'Interview attempts retrieved successfully' })
  async getInterviewAttempts(
    @Param('id') interviewId: string,
    @Headers('x-telegram-init-data') telegramData?: string
  ) {
    // For demo purposes, use hardcoded user ID
    const userId = 'demo-user'
    
    return this.interviewService.getInterviewAttempts(userId, interviewId)
  }
}