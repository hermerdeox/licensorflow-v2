import { performanceMonitor } from './performance-monitor';

// Health check types
export interface HealthCheck {
  name: string;
  status: 'healthy' | 'unhealthy' | 'degraded';
  responseTime?: number;
  error?: string;
  details?: Record<string, any>;
}

export interface SystemHealth {
  status: 'healthy' | 'unhealthy' | 'degraded';
  timestamp: string;
  uptime: number;
  version: string;
  checks: HealthCheck[];
  performance: {
    memory: NodeJS.MemoryUsage;
    cpu: number;
    responseTime: number;
  };
}

// Health check implementations
export class HealthChecker {
  private checks: Map<string, () => Promise<HealthCheck>> = new Map();

  register(name: string, check: () => Promise<HealthCheck>) {
    this.checks.set(name, check);
  }

  async runAll(): Promise<SystemHealth> {
    const startTime = performance.now();
    const checks: HealthCheck[] = [];
    
    // Run all health checks in parallel
    const checkPromises = Array.from(this.checks.entries()).map(async ([name, check]) => {
      try {
        const checkStartTime = performance.now();
        const result = await check();
        result.responseTime = performance.now() - checkStartTime;
        return result;
      } catch (error) {
        return {
          name,
          status: 'unhealthy' as const,
          error: error instanceof Error ? error.message : 'Unknown error',
        };
      }
    });

    const results = await Promise.allSettled(checkPromises);
    
    results.forEach((result) => {
      if (result.status === 'fulfilled') {
        checks.push(result.value);
      } else {
        checks.push({
          name: 'unknown',
          status: 'unhealthy',
          error: result.reason?.message || 'Check failed',
        });
      }
    });

    // Determine overall system health
    const hasUnhealthy = checks.some(check => check.status === 'unhealthy');
    const hasDegraded = checks.some(check => check.status === 'degraded');
    
    let overallStatus: 'healthy' | 'unhealthy' | 'degraded';
    if (hasUnhealthy) {
      overallStatus = 'unhealthy';
    } else if (hasDegraded) {
      overallStatus = 'degraded';
    } else {
      overallStatus = 'healthy';
    }

    const responseTime = performance.now() - startTime;

    return {
      status: overallStatus,
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      version: process.env.npm_package_version || '0.1.0',
      checks,
      performance: {
        memory: process.memoryUsage(),
        cpu: await this.getCPUUsage(),
        responseTime,
      },
    };
  }

  private async getCPUUsage(): Promise<number> {
    const startUsage = process.cpuUsage();
    await new Promise(resolve => setTimeout(resolve, 100));
    const endUsage = process.cpuUsage(startUsage);
    
    const totalUsage = endUsage.user + endUsage.system;
    const totalTime = 100000; // 100ms in microseconds
    return (totalUsage / totalTime) * 100;
  }
}

// Database health check
export async function checkDatabase(): Promise<HealthCheck> {
  try {
    const { prisma } = await import('./prisma');
    const startTime = performance.now();
    
    await prisma.$queryRaw`SELECT 1`;
    
    const responseTime = performance.now() - startTime;
    
    return {
      name: 'database',
      status: responseTime < 1000 ? 'healthy' : 'degraded',
      responseTime,
      details: {
        provider: 'sqlite',
        connectionPool: 'active',
      },
    };
  } catch (error) {
    return {
      name: 'database',
      status: 'unhealthy',
      error: error instanceof Error ? error.message : 'Database connection failed',
    };
  }
}

// Redis health check
export async function checkRedis(): Promise<HealthCheck> {
  try {
    const { redis } = await import('./redis');
    const startTime = performance.now();
    
    await redis.ping();
    
    const responseTime = performance.now() - startTime;
    
    return {
      name: 'redis',
      status: responseTime < 500 ? 'healthy' : 'degraded',
      responseTime,
      details: {
        status: 'connected',
        memory: await redis.info('memory'),
      },
    };
  } catch (error) {
    return {
      name: 'redis',
      status: 'unhealthy',
      error: error instanceof Error ? error.message : 'Redis connection failed',
    };
  }
}

// External service health checks
export async function checkStripe(): Promise<HealthCheck> {
  try {
    const { stripe } = await import('./stripe');
    const startTime = performance.now();
    
    // Simple API call to check connectivity
    const client = stripe();
    if (!client) {
      throw new Error('Stripe client not configured');
    }
    
    await client.balance.retrieve();
    
    const responseTime = performance.now() - startTime;
    
    return {
      name: 'stripe',
      status: responseTime < 2000 ? 'healthy' : 'degraded',
      responseTime,
      details: {
        status: 'connected',
        mode: process.env.NODE_ENV === 'production' ? 'live' : 'test',
      },
    };
  } catch (error) {
    return {
      name: 'stripe',
      status: 'unhealthy',
      error: error instanceof Error ? error.message : 'Stripe API failed',
    };
  }
}

