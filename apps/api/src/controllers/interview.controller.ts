import { Controller, Get, Put, Post, Param, Body, Headers, UsePipes, ValidationPipe } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody, ApiSecurity, ApiHeader } from '@nestjs/swagger'
import { InterviewService, UpdateInterviewProgressDto, StartInterviewAttemptDto, FinishInterviewAttemptDto } from '../services/interview.service'
import { MetricsService } from '../metrics/metrics.service'
import { UpdateInterviewProgressBodyDto, StartInterviewAttemptBodyDto, FinishInterviewAttemptBodyDto } from '../dto/interview.dto'


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
  @ApiHeader({ name: 'X-Telegram-Init-Data', required: true })
  @ApiResponse({ status: 200, description: 'Interview progress retrieved successfully' })
  async getInterviewProgress(
    @Param('id') interviewId: string,
    @Headers('X-Telegram-Init-Data') telegramData?: string
  ) {
    // For demo purposes, use hardcoded user ID
    // In production, extract from validated Telegram init data
    const userId = 'demo-user'
    
    return this.interviewService.getInterviewProgress(userId, interviewId)
  }

  @Put(':id/progress')
  @ApiOperation({ summary: 'Update interview progress' })
  @ApiParam({ name: 'id', description: 'Interview ID' })
  @ApiHeader({ name: 'X-Telegram-Init-Data', required: true })
  @ApiBody({ type: UpdateInterviewProgressBodyDto })
  @ApiResponse({ status: 200, description: 'Interview progress updated successfully' })
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  async updateInterviewProgress(
    @Param('id') interviewId: string,
    @Body() body: UpdateInterviewProgressBodyDto,
    @Headers('X-Telegram-Init-Data') telegramData?: string
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

  @Post(':id/attempts')
  @ApiOperation({ summary: 'Start interview attempt' })
  @ApiParam({ name: 'id', description: 'Interview ID' })
  @ApiHeader({ name: 'idempotency-key', required: true })
  @ApiHeader({ name: 'X-Telegram-Init-Data', required: true })
  @ApiBody({ type: StartInterviewAttemptBodyDto })
  @ApiResponse({ status: 201, description: 'Interview attempt started successfully' })
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  async startInterviewAttempt(
    @Param('id') interviewId: string,
    @Body() body: StartInterviewAttemptBodyDto,
    @Headers('idempotency-key') idempotencyKey?: string,
    @Headers('X-Telegram-Init-Data') telegramData?: string
  ) {
    // For demo purposes, use hardcoded user ID
    const userId = 'demo-user'
    
    const attemptData: StartInterviewAttemptDto = {
      interviewId: interviewId,
      questionId: body.questionId,
      mode: body.mode,
      idempotencyKey
    }

    // Record interview attempt start metrics
    this.metricsService.recordInterviewAttempt(
      interviewId,
      body.mode as 'drill' | 'explain' | 'mock',
      'started'
    )

    return this.interviewService.startInterviewAttempt(userId, attemptData)
  }

  @Put('attempts/:attemptId/finish')
  @ApiOperation({ summary: 'Finish interview attempt' })
  @ApiParam({ name: 'attemptId', description: 'Interview attempt ID' })
  @ApiHeader({ name: 'X-Telegram-Init-Data', required: true })
  @ApiBody({ type: FinishInterviewAttemptBodyDto })
  @ApiResponse({ status: 200, description: 'Interview attempt finished successfully' })
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  async finishInterviewAttempt(
    @Param('attemptId') attemptId: string,
    @Body() body: FinishInterviewAttemptBodyDto,
    @Headers('X-Telegram-Init-Data') telegramData?: string
  ) {
    // For demo purposes, use hardcoded user ID
    const userId = 'demo-user'
    
    const attemptData: FinishInterviewAttemptDto = {
      attemptId: attemptId,
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
  @ApiHeader({ name: 'X-Telegram-Init-Data', required: true })
  @ApiResponse({ status: 200, description: 'Interview attempts retrieved successfully' })
  async getInterviewAttempts(
    @Param('id') interviewId: string,
    @Headers('X-Telegram-Init-Data') telegramData?: string
  ) {
    // For demo purposes, use hardcoded user ID
    const userId = 'demo-user'
    
    return this.interviewService.getInterviewAttempts(userId, interviewId)
  }
}