import { randomUUID } from 'crypto';
import { Command } from '../../../shared/application/command';

export class UpdateProgressCommand implements Command {
  public readonly commandId: string;
  public readonly issuedAt: Date;

  constructor(
    public readonly userId: string,
    public readonly lessonId: string,
    public readonly score: number,
    public readonly timeSpent: number,
    commandId: string = randomUUID(),
    issuedAt: Date = new Date()
  ) {
    this.commandId = commandId;
    this.issuedAt = issuedAt;
  }
}