import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { createPortalSession } from '@/lib/stripe';
import * as Sentry from '@sentry/nextjs';

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { stripeCustomerId: true },
    });
    
    if (!user?.stripeCustomerId) {
      return NextResponse.json(
        { error: 'No billing account found' },
        { status: 404 }
      );
    }
    
    const portalSession = await createPortalSession(
      user.stripeCustomerId,
      `${process.env.NEXTAUTH_URL}/dashboard/billing`
    );
    
    // Log the portal access
    await prisma.auditLog.create({
      data: {
        userId: session.user.id,
        action: 'BILLING_PORTAL_ACCESSED',
        entityType: 'BILLING',
        entityId: portalSession.id,
      },
    });
    
    return NextResponse.json({ url: portalSession.url });
  } catch (error) {
    console.error('[Billing Portal] Error:', error);
    Sentry.captureException(error);
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
