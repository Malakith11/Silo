#!/usr/bin/env bash
# Dev environment UP script for the SILO project.
# Location: /workspaces/silo/scripts/dev-up.sh

set -euo pipefail

# ----------- CONFIG -----------
APP_DIR="${APP_DIR:-apps/platform}"
ROUTER_SCRIPT="scripts/run-router.sh"
ROUTER_LOG="artifacts/router.log"
WEB_LOG="artifacts/web.log"
STATE_DIR=".dev"
ROUTER_PID="${STATE_DIR}/router.pid"
WEB_PID="${STATE_DIR}/web.pid"

: "${LITELLM_PORT:=4100}"   # avoid Supabase Analytics default :4000
APP_PORT="${APP_PORT:-3000}"

REQUIRED_VARS_OPENAI=(OPENAI_API_KEY)
REQUIRED_VARS_PINECONE=(PINECONE_API_KEY)
REQUIRED_VARS_UPSTASH=(REDIS_URL)  # or REDIS_URL if you use a single URL
REQUIRED_VARS_CLERK=(NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY CLERK_SECRET_KEY)

TIMEOUT="8"   # curl timeout (seconds)
# ------------------------------

bold() { printf "\033[1m%s\033[0m\n" "$*"; }
info() { printf "➤ %s\n" "$*"; }
warn() { printf "⚠️  %s\n" "$*"; }
ok()   { printf "✅ %s\n" "$*"; }
fail() { printf "❌ %s\n" "$*"; }

export PATH="$HOME/.local/bin:$PATH"

need_cmd() { command -v "$1" >/dev/null 2>&1; }

check_env() {
  local missing=0
  for v in "$@"; do
    if [[ -z "${!v:-}" ]]; then
      warn "Missing env: $v"
      missing=1
    fi
  done
  [[ $missing -eq 0 ]]
}

check_port_free() {
  local port="$1"
  if ss -lnt 2>/dev/null | awk '{print $4}' | grep -q ":${port}\$"; then
    return 1
  fi
  return 0
}

load_env_files() {
  set -a
  [[ -f ".env" ]] && . ./.env
  [[ -f "apps/web/.env.local" ]] && . apps/web/.env.local
  [[ -f "apps/platform/.env.local" ]] && . apps/platform/.env.local
  set +a
}

ensure_litellm_cli() {
  if command -v litellm >/dev/null 2>&1; then
    return 0
  fi
  local pip_cmd=""
  if command -v pip >/dev/null 2>&1; then
    pip_cmd="pip"
  elif command -v pip3 >/dev/null 2>&1; then
    pip_cmd="pip3"
  elif command -v python3 >/dev/null 2>&1; then
    pip_cmd="python3 -m pip"
  elif command -v python >/dev/null 2>&1; then
    pip_cmd="python -m pip"
  fi
  if [[ -z "$pip_cmd" ]] && command -v apt-get >/dev/null 2>&1; then
    info "Installing python3-pip via apt-get"
    if command -v sudo >/dev/null 2>&1; then
      sudo apt-get update -y >/dev/null 2>&1 || true
      sudo apt-get install -y python3-pip >/dev/null 2>&1 || true
    else
      apt-get update -y >/dev/null 2>&1 || true
      apt-get install -y python3-pip >/dev/null 2>&1 || true
    fi
    if command -v pip3 >/dev/null 2>&1; then
      pip_cmd="pip3"
    elif command -v python3 >/dev/null 2>&1; then
      pip_cmd="python3 -m pip"
    fi
  fi
  if [[ -n "$pip_cmd" ]]; then
    info "Installing litellm CLI via $pip_cmd --user"
    if $pip_cmd install --user "litellm>=1.42" >/dev/null 2>&1; then
      hash -r
      export PATH="$HOME/.local/bin:$PATH"
      command -v litellm >/dev/null 2>&1 && return 0
    fi
  fi
  return 1
}

