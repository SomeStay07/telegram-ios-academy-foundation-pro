import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsNumber, IsBoolean, IsEnum, IsObject } from 'class-validator';
import { Transform } from 'class-transformer';
import { InterviewMode } from '@prisma/client';

export class UpdateInterviewProgressBodyDto {
  @ApiProperty({ description: 'Interview ID' })
  @IsString()
  interviewId!: string;

  @ApiProperty({ description: 'Interview mode', enum: InterviewMode })
  @IsEnum(InterviewMode)
  mode!: InterviewMode;

  @ApiProperty({ description: 'Last answered question index' })
  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  lastIndex!: number;

  @ApiProperty({ description: 'Number of correct answers' })
  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  correct!: number;

  @ApiProperty({ description: 'Total number of questions' })
  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  total!: number;

  @ApiProperty({ description: 'Additional metadata', required: false })
  @IsOptional()
  @IsObject()
  metadata?: any;
}

export class StartInterviewAttemptBodyDto {
  @ApiProperty({ description: 'Question ID' })
  @IsString()
  questionId!: string;

  @ApiProperty({ description: 'Interview mode', enum: InterviewMode })
  @IsEnum(InterviewMode)
  mode!: InterviewMode;
}

export class FinishInterviewAttemptBodyDto {
  @ApiProperty({ description: 'Whether answer was correct', required: false })
  @IsOptional()
  @IsBoolean()
  correct?: boolean;

  @ApiProperty({ description: 'Answer JSON data', required: false })
  @IsOptional()
  @IsObject()
  answerJson?: any;

  @ApiProperty({ description: 'Time spent in seconds' })
  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  timeSpent!: number;
}