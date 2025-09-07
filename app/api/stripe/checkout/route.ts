import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { createStripeCustomer, createCheckoutSession } from '@/lib/stripe';
import { z } from 'zod';
import * as Sentry from '@sentry/nextjs';

const CheckoutSchema = z.object({
  priceId: z.string(),
  mode: z.enum(['payment', 'subscription']).optional(),
  courseId: z.string().optional(),
  successUrl: z.string().optional(),
  cancelUrl: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const body = await request.json();
    const validatedData = CheckoutSchema.parse(body);
    
    let user = await prisma.user.findUnique({
      where: { id: session.user.id },
    });
    
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }
    
    let customerId = user.stripeCustomerId;
    
    // Create Stripe customer if doesn't exist
    if (!customerId) {
      const customer = await createStripeCustomer({
        id: user.id,
        email: user.email!,
        name: user.name || `${user.firstName} ${user.lastName}`.trim() || undefined,
      });
      
      customerId = customer.id;
      
      await prisma.user.update({
        where: { id: user.id },
        data: { stripeCustomerId: customerId },
      });
    }
    
    // Prepare metadata
    const metadata: Record<string, string> = {
      userId: user.id,
    };
    
    if (validatedData.courseId) {
      metadata.courseId = validatedData.courseId;
    }
    
    // Create checkout session
    const checkoutSession = await createCheckoutSession({
      customerId,
      priceId: validatedData.priceId,
      successUrl: validatedData.successUrl || `${process.env.NEXTAUTH_URL}/dashboard?success=true`,
      cancelUrl: validatedData.cancelUrl || `${process.env.NEXTAUTH_URL}/pricing`,
      metadata,
      mode: validatedData.mode,
    });
    
    // Log the checkout attempt
    await prisma.auditLog.create({
      data: {
        userId: user.id,
        action: 'CHECKOUT_SESSION_CREATED',
        entityType: 'PAYMENT',
        entityId: checkoutSession.id,
        metadata: {
          priceId: validatedData.priceId,
          mode: validatedData.mode,
          courseId: validatedData.courseId,
        },
      },
    });
    
    return NextResponse.json({ url: checkoutSession.url });
  } catch (error) {
    console.error('[Checkout] Error:', error);
    Sentry.captureException(error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input', details: error.errors },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
