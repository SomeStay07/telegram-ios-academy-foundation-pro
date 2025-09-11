import 'reflect-metadata'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './modules/app.module'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { ValidationPipe } from '@nestjs/common'
import helmet from 'helmet'
import { writeFileSync, mkdirSync, existsSync } from 'fs'
import { join } from 'path'
import { parseEnv } from './config/env'

async function bootstrap() {
  const env = parseEnv(process.env)
  
  const app = await NestFactory.create(AppModule, { cors: false })
  app.setGlobalPrefix('api')
  
  // Security hardening with Helmet
  app.use(helmet({
    contentSecurityPolicy: env.NODE_ENV === 'development' ? false : {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", "data:", "https:"],
        connectSrc: ["'self'"],
        fontSrc: ["'self'"],
        objectSrc: ["'none'"],
        mediaSrc: ["'self'"],
        frameSrc: ["'none'"],
      },
      reportOnly: env.CSP_REPORT_ONLY === '1'
    },
    hsts: {
      maxAge: 31536000, // 1 year
      includeSubDomains: true,
      preload: true
    },
    noSniff: true,
    referrerPolicy: { policy: 'no-referrer' }
  }))
  
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }))

  // Strict CORS configuration
  app.enableCors({
    origin: env.ALLOWED_ORIGINS.split(',').map(s => s.trim()).filter(Boolean),
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: [
      'Content-Type', 
      'Authorization', 
      'X-Telegram-Init-Data', 
      'Idempotency-Key'
    ]
  })

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('Telegram iOS Academy API')
    .setDescription('API for Telegram Mini App educational platform')
    .setVersion('1.0')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'access-token'
    )
    .addApiKey(
      { type: 'apiKey', in: 'header', name: 'X-Telegram-Init-Data' },
      'telegram-auth'
    )
    .addApiKey(
      { type: 'apiKey', in: 'header', name: 'Idempotency-Key' },
      'idempotency'
    )
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api/docs', app, document)

  // Health check endpoint for Railway
  const httpAdapter = app.getHttpAdapter()
  httpAdapter.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() })
  })

  // Export OpenAPI spec
  const outputDir = join(__dirname, '../openapi')
  if (!existsSync(outputDir)) mkdirSync(outputDir, { recursive: true })
  
  writeFileSync(join(outputDir, 'spec.json'), JSON.stringify(document, null, 2))
  writeFileSync(join(outputDir, 'spec.yaml'), require('js-yaml').dump(document))
  
  await app.listen(process.env.PORT ? Number(process.env.PORT) : 3000)
  console.log(`API started on ${await app.getUrl()}`)
  console.log(`Swagger docs available at ${await app.getUrl()}/api/docs`)
}
bootstrap().catch((e) => { console.error(e); process.exit(1) })