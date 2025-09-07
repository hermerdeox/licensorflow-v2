import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getSessionFromRequest } from '@/lib/auth-middleware';

const publicRoutes = [
  '/',
  '/auth/login',
  '/auth/register',
  '/auth/forgot-password',
  '/auth/reset-password',
  '/auth/verify',
  '/api/auth',
  '/api/webhooks',
];

const authRoutes = [
  '/auth/login',
  '/auth/register',
  '/auth/forgot-password',
  '/auth/reset-password',
];

const adminRoutes = ['/admin'];
const instructorRoutes = ['/instructor'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Allow webhook routes without rate limiting
  if (pathname.startsWith('/api/webhooks/')) {
    return NextResponse.next();
  }
  
  // Rate limiting for API routes (simplified without Redis dependency in middleware)
  if (pathname.startsWith('/api/') && !pathname.startsWith('/api/auth')) {
    const ip = request.headers.get('x-forwarded-for') || 
               request.headers.get('x-real-ip') || 
               'anonymous';
    
    // Add rate limit headers (actual limiting will be done in API routes)
    const response = NextResponse.next();
    response.headers.set('X-Client-IP', ip);
    return response;
  }
  
  const session = await getSessionFromRequest(request);
  const isLoggedIn = !!session?.user;
  const isPublicRoute = publicRoutes.some(route => 
    pathname === route || pathname.startsWith(`${route}/`)
  );
  const isAuthRoute = authRoutes.some(route => 
    pathname === route || pathname.startsWith(`${route}/`)
  );
  const isAdminRoute = adminRoutes.some(route => 
    pathname.startsWith(route)
  );
  const isInstructorRoute = instructorRoutes.some(route => 
    pathname.startsWith(route)
  );
  
  // Redirect logged-in users away from auth pages
  if (isLoggedIn && isAuthRoute) {
    const role = session.user.role;
    if (role === 'ADMIN') {
      return NextResponse.redirect(new URL('/admin', request.url));
    } else if (role === 'INSTRUCTOR') {
      return NextResponse.redirect(new URL('/instructor', request.url));
    } else {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  }
  
  // Redirect non-logged-in users to login
  if (!isLoggedIn && !isPublicRoute && !isAuthRoute) {
    const callbackUrl = encodeURIComponent(pathname);
    return NextResponse.redirect(
      new URL(`/auth/login?callbackUrl=${callbackUrl}`, request.url)
    );
  }
  
  // Check role-based access
  if (isLoggedIn) {
    const userRole = session.user.role;
    
    if (isAdminRoute && userRole !== 'ADMIN') {
      return NextResponse.redirect(new URL('/unauthorized', request.url));
    }
    
    if (isInstructorRoute && userRole !== 'INSTRUCTOR' && userRole !== 'ADMIN') {
      return NextResponse.redirect(new URL('/unauthorized', request.url));
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.png|.*\\.jpg|.*\\.jpeg|.*\\.gif|.*\\.svg|.*\\.ico|.*\\.webp).*)'],
};
