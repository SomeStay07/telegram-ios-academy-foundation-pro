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
import { CourseService } from '../services/course.service';
import { CourseDto, CourseProgressDto, UnlockCourseDto, CourseUnlockResponseDto } from '../dto/course.dto';
import { ApiResponse as ApiResponseDto, IdParam } from '../dto/common.dto';
import { IdempotencyInterceptor } from '../modules/idempotency';

@Controller('courses')
@ApiTags('Courses')
@ApiSecurity('telegram-auth')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

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
      const course = await this.courseService.findById(params.id);
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
      // TODO: Extract user ID from Telegram auth
      const userId = this.extractUserIdFromTelegram(initData);
      const progress = await this.courseService.getProgress(userId, params.id);
      return new ApiResponseDto(progress);
    } catch (error) {
      return new ApiResponseDto(null, (error as Error).message);
    }
  }

  @Post(':id/unlock')
  @Throttle({ short: { ttl: 60000, limit: 10 } }) // 10 requests per minute for mutations
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
      const result = await this.courseService.unlockCourse(userId, params.id, dto);
      return new ApiResponseDto(result);
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