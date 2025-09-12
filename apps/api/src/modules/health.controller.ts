import { Controller, Get } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { makeRedis } from '../redis/redis.client'

@Controller('health')
export class HealthController {
  private redis = makeRedis()
  
  constructor(private readonly prisma: PrismaService) {}
  
  @Get()
  async health() {
    const [redis, db] = await Promise.all([
      this.redis.ping().catch(() => 'ERROR'),
      this.prisma.$queryRaw`SELECT 1`.then(() => 'OK').catch(() => 'ERROR'),
    ])
    return { 
      status: (redis === 'PONG' && db === 'OK') ? 'ok' : 'degraded', 
      redis, 
      db 
    }
  }
}