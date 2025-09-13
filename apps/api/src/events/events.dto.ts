import { IsString, IsOptional, IsNumber, IsObject, ValidateNested } from 'class-validator'
import { Type } from 'class-transformer'
import { ApiProperty } from '@nestjs/swagger'

export class CreateEventDto {
  @ApiProperty({ description: 'Event name', example: 'interview_started' })
  @IsString()
  event: string

  @ApiProperty({ 
    description: 'Event properties', 
    example: { interview_id: 'ios-basics', mode: 'drill' },
    required: false 
  })
  @IsOptional()
  @IsObject()
  props?: Record<string, unknown>

  @ApiProperty({ 
    description: 'Event timestamp (Unix timestamp in milliseconds)', 
    example: 1704067200000,
    required: false 
  })
  @IsOptional()
  @IsNumber()
  ts?: number
}