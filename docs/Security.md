# Security Model & Threat Analysis

## Data Model & Attack Surface

### Core Data Entities
```typescript
// User data (PII + learning state)
interface User {
  telegramId: string;         // Primary identifier
  username?: string;          // Optional, can change
  firstName: string;          // Required from Telegram
  languageCode: string;       // Auto-detected, stored for i18n
  createdAt: Date;
  lastActiveAt: Date;
}

// Learning progress (behavioral data)
interface Progress {
  userId: string;
  lessonId: string;
  completedAt?: Date;
  score: number;              // 0-1, derived from attempts
  masteryLevel: 'beginner' | 'proficient' | 'mastery';
}

// Assessment attempts (detailed performance)
interface Attempt {
  id: string;
  userId: string;
  lessonId: string;
  answers: QuizAnswer[];      // User responses
  score: number;
  completedAt: Date;
}
```

### Attack Surfaces

1. **MiniApp (Frontend)**
   - XSS via user content injection
   - CSRF through state manipulation
   - Client-side data tampering
   - Telegram WebApp container escape

2. **API (Backend)**
   - Authentication bypass (initData forgery)
   - Authorization escalation
   - SQL injection via Prisma queries
   - Rate limit bypass
   - Data leakage through API responses

3. **Bot (grammY)**
   - Command injection
   - Deep link manipulation
   - Webhook replay attacks

## Security Policies

### Secrets Management
```bash
# Environment variable structure
TELEGRAM_BOT_TOKEN=1234567890:AAFake...        # Bot API token
DATABASE_URL=postgresql://...                   # Prisma connection
REDIS_URL=redis://...                          # Session store
JWT_SECRET=minimum-32-chars-random             # JWT signing
ALLOWED_ORIGINS=https://your-app.railway.app   # CORS whitelist
POSTHOG_API_KEY=phc_...                        # Analytics
SENTRY_DSN=https://...                         # Error tracking
```

**Storage Rules:**
- Production secrets → Railway environment variables
- Development → `.env.local` (gitignored)
- Never commit secrets to git
- Rotate secrets quarterly minimum
- Use prefixed naming: `TG_`, `DB_`, `REDIS_`

### CI/CD Security
```yaml
# .github/workflows/security.yml
- name: Secret scanning
  uses: trufflesecurity/trufflehog@main
  
- name: SAST analysis
  uses: github/codeql-action/analyze@v2
  
- name: Dependency audit
  run: pnpm audit --audit-level moderate
```

### Railway Access Control
- Production deployment: restricted to maintainers only
- Environment variables: separate per environment
- Database access: connection pooling + SSL required
- Logs retention: 7 days maximum

## Secrets & ENV (no-secrets-in-git)

### Environment File Protection
All sensitive environment files are protected by `.gitignore` patterns:
- `.env` - Root environment files
- `.env.*` - All environment file variants
- `apps/*/.env*` - All app-specific environment files
- `*.pem`, `*.p8`, `*.key` - Security certificates and keys

### Environment Validation Implementation

**API Service** (`apps/api/src/config/env.ts`):
```typescript
import { z } from 'zod';

export const EnvSchema = z.object({
  NODE_ENV: z.enum(['development','test','production']).default('production'),
  DATABASE_URL: z.string().url(),
  REDIS_URL: z.string().url(),
  TELEGRAM_BOT_TOKEN: z.string().min(10),
  ALLOWED_ORIGINS: z.string().min(1),
  CSP_REPORT_ONLY: z.string().default('1'),
  API_PUBLIC_ORIGIN: z.string().url().optional(),
});

export function parseEnv(raw: NodeJS.ProcessEnv): Env {
  const res = EnvSchema.safeParse(raw);
  if (!res.success) { 
    console.error('❌ Invalid ENV:', res.error.flatten().fieldErrors); 
    process.exit(1); 
  }
  return res.data;
}
```

**MiniApp** (`apps/miniapp/src/env.ts`):
```typescript
export const VITE = (() => {
  const api = import.meta.env.VITE_API_BASE_URL;
  if (!api) throw new Error('Missing VITE_API_BASE_URL');
  return { API_BASE_URL: api };
})();
```

### Required Railway Variables

