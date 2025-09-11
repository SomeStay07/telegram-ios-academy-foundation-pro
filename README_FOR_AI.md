# Guidance for AI (Principal Engineer Mode)

Use this repo as the source of truth:
- Zod specs in `packages/*-spec`
- UI & ModuleRenderer in `packages/ui`
- MiniApp in `apps/miniapp`
- API in `apps/api`
- Bot in `apps/bot`
- Seeds in `content/seed`

## Tasks to perform
1) Finish MiniApp integrations (i18n RU/EN, PostHog/OTel events).
2) Implement API endpoints for lessons/courses/progress/attempts (see docs & specs).
3) Add InterviewRenderer and flows for drills/mock.
4) Harden Security per `docs/Security.md`: HMAC/TTL/nonce, Idempotency-Key, CORS/CSP, GDPR.
5) Ensure bundle ≤ 220KB (split routes, lazy heavy deps).
6) Keep GitFlow discipline and green CI.

## Acceptance
- `/api/health` returns 200
- seed lesson renders fully
- e2e + pact contracts pass
- schemathesis passes