import { Bot, InlineKeyboard } from "grammy"; import { Queue } from "bullmq"; import Redis from "ioredis"; import express from "express";
const token = process.env.BOT_TOKEN!; if (!token) throw new Error("BOT_TOKEN required");
console.log('Environment variables check:');
console.log('REDIS_URL:', process.env.REDIS_URL);
console.log('BOT_TOKEN:', process.env.BOT_TOKEN ? 'SET' : 'NOT_SET');
console.log('BOT_USERNAME:', process.env.BOT_USERNAME);

const redisUrl = process.env.REDIS_URL;
if (!redisUrl || redisUrl === '' || (!redisUrl.startsWith('redis://') && !redisUrl.startsWith('rediss://'))) {
  console.error('REDIS_URL configuration error:', redisUrl);
  throw new Error("REDIS_URL required and must be a valid Redis URL");
}
const redis = new Redis(redisUrl); const reminders = new Queue("reminders", { connection: redis as any }); const bot = new Bot(token);
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

app.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString(), redis: !!redisUrl });
});

app.get("/", (req, res) => {
  res.json({ status: "bot-running", timestamp: new Date().toISOString() });
});

app.listen(port, () => {
  console.log(`Bot health server running on port ${port}`);
});