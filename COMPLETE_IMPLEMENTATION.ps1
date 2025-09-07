# LicensorFlow Complete Implementation Script
# This PowerShell script creates all remaining files for the upgrade

Write-Host "`n🚀 LICENSORFLOW COMPLETE IMPLEMENTATION SCRIPT" -ForegroundColor Cyan
Write-Host "=" * 60 -ForegroundColor DarkGray

# Create directories if they don't exist
$directories = @(
    "components/dashboard",
    "components/dashboard/tabs",
    "app/api/auth/[...nextauth]",
    "app/admin",
    "app/instructor",
    "app/auth/forgot-password",
    "app/auth/reset-password",
    "app/auth/verify",
    "app/api/courses",
    "app/api/health"
)

foreach ($dir in $directories) {
    if (!(Test-Path $dir)) {
        New-Item -ItemType Directory -Path $dir -Force | Out-Null
        Write-Host "✅ Created directory: $dir" -ForegroundColor Green
    }
}

# Create DashboardTabs component
@'
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CoursesTab from './tabs/CoursesTab';
import ProgressTab from './tabs/ProgressTab';
import CertificatesTab from './tabs/CertificatesTab';
import BillingTab from './tabs/BillingTab';
import NotificationsTab from './tabs/NotificationsTab';
import SettingsTab from './tabs/SettingsTab';

const tabs = [
  { id: 'courses', label: 'My Courses', icon: '📚' },
  { id: 'progress', label: 'Progress', icon: '📊' },
  { id: 'certificates', label: 'Certificates', icon: '🏆' },
  { id: 'billing', label: 'Billing', icon: '💳' },
  { id: 'notifications', label: 'Notifications', icon: '🔔' },
  { id: 'settings', label: 'Settings', icon: '⚙️' },
];

