import { randomUUID } from 'crypto';
import { Query } from '../../../shared/application/query';

export class GetLessonProgressQuery implements Query {
  public readonly queryId: string;
  public readonly issuedAt: Date;

  constructor(
    public readonly userId: string,
    public readonly lessonId: string,
    queryId: string = randomUUID(),
    issuedAt: Date = new Date()
  ) {
    this.queryId = queryId;
    this.issuedAt = issuedAt;
  }
}