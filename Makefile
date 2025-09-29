# Location: /workspaces/silo/Makefile
SHELL := /bin/bash
APP_PORT ?= 3000
LITELLM_PORT ?= 4100

.PHONY: post-rebuild
post-rebuild: ## Run after devcontainer rebuild to provision tools & supabase
	@./scripts/post-rebuild.sh

.PHONY: supabase-up
supabase-up: ## Start Supabase (local)
	cd $(ROOT) && supabase start --network-id silo_net

.PHONY: supabase-down
supabase-down: ## Stop Supabase (local)
	cd $(ROOT) && supabase stop || true

.PHONY: supabase-clean
supabase-clean: supabase-down ## Full clean Supabase local env
	docker ps -a --format '{{.ID}} {{.Names}}' | awk '/supabase|Silo|silo/ {print $$1}' | xargs -r docker rm -f
	docker network ls --format '{{.ID}} {{.Name}}' | awk '/supabase|Silo|silo/ {print $$1}' | xargs -r docker network rm
	docker volume ls --format '{{.Name}}' | awk '/supabase|Silo|silo/ {print $$1}' | xargs -r docker volume rm
	rm -rf $(ROOT)/supabase/.temp

.PHONY: web
web: ## Start Next.js dev server (apps/web)
	cd $(ROOT)/apps/web && pnpm dev

.PHONY: router
router: ## Start LiteLLM proxy (if you use it)
	LITELLM_PORT=4100 litellm --config $(ROOT)/litellm.config.yaml

.PHONY: smoke
smoke: ## Run Playwright smoke tests
	cd $(ROOT) && pnpm exec playwright test

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
