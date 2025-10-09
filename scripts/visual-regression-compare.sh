#!/bin/bash

# Visual Regression Testing - Compare current branch against master
# This script generates screenshots from both branches and compares them

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

BASE_BRANCH=${1:-master}
BASELINE_DIR=".baseline"

echo -e "${GREEN}Visual Regression Testing: Comparing against ${BASE_BRANCH}${NC}"
echo ""

# Step 1: Build current branch
echo -e "${YELLOW}[1/6] Building current branch...${NC}"
npm run build

# Step 2: Generate page list from current branch
echo -e "${YELLOW}[2/6] Generating page list...${NC}"
npm run visual:generate-pages

# Step 3: Start dev server for current branch in background
echo -e "${YELLOW}[3/6] Starting server for current branch...${NC}"
npm run serve > /dev/null 2>&1 &
SERVER_PID=$!

# Wait for server to be ready
sleep 5

# Step 4: Generate current screenshots
echo -e "${YELLOW}[4/6] Capturing screenshots of current branch...${NC}"
LOST_PIXEL_MODE=baseline npm run lost-pixel:run || true

# Stop the server
kill $SERVER_PID 2>/dev/null || true
sleep 2

# Step 5: Checkout baseline branch and build
echo -e "${YELLOW}[5/6] Building baseline from ${BASE_BRANCH}...${NC}"

# Store current branch name
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)

# Create a temporary directory for baseline
rm -rf "$BASELINE_DIR"
mkdir -p "$BASELINE_DIR"

# Clone current repo state to baseline directory
git clone -b "$BASE_BRANCH" --depth 1 file://$(pwd) "$BASELINE_DIR" 2>/dev/null || {
    echo -e "${RED}Failed to checkout ${BASE_BRANCH}${NC}"
    exit 1
}

# Build baseline
cd "$BASELINE_DIR"
npm ci --prefer-offline --no-audit 2>/dev/null
npm run build
npm run visual:generate-pages

# Start server for baseline on different port
PORT=3001 npm run serve > /dev/null 2>&1 &
BASELINE_SERVER_PID=$!
cd ..

# Wait for baseline server
sleep 5

# Step 6: Generate baseline screenshots and compare
echo -e "${YELLOW}[6/6] Capturing baseline screenshots and comparing...${NC}"
LOST_PIXEL_MODE=current LOST_PIXEL_BASE_URL=http://localhost:3001 npm run lost-pixel:run || {
    COMPARE_RESULT=$?

    # Cleanup
    kill $BASELINE_SERVER_PID 2>/dev/null || true

    if [ $COMPARE_RESULT -eq 0 ]; then
        echo -e "${GREEN}✓ No visual differences detected!${NC}"
        echo ""
        echo "All screenshots match between current branch and ${BASE_BRANCH}"
    else
        echo -e "${RED}✗ Visual differences detected!${NC}"
        echo ""
        echo "Screenshots differ between current branch and ${BASE_BRANCH}"
        echo "Review the differences in:"
        echo "  - .lostpixel/difference/  (highlighted changes)"
        echo "  - .lostpixel/baseline/    (${BASE_BRANCH} screenshots)"
        echo "  - .lostpixel/current/     (current branch screenshots)"
    fi

    exit $COMPARE_RESULT
}

# Cleanup on success
kill $BASELINE_SERVER_PID 2>/dev/null || true

echo -e "${GREEN}✓ No visual differences detected!${NC}"
echo ""
echo "All screenshots match between current branch and ${BASE_BRANCH}"
