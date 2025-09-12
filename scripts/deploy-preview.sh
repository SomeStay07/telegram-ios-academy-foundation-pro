#!/bin/bash

# Quick deploy current branch to preview environment
# Usage: ./scripts/deploy-preview.sh [api|miniapp|bot|all]

set -e

CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
CLEAN_BRANCH_NAME=$(echo $CURRENT_BRANCH | sed 's/[^a-zA-Z0-9-]/-/g')
SERVICE=${1:-"all"}

echo "🚀 Deploying $SERVICE for branch: $CURRENT_BRANCH"

# Check if Railway CLI is installed and user is logged in
if ! command -v railway &> /dev/null; then
    echo "❌ Railway CLI not found. Please run './scripts/setup-railway-preview.sh' first."
    exit 1
fi

if ! railway whoami &> /dev/null; then
    echo "❌ Not logged in to Railway. Please run 'railway login' first."
    exit 1
fi

# Function to deploy a service
deploy_service() {
    local SERVICE_TYPE=$1
    local SERVICE_NAME="${SERVICE_TYPE}-preview-${CLEAN_BRANCH_NAME}"
    
    echo "📦 Deploying $SERVICE_NAME..."
    
    # Switch to the preview service
    if railway service "$SERVICE_NAME" 2>/dev/null; then
        # Deploy current branch
        railway up --detach
        echo "✅ $SERVICE_NAME deployed successfully"
        echo "🌐 URL: https://$SERVICE_NAME.up.railway.app"
    else
        echo "❌ Service $SERVICE_NAME not found. Please run './scripts/setup-railway-preview.sh' first."
        return 1
    fi
}

# Deploy based on service parameter
case $SERVICE in
    "api")
        deploy_service "api"
        ;;
    "miniapp")
        deploy_service "miniapp"
        ;;
    "bot") 
        deploy_service "bot"
        ;;
    "all")
        echo "🚀 Deploying all services..."
        deploy_service "api"
        deploy_service "miniapp"
        deploy_service "bot"
        ;;
    *)
        echo "❌ Invalid service. Use: api, miniapp, bot, or all"
        exit 1
        ;;
esac

echo ""
echo "🎉 Deployment complete!"
echo ""
echo "📍 Your preview URLs:"
echo "   🔧 API: https://api-preview-${CLEAN_BRANCH_NAME}.up.railway.app"
echo "   📱 MiniApp: https://miniapp-preview-${CLEAN_BRANCH_NAME}.up.railway.app"  
echo "   🤖 Bot: https://bot-preview-${CLEAN_BRANCH_NAME}.up.railway.app"