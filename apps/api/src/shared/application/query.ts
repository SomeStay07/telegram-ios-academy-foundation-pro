export interface Query {
  readonly queryId: string;
  readonly issuedAt: Date;
}

export interface QueryHandler<T extends Query, R> {
  execute(query: T): Promise<R>;
}