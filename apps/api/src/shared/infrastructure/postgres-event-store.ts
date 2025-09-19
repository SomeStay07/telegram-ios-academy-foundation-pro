import { Injectable } from '@nestjs/common';
import { EventStore, EventStoreRecord } from './event-store';
import { DomainEvent } from '../domain/domain-event';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class PostgresEventStore implements EventStore {
  constructor(private readonly prisma: PrismaService) {}

  async append(
    streamId: string,
    events: DomainEvent[],
    expectedVersion: number
  ): Promise<void> {
    if (events.length === 0) return;

    try {
      await this.prisma.$transaction(async (tx) => {
        // Check current version
        const lastEvent = await tx.eventStore.findFirst({
          where: { aggregate_id: streamId },
          orderBy: { event_version: 'desc' }
        });

        const currentVersion = lastEvent?.event_version || 0;
        
        if (currentVersion !== expectedVersion) {
          throw new Error(
            `Concurrency conflict: expected version ${expectedVersion}, ` +
            `but current version is ${currentVersion}`
          );
        }

        // Insert new events
        const eventRecords: EventStoreRecord[] = events.map((event, index) => ({
          event_id: event.eventId,
          aggregate_id: streamId,
          aggregate_type: this.extractAggregateType(streamId),
          event_type: event.eventType,
          event_data: event,
          event_version: expectedVersion + index + 1,
          created_at: event.occurredOn
        }));

        await tx.eventStore.createMany({
          data: eventRecords
        });
      });
    } catch (error) {
      console.error('Error appending events to store:', error);
      throw error;
    }
  }

  async getEvents(streamId: string, fromVersion: number = 0): Promise<DomainEvent[]> {
    try {
      const records = await this.prisma.eventStore.findMany({
        where: {
          aggregate_id: streamId,
          event_version: { gt: fromVersion }
        },
        orderBy: { event_version: 'asc' }
      });

      return records.map(record => this.deserializeEvent(record));
    } catch (error) {
      console.error('Error retrieving events from store:', error);
      throw error;
    }
  }

  async getAllEvents(fromPosition: number = 0): Promise<DomainEvent[]> {
    try {
      const records = await this.prisma.eventStore.findMany({
        where: {
          event_version: { gt: fromPosition }
        },
        orderBy: [
          { created_at: 'asc' },
          { event_version: 'asc' }
        ]
      });

      return records.map(record => this.deserializeEvent(record));
    } catch (error) {
      console.error('Error retrieving all events from store:', error);
      throw error;
    }
  }

  private extractAggregateType(streamId: string): string {
    // Extract aggregate type from stream ID convention
    // e.g., "user-123" -> "user", "learning-path-456" -> "learning-path"
    const parts = streamId.split('-');
    return parts.slice(0, -1).join('-');
  }

  private deserializeEvent(record: EventStoreRecord): DomainEvent {
    // In a real implementation, you'd have a proper event registry
    // For now, we'll return the event data as-is
    return record.event_data as DomainEvent;
  }
}