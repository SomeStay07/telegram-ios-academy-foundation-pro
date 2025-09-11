import {
  Controller,
  Get,
  Put,
  Post,
  Param,
  Body,
  Headers,
  UseInterceptors,
  UnauthorizedException
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiSecurity,
  ApiParam,
  ApiBody
} from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';
import { LessonService } from '../services/lesson.service';
import { LessonDto, UpdateProgressDto, CreateAttemptDto, ProgressDto, AttemptDto } from '../dto/lesson.dto';
import { ApiResponse as ApiResponseDto, IdParam } from '../dto/common.dto';
import { IdempotencyInterceptor } from '../modules/idempotency';

@Controller('lessons')
@ApiTags('Lessons')
@ApiSecurity('telegram-auth')
export class LessonController {
  constructor(private readonly lessonService: LessonService) {}

  @Get(':id')
  @ApiOperation({ summary: 'Get lesson by ID' })
  @ApiParam({ name: 'id', description: 'Lesson ID' })
  @ApiResponse({
    status: 200,
    description: 'Lesson retrieved successfully',
    type: LessonDto
  })
  @ApiResponse({ status: 404, description: 'Lesson not found' })
  async getLesson(@Param() params: IdParam): Promise<ApiResponseDto<LessonDto | null>> {
    try {
      const lesson = await this.lessonService.findById(params.id);
      return new ApiResponseDto(lesson);
    } catch (error) {
      return new ApiResponseDto(null, (error as Error).message);
    }
  }

  @Put('progress/:lessonId')
  @Throttle({ short: { ttl: 60000, limit: 10 } }) // 10 requests per minute for mutations
  @ApiOperation({ summary: 'Update user progress for a lesson' })
  @ApiParam({ name: 'lessonId', description: 'Lesson ID' })
  @ApiBody({ type: UpdateProgressDto })
  @ApiResponse({
    status: 200,
    description: 'Progress updated successfully',
    type: ProgressDto
  })
  @ApiResponse({ status: 404, description: 'Lesson not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async updateProgress(
    @Param('lessonId') lessonId: string,
    @Body() dto: UpdateProgressDto,
    @Headers('X-Telegram-Init-Data') initData: string
  ): Promise<ApiResponseDto<ProgressDto | null>> {
    try {
      const userId = this.extractUserIdFromTelegram(initData);
      const progress = await this.lessonService.updateProgress(userId, lessonId, dto);
      
      const progressDto: ProgressDto = {
        userId: progress.userId,
        lessonId: progress.lessonId,
        score: progress.score,
        completed: progress.score >= 0.7,
        timeSpent: dto.timeSpent || 0,
        updatedAt: progress.updatedAt
      };
      
      return new ApiResponseDto(progressDto);
    } catch (error) {
      return new ApiResponseDto(null, (error as Error).message);
    }
  }

  @Post('attempts/:lessonId')
  @Throttle({ short: { ttl: 60000, limit: 10 } }) // 10 requests per minute for mutations
  @ApiOperation({ summary: 'Create attempt for a lesson' })
  @ApiParam({ name: 'lessonId', description: 'Lesson ID' })
  @ApiBody({ type: CreateAttemptDto })
  @UseInterceptors(IdempotencyInterceptor)
  @ApiSecurity('idempotency')
  @ApiResponse({
    status: 201,
    description: 'Attempt created successfully',
    type: AttemptDto
  })
  @ApiResponse({ status: 404, description: 'Lesson not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async createAttempt(
    @Param('lessonId') lessonId: string,
    @Body() dto: CreateAttemptDto,
    @Headers('X-Telegram-Init-Data') initData: string,
    @Headers('Idempotency-Key') idempotencyKey?: string
  ): Promise<ApiResponseDto<AttemptDto | null>> {
    try {
      const userId = this.extractUserIdFromTelegram(initData);
      const attempt = await this.lessonService.createAttempt(userId, lessonId, dto, idempotencyKey);
      
      const attemptDto: AttemptDto = {
        id: attempt.id,
        userId: attempt.userId,
        lessonId: attempt.lessonId,
        score: dto.score,
        payload: attempt.payload,
        timeSpentSeconds: dto.timeSpentSeconds,
        createdAt: attempt.createdAt
      };
      
      return new ApiResponseDto(attemptDto);
    } catch (error) {
      return new ApiResponseDto(null, (error as Error).message);
    }
  }

  private extractUserIdFromTelegram(initData: string): string {
    // TODO: Implement proper Telegram initData verification
    // For now, return a mock user ID
    if (!initData) {
      throw new UnauthorizedException('Missing Telegram authentication');
    }
    return 'user_123'; // Mock user ID
  }
}