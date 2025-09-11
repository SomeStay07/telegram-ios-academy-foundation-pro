import { APP_INTERCEPTOR } from '@nestjs/core'
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common'
import Redis from 'ioredis'
import { Observable, of } from 'rxjs'

@Injectable()
export class IdempotencyInterceptor implements NestInterceptor {
  private redis: Redis
  
  constructor() {
    const redisUrl = process.env.REDIS_URL;
    if (!redisUrl || redisUrl === '' || (!redisUrl.startsWith('redis://') && !redisUrl.startsWith('rediss://'))) {
      console.error('REDIS_URL configuration error in IdempotencyInterceptor:', redisUrl);
      throw new Error("REDIS_URL required and must be a valid Redis URL");
    }
    this.redis = new Redis(redisUrl);
  }
  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    const req: any = context.switchToHttp().getRequest()
    const key = req.header('Idempotency-Key')
    if (!key) return next.handle()
    const cacheKey = `idem:${key}`
    const cached = await this.redis.get(cacheKey)
    if (cached) return of(JSON.parse(cached))
    const obs = next.handle()
    obs.subscribe(async (data) => { await this.redis.set(cacheKey, JSON.stringify(data), 'EX', 600) })
    return obs
  }
}
export const IdempotencyInterceptorProvider = [{ provide: APP_INTERCEPTOR, useClass: IdempotencyInterceptor }]