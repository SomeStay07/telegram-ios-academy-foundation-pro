import express from 'express';
import helmet from 'helmet';
import { createReadStream, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import crypto from 'crypto';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = process.env.PORT || 5173;
const isDevelopment = process.env.NODE_ENV === 'development';

// Generate nonce for CSP
app.use((req, res, next) => {
  res.locals.nonce = crypto.randomBytes(16).toString('base64');
  next();
});

// Security headers with Helmet
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: [
        "'self'", 
        "'strict-dynamic'",
        (req, res) => `'nonce-${res.locals.nonce}'`,
      ],
      styleSrc: ["'self'", "'unsafe-inline'"], // Required for Tailwind CSS
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: isDevelopment 
        ? ["'self'", "http://localhost:3001", "ws://localhost:5173", "https://us.i.posthog.com", "https://o4507902681923584.ingest.sentry.io"]
        : ["'self'", "https://api-production-3e0e.up.railway.app", "https://us.i.posthog.com", "https://o4507902681923584.ingest.sentry.io", "https://api.telegram.org"],
      fontSrc: ["'self'"],
      objectSrc: ["'none'"],
      mediaSrc: ["'self'"],
      frameSrc: ["'none'"],
      frameAncestors: ["https://web.telegram.org"],
      baseUri: ["'self'"],
      formAction: ["'self'"],
    },
    reportOnly: isDevelopment,
  },
  hsts: {
    maxAge: 31536000, // 1 year
    includeSubDomains: true,
    preload: true
  },
  noSniff: true,
  referrerPolicy: { policy: 'no-referrer' }
}));

// CSP violation reporting endpoint
app.post('/csp-report', express.json(), (req, res) => {
  console.warn('CSP_VIOLATION', {
    timestamp: new Date().toISOString(),
    blockedUri: req.body?.['csp-report']?.['blocked-uri'],
    violatedDirective: req.body?.['csp-report']?.['violated-directive'],
    sourceFile: req.body?.['csp-report']?.['source-file'],
    lineNumber: req.body?.['csp-report']?.['line-number'],
    userAgent: req.get('user-agent'),
    ip: req.get('x-forwarded-for') || req.connection.remoteAddress,
  });
  
  res.json({ status: 'received' });
});

// Serve static files from dist directory
const distPath = join(__dirname, 'dist');
app.use(express.static(distPath, {
  setHeaders: (res, path) => {
    // Add CSP nonce to HTML files
    if (path.endsWith('.html')) {
      res.setHeader('Cache-Control', 'no-cache');
    } else {
      res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    }
  }
}));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Handle SPA routing - serve index.html for all non-API routes
app.get('*', (req, res) => {
  const indexPath = join(distPath, 'index.html');
  
  console.log(`Request for: ${req.path}`);
  console.log(`Looking for index.html at: ${indexPath}`);
  console.log(`Dist directory exists: ${existsSync(distPath)}`);
  console.log(`Index file exists: ${existsSync(indexPath)}`);
  
  if (!existsSync(indexPath)) {
    console.error(`Index file not found at: ${indexPath}`);
    res.status(404).send(`Application not built. Index file not found at: ${indexPath}`);
    return;
  }

  // Read and inject nonce into HTML
  const stream = createReadStream(indexPath, 'utf8');
  let html = '';
  
  stream.on('data', chunk => {
    html += chunk;
  });
  
  stream.on('end', () => {
    // Inject nonce into meta tag for client-side access
    const nonce = res.locals.nonce;
    const htmlWithNonce = html.replace(
      '<head>',
      `<head>\n    <meta name="csp-nonce" content="${nonce}">`
    );
    
    res.setHeader('Content-Type', 'text/html');
    res.send(htmlWithNonce);
  });
  
  stream.on('error', (err) => {
    console.error('Error reading index file:', err);
    res.status(500).send('Error loading application');
  });
});

app.listen(port, '0.0.0.0', () => {
  console.log(`🚀 MiniApp server running on port ${port}`);
  console.log(`🔒 Security headers enabled (CSP ${isDevelopment ? 'Report-Only' : 'Enforced'})`);
  console.log(`📁 Serving static files from: ${distPath}`);
});