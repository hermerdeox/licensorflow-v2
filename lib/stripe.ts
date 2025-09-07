import Stripe from 'stripe';

let stripe: Stripe | null = null;

function getStripeClient() {
  if (!stripe && process.env.STRIPE_SECRET_KEY) {
    stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2025-02-24.acacia',
      typescript: true,
    });
  }
  return stripe;
}

export { getStripeClient as stripe };

export async function createStripeCustomer(user: {
  id: string;
  email: string;
  name?: string | null;
}) {
  try {
    const client = getStripeClient();
    if (!client) {
      throw new Error('Stripe client not configured');
    }
    
    const customer = await client.customers.create({
      email: user.email,
      name: user.name || undefined,
      metadata: {
        userId: user.id,
      },
    });
    
    return customer;
  } catch (error) {
    console.error('[Stripe] Error creating customer:', error);
    throw error;
  }
}

export async function createCheckoutSession({
  customerId,
  priceId,
  successUrl,
  cancelUrl,
  metadata,
  mode = 'subscription',
}: {
  customerId: string;
  priceId: string;
  successUrl: string;
  cancelUrl: string;
  metadata?: Record<string, string>;
  mode?: 'payment' | 'subscription';
}) {
  try {
    const client = getStripeClient();
    if (!client) {
      throw new Error('Stripe client not configured');
    }
    
    const session = await client.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode,
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata,
      allow_promotion_codes: true,
      billing_address_collection: 'required',
      customer_update: {
        address: 'auto',
      },
      automatic_tax: {
        enabled: true,
      },
    });
    
    return session;
  } catch (error) {
    console.error('[Stripe] Error creating checkout session:', error);
    throw error;
  }
}

export async function createPortalSession(customerId: string, returnUrl: string) {
  try {
    const client = getStripeClient();
    if (!client) {
      throw new Error('Stripe client not configured');
    }
    
    const session = await client.billingPortal.sessions.create({
      customer: customerId,
      return_url: returnUrl,
    });
    
    return session;
  } catch (error) {
    console.error('[Stripe] Error creating portal session:', error);
    throw error;
  }
}

export async function cancelSubscription(subscriptionId: string) {
  try {
    const client = getStripeClient();
    if (!client) {
      throw new Error('Stripe client not configured');
    }
    
    const subscription = await client.subscriptions.update(subscriptionId, {
      cancel_at_period_end: true,
    });
    
    return subscription;
  } catch (error) {
    console.error('[Stripe] Error canceling subscription:', error);
    throw error;
  }
}

export async function resumeSubscription(subscriptionId: string) {
  try {
    const client = getStripeClient();
    if (!client) {
      throw new Error('Stripe client not configured');
    }
    
    const subscription = await client.subscriptions.update(subscriptionId, {
      cancel_at_period_end: false,
    });
    
    return subscription;
  } catch (error) {
    console.error('[Stripe] Error resuming subscription:', error);
    throw error;
  }
}

export function constructWebhookEvent(
  payload: string | Buffer,
  signature: string,
  secret: string
) {
  try {
    const client = getStripeClient();
    if (!client) {
      throw new Error('Stripe client not configured');
    }
    
    return client.webhooks.constructEvent(payload, signature, secret);
  } catch (error) {
    console.error('[Stripe] Webhook signature verification failed:', error);
    throw error;
  }
}

export async function createProduct(name: string, description?: string) {
  try {
    const client = getStripeClient();
    if (!client) {
      throw new Error('Stripe client not configured');
    }
    
    const product = await client.products.create({
      name,
      description,
      metadata: {
        type: 'course',
      },
    });
    
    return product;
  } catch (error) {
    console.error('[Stripe] Error creating product:', error);
    throw error;
  }
}

export async function createPrice(productId: string, amount: number, currency = 'usd', recurring = false) {
  try {
    const client = getStripeClient();
    if (!client) {
      throw new Error('Stripe client not configured');
    }
    
    const priceData: Stripe.PriceCreateParams = {
      product: productId,
      unit_amount: Math.round(amount * 100), // Convert to cents
      currency,
    };
    
    if (recurring) {
      priceData.recurring = {
        interval: 'month',
      };
    }
    
    const price = await client.prices.create(priceData);
    
    return price;
  } catch (error) {
    console.error('[Stripe] Error creating price:', error);
    throw error;
  }
}
