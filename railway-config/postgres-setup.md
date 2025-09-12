# PostgreSQL Setup on Railway

## 1. Создание PostgreSQL сервиса

1. В Railway Dashboard, нажмите **"New"** → **"Database"** → **"PostgreSQL"**
2. Назовите сервис: `postgres-database`
3. Railway автоматически создаст базу данных и сгенерирует `DATABASE_URL`

## 2. Получение DATABASE_URL

После создания PostgreSQL сервиса:
1. Откройте сервис postgres-database
2. Перейдите на вкладку **"Variables"** 
3. Скопируйте значение `DATABASE_URL`
4. Формат: `postgresql://postgres:PASSWORD@HOST:PORT/railway`

## 3. Создание Database Migration сервиса

1. Нажмите **"New"** → **"GitHub Repo"** → выберите ваш репозиторий
2. Назовите сервис: `database-migrations`
3. Установите **Root Directory**: `apps/database`
4. В переменных окружения добавьте:
   ```
   DATABASE_URL=postgresql://postgres:PASSWORD@HOST:PORT/railway
   ```
   (используйте URL из предыдущего шага)

## 4. Обновление других сервисов

Добавьте `DATABASE_URL` в переменные окружения для:

### API Service:
```
DATABASE_URL=postgresql://postgres:PASSWORD@HOST:PORT/railway
```

### Bot Service (если используется):
```
DATABASE_URL=postgresql://postgres:PASSWORD@HOST:PORT/railway
```

## 5. Порядок деплоя

1. **Сначала** задеплойте `postgres-database` (автоматически)
2. **Затем** задеплойте `database-migrations` (создаст таблицы и заполнит данными)
3. **В конце** задеплойте `api` и `bot` сервисы

## 6. Проверка

После успешного деплоя database-migrations:
- Таблицы будут созданы согласно Prisma схеме
- Seed данные будут загружены
- API сможет подключиться к базе данных

## 7. Управление схемой

Для обновления схемы базы данных:
1. Измените `apps/database/schema.prisma`
2. Закоммитьте изменения
3. Перезапустите `database-migrations` сервис
4. Перезапустите `api` сервис