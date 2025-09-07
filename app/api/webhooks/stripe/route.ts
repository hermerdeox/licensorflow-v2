import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import Stripe from 'stripe';
import { prisma } from '@/lib/prisma';
import { stripe, constructWebhookEvent } from '@/lib/stripe';
import * as Sentry from '@sentry/nextjs';

export async function POST(req: NextRequest) {
  const body = await req.text();
  const headersList = await headers();
  const signature = headersList.get('Stripe-Signature') as string;
  
  let event: Stripe.Event;
  
  try {
    event = constructWebhookEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error) {
    console.error('[Stripe Webhook] Error verifying signature:', error);
    return NextResponse.json(
      { error: 'Invalid signature' },
      { status: 400 }
    );
  }
  
  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        
        if (session.mode === 'subscription') {
          const client = stripe();
          if (!client) {
            throw new Error('Stripe client not configured');
          }
          
          const subscription = await client.subscriptions.retrieve(
            session.subscription as string
          );
          
          await prisma.subscription.create({
            data: {
              userId: session.metadata?.userId!,
              stripeSubscriptionId: subscription.id,
              stripePriceId: subscription.items.data[0].price.id,
              stripeProductId: subscription.items.data[0].price.product as string,
              status: subscription.status.toUpperCase() as any,
              currentPeriodStart: new Date(subscription.current_period_start * 1000),
              currentPeriodEnd: new Date(subscription.current_period_end * 1000),
              cancelAtPeriodEnd: subscription.cancel_at_period_end,
              metadata: subscription.metadata || {},
            },
          });
          
          // Create notification for user
          await prisma.notification.create({
            data: {
              userId: session.metadata?.userId!,
              title: 'Subscription Activated',
              message: 'Your subscription has been successfully activated.',
              type: 'SUCCESS',
            },
          });
        } else if (session.mode === 'payment') {
          // Handle one-time payment for course
          const client = stripe();
          if (!client) {
            throw new Error('Stripe client not configured');
          }
          
          const lineItems = await client.checkout.sessions.listLineItems(session.id);
          const courseId = session.metadata?.courseId;
          
          if (courseId) {
            await prisma.enrollment.create({
              data: {
                userId: session.metadata?.userId!,
                courseId: courseId,
                status: 'ACTIVE',
              },
            });
            
            await prisma.payment.create({
              data: {
                userId: session.metadata?.userId!,
                stripePaymentId: session.payment_intent as string,
                amount: session.amount_total! / 100,
                currency: session.currency!,
                status: 'SUCCEEDED',
                description: `Course purchase: ${courseId}`,
                metadata: session.metadata || {},
              },
            });
          }
        }
        break;
      }
      
      case 'customer.subscription.created':
      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription;
        
        await prisma.subscription.upsert({
          where: { stripeSubscriptionId: subscription.id },
          create: {
            userId: subscription.metadata.userId!,
            stripeSubscriptionId: subscription.id,
            stripePriceId: subscription.items.data[0].price.id,
            stripeProductId: subscription.items.data[0].price.product as string,
            status: subscription.status.toUpperCase() as any,
            currentPeriodStart: new Date(subscription.current_period_start * 1000),
            currentPeriodEnd: new Date(subscription.current_period_end * 1000),
            cancelAtPeriodEnd: subscription.cancel_at_period_end,
            canceledAt: subscription.canceled_at ? new Date(subscription.canceled_at * 1000) : null,
            trialStart: subscription.trial_start ? new Date(subscription.trial_start * 1000) : null,
            trialEnd: subscription.trial_end ? new Date(subscription.trial_end * 1000) : null,
            metadata: subscription.metadata || {},
          },
          update: {
            status: subscription.status.toUpperCase() as any,
            currentPeriodStart: new Date(subscription.current_period_start * 1000),
            currentPeriodEnd: new Date(subscription.current_period_end * 1000),
            cancelAtPeriodEnd: subscription.cancel_at_period_end,
            canceledAt: subscription.canceled_at ? new Date(subscription.canceled_at * 1000) : null,
            metadata: subscription.metadata || {},
          },
        });
        break;
      }
      
      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        
        await prisma.subscription.update({
          where: { stripeSubscriptionId: subscription.id },
          data: {
            status: 'CANCELED',
            endedAt: new Date(),
          },
        });
        
        await prisma.notification.create({
          data: {
            userId: subscription.metadata.userId!,
            title: 'Subscription Canceled',
            message: 'Your subscription has been canceled.',
            type: 'WARNING',
          },
        });
        break;
      }
      
      case 'invoice.payment_succeeded': {
        const invoice = event.data.object as Stripe.Invoice;
        
        if (invoice.subscription && invoice.metadata?.userId) {
          await prisma.payment.create({
            data: {
              userId: invoice.metadata.userId,
              stripePaymentId: invoice.payment_intent as string,
              stripeInvoiceId: invoice.id,
              amount: invoice.amount_paid / 100,
              currency: invoice.currency,
              status: 'SUCCEEDED',
              description: invoice.description,
              metadata: invoice.metadata || {},
            },
          });
        }
        break;
      }
      
      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice;
        
        if (invoice.subscription && invoice.metadata?.userId) {
          await prisma.payment.create({
            data: {
              userId: invoice.metadata.userId,
              stripePaymentId: invoice.payment_intent as string,
              stripeInvoiceId: invoice.id,
              amount: invoice.amount_due / 100,
              currency: invoice.currency,
              status: 'FAILED',
              description: invoice.description,
              metadata: invoice.metadata || {},
            },
          });
          
          await prisma.notification.create({
            data: {
              userId: invoice.metadata.userId,
              title: 'Payment Failed',
              message: 'Your payment failed. Please update your payment method.',
              type: 'ERROR',
              actionUrl: '/dashboard/billing',
            },
          });
          
          // Update subscription status
          if (invoice.subscription) {
            await prisma.subscription.update({
              where: { stripeSubscriptionId: invoice.subscription as string },
              data: { status: 'PAST_DUE' },
            });
          }
        }
        break;
      }
      
      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        
        if (paymentIntent.metadata?.userId) {
          await prisma.payment.upsert({
            where: { stripePaymentId: paymentIntent.id },
            create: {
              userId: paymentIntent.metadata.userId,
              stripePaymentId: paymentIntent.id,
              amount: paymentIntent.amount / 100,
              currency: paymentIntent.currency,
              status: 'SUCCEEDED',
              description: paymentIntent.description,
              metadata: paymentIntent.metadata || {},
            },
            update: {
              status: 'SUCCEEDED',
            },
          });
        }
        break;
      }
      
      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        
        if (paymentIntent.metadata?.userId) {
          await prisma.payment.upsert({
            where: { stripePaymentId: paymentIntent.id },
            create: {
              userId: paymentIntent.metadata.userId,
              stripePaymentId: paymentIntent.id,
              amount: paymentIntent.amount / 100,
              currency: paymentIntent.currency,
              status: 'FAILED',
              description: paymentIntent.description,
              metadata: paymentIntent.metadata || {},
            },
            update: {
              status: 'FAILED',
            },
          });
        }
        break;
      }
    }
    
    // Log the webhook event
    await prisma.auditLog.create({
      data: {
        action: `STRIPE_WEBHOOK_${event.type.toUpperCase()}`,
        entityType: 'WEBHOOK',
        entityId: event.id,
        metadata: {
          type: event.type,
          livemode: event.livemode,
        },
      },
    });
    
    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('[Stripe Webhook] Error processing event:', error);
    Sentry.captureException(error, {
      extra: { eventType: event.type, eventId: event.id },
    });
    
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    );
  }
}
