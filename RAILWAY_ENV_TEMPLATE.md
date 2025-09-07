# Railway Environment Variables Template

Copy these environment variables to your Railway project dashboard:

## Required Environment Variables

```bash
# Database
DATABASE_URL=postgresql://username:password@hostname:port/database?schema=public

# NextAuth
NEXTAUTH_URL=https://your-app.railway.app
NEXTAUTH_SECRET=your-super-secret-key-here

# App Configuration
NODE_ENV=production
NEXT_TELEMETRY_DISABLED=1
```

## Optional Environment Variables

```bash
# Stripe (if using)
STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Email (if using)
RESEND_API_KEY=re_...
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# Redis (if using)
REDIS_URL=redis://username:password@hostname:port

# Sentry (if using)
SENTRY_DSN=https://your-dsn@sentry.io/project-id
```

## How to Set Environment Variables in Railway

1. Go to your Railway project dashboard
2. Click on your service
3. Go to the "Variables" tab
4. Add each variable with its value
5. Deploy the service

## Security Notes

- Generate a strong NEXTAUTH_SECRET (32+ characters)
- Use production database credentials
- Never commit these values to version control
- Use Railway's built-in secret management
