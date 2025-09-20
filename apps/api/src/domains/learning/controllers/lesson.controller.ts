import {
  Controller,
  Get,
  Put,
  Post,
  Param,
  Body,
  Headers,
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
import { LessonDto, UpdateProgressDto, CreateAttemptDto, ProgressDto, AttemptDto } from '../../../dto/lesson.dto';
import { ApiResponse as ApiResponseDto, IdParam } from '../../../dto/common.dto';
import { CompleteLessonCommand } from '../commands/complete-lesson.command';
import { UpdateProgressCommand } from '../commands/update-progress.command';
import { GetLessonProgressQuery } from '../queries/get-lesson-progress.query';
import { CommandBus } from '../../../shared/application/command-bus';
import { QueryBus } from '../../../shared/application/query-bus';

@Controller('lessons')
@ApiTags('Learning - Lessons')
@ApiSecurity('telegram-auth')
export class LessonController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}

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
      // This would be handled by a query handler for getting lesson data
      // For now, keeping the existing structure but with domain-oriented thinking
      const lesson = await this.getLessonById(params.id);
      return new ApiResponseDto(lesson);
    } catch (error) {
      return new ApiResponseDto(null, (error as Error).message);
    }
  }

  @Put('progress/:lessonId')
  @Throttle({ short: { ttl: 60000, limit: 10 } })
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
      
      const command = new UpdateProgressCommand(
        userId,
        lessonId,
        dto.score,
        dto.timeSpent || 0
      );

      await this.commandBus.execute(command);

      // Query updated progress
      const query = new GetLessonProgressQuery(userId, lessonId);
      const progress = await this.queryBus.execute(query);
      
      return new ApiResponseDto(progress as ProgressDto | null);
    } catch (error) {
      return new ApiResponseDto(null, (error as Error).message);
    }
  }

  @Post('attempts/:lessonId')
  @Throttle({ short: { ttl: 60000, limit: 10 } })
  @ApiOperation({ summary: 'Create attempt for a lesson (complete lesson)' })
  @ApiParam({ name: 'lessonId', description: 'Lesson ID' })
  @ApiBody({ type: CreateAttemptDto })
  @ApiResponse({
    status: 201,
    description: 'Lesson completed successfully',
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
      
      const command = new CompleteLessonCommand(
        userId,
        lessonId,
        dto.score,
        dto.timeSpentSeconds,
        dto.payload
      );

      await this.commandBus.execute(command);

      // Return attempt data - this would be generated from the command result
      const attemptDto: AttemptDto = {
        id: command.commandId, // Using command ID as attempt ID
        userId: userId,
        lessonId: lessonId,
        score: dto.score,
        payload: dto.payload,
        timeSpentSeconds: dto.timeSpentSeconds,
        createdAt: new Date()
      };
      
      return new ApiResponseDto(attemptDto);
    } catch (error) {
      return new ApiResponseDto(null, (error as Error).message);
    }
  }

  private extractUserIdFromTelegram(initData: string): string {
    // This method is now deprecated - use TelegramAuthGuard instead
    // But keeping for backwards compatibility during migration
    try {
      const telegramService = new (require('../../../shared/infrastructure/telegram/telegram.service').TelegramService)();
      const telegramData = telegramService.validateAndParseInitData(initData);
      return `tg_${telegramData.user.id}`;
    } catch (error) {
      throw new UnauthorizedException('Invalid Telegram authentication');
    }
  }

  private async getLessonById(id: string): Promise<LessonDto | null> {
    // TODO: Implement with proper query handler
    // This is a placeholder to maintain API compatibility
    return null;
  }
}