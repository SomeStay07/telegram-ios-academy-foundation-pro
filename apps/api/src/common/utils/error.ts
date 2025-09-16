// apps/api/src/common/utils/error.ts
export type LogError = {
  name?: string;
  message: string;
  stack?: string;
  cause?: unknown;
  extra?: Record<string, unknown>;
};

export function toLogError(err: unknown, extra?: Record<string, unknown>): LogError {
  if (err instanceof Error) {
    return {
      name: err.name,
      message: err.message,
      stack: err.stack,
      cause: (err as any).cause,
      extra,
    };
  }
  return {
    message: typeof err === 'string' ? err : JSON.stringify(err),
    extra,
  };
}

export function messageOf(err: unknown): string {
  return err instanceof Error ? err.message : (typeof err === 'string' ? err : 'Unknown error');
}