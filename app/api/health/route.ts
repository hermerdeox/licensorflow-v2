import { NextResponse } from 'next/server';
import { HealthChecker, checkDatabase, checkRedis, checkStripe, checkEmailService } from '@/lib/monitoring';

export async function GET() {
  try {
    const healthChecker = new HealthChecker();
    
    // Register health checks
    healthChecker.register('database', checkDatabase);
    healthChecker.register('redis', checkRedis);
    healthChecker.register('stripe', checkStripe);
    healthChecker.register('email', checkEmailService);
    
    // Run all health checks
    const health = await healthChecker.runAll();
    
    // Determine HTTP status code
    const statusCode = health.status === 'healthy' ? 200 : 
                      health.status === 'degraded' ? 200 : 503;
    
    return NextResponse.json(health, { status: statusCode });
  } catch (error) {
    console.error('Health check failed:', error);
    
    return NextResponse.json(
      {
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        version: process.env.npm_package_version || '0.1.0',
        error: error instanceof Error ? error.message : 'Unknown error',
        checks: [],
        performance: {
          memory: process.memoryUsage(),
          cpu: 0,
          responseTime: 0,
        },
      },
      { status: 503 }
    );
  }
}
