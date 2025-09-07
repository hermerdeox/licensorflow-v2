'use client';

import { useState, useEffect } from 'react';
import { AlertTriangle, Bug, Activity, X } from 'lucide-react';
import { errorHandler } from '@/lib/error-handler';

interface ErrorMonitorProps {
  showInDevelopment?: boolean;
}

export default function ErrorMonitor({ showInDevelopment = true }: ErrorMonitorProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [errorStats, setErrorStats] = useState({
    total: 0,
    bySeverity: {} as Record<string, number>,
    byCategory: {} as Record<string, number>
  });

  useEffect(() => {
    // Only show in development or if explicitly enabled
    if (process.env.NODE_ENV !== 'development' && !showInDevelopment) {
      return;
    }

    const updateStats = () => {
      const stats = errorHandler.getErrorStats();
      setErrorStats(stats);
      
      // Show monitor if there are errors
      if (stats.total > 0) {
        setIsVisible(true);
      }
    };

    // Update stats every 5 seconds
    const interval = setInterval(updateStats, 5000);
    updateStats(); // Initial update

    return () => clearInterval(interval);
  }, [showInDevelopment]);

  if (!isVisible || (process.env.NODE_ENV !== 'development' && !showInDevelopment)) {
    return null;
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-500';
      case 'high': return 'text-orange-500';
      case 'medium': return 'text-yellow-500';
      case 'low': return 'text-blue-500';
      default: return 'text-gray-500';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'network': return '🌐';
      case 'database': return '🗄️';
      case 'authentication': return '🔐';
      case 'validation': return '✅';
      case 'ui': return '🎨';
      default: return '❓';
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-gray-800 border border-gray-700 rounded-lg shadow-xl p-4 max-w-sm">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Bug className="h-4 w-4 text-yellow-400" />
          <span className="text-sm font-medium text-white">Error Monitor</span>
        </div>
        <button
          onClick={() => setIsVisible(false)}
          className="text-gray-400 hover:text-white transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="space-y-2 text-xs">
        <div className="flex items-center justify-between">
          <span className="text-gray-400">Total Errors:</span>
          <span className="text-white font-medium">{errorStats.total}</span>
        </div>

        {Object.keys(errorStats.bySeverity).length > 0 && (
          <div>
            <div className="text-gray-400 mb-1">By Severity:</div>
            {Object.entries(errorStats.bySeverity).map(([severity, count]) => (
              <div key={severity} className="flex items-center justify-between">
                <span className={`capitalize ${getSeverityColor(severity)}`}>
                  {severity}:
                </span>
                <span className="text-white">{count}</span>
              </div>
            ))}
          </div>
        )}

        {Object.keys(errorStats.byCategory).length > 0 && (
          <div>
            <div className="text-gray-400 mb-1">By Category:</div>
            {Object.entries(errorStats.byCategory).map(([category, count]) => (
              <div key={category} className="flex items-center justify-between">
                <span className="text-gray-300">
                  {getCategoryIcon(category)} {category}:
                </span>
                <span className="text-white">{count}</span>
              </div>
            ))}
          </div>
        )}

        <div className="pt-2 border-t border-gray-700">
          <button
            onClick={() => {
              errorHandler.clearErrorQueue();
              setErrorStats({ total: 0, bySeverity: {}, byCategory: {} });
            }}
            className="w-full text-xs bg-gray-700 hover:bg-gray-600 text-white px-2 py-1 rounded transition-colors"
          >
            Clear Errors
          </button>
        </div>
      </div>
    </div>
  );
}
