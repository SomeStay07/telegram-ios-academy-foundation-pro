export interface Command {
  readonly commandId: string;
  readonly issuedAt: Date;
}

export interface CommandHandler<T extends Command> {
  execute(command: T): Promise<void>;
}