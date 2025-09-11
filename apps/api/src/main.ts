import 'reflect-metadata'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './modules/app.module'
import helmet from 'helmet'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: false })
  app.setGlobalPrefix('api')
  app.use(helmet({ contentSecurityPolicy: false }))

  const origins = (process.env.ALLOWED_ORIGINS || '').split(',').map(s=>s.trim()).filter(Boolean)
  if (origins.length) app.enableCors({ origin: origins, credentials: true })

  await app.listen(process.env.PORT ? Number(process.env.PORT) : 3000)
  console.log(`API started on ${await app.getUrl()}`)
}
bootstrap().catch((e) => { console.error(e); process.exit(1) })