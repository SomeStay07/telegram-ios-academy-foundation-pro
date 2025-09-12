import { Module, Global } from '@nestjs/common'
import { MetricsService } from './metrics.service'
import { MetricsController } from './metrics.controller'
import { MetricsMiddleware } from './metrics.middleware'

@Global()
@Module({
  providers: [MetricsService, MetricsMiddleware],
  controllers: [MetricsController],
  exports: [MetricsService, MetricsMiddleware]
})
export class MetricsModule {}