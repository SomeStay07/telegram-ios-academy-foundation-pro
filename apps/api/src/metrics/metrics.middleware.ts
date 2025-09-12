import { Injectable, NestMiddleware } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'
import { MetricsService } from './metrics.service'

@Injectable()
export class MetricsMiddleware implements NestMiddleware {
  constructor(private readonly metricsService: MetricsService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const startTime = Date.now()
    const originalRoute = req.route?.path || req.path

    res.on('finish', () => {
      const duration = Date.now() - startTime
      const method = req.method
      const statusCode = res.statusCode
      const route = originalRoute

      // Record metrics
      this.metricsService.recordHttpRequest(method, route, statusCode, duration)
    })

    next()
  }
}