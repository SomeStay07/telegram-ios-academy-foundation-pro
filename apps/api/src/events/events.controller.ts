import { Controller, Post, Body, Headers, HttpCode, HttpStatus } from '@nestjs/common';
import { EventsService } from './events.service';
import { IngestEventDto } from './events.dto';
import { Logger } from '@nestjs/common';
import { toLogError, messageOf } from '../common/utils/error';

@Controller('events')
export class EventsController {
  private readonly logger = new Logger(EventsController.name);

  constructor(private readonly eventsService: EventsService) {}

  @Post()
  @HttpCode(HttpStatus.ACCEPTED)
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