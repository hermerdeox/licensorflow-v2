#!/bin/bash

# LicensorFlow Deployment Script
# Created by EOXLabs Warrior Team

set -e

echo "🚀 LICENSORFLOW DEPLOYMENT INITIATED"
echo "======================================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to check command success
check_status() {
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✓ $1 successful${NC}"
    else
        echo -e "${RED}✗ $1 failed${NC}"
        exit 1
    fi
}

# Phase 1: Pre-deployment checks
echo -e "\n${YELLOW}Phase 1: Pre-deployment Checks${NC}"
echo "--------------------------------"

# Check Node.js version
node_version=$(node -v)
echo "Node.js version: $node_version"

# Check npm version
npm_version=$(npm -v)
echo "npm version: $npm_version"

# Check for required environment variables
if [ ! -f .env.production ]; then
    echo -e "${RED}Warning: .env.production not found${NC}"
    echo "Creating from .env.example..."
    cp .env.example .env.production
fi

# Phase 2: Build application
echo -e "\n${YELLOW}Phase 2: Building Application${NC}"
echo "------------------------------"

# Install dependencies
echo "Installing dependencies..."
npm ci --production
check_status "Dependency installation"

# Generate Prisma client
echo "Generating Prisma client..."
npx prisma generate
check_status "Prisma generation"

# Run database migrations
echo "Running database migrations..."
npx prisma db push
check_status "Database migration"

# Build Next.js application
echo "Building Next.js application..."
npm run build
check_status "Application build"

# Phase 3: Docker deployment
echo -e "\n${YELLOW}Phase 3: Docker Deployment${NC}"
echo "---------------------------"

# Build Docker image
echo "Building Docker image..."
docker build -t licensorflow:latest .
check_status "Docker build"

# Stop existing containers
echo "Stopping existing containers..."
docker-compose down || true

# Start new containers
echo "Starting new containers..."
docker-compose up -d
check_status "Container startup"

# Wait for health check
echo "Waiting for application to be healthy..."
sleep 10

# Check health endpoint
health_check=$(curl -s http://localhost:3000/api/health | grep -o '"status":"healthy"' || echo "failed")
if [[ $health_check == *"healthy"* ]]; then
    echo -e "${GREEN}✓ Health check passed${NC}"
else
    echo -e "${RED}✗ Health check failed${NC}"
    echo "Rolling back..."
    docker-compose down
    exit 1
fi

# Phase 4: Post-deployment
echo -e "\n${YELLOW}Phase 4: Post-deployment${NC}"
echo "-------------------------"

# Seed database (if needed)
echo "Checking database seed status..."
if [ "$1" == "--seed" ]; then
    echo "Seeding database..."
    npm run db:seed
    check_status "Database seeding"
fi

# Clear cache
echo "Clearing application cache..."
docker exec licensorflow-redis-1 redis-cli FLUSHALL || true

# Phase 5: Verification
echo -e "\n${YELLOW}Phase 5: Deployment Verification${NC}"
echo "---------------------------------"

# Check all services
echo "Checking service status..."
docker-compose ps

# Display access URLs
echo -e "\n${GREEN}🎉 DEPLOYMENT SUCCESSFUL!${NC}"
echo "========================="
echo -e "Application URL: ${GREEN}http://localhost:3000${NC}"
echo -e "Monitoring: ${GREEN}http://localhost:3001${NC} (Grafana)"
echo -e "Metrics: ${GREEN}http://localhost:9090${NC} (Prometheus)"
echo ""
echo "To view logs: docker-compose logs -f app"
echo "To stop: docker-compose down"
echo "To rollback: ./rollback.sh"
