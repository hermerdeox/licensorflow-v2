import { errorHandler } from './error-handler';

// Safe async wrapper that catches and handles errors
export async function safeAsync<T>(
  asyncFn: () => Promise<T>,
  context?: {
    component?: string;
    action?: string;
    fallback?: T;
    severity?: 'low' | 'medium' | 'high' | 'critical';
    category?: 'network' | 'validation' | 'authentication' | 'database' | 'ui' | 'unknown';
  }
): Promise<T | undefined> {
  try {
    return await asyncFn();
  } catch (error) {
    const err = error instanceof Error ? error : new Error(String(error));
    
    errorHandler.handleError(err, {
      component: context?.component || 'SafeAsync',
      action: context?.action || 'async-operation',
      severity: context?.severity || 'medium',
      category: context?.category || 'unknown'
    });

    return context?.fallback;
  }
}

// Safe async wrapper that returns a result object
export async function safeAsyncResult<T>(
  asyncFn: () => Promise<T>,
  context?: {
    component?: string;
    action?: string;
    severity?: 'low' | 'medium' | 'high' | 'critical';
    category?: 'network' | 'validation' | 'authentication' | 'database' | 'ui' | 'unknown';
  }
): Promise<{ success: boolean; data?: T; error?: Error }> {
  try {
    const data = await asyncFn();
    return { success: true, data };
  } catch (error) {
    const err = error instanceof Error ? error : new Error(String(error));
    
    errorHandler.handleError(err, {
      component: context?.component || 'SafeAsyncResult',
      action: context?.action || 'async-operation',
      severity: context?.severity || 'medium',
      category: context?.category || 'unknown'
    });

    return { success: false, error: err };
  }
}

// Safe fetch wrapper
export async function safeFetch(
  url: string,
  options?: RequestInit,
  context?: {
    component?: string;
    action?: string;
    fallback?: any;
  }
): Promise<any> {
  return safeAsync(
    async () => {
      const response = await fetch(url, options);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      return await response.json();
    },
    {
      component: context?.component || 'SafeFetch',
      action: context?.action || 'fetch-request',
      severity: 'medium',
      category: 'network',
      fallback: context?.fallback
    }
  );
}

// Safe database operation wrapper
export async function safeDbOperation<T>(
  operation: () => Promise<T>,
  context?: {
    component?: string;
    action?: string;
    fallback?: T;
  }
): Promise<T | undefined> {
  return safeAsync(operation, {
    component: context?.component || 'Database',
    action: context?.action || 'db-operation',
    severity: 'critical',
    category: 'database',
    fallback: context?.fallback
  });
}

// Safe component render wrapper
export function safeRender<T>(
  renderFn: () => T,
  fallback: T,
  context?: {
    component?: string;
    action?: string;
  }
): T {
  try {
    return renderFn();
  } catch (error) {
    const err = error instanceof Error ? error : new Error(String(error));
    
    errorHandler.handleError(err, {
      component: context?.component || 'SafeRender',
      action: context?.action || 'render-operation',
      severity: 'medium',
      category: 'ui'
    });

    return fallback;
  }
}

// Retry mechanism with exponential backoff
export async function retryAsync<T>(
  asyncFn: () => Promise<T>,
  options: {
    maxRetries?: number;
    delay?: number;
    backoffMultiplier?: number;
    context?: {
      component?: string;
      action?: string;
    };
  } = {}
): Promise<T> {
  const {
    maxRetries = 3,
    delay = 1000,
    backoffMultiplier = 2,
    context
  } = options;

  let lastError: Error;
  
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await asyncFn();
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
      
      if (attempt === maxRetries) {
        errorHandler.handleError(lastError, {
          component: context?.component || 'RetryAsync',
          action: context?.action || 'retry-operation',
          severity: 'high',
          category: 'network'
        });
        throw lastError;
      }
      
      // Wait before retry with exponential backoff
      await new Promise(resolve => 
        setTimeout(resolve, delay * Math.pow(backoffMultiplier, attempt))
      );
    }
  }
  
  throw lastError!;
}
