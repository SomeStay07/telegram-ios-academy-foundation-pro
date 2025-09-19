import { randomUUID } from 'crypto';
import { Command } from '../../../shared/application/command';

export class CompleteLessonCommand implements Command {
  public readonly commandId: string;
  public readonly issuedAt: Date;

  constructor(
    public readonly userId: string,
    public readonly lessonId: string,
    public readonly score: number,
    public readonly timeSpentSeconds: number,
    public readonly payload?: any,
    commandId: string = randomUUID(),
    issuedAt: Date = new Date()
  ) {
    this.commandId = commandId;
    this.issuedAt = issuedAt;
  }
}