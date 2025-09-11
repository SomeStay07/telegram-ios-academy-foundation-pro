import { APP_INTERCEPTOR } from '@nestjs/core'
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common'
import { Observable } from 'rxjs'

@Injectable()
export class IdempotencyInterceptor implements NestInterceptor {
  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    // Idempotency disabled - just pass through
    return next.handle()
  }
}
export const IdempotencyInterceptorProvider = [{ provide: APP_INTERCEPTOR, useClass: IdempotencyInterceptor }]