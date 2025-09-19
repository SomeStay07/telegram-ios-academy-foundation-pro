import {
  Controller,
  Get,
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
import { CourseDto, CourseProgressDto, UnlockCourseDto, CourseUnlockResponseDto } from '../../../dto/course.dto';
import { ApiResponse as ApiResponseDto, IdParam } from '../../../dto/common.dto';
import { IdempotencyInterceptor } from '../../../modules/idempotency';
import { UnlockCourseCommand } from '../commands/unlock-course.command';
import { CommandHandler } from '../../../shared/application/command';

@Controller('courses')
@ApiTags('Course Management')
@ApiSecurity('telegram-auth')
export class CourseController {
  constructor(
    private readonly unlockCourseHandler: CommandHandler<UnlockCourseCommand>
  ) {}

  @Get(':id')
  @ApiOperation({ summary: 'Get course by ID' })
  @ApiParam({ name: 'id', description: 'Course ID' })
  @ApiResponse({
    status: 200,
    description: 'Course retrieved successfully',
    type: CourseDto
  })
  @ApiResponse({ status: 404, description: 'Course not found' })
  async getCourse(@Param() params: IdParam): Promise<ApiResponseDto<CourseDto | null>> {
    try {
      // TODO: Implement with proper query handler
      const course = await this.getCourseById(params.id);
      return new ApiResponseDto(course);
    } catch (error) {
      return new ApiResponseDto(null, (error as Error).message);
    }
  }

  @Get(':id/progress')
  @ApiOperation({ summary: 'Get user progress for a course' })
  @ApiParam({ name: 'id', description: 'Course ID' })
  @ApiResponse({
    status: 200,
    description: 'Course progress retrieved successfully',
    type: CourseProgressDto
  })
  @ApiResponse({ status: 404, description: 'Course not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getCourseProgress(
    @Param() params: IdParam,
    @Headers('X-Telegram-Init-Data') initData: string
  ): Promise<ApiResponseDto<CourseProgressDto | null>> {
    try {
      const userId = this.extractUserIdFromTelegram(initData);
      
      // TODO: Implement with proper query handler
      const progress = await this.getProgressForUser(userId, params.id);
      return new ApiResponseDto(progress);
    } catch (error) {
      return new ApiResponseDto(null, (error as Error).message);
    }
  }

  @Post(':id/unlock')
  @Throttle({ short: { ttl: 60000, limit: 10 } })
  @ApiOperation({ summary: 'Unlock course for user' })
  @ApiParam({ name: 'id', description: 'Course ID' })
  @ApiBody({ type: UnlockCourseDto })
  @ApiSecurity('idempotency')
  @UseInterceptors(IdempotencyInterceptor)
  @ApiResponse({
    status: 200,
    description: 'Course unlocked successfully',
    type: CourseUnlockResponseDto
  })
  @ApiResponse({ status: 404, description: 'Course not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async unlockCourse(
    @Param() params: IdParam,
    @Body() dto: UnlockCourseDto,
    @Headers('X-Telegram-Init-Data') initData: string
  ): Promise<ApiResponseDto<CourseUnlockResponseDto | null>> {
    try {
      const userId = this.extractUserIdFromTelegram(initData);
      
      const command = new UnlockCourseCommand(params.id, userId);
      await this.unlockCourseHandler.execute(command);
      
      const result: CourseUnlockResponseDto = {
        success: true,
        courseId: params.id,
        userId: userId,
        unlockedAt: new Date()
      };
      
      return new ApiResponseDto(result);
    } catch (error) {
      return new ApiResponseDto(null, (error as Error).message);
    }
  }

  private extractUserIdFromTelegram(initData: string): string {
    // This method is now deprecated - use TelegramAuthGuard instead
    try {
      const telegramService = new (require('../../../shared/infrastructure/telegram/telegram.service').TelegramService)();
      const telegramData = telegramService.validateAndParseInitData(initData);
      return `tg_${telegramData.user.id}`;
    } catch (error) {
      throw new UnauthorizedException('Invalid Telegram authentication');
    }
  }

  private async getCourseById(id: string): Promise<CourseDto | null> {
    // TODO: Implement with proper query handler
    return null;
  }

  private async getProgressForUser(userId: string, courseId: string): Promise<CourseProgressDto | null> {
    // TODO: Implement with proper query handler
    return null;
  }
}