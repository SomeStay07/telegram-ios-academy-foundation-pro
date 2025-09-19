import { AggregateRoot } from './aggregate-root';

export interface Repository<T extends AggregateRoot> {
  getById(id: string): Promise<T | null>;
  save(aggregate: T): Promise<void>;
  delete(id: string): Promise<void>;
}

export interface EventSourcedRepository<T extends AggregateRoot> extends Repository<T> {
  getByIdFromEvents(id: string): Promise<T | null>;
  saveEvents(aggregate: T): Promise<void>;
}