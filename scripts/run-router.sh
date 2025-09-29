#!/usr/bin/env bash
# Location: /workspaces/silo/scripts/run-router.sh
set -euo pipefail

if ! command -v litellm >/dev/null 2>&1; then
  echo "litellm CLI not found. Install it first (e.g. pip install litellm)." >&2
  exit 1
fi

: "${OPENAI_API_KEY:?Set OPENAI_API_KEY}"
PORT="${LITELLM_PORT:-4100}"
CONFIG="${1:-litellm.config.yaml}"

if [[ ! -f "$CONFIG" ]]; then
  echo "Router config not found: $CONFIG" >&2
  exit 1
fi

echo "Starting LiteLLM on :$PORT (OpenAI only) using $CONFIG"
exec litellm --config "$CONFIG" --port "$PORT"
