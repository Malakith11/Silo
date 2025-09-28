FROM mcr.microsoft.com/vscode/devcontainers/javascript-node:22-bullseye
ENV DEBIAN_FRONTEND=noninteractive

# Docker CLI + jq (compose plugin added below via binary)
RUN apt-get update && apt-get install -y \
    docker.io jq \
 && rm -rf /var/lib/apt/lists/*

# System deps + Python + pip
RUN apt-get update && apt-get install -y \
  git curl ca-certificates unzip \
  build-essential pkg-config python3-dev python3-pip \
  git-lfs make \
  libnss3 libatk1.0-0 libatk-bridge2.0-0 libdrm2 \
  libxkbcommon0 libxcomposite1 libxdamage1 libxfixes3 \
  libxrandr2 libgbm1 libasound2 libpango-1.0-0 libpangocairo-1.0-0 \
  libgtk-3-0 libxshmfence1 \
  && rm -rf /var/lib/apt/lists/* \
  && git lfs install

# >>> Compose v2 plugin (standalone binary)
# Put it where Docker looks for CLI plugins
RUN mkdir -p /usr/local/lib/docker/cli-plugins \
 && curl -sSL -o /usr/local/lib/docker/cli-plugins/docker-compose \
    https://github.com/docker/compose/releases/download/v2.29.7/docker-compose-linux-x86_64 \
 && chmod +x /usr/local/lib/docker/cli-plugins/docker-compose

# Python tools: LiteLLM proxy
RUN python3 -m pip install --upgrade pip setuptools wheel && \
    pip3 install "litellm[proxy]"
ENV LITELLM_PORT=4100

# Playwright runtime deps + Chrome channel (for MCP/browser work)
RUN npx --yes playwright install-deps && \
    npx --yes playwright install chrome

# ---- Install Supabase CLI (static binary) ----
RUN curl -sL https://github.com/supabase/cli/releases/latest/download/supabase_linux_amd64.tar.gz \
  | tar -xz supabase && \
  install -m755 supabase /usr/local/bin/supabase && \
  rm -f supabase

# Workspace niceties
RUN mkdir -p /workspace/artifacts/e2e && chown -R node:node /workspace

USER node
WORKDIR /workspaces/silo

# Ensure PATH is available for the node user in login shells
ENV PATH="/home/node/.supabase/bin:${PATH}"
