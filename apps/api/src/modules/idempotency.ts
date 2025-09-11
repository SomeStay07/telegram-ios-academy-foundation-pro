import { APP_INTERCEPTOR } from '@nestjs/core'
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common'
import Redis from 'ioredis'
import { Observable, of } from 'rxjs'

@Injectable()
export class IdempotencyInterceptor implements NestInterceptor {
  private redis: Redis | null

  constructor() {
    const redisUrl = process.env.REDIS_URL;
    if (redisUrl && (redisUrl.startsWith('redis://') || redisUrl.startsWith('rediss://'))) {
      try {
        this.redis = new Redis(redisUrl);
        this.redis.on('error', (error) => {
          console.warn('⚠️ Redis error in IdempotencyInterceptor:', error.message);
        });
        this.redis.on('connect', () => {
          console.log('✅ Redis connected for IdempotencyInterceptor');
        });
      } catch (error) {
        console.warn('⚠️ Redis connection failed for IdempotencyInterceptor:', error);
        this.redis = null;
      }
    } else {
      console.log('ℹ️ Redis not configured, idempotency disabled in IdempotencyInterceptor');
      this.redis = null;
    }
  }

  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    const req: any = context.switchToHttp().getRequest()
    const key = req.header('Idempotency-Key')
    
    // If no idempotency key or no Redis, just pass through
    if (!key || !this.redis) {
      return next.handle()
    }

    const cacheKey = `idem:${key}`
    try {
      const cached = await this.redis.get(cacheKey)
      if (cached) return of(JSON.parse(cached))

      const obs = next.handle()
      obs.subscribe(async (data) => {
        if (this.redis) {
          try {
            await this.redis.set(cacheKey, JSON.stringify(data), 'EX', 600)
          } catch (error) {
            console.warn('⚠️ Redis idempotency cache failed:', error);
          }
        }
      })
      return obs
    } catch (error) {
      console.warn('⚠️ Redis idempotency check failed:', error);
      return next.handle()
    }
  }
}
export const IdempotencyInterceptorProvider = [{ provide: APP_INTERCEPTOR, useClass: IdempotencyInterceptor }]