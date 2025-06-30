# Makefile

.PHONY: up down

up:
	@echo "🚀 Spinning everything up…"
	@supabase start
	@echo "📦 Installing web dependencies…"
	@cd apps/web && pnpm install
	@echo "🔥 Launching Next.js…"
	@cd apps/web && pnpm dev

down:
	@echo "🛑 Shutting everything down…"
	@supabase stop

	@echo "\n💾 Committing & pushing changes…"
	@git add -A
	@git commit -m "chore: auto-commit before shutdown" || echo "⚠️ Nothing to commit"
	@git push origin main

	@echo "\n📦 Deploying to Vercel…"
	@cd apps/web && pnpm dlx vercel --prod
