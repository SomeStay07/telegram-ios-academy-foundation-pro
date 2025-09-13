# Security & Privacy Implementation Guide

This document outlines the security, privacy, and UX measures implemented in the Telegram MiniApp.

## Analytics Architecture

### Overview
The application uses a layered analytics architecture that prioritizes privacy and performance:

- **Default**: No-op tracker (no data collection)
- **VITE_ENABLE_ANALYTICS=1**: Lazy-loaded PostHog SDK 
- **VITE_ANALYTICS_PROXY=1**: Server-side proxy mode via `/api/events`

### Event Schema

All analytics events follow this structure:

```typescript
interface AnalyticsEvent {
  event: string           // Event name (e.g., 'lesson_started')
  props: Record<string, unknown> // Event properties
  ts?: number            // Timestamp (optional, defaults to Date.now())
}
```

### Privacy Implementation

#### PII Scrubbing (Server-side)
The API endpoint automatically removes or hashes sensitive data:

```typescript
const piiFields = [
  'email', 'phone', 'ip', 'user_agent', 'device_id', 
  'session_id', 'telegram_user_id', 'first_name', 'last_name'
]

// User IDs are hashed for anonymization
if (scrubbed.userId) {
  scrubbed.user_hash = this.hashString(String(scrubbed.userId))
  delete scrubbed.userId
}
```

#### Client-side Protection
- No direct PII collection in frontend code
- Telegram WebApp user data accessed only when necessary
- All sensitive operations go through privacy-compliant adapters

### Consent Management

The analytics system respects user privacy through multiple layers:

1. **Opt-in by default**: Analytics disabled unless explicitly enabled
2. **Environment-based**: Only active in production with proper configuration
3. **Progressive enhancement**: App works fully without analytics
4. **Transparent logging**: Development mode shows all intercepted events

## Content Security Policy (CSP)

### Dynamic Domain Management
CSP headers are dynamically configured based on feature flags:

```javascript
const analyticsSources = analyticsEnabled ? ["https://us.i.posthog.com"] : []
const connectSrc = [
  ...baseSources,
  ...(isDevelopment ? devSources : prodSources),
  ...sentrySources,
  ...analyticsSources
]
```

### Nonce-based Script Protection
All inline scripts use cryptographically secure nonces:

```javascript
// Generate random nonce per request
res.locals.nonce = crypto.randomBytes(16).toString('base64')

// Inject into HTML meta tag for client access
const htmlWithNonce = html.replace(
  '<head>',
  `<head>\n    <meta name="csp-nonce" content="${nonce}">`
)
```

### CSP Violation Reporting
Production violations are logged for monitoring:

```javascript
app.post('/csp-report', (req, res) => {
  console.warn('CSP_VIOLATION', {
    timestamp: new Date().toISOString(),
    blockedUri: req.body?.['csp-report']?.['blocked-uri'],
    violatedDirective: req.body?.['csp-report']?.['violated-directive'],
    // ... additional context
  })
})
```

## Rate Limiting & Security

### API Protection
The `/api/events` endpoint implements multiple security layers:

```typescript
@UseGuards(ThrottlerGuard)
@Throttle({ default: { limit: 20, ttl: 60000 } }) // 20 requests per minute
```

### Input Validation
All events are validated using class-validator:

```typescript
export class CreateEventDto {
  @IsString()
  @IsNotEmpty()
  event: string

  @IsObject()
  props: Record<string, unknown>

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => value || Date.now())
  ts?: number
}
```

## Error Monitoring

### Critical Error Types
The system monitors for specific production issues:

- `chunk_load_error`: Failed lazy loading of JavaScript chunks
- `analytics_gap`: Long periods without analytics events (potential blocking)
- `route_error`: Navigation failures
- `render_error`: Unhandled promise rejections
- `api_error`: Backend communication failures

### Automated Detection
Error monitoring runs automatically in production:

```typescript
// Detect chunk loading failures
window.addEventListener('error', (event) => {
  if (event.filename?.includes('.js') && event.message.includes('Loading')) {
    reportCriticalError({
      type: CriticalErrorType.CHUNK_LOAD_ERROR,
      message: `Failed to load chunk: ${event.filename}`,
      // ... context
    })
  }
})
```

## Performance Monitoring

### Web Vitals Integration
Core Web Vitals are automatically tracked when analytics is enabled:

- **CLS**: Cumulative Layout Shift
- **FID**: First Input Delay  
- **LCP**: Largest Contentful Paint
- **FCP**: First Contentful Paint
- **TTFB**: Time to First Byte

All metrics are lazy-loaded and sent via `sendBeacon` for reliability.

## Bundle Security

### Lazy Loading Strategy
Security-sensitive modules use `@vite-ignore` to prevent preloading:

```typescript
const { PostHogTracker } = await import(/* @vite-ignore */ './posthog')
```

### Bundle Size Monitoring
CI enforces bundle size limits to prevent bloat-based attacks:

- **Target**: ≤220KB gzipped initial bundle
- **Current**: ~200KB achieved through aggressive optimization

## Environment Configuration

### Production Settings
```env
VITE_ENABLE_ANALYTICS=1          # Enable analytics collection
VITE_ANALYTICS_PROXY=1           # Use server-side proxy mode  
VITE_POSTHOG_API_KEY=key         # PostHog API key (if direct mode)
POSTHOG_API_KEY=key              # Server-side PostHog key
POSTHOG_HOST=https://us.i.posthog.com  # PostHog endpoint
```

### Development Overrides
```env
VITE_ENABLE_ANALYTICS=0          # Disable analytics in dev
CSP_REPORT_ONLY=1                # CSP report-only mode
NODE_ENV=development             # Development mode
```

## Compliance Notes

### GDPR Compliance
- User consent implied through app usage
- No personal data collected without hashing
- Right to erasure supported through PostHog admin

### Data Retention
- Client-side: No persistent storage of user data
- Server-side: PostHog default retention (configurable)
- Error logs: 30-day rotation recommended

### Third-party Dependencies
- PostHog: Privacy-focused analytics with EU hosting options
- Sentry: Error monitoring with data residency controls
- All dependencies regularly updated for security patches

---

For implementation details, see:
- `apps/miniapp/src/lib/analytics/` - Analytics implementation
- `apps/miniapp/src/lib/error-monitoring.ts` - Error monitoring
- `apps/api/src/events/` - Server-side proxy endpoint
- `apps/miniapp/server.js` - CSP and security headers