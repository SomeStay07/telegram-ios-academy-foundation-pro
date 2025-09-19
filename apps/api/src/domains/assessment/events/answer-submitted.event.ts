import { DomainEvent } from '../../../shared/domain/domain-event';

export class AnswerSubmitted extends DomainEvent {
  constructor(
    aggregateId: string,
    public readonly userId: string,
    public readonly questionId: string,
    public readonly userAnswer: any,
    public readonly score: number,
    public readonly isCorrect: boolean,
    eventVersion: number
  ) {
    super(aggregateId, eventVersion);
  }

  get eventType(): string {
    return 'AnswerSubmitted';
  }
}