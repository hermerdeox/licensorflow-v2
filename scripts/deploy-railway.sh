#!/bin/bash

# Railway Deployment Script for LicensorFlow
# This script prepares the application for Railway deployment

set -e

echo "🚀 Preparing LicensorFlow for Railway deployment..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from the project root."
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm ci

# Generate Prisma client
echo "🗄️ Generating Prisma client..."
npx prisma generate

# Run type checking
echo "🔍 Running type checks..."
npm run type-check

# Run linting
echo "🧹 Running linter..."
npm run lint

# Build the application
echo "🏗️ Building application..."
npm run build

# Check if build was successful
if [ ! -d ".next" ]; then
    echo "❌ Error: Build failed. .next directory not found."
    exit 1
fi

echo "✅ Build completed successfully!"
echo "🚀 Ready for Railway deployment!"

# Display deployment information
echo ""
echo "📋 Deployment Checklist:"
echo "  ✅ Dependencies installed"
echo "  ✅ Prisma client generated"
echo "  ✅ Type checks passed"
echo "  ✅ Linting passed"
echo "  ✅ Application built"
echo ""
echo "🔧 Next steps:"
echo "  1. Push your code to GitHub"
echo "  2. Connect your repository to Railway"
echo "  3. Set environment variables in Railway dashboard"
echo "  4. Add PostgreSQL database service"
echo "  5. Deploy!"
echo ""
echo "📖 For detailed instructions, see RAILWAY_DEPLOYMENT.md"
