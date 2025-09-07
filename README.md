# LicensorFlow v2 - Healthcare Compliance Platform

A comprehensive healthcare compliance and training platform built with Next.js, designed to streamline compliance management, training, and license tracking for healthcare organizations.

## 🚀 Features

### Core Functionality
- **HIPAA Training Modules** - Comprehensive compliance training
- **OSHA Safety Courses** - Workplace safety and certification programs
- **Software Certifications** - Training for Epic, Cerner, Dentrix, and more
- **License Management** - Automated tracking and renewal alerts
- **Compliance Dashboard** - Real-time monitoring and reporting
- **Team Management** - User roles and progress tracking

### Technical Features
- **Modern Stack** - Next.js 15, React 19, TypeScript
- **Authentication** - NextAuth v5 with multiple providers
- **Database** - Prisma ORM with PostgreSQL/SQLite support
- **Styling** - Tailwind CSS with dark theme
- **Animations** - Framer Motion for smooth interactions
- **Payments** - Stripe integration for subscriptions
- **Monitoring** - Sentry error tracking and performance monitoring

## 📁 Project Structure

```
licensorflow/
├── app/                    # Next.js App Router pages
│   ├── (auth)/            # Authentication pages
│   ├── (dashboard)/       # Dashboard pages
│   ├── api/               # API routes
│   ├── features/          # Feature pages
│   ├── pricing/           # Pricing page
│   ├── contact/           # Contact page
│   └── ...                # Other pages
├── components/            # React components
├── lib/                   # Utility libraries
├── prisma/                # Database schema and migrations
├── public/                # Static assets
├── scripts/               # Deployment and utility scripts
└── ...                    # Configuration files
```

## 🛠️ Technology Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS, Framer Motion
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: PostgreSQL (production), SQLite (development)
- **Authentication**: NextAuth v5
- **Payments**: Stripe
- **Monitoring**: Sentry
- **Deployment**: Railway, Docker

## 🚀 Quick Start

### Prerequisites
- Node.js 20+
- npm or yarn
- PostgreSQL (for production)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/hermerdeox/licensorflow-v2.git
   cd licensorflow-v2
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

4. **Set up the database**
   ```bash
   npx prisma generate
   npx prisma db push
   npx prisma db seed
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📋 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript checks
- `npm run test` - Run tests
- `npm run db:push` - Push database schema
- `npm run db:migrate` - Run database migrations
- `npm run db:seed` - Seed database with sample data
- `npm run db:studio` - Open Prisma Studio

## 🚀 Deployment

### Railway Deployment (Recommended)

This project is fully configured for Railway deployment:

1. **Connect to Railway**
   - Go to [Railway.app](https://railway.app)
   - Connect your GitHub repository
   - Add PostgreSQL database service

2. **Set Environment Variables**
   - See `RAILWAY_DEPLOYMENT.md` for complete list
   - Configure authentication, database, and payment settings

3. **Deploy**
   - Railway will automatically build and deploy
   - Database migrations run automatically

### Docker Deployment

```bash
# Build the Docker image
docker build -t licensorflow .

# Run the container
docker run -p 3000:3000 licensorflow
```

## 📚 Documentation

- [Railway Deployment Guide](RAILWAY_DEPLOYMENT.md)
- [Deployment Checklist](RAILWAY_CHECKLIST.md)
- [API Documentation](app/api-docs/page.tsx)

## 🔧 Configuration

### Environment Variables

Required environment variables:

```bash
# Application
NODE_ENV=production
NEXTAUTH_URL=https://your-domain.com
NEXTAUTH_SECRET=your-secret-key

# Database
DATABASE_URL=postgresql://user:password@host:port/database

# Email (optional)
EMAIL_SERVER_HOST=smtp.gmail.com
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER=your-email@gmail.com
EMAIL_SERVER_PASSWORD=your-app-password

# Stripe (optional)
STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

## 🏗️ Architecture

### Frontend
- **Next.js App Router** for file-based routing
- **React Server Components** for optimal performance
- **Client Components** for interactive features
- **Middleware** for authentication and routing

### Backend
- **API Routes** for server-side logic
- **Prisma ORM** for database operations
- **NextAuth** for authentication
- **Stripe** for payment processing

### Database
- **PostgreSQL** for production
- **SQLite** for development
- **Prisma Migrations** for schema management

## 🔒 Security

- **Authentication** with NextAuth v5
- **Authorization** with role-based access control
- **Data Validation** with Zod schemas
- **Rate Limiting** for API endpoints
- **CSRF Protection** built into NextAuth
- **Secure Headers** configured in Next.js

## 📊 Monitoring

- **Error Tracking** with Sentry
- **Performance Monitoring** with built-in metrics
- **Health Checks** at `/api/health`
- **Logging** with structured logs

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is proprietary software. All rights reserved.

## 📞 Support

- **Email**: support@licensorflow.com
- **Phone**: +1 877 344 3423
- **Documentation**: See the docs folder

## 🎯 Roadmap

- [ ] Mobile app development
- [ ] Advanced analytics dashboard
- [ ] AI-powered compliance recommendations
- [ ] Multi-tenant architecture
- [ ] Advanced reporting features
- [ ] Integration marketplace

---

**LicensorFlow v2** - Transforming healthcare compliance management through technology.