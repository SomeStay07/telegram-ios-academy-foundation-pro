# Content Security Policy (CSP) Implementation

## Final CSP Policy for MiniApp

### Production CSP Header
```http
Content-Security-Policy: default-src 'self'; script-src 'self' 'strict-dynamic' 'nonce-{{RUNTIME_NONCE}}'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; connect-src 'self' https://api.telegram.org https://us.i.posthog.com https://o4507902681923584.ingest.sentry.io; font-src 'self'; object-src 'none'; media-src 'self'; frame-src 'none'; frame-ancestors https://web.telegram.org; base-uri 'self'; form-action 'self';
```

### Directive Breakdown

**`default-src 'self'`**
- Default policy for all resource types
- Only allow resources from same origin

**`script-src 'self' 'strict-dynamic' 'nonce-{{RUNTIME_NONCE}}'`**
- `'self'`: Allow scripts from same origin (Vite chunks)
- `'strict-dynamic'`: Allow scripts loaded by trusted scripts
- `'nonce-{{RUNTIME_NONCE}}'`: Runtime nonce for inline scripts
- ❌ Avoid `'unsafe-inline'` - use nonce instead

**`style-src 'self' 'unsafe-inline'`**
- `'self'`: Bundled CSS files
- `'unsafe-inline'`: Required for Tailwind CSS variables and React inline styles
- ⚠️ Acceptable risk - Tailwind generates CSS custom properties dynamically

**`img-src 'self' data: https:`**
- `'self'`: App images and icons
- `data:`: Base64 inline images (icons, loading spinners)
- `https:`: External images (user avatars from Telegram)

**`connect-src 'self' https://api.telegram.org https://us.i.posthog.com https://o4507902681923584.ingest.sentry.io`**
- `'self'`: API calls to your backend
- `https://api.telegram.org`: Telegram API calls (if any)
- `https://us.i.posthog.com`: PostHog analytics
- `https://o4507902681923584.ingest.sentry.io`: Sentry error reporting

**`frame-ancestors https://web.telegram.org`**
- Critical: Only allow embedding in Telegram WebApp container
- Prevents clickjacking attacks

## Vite Configuration for CSP

### Development Setup
```typescript
// apps/miniapp/vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react(),
  ],
  server: {
    headers: {
      // Report-Only mode for development
      'Content-Security-Policy-Report-Only': 
        "default-src 'self'; script-src 'self' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; connect-src 'self' http://localhost:3001 https://us.i.posthog.com; font-src 'self'; object-src 'none'; media-src 'self'; frame-ancestors https://web.telegram.org; report-uri /csp-report",
    },
  },
  build: {
    rollupOptions: {
      output: {
        // Ensure predictable chunk names for CSP
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'router': ['@tanstack/react-router'],
          'ui': ['@telegram-ios-academy/ui'],
        },
      },
    },
  },
});
```

### Production Deployment

For Railway deployment, CSP is set via API response headers:

```typescript
// apps/api/src/main.ts
import helmet from 'helmet';

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: [
        "'self'", 
        "'strict-dynamic'",
        // Generate nonce per request
        (req, res) => `'nonce-${res.locals.nonce}'`,
      ],
      styleSrc: ["'self'", "'unsafe-inline'"], // Tailwind requirement
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: [
        "'self'",
        "https://api.telegram.org",
        "https://us.i.posthog.com", 
        "https://o4507902681923584.ingest.sentry.io",
      ],
      fontSrc: ["'self'"],
      objectSrc: ["'none'"],
      mediaSrc: ["'self'"],
      frameSrc: ["'none'"],
      frameAncestors: ["https://web.telegram.org"],
      baseUri: ["'self'"],
      formAction: ["'self'"],
    },
    reportOnly: process.env.NODE_ENV !== 'production',
  },
}));

// Generate nonce middleware
app.use((req, res, next) => {
  res.locals.nonce = crypto.randomBytes(16).toString('base64');
  next();
});
```

