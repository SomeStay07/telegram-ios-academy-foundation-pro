import { randomUUID } from 'crypto';

export abstract class DomainEvent {
  public readonly eventId: string;
  public readonly occurredOn: Date;
  public readonly eventVersion: number;

  constructor(
    public readonly aggregateId: string,
    eventVersion: number,
    eventId: string = randomUUID(),
    occurredOn: Date = new Date()
  ) {
    this.eventId = eventId;
    this.occurredOn = occurredOn;
    this.eventVersion = eventVersion;
  }

  abstract get eventType(): string;
}