'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home, Bug } from 'lucide-react';
import { errorHandler } from '@/lib/error-handler';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
  errorId?: string;
}

export class GlobalErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { 
      hasError: true, 
      error,
      errorId: `error_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error using our error handler
    errorHandler.handleError(error, {
      component: 'GlobalErrorBoundary',
      action: 'componentDidCatch',
      severity: 'critical',
      category: 'ui'
    });

    this.setState({
      error,
      errorInfo,
    });
  }

  handleRetry = () => {
    this.setState({ 
      hasError: false, 
      error: undefined, 
      errorInfo: undefined,
      errorId: undefined
    });
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  handleReportBug = () => {
    const errorData = {
      errorId: this.state.errorId,
      message: this.state.error?.message,
      stack: this.state.error?.stack,
      componentStack: this.state.errorInfo?.componentStack,
      userAgent: navigator.userAgent,
      url: window.location.href,
      timestamp: new Date().toISOString()
    };

    // Copy to clipboard
    navigator.clipboard.writeText(JSON.stringify(errorData, null, 2));
    
    // Show feedback
    alert('Error details copied to clipboard. Please send this to support.');
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
          <div className="max-w-lg w-full bg-gray-800 rounded-lg shadow-xl p-8 text-center border border-gray-700">
            <div className="mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-red-500/20 rounded-full mb-4">
                <AlertTriangle className="h-8 w-8 text-red-400" />
              </div>
              <h1 className="text-2xl font-bold text-white mb-2">
                Something went wrong
              </h1>
              <p className="text-gray-400 mb-4">
                We encountered an unexpected error. Our team has been automatically notified.
              </p>
              {this.state.errorId && (
                <p className="text-sm text-gray-500 font-mono">
                  Error ID: {this.state.errorId}
                </p>
              )}
            </div>

            <div className="space-y-3">
              <button
                onClick={this.handleRetry}
                className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 font-medium"
              >
                <RefreshCw className="h-4 w-4" />
                Try Again
              </button>
              
              <button
                onClick={this.handleGoHome}
                className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg hover:bg-gray-600 transition-colors flex items-center justify-center gap-2 font-medium"
              >
                <Home className="h-4 w-4" />
                Go Home
              </button>

              <button
                onClick={this.handleReportBug}
                className="w-full bg-gray-600 text-white px-4 py-3 rounded-lg hover:bg-gray-500 transition-colors flex items-center justify-center gap-2 font-medium"
              >
                <Bug className="h-4 w-4" />
                Report Bug
              </button>
            </div>

            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mt-6 text-left">
                <summary className="cursor-pointer text-sm text-gray-400 hover:text-gray-300 mb-2">
                  Error Details (Development)
                </summary>
                <div className="p-4 bg-gray-900 rounded text-xs font-mono text-gray-300 overflow-auto max-h-40 border border-gray-700">
                  <div className="mb-2">
                    <strong className="text-red-400">Error:</strong> {this.state.error.message}
                  </div>
                  <div className="mb-2">
                    <strong className="text-yellow-400">Stack:</strong>
                    <pre className="whitespace-pre-wrap text-gray-300">{this.state.error.stack}</pre>
                  </div>
                  {this.state.errorInfo && (
                    <div>
                      <strong className="text-blue-400">Component Stack:</strong>
                      <pre className="whitespace-pre-wrap text-gray-300">{this.state.errorInfo.componentStack}</pre>
                    </div>
                  )}
                </div>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Hook for functional components
export function useGlobalErrorHandler() {
  return (error: Error, context?: { component?: string; action?: string }) => {
    errorHandler.handleError(error, {
      component: context?.component || 'Unknown',
      action: context?.action || 'Unknown',
      severity: 'high',
      category: 'ui'
    });
  };
}