### Static File Server CSP
```typescript
// apps/miniapp/src/main.tsx - inject nonce into HTML
const nonce = document.querySelector('meta[name="csp-nonce"]')?.getAttribute('content');

// Use nonce for any required inline scripts
if (nonce) {
  // Example: Analytics initialization
  const script = document.createElement('script');
  script.nonce = nonce;
  script.textContent = `
    window.telegramAnalytics = {
      userId: '${user.id}',
      sessionId: '${sessionId}'
    };
  `;
  document.head.appendChild(script);
}
```

## CSP Report-Only Rollout

### Phase 1: Report-Only Mode (1 week)
```typescript
// Enable CSP reporting without enforcement
app.use((req, res, next) => {
  res.setHeader('Content-Security-Policy-Report-Only', 
    "default-src 'self'; script-src 'self' 'strict-dynamic'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; connect-src 'self' https://api.telegram.org https://us.i.posthog.com; font-src 'self'; object-src 'none'; media-src 'self'; frame-ancestors https://web.telegram.org; report-uri /csp-report"
  );
  next();
});
```

### Phase 2: Enforcement Mode
```typescript
// Switch to enforcing mode after fixing violations
app.use((req, res, next) => {
  res.setHeader('Content-Security-Policy', 
    // Same policy without 'Report-Only'
  );
  next();
});
```

## CSP Violation Reporting

### Report Endpoint
```typescript
// apps/api/src/csp/csp.controller.ts
import { Controller, Post, Body, Headers } from '@nestjs/common';

@Controller('csp-report')
export class CSPController {
  @Post()
  async handleViolation(
    @Body() report: CSPViolationReport,
    @Headers('user-agent') userAgent: string,
    @Headers('x-forwarded-for') ip: string,
  ) {
    // Log CSP violations for monitoring
    console.warn('CSP_VIOLATION', {
      timestamp: new Date().toISOString(),
      blockedUri: report['csp-report']?.['blocked-uri'],
      violatedDirective: report['csp-report']?.['violated-directive'],
      sourceFile: report['csp-report']?.['source-file'],
      lineNumber: report['csp-report']?.['line-number'],
      userAgent,
      ip,
    });

    // Send to monitoring system
    if (process.env.NODE_ENV === 'production') {
      // Sentry.captureException(new Error('CSP Violation'), {
      //   extra: report,
      //   tags: { violation_type: 'csp' }
      // });
    }

    return { status: 'received' };
  }
}

interface CSPViolationReport {
  'csp-report': {
    'document-uri': string;
    'violated-directive': string;
    'blocked-uri': string;
    'source-file'?: string;
    'line-number'?: number;
    'column-number'?: number;
  };
}
```

### Monitoring Dashboard
```typescript
// Monitor CSP violations in development
export const cspMonitor = {
  violations: [] as CSPViolationReport[],
  
  addViolation(report: CSPViolationReport) {
    this.violations.push(report);
    
    // Auto-fix common violations
    const violation = report['csp-report'];
    
    if (violation['violated-directive'].includes('script-src')) {
      console.warn('🔒 CSP: Blocked script:', violation['blocked-uri']);
      console.warn('💡 Fix: Add script source to script-src directive or use nonce');
    }
    
    if (violation['violated-directive'].includes('style-src')) {
      console.warn('🔒 CSP: Blocked style:', violation['source-file']);
      console.warn('💡 Fix: Move inline styles to CSS file or add nonce');
    }
  },
  
  getSummary() {
    const byDirective = this.violations.reduce((acc, v) => {
      const directive = v['csp-report']['violated-directive'];
      acc[directive] = (acc[directive] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    return { total: this.violations.length, byDirective };
  }
};
```

## Railway Deployment Configuration

### Environment-Specific CSP
```bash
# .env.production
CSP_CONNECT_SRC=https://your-api.railway.app,https://us.i.posthog.com,https://o4507902681923584.ingest.sentry.io
CSP_REPORT_URI=https://your-api.railway.app/csp-report

# .env.local
CSP_CONNECT_SRC=http://localhost:3001,https://us.i.posthog.com
CSP_REPORT_URI=http://localhost:3001/csp-report
```

