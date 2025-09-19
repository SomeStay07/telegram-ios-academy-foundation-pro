import { DomainEvent } from '../../../shared/domain/domain-event';

export class AssessmentStarted extends DomainEvent {
  constructor(
    aggregateId: string,
    public readonly userId: string,
    public readonly assessmentType: string,
    public readonly startedAt: Date,
    eventVersion: number
  ) {
    super(aggregateId, eventVersion);
  }

  get eventType(): string {
    return 'AssessmentStarted';
  }
}