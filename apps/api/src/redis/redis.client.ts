import Redis from 'ioredis';

export const makeRedis = () => {
  const url = process.env.REDIS_URL!;
  const config = {
    // Suppress connection errors in logs (they'll still be handled by error handlers)
    lazyConnect: true,
    retryDelayOnFailover: 100,
    maxRetriesPerRequest: 3,
    retryDelayOnReconnect: 50,
    // Don't log errors to console - handle them in application
    showFriendlyErrorStack: false
  };
  
  const redis = url.startsWith('rediss://') 
    ? new Redis(url, { ...config, tls: {} }) 
    : new Redis(url, config);
    
  // Handle errors gracefully without logging
  redis.on('error', (err) => {
    // Silent error handling - errors will be caught by health checks
  });
  
  return redis;
};