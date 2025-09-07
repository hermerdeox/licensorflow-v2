// Comprehensive Error Handling System
export interface ErrorContext {
  component?: string;
  action?: string;
  userId?: string;
  timestamp?: string;
  userAgent?: string;
  url?: string;
}

export interface ErrorReport {
  message: string;
  stack?: string;
  context: ErrorContext;
  severity: 'low' | 'medium' | 'high' | 'critical';
  category: 'network' | 'validation' | 'authentication' | 'database' | 'ui' | 'unknown';
}

class ErrorHandler {
  private static instance: ErrorHandler;
  private errorQueue: ErrorReport[] = [];
  private maxQueueSize = 100;

  private constructor() {
    this.setupGlobalErrorHandlers();
  }

  public static getInstance(): ErrorHandler {
    if (!ErrorHandler.instance) {
      ErrorHandler.instance = new ErrorHandler();
    }
    return ErrorHandler.instance;
  }

  private setupGlobalErrorHandlers() {
    if (typeof window === 'undefined') return;

    // Handle unhandled promise rejections
    window.addEventListener('unhandledrejection', (event) => {
      this.handleError(
        new Error(event.reason?.message || 'Unhandled Promise Rejection'),
        {
          component: 'Global',
          action: 'unhandledrejection',
          severity: 'medium',
          category: 'unknown'
        }
      );
    });

    // Handle global JavaScript errors
    window.addEventListener('error', (event) => {
      this.handleError(
        event.error || new Error(event.message),
        {
          component: 'Global',
          action: 'global-error',
          severity: 'high',
          category: 'ui'
        }
      );
    });

    // Handle console errors
    const originalConsoleError = console.error;
    console.error = (...args) => {
      originalConsoleError.apply(console, args);
      
      // Check if it's a React error
      if (args[0]?.includes?.('Error:') || args[0]?.includes?.('Warning:')) {
        this.handleError(
          new Error(args.join(' ')),
          {
            component: 'Console',
            action: 'console-error',
            severity: 'low',
            category: 'ui'
          }
        );
      }
    };
  }

  public handleError(
    error: Error | string,
    context: Partial<ErrorContext> & { severity: ErrorReport['severity']; category: ErrorReport['category'] }
  ): void {
    const errorObj = typeof error === 'string' ? new Error(error) : error;
    
    const errorReport: ErrorReport = {
      message: errorObj.message,
      stack: errorObj.stack,
      context: {
        component: context.component || 'Unknown',
        action: context.action || 'Unknown',
        userId: context.userId,
        timestamp: new Date().toISOString(),
        userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : 'Server',
        url: typeof window !== 'undefined' ? window.location.href : 'Server',
        ...context
      },
      severity: context.severity,
      category: context.category
    };

    // Add to queue
    this.addToQueue(errorReport);

    // Log based on severity
    this.logError(errorReport);

    // Send to monitoring service if critical
    if (context.severity === 'critical' || context.severity === 'high') {
      this.sendToMonitoring(errorReport);
    }
  }

  private addToQueue(errorReport: ErrorReport): void {
    this.errorQueue.push(errorReport);
    
    // Keep queue size manageable
    if (this.errorQueue.length > this.maxQueueSize) {
      this.errorQueue = this.errorQueue.slice(-this.maxQueueSize);
    }
  }

  private logError(errorReport: ErrorReport): void {
    const logMessage = `[${errorReport.severity.toUpperCase()}] ${errorReport.context.component}: ${errorReport.message}`;
    
    switch (errorReport.severity) {
      case 'critical':
        console.error(logMessage, errorReport);
        break;
      case 'high':
        console.error(logMessage, errorReport);
        break;
      case 'medium':
        console.warn(logMessage, errorReport);
        break;
      case 'low':
        console.info(logMessage, errorReport);
        break;
    }
  }

  private sendToMonitoring(errorReport: ErrorReport): void {
    // Send to Sentry if available
    if (typeof window !== 'undefined' && window.Sentry) {
      window.Sentry.captureException(new Error(errorReport.message), {
        contexts: {
          error: errorReport.context
        },
        tags: {
          severity: errorReport.severity,
          category: errorReport.category,
          component: errorReport.context.component
        }
      });
    }

    // Send to custom monitoring endpoint
    this.sendToCustomEndpoint(errorReport);
  }

  private async sendToCustomEndpoint(errorReport: ErrorReport): Promise<void> {
    try {
      await fetch('/api/errors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(errorReport),
      });
    } catch (error) {
      console.error('Failed to send error to monitoring endpoint:', error);
    }
  }

  public getErrorQueue(): ErrorReport[] {
    return [...this.errorQueue];
  }

  public clearErrorQueue(): void {
    this.errorQueue = [];
  }

  public getErrorStats(): { total: number; bySeverity: Record<string, number>; byCategory: Record<string, number> } {
    const stats = {
      total: this.errorQueue.length,
      bySeverity: {} as Record<string, number>,
      byCategory: {} as Record<string, number>
    };

    this.errorQueue.forEach(error => {
      stats.bySeverity[error.severity] = (stats.bySeverity[error.severity] || 0) + 1;
      stats.byCategory[error.category] = (stats.byCategory[error.category] || 0) + 1;
    });

    return stats;
  }
}

// Export singleton instance
export const errorHandler = ErrorHandler.getInstance();

// Utility functions for common error scenarios
export const handleNetworkError = (error: Error, context?: Partial<ErrorContext>) => {
  errorHandler.handleError(error, {
    ...context,
    severity: 'medium',
    category: 'network'
  });
};

export const handleValidationError = (error: Error, context?: Partial<ErrorContext>) => {
  errorHandler.handleError(error, {
    ...context,
    severity: 'low',
    category: 'validation'
  });
};

export const handleAuthError = (error: Error, context?: Partial<ErrorContext>) => {
  errorHandler.handleError(error, {
    ...context,
    severity: 'high',
    category: 'authentication'
  });
};

export const handleDatabaseError = (error: Error, context?: Partial<ErrorContext>) => {
  errorHandler.handleError(error, {
    ...context,
    severity: 'critical',
    category: 'database'
  });
};

export const handleUIError = (error: Error, context?: Partial<ErrorContext>) => {
  errorHandler.handleError(error, {
    ...context,
    severity: 'medium',
    category: 'ui'
  });
};

// React hook for error handling
export const useErrorHandler = () => {
  return {
    handleError: errorHandler.handleError.bind(errorHandler),
    handleNetworkError,
    handleValidationError,
    handleAuthError,
    handleDatabaseError,
    handleUIError,
    getErrorStats: errorHandler.getErrorStats.bind(errorHandler)
  };
};