**API Service Variables:**
```
NODE_ENV=production
DATABASE_URL=postgres://<user>:<pass>@<host>:<port>/<db>
REDIS_URL=redis://<user>:<pass>@<host>:<port>
TELEGRAM_BOT_TOKEN=<bot_token>
ALLOWED_ORIGINS=https://web-production-1e872.up.railway.app,http://localhost:5173
CSP_REPORT_ONLY=0
API_PUBLIC_ORIGIN=https://<api>.up.railway.app
```

**MiniApp Variables:**
```
NODE_ENV=production
VITE_API_BASE_URL=https://<api>.up.railway.app
```

**Bot Variables:**
```
NODE_ENV=production
TELEGRAM_BOT_TOKEN=<bot_token>
WEBAPP_URL=https://web-production-1e872.up.railway.app
BOT_PUBLIC_URL=https://<bot>.up.railway.app
BOT_WEBHOOK_SECRET_PATH=/bot/<random>
```

### Gitleaks CI Integration
Automated secrets scanning via GitHub Actions prevents accidental commits:
```yaml
# .github/workflows/gitleaks.yml
name: gitleaks
on: [push, pull_request]
jobs:
  scan:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: gitleaks/gitleaks-action@v2
        with:
          args: detect --source=. --redact
```

## Telegram WebApp Authentication

### initData Verification Implementation

```typescript
// apps/api/src/modules/auth/auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { createHmac } from 'crypto';
import { Redis } from 'ioredis';

@Injectable()
export class TelegramAuthService {
  constructor(private redis: Redis) {}

  async verifyInitData(initData: string): Promise<TelegramUser> {
    // 1. Parse initData string
    const params = new URLSearchParams(initData);
    const hash = params.get('hash');
    const authDate = params.get('auth_date');
    
    if (!hash || !authDate) {
      throw new UnauthorizedException('Missing hash or auth_date');
    }

    // 2. TTL check (5 minutes + 30s skew)
    const authTimestamp = parseInt(authDate);
    const now = Math.floor(Date.now() / 1000);
    if (now - authTimestamp > 330) { // 5:30 minutes
      throw new UnauthorizedException('initData expired');
    }

    // 3. Build data string (alphabetical order, exclude hash)
    params.delete('hash');
    const sortedParams = Array.from(params.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([key, value]) => `${key}=${value}`)
      .join('\n');

    // 4. HMAC-SHA256 verification
    const secretKey = createHmac('sha256', 'WebAppData')
      .update(process.env.TELEGRAM_BOT_TOKEN)
      .digest();
    
    const expectedHash = createHmac('sha256', secretKey)
      .update(sortedParams)
      .digest('hex');

    if (hash !== expectedHash) {
      throw new UnauthorizedException('Invalid initData signature');
    }

    // 5. Replay protection via nonce
    const user = JSON.parse(params.get('user'));
    const nonce = `auth:${user.id}:${authDate}`;
    
    const exists = await this.redis.get(nonce);
    if (exists) {
      throw new UnauthorizedException('Replay attack detected');
    }
    
    // Store nonce for TTL period
    await this.redis.setex(nonce, 330, '1');

    return user;
  }
}
```

### Authentication Controller

```typescript
// apps/api/src/modules/auth/auth.controller.ts
import { Controller, Post, Headers, UnauthorizedException } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private authService: TelegramAuthService) {}

  @Post('telegram')
  async authenticateTelegram(
    @Headers('x-telegram-init-data') initData: string,
    @Headers('idempotency-key') idempotencyKey?: string,
  ) {
    if (!initData) {
      throw new UnauthorizedException('Missing X-Telegram-Init-Data header');
    }

    const user = await this.authService.verifyInitData(initData);
    
    // Generate JWT for subsequent requests
    const jwt = await this.authService.generateJWT(user);
    
    return { 
      user, 
      token: jwt,
      expiresIn: 3600 // 1 hour
    };
  }
}
```

## Idempotency Protection

### Implementation Pattern

