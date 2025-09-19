# README для AI

## Краткий чеклист: Как проверить, что профиль подтянулся

### 1. Технические проверки
- ✅ `hasTelegram: true` в debug данных
- ✅ `hasWebApp: true` 
- ✅ `hasUser: true`
- ✅ User Agent содержит "Telegram"
- ✅ `initData` не пустой

### 2. Визуальные проверки  
- ✅ Отображается реальное имя пользователя (не "ios_developer")
- ✅ Показывается правильный @username 
- ✅ Аватар или корректные инициалы
- ✅ НЕ показывается экран "Открой через Telegram"

### 3. Способы запуска
- ✅ Через Telegram бота: t.me/ios_roadmap_academy_2024_bot → кнопка "iOS Academy"
- ✅ Через WebApp: t.me/ios_roadmap_academy_2024_bot/iosacademy
- ❌ Через браузер: должен показать экран "Открой через Telegram"

### 4. Частые проблемы
- Если `hasTelegram: false` → проблема в настройке бота или запуск не через Telegram
- Если User Agent без "Telegram" → открывается в браузере вместо WebApp
- Если моки "ios_developer" → проблема в продакшен сборке

### 5. Новая архитектура Telegram интеграции

**Основные файлы:**
- `src/lib/telegram.ts` - SDK wrapper (ensureReady, getInitData, getUserFromUnsafe)
- `src/app/providers/AuthProvider.tsx` - Auth state management  
- `src/app/providers/RequireTelegramAuth.tsx` - Auth gate
- `src/components/auth/OpenInTelegram.tsx` - Fallback UX
- `src/lib/telemetry.ts` - Event tracking

**Тесты:**
- `src/lib/__tests__/telegram.test.ts` - Unit tests для SDK

**Документация:**
- `docs/TELEGRAM-NAVIGATION.md` - Auth flow и чеклист

## API Endpoints

- `POST /auth/verifyInitData` - проверка Telegram initData
- Header: `X-Telegram-Init-Data: <raw_init_data>`
- Response: `{ success: true, user: {...}, jwt?: "..." }`

---

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