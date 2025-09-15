#!/bin/bash

# Setup Railway Preview Deployments
# This script creates preview environments for feature branch testing

set -e

echo "🚀 Setting up Railway Preview Deployments..."

# Check if Railway CLI is installed
if ! command -v railway &> /dev/null; then
    echo "❌ Railway CLI not found. Installing..."
    curl -fsSL https://railway.app/install.sh | sh
    echo "✅ Railway CLI installed"
fi

# Login to Railway (if not already logged in)
echo "🔐 Checking Railway authentication..."
if ! railway whoami &> /dev/null; then
    echo "Please login to Railway:"
    railway login
fi

PROJECT_NAME="telegram-ios-academy-foundation-pro"
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)

echo "📋 Current project: $PROJECT_NAME"
echo "🌿 Current branch: $CURRENT_BRANCH"

# Create preview services for the current feature branch
create_preview_service() {
    local SERVICE_NAME=$1
    local ROOT_DIR=$2
    local START_CMD=$3
    local PORT=$4
    
    local PREVIEW_NAME="${SERVICE_NAME}-preview-$(echo $CURRENT_BRANCH | sed 's/[^a-zA-Z0-9-]/-/g')"
    
    echo "🏗️  Creating preview service: $PREVIEW_NAME"
    
    # Create new service
    railway service create "$PREVIEW_NAME" || echo "Service might already exist"
    
    # Connect to the service
    railway service "$PREVIEW_NAME"
    
    # Set environment variables
    case $SERVICE_NAME in
        "api")
            railway variables set \
                NODE_ENV=preview \
                PORT=$PORT \
                API_PUBLIC_ORIGIN="https://$PREVIEW_NAME.up.railway.app" \
                ALLOWED_ORIGINS="*" \
                CSP_REPORT_ONLY="1" \
                NIXPACKS_BUILD_CMD="cd apps/api && pnpm install && pnpm prisma generate && pnpm build" \
                NIXPACKS_START_CMD="cd apps/api && pnpm start" \
                RAILWAY_DOCKERFILE_PATH="apps/api/Dockerfile"
            ;;
        "miniapp") 
            railway variables set \
                NODE_ENV=preview \
                PORT=$PORT \
                VITE_API_URL="https://api-preview-$(echo $CURRENT_BRANCH | sed 's/[^a-zA-Z0-9-]/-/g').up.railway.app" \
                NIXPACKS_BUILD_CMD="pnpm install && pnpm build --filter=@telegram-ios-academy/miniapp" \
                NIXPACKS_START_CMD="cd apps/miniapp && pnpm serve"
            ;;
        "bot")
            railway variables set \
                NODE_ENV=preview \
                PORT=$PORT \
                API_URL="https://api-preview-$(echo $CURRENT_BRANCH | sed 's/[^a-zA-Z0-9-]/-/g').up.railway.app" \
                MINIAPP_URL="https://miniapp-preview-$(echo $CURRENT_BRANCH | sed 's/[^a-zA-Z0-9-]/-/g').up.railway.app" \
                NIXPACKS_BUILD_CMD="cd apps/bot && pnpm install && pnpm build" \
                NIXPACKS_START_CMD="cd apps/bot && pnpm start" \
                RAILWAY_DOCKERFILE_PATH="apps/bot/Dockerfile"
            ;;
    esac
    
    # Connect GitHub repository
    railway connect "$PROJECT_NAME"
    
    # Set branch tracking
    railway environment "$PREVIEW_NAME"
    
    echo "✅ Preview service $PREVIEW_NAME created and configured"
    echo "🌐 Will be available at: https://$PREVIEW_NAME.up.railway.app"
}

# Create preview services
echo "🏗️  Creating preview services for branch: $CURRENT_BRANCH"

create_preview_service "api" "apps/api" "pnpm start" "3000"
create_preview_service "miniapp" "apps/miniapp" "pnpm serve" "5173"
create_preview_service "bot" "apps/bot" "pnpm start" "3001"

echo ""
echo "🎉 Preview deployments setup complete!"
echo ""
echo "📍 Your preview URLs will be:"
echo "   🔧 API: https://api-preview-$(echo $CURRENT_BRANCH | sed 's/[^a-zA-Z0-9-]/-/g').up.railway.app"
echo "   📱 MiniApp: https://miniapp-preview-$(echo $CURRENT_BRANCH | sed 's/[^a-zA-Z0-9-]/-/g').up.railway.app"  
echo "   🤖 Bot: https://bot-preview-$(echo $CURRENT_BRANCH | sed 's/[^a-zA-Z0-9-]/-/g').up.railway.app"
echo ""
echo "⚡ To deploy your current branch:"
echo "   railway up --service api-preview-$(echo $CURRENT_BRANCH | sed 's/[^a-zA-Z0-9-]/-/g')"
echo "   railway up --service miniapp-preview-$(echo $CURRENT_BRANCH | sed 's/[^a-zA-Z0-9-]/-/g')"
echo "   railway up --service bot-preview-$(echo $CURRENT_BRANCH | sed 's/[^a-zA-Z0-9-]/-/g')"
echo ""
echo "🧹 To cleanup preview deployments later:"
echo "   ./scripts/cleanup-railway-preview.sh $CURRENT_BRANCH"