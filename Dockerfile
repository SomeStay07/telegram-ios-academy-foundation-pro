# Use Node.js 20 Alpine
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Disable npm and enable corepack for pnpm
RUN corepack enable
RUN corepack prepare pnpm@9.0.0 --activate

# Verify pnpm is working
RUN which pnpm
RUN pnpm --version

# Copy workspace files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml .npmrc ./
COPY packages/ ./packages/
COPY apps/ ./apps/
COPY tools/ ./tools/
COPY content/ ./content/

# Debug: show what we copied
RUN ls -la
RUN cat package.json | head -10

# Install dependencies with pnpm only
RUN echo "Installing with pnpm..." && pnpm install --frozen-lockfile

# Build miniapp
RUN echo "Building miniapp..." && pnpm build --filter=@telegram-ios-academy/miniapp

# Set working directory to miniapp
WORKDIR /app/apps/miniapp

# Expose port
EXPOSE 5173

# Start the application
CMD ["pnpm", "start"]