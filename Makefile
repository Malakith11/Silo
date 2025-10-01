# Makefile

.PHONY: up down

up:
	@./scripts/dev-up.sh

down:
	@./scripts/dev-down.sh

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
