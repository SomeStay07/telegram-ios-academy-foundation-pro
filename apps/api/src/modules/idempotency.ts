import { APP_INTERCEPTOR } from '@nestjs/core'
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common'
import Redis from 'ioredis'
import { Observable, of } from 'rxjs'

@Injectable()
export class IdempotencyInterceptor implements NestInterceptor {
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
      console.warn('⚠️ Redis error in IdempotencyInterceptor:', error.message);
    });

    this.redis.on('connect', () => {
      console.log('✅ Redis connected for IdempotencyInterceptor');
    });

    this.redis.on('ready', () => {
      console.log('✅ Redis ready for IdempotencyInterceptor');
    });

    this.redis.on('close', () => {
      console.log('ℹ️ Redis connection closed for IdempotencyInterceptor');
    });

    this.redis.on('reconnecting', () => {
      console.log('🔄 Redis reconnecting for IdempotencyInterceptor');
    });
  }

  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    const req: any = context.switchToHttp().getRequest()
    const key = req.header('Idempotency-Key')
    
    // If no idempotency key, just pass through
    if (!key) {
      return next.handle()
    }

    const cacheKey = `idem:${key}`
    try {
      const cached = await this.redis.get(cacheKey)
      if (cached) return of(JSON.parse(cached))

      const obs = next.handle()
      obs.subscribe(async (data) => {
        try {
          await this.redis.set(cacheKey, JSON.stringify(data), 'EX', 600)
        } catch (error) {
          console.warn('⚠️ Redis idempotency cache failed:', error);
        }
      })
      return obs
    } catch (error) {
      console.warn('⚠️ Redis idempotency check failed:', error);
      // Fall back to processing without idempotency if Redis fails
      return next.handle()
    }
  }
}
export const IdempotencyInterceptorProvider = [{ provide: APP_INTERCEPTOR, useClass: IdempotencyInterceptor }]