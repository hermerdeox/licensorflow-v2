'use client';

import { useEffect } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to our error handler
    console.error('Global error caught:', error);
  }, [error]);

  return (
    <html>
      <body>
        <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
          <div className="max-w-lg w-full bg-gray-800 rounded-lg shadow-xl p-8 text-center border border-gray-700">
            <div className="mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-red-500/20 rounded-full mb-4">
                <AlertTriangle className="h-8 w-8 text-red-400" />
              </div>
              <h1 className="text-2xl font-bold text-white mb-2">
                Application Error
              </h1>
              <p className="text-gray-400 mb-4">
                Something went wrong with the application. Please try again.
              </p>
              {error.digest && (
                <p className="text-sm text-gray-500 font-mono">
                  Error ID: {error.digest}
                </p>
              )}
            </div>

            <div className="space-y-3">
              <button
                onClick={reset}
                className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 font-medium"
              >
                <RefreshCw className="h-4 w-4" />
                Try Again
              </button>
              
              <button
                onClick={() => window.location.href = '/'}
                className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg hover:bg-gray-600 transition-colors flex items-center justify-center gap-2 font-medium"
              >
                <Home className="h-4 w-4" />
                Go Home
              </button>
            </div>

            {process.env.NODE_ENV === 'development' && (
              <details className="mt-6 text-left">
                <summary className="cursor-pointer text-sm text-gray-400 hover:text-gray-300 mb-2">
                  Error Details (Development)
                </summary>
                <div className="p-4 bg-gray-900 rounded text-xs font-mono text-gray-300 overflow-auto max-h-40 border border-gray-700">
                  <div className="mb-2">
                    <strong className="text-red-400">Error:</strong> {error.message}
                  </div>
                  <div className="mb-2">
                    <strong className="text-yellow-400">Stack:</strong>
                    <pre className="whitespace-pre-wrap text-gray-300">{error.stack}</pre>
                  </div>
                </div>
              </details>
            )}
          </div>
        </div>
      </body>
    </html>
  );
}