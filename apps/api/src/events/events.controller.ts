import { Controller, Post, Body, UseGuards, HttpCode, HttpStatus } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'
import { ThrottlerGuard, Throttle } from '@nestjs/throttler'
import { EventsService } from './events.service'
import { CreateEventDto } from './dto/create-event.dto'

@ApiTags('events')
@Controller('events')
@UseGuards(ThrottlerGuard)
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @Throttle({ default: { limit: 20, ttl: 60000 } }) // 20 requests per minute
  @ApiOperation({ 
    summary: 'Send analytics event',
    description: 'Proxy endpoint for analytics events with PII scrubbing and rate limiting'
  })
  @ApiResponse({ status: 200, description: 'Event processed successfully' })
  @ApiResponse({ status: 429, description: 'Rate limit exceeded' })
  @ApiResponse({ status: 400, description: 'Invalid event data' })
  async createEvent(@Body() createEventDto: CreateEventDto) {
    return this.eventsService.processEvent(createEventDto)
  }
}