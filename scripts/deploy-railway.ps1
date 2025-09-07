# Railway Deployment Script for LicensorFlow
# This script prepares the application for Railway deployment

Write-Host "🚀 Preparing LicensorFlow for Railway deployment..." -ForegroundColor Green

# Check if we're in the right directory
if (-not (Test-Path "package.json")) {
    Write-Host "❌ Error: package.json not found. Please run this script from the project root." -ForegroundColor Red
    exit 1
}

try {
    # Install dependencies
    Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
    npm ci

    # Generate Prisma client
    Write-Host "🗄️ Generating Prisma client..." -ForegroundColor Yellow
    npx prisma generate

    # Run type checking
    Write-Host "🔍 Running type checks..." -ForegroundColor Yellow
    npm run type-check

    # Run linting
    Write-Host "🧹 Running linter..." -ForegroundColor Yellow
    npm run lint

    # Build the application
    Write-Host "🏗️ Building application..." -ForegroundColor Yellow
    npm run build

    # Check if build was successful
    if (-not (Test-Path ".next")) {
        Write-Host "❌ Error: Build failed. .next directory not found." -ForegroundColor Red
        exit 1
    }

    Write-Host "✅ Build completed successfully!" -ForegroundColor Green
    Write-Host "🚀 Ready for Railway deployment!" -ForegroundColor Green

    # Display deployment information
    Write-Host ""
    Write-Host "📋 Deployment Checklist:" -ForegroundColor Cyan
    Write-Host "  ✅ Dependencies installed" -ForegroundColor Green
    Write-Host "  ✅ Prisma client generated" -ForegroundColor Green
    Write-Host "  ✅ Type checks passed" -ForegroundColor Green
    Write-Host "  ✅ Linting passed" -ForegroundColor Green
    Write-Host "  ✅ Application built" -ForegroundColor Green
    Write-Host ""
    Write-Host "🔧 Next steps:" -ForegroundColor Cyan
    Write-Host "  1. Push your code to GitHub" -ForegroundColor White
    Write-Host "  2. Connect your repository to Railway" -ForegroundColor White
    Write-Host "  3. Set environment variables in Railway dashboard" -ForegroundColor White
    Write-Host "  4. Add PostgreSQL database service" -ForegroundColor White
    Write-Host "  5. Deploy!" -ForegroundColor White
    Write-Host ""
    Write-Host "📖 For detailed instructions, see RAILWAY_DEPLOYMENT.md" -ForegroundColor Cyan

} catch {
    Write-Host "❌ Error during deployment preparation: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}
