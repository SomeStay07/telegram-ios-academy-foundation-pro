import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class VerifyInitDataDto {
  @ApiProperty({ 
    description: 'Telegram WebApp initialization data', 
    example: 'query_id=EXAMPLE&user=%7B%22id%22%3A123456%2C%22first_name%22%3A%22John%22%2C%22last_name%22%3A%22Doe%22%7D&auth_date=1700000000&hash=abc123'
  })
  @IsString()
  @IsNotEmpty()
  initData!: string;
}

export class AuthSuccessResponseDto {
  @ApiProperty({ description: 'Authentication success status', example: true })
  ok: boolean;

  constructor() {
    this.ok = true;
  }
}