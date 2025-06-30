# Makefile

.PHONY: up down

up:
	@echo "🚀 Spinning everything up…"
	@./scripts/up.sh

down:
	@echo "🛑 Shutting everything down…"
	@./scripts/down.sh

	@echo "\n💾 Committing & pushing changes…"
	@git add -A
	@git commit -m "chore: auto-commit before shutdown" || echo "⚠️ Nothing to commit"
	@git push origin main

	@echo "\n📦 Deploying to Vercel…"
	@cd apps/web && pnpm dlx vercel --prod
