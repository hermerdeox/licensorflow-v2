# Railway Deployment Guide for LicensorFlow

## Prerequisites

1. Railway account (https://railway.app)
2. GitHub repository connected to Railway
3. Domain name (optional, Railway provides free subdomain)

## Environment Variables

Set these environment variables in your Railway project dashboard:

### Required Variables

```bash
# Application
NODE_ENV=production
PORT=3000
NEXTAUTH_URL=https://your-app-name.railway.app
NEXTAUTH_SECRET=your-nextauth-secret-here

# Database (Railway PostgreSQL)
DATABASE_URL=postgresql://username:password@host:port/database

# Redis (Railway Redis) - Optional
REDIS_URL=redis://username:password@host:port

# Email Configuration
EMAIL_SERVER_HOST=smtp.gmail.com
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER=your-email@gmail.com
EMAIL_SERVER_PASSWORD=your-app-password
EMAIL_FROM=noreply@licensorflow.com

# Stripe (for payments)
STRIPE_PUBLISHABLE_KEY=pk_live_your_stripe_publishable_key
STRIPE_SECRET_KEY=sk_live_your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret

# Monitoring
SENTRY_DSN=your-sentry-dsn-here

# Security
ENCRYPTION_KEY=your-32-character-encryption-key

# Feature Flags
ENABLE_ANALYTICS=true
ENABLE_MONITORING=true
```

## Deployment Steps

### 1. Connect Repository

1. Go to Railway dashboard
2. Click "New Project"
3. Select "Deploy from GitHub repo"
4. Choose your LicensorFlow repository
5. Select the main branch

### 2. Add Database

1. In your Railway project, click "New"
2. Select "Database" → "PostgreSQL"
3. Railway will automatically set the `DATABASE_URL` environment variable

### 3. Add Redis (Optional)

1. In your Railway project, click "New"
2. Select "Database" → "Redis"
3. Railway will automatically set the `REDIS_URL` environment variable

### 4. Configure Environment Variables

1. Go to your service settings
2. Click on "Variables" tab
3. Add all the required environment variables listed above
4. Make sure to use your actual values for secrets

### 5. Deploy

1. Railway will automatically build and deploy your application
2. The build process will:
   - Install dependencies
   - Generate Prisma client
   - Build the Next.js application
   - Start the production server

### 6. Database Setup

After deployment, run database migrations:

1. Go to your Railway service
2. Click on "Deployments" tab
3. Click on the latest deployment
4. Go to "Logs" tab
5. Run: `npx prisma db push`

Or connect to your Railway database and run:
```bash
npx prisma db push
```

## Custom Domain (Optional)

1. In your Railway project, go to "Settings"
2. Click on "Domains"
3. Add your custom domain
4. Update your DNS records as instructed
5. Update `NEXTAUTH_URL` environment variable

## Monitoring

Railway provides built-in monitoring:
- CPU and memory usage
- Request logs
- Error tracking
- Performance metrics

## Health Checks

The application includes health checks at `/api/health` that Railway will use to monitor the service.

## Scaling

Railway automatically handles:
- Load balancing
- Auto-scaling based on traffic
- Zero-downtime deployments

## Troubleshooting

### Common Issues

1. **Build Failures**
   - Check build logs in Railway dashboard
   - Ensure all environment variables are set
   - Verify package.json scripts

2. **Database Connection Issues**
   - Verify DATABASE_URL is correct
   - Check if database service is running
   - Ensure Prisma client is generated

3. **Authentication Issues**
   - Verify NEXTAUTH_URL matches your domain
   - Check NEXTAUTH_SECRET is set
   - Ensure all OAuth providers are configured

### Logs

View logs in Railway dashboard:
1. Go to your service
2. Click on "Deployments"
3. Select a deployment
4. Click on "Logs" tab

## Security Considerations

1. **Environment Variables**
   - Never commit secrets to repository
   - Use Railway's secure environment variable storage
   - Rotate secrets regularly

2. **Database Security**
   - Use Railway's managed PostgreSQL
   - Enable SSL connections
   - Regular backups

3. **Application Security**
   - Enable HTTPS (automatic with Railway)
   - Use secure session cookies
   - Implement rate limiting

## Performance Optimization

1. **Caching**
   - Enable Redis for session storage
   - Use Next.js built-in caching
   - Implement CDN for static assets

2. **Database Optimization**
   - Use connection pooling
   - Optimize queries
   - Add proper indexes

3. **Build Optimization**
   - Use multi-stage Docker builds
   - Minimize bundle size
   - Enable compression

## Backup Strategy

1. **Database Backups**
   - Railway provides automatic backups
   - Export data regularly
   - Test restore procedures

2. **Code Backups**
   - Use Git for version control
   - Tag releases
   - Maintain deployment history

## Support

- Railway Documentation: https://docs.railway.app
- Railway Community: https://discord.gg/railway
- LicensorFlow Support: support@licensorflow.com
