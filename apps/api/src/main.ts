import 'reflect-metadata'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './modules/app.module'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { ValidationPipe } from '@nestjs/common'
import helmet from 'helmet'
import { writeFileSync, mkdirSync, existsSync } from 'fs'
import { join } from 'path'
import { parseEnv } from './config/env'
import { PrismaService } from './prisma/prisma.service'

async function bootstrap() {
  const env = parseEnv(process.env)
  
  const app = await NestFactory.create(AppModule, { cors: false })
  app.setGlobalPrefix('api')
  
  // Enable Prisma shutdown hooks (optional for graceful shutdown)
  try {
    const prismaService = app.get(PrismaService)
    // Note: enableShutdownHooks is deprecated in Prisma 5.0+ for library engine
    // Process shutdown is handled automatically by Prisma
    if (typeof prismaService.enableShutdownHooks === 'function') {
      await prismaService.enableShutdownHooks(app)
    }
  } catch (error) {
    // Ignore deprecated API warnings - Prisma handles shutdown automatically
    const errorMessage = error instanceof Error ? error.message : String(error)
    if (!errorMessage.includes('beforeExit')) {
      console.warn('Warning: Could not enable Prisma shutdown hooks:', errorMessage)
    }
  }
  
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
  
  // Temporary debug endpoint to check Redis URL
  httpAdapter.get('/api/debug-redis', (req, res) => {
    const redisUrl = process.env.REDIS_URL
    res.json({ 
      redisUrl: redisUrl ? redisUrl.substring(0, 20) + '...' : 'NOT_SET',
      hasRedisUrl: !!redisUrl,
      startsWithRedis: redisUrl ? redisUrl.startsWith('redis://') : false,
      timestamp: new Date().toISOString() 
    })
  })

  // Export OpenAPI spec
  const outputDir = join(__dirname, '../openapi')
  if (!existsSync(outputDir)) mkdirSync(outputDir, { recursive: true })
  
  writeFileSync(join(outputDir, 'spec.json'), JSON.stringify(document, null, 2))
  writeFileSync(join(outputDir, 'spec.yaml'), require('js-yaml').dump(document))
  
  const port = process.env.PORT ? Number(process.env.PORT) : 3000
  await app.listen(port, '0.0.0.0')
  console.log(`API started on http://0.0.0.0:${port}`)
  console.log(`Swagger docs available at http://0.0.0.0:${port}/api/docs`)
}
bootstrap().catch((e) => { console.error(e); process.exit(1) })// Railway deployment test - четверг, 11 сентября 2025 г. 20:51:26 (MSK)
