#!/bin/bash

# LicensorFlow Instant Rollback Script
# Emergency rollback in < 30 seconds

set -e

echo "🔄 EMERGENCY ROLLBACK INITIATED"
echo "================================"

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Record rollback reason
echo -e "${YELLOW}Rollback reason:${NC}"
read -p "Enter reason for rollback: " REASON
echo "$(date): Rollback initiated - $REASON" >> rollback.log

# Phase 1: Immediate traffic stop
echo -e "\n${YELLOW}Phase 1: Stopping Traffic${NC}"
docker-compose stop nginx || true
echo -e "${GREEN}✓ Traffic stopped${NC}"

# Phase 2: Restore previous version
echo -e "\n${YELLOW}Phase 2: Restoring Previous Version${NC}"
if [ -f "backup/docker-compose.backup.yml" ]; then
    cp backup/docker-compose.backup.yml docker-compose.yml
    echo -e "${GREEN}✓ Configuration restored${NC}"
fi

# Phase 3: Restart services with previous version
echo -e "\n${YELLOW}Phase 3: Restarting Services${NC}"
docker-compose down
docker-compose up -d
echo -e "${GREEN}✓ Services restarted${NC}"

# Phase 4: Verify rollback
echo -e "\n${YELLOW}Phase 4: Verifying Rollback${NC}"
sleep 5
health_check=$(curl -s http://localhost:3000/api/health | grep -o '"status":"healthy"' || echo "failed")
if [[ $health_check == *"healthy"* ]]; then
    echo -e "${GREEN}✓ Rollback successful${NC}"
else
    echo -e "${RED}✗ Rollback verification failed${NC}"
fi

echo -e "\n${GREEN}Rollback completed in $(($SECONDS)) seconds${NC}"
