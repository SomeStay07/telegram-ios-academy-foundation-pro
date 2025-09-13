import { Module } from '@nestjs/common'
import { ThrottlerModule } from '@nestjs/throttler'
import { EventsController } from './events.controller'
import { EventsService } from './events.service'
import { MetricsService } from '../metrics/metrics.service'

@Module({
  imports: [
    ThrottlerModule.forRoot([{
      name: 'default',
      ttl: 60000, // 1 minute
      limit: 20, // 20 requests per minute
    }]),
  ],
  controllers: [EventsController],
  providers: [EventsService, MetricsService],
  exports: [EventsService],
})
export class EventsModule {}