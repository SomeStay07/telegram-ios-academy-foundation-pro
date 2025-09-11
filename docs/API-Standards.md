# API Standards

- REST semantics; nouns; plural resources.
- Versioning via URL `/api/v1/...`.
- Consistent error shape: `{ error: {{ code, message, details? }} }`.
- Pagination: `?limit=&cursor=`.
- Idempotent writes with `Idempotency-Key`.
- OpenAPI source of truth -> packages/api-client codegen.