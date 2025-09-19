import { DomainEvent } from './domain-event';

export abstract class AggregateRoot {
  private _domainEvents: DomainEvent[] = [];
  private _version: number = 0;

  constructor(
    public readonly id: string,
    version: number = 0
  ) {
    this._version = version;
  }

  get version(): number {
    return this._version;
  }

  get domainEvents(): DomainEvent[] {
    return [...this._domainEvents];
  }

  protected addDomainEvent(event: DomainEvent): void {
    this._domainEvents.push(event);
  }

  public clearEvents(): void {
    this._domainEvents = [];
  }

  public markEventsAsCommitted(): void {
    this._version += this._domainEvents.length;
    this.clearEvents();
  }

  protected incrementVersion(): void {
    this._version++;
  }
}