// Email service health check
export async function checkEmailService(): Promise<HealthCheck> {
  try {
    // Check if Resend API key is configured
    if (!process.env.RESEND_API_KEY) {
      return {
        name: 'email',
        status: 'degraded',
        error: 'Email service not configured',
      };
    }

    return {
      name: 'email',
      status: 'healthy',
      details: {
        provider: 'resend',
        configured: true,
      },
    };
  } catch (error) {
    return {
      name: 'email',
      status: 'unhealthy',
      error: error instanceof Error ? error.message : 'Email service check failed',
    };
  }
}

// Performance metrics collection
export class MetricsCollector {
  private metrics: Map<string, number[]> = new Map();

  record(metric: string, value: number) {
    if (!this.metrics.has(metric)) {
      this.metrics.set(metric, []);
    }
    
    const values = this.metrics.get(metric)!;
    values.push(value);
    
    // Keep only last 1000 values to prevent memory leaks
    if (values.length > 1000) {
      values.splice(0, values.length - 1000);
    }
  }

  getStats(metric: string): { avg: number; min: number; max: number; count: number } | null {
    const values = this.metrics.get(metric);
    if (!values || values.length === 0) {
      return null;
    }

    const sum = values.reduce((a, b) => a + b, 0);
    const avg = sum / values.length;
    const min = Math.min(...values);
    const max = Math.max(...values);

    return { avg, min, max, count: values.length };
  }

  getAllMetrics(): Record<string, { avg: number; min: number; max: number; count: number }> {
    const result: Record<string, { avg: number; min: number; max: number; count: number }> = {};
    
    for (const [metric] of this.metrics) {
      const stats = this.getStats(metric);
      if (stats) {
        result[metric] = stats;
      }
    }
    
    return result;
  }

  clear() {
    this.metrics.clear();
  }
}

// Global metrics collector instance
export const metricsCollector = new MetricsCollector();

// Middleware for collecting request metrics
export function collectRequestMetrics(req: any, res: any, next: any) {
  const startTime = performance.now();
  
  res.on('finish', () => {
    const duration = performance.now() - startTime;
    metricsCollector.record('request_duration', duration);
    metricsCollector.record(`request_duration_${req.method}`, duration);
    metricsCollector.record(`request_duration_${res.statusCode}`, duration);
  });
  
  next();
}

// Alert system
export interface Alert {
  id: string;
  type: 'error' | 'warning' | 'info';
  message: string;
  timestamp: Date;
  resolved: boolean;
  metadata?: Record<string, any>;
}

export class AlertManager {
  private alerts: Map<string, Alert> = new Map();
  private thresholds: Map<string, { min?: number; max?: number }> = new Map();

  setThreshold(metric: string, min?: number, max?: number) {
    this.thresholds.set(metric, { min, max });
  }

  checkThresholds() {
    const metrics = metricsCollector.getAllMetrics();
    
    for (const [metric, stats] of Object.entries(metrics)) {
      const threshold = this.thresholds.get(metric);
      if (!threshold) continue;

      const { min, max } = threshold;
      
      if (min !== undefined && stats.avg < min) {
        this.createAlert('warning', `Metric ${metric} below threshold: ${stats.avg} < ${min}`);
      }
      
      if (max !== undefined && stats.avg > max) {
        this.createAlert('error', `Metric ${metric} above threshold: ${stats.avg} > ${max}`);
      }
    }
  }

  private createAlert(type: Alert['type'], message: string, metadata?: Record<string, any>) {
    const id = `${type}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    const alert: Alert = {
      id,
      type,
      message,
      timestamp: new Date(),
      resolved: false,
      metadata,
    };
    
    this.alerts.set(id, alert);
    
    // Log alert
    console.warn(`[ALERT] ${type.toUpperCase()}: ${message}`, metadata);
    
    // Here you could integrate with external alerting services
    // like PagerDuty, Slack, email, etc.
  }

  getActiveAlerts(): Alert[] {
    return Array.from(this.alerts.values()).filter(alert => !alert.resolved);
  }

  resolveAlert(id: string) {
    const alert = this.alerts.get(id);
    if (alert) {
      alert.resolved = true;
    }
  }
}

// Global alert manager instance
export const alertManager = new AlertManager();

// Set up default thresholds
alertManager.setThreshold('request_duration', undefined, 2000); // 2 seconds
alertManager.setThreshold('memory_usage', undefined, 100 * 1024 * 1024); // 100MB

// Periodic threshold checking
setInterval(() => {
  alertManager.checkThresholds();
}, 60000); // Check every minute