find_orchestrator() {
  if [[ -f "src/ai/orchestrator.ts" ]]; then echo "src/ai/orchestrator.ts"; return 0; fi
  if [[ -f "apps/web/src/ai/orchestrator.ts" ]]; then echo "apps/web/src/ai/orchestrator.ts"; return 0; fi
  return 1
}

check_agents_ready() {
  local okflag=1
  [[ -f "agents/contexts/GLOBALS.md" ]] || { warn "Missing agents/contexts/GLOBALS.md"; okflag=0; }
  [[ -f "agents/contexts/GLOBAL_SPEC.md" ]] || { warn "Missing agents/contexts/GLOBAL_SPEC.md"; okflag=0; }
  [[ -f "agents/manifests/ui.json" ]] || { warn "Missing agents/manifests/ui.json"; okflag=0; }
  [[ -f "agents/manifests/backend.json" ]] || { warn "Missing agents/manifests/backend.json"; okflag=0; }
  if ! find_orchestrator >/dev/null; then warn "Missing orchestrator (src/ai/orchestrator.ts or apps/web/src/ai/orchestrator.ts)"; okflag=0; fi
  (( okflag == 1 )) && ok "Agents & contexts look present." || warn "Agents not fully ready."
}

ensure_dirs() { mkdir -p "$(dirname "$ROUTER_LOG")" "$STATE_DIR"; }

print_header() {
  bold "SILO • dev-up"
  info "Workspace: $(pwd)"
  info "Node: $(node -v 2>/dev/null || echo 'missing')  PNPM: $(pnpm -v 2>/dev/null || echo 'missing')"
  info "Playwright: $(npx playwright --version 2>/dev/null || echo 'missing')"
  info "Supabase CLI: $(supabase --version 2>/dev/null || echo 'missing')"
  info "Docker: $(docker --version 2>/dev/null || echo 'missing')"
  echo
}

guide_enable_docker() {
  cat <<'EOF'
To run Supabase locally you need Docker access from the devcontainer.

1) In /.devcontainer/devcontainer.json add:
   "mounts": [
     "source=/var/run/docker.sock,target=/var/run/docker.sock,type=bind"
   ]

