import { Controller, Get, Res, Headers, UnauthorizedException } from '@nestjs/common'
import { ApiExcludeController } from '@nestjs/swagger'
import { Response } from 'express'
import { MetricsService } from './metrics.service'

@ApiExcludeController()
@Controller('metrics')
export class MetricsController {
  constructor(private readonly metricsService: MetricsService) {}

  @Get()
  async getMetrics(
    @Res() res: Response,
    @Headers('x-metrics-token') metricsToken?: string
  ) {
    // Check if metrics token is provided and valid
    const expectedToken = process.env.METRICS_TOKEN
    if (!metricsToken || metricsToken !== expectedToken) {
      throw new UnauthorizedException('Invalid or missing X-Metrics-Token header')
    }

    const metrics = await this.metricsService.getMetrics()
    res.set('Content-Type', 'text/plain; version=0.0.4; charset=utf-8')
    res.send(metrics)
  }
}