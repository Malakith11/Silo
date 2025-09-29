#!/usr/bin/env bash
# Dev environment DOWN script for the SILO project.
# Location: /workspaces/silo/scripts/dev-down.sh

set -euo pipefail

STATE_DIR=".dev"
ROUTER_PID="${STATE_DIR}/router.pid"
WEB_PID="${STATE_DIR}/web.pid"

stop_pid() {
  local pidfile="$1" name="$2"
  if [[ -f "$pidfile" ]]; then
    local pid
    pid="$(cat "$pidfile")"
    if kill -0 "$pid" 2>/dev/null; then
      echo "➤ Stopping $name (PID $pid)..."
      kill "$pid" || true
      sleep 1
      if kill -0 "$pid" 2>/dev/null; then
        echo "  Forcing $name..."
        kill -9 "$pid" || true
      fi
    fi
    rm -f "$pidfile"
  else
    echo "• $name not tracked (no $pidfile)."
  fi
}

echo "SILO • dev-down"

stop_pid "$WEB_PID" "Web dev server"
stop_pid "$ROUTER_PID" "LiteLLM router"

# Clean up any stray Next.js dev servers that might not be tracked
if pgrep -f "next dev" >/dev/null 2>&1 || pgrep -f "next-server" >/dev/null 2>&1; then
  echo "➤ Stopping stray Next.js processes..."
  pkill -f "next dev" >/dev/null 2>&1 || true
  pkill -f "next-server" >/dev/null 2>&1 || true
fi

# Supabase (requires docker + supabase CLI)
if command -v docker >/dev/null 2>&1 && command -v supabase >/dev/null 2>&1; then
  echo "➤ Stopping Supabase stack..."
  supabase stop || true
else
  echo "• Skipping Supabase stop (docker or supabase CLI missing)."
fi

echo "✅ All done."
