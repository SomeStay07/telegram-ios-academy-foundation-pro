# API Dockerfile
FROM node:18-alpine

WORKDIR /app

# Install pnpm globally
RUN npm install -g pnpm

# Copy root package files for workspace setup
COPY pnpm-workspace.yaml pnpm-lock.yaml ./

# Copy API package files
COPY apps/api/package.json ./apps/api/

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy API source
COPY apps/api ./apps/api

# Set working directory to API
WORKDIR /app/apps/api

# Generate Prisma client
RUN pnpm prisma generate

# Build application
RUN pnpm build

# Expose port
EXPOSE 3000

# Start command
CMD ["pnpm", "start"]