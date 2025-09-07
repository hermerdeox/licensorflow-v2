import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from 'sonner';
import Header from '@/components/Header';
import { GlobalErrorBoundary } from '@/components/GlobalErrorBoundary';
import ErrorMonitor from '@/components/ErrorMonitor';

// Initialize error suppression in development
if (process.env.NODE_ENV === 'development') {
  import('@/lib/error-suppression');
}

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LicensorFlow - Healthcare Compliance Training & License Management",
  description: "Complete HIPAA & OSHA training, software certifications, and license management for healthcare and dental professionals.",
  keywords: "HIPAA training, OSHA compliance, healthcare training, dental compliance, license management, medical software training",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-gray-900 text-white antialiased`}>
        <GlobalErrorBoundary>
          <Header />
          {children}
          <Toaster 
            position="top-right"
            duration={4000}
            theme="dark"
            richColors
          />
          <ErrorMonitor showInDevelopment={true} />
        </GlobalErrorBoundary>
      </body>
    </html>
  );
}
