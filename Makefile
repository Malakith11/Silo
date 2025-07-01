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
	@echo "🛑 Stopping Supabase…"
	@supabase stop

	@# ask about git commit/push
	@read -p "❓ Commit & push local changes? [y/N] " ans; \
	if echo "$$ans" | grep -iq "^y$$"; then \
	  read -p "✏️  Commit message: " msg; \
	  git add .; \
	  git commit -m "$$msg"; \
	  git push origin main; \
	else \
	  echo "↩️  Skipping git commit/push"; \
	fi

	@# ask about Vercel deploy
	@read -p "❓ Deploy to Vercel? [y/N] " ans2; \
	if echo "$$ans2" | grep -iq "^y$$"; then \
	  pnpm dlx vercel --prod; \
	else \
	  echo "↩️  Skipping Vercel deploy"; \
	fi

	@echo "👍 Done."