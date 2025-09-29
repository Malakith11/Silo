#!/usr/bin/env bash
# Post-rebuild bootstrap script run inside the VS Code devcontainer.
# Installs core tooling, refreshes Playwright & Supabase CLI, and performs
# light-weight verification so the workspace is ready to go after a rebuild.

set -euo pipefail

ROOT="/workspaces/silo"
cd "$ROOT"

APT_UPDATED=0

log_step() { printf '\n▶ %s\n' "$*"; }
log_info() { printf '   • %s\n' "$*"; }
log_warn() { printf '⚠️  %s\n' "$*"; }
log_ok()  { printf '✅ %s\n' "$*"; }

ensure_apt_package() {
  local pkg="$1" bin="$2"
  if command -v "$2" >/dev/null 2>&1; then
    return
  fi
  if ! command -v apt-get >/dev/null 2>&1; then
    log_warn "apt-get not available; please install $pkg manually."
    return
  fi
  if command -v sudo >/dev/null 2>&1; then
    (( APT_UPDATED == 1 )) || { sudo apt-get update -y; APT_UPDATED=1; }
    sudo apt-get install -y "$pkg"
  else
    (( APT_UPDATED == 1 )) || { apt-get update -y; APT_UPDATED=1; }
    apt-get install -y "$pkg"
  fi
}

ensure_pnpm() {
  log_step "Ensuring pnpm is available"
  if ! command -v pnpm >/dev/null 2>&1; then
    npm install -g pnpm
  fi
  pnpm -v
}

ensure_playwright() {
  log_step "Refreshing Playwright binaries"
  npx --yes playwright install-deps
  npx --yes playwright install chrome
}

ensure_supabase_cli() {
  log_step "Installing/refreshing Supabase CLI"
  local tmpdir
  tmpdir="$(mktemp -d)"
  pushd "$tmpdir" >/dev/null
  curl -fsSL https://github.com/supabase/cli/releases/latest/download/supabase_linux_amd64.tar.gz | tar -xz
  if command -v sudo >/dev/null 2>&1; then
    sudo install -m755 supabase /usr/local/bin/supabase
  else
    mkdir -p ~/.local/bin
    install -m755 supabase ~/.local/bin/supabase
  case ":${PATH}:" in
    *":$HOME/.local/bin:"*) ;;
    *)
      log_info "Adding ~/.local/bin to PATH (via ~/.bashrc)."
      echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.bashrc
      ;;
  esac
  export PATH="$HOME/.local/bin:$PATH"
  fi
  popd >/dev/null
  rm -rf "$tmpdir"
  hash -r
  supabase --version
}

ensure_litellm() {
  log_step "Ensuring litellm CLI (for local router)"
  if command -v litellm >/dev/null 2>&1; then
    log_info "litellm already installed"
    return
  fi
  if command -v pip >/dev/null 2>&1; then
    pip install --user "litellm>=1.42" >/dev/null
    log_info "litellm installed via pip --user"
  else
    log_warn "pip not available; install litellm manually if you plan to run the router."
  fi
}

ensure_workspace_deps() {
  log_step "Installing workspace node dependencies"
  pnpm install --frozen-lockfile || log_warn "pnpm install exited non-zero; inspect output above."
}

verify_supabase_link() {
  if ! command -v supabase >/dev/null 2>&1; then
    log_warn "Supabase CLI missing; skipping link verification."
    return
  fi
  if ! command -v jq >/dev/null 2>&1; then
    ensure_apt_package jq jq
  fi

  log_step "Checking Supabase CLI project link"
  local status_json
  if status_json=$(supabase status -o json 2>/dev/null); then
    local project_ref
    project_ref=$(printf '%s' "$status_json" | jq -r '.project_ref // empty')
    if [[ -n "$project_ref" ]]; then
      log_ok "Supabase CLI linked to project: $project_ref"
    else
      log_warn "Supabase CLI link detected but project ref missing. Run 'supabase link' to relink."
    fi
  else
    log_warn "Supabase CLI is not linked to a project. Run 'supabase link --project-ref <ref>' from the host to connect it."
  fi
}

remind_supabase_options() {
  cat <<'REMINDER'

────────────────────────────────────────────
Supabase usage reminders:
• Hosted project:
    Set NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY in your .env.
• Local project:
    Run `supabase start` from a host terminal (outside VS Code). The devcontainer
    reaches it via http://host.docker.internal.
────────────────────────────────────────────
REMINDER
}

main() {
  log_step "Using workspace root: $ROOT"
  ensure_pnpm
  ensure_apt_package netcat-openbsd nc
  ensure_playwright
  ensure_supabase_cli
  ensure_litellm
  ensure_workspace_deps
  verify_supabase_link
  remind_supabase_options
  log_ok "Post-rebuild complete."
}

main "$@"