```typescript
// apps/api/src/common/interceptors/idempotency.interceptor.ts
import { Injectable, NestInterceptor, BadRequestException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class IdempotencyInterceptor implements NestInterceptor {
  constructor(private redis: Redis) {}

  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const idempotencyKey = request.headers['idempotency-key'];
    
    if (!idempotencyKey || !/^[a-zA-Z0-9_-]+$/.test(idempotencyKey)) {
      throw new BadRequestException('Invalid Idempotency-Key header');
    }

    const cacheKey = `idempotent:${idempotencyKey}`;
    const cached = await this.redis.get(cacheKey);
    
    if (cached) {
      // Return cached response
      return JSON.parse(cached);
    }

    return next.handle().pipe(
      tap(async (response) => {
        // Cache successful response for 10 minutes
        await this.redis.setex(cacheKey, 600, JSON.stringify(response));
      })
    );
  }
}

// Apply to write endpoints
@Post('attempts/:lessonId')
@UseInterceptors(IdempotencyInterceptor)
async createAttempt(@Param('lessonId') lessonId: string, @Body() data: any) {
  // Implementation
}

@Put('progress/lesson/:lessonId')
@UseInterceptors(IdempotencyInterceptor)
async updateProgress(@Param('lessonId') lessonId: string, @Body() data: any) {
  // Implementation
}
```

### Required Endpoints for Idempotency
- `POST /attempts/{lessonId}` - Quiz submissions
- `PUT /progress/lesson/{lessonId}` - Progress updates
- `POST /courses/{courseId}/unlock` - Course access grants

## Rate Limiting & Monitoring

### Rate Limit Configuration

```typescript
// apps/api/src/app.module.ts
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    ThrottlerModule.forRoot([
      {
        name: 'short',
        ttl: 60000,     // 1 minute
        limit: 10,      // 10 requests per user per minute
      },
      {
        name: 'medium', 
        ttl: 600000,    // 10 minutes
        limit: 100,     // 100 requests per user per 10 minutes
      },
    ]),
  ],
})
export class AppModule {}
```

### Audit Logging

```typescript
// Log authentication failures
@Injectable()
export class SecurityLogger {
  async logAuthFailure(req: Request, reason: string) {
    console.warn('AUTH_FAILURE', {
      timestamp: new Date().toISOString(),
      ip: req.ip,
      userAgent: req.headers['user-agent'],
      initData: req.headers['x-telegram-init-data']?.substring(0, 50),
      reason,
      traceId: req.headers['x-trace-id'],
    });
  }

  async logRateLimit(req: Request) {
    console.warn('RATE_LIMIT_EXCEEDED', {
      timestamp: new Date().toISOString(),
      ip: req.ip,
      endpoint: req.path,
      userId: req.user?.id,
    });
  }
}
```

## References

- [Telegram Mini Apps WebApp](https://core.telegram.org/bots/webapps) - Official WebApp API documentation
- [HMAC Validation](https://core.telegram.org/bots/webapps#validating-data-received-via-the-mini-app) - initData verification process
- [OWASP ASVS v4.0](https://github.com/OWASP/ASVS) - Application Security Verification Standard
- [NIST Cybersecurity Framework](https://www.nist.gov/cyberframework) - Security controls implementation

## Acceptance Criteria

### Security Checklist
✅ **Authentication**
- [ ] initData HMAC verification implemented and tested
- [ ] TTL validation (5 minutes + 30s skew) enforced
- [ ] Nonce-based replay protection via Redis
- [ ] JWT tokens expire within 1 hour
- [ ] Invalid auth attempts logged and monitored

✅ **Authorization**
- [ ] User can only access their own progress/attempts
- [ ] Admin endpoints require elevated privileges
- [ ] Course access respects gate policies

✅ **Data Protection**
- [ ] All API responses exclude sensitive fields
- [ ] Database queries parameterized (Prisma ORM)
- [ ] File uploads (if any) scanned and size-limited
- [ ] PII fields encrypted at rest

✅ **Infrastructure**
- [ ] All secrets stored in environment variables
- [ ] Production database requires SSL connections
- [ ] Redis instance not publicly accessible
- [ ] Railway deployments require 2FA

**Verification Commands:**
```bash
# Test auth endpoint
curl -X POST https://your-api.railway.app/auth/telegram \
  -H "X-Telegram-Init-Data: query_id=..." \
  -H "Idempotency-Key: test-123" \
  --fail

# Check security headers
curl -I https://your-api.railway.app/api/health

# Verify rate limiting
for i in {1..15}; do curl -w "%{http_code}\n" https://your-api.railway.app/api/health; done
```