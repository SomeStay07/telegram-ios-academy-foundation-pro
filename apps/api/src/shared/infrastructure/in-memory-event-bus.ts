import { Injectable } from '@nestjs/common';
import { EventBus, EventHandler } from '../application/event-bus';
import { DomainEvent } from '../domain/domain-event';

@Injectable()
export class InMemoryEventBus implements EventBus {
  private handlers: Map<string, EventHandler<any>[]> = new Map();

  async publish(events: DomainEvent[]): Promise<void> {
    for (const event of events) {
      const eventHandlers = this.handlers.get(event.eventType) || [];
      
      // Execute all handlers for this event type
      await Promise.all(
        eventHandlers.map(handler => 
          this.executeHandler(handler, event)
        )
      );
    }
  }

  subscribe<T extends DomainEvent>(
    eventType: string,
    handler: EventHandler<T>
  ): void {
    const existingHandlers = this.handlers.get(eventType) || [];
    this.handlers.set(eventType, [...existingHandlers, handler]);
  }

  private async executeHandler(
    handler: EventHandler<any>,
    event: DomainEvent
  ): Promise<void> {
    try {
      await handler.handle(event);
    } catch (error) {
      console.error(`Error handling event ${event.eventType}:`, error);
      // In production, you might want to implement retry logic or dead letter queues
    }
  }
}