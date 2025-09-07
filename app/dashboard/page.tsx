import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { cache } from '@/lib/redis';
import DashboardTabs from '@/components/dashboard/DashboardTabs';
import { Suspense } from 'react';

async function getDashboardData(userId: string) {
  // Use more specific cache key to prevent collisions
  const cacheKey = `dashboard:${userId}:${Date.now() - (Date.now() % 300000)}`; // 5-minute buckets
  
  // Try to get from cache first
  try {
    const cached = await cache.get(cacheKey);
    if (cached) {
      return cached;
    }
  } catch (error) {
    console.error('[Dashboard] Cache error:', error);
  }
  
  // Fetch from database
  const [user, enrollments, certificates, progress, notifications, recentPayments] = await Promise.all([
    prisma.user.findUnique({
      where: { id: userId },
      include: {
        subscriptions: {
          where: { status: 'ACTIVE' },
          orderBy: { createdAt: 'desc' },
          take: 1,
        },
      },
    }),
    prisma.enrollment.findMany({
      where: { userId },
      include: {
        course: {
          include: {
            instructor: {
              select: { name: true, firstName: true, lastName: true },
            },
          },
        },
      },
      orderBy: { enrolledAt: 'desc' },
    }),
    prisma.certificate.findMany({
      where: { userId },
      include: {
        course: {
          select: { title: true },
        },
      },
      orderBy: { issuedAt: 'desc' },
    }),
    prisma.courseProgress.findMany({
      where: { userId },
      include: {
        course: {
          select: { title: true, thumbnail: true },
        },
      },
      orderBy: { lastAccessedAt: 'desc' },
      take: 5,
    }),
    prisma.notification.findMany({
      where: { userId, read: false },
      orderBy: { createdAt: 'desc' },
      take: 10,
    }),
    prisma.payment.findMany({
      where: { userId, status: 'SUCCEEDED' },
      orderBy: { createdAt: 'desc' },
      take: 5,
    }),
  ]);
  
  const data = {
    user,
    enrollments,
    certificates,
    progress,
    notifications,
    recentPayments,
    stats: {
      totalCourses: enrollments.length,
      completedCourses: enrollments.filter(e => e.status === 'COMPLETED').length,
      activeCourses: enrollments.filter(e => e.status === 'ACTIVE').length,
      totalCertificates: certificates.length,
    },
  };
  
  // Cache the data
  try {
    await cache.set(cacheKey, data, 300); // Cache for 5 minutes
  } catch (error) {
    console.error('[Dashboard] Cache set error:', error);
  }
  
  return data;
}

export default async function DashboardPage() {
  const session = await auth();
  
  if (!session?.user) {
    redirect('/auth/login');
  }
  
  const dashboardData = await getDashboardData(session.user.id);
  
  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {(dashboardData as any).user?.name || (dashboardData as any).user?.firstName || 'Student'}!
          </h1>
          <p className="mt-2 text-gray-600">
            Track your compliance training progress and manage your certifications
          </p>
        </div>
        
        {/* Stats Grid */}
        <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg bg-white p-6 shadow">
            <div className="flex items-center">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600">Total Courses</p>
                <p className="text-2xl font-bold text-gray-900">
                  {(dashboardData as any).stats?.totalCourses || 0}
                </p>
              </div>
              <div className="ml-4 text-3xl">📚</div>
            </div>
          </div>
          
          <div className="rounded-lg bg-white p-6 shadow">
            <div className="flex items-center">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-green-600">
                  {(dashboardData as any).stats?.completedCourses || 0}
                </p>
              </div>
              <div className="ml-4 text-3xl">✅</div>
            </div>
          </div>
          
          <div className="rounded-lg bg-white p-6 shadow">
            <div className="flex items-center">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600">In Progress</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {(dashboardData as any).stats?.activeCourses}
                </p>
              </div>
              <div className="ml-4 text-3xl">⏳</div>
            </div>
          </div>
          
          <div className="rounded-lg bg-white p-6 shadow">
            <div className="flex items-center">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600">Certificates</p>
                <p className="text-2xl font-bold text-purple-600">
                  {(dashboardData as any).stats?.totalCertificates}
                </p>
              </div>
              <div className="ml-4 text-3xl">🏆</div>
            </div>
          </div>
        </div>
        
        {/* Notifications Alert */}
        {(dashboardData as any).notifications?.length > 0 && (
          <div className="mb-6 rounded-lg bg-blue-50 border border-blue-200 p-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-blue-800">
                  You have {(dashboardData as any).notifications.length} unread notification{(dashboardData as any).notifications.length > 1 ? 's' : ''}
                </p>
              </div>
            </div>
          </div>
        )}
        
        {/* Main Dashboard Content */}
        <Suspense fallback={
          <div className="flex items-center justify-center h-64">
            <div className="text-gray-500">Loading dashboard...</div>
          </div>
        }>
          <DashboardTabs data={dashboardData} />
        </Suspense>
      </div>
    </div>
  );
}
