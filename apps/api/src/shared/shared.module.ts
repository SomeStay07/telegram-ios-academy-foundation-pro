import { Module, Global } from '@nestjs/common';
import { InMemoryEventBus } from './infrastructure/in-memory-event-bus';
import { PostgresEventStore } from './infrastructure/postgres-event-store';
import type { EventBus } from './application/event-bus';
import type { EventStore } from './infrastructure/event-store';
import { CommandBus } from './application/command-bus';
import { QueryBus } from './application/query-bus';
import { TelegramService } from './infrastructure/telegram/telegram.service';
import { PrismaService } from '../prisma/prisma.service';

@Global()
@Module({
  providers: [
    PrismaService,
    {
      provide: 'EventBus',
      useClass: InMemoryEventBus,
    },
    {
      provide: 'EventStore',
      useClass: PostgresEventStore,
    },
    CommandBus,
    QueryBus,
    TelegramService,
  ],
  exports: [
    'EventBus',
    'EventStore',
    CommandBus,
    QueryBus,
    TelegramService,
    PrismaService,
  ],
})
export class SharedModule {}