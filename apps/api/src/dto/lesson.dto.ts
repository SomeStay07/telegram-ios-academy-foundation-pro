import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID, IsNumber, IsOptional, IsObject, IsArray, Min, Max } from 'class-validator';

export class LessonDto {
  @ApiProperty({ description: 'Lesson ID' })
  @IsString()
  id!: string;

  @ApiProperty({ description: 'Lesson title' })
  @IsString()
  title!: string;

  @ApiProperty({ description: 'Lesson description' })
  @IsString()
  description!: string;

  @ApiProperty({ description: 'Lesson content (modules)', type: 'object', additionalProperties: true })
  @IsObject()
  content!: any;

  @ApiProperty({ description: 'Estimated completion time in minutes' })
  @IsNumber()
  estimatedMinutes!: number;

  @ApiProperty({ description: 'Difficulty level', enum: ['beginner', 'intermediate', 'advanced'] })
  @IsString()
  difficulty!: string;

  @ApiProperty({ description: 'Tags', type: [String] })
  @IsArray()
  @IsString({ each: true })
  tags!: string[];
}

export class UpdateProgressDto {
  @ApiProperty({ description: 'Progress score (0-1)', minimum: 0, maximum: 1 })
  @IsNumber()
  @Min(0)
  @Max(1)
  score!: number;

  @ApiProperty({ description: 'Time spent in minutes', minimum: 0 })
  @IsNumber()
  @Min(0)
  timeSpent!: number;

  @ApiProperty({ description: 'Completion status' })
  @IsOptional()
  completed?: boolean;

  @ApiProperty({ description: 'Additional metadata', required: false })
  @IsOptional()
  @IsObject()
  metadata?: any;
}

export class CreateAttemptDto {
  @ApiProperty({ description: 'Attempt payload with answers and interactions' })
  @IsObject()
  payload!: any;

  @ApiProperty({ description: 'Score achieved (0-1)', minimum: 0, maximum: 1 })
  @IsNumber()
  @Min(0)
  @Max(1)
  score!: number;

  @ApiProperty({ description: 'Time spent in seconds', minimum: 0 })
  @IsNumber()
  @Min(0)
  timeSpentSeconds!: number;
}

export class ProgressDto {
  @ApiProperty({ description: 'User ID' })
  @IsString()
  userId!: string;

  @ApiProperty({ description: 'Lesson ID' })
  @IsString()
  lessonId!: string;

  @ApiProperty({ description: 'Progress score (0-1)' })
  @IsNumber()
  score!: number;

  @ApiProperty({ description: 'Completion status' })
  completed!: boolean;

  @ApiProperty({ description: 'Time spent in minutes' })
  @IsNumber()
  timeSpent!: number;

  @ApiProperty({ description: 'Updated timestamp' })
  updatedAt!: Date;
}

export class AttemptDto {
  @ApiProperty({ description: 'Attempt ID' })
  @IsString()
  id!: string;

  @ApiProperty({ description: 'User ID' })
  @IsString()
  userId!: string;

  @ApiProperty({ description: 'Lesson ID' })
  @IsString()
  lessonId!: string;

  @ApiProperty({ description: 'Score achieved (0-1)' })
  @IsNumber()
  score!: number;

  @ApiProperty({ description: 'Attempt payload' })
  @IsObject()
  payload!: any;

  @ApiProperty({ description: 'Time spent in seconds' })
  @IsNumber()
  timeSpentSeconds!: number;

  @ApiProperty({ description: 'Created timestamp' })
  createdAt!: Date;
}