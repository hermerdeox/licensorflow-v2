'use client';

import { useEffect, useState } from 'react';

interface HydrationBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export default function HydrationBoundary({ children, fallback = null }: HydrationBoundaryProps) {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    // Suppress hydration mismatch warnings
    const originalConsoleError = console.error;
    console.error = (...args) => {
      const errorMessage = args.join(' ');
      
      // Filter out hydration mismatch errors
      const isHydrationMismatch = errorMessage.includes('hydrated but some attributes') ||
                                 errorMessage.includes('cz-shortcut-listen') ||
                                 errorMessage.includes('browser extension') ||
                                 errorMessage.includes('hydration-mismatch') ||
                                 errorMessage.includes('Warning: Text content did not match') ||
                                 errorMessage.includes('Warning: Prop') ||
                                 errorMessage.includes('Warning: Expected server HTML');
      
      if (!isHydrationMismatch) {
        originalConsoleError.apply(console, args);
      }
    };

    setIsHydrated(true);

    // Cleanup
    return () => {
      console.error = originalConsoleError;
    };
  }, []);

  if (!isHydrated) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}
