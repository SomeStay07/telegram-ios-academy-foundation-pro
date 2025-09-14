# Use Node.js 20 Alpine
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Install pnpm globally
RUN npm install -g pnpm@9.0.0

# Copy workspace files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY packages/ ./packages/
COPY apps/ ./apps/
COPY tools/ ./tools/
COPY content/ ./content/

# Install dependencies
RUN pnpm install --frozen-lockfile

# Build miniapp
RUN pnpm build --filter=@telegram-ios-academy/miniapp

# Set working directory to miniapp
WORKDIR /app/apps/miniapp

# Expose port
EXPOSE 5173

# Start the application
CMD ["pnpm", "start"]