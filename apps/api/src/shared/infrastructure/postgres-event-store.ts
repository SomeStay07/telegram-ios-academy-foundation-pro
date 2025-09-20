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
        const lastEvent = await (tx as any).eventStore.findFirst({
          where: { aggregateId: streamId },
          orderBy: { eventVersion: 'desc' }
        });

        const currentVersion = lastEvent?.eventVersion || 0;
        
        if (currentVersion !== expectedVersion) {
          throw new Error(
            `Concurrency conflict: expected version ${expectedVersion}, ` +
            `but current version is ${currentVersion}`
          );
        }

        // Insert new events
        const eventRecords = events.map((event, index) => ({
          eventId: event.eventId,
          aggregateId: streamId,
          aggregateType: this.extractAggregateType(streamId),
          eventType: event.eventType,
          eventData: event,
          eventVersion: expectedVersion + index + 1,
          createdAt: event.occurredOn
        }));

        await (tx as any).eventStore.createMany({
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
      const records = await (this.prisma as any).eventStore.findMany({
        where: {
          aggregateId: streamId,
          eventVersion: { gt: fromVersion }
        },
        orderBy: { eventVersion: 'asc' }
      });

      return records.map((record: any) => this.deserializeEvent(record));
    } catch (error) {
      console.error('Error retrieving events from store:', error);
      throw error;
    }
  }

  async getAllEvents(fromPosition: number = 0): Promise<DomainEvent[]> {
    try {
      const records = await (this.prisma as any).eventStore.findMany({
        where: {
          eventVersion: { gt: fromPosition }
        },
        orderBy: [
          { createdAt: 'asc' },
          { eventVersion: 'asc' }
        ]
      });

      return records.map((record: any) => this.deserializeEvent(record));
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

  private deserializeEvent(record: any): DomainEvent {
    // In a real implementation, you'd have a proper event registry
    // For now, we'll return the event data as-is
    return record.eventData as DomainEvent;
  }
}