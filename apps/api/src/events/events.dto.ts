import { IsString, IsOptional, IsObject, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class IngestEventDto {
  @IsString()
  event!: string; // обязательное поле — definite assignment

  @IsOptional()
  @IsObject()
  props?: Record<string, unknown>;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  ts?: number;
}

// Keep legacy export for backward compatibility
export class CreateEventDto extends IngestEventDto {}