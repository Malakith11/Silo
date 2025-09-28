# Location: /workspaces/silo/Makefile

SHELL := /bin/bash
APP_PORT ?= 3000
LITELLM_PORT ?= 4100

up:
	@echo "Starting SILO dev environment..."
	@APP_PORT=$(APP_PORT) LITELLM_PORT=$(LITELLM_PORT) ./scripts/dev-up.sh

down:
	@echo "Stopping SILO dev environment..."
	@./scripts/dev-down.sh

status:
	@echo "Node: $$(node -v 2>/dev/null || echo missing)  PNPM: $$(pnpm -v 2>/dev/null || echo missing)"
	@echo "Playwright: $$(npx playwright --version 2>/dev/null || echo missing)"
	@echo "Supabase: $$(supabase --version 2>/dev/null || echo missing)"
	@echo "Docker: $$(docker --version 2>/dev/null || echo missing)"
	@echo "OpenAI key set? $${OPENAI_API_KEY:+yes}${OPENAI_API_KEY:+' '}"
	@echo "LITELLM_PORT=$(LITELLM_PORT)  APP_PORT=$(APP_PORT)"
	@echo "Agents manifests: $$(ls agents/manifests/*.json 2>/dev/null | wc -l) found"
	@echo "Contexts root: agents/contexts"

e2e:
	pnpm exec playwright test
