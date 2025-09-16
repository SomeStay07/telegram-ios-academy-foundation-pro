#!/bin/bash

# Cleanup Railway Preview Deployments
# This script removes preview environments after feature branch is merged

set -e

BRANCH_NAME=${1:-$(git rev-parse --abbrev-ref HEAD)}
CLEAN_BRANCH_NAME=$(echo $BRANCH_NAME | sed 's/[^a-zA-Z0-9-]/-/g')

echo "🧹 Cleaning up Railway preview deployments for branch: $BRANCH_NAME"

# Check if Railway CLI is installed and user is logged in
if ! command -v railway &> /dev/null; then
    echo "❌ Railway CLI not found. Please install it first."
    exit 1
fi

if ! railway whoami &> /dev/null; then
    echo "❌ Not logged in to Railway. Please run 'railway login' first."
    exit 1
fi

# Function to delete a preview service
delete_preview_service() {
    local SERVICE_TYPE=$1
    local SERVICE_NAME="${SERVICE_TYPE}-preview-${CLEAN_BRANCH_NAME}"
    
    echo "🗑️  Deleting preview service: $SERVICE_NAME"
    
    # Check if service exists and delete it
    if railway service list | grep -q "$SERVICE_NAME"; then
        railway service delete "$SERVICE_NAME" --yes || echo "⚠️  Could not delete $SERVICE_NAME"
        echo "✅ Deleted $SERVICE_NAME"
    else
        echo "⚠️  Service $SERVICE_NAME not found (might already be deleted)"
    fi
}

# Delete preview services
delete_preview_service "api"
delete_preview_service "miniapp" 
delete_preview_service "bot"

echo ""
echo "✅ Cleanup complete for branch: $BRANCH_NAME"
echo "💡 Remember to also delete the feature branch if it's merged:"
echo "   git branch -d $BRANCH_NAME"
echo "   git push origin --delete $BRANCH_NAME"