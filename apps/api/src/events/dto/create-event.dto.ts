import { IsString, IsObject, IsOptional, IsNumber, IsNotEmpty } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { Transform } from 'class-transformer'

export class CreateEventDto {
  @ApiProperty({ 
    description: 'Event name',
    example: 'lesson_started'
  })
  @IsString()
  @IsNotEmpty()
  event!: string

  @ApiProperty({ 
    description: 'Event properties (arbitrary key-value pairs)',
    example: { lessonId: 'swift-basics', userId: '12345' }
  })
  @IsObject()
  props!: Record<string, unknown>

  @ApiProperty({ 
    description: 'Timestamp (unix ms)',
    example: 1703875200000,
    required: false
  })
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => value || Date.now())
  ts?: number
}