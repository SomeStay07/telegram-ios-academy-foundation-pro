import { Injectable } from '@nestjs/common';
import { Command, CommandHandler } from './command';

@Injectable()
export class CommandBus {
  private handlers: Map<string, CommandHandler<any>> = new Map();

  public register<T extends Command>(
    commandType: string,
    handler: CommandHandler<T>
  ): void {
    this.handlers.set(commandType, handler);
  }

  public async execute<T extends Command>(command: T): Promise<void> {
    const commandType = command.constructor.name;
    const handler = this.handlers.get(commandType);

    if (!handler) {
      throw new Error(`No handler registered for command: ${commandType}`);
    }

    try {
      await handler.execute(command);
    } catch (error) {
      console.error(`Error executing command ${commandType}:`, error);
      throw error;
    }
  }

  public getRegisteredHandlers(): string[] {
    return Array.from(this.handlers.keys());
  }
}