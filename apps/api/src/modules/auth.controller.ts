import { Controller, Post, Body, BadRequestException } from '@nestjs/common'
import crypto from 'node:crypto'
import Redis from 'ioredis'

@Controller('auth')
export class AuthController {
  private redis = new Redis(process.env.REDIS_URL || '')
  @Post('verifyInitData')
  async verify(@Body() body: any) {
    const initData = body?.initData
    if (!initData) throw new BadRequestException('initData required')

    const urlSearch = new URLSearchParams(initData)
    const authDate = Number(urlSearch.get('auth_date') || '0')
    const now = Math.floor(Date.now()/1000)
    if (Math.abs(now - authDate) > 330) throw new BadRequestException('initData expired')

    const hash = urlSearch.get('hash') || ''
    urlSearch.delete('hash')
    const dataCheckString = [...urlSearch.entries()].sort(([a],[b]) => a.localeCompare(b)).map(([k,v]) => `${k}=${v}`).join('\n')

    const secretKey = crypto.createHmac('sha256', 'WebAppData').update(process.env.TELEGRAM_BOT_TOKEN || '').digest()
    const hmac = crypto.createHmac('sha256', secretKey).update(dataCheckString).digest('hex')
    if (hmac !== hash) throw new BadRequestException('HMAC invalid')

    const nonceKey = `nonce:${hash}`
    const nx = await this.redis.set(nonceKey, '1', 'EX', 300, 'NX')
    if (nx !== 'OK') throw new BadRequestException('replay detected')

    return { ok: true }
  }
}