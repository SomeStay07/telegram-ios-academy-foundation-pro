import { Controller, Post, Body, HttpCode, HttpStatus, UseGuards, Logger } from '@nestjs/common'
import { ThrottlerGuard, Throttle } from '@nestjs/throttler'
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger'
import { EventsService } from './events.service'
import { CreateEventDto } from './events.dto'

@ApiTags('events')
@Controller('events')
@UseGuards(ThrottlerGuard)
export class EventsController {
  private readonly logger = new Logger(EventsController.name)

  constructor(private readonly eventsService: EventsService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @Throttle({ default: { limit: 20, ttl: 60000 } }) // 20 requests per minute per IP
  @ApiOperation({ 
    summary: 'Process analytics event',
    description: 'Accepts analytics events, validates them, scrubs PII, and forwards to configured analytics provider'
  })
  @ApiBody({ type: CreateEventDto })
  @ApiResponse({ 
    status: 200, 
    description: 'Event processed successfully',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean' },
        message: { type: 'string' }
      }
    }
  })
  @ApiResponse({ 
    status: 400, 
    description: 'Invalid event data',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean' },
        error: { type: 'string' },
        reason: { type: 'string' }
      }
    }
  })
  @ApiResponse({ 
    status: 429, 
    description: 'Rate limit exceeded',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string' },
        error: { type: 'string' }
      }
    }
  })
  async createEvent(@Body() createEventDto: CreateEventDto) {
    try {
      this.logger.debug(`Processing event: ${createEventDto.event}`)
      
      const result = await this.eventsService.processEvent(createEventDto)
      
      if (result.success) {
        return {
          success: true,
          message: 'Event processed successfully'
        }
      } else {
        this.logger.warn(`Event processing failed: ${result.reason}`)
        return {
          success: false,
          error: 'Event processing failed',
          reason: result.reason
        }
      }
    } catch (error) {
      this.logger.error(`Error processing event: ${error.message}`, error.stack)
      return {
        success: false,
        error: 'Internal server error',
        reason: 'processing_error'
      }
    }
  }
}