### Railway Static Files CSP
```toml
# apps/miniapp/railway.toml
[build]
builder = "NIXPACKS"

[build.nixpacksConfig]
packages = ["nodejs", "pnpm"]

[build.nixpacksConfig.env]
PNPM_VERSION = "9.0.0"

# Static file serving with CSP headers
[[redirects]]
from = "/*"
to = "/index.html"
status = 200
headers = { Content-Security-Policy = "default-src 'self'; script-src 'self' 'strict-dynamic'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; connect-src 'self' https://api.telegram.org https://us.i.posthog.com; font-src 'self'; object-src 'none'; frame-ancestors https://web.telegram.org;" }
```

## CSP Testing & Validation

### Automated CSP Testing
```typescript
// apps/miniapp/tests/csp.test.ts
import { test, expect } from '@playwright/test';

test.describe('Content Security Policy', () => {
  test('should not have CSP violations on main page', async ({ page }) => {
    const cspViolations = [];
    
    page.on('console', (msg) => {
      if (msg.text().includes('Content Security Policy')) {
        cspViolations.push(msg.text());
      }
    });

    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    expect(cspViolations).toHaveLength(0);
  });

  test('should block unsafe inline scripts', async ({ page }) => {
    await page.goto('/');
    
    // Try to inject malicious script
    const result = await page.evaluate(() => {
      const script = document.createElement('script');
      script.textContent = 'window.xssTest = true;';
      document.body.appendChild(script);
      return window.xssTest;
    });
    
    expect(result).toBeUndefined();
  });
});
```

### Manual CSP Verification
```bash
# Check CSP header is present
curl -I https://your-app.railway.app | grep -i "content-security-policy"

# Test with CSP analyzer
npx csp-evaluator https://your-app.railway.app

# Browser DevTools CSP validation
# 1. Open browser DevTools
# 2. Go to Security tab
# 3. Check for CSP violations in Console
```

## Common CSP Issues & Solutions

### Issue: React Hot Reload Blocked
```javascript
// Development only - add webpack dev server to connect-src
'connect-src': process.env.NODE_ENV === 'development' 
  ? ["'self'", "ws://localhost:5173", "http://localhost:5173"]
  : ["'self'", "https://your-api.railway.app"]
```

### Issue: Tailwind Inline Styles
```css
/* ✅ Preferred: Use CSS custom properties */
:root {
  --color-primary: theme('colors.blue.600');
}

.button-primary {
  background-color: var(--color-primary);
}

/* ❌ Avoid: Inline style attribute */
<div style="background-color: blue;">
```

### Issue: Third-party Analytics
```typescript
// Use connect-src whitelist for analytics
const cspConnectSrc = [
  "'self'",
  "https://us.i.posthog.com",     // PostHog
  "https://sentry.io",            // Sentry
  "https://api.telegram.org",     // Telegram API
].join(' ');
```

## References

- [CSP Level 3 Specification](https://www.w3.org/TR/CSP3/) - Official W3C specification
- [MDN CSP Reference](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP) - Complete directive reference
- [OWASP CSP Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Content_Security_Policy_Cheat_Sheet.html) - Security best practices
- [CSP Evaluator](https://csp-evaluator.withgoogle.com/) - Google's CSP validation tool

## Acceptance Criteria

### CSP Implementation ✅
- [ ] **Policy Configured**: CSP header present on all responses
- [ ] **Strict Dynamic**: No unsafe-inline for scripts
- [ ] **Frame Ancestors**: Only Telegram WebApp container allowed
- [ ] **Connect Sources**: All external APIs whitelisted
- [ ] **Nonce Implementation**: Dynamic nonces for any inline scripts
- [ ] **Report-Only Testing**: 1 week report-only deployment first
- [ ] **Violation Monitoring**: CSP reports logged and monitored
- [ ] **Browser Compatibility**: Policy works in Telegram WebApp
- [ ] **Development Mode**: Relaxed policy for local development
- [ ] **Zero Violations**: No CSP errors in production console

**Verification Commands:**
```bash
# Check CSP header
curl -I https://your-app.railway.app | grep -i content-security-policy

# Test CSP policy
npx csp-evaluator https://your-app.railway.app

# Monitor violations (after 1 day)
curl https://your-api.railway.app/csp-report/summary
```

**Done = No CSP violations in browser console and policy blocks XSS attempts**