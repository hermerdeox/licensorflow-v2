/**
 * Performance Monitoring & Resource Management
 * Created by THE SYSTEMS ARCHITECT
 */

import { performance } from 'perf_hooks';

interface PerformanceMetrics {
  operation: string;
  duration: number;
  memoryUsage: NodeJS.MemoryUsage;
  timestamp: Date;
}

class PerformanceMonitor {
  private static instance: PerformanceMonitor;
  private metrics: PerformanceMetrics[] = [];
  private maxMetrics = 1000; // Prevent memory leaks

  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor();
    }
    return PerformanceMonitor.instance;
  }

  startTimer(operation: string): () => void {
    const startTime = performance.now();
    const startMemory = process.memoryUsage();

    return () => {
      const endTime = performance.now();
      const endMemory = process.memoryUsage();
      
      const metric: PerformanceMetrics = {
        operation,
        duration: endTime - startTime,
        memoryUsage: endMemory,
        timestamp: new Date(),
      };

      this.recordMetric(metric);
      
      // Log slow operations
      if (metric.duration > 1000) {
        console.warn(`[Performance] Slow operation detected: ${operation} took ${metric.duration.toFixed(2)}ms`);
      }
    };
  }

  private recordMetric(metric: PerformanceMetrics): void {
    this.metrics.push(metric);
    
    // Keep only recent metrics to prevent memory leaks
    if (this.metrics.length > this.maxMetrics) {
      this.metrics = this.metrics.slice(-this.maxMetrics);
    }
  }

  getMetrics(): PerformanceMetrics[] {
    return [...this.metrics];
  }

  getAverageDuration(operation: string): number {
    const operationMetrics = this.metrics.filter(m => m.operation === operation);
    if (operationMetrics.length === 0) return 0;
    
    const totalDuration = operationMetrics.reduce((sum, m) => sum + m.duration, 0);
    return totalDuration / operationMetrics.length;
  }

  getMemoryStats(): {
    current: NodeJS.MemoryUsage;
    peak: NodeJS.MemoryUsage;
    average: NodeJS.MemoryUsage;
  } {
    const current = process.memoryUsage();
    const peak = this.metrics.reduce((peak, metric) => ({
      rss: Math.max(peak.rss, metric.memoryUsage.rss),
      heapTotal: Math.max(peak.heapTotal, metric.memoryUsage.heapTotal),
      heapUsed: Math.max(peak.heapUsed, metric.memoryUsage.heapUsed),
      external: Math.max(peak.external, metric.memoryUsage.external),
      arrayBuffers: Math.max(peak.arrayBuffers, metric.memoryUsage.arrayBuffers),
    }), current);

    const average = this.metrics.reduce((avg, metric) => ({
      rss: avg.rss + metric.memoryUsage.rss,
      heapTotal: avg.heapTotal + metric.memoryUsage.heapTotal,
      heapUsed: avg.heapUsed + metric.memoryUsage.heapUsed,
      external: avg.external + metric.memoryUsage.external,
      arrayBuffers: avg.arrayBuffers + metric.memoryUsage.arrayBuffers,
    }), { rss: 0, heapTotal: 0, heapUsed: 0, external: 0, arrayBuffers: 0 });

    const count = Math.max(this.metrics.length, 1);
    return {
      current,
      peak,
      average: {
        rss: average.rss / count,
        heapTotal: average.heapTotal / count,
        heapUsed: average.heapUsed / count,
        external: average.external / count,
        arrayBuffers: average.arrayBuffers / count,
      },
    };
  }

  // Memory leak detection
  detectMemoryLeaks(): boolean {
    const memoryStats = this.getMemoryStats();
    const memoryGrowth = memoryStats.current.heapUsed - memoryStats.average.heapUsed;
    
    // Alert if memory usage is 50% above average
    return memoryGrowth > (memoryStats.average.heapUsed * 0.5);
  }

  // Resource cleanup
  cleanup(): void {
    this.metrics = [];
    if (global.gc) {
      global.gc();
    }
  }
}

export const performanceMonitor = PerformanceMonitor.getInstance();

// Decorator for automatic performance monitoring
export function monitorPerformance(operationName: string) {
  return function (target: any, propertyName: string, descriptor: PropertyDescriptor) {
    const method = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      const endTimer = performanceMonitor.startTimer(`${operationName}.${propertyName}`);
      try {
        const result = await method.apply(this, args);
        return result;
      } finally {
        endTimer();
      }
    };

    return descriptor;
  };
}

// Utility function for manual monitoring
export function withPerformanceMonitoring<T>(
  operation: string,
  fn: () => Promise<T>
): Promise<T> {
  const endTimer = performanceMonitor.startTimer(operation);
  return fn().finally(endTimer);
}
