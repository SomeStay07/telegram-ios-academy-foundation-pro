import { DomainEvent } from '../../../shared/domain/domain-event';

export class StreakMaintained extends DomainEvent {
  constructor(
    aggregateId: string,
    public readonly userId: string,
    public readonly newStreakCount: number,
    public readonly maintainedAt: Date,
    eventVersion: number
  ) {
    super(aggregateId, eventVersion);
  }

  get eventType(): string {
    return 'StreakMaintained';
  }
}