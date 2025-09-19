import { DomainEvent } from '../../../shared/domain/domain-event';

export class AssessmentCompleted extends DomainEvent {
  constructor(
    aggregateId: string,
    public readonly userId: string,
    public readonly totalScore: number,
    public readonly percentage: number,
    public readonly passed: boolean,
    public readonly completedAt: Date,
    eventVersion: number
  ) {
    super(aggregateId, eventVersion);
  }

  get eventType(): string {
    return 'AssessmentCompleted';
  }
}