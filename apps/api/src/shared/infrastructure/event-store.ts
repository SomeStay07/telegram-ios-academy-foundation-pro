import { DomainEvent } from '../domain/domain-event';

export interface EventStoreRecord {
  event_id: string;
  aggregate_id: string;
  aggregate_type: string;
  event_type: string;
  event_data: any;
  event_version: number;
  created_at: Date;
}

export interface EventStore {
  append(streamId: string, events: DomainEvent[], expectedVersion: number): Promise<void>;
  getEvents(streamId: string, fromVersion?: number): Promise<DomainEvent[]>;
  getAllEvents(fromPosition?: number): Promise<DomainEvent[]>;
}

export interface Snapshot {
  aggregateId: string;
  aggregateType: string;
  version: number;
  data: any;
  createdAt: Date;
}

export interface SnapshotStore {
  getSnapshot(aggregateId: string): Promise<Snapshot | null>;
  saveSnapshot(snapshot: Snapshot): Promise<void>;
}