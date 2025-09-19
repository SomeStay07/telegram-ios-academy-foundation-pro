import { randomUUID } from 'crypto';
import { Command } from '../../../shared/application/command';
import { UserProfile } from '../entities/user.entity';

export class RegisterUserCommand implements Command {
  public readonly commandId: string;
  public readonly issuedAt: Date;

  constructor(
    public readonly userId: string,
    public readonly telegramId: number,
    public readonly profile: UserProfile,
    commandId: string = randomUUID(),
    issuedAt: Date = new Date()
  ) {
    this.commandId = commandId;
    this.issuedAt = issuedAt;
  }
}