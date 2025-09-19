import { Injectable } from '@nestjs/common';
import { Query, QueryHandler } from './query';

@Injectable()
export class QueryBus {
  private handlers: Map<string, QueryHandler<any, any>> = new Map();

  public register<T extends Query, R>(
    queryType: string,
    handler: QueryHandler<T, R>
  ): void {
    this.handlers.set(queryType, handler);
  }

  public async execute<T extends Query, R>(query: T): Promise<R> {
    const queryType = query.constructor.name;
    const handler = this.handlers.get(queryType);

    if (!handler) {
      throw new Error(`No handler registered for query: ${queryType}`);
    }

    try {
      return await handler.execute(query);
    } catch (error) {
      console.error(`Error executing query ${queryType}:`, error);
      throw error;
    }
  }

  public getRegisteredHandlers(): string[] {
    return Array.from(this.handlers.keys());
  }
}