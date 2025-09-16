import { z } from 'zod';

const redisUrl = z.string().refine(v => /^redis(s)?:\/\//.test(v), 'Expected redis:// or rediss://');

export const EnvSchema = z.object({
  NODE_ENV: z.enum(['development','test','production']).default('production'),
  DATABASE_URL: z.string().url(),
  REDIS_URL: redisUrl,
  TELEGRAM_BOT_TOKEN: z.string().min(10),
  ALLOWED_ORIGINS: z.string().min(1),
  CSP_REPORT_ONLY: z.string().default('1'),
  API_PUBLIC_ORIGIN: z.string().url().optional(),
  METRICS_TOKEN: z.string().min(1, 'METRICS_TOKEN is required for securing /metrics endpoint'),
});

export type Env = z.infer<typeof EnvSchema>;

export function parseEnv(raw: NodeJS.ProcessEnv): Env {
  const res = EnvSchema.safeParse(raw);
  if (!res.success) { 
    console.error('❌ Invalid ENV:', res.error.flatten().fieldErrors); 
    process.exit(1); 
  }
  return res.data;
}