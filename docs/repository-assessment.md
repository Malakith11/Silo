# Silo repository assessment and roadmap

## 1. Current structure at a glance
- **Monorepo layout:** The project currently contains a root `package.json` and a single Next.js application under `apps/platform`, plus Supabase migrations. The landing page and product dashboard live inside the same app bundle (`src/app/page.tsx` renders marketing content while `(dashboard)` renders the logged-in hub).【F:apps/platform/src/app/page.tsx†L1-L24】【F:apps/platform/src/app/(dashboard)/page.tsx†L1-L156】
- **Generated UI footprint:** Most UI components are client-side, animation-heavy fragments such as the hero section that mixes scroll effects and placeholder panels, reinforcing that much of the interface was AI-generated without production hardening.【F:apps/platform/src/components/shared/hero.tsx†L1-L96】
- **Data/service layer gaps:** Domain "engines" like the supplement database and analytics service are in-memory shells with TODO markers and mock data; nothing persists or integrates with Supabase yet.【F:apps/platform/src/lib/data/supplement-db.ts†L45-L128】【F:apps/platform/src/lib/data/analytics.ts†L36-L153】
- **Tooling/dependency sprawl:** The web app declares dozens of heavy dependencies (BullMQ, LangChain, Tesseract, etc.) despite the codebase only using a small subset today, which inflates install times and obscures real requirements.【F:apps/platform/package.json†L1-L133】 The root `package.json` meanwhile only pins `glob` and `java`, offering no shared scripts or linting configuration.【F:package.json†L1-L6】
- **Backend provisioning:** Supabase is only set up with a basic `users` table synchronized with Clerk auth; there are no schema migrations for supplements, protocols, or analytics yet.【F:supabase/migrations/001_create_users_table.sql†L1-L50】

## 2. Cleanup priorities
1. **Trim unused UI and animation code** – remove or rewrite AI-generated sections that add complexity (e.g., the hero scroll choreography) and replace them with purposeful, lightweight marketing components.【F:apps/platform/src/components/shared/hero.tsx†L1-L96】
2. **Rebuild the data layer** – replace mock classes in `lib/data` with typed SDK clients (Supabase RPC, external APIs) or delete them until real implementations exist.【F:apps/platform/src/lib/data/supplement-db.ts†L45-L128】【F:apps/platform/src/lib/data/analytics.ts†L36-L153】
3. **Audit dependencies** – create a leaner dependency set focused on the landing site (React, Next.js, Tailwind, basic analytics) and move specialist packages (BullMQ, LangChain, Tesseract, etc.) into feature-specific packages when those features are scoped.【F:apps/platform/package.json†L11-L133】
4. **Clarify environment management** – introduce root-level lint/test scripts, TypeScript configuration, and documentation to support multiple apps rather than a placeholder root `package.json`.【F:package.json†L1-L6】
5. **Expand Supabase schema intentionally** – design tables for profiles, supplement catalog, literature, protocol templates, scans, etc., instead of only mirroring Clerk users.【F:supabase/migrations/001_create_users_table.sql†L1-L50】

## 3. Recommended repository architecture
- **Monorepo with clear app boundaries:**
  - `apps/landing` – a lightweight marketing/ waitlist Next.js site (no auth providers, minimal dependencies).
  - `apps/platform` – the authenticated product shell hosting Compass, Lens, Aegis, Vanta modules.
  - Optional future `apps/mobile` if you pursue React Native/Expo for mobile-first experiences.
- **Shared packages:**
  - `packages/ui` for reusable design system primitives (buttons, cards, typography).
  - `packages/core` for domain models, TypeScript types, and Supabase client utilities shared by web/mobile.
  - `packages/config` for ESLint, Tailwind, tsconfig presets.
- **Supabase alignment:** Keep `supabase` at repo root but version migrations per domain (e.g., `migrations/compass`, `migrations/vanta`) to track feature ownership.
- **Tooling:** Adopt a workspace manager (pnpm workspaces or Turborepo) to orchestrate builds/tests per app; configure separate environment variables so the landing page can deploy independently of the platform backend.

## 4. Product deployment strategy
- **Landing page as its own deploy:** Shipping the marketing/waitlist experience separately lets you iterate quickly and keeps its hosting footprint tiny. It should consume only public marketing data and a waitlist API (Supabase Edge Function or third-party form).
- **Single platform app with modular domains:** Keep Compass, Lens, Aegis, and Vanta inside one platform repo/app initially. They share the same user profile, supplement catalog, and analytics pipelines, so splitting into four repos would multiply infrastructure, auth, and data-sync complexity without clear payoff at this stage.
- **Progressive enablement:** Use feature flags or route-level toggles inside `apps/platform` to launch modules as they mature (e.g., enable Compass beta while Vanta remains in "coming soon"). This keeps the UX cohesive and reduces duplication.
- **Mobile strategy:** When mobile UX becomes critical (Vanta scanner, Compass on-the-go), introduce a dedicated mobile client that reuses the shared `packages/core` types/services and talks to the same Supabase backend. Avoid forking business logic into entirely separate repos.

## 5. UX flow recommendations for the landing site
1. **Narrative structure** – Open with the core promise ("Know which supplements matter for you") followed by a guided explanation of the four pillars (Profile → Lens insights → Compass discovery → Vanta protocol builder → Aegis verification). Map this story to scroll sections with clear CTAs.
2. **Profile priming CTA** – Prompt visitors to start their "Silo Health Profile" with a low-friction form (goal selection, current supplements). Use this data to personalize follow-up messaging about Lens, Vanta, and Compass benefits.
3. **Feature storytelling** – Instead of interactive dashboards, use concise explainer cards or short looping videos that demonstrate each feature, paired with outcomes (e.g., "Lens surfaces 10+ clinical studies matched to your biomarkers").
4. **Social proof & trust** – Add testimonials, expert endorsements, or evidence badges to support the research-first positioning.
5. **Waitlist capture** – Place the signup form after the initial value proposition and repeat it near the end. Offer optional profile pre-questions to segment leads for Compass vs. Vanta interest.
6. **Cross-device messaging** – Communicate that mobile apps are coming for scanner-heavy experiences (Aegis/Vanta) while the web platform covers research and planning, reinforcing the future multi-surface roadmap.

## 6. Next steps checklist
- [ ] Stand up `apps/landing` with a pared-down dependency graph and migrate marketing components there.
- [ ] Strip unused packages from `apps/platform` (or rename to `apps/platform`) and scaffold real data-fetching layers.
- [ ] Draft Supabase ERD covering supplements, products, protocols, user goals, and scanning metadata.
- [ ] Establish coding standards, linting, testing, and documentation at the root for contributors.
- [ ] Define a phased product roadmap (e.g., Compass MVP → Lens evidence library → Vanta protocol builder → Aegis scanner) to guide release sequencing within the single platform app.
