#!/usr/bin/env bash
set -euo pipefail

echo "🛑 Stopping Supabase…"
supabase stop || true
