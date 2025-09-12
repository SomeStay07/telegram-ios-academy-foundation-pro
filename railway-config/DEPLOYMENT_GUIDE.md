# Railway Deployment Guide

## 🚂 Пошаговый деплой в Railway

### 1. Подготовка

1. Зарегистрируйтесь на [railway.app](https://railway.app)
2. Создайте новый проект: "New Project" → "Deploy from GitHub repo"
3. Выберите репозиторий `SomeStay07/telegram-ios-academy-foundation-pro`

### 2. Последовательность деплоя

⚠️ **ВАЖНО**: Деплой строго в указанном порядке!

```
API → MiniApp → Bot
```

### 3. API Service (apps/api)

1. **Создание сервиса:**
   - Railway Dashboard → New Service
   - Root Directory: `apps/api`
   - Start Command: `pnpm start`

2. **Environment Variables** (скопируйте из `api.env`):
   ```bash
   NODE_ENV=production
   DATABASE_URL=postgresql://username:password@host:port/database
   REDIS_URL=redis://username:password@host:port
   TELEGRAM_BOT_TOKEN=1234567890:AAxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   ALLOWED_ORIGINS=https://web-production-xxxx.up.railway.app,http://localhost:5173
   CSP_REPORT_ONLY=0
   API_PUBLIC_ORIGIN=https://api-production-xxxx.up.railway.app
   ```

3. **Получите URL API сервиса** после успешного деплоя

### 4. MiniApp Service (apps/miniapp)

1. **Создание сервиса:**
   - Railway Dashboard → New Service  
   - Root Directory: `apps/miniapp`
   - Start Command: `pnpm start`

2. **Environment Variables** (замените URL на реальный из API):
   ```bash
   NODE_ENV=production
   VITE_API_BASE_URL=https://api-production-xxxx.up.railway.app
   ```

3. **Получите URL MiniApp сервиса** после успешного деплоя

### 5. Bot Service (apps/bot)

1. **Создание сервиса:**
   - Railway Dashboard → New Service
   - Root Directory: `apps/bot`  
   - Start Command: `pnpm start`

2. **Environment Variables** (замените URLs на реальные):
   ```bash
   NODE_ENV=production
   TELEGRAM_BOT_TOKEN=1234567890:AAxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   WEBAPP_URL=https://web-production-xxxx.up.railway.app
   BOT_PUBLIC_URL=https://bot-production-xxxx.up.railway.app
   BOT_WEBHOOK_SECRET_PATH=/bot/webhook-secret-random-path
   ```

### 6. Database Setup

1. **PostgreSQL**:
   - Railway Dashboard → Add Database → PostgreSQL
   - Скопируйте `DATABASE_URL` в API service environment

2. **Redis**:
   - Railway Dashboard → Add Database → Redis
   - Скопируйте `REDIS_URL` в API service environment

### 7. Настройка Telegram Bot

После деплоя всех сервисов:

```bash
# Установка webhook (замените на реальные URLs)
curl -X POST "https://api.telegram.org/bot<YOUR_BOT_TOKEN>/setWebhook" \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://bot-production-xxxx.up.railway.app/bot/webhook-secret-random-path",
    "allowed_updates": ["message", "callback_query"]
  }'
```

### 8. Smoke Tests

```bash
# API Health Check
curl https://api-production-xxxx.up.railway.app/api/health

# MiniApp Check  
curl https://web-production-xxxx.up.railway.app

# Bot Webhook Info
curl "https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getWebhookInfo"
```

### 9. CORS Configuration

После получения всех URLs, обновите `ALLOWED_ORIGINS` в API service:

```bash
ALLOWED_ORIGINS=https://web-production-xxxx.up.railway.app
```

### 🔒 Security Checklist

- [ ] Все секреты в environment variables
- [ ] `NODE_ENV=production` во всех сервисах
- [ ] CORS правильно настроен
- [ ] Database и Redis не публично доступны
- [ ] Telegram webhook использует HTTPS
- [ ] Bot token не в логах

### 🚨 Troubleshooting

**Проблема**: API не стартует
**Решение**: Проверьте DATABASE_URL и REDIS_URL

**Проблема**: MiniApp не может подключиться к API  
**Решение**: Проверьте CORS в `ALLOWED_ORIGINS`

**Проблема**: Bot не получает сообщения
**Решение**: Проверьте webhook URL через `/getWebhookInfo`