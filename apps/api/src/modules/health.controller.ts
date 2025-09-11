import { Controller, Get } from '@nestjs/common'
import { PrismaService } from './prisma.service'
@Controller('health')
export class HealthController{ constructor(private readonly prisma:PrismaService){}
@Get() async get(){ await this.prisma.$queryRaw`SELECT 1`; return { ok:true, time:new Date().toISOString() }}}