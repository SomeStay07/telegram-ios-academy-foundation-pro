import { Controller, Post, Body, Headers, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiOperation, ApiBody } from '@nestjs/swagger';
import { EventsService } from './events.service';
import { IngestEventDto } from './events.dto';
import { CreateEventDto } from './dto/create-event.dto';
import { Logger } from '@nestjs/common';
import { toLogError, messageOf } from '../common/utils/error';

@ApiTags('events')
@Controller('events')
export class EventsController {
  private readonly logger = new Logger(EventsController.name);

  constructor(private readonly eventsService: EventsService) {}

  @Post()
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiOperation({ 
    summary: 'Ingest analytics event',
    description: 'Accepts analytics events from the miniapp and forwards them to PostHog'
  })
  @ApiBody({ type: CreateEventDto })
  @ApiResponse({ 
    status: 202, 
    description: 'Event accepted for processing',
    schema: {
      type: 'object',
      properties: {
        status: { type: 'string', example: 'ok' }
      }
    }
  })
  async ingest(
    @Body() dto: IngestEventDto,
    @Headers('x-forwarded-for') xff?: string,
  ): Promise<{ status: 'ok' }> {
    try {
      await this.eventsService.processEvent(dto);
      return { status: 'ok' };
    } catch (err: unknown) {
      const logErr = toLogError(err, { event: dto?.event });
      this.logger.error(`Failed to ingest event: ${logErr.message}`, logErr.stack, {
        ...logErr.extra,
        name: logErr.name,
      } as any);
      // Возвращаем 202/204 в зависимости от политики, или бросаем 500:
      // throw new InternalServerErrorException(messageOf(err));
      // Для очередей/неблокирующего пайплайна можно вернуть 202 Accepted:
      return { status: 'ok' };
    }
  }
}