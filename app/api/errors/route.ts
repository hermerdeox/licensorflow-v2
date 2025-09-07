import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const errorData = await request.json();
    
    // Validate error data
    if (!errorData.message || !errorData.context) {
      return NextResponse.json(
        { error: 'Invalid error data' },
        { status: 400 }
      );
    }

    // Log error to database
    await prisma.auditLog.create({
      data: {
        action: 'ERROR_REPORTED',
        entityType: 'ERROR',
        entityId: `error_${Date.now()}`,
        metadata: {
          message: errorData.message,
          stack: errorData.stack,
          context: errorData.context,
          severity: errorData.severity,
          category: errorData.category,
          timestamp: new Date().toISOString()
        },
        ipAddress: request.headers.get('x-forwarded-for') || 
                   request.headers.get('x-real-ip') || 
                   'unknown',
        userAgent: request.headers.get('user-agent') || 'unknown'
      }
    });

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Error reported:', errorData);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to log error:', error);
    return NextResponse.json(
      { error: 'Failed to log error' },
      { status: 500 }
    );
  }
}
