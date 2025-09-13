import { Controller, Post, Body, BadRequestException, UnauthorizedException, HttpCode, HttpStatus } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger'
import { VerifyInitDataDto, AuthSuccessResponseDto } from '../dto/auth.dto'
import crypto from 'node:crypto'
import Redis from 'ioredis'

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  private redis: Redis

  constructor() {
    const redisUrl = process.env.REDIS_URL!;
    
    this.redis = new Redis(redisUrl, {
      maxRetriesPerRequest: 3,
      lazyConnect: true,
      connectTimeout: 10000,
      commandTimeout: 5000,
      enableReadyCheck: false,
    });

    this.redis.on('error', (error) => {
      console.warn('⚠️ Redis error in AuthController:', error.message);
    });

    this.redis.on('connect', () => {
      console.log('✅ Redis connected for AuthController');
    });

    this.redis.on('ready', () => {
      console.log('✅ Redis ready for AuthController');
    });

    this.redis.on('close', () => {
      console.log('ℹ️ Redis connection closed for AuthController');
    });

    this.redis.on('reconnecting', () => {
      console.log('🔄 Redis reconnecting for AuthController');
    });
  }
  @Post('verifyInitData')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ 
    summary: 'Verify Telegram WebApp initialization data',
    description: 'Validates Telegram WebApp init data using HMAC-SHA256 signature verification and prevents replay attacks using Redis'
  })
  @ApiBody({ type: VerifyInitDataDto })
  @ApiResponse({ 
    status: 201, 
    description: 'Authentication successful',
    type: AuthSuccessResponseDto
  })
  @ApiResponse({ 
    status: 400, 
    description: 'Bad request - invalid or missing initData, expired data, or replay detected',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: false },
        data: { type: 'null' },
        error: { type: 'string', example: 'initData required' },
        statusCode: { type: 'number', example: 400 },
        timestamp: { type: 'string', example: '2023-01-01T00:00:00.000Z' }
      }
    }
  })
  @ApiResponse({ 
    status: 401, 
    description: 'Unauthorized - HMAC signature verification failed',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: false },
        data: { type: 'null' },
        error: { type: 'string', example: 'HMAC invalid' },
        statusCode: { type: 'number', example: 401 },
        timestamp: { type: 'string', example: '2023-01-01T00:00:00.000Z' }
      }
    }
  })
  async verify(@Body() body: VerifyInitDataDto): Promise<AuthSuccessResponseDto> {
    const initData = body?.initData
    if (!initData) throw new BadRequestException('initData required')

    const urlSearch = new URLSearchParams(initData)
    const authDate = Number(urlSearch.get('auth_date') || '0')
    const now = Math.floor(Date.now()/1000)
    if (Math.abs(now - authDate) > 330) throw new BadRequestException('initData expired')

    const hash = urlSearch.get('hash') || ''
    urlSearch.delete('hash')
    const dataCheckString = [...urlSearch.entries()].sort(([a],[b]) => a.localeCompare(b)).map(([k,v]) => `${k}=${v}`).join('\n')

    const secretKey = crypto.createHmac('sha256', 'WebAppData').update(process.env.TELEGRAM_BOT_TOKEN || '').digest()
    const hmac = crypto.createHmac('sha256', secretKey).update(dataCheckString).digest('hex')
    if (hmac !== hash) throw new UnauthorizedException('HMAC invalid')

    // Replay protection with Redis
    const nonceKey = `nonce:${hash}`
    try {
      const nx = await this.redis.set(nonceKey, '1', 'EX', 300, 'NX')
      if (nx !== 'OK') throw new BadRequestException('replay detected')
    } catch (error) {
      console.warn('⚠️ Redis replay protection failed:', error);
      throw new BadRequestException('authentication service temporarily unavailable')
    }

    return new AuthSuccessResponseDto()
  }
}