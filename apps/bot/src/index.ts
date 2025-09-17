import { Bot, InlineKeyboard } from "grammy"; import { Queue } from "bullmq"; import Redis from "ioredis"; import express from "express";
import { DeepLinkGenerator, COURSES, INTERVIEWS, CourseId, InterviewId } from "./utils/deep-links.js";

const token = process.env.BOT_TOKEN || process.env.TELEGRAM_BOT_TOKEN; if (!token) throw new Error("BOT_TOKEN or TELEGRAM_BOT_TOKEN required");
console.log('Environment variables check:');
console.log('REDIS_URL:', process.env.REDIS_URL);
console.log('BOT_TOKEN:', process.env.BOT_TOKEN ? 'SET' : 'NOT_SET');
console.log('TELEGRAM_BOT_TOKEN:', process.env.TELEGRAM_BOT_TOKEN ? 'SET' : 'NOT_SET');
console.log('BOT_USERNAME:', process.env.BOT_USERNAME);

const redisUrl = process.env.REDIS_URL;

let redis: Redis | null = null;
let reminders: Queue | null = null;

if (redisUrl) {
  console.log('🔧 Redis URL provided, attempting to connect...');
  
  // Wait a bit for network to be ready (Railway network timing issue)
  setTimeout(() => {
    try {
      redis = new Redis(redisUrl, {
        maxRetriesPerRequest: 3,
        lazyConnect: true,
        connectTimeout: 15000, // Increased timeout
        commandTimeout: 8000,   // Increased timeout  
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

      reminders = new Queue("reminders", { connection: redis as any });
      console.log('✅ Redis queue initialized for reminders');
    } catch (error) {
      console.error('❌ Failed to initialize Redis:', error);
    }
  }, 3000); // Wait 3 seconds before connecting to Redis
} else {
  console.log('⚠️ No Redis URL provided, running without reminder system');
} 

const bot = new Bot(token);
const BOT_USERNAME = process.env.BOT_USERNAME || "your_bot"; 
const WEBAPP_URL = process.env.WEBAPP_URL || "https://miniapp-production-9217.up.railway.app";

// Initialize deep-link generator
const deepLinks = new DeepLinkGenerator(BOT_USERNAME, WEBAPP_URL);

bot.command("start", async (ctx) => { 
  const userId = ctx.from?.id;
  const username = ctx.from?.username;
  const firstName = ctx.from?.first_name;
  
  console.log(`🎯 User started bot: ${firstName} (@${username}) [${userId}]`);
  
  const kb = new InlineKeyboard()
    .webApp("🚀 Открыть Академию", WEBAPP_URL)
    .row()
    .url("📚 Курсы", deepLinks.courseLink('ios-fundamentals'))
    .row()
    .url("⚡ Тренировка", deepLinks.interviewLink('swift-fundamentals', 'drill'))
    .url("🎓 Объяснения", deepLinks.interviewLink('swift-fundamentals', 'explain'))
    .url("⏱️ Мок-интервью", deepLinks.interviewLink('swift-fundamentals', 'mock'));
  
  await ctx.reply(
    `🎉 Привет, ${firstName}! Добро пожаловать в iOS Academy!\n\n` +
    "🚀 Изучайте iOS разработку с интерактивными уроками\n" +
    "💡 Тренируйтесь на вопросах интервью\n" +
    "📊 Отслеживайте свой прогресс\n" +
    "🏆 Соревнуйтесь с другими разработчиками\n\n" +
    "👆 Нажмите \"🚀 Открыть Академию\" чтобы начать!", 
    { reply_markup: kb }
  );
});

bot.command("courses", async (ctx) => { 
  const keyboard = new InlineKeyboard();
  
  // Add all available courses
  Object.entries(COURSES).forEach(([courseId, course]) => {
    keyboard.url(
      `${course.emoji} ${course.title}`, 
      deepLinks.courseLink(courseId as CourseId, { source: 'bot_command' })
    ).row();
  });
  
  await ctx.reply(
    "📚 Доступные курсы:\n\n" +
    "Выберите курс для изучения:", 
    { reply_markup: keyboard }
  );
});

bot.command("interviews", async (ctx) => {
  const keyboard = new InlineKeyboard();
  
  // Add all available interviews with modes
  Object.entries(INTERVIEWS).forEach(([interviewId, interview]) => {
    keyboard.url(
      `${interview.emoji} ${interview.title}`, 
      deepLinks.interviewLink(interviewId as InterviewId, 'drill', { source: 'bot_command' })
    ).row();
  });
  
  await ctx.reply(
    "💬 Интервью-тренировки:\n\n" +
    "Выберите тему для практики:", 
    { reply_markup: keyboard }
  );
});

bot.command("profile", async (ctx) => { 
  const keyboard = new InlineKeyboard()
    .webApp("👤 Профиль", WEBAPP_URL + "?startapp=profile")
    .row()
    .webApp("📊 Статистика", WEBAPP_URL + "?startapp=stats")
    .webApp("🏆 Достижения", WEBAPP_URL + "?startapp=achievements");
  
  await ctx.reply(
    "👤 Ваш профиль:\n\n" +
    "Здесь вы можете посмотреть свой прогресс и статистику.", 
    { reply_markup: keyboard }
  );
});
bot.command("review", async (ctx) => {
  const userId = ctx.from?.id; 
  if (!userId) return ctx.reply("Не удалось определить пользователя")
  
  if (!reminders) {
    return ctx.reply("⚠️ Система напоминаний временно недоступна. Повторите позже или используйте встроенные уведомления в приложении.")
  }
  
  const lessonId = "swift-variables-constants"; 
  const ms = (d:number)=> d*24*60*60*1000
  
  try {
    await reminders.add("review", { userId, lessonId, day: 1 }, { delay: ms(1), removeOnComplete: true })
    await reminders.add("review", { userId, lessonId, day: 7 }, { delay: ms(7), removeOnComplete: true })
    await reminders.add("review", { userId, lessonId, day: 30 }, { delay: ms(30), removeOnComplete: true })
    await ctx.reply("✅ План ревью создан: D1/D7/D30.")
  } catch (error) {
    console.error('❌ Failed to create review reminders:', error)
    await ctx.reply("⚠️ Не удалось создать план ревью. Попробуйте позже.")
  }
})

// Health check server for Railway
const app = express();
const port = process.env.PORT || 8080;

// Start bot with graceful error handling
console.log('📡 Starting bot...');
bot.start().catch(error => {
  console.error('❌ Bot failed to start:', error);
  console.log('ℹ️ Bot will continue running for health checks and Redis functionality');
  console.log('💡 Tip: Check if another bot instance is running with the same token');
});
console.log("Bot initialization completed");

app.get("/health", async (req, res) => {
  const healthData: any = { 
    status: "ok", 
    timestamp: new Date().toISOString(), 
    redis_url: !!redisUrl,
    redis_status: redis?.status || 'disabled'
  };
  
  if (redisUrl && redis) {
    try {
      const url = new URL(redisUrl);
      healthData.redis_host = url.hostname;
      
      // Try simple Redis ping if connected
      if (redis.status === 'ready') {
        await redis.ping();
        healthData.redis_ping = 'success';
      }
    } catch (error: any) {
      healthData.error = error.message;
    }
  } else {
    healthData.redis_message = 'Redis is disabled or not configured';
  }
  
  res.json(healthData);
});

app.get("/", (req, res) => {
  res.json({ status: "bot-running", timestamp: new Date().toISOString() });
});

app.listen(port, () => {
  console.log(`Bot health server running on port ${port}`);
});