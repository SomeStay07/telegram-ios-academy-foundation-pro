# Dockerfile для miniapp сервиса
FROM node:20-alpine

# Установка pnpm
RUN corepack enable
RUN corepack prepare pnpm@9.0.0 --activate

WORKDIR /app

# Копируем только необходимые файлы
COPY package.json ./
COPY server.js ./
COPY dist/ ./dist/

# Устанавливаем только production зависимости
RUN pnpm install --prod --frozen-lockfile

# Экспонируем порт
EXPOSE 5173

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:5173/health || exit 1

# Запускаем сервер
CMD ["pnpm", "start"]