import { randomUUID } from 'crypto';
import { Command } from '../../../shared/application/command';

export class RecordActivityCommand implements Command {
  public readonly commandId: string;
  public readonly issuedAt: Date;

  constructor(
    public readonly userId: string,
    public readonly activityType: string,
    commandId: string = randomUUID(),
    issuedAt: Date = new Date()
  ) {
    this.commandId = commandId;
    this.issuedAt = issuedAt;
  }
}