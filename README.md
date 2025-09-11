# Telegram iOS Academy — Production Ready 🚀

Готовый монорепо для обучения iOS-разработке: **MiniApp (71KB)** + **API (NestJS/Prisma)** + **Bot (grammY)** + **Zod-спеки** + **i18n (RU/EN)** + **Analytics (PostHog/OTel)** + **Security** + **Railway**.

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen)]()
[![Bundle Size](https://img.shields.io/badge/bundle-71KB-success)]()
[![i18n](https://img.shields.io/badge/i18n-RU%2FEN-blue)]()

## ✨ Что готово

- ✅ **MiniApp оптимизирован**: 71KB начальная загрузка (цель ≤220KB)
- ✅ **i18n**: RU/EN с автодетектом из Telegram WebApp
- ✅ **Analytics**: PostHog события + OpenTelemetry трейсы
- ✅ **API интеграция**: Прогресс, здоровье API, автентификация
- ✅ **Code-splitting**: Ленивая загрузка тяжелых зависимостей
- ✅ **Telegram WebApp**: BackButton, MainButton, Haptics
- ✅ **Zod-спеки**: Валидация lesson/course/interview

## Quickstart
```bash
pnpm i
pnpm -w build

# API
cp apps/api/.env.example apps/api/.env
pnpm -C apps/api prisma generate
pnpm -C apps/api prisma migrate dev --name init
pnpm -C apps/api start:dev  # http://localhost:3000/api/health

# MiniApp
cp apps/miniapp/.env.example apps/miniapp/.env
pnpm -C apps/miniapp dev    # http://localhost:5173

# Bot (опционально)
cp apps/bot/.env.example apps/bot/.env
pnpm -C apps/bot start:dev
```

## Структура уроков
Hook → Objectives → Recall → Concept → WorkedExample(fading) → Quiz → Checkpoint → Summary → Spaced Review → Transfer Task.  
JSON соответствует `@telegram-ios-academy/lesson-spec`, валидируется `parseLessonStrict`.

## GitFlow
feature/* → PR в develop → release/* → main (+ back-merge). CI гоняет lint/typecheck/build/e2e/contracts.

## Railway
Есть `railway.toml` в `apps/api` и `apps/miniapp`. Nixpacks использует **pnpm**.