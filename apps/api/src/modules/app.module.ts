import { Module } from '@nestjs/common'
import { HealthController } from './health.controller'
import { PrismaService } from './prisma.service'
import { AuthController } from './auth.controller'
import { IdempotencyInterceptorProvider } from './idempotency'

@Module({ controllers:[HealthController, AuthController], providers:[PrismaService, ...IdempotencyInterceptorProvider] })
export class AppModule {}