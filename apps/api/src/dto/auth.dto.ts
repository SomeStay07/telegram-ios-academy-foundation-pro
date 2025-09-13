import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class VerifyInitDataDto {
  @ApiProperty({ 
    description: 'Telegram WebApp initialization data', 
    example: 'query_id=AAHdF6IQAAAAAN0XohDhrOrc&user=%7B%22id%22%3A279058397%2C%22first_name%22%3A%22Vladislav%22%2C%22last_name%22%3A%22Kibenko%22%2C%22username%22%3A%22vdkfrost%22%2C%22language_code%22%3A%22en%22%7D&auth_date=1662771648&hash=c501b71e775f74ce10e377dea85a7ea24ecd640b223ea86dfe453e0eaed2e2b2'
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