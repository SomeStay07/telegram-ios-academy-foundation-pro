import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID, IsNumber, IsOptional, IsObject, IsArray, IsBoolean } from 'class-validator';

export class CourseDto {
  @ApiProperty({ description: 'Course ID' })
  @IsString()
  id!: string;

  @ApiProperty({ description: 'Course title' })
  @IsString()
  title!: string;

  @ApiProperty({ description: 'Course description' })
  @IsString()
  description!: string;

  @ApiProperty({ description: 'Course lessons', type: [String] })
  @IsArray()
  @IsString({ each: true })
  lessonIds!: string[];

  @ApiProperty({ description: 'Course difficulty', enum: ['beginner', 'intermediate', 'advanced'] })
  @IsString()
  difficulty!: string;

  @ApiProperty({ description: 'Estimated completion time in hours' })
  @IsNumber()
  estimatedHours!: number;

  @ApiProperty({ description: 'Course tags', type: [String] })
  @IsArray()
  @IsString({ each: true })
  tags!: string[];
}

export class CourseProgressDto {
  @ApiProperty({ description: 'Course ID' })
  @IsString()
  courseId!: string;

  @ApiProperty({ description: 'User ID' })
  @IsString()
  userId!: string;

  @ApiProperty({ description: 'Overall progress (0-1)' })
  @IsNumber()
  overallProgress!: number;

  @ApiProperty({ description: 'Completed lessons count' })
  @IsNumber()
  completedLessons!: number;

  @ApiProperty({ description: 'Total lessons count' })
  @IsNumber()
  totalLessons!: number;

  @ApiProperty({ description: 'Lesson progress details', type: 'object', additionalProperties: true })
  @IsObject()
  lessonProgress!: Record<string, {
    score: number;
    completed: boolean;
    timeSpent: number;
    updatedAt: Date;
  }>;

  @ApiProperty({ description: 'Course enrollment date' })
  enrolledAt!: Date;

  @ApiProperty({ description: 'Last activity date' })
  lastActivityAt!: Date;
}

export class UnlockCourseDto {
  @ApiProperty({ description: 'Unlock reason', required: false })
  @IsOptional()
  @IsString()
  reason?: string;

  @ApiProperty({ description: 'Access level', enum: ['basic', 'premium'], required: false })
  @IsOptional()
  @IsString()
  accessLevel?: string;
}

export class CourseUnlockResponseDto {
  @ApiProperty({ description: 'Course ID' })
  @IsString()
  courseId!: string;

  @ApiProperty({ description: 'User ID' })
  @IsString()
  userId!: string;

  @ApiProperty({ description: 'Unlock status' })
  @IsBoolean()
  unlocked!: boolean;

  @ApiProperty({ description: 'Access level granted' })
  @IsString()
  accessLevel!: string;

  @ApiProperty({ description: 'Unlock timestamp' })
  unlockedAt!: Date;
}