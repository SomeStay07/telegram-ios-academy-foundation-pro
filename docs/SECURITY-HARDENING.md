# Security Hardening Guide

## Helmet Configuration

### NestJS Implementation
```typescript
// apps/api/src/main.ts
import { NestFactory } from '@nestjs/core';
import * as helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Helmet with explicit middleware
  app.use(helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'strict-dynamic'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", "data:", "https:"],
        connectSrc: ["'self'", "https://api.telegram.org", "https://us.i.posthog.com"],
        fontSrc: ["'self'"],
        objectSrc: ["'none'"],
        mediaSrc: ["'self'"],
        frameSrc: ["'none'"],
      },
    },
    crossOriginEmbedderPolicy: false, // Required for Telegram WebApp
    hsts: {
      maxAge: 31536000,
      includeSubDomains: true,
      preload: true,
    },
    noSniff: true,
    frameguard: { action: 'deny' },
    hidePoweredBy: true,
    ieNoOpen: true,
    xssFilter: true,
  }));

  await app.listen(process.env.PORT || 3000);
}
```

### Security Headers Verification
```bash
# Check all security headers
curl -I https://your-api.railway.app/api/health | grep -E "(Strict-Transport|Content-Security|X-Frame|X-Content)"

# Expected headers:
# Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
# Content-Security-Policy: default-src 'self'; script-src 'self' 'strict-dynamic'...
# X-Frame-Options: DENY
# X-Content-Type-Options: nosniff
```

## CORS Configuration

### Strict Origin Validation
```typescript
// apps/api/src/main.ts
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || [
      'https://your-app.railway.app',
      'http://localhost:5173',    // Vite dev server
      'http://localhost:6006',    // Storybook
      'https://web.telegram.org', // Telegram WebApp container
    ];

    // Allow requests with no origin (mobile apps, Postman, etc.)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.warn('CORS_BLOCKED', { origin, allowedOrigins });
      callback(new Error(`Origin ${origin} not allowed by CORS`));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: [
    'Content-Type',
    'Authorization', 
    'X-Telegram-Init-Data',
    'Idempotency-Key',
    'X-Requested-With',
  ],
  exposedHeaders: ['X-Total-Count'],
  maxAge: 86400, // 24 hours
};

app.enableCors(corsOptions);
```

### Environment Variables
```bash
# .env.production
ALLOWED_ORIGINS=https://your-app.railway.app,https://web.telegram.org

# .env.local (development)
ALLOWED_ORIGINS=http://localhost:5173,http://localhost:6006,https://web.telegram.org
```

## Database Security

### Prisma Configuration
```typescript
// apps/api/prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
  binaryTargets = ["native", "linux-musl"]
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
  // Always use SSL in production
  relationMode = "prisma"
}

// Connection pooling for Railway
// DATABASE_URL="postgresql://user:pass@host:port/db?sslmode=require&connection_limit=10&pool_timeout=20"
```

### Secure Defaults in Schema
```prisma
model User {
  id          String   @id @default(cuid())
  telegramId  String   @unique @map("telegram_id")
  firstName   String   @map("first_name")
  username    String?  @unique // Can be null, can change
  languageCode String  @default("en") @map("language_code")
  
  // Audit fields
  createdAt   DateTime @default(now()) @map("created_at")
  lastActiveAt DateTime @default(now()) @map("last_active_at")
  
  // Soft delete for GDPR
  deletedAt   DateTime? @map("deleted_at")
  
  // Relations with cascade delete
  progress    Progress[] @relation("UserProgress", onDelete: Cascade)
  attempts    Attempt[]  @relation("UserAttempts", onDelete: Cascade)

  @@map("users")
  @@index([telegramId])
  @@index([username])
}

model Progress {
  id           String   @id @default(cuid())
  userId       String   @map("user_id")
  lessonId     String   @map("lesson_id")
  score        Float    @default(0.0) @db.DoublePrecision // 0.0-1.0
  masteryLevel String   @default("beginner") @map("mastery_level") // enum via validation
  completedAt  DateTime? @map("completed_at")
  
  // Audit
  createdAt    DateTime @default(now()) @map("created_at")
  updatedAt    DateTime @updatedAt @map("updated_at")
  
  user User @relation("UserProgress", fields: [userId], references: [id])

  @@unique([userId, lessonId])
  @@map("progress")
  @@index([userId])
  @@index([lessonId])
}
```

### Connection Security
```typescript
// apps/api/src/database/prisma.service.ts
import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    super({
      log: process.env.NODE_ENV === 'development' ? ['query', 'info', 'warn'] : ['warn', 'error'],
      datasources: {
        db: {
          url: process.env.DATABASE_URL,
        },
      },
    });
  }

  async onModuleInit() {
    await this.$connect();
    
    // Verify SSL connection in production
    if (process.env.NODE_ENV === 'production') {
      const result = await this.$queryRaw`SELECT ssl_is_used()`;
      if (!result[0]?.ssl_is_used) {
        throw new Error('SSL connection required in production');
      }
    }
  }
}
```

## Redis Security

### Connection Configuration
```typescript
// apps/api/src/redis/redis.service.ts
import { Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';

@Injectable()
export class RedisService {
  private client: Redis;
  
  constructor() {
    this.client = new Redis(process.env.REDIS_URL, {
      // Security settings
      tls: process.env.NODE_ENV === 'production' ? {} : undefined,
      maxRetriesPerRequest: 3,
      retryDelayOnFailover: 100,
      enableOfflineQueue: false,
      connectTimeout: 10000,
      lazyConnect: true,
      
      // Connection pooling
      family: 4,
      keepAlive: 30000,
      
      // Error handling
      retryStrategy: (times) => Math.min(times * 50, 2000),
    });

    this.client.on('error', (err) => {
      console.error('Redis connection error:', err);
    });

    this.client.on('connect', () => {
      console.info('Redis connected successfully');
    });
  }
  
  getClient(): Redis {
    return this.client;
  }
}
```

### Railway Redis Environment
```bash
# Railway automatically provides REDIS_URL with TLS
REDIS_URL=rediss://default:password@host:port

# Local development (Docker)
REDIS_URL=redis://localhost:6379
```

## HTTPS & Transport Security

### Production Headers
```typescript
// HSTS Configuration
app.use((req, res, next) => {
  if (process.env.NODE_ENV === 'production') {
    // Force HTTPS in production
    if (req.header('x-forwarded-proto') !== 'https') {
      return res.redirect(301, `https://${req.header('host')}${req.url}`);
    }
    
    // Strict Transport Security
    res.setHeader('Strict-Transport-Security', 
      'max-age=31536000; includeSubDomains; preload');
  }
  next();
});
```

### Railway HTTPS Configuration
```toml
# apps/api/railway.toml
[build]
builder = "NIXPACKS"

[deploy]
healthcheckPath = "/api/health"
restartPolicyType = "ON_FAILURE"
restartPolicyMaxRetries = 3

# Automatic HTTPS via Railway proxy
# No additional config needed - Railway handles TLS termination
```

## Secrets Management

### Environment Variable Security
```bash
# Production secrets (Railway environment)
TELEGRAM_BOT_TOKEN=1234567890:AAHJKL...  # Bot API token
JWT_SECRET=super-secure-32-char-minimum-random-string
DATABASE_URL=postgresql://user:pass@host:5432/db?sslmode=require
REDIS_URL=rediss://user:pass@host:port
SENTRY_DSN=https://key@sentry.io/project
POSTHOG_API_KEY=phc_...

# Security headers
ALLOWED_ORIGINS=https://your-app.railway.app,https://web.telegram.org
CSP_REPORT_URI=https://your-api.railway.app/csp-report
```

### Secret Rotation Policy
```typescript
// apps/api/src/config/secrets.service.ts
@Injectable()
export class SecretsService {
  private readonly requiredSecrets = [
    'TELEGRAM_BOT_TOKEN',
    'JWT_SECRET', 
    'DATABASE_URL',
    'REDIS_URL',
  ];

  validateSecrets() {
    const missing = this.requiredSecrets.filter(key => !process.env[key]);
    if (missing.length > 0) {
      throw new Error(`Missing required secrets: ${missing.join(', ')}`);
    }

    // Validate secret formats
    if (!process.env.JWT_SECRET || process.env.JWT_SECRET.length < 32) {
      throw new Error('JWT_SECRET must be at least 32 characters');
    }

    if (!process.env.TELEGRAM_BOT_TOKEN?.match(/^\d+:[A-Za-z0-9_-]{35}$/)) {
      throw new Error('Invalid TELEGRAM_BOT_TOKEN format');
    }
  }
}
```

## Production Readiness Checklist

### Security Hardening ✅
- [ ] **Helmet middleware** configured with all security headers
- [ ] **CORS** restricted to allowed origins only
- [ ] **HTTPS enforced** with HSTS headers in production
- [ ] **Database SSL** connections required and verified
- [ ] **Redis TLS** enabled for production connections
- [ ] **Secrets validation** on startup prevents weak credentials
- [ ] **Rate limiting** implemented on all public endpoints
- [ ] **Authentication** HMAC verification working with TTL + nonce
- [ ] **Authorization** user-scoped data access enforced
- [ ] **Input validation** Zod schemas on all endpoints
- [ ] **SQL injection** prevented via Prisma parameterized queries
- [ ] **XSS prevention** no dangerouslySetInnerHTML in React components
- [ ] **Error handling** no sensitive data in error responses
- [ ] **Audit logging** security events logged to stdout/Sentry
- [ ] **Dependency scanning** no critical vulnerabilities in pnpm audit

### Infrastructure Security ✅
- [ ] **Railway 2FA** enabled on deployment account
- [ ] **Environment separation** dev/staging/prod configs
- [ ] **Secret rotation** documented process and quarterly schedule
- [ ] **Backup security** encrypted database backups
- [ ] **Network isolation** Redis not publicly accessible
- [ ] **Monitoring** security alerts configured in Sentry
- [ ] **Incident response** documented security breach procedures

### Verification Commands
```bash
# Test complete security stack
chmod +x scripts/security-check.sh && ./scripts/security-check.sh

# Manual security verification
curl -I https://your-api.railway.app/api/health
curl -X POST https://your-api.railway.app/auth/telegram -H "X-Telegram-Init-Data: invalid" -w "%{http_code}"
pnpm audit --audit-level moderate
docker run --rm -v $(pwd):/app securecodewarrior/docker-security-checker /app

# Performance under load (security stress test)
ab -n 1000 -c 10 https://your-api.railway.app/api/health
```

## References

- [OWASP Secure Headers Project](https://owasp.org/www-project-secure-headers/) - Security headers best practices
- [Railway Security](https://docs.railway.app/reference/deployment/security) - Platform security features
- [Helmet.js Documentation](https://helmetjs.github.io/) - Security middleware configuration
- [Prisma Security](https://www.prisma.io/docs/concepts/components/prisma-client/working-with-prismaclient/connection-management#connection-pool) - Database security best practices

## Acceptance Criteria

**Done = Production deployment passes all security checks:**

✅ **Headers**: `curl -I` shows all required security headers  
✅ **CORS**: Only allowed origins can make requests  
✅ **HTTPS**: All HTTP requests redirect to HTTPS  
✅ **Auth**: Invalid initData returns 401 with no sensitive data  
✅ **Rate Limit**: >10 requests/minute returns 429  
✅ **Database**: SSL connection verified in logs  
✅ **Secrets**: All required environment variables present and valid  
✅ **Audit**: `pnpm audit` shows no critical vulnerabilities  
✅ **CSP**: No console errors related to Content Security Policy  
✅ **Monitoring**: Security events appear in Sentry dashboard  