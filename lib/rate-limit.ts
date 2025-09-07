import { RateLimiterRedis, RateLimiterMemory } from 'rate-limiter-flexible';
import { redis } from './redis';
import { NextRequest, NextResponse } from 'next/server';

// Create rate limiter with Redis backend
const createRateLimiter = (options: {
  keyPrefix: string;
  points: number;
  duration: number;
  blockDuration?: number;
}) => {
  try {
    return new RateLimiterRedis({
      storeClient: redis,
      keyPrefix: options.keyPrefix,
      points: options.points,
      duration: options.duration,
      blockDuration: options.blockDuration || 60,
    });
  } catch (error) {
    console.warn('[RateLimiter] Redis not available, falling back to memory');
    return new RateLimiterMemory({
      points: options.points,
      duration: options.duration,
      blockDuration: options.blockDuration || 60,
    });
  }
};

const rateLimiterRedis = createRateLimiter({
  keyPrefix: 'rate_limit',
  points: 100, // Number of requests
  duration: 60, // Per 60 seconds
  blockDuration: 60, // Block for 1 minute
});

export class RateLimiter {
  static async limit(key: string, points: number = 1): Promise<void> {
    try {
      await rateLimiterRedis.consume(key, points);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Rate limit exceeded: ${error.message}`);
      }
      throw error;
    }
  }

  static async check(key: string): Promise<{
    remainingPoints: number;
    msBeforeNext: number;
    consumedPoints: number;
    isFirstInDuration: boolean;
  }> {
    try {
      const result = await rateLimiterRedis.get(key);
      if (!result) {
        return {
          remainingPoints: 100,
          msBeforeNext: 0,
          consumedPoints: 0,
          isFirstInDuration: true,
        };
      }
      return {
        remainingPoints: result.remainingPoints,
        msBeforeNext: result.msBeforeNext,
        consumedPoints: result.consumedPoints,
        isFirstInDuration: result.isFirstInDuration,
      };
    } catch (error) {
      console.error('[RateLimiter] Error checking rate limit:', error);
      throw error;
    }
  }

  static async reset(key: string): Promise<void> {
    try {
      await rateLimiterRedis.delete(key);
    } catch (error) {
      console.error('[RateLimiter] Error resetting rate limit:', error);
    }
  }
}

export function createRateLimitMiddleware(options: {
  keyGenerator?: (req: NextRequest) => string;
  points?: number;
  duration?: number;
  blockDuration?: number;
} = {}) {
  const limiter = createRateLimiter({
    keyPrefix: 'api_rate_limit',
    points: options.points || 50,
    duration: options.duration || 60,
    blockDuration: options.blockDuration || 60,
  });

  return async function rateLimitMiddleware(req: NextRequest) {
    const key = options.keyGenerator ? options.keyGenerator(req) : 
                req.headers.get('x-forwarded-for') || 
                req.headers.get('x-real-ip') || 
                'anonymous';

    try {
      await limiter.consume(key);
      return null;
    } catch (error) {
      return NextResponse.json(
        { 
          error: 'Too many requests', 
          message: 'Please try again later' 
        },
        { 
          status: 429,
          headers: {
            'Retry-After': '60',
            'X-RateLimit-Limit': String(options.points || 50),
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': new Date(Date.now() + (options.blockDuration || 60) * 1000).toISOString(),
          }
        }
      );
    }
  };
}

export async function withRateLimit<T>(
  handler: () => Promise<T>,
  key: string,
  options: {
    points?: number;
    duration?: number;
    blockDuration?: number;
  } = {}
): Promise<T> {
  const limiter = createRateLimiter({
    keyPrefix: 'function_rate_limit',
    points: options.points || 10,
    duration: options.duration || 60,
    blockDuration: options.blockDuration || 60,
  });

  try {
    await limiter.consume(key);
    return await handler();
  } catch (error) {
    if (error instanceof Error && error.message.includes('Too many')) {
      throw new Error('Rate limit exceeded. Please try again later.');
    }
    throw error;
  }
}