2) In /.devcontainer/Dockerfile add:
   RUN apt-get update && apt-get install -y docker.io && rm -rf /var/lib/apt/lists/*

3) Rebuild the container (VS Code → “Dev Containers: Rebuild Container”).

Alternatively, run `supabase start` from a host shell outside VS Code and the
devcontainer will connect via http://host.docker.internal.
EOF
}

detect_supabase_mode() {
  if [[ "${SUPABASE_FORCE_LOCAL:-}" == "1" ]]; then
    echo "local"
    return
  fi

  local url="${SUPABASE_URL:-${NEXT_PUBLIC_SUPABASE_URL:-}}"
  if [[ -z "$url" ]]; then
    echo "unknown"
    return
  fi

  if [[ "$url" =~ supabase\.co ]]; then
    echo "remote"
  else
    echo "local"
  fi
}

verify_supabase_remote() {
  local url="${SUPABASE_URL:-${NEXT_PUBLIC_SUPABASE_URL:-}}"
  if [[ -z "$url" ]]; then
    warn "Supabase URL not set; unable to verify hosted Supabase."
    return
  fi

  local rest_endpoint="${url%/}/rest/v1/"
  local headers=()
  if [[ -n "${NEXT_PUBLIC_SUPABASE_ANON_KEY:-}" ]]; then
    headers+=(-H "apikey: ${NEXT_PUBLIC_SUPABASE_ANON_KEY}")
  fi

  info "Supabase: checking hosted endpoint (${rest_endpoint})..."
  local code
  code=$(curl -s -o /dev/null -w "%{http_code}" --max-time "$TIMEOUT" "${headers[@]}" "$rest_endpoint" || true)
  if [[ "$code" =~ ^(200|401|404)$ ]]; then
    ok "Hosted Supabase reachable (HTTP $code)."
  else
    warn "Supabase endpoint returned HTTP $code. Verify NEXT_PUBLIC_SUPABASE_URL/KEY."
  fi
}

verify_supabase_local() {
  local target_host="${SUPABASE_LOCAL_HOST:-host.docker.internal}"
  local target_port="${SUPABASE_LOCAL_PORT:-5432}"
  info "Supabase: probing local instance at ${target_host}:${target_port}..."
  if command -v nc >/dev/null 2>&1 && nc -z "$target_host" "$target_port" >/dev/null 2>&1; then
    ok "Supabase database reachable on ${target_host}:${target_port}."
  else
    warn "Supabase database not reachable on ${target_host}:${target_port}. Run 'supabase start' in a host terminal if you need the local stack."
  fi
}

start_supabase_if_possible() {
  local mode
  mode=$(detect_supabase_mode)

  case "$mode" in
    remote)
      info "Detected hosted Supabase project (${NEXT_PUBLIC_SUPABASE_URL:-$SUPABASE_URL}). Skipping local startup."
      verify_supabase_remote
      return
      ;;
    local)
      if [[ "${SUPABASE_ALLOW_IN_CONTAINER:-0}" == "1" ]]; then
        if ! need_cmd docker || ! need_cmd supabase; then
          fail "Docker or Supabase CLI missing — cannot start Supabase locally."
          guide_enable_docker
          return
        fi
        info "Starting Supabase locally (requested via SUPABASE_ALLOW_IN_CONTAINER=1)..."
        if supabase start --debug; then
          ok "Supabase started inside devcontainer."
        else
          fail "Supabase failed to start. Run 'supabase start --debug' on the host for more details."
        fi
        return
      fi

      verify_supabase_local
      ;;
    *)
      warn "Supabase mode unknown (set NEXT_PUBLIC_SUPABASE_URL or SUPABASE_URL)."
      ;;
  esac
}

start_router() {
  if [[ ! -x "$ROUTER_SCRIPT" ]]; then
    warn "Router script not found or not executable: $ROUTER_SCRIPT"
    warn "Expected at /workspaces/silo/$ROUTER_SCRIPT"
    return
  fi
  if [[ -f "$ROUTER_PID" ]] && kill -0 "$(cat "$ROUTER_PID")" 2>/dev/null; then
    ok "LiteLLM router already running (PID $(cat "$ROUTER_PID"))."
    return
  fi
  if ! check_env "${REQUIRED_VARS_OPENAI[@]}"; then
    warn "OpenAI key missing. Export before running router:"
    echo "   export OPENAI_API_KEY=sk-..."
    return
  fi
  if ! ensure_litellm_cli; then
    fail "litellm CLI missing. Install with 'pip install --user litellm' or make sure it is on PATH."
    return
  fi
  local router_config="${LITELLM_CONFIG:-litellm.config.yaml}"
  if [[ ! -f "$router_config" ]]; then
    warn "Router config missing (${router_config}); skipping LiteLLM start."
    return
  fi
  if ! check_port_free "$LITELLM_PORT"; then
    warn "Port $LITELLM_PORT is busy. If Supabase Analytics uses 4000, prefer LITELLM_PORT=4100."
  fi
  info "Starting LiteLLM router on :$LITELLM_PORT ..."
  (LITELLM_PORT="$LITELLM_PORT" nohup bash "$ROUTER_SCRIPT" "$router_config" >"$ROUTER_LOG" 2>&1 & echo $! > "$ROUTER_PID")
  sleep 1
  if kill -0 "$(cat "$ROUTER_PID")" 2>/dev/null; then ok "Router started (PID $(cat "$ROUTER_PID")). Log: $ROUTER_LOG"; else fail "Router failed. See log: $ROUTER_LOG"; fi
}

start_app() {
  if [[ ! -d "$APP_DIR" ]]; then warn "App dir not found: $APP_DIR"; return; fi
  if [[ -f "$WEB_PID" ]] && kill -0 "$(cat "$WEB_PID")" 2>/dev/null; then
    ok "Web dev server already running (PID $(cat "$WEB_PID"))."
    return
  fi
  if ! check_port_free "$APP_PORT"; then warn "Port $APP_PORT appears busy. Is the app already running?"; fi
  info "Installing deps with pnpm (workspace root) ..."
  pnpm install --frozen-lockfile
  info "Starting Next.js dev server in $APP_DIR on :$APP_PORT ..."
  (pnpm --dir "$APP_DIR" dev >"$WEB_LOG" 2>&1 & echo $! > "$WEB_PID")
  sleep 2
  if kill -0 "$(cat "$WEB_PID")" 2>/dev/null; then ok "Web started (PID $(cat "$WEB_PID")). Log: $WEB_LOG"; else fail "Web failed. See log: $WEB_LOG"; fi
}

# ------------------- SMOKE CHECKS -------------------

smoke_openai() {
  if ! check_env "${REQUIRED_VARS_OPENAI[@]}"; then warn "Skipping OpenAI smoke (missing env)."; return; fi
  info "OpenAI: checking API key..."
  local code
  code=$(curl -s -o /dev/null -w "%{http_code}" \
    -H "Authorization: Bearer ${OPENAI_API_KEY}" \
    --max-time "$TIMEOUT" https://api.openai.com/v1/models || true)
  [[ "$code" == "200" ]] && ok "OpenAI reachable." || warn "OpenAI check returned HTTP $code"
}

smoke_pinecone() {
  if ! check_env "${REQUIRED_VARS_PINECONE[@]}"; then warn "Skipping Pinecone smoke (missing env)."; return; fi
  info "Pinecone: checking API key..."
  # Newer endpoint
  local code
  code=$(curl -s -o /dev/null -w "%{http_code}" \
    -H "Api-Key: ${PINECONE_API_KEY}" \
    --max-time "$TIMEOUT" https://api.pinecone.io/actions/whoami || true)
  # Treat 200/401/403/404 as "reachable" (auth or route variations across accounts)
  [[ "$code" =~ ^(200|401|403|404)$ ]] && ok "Pinecone reachable (HTTP $code)." || warn "Pinecone check HTTP $code"
}


smoke_upstash() {
  # Prefer Upstash REST if provided
  if [[ -n "${UPSTASH_REDIS_REST_URL:-}" && -n "${UPSTASH_REDIS_REST_TOKEN:-}" ]]; then
    info "Upstash Redis (REST): PING ..."
    local body
    body=$(curl -s -H "Authorization: Bearer ${UPSTASH_REDIS_REST_TOKEN}" \
      --max-time "$TIMEOUT" "${UPSTASH_REDIS_REST_URL}/PING" || true)
    if [[ "$body" =~ PONG ]]; then ok "Upstash REST reachable (PONG)."; else warn "Upstash REST failed. Resp: ${body:-<none>}"; fi
    return
  fi
  # Fallback: REDIS_URL presence check (no redis-cli in image by default)
  if [[ -n "${REDIS_URL:-}" ]]; then
    ok "Redis URL present (REDIS_URL set)."
  else
    warn "Skipping Redis smoke (provide UPSTASH_REDIS_REST_URL & token, or REDIS_URL)."
  fi
}


smoke_clerk() {
  if ! check_env "${REQUIRED_VARS_CLERK[@]}"; then warn "Skipping Clerk smoke (missing env)."; return; fi
  info "Clerk: checking secret key access..."
  # Minimal list users (limit 1). Requires CLERK_SECRET_KEY.
  local code
  code=$(curl -s -o /dev/null -w "%{http_code}" \
    -H "Authorization: Bearer ${CLERK_SECRET_KEY}" \
    --max-time "$TIMEOUT" "https://api.clerk.com/v1/users?limit=1" || true)
  [[ "$code" == "200" ]] && ok "Clerk reachable." || warn "Clerk check HTTP $code"
}

smoke_supabase_api() {
  local url="${SUPABASE_URL:-${NEXT_PUBLIC_SUPABASE_URL:-}}"

  if [[ -n "$url" ]]; then
    local rest_endpoint="${url%/}/rest/v1/"
    local headers=()
    if [[ -n "${NEXT_PUBLIC_SUPABASE_ANON_KEY:-}" ]]; then
      headers+=(-H "apikey: ${NEXT_PUBLIC_SUPABASE_ANON_KEY}")
    fi

    info "Supabase REST smoke (${rest_endpoint})..."
    local code
    code=$(curl -s -o /dev/null -w "%{http_code}" --max-time "$TIMEOUT" "${headers[@]}" "$rest_endpoint" || true)
    if [[ "$code" =~ ^(200|401|404)$ ]]; then
      ok "Supabase REST reachable (HTTP $code)."
    else
      warn "Supabase REST returned HTTP $code"
    fi
    return
  fi

  local target_host="${SUPABASE_LOCAL_HOST:-host.docker.internal}"
  local target_port="${SUPABASE_LOCAL_PORT:-8000}"
  info "Supabase REST smoke via ${target_host}:${target_port}..."
  local code
  code=$(curl -s -o /dev/null -w "%{http_code}" --max-time "$TIMEOUT" "http://${target_host}:${target_port}" || true)
  if [[ "$code" =~ ^(200|404)$ ]]; then
    ok "Supabase REST reachable on ${target_host}:${target_port} (HTTP $code)."
  else
    warn "Supabase REST not reachable on ${target_host}:${target_port}."
  fi
}


print_next_steps() {
  cat <<EOF

────────────────────────────────────────────────────────
Next steps:
- App:           http://localhost:${APP_PORT}
- Supabase Studio (if running):  http://localhost:3001
- LiteLLM Router (if running):   http://localhost:${LITELLM_PORT}

Orchestrator example:
  pnpm ai ui compass "Task: Add AEGIS quality badge to COMPASS cards; add tests."

Integrations checklist:
$(check_env "${REQUIRED_VARS_PINECONE[@]}" && echo "✅ Pinecone env present" || echo "⚠️  Missing Pinecone vars: ${REQUIRED_VARS_PINECONE[*]}") 
$(check_env "${REQUIRED_VARS_UPSTASH[@]}" && echo "✅ Upstash Redis env present" || echo "⚠️  Missing Upstash vars: ${REQUIRED_VARS_UPSTASH[*]}") 
$(check_env "${REQUIRED_VARS_CLERK[@]}" && echo "✅ Clerk env present" || echo "⚠️  Missing Clerk vars: ${REQUIRED_VARS_CLERK[*]}")

Run the e2e smoke (Playwright Chrome):
  pnpm exec playwright test

Logs:
  - Router: ${ROUTER_LOG}
  - Web:    ${WEB_LOG}
────────────────────────────────────────────────────────
EOF
}

main() {
  print_header
  ensure_dirs
  load_env_files
  check_agents_ready
  start_supabase_if_possible
  start_router
  start_app

  # Smoke the third-parties (non-fatal)
  smoke_openai
  smoke_pinecone
  smoke_upstash
  smoke_clerk
  smoke_supabase_api

  print_next_steps
}
main "$@"
ensure_litellm_cli() {
  if command -v litellm >/dev/null 2>&1; then
    return 0
  fi
  if command -v pip >/dev/null 2>&1; then
    info "Installing litellm CLI via pip --user"
    if pip install --user "litellm>=1.42" >/dev/null 2>&1; then
      hash -r
      export PATH="$HOME/.local/bin:$PATH"
      command -v litellm >/dev/null 2>&1 && return 0
    fi
  fi
  return 1
}
