# Performance & Scalability (2k–5k MAU target)

## Frontend
- Bundle budget: <= 220KB critical. Code-split routes; lazy-load heavy modules.
- Cache API with TanStack Query; Stale-While-Revalidate.
- Preconnect to API; font-display: swap; image `loading=lazy`.

## Backend
- Postgres with proper indexes (lesson.id, progress(userId,lessonId), attempts(lessonId,userId,createdAt)).
- Prisma pool tuned via env (connection limit). Consider PgBouncer in session mode.
- Redis for nonce/idempotency/cache (lesson cache JSON).
- Horizontal scale: stateless Nest; store session in JWT/Redis.

## Observability Targets
- p95 API latency < 200ms (reads), < 400ms (writes).
- Error rate < 0.5%.
- Uptime 99.9%.

## Load Strategy
- Warm caches on deploy.
- Async analytics (queue) to avoid blocking.