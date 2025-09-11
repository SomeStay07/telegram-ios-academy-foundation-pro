import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID, IsNumber, IsOptional, IsDateString, IsObject, Min, Max } from 'class-validator';

export class ApiResponse<T> {
  @ApiProperty({ description: 'Success status' })
  success: boolean;

  @ApiProperty({ description: 'Response data' })
  data?: T;

  @ApiProperty({ description: 'Error message', required: false })
  error?: string;

  constructor(data?: T, error?: string) {
    this.success = !error;
    this.data = data;
    this.error = error;
  }
}

export class PaginationQuery {
  @ApiProperty({ required: false, default: 1, minimum: 1 })
  @IsOptional()
  @IsNumber()
  @Min(1)
  page?: number = 1;

  @ApiProperty({ required: false, default: 20, minimum: 1, maximum: 100 })
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(100)
  limit?: number = 20;
}

export class IdParam {
  @ApiProperty({ description: 'Resource ID' })
  @IsString()
  @IsUUID()
  id!: string;
}