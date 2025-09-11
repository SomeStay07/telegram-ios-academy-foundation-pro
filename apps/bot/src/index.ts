import { Bot, InlineKeyboard } from "grammy"; import { Queue } from "bullmq"; import Redis from "ioredis"; import express from "express";
import { promisify } from 'util';
import { lookup } from 'dns';
const dnsLookup = promisify(lookup);

const token = process.env.BOT_TOKEN!; if (!token) throw new Error("BOT_TOKEN required");
console.log('Environment variables check:');
console.log('REDIS_URL:', process.env.REDIS_URL);
console.log('BOT_TOKEN:', process.env.BOT_TOKEN ? 'SET' : 'NOT_SET');
console.log('BOT_USERNAME:', process.env.BOT_USERNAME);

const redisUrl = process.env.REDIS_URL!;

// DNS diagnostic check
async function checkRedisHost() {
  try {
    const url = new URL(redisUrl);
    console.log('🔍 Checking DNS resolution for:', url.hostname);
    const resolved = await dnsLookup(url.hostname);
    console.log('✅ DNS resolved:', url.hostname, '->', resolved.address);
    return true;
  } catch (error) {
    console.error('❌ DNS resolution failed:', error);
    return false;
  }
}

checkRedisHost();

const redis = new Redis(redisUrl, {
  maxRetriesPerRequest: 3,
  lazyConnect: true,
  connectTimeout: 10000,
  commandTimeout: 5000,
  enableReadyCheck: false,
});

redis.on('error', (error) => {
  console.warn('⚠️ Redis error in BOT:', error.message);
});

redis.on('connect', () => {
  console.log('✅ Redis connected for BOT');
});

redis.on('ready', () => {
  console.log('✅ Redis ready for BOT');
});

redis.on('close', () => {
  console.log('ℹ️ Redis connection closed for BOT');
});

redis.on('reconnecting', () => {
  console.log('🔄 Redis reconnecting for BOT');
});

const reminders = new Queue("reminders", { connection: redis as any }); const bot = new Bot(token);
const BOT_USERNAME = process.env.BOT_USERNAME || "your_bot"; const WEBAPP_URL = process.env.WEBAPP_URL || "https://example.com";
function startAppLink(payload: string) { return `https://t.me/${BOT_USERNAME}?startapp=${encodeURIComponent(payload)}` }
bot.command("start", async (ctx) => { const kb = new InlineKeyboard().webApp("Открыть MiniApp", WEBAPP_URL); await ctx.reply("Добро пожаловать!", { reply_markup: kb }) })
bot.command("courses", async (ctx) => { await ctx.reply("Открой курс:", { reply_markup: new InlineKeyboard().url("UIKit", startAppLink("course=uikit")) }) })
bot.command("profile", async (ctx) => { await ctx.reply("Профиль:", { reply_markup: new InlineKeyboard().url("Профиль", startAppLink("profile")) }) })
bot.command("review", async (ctx) => {
  const userId = ctx.from?.id; if (!userId) return ctx.reply("Не удалось определить пользователя")
  const lessonId = "swift-variables-constants"; const ms = (d:number)=> d*24*60*60*1000
  await reminders.add("review", { userId, lessonId, day: 1 }, { delay: ms(1), removeOnComplete: true })
  await reminders.add("review", { userId, lessonId, day: 7 }, { delay: ms(7), removeOnComplete: true })
  await reminders.add("review", { userId, lessonId, day: 30 }, { delay: ms(30), removeOnComplete: true })
  await ctx.reply("План ревью создан: D1/D7/D30.")
})
bot.start(); console.log("Bot started")

// Health check server for Railway
const app = express();
const port = process.env.PORT || 8080;

app.get("/health", async (req, res) => {
  const healthData: any = { 
    status: "ok", 
    timestamp: new Date().toISOString(), 
    redis_url: !!redisUrl,
    redis_status: redis.status
  };
  
  try {
    const url = new URL(redisUrl);
    healthData.redis_host = url.hostname;
    
    // Try DNS resolution
    try {
      const resolved = await dnsLookup(url.hostname);
      healthData.dns_resolved = resolved.address;
    } catch (dnsError: any) {
      healthData.dns_error = dnsError.message;
    }
    
    // Try simple Redis ping if connected
    if (redis.status === 'ready') {
      await redis.ping();
      healthData.redis_ping = 'success';
    }
  } catch (error: any) {
    healthData.error = error.message;
  }
  
  res.json(healthData);
});

app.get("/", (req, res) => {
  res.json({ status: "bot-running", timestamp: new Date().toISOString() });
});

app.listen(port, () => {
  console.log(`Bot health server running on port ${port}`);
});