export default function DashboardTabs({ data }: { data: any }) {
  const [activeTab, setActiveTab] = useState('courses');
  
  return (
    <div className="rounded-lg bg-white shadow">
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8 px-6" aria-label="Tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium transition-colors
                ${activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                }
              `}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
              {tab.id === 'notifications' && data.notifications.length > 0 && (
                <span className="ml-2 rounded-full bg-red-500 px-2 py-0.5 text-xs text-white">
                  {data.notifications.length}
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>
      
      <div className="p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === 'courses' && <CoursesTab enrollments={data.enrollments} />}
            {activeTab === 'progress' && <ProgressTab progress={data.progress} />}
            {activeTab === 'certificates' && <CertificatesTab certificates={data.certificates} />}
            {activeTab === 'billing' && <BillingTab subscription={data.user?.subscriptions[0]} payments={data.recentPayments} />}
            {activeTab === 'notifications' && <NotificationsTab notifications={data.notifications} />}
            {activeTab === 'settings' && <SettingsTab user={data.user} />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
'@ | Out-File -FilePath "components/dashboard/DashboardTabs.tsx" -Encoding UTF8

Write-Host "✅ Created DashboardTabs.tsx" -ForegroundColor Green

# Create CoursesTab component
@'
export default function CoursesTab({ enrollments }: { enrollments: any[] }) {
  if (enrollments.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">You haven't enrolled in any courses yet.</p>
        <a href="/courses" className="mt-4 inline-block text-blue-600 hover:underline">
          Browse Courses →
        </a>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {enrollments.map((enrollment) => (
        <div key={enrollment.id} className="rounded-lg border border-gray-200 p-4 hover:shadow-lg transition-shadow">
          <h3 className="font-semibold text-lg mb-2">{enrollment.course.title}</h3>
          <p className="text-sm text-gray-600 mb-3">
            Instructor: {enrollment.course.instructor.name || `${enrollment.course.instructor.firstName} ${enrollment.course.instructor.lastName}`}
          </p>
          <div className="flex justify-between items-center">
            <span className={`px-2 py-1 rounded text-xs font-medium ${
              enrollment.status === 'COMPLETED' ? 'bg-green-100 text-green-800' :
              enrollment.status === 'ACTIVE' ? 'bg-blue-100 text-blue-800' :
              'bg-gray-100 text-gray-800'
            }`}>
              {enrollment.status}
            </span>
            <a href={`/courses/${enrollment.course.id}`} className="text-blue-600 hover:underline text-sm">
              Continue →
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}
'@ | Out-File -FilePath "components/dashboard/tabs/CoursesTab.tsx" -Encoding UTF8

Write-Host "✅ Created CoursesTab.tsx" -ForegroundColor Green

# Create remaining tab components
$tabComponents = @{
    "ProgressTab" = @'
export default function ProgressTab({ progress }: { progress: any[] }) {
  return (
    <div className="space-y-4">
      {progress.map((item) => (
        <div key={item.id} className="border rounded-lg p-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold">{item.course.title}</h3>
            <span className="text-sm text-gray-600">
              {Math.round(Number(item.progressPercentage))}% Complete
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all"
              style={{ width: `${item.progressPercentage}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
'@
    "CertificatesTab" = @'
export default function CertificatesTab({ certificates }: { certificates: any[] }) {
  if (certificates.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No certificates earned yet.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {certificates.map((cert) => (
        <div key={cert.id} className="border rounded-lg p-4">
          <h3 className="font-semibold mb-2">{cert.course.title}</h3>
          <p className="text-sm text-gray-600 mb-3">
            Issued: {new Date(cert.issuedAt).toLocaleDateString()}
          </p>
          <a 
            href={cert.certificateUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline text-sm"
          >
            Download Certificate →
          </a>
        </div>
      ))}
    </div>
  );
}
'@
    "BillingTab" = @'
'use client';

import { useState } from 'react';
import { toast } from 'sonner';

export default function BillingTab({ subscription, payments }: { subscription: any; payments: any[] }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleManageBilling = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/stripe/portal', {
        method: 'POST',
      });
      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      toast.error('Failed to open billing portal');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold mb-4">Current Subscription</h3>
        {subscription ? (
          <div className="border rounded-lg p-4">
            <p className="font-medium">Status: {subscription.status}</p>
            <p className="text-sm text-gray-600">
              Next billing: {new Date(subscription.currentPeriodEnd).toLocaleDateString()}
            </p>
            <button
              onClick={handleManageBilling}
              disabled={isLoading}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {isLoading ? 'Loading...' : 'Manage Billing'}
            </button>
          </div>
        ) : (
          <p className="text-gray-500">No active subscription</p>
        )}
      </div>
      
      <div>
        <h3 className="font-semibold mb-4">Recent Payments</h3>
        {payments && payments.length > 0 ? (
          <div className="space-y-2">
            {payments.map((payment) => (
              <div key={payment.id} className="border rounded p-3 flex justify-between">
                <span className="text-sm">
                  ${Number(payment.amount).toFixed(2)} {payment.currency.toUpperCase()}
                </span>
                <span className="text-sm text-gray-600">
                  {new Date(payment.createdAt).toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No payments yet</p>
        )}
      </div>
    </div>
  );
}
'@
    "NotificationsTab" = @'
'use client';

import { useState } from 'react';

export default function NotificationsTab({ notifications }: { notifications: any[] }) {
  const [unreadNotifications, setUnreadNotifications] = useState(notifications);

  const markAsRead = async (id: string) => {
    // API call to mark as read would go here
    setUnreadNotifications(prev => prev.filter(n => n.id !== id));
  };

  if (unreadNotifications.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No new notifications</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {unreadNotifications.map((notification) => (
        <div key={notification.id} className="border rounded-lg p-4 flex justify-between items-start">
          <div className="flex-1">
            <h4 className="font-medium">{notification.title}</h4>
            <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
            <p className="text-xs text-gray-400 mt-2">
              {new Date(notification.createdAt).toLocaleString()}
            </p>
          </div>
          <button
            onClick={() => markAsRead(notification.id)}
            className="ml-4 text-sm text-blue-600 hover:underline"
          >
            Dismiss
          </button>
        </div>
      ))}
    </div>
  );
}
'@
    "SettingsTab" = @'
'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { toast } from 'sonner';

export default function SettingsTab({ user }: { user: any }) {
  const { update } = useSession();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold mb-4">Profile Information</h3>
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <p className="mt-1 text-sm text-gray-900">{user?.name || `${user?.firstName} ${user?.lastName}`}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <p className="mt-1 text-sm text-gray-900">{user?.email}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Organization</label>
            <p className="mt-1 text-sm text-gray-900">{user?.organizationName || 'Not specified'}</p>
          </div>
        </div>
      </div>
      
      <div>
        <h3 className="font-semibold mb-4">Security</h3>
        <button className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700">
          Change Password
        </button>
      </div>
    </div>
  );
}
'@
}

foreach ($component in $tabComponents.GetEnumerator()) {
    $component.Value | Out-File -FilePath "components/dashboard/tabs/$($component.Key).tsx" -Encoding UTF8
    Write-Host "✅ Created $($component.Key).tsx" -ForegroundColor Green
}

# Create NextAuth route handler
@'
import { handlers } from '@/auth';

export const { GET, POST } = handlers;
'@ | Out-File -FilePath "app/api/auth/[...nextauth]/route.ts" -Encoding UTF8

Write-Host "✅ Created NextAuth route handler" -ForegroundColor Green

# Create forgot password page
@'
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link';
import { toast } from 'sonner';

const ForgotPasswordSchema = z.object({
  email: z.string().email('Invalid email address'),
});

type ForgotPasswordFormData = z.infer<typeof ForgotPasswordSchema>;

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(ForgotPasswordSchema),
  });
  
  const onSubmit = async (data: ForgotPasswordFormData) => {
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || 'Failed to send reset email');
      }
      
      setIsSubmitted(true);
      toast.success('Password reset link sent to your email');
    } catch (error) {
      console.error('[ForgotPassword] Error:', error);
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('An error occurred. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };
  
  if (isSubmitted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="w-full max-w-md space-y-8 p-8 text-center bg-white rounded-lg shadow-lg">
          <div>
            <h2 className="text-3xl font-bold">Check Your Email</h2>
            <p className="mt-4 text-gray-600">
              We've sent a password reset link to your email address.
              Please check your inbox and follow the instructions.
            </p>
          </div>
          <Link
            href="/auth/login"
            className="inline-block text-blue-600 hover:underline"
          >
            Back to login
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md space-y-8 p-8 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <h2 className="text-3xl font-bold">Forgot Password?</h2>
          <p className="mt-2 text-gray-600">
            Enter your email and we'll send you a reset link
          </p>
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              {...register('email')}
              type="email"
              autoComplete="email"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
              disabled={isLoading}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>
          
          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>
        
        <div className="text-center">
          <Link href="/auth/login" className="text-sm text-blue-600 hover:underline">
            Back to login
          </Link>
        </div>
      </div>
    </div>
  );
}
'@ | Out-File -FilePath "app/auth/forgot-password/page.tsx" -Encoding UTF8

Write-Host "✅ Created forgot-password page" -ForegroundColor Green

# Create forgot password API route
@'
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { sendPasswordResetEmail } from '@/lib/email';
import { generatePasswordResetToken } from '@/lib/tokens';
import { RateLimiter } from '@/lib/rate-limit';
import * as Sentry from '@sentry/nextjs';

const ForgotPasswordSchema = z.object({
  email: z.string().email(),
});

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get('x-forwarded-for') || 'anonymous';
    
    try {
      await RateLimiter.limit(`forgot-password:${ip}`, 1);
    } catch {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }
    
    const body = await request.json();
    const validatedData = ForgotPasswordSchema.parse(body);
    
    const user = await prisma.user.findUnique({
      where: { email: validatedData.email },
    });
    
    if (user) {
      const token = await generatePasswordResetToken(user.id);
      await sendPasswordResetEmail(user.email, token);
      
      await prisma.auditLog.create({
        data: {
          userId: user.id,
          action: 'PASSWORD_RESET_REQUEST',
          entityType: 'USER',
          entityId: user.id,
          ipAddress: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip'),
          userAgent: request.headers.get('user-agent'),
        },
      });
    }
    
    return NextResponse.json({
      message: 'If an account exists, a reset link has been sent',
    });
  } catch (error) {
    console.error('[ForgotPassword] Error:', error);
    Sentry.captureException(error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
'@ | Out-File -FilePath "app/api/auth/forgot-password/route.ts" -Encoding UTF8

Write-Host "✅ Created forgot-password API route" -ForegroundColor Green

# Create health check route
@'
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { redis } from '@/lib/redis';

export async function GET() {
  try {
    const checks = await Promise.allSettled([
      prisma.$queryRaw`SELECT 1`,
      redis.ping(),
    ]);
    
    const [dbCheck, redisCheck] = checks;
    
    const health = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      checks: {
        database: dbCheck.status === 'fulfilled' ? 'healthy' : 'unhealthy',
        redis: redisCheck.status === 'fulfilled' ? 'healthy' : 'unhealthy',
      },
      version: process.env.npm_package_version || '1.0.0',
    };
    
    const isHealthy = Object.values(health.checks).every(
      (status) => status === 'healthy'
    );
    
    return NextResponse.json(
      health,
      { status: isHealthy ? 200 : 503 }
    );
  } catch (error) {
    console.error('[Health Check] Error:', error);
    return NextResponse.json(
      {
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        error: 'Health check failed',
      },
      { status: 503 }
    );
  }
}
'@ | Out-File -FilePath "app/api/health/route.ts" -Encoding UTF8

Write-Host "✅ Created health check route" -ForegroundColor Green

# Create error handler
@'
import * as Sentry from '@sentry/nextjs';
import { NextResponse } from 'next/server';

export class AppError extends Error {
  constructor(
    public message: string,
    public statusCode: number = 500,
    public code?: string,
    public details?: any
  ) {
    super(message);
    this.name = 'AppError';
    Error.captureStackTrace(this, this.constructor);
  }
}

export class ValidationError extends AppError {
  constructor(message: string, details?: any) {
    super(message, 400, 'VALIDATION_ERROR', details);
    this.name = 'ValidationError';
  }
}

export class AuthenticationError extends AppError {
  constructor(message: string = 'Authentication failed') {
    super(message, 401, 'AUTHENTICATION_ERROR');
    this.name = 'AuthenticationError';
  }
}

export class AuthorizationError extends AppError {
  constructor(message: string = 'Insufficient permissions') {
    super(message, 403, 'AUTHORIZATION_ERROR');
    this.name = 'AuthorizationError';
  }
}

export class NotFoundError extends AppError {
  constructor(resource: string) {
    super(`${resource} not found`, 404, 'NOT_FOUND');
    this.name = 'NotFoundError';
  }
}

export class RateLimitError extends AppError {
  constructor(message: string = 'Too many requests') {
    super(message, 429, 'RATE_LIMIT_EXCEEDED');
    this.name = 'RateLimitError';
  }
}

export function handleError(error: unknown): NextResponse {
  console.error('[ErrorHandler]:', error);
  
  if (error instanceof AppError) {
    Sentry.captureException(error, {
      level: error.statusCode >= 500 ? 'error' : 'warning',
      extra: {
        code: error.code,
        details: error.details,
      },
    });
    
    return NextResponse.json(
      {
        error: error.message,
        code: error.code,
        details: error.details,
      },
      { status: error.statusCode }
    );
  }
  
  if (error instanceof Error) {
    Sentry.captureException(error);
    
    return NextResponse.json(
      {
        error: 'Internal server error',
        message: process.env.NODE_ENV === 'development' ? error.message : undefined,
      },
      { status: 500 }
    );
  }
  
  Sentry.captureMessage('Unknown error occurred', 'error');
  
  return NextResponse.json(
    { error: 'An unexpected error occurred' },
    { status: 500 }
  );
}

export function withErrorHandler<T extends (...args: any[]) => Promise<NextResponse>>(
  handler: T
): T {
  return (async (...args: Parameters<T>) => {
    try {
      return await handler(...args);
    } catch (error) {
      return handleError(error);
    }
  }) as T;
}
'@ | Out-File -FilePath "lib/error-handler.ts" -Encoding UTF8

Write-Host "✅ Created error handler" -ForegroundColor Green

# Update next.config.js
@'
const { withSentryConfig } = require('@sentry/nextjs');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
    optimizePackageImports: ['@stripe/stripe-js', 'framer-motion'],
  },
  images: {
    domains: ['localhost', 'licensorflow.com'],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ];
  },
};

module.exports = withSentryConfig(
  nextConfig,
  {
    silent: true,
    org: 'your-org',
    project: 'licensorflow',
  },
  {
    widenClientFileUpload: true,
    transpileClientSDK: true,
    tunnelRoute: '/monitoring',
    hideSourceMaps: true,
    disableLogger: true,
  }
);
'@ | Out-File -FilePath "next.config.js" -Encoding UTF8

Write-Host "✅ Created next.config.js" -ForegroundColor Green

Write-Host "`n✨ IMPLEMENTATION COMPLETE!" -ForegroundColor Green
Write-Host "=" * 60 -ForegroundColor DarkGray
Write-Host "`nAll files have been created successfully!" -ForegroundColor Green
Write-Host "`nNext steps:" -ForegroundColor Yellow
Write-Host "1. Create .env file with your credentials" -ForegroundColor White
Write-Host "2. Set up PostgreSQL database" -ForegroundColor White
Write-Host "3. Run: npx prisma migrate dev" -ForegroundColor White
Write-Host "4. Run: npm run dev" -ForegroundColor White
