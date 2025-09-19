import { Controller, Post, Body, BadRequestException, UnauthorizedException, HttpCode, HttpStatus } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger'
import { VerifyInitDataDto, AuthSuccessResponseDto } from '../../../dto/auth.dto'
import { TelegramService } from '../../../shared/infrastructure/telegram/telegram.service'
import { CommandBus } from '../../../shared/application/command-bus'
import { RegisterUserCommand } from '../commands/register-user.command'
import { UserRepository } from '../repositories/user.repository'
import crypto from 'node:crypto'
import Redis from 'ioredis'

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  private redis: Redis

  constructor(
    private readonly telegramService: TelegramService,
    private readonly commandBus: CommandBus,
    private readonly userRepository: UserRepository
  ) {
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

    try {
      // Validate and parse Telegram data
      const telegramData = this.telegramService.validateAndParseInitData(initData);
      
      // Replay protection with Redis
      const nonceKey = `nonce:${telegramData.hash}`
      const nx = await this.redis.set(nonceKey, '1', 'EX', 300, 'NX')
      if (nx !== 'OK') throw new BadRequestException('replay detected')

      // Get or create user
      const userId = `tg_${telegramData.user.id}`;
      let user = await this.userRepository.getById(userId);

      if (!user) {
        // Auto-register new user
        const profile = this.telegramService.telegramUserToProfile(telegramData.user);
        const registerCommand = new RegisterUserCommand(userId, telegramData.user.id, profile);
        
        await this.commandBus.execute(registerCommand);
        console.log(`✅ Auto-registered new user: ${userId} (${telegramData.user.first_name})`);
      }

      // Generate session token
      const sessionToken = this.telegramService.generateSessionToken(telegramData.user);

      return new AuthSuccessResponseDto(userId, sessionToken, telegramData.user);

    } catch (error) {
      if (error instanceof UnauthorizedException || error instanceof BadRequestException) {
        throw error;
      }
      
      console.error('⚠️ Authentication error:', error);
      throw new BadRequestException('authentication service temporarily unavailable')
    }
  }
}