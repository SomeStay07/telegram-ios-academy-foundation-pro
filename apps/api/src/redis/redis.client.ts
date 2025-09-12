import Redis from 'ioredis';

export const makeRedis = () => {
  const url = process.env.REDIS_URL!;
  return url.startsWith('rediss://') ? new Redis(url, { tls: {} }) : new Redis(url);
};