// Error Suppression Utilities for Development
// This helps prevent common development errors from cluttering the console

interface SuppressionRule {
  pattern: string | RegExp;
  message?: string;
  enabled: boolean;
}

class ErrorSuppressor {
  private static instance: ErrorSuppressor;
  private rules: SuppressionRule[] = [];
  private originalConsoleError: typeof console.error;

  private constructor() {
    this.originalConsoleError = console.error;
    this.setupSuppressionRules();
    this.overrideConsoleError();
  }

  public static getInstance(): ErrorSuppressor {
    if (!ErrorSuppressor.instance) {
      ErrorSuppressor.instance = new ErrorSuppressor();
    }
    return ErrorSuppressor.instance;
  }

  private setupSuppressionRules() {
    // Only suppress in development
    if (process.env.NODE_ENV !== 'development') {
      return;
    }

    this.rules = [
      // React hydration warnings (common in development)
      {
        pattern: /Warning: Text content did not match/,
        message: 'Hydration mismatch suppressed',
        enabled: true
      },
      {
        pattern: /Warning: Expected server HTML to contain/,
        message: 'Server HTML mismatch suppressed',
        enabled: true
      },
      // Framer Motion warnings
      {
        pattern: /Warning: AnimatePresence/,
        message: 'Framer Motion warning suppressed',
        enabled: true
      },
      // Next.js development warnings
      {
        pattern: /Warning: React does not recognize/,
        message: 'React prop warning suppressed',
        enabled: true
      },
      // Common development warnings
      {
        pattern: /Warning: validateDOMNesting/,
        message: 'DOM nesting warning suppressed',
        enabled: true
      }
    ];
  }

  private overrideConsoleError() {
    if (process.env.NODE_ENV !== 'development') {
      return;
    }

    console.error = (...args) => {
      const message = args.join(' ');
      
      // Check if this error should be suppressed
      const shouldSuppress = this.rules.some(rule => {
        if (!rule.enabled) return false;
        
        if (rule.pattern instanceof RegExp) {
          return rule.pattern.test(message);
        } else {
          return message.includes(rule.pattern);
        }
      });

      if (shouldSuppress) {
        // Log a suppressed message instead
        console.info(`[SUPPRESSED] ${message}`);
        return;
      }

      // Log the original error
      this.originalConsoleError.apply(console, args);
    };
  }

  public addRule(rule: SuppressionRule) {
    this.rules.push(rule);
  }

  public removeRule(pattern: string | RegExp) {
    this.rules = this.rules.filter(rule => rule.pattern !== pattern);
  }

  public enableRule(pattern: string | RegExp) {
    const rule = this.rules.find(r => r.pattern === pattern);
    if (rule) {
      rule.enabled = true;
    }
  }

  public disableRule(pattern: string | RegExp) {
    const rule = this.rules.find(r => r.pattern === pattern);
    if (rule) {
      rule.enabled = false;
    }
  }

  public getRules(): SuppressionRule[] {
    return [...this.rules];
  }

  public clearRules() {
    this.rules = [];
  }
}

// Export singleton instance
export const errorSuppressor = ErrorSuppressor.getInstance();

// Utility function to suppress specific errors
export const suppressError = (pattern: string | RegExp, message?: string) => {
  errorSuppressor.addRule({
    pattern,
    message,
    enabled: true
  });
};

// Utility function to restore console.error
export const restoreConsoleError = () => {
  if (typeof console !== 'undefined' && errorSuppressor['originalConsoleError']) {
    console.error = errorSuppressor['originalConsoleError'];
  }
};
