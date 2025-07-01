#!/usr/bin/env bash
set -euo pipefail

echo "🚀 Starting Supabase..."
supabase start
supabase status

echo "📦 Installing web dependencies..."
cd apps/web
pnpm install

echo "🔥 Launching Next.js…"
pnpm dev -- --hostname 0.0.0.0
