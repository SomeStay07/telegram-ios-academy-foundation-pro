import { Bot, InlineKeyboard } from "grammy"; import { Queue } from "bullmq"; import Redis from "ioredis";
const token = process.env.BOT_TOKEN!; if (!token) throw new Error("BOT_TOKEN required");
const redis = new Redis(process.env.REDIS_URL || ""); const reminders = new Queue("reminders", { connection: redis as any }); const bot = new Bot(token);
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