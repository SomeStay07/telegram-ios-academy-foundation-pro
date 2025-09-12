import { Controller, Get, Res } from '@nestjs/common'
import { ApiExcludeController } from '@nestjs/swagger'
import { Response } from 'express'
import { MetricsService } from './metrics.service'

@ApiExcludeController()
@Controller('metrics')
export class MetricsController {
  constructor(private readonly metricsService: MetricsService) {}

  @Get()
  async getMetrics(@Res() res: Response) {
    const metrics = await this.metricsService.getMetrics()
    res.set('Content-Type', 'text/plain; version=0.0.4; charset=utf-8')
    res.send(metrics)
  }
}