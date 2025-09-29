#!/usr/bin/env bash
set -euo pipefail

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 Supabase Deployment Script${NC}"
echo "This script will help you deploy your local Supabase changes to production."
echo

# Check if supabase CLI is available
if ! command -v supabase &> /dev/null; then
    echo -e "${RED}❌ Supabase CLI not found. Please install it first.${NC}"
    exit 1
fi

if ! command -v jq &> /dev/null; then
    echo -e "${YELLOW}⚠️  jq not found. Status output may be limited.${NC}"
fi

STATUS_JSON=$(supabase status -o json 2>/dev/null)
if [ -z "$STATUS_JSON" ]; then
    echo -e "${RED}❌ Supabase CLI is not linked to a project.${NC}"
    echo -e "${BLUE}ℹ️  Run ${NC}'supabase link --project-ref <your-project-ref>'${BLUE} before deploying.${NC}"
    exit 1
fi

PROJECT_REF=$(printf '%s' "$STATUS_JSON" | jq -r '.project_ref // empty')
if [ -z "$PROJECT_REF" ]; then
    echo -e "${RED}❌ Unable to determine linked project reference.${NC}"
    echo -e "${BLUE}ℹ️  Re-run ${NC}'supabase link --project-ref <your-project-ref>'${BLUE} before deploying.${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Supabase CLI linked to project:${NC} $PROJECT_REF"

# PROJECT_REF already captured from the linked status above.
echo
echo -e "${YELLOW}📋 Pre-deployment checklist for project ${PROJECT_REF}:${NC}"
echo "1. Make sure your local Supabase is running and up to date"
echo "2. Test your migrations locally first"
echo "3. Backup production data if needed"
echo

read -p "Have you tested your changes locally? (y/N): " TESTED_LOCALLY
if [[ ! "$TESTED_LOCALLY" =~ ^[Yy]$ ]]; then
    echo -e "${RED}❌ Please test locally first with 'supabase start' and your app${NC}"
    exit 1
fi

# Check for pending migrations
echo
echo -e "${BLUE}🔍 Checking for migrations...${NC}"
MIGRATIONS=$(ls supabase/migrations/*.sql 2>/dev/null | wc -l)
if [ "$MIGRATIONS" -gt 0 ]; then
    echo -e "${GREEN}Found $MIGRATIONS migration(s)${NC}"
    ls -la supabase/migrations/*.sql
    echo
    read -p "Deploy these migrations to production? (y/N): " DEPLOY_MIGRATIONS

    if [[ "$DEPLOY_MIGRATIONS" =~ ^[Yy]$ ]]; then
        echo -e "${BLUE}📤 Pushing database changes...${NC}"
        supabase db push
        echo -e "${GREEN}✅ Database migrations deployed${NC}"
    else
        echo -e "${YELLOW}⏭️  Skipping database migrations${NC}"
    fi
else
    echo -e "${YELLOW}ℹ️  No migrations found${NC}"
fi

# Check for edge functions
echo
echo -e "${BLUE}🔍 Checking for Edge Functions...${NC}"
if [ -d "supabase/functions" ] && [ "$(ls -A supabase/functions)" ]; then
    echo -e "${GREEN}Found Edge Functions:${NC}"
    ls -la supabase/functions/
    echo
    read -p "Deploy all Edge Functions? (y/N): " DEPLOY_FUNCTIONS

    if [[ "$DEPLOY_FUNCTIONS" =~ ^[Yy]$ ]]; then
        echo -e "${BLUE}📤 Deploying Edge Functions...${NC}"
        supabase functions deploy
        echo -e "${GREEN}✅ Edge Functions deployed${NC}"
    else
        echo -e "${YELLOW}⏭️  Skipping Edge Functions${NC}"
    fi
else
    echo -e "${YELLOW}ℹ️  No Edge Functions found${NC}"
fi

# Generate types (optional)
echo
read -p "Generate TypeScript types for your project? (y/N): " GENERATE_TYPES
if [[ "$GENERATE_TYPES" =~ ^[Yy]$ ]]; then
    echo -e "${BLUE}📝 Generating TypeScript types...${NC}"
    supabase gen types typescript --project-id "$PROJECT_REF" > apps/web/src/types/supabase.ts
    echo -e "${GREEN}✅ Types generated at apps/web/src/types/supabase.ts${NC}"
fi

# Environment variables reminder
echo
echo -e "${YELLOW}🔧 Environment Variables Reminder:${NC}"
echo "Don't forget to update your production environment variables:"
echo "- NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co"
echo "- NEXT_PUBLIC_SUPABASE_ANON_KEY=your-production-anon-key"
echo
echo "You can find these in your Supabase dashboard under Settings > API"

# Final status check
echo
echo -e "${BLUE}📊 Checking deployment status...${NC}"
supabase status --output json | jq -r '.[] | select(.name == "API") | "API URL: " + .api_url'

echo
echo -e "${GREEN}🎉 Deployment complete!${NC}"
echo "Your Supabase backend changes have been deployed to production."
echo "Next steps:"
echo "1. Update your frontend environment variables"
echo "2. Deploy your frontend application"
echo "3. Test the production deployment"
