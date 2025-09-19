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

  @ApiProperty({ description: 'User ID', example: 'tg_123456789' })
  userId: string;

  @ApiProperty({ description: 'Session token for API requests' })
  sessionToken: string;

  @ApiProperty({ description: 'User profile data from Telegram' })
  user: {
    id: number;
    first_name: string;
    last_name?: string;
    username?: string;
    language_code?: string;
    is_premium?: boolean;
  };

  constructor(userId?: string, sessionToken?: string, telegramUser?: any) {
    this.ok = true;
    this.userId = userId || '';
    this.sessionToken = sessionToken || '';
    this.user = telegramUser || {};
  }
}