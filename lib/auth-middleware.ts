import { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

// Lightweight auth check for middleware (Edge Runtime compatible)
export async function getSessionFromRequest(request: NextRequest) {
  try {
    const token = await getToken({ 
      req: request, 
      secret: process.env.NEXTAUTH_SECRET 
    });
    
    return token ? {
      user: {
        id: token.id as string,
        email: token.email as string,
        name: token.name as string,
        role: token.role as string,
        emailVerified: token.emailVerified as Date,
        image: token.picture as string,
      }
    } : null;
  } catch (error) {
    console.error('Auth middleware error:', error);
    return null;
  }
}
