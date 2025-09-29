# Silo implementation plan

## Purpose
This document translates the recommendations in [`repository-assessment.md`](./repository-assessment.md) into a staged execution plan. It breaks the work into pragmatic phases, identifies concrete tasks per phase, and reserves placeholders for future feature work that has not been developed yet.

---

## Phase 0 – Repository preparation
1. **Adopt workspace structure**
   - Convert the root into a pnpm/Turborepo workspace with clearly defined `apps/` and `packages/` entries.
   - Introduce `packages/config` with shared ESLint, Prettier, tsconfig, Tailwind, and Jest/Playwright presets.
2. **Split apps**
   - Create `apps/landing` (fresh Next.js 14 app using the App Router) for the marketing site.
   - Rename `apps/web` to `apps/platform` and prune any landing-specific routes/components.
3. **Shared libraries**
   - Scaffold `packages/ui` with foundational atoms (Button, Heading, Section, Card) and Tailwind tokens.
   - Scaffold `packages/core` with domain types (`UserProfile`, `Supplement`, `Protocol`, `LiteratureReference`) and Supabase client helpers.
4. **Tooling hygiene**
   - Update root `package.json` with scripts (`lint`, `typecheck`, `test`, `dev:landing`, `dev:platform`).
   - Configure CI workflow placeholders (e.g., `.github/workflows/ci.yml`) that run lint + typecheck for both apps.

> **Placeholder:** Add mobile app workspace (`apps/mobile`) after the web platform foundation is stable.

---

## Phase 1 – Landing page release (apps/landing)
1. **Dependency cleanup**
   - Start from `create-next-app` with TypeScript + Tailwind, importing only what is required for the marketing site.
   - Remove heavy/unused packages from the landing app; rely on analytics (PostHog/GA) and a waitlist submission client.
2. **Content architecture**
   - Implement sections following the UX flow: Hero → Pillars overview → Profile CTA → Feature storytelling → Social proof → Waitlist form → FAQ → Footer.
   - Rebuild hero, storytelling, and CTA components using the shared `packages/ui` primitives.
3. **Waitlist funnel**
   - Implement a Supabase Edge Function (or external integration) for form submissions.
   - Add optional pre-qualification questions that capture goals and interest in Compass/Vanta/Lens/Aegis.
4. **Demonstration assets**
   - Produce lightweight demo cards or short looping videos/gifs hosted via static assets or a CDN.
   - Add placeholder copy blocks for future case studies and testimonials.
5. **Observability**
   - Wire privacy-compliant analytics, session replay, and feature-flag toggles for future experiments.

> **Placeholder:** Embed interactive "Profile builder" teaser once the real profile creation flow exists in the platform app.

---

## Phase 2 – Platform shell stabilization (apps/platform)
1. **Routing & layout**
   - Simplify the existing App Router tree; remove marketing routes from `(dashboard)` layout.
   - Establish top-level navigation with sections for Compass, Lens, Vanta, Aegis, and Account/Settings.
2. **Authentication & onboarding**
   - Harden Clerk integration, ensuring server components correctly gate protected routes.
   - Create an onboarding wizard that collects baseline profile data (goals, health focus areas, supplement inventory).
3. **State management**
   - Introduce React Query/TanStack Query hooked to Supabase RPC endpoints.
   - Provide context providers in `packages/core` for profile, catalog, and protocol state.
4. **Design system adoption**
   - Replace AI-generated components with shared `packages/ui` primitives to enforce consistency.
5. **Testing baseline**
   - Add unit tests for shared utilities and integration tests for key page flows (onboarding completion, navigation).

> **Placeholder:** Mobile-optimized layout variants to be introduced alongside the future Expo/React Native client.

---

## Phase 3 – Core services & Supabase domain modeling
1. **Database schema expansion**
   - Design normalized tables for supplements, ingredients, literature references, product scans, and protocols.
   - Version migrations per domain (`supabase/migrations/compass`, `.../lens`, `.../vanta`, `.../aegis`).
2. **Data ingestion pipelines**
   - Implement ETL scripts or edge functions to import authoritative supplement datasets and research metadata.
   - Set up scheduled jobs (Supabase cron or external worker) to refresh data.
3. **API layer**
   - Build Supabase RPC functions or REST endpoints that expose curated data to the platform modules.
   - Document API contracts in `packages/core` (types + zod schemas).
4. **Security & compliance**
   - Define row-level security policies aligned with user tenancy.
   - Add auditing/tracking tables for protocol edits, scan history, and literature bookmarks.

> **Placeholder:** Integrate third-party lab test APIs when partnership details are available.

---

## Phase 4 – Feature modules

### Compass (supplement discovery)
1. Implement discovery dashboard wired to the catalog tables (filters by goals, biomarkers, supplement categories).
2. Build literature summary cards that highlight top studies for each supplement.
3. Introduce "Add to protocol" actions that push items into Vanta.
4. **Placeholder:** Personalized recommendation engine leveraging user biomarker imports.

### Lens (evidence library)
1. Create searchable library UI (faceted search across conditions, ingredients, outcomes).
2. Render study summaries with citation metadata and quality scores.
3. Enable bookmarking and exporting notes to the user's profile.
4. **Placeholder:** AI-assisted literature synthesis once data privacy reviews are complete.

### Vanta (protocol designer)
1. Scaffold protocol builder interface (drag-and-drop schedule, dosage tracking, reminders).
2. Sync builder data to Supabase with version history and shareable links.
3. Provide protocol analytics (adherence tracking, outcome metrics).
4. **Placeholder:** Integration with wearable/imported biomarker data for adaptive protocols.

### Aegis (product scanner)
1. Prepare API contracts for barcode scanning (expose placeholder endpoint until mobile client is ready).
2. Implement web search interface for manual product lookup.
3. Show ranking/compliance badges referencing Compass catalog data.
4. **Placeholder:** Native mobile scanner client leveraging camera APIs and on-device OCR.

---

## Phase 5 – Mobile readiness (future)
1. Evaluate React Native/Expo or Flutter for shared code with `packages/core`.
2. Define which modules require native capabilities (Aegis scanning, Vanta protocol notifications).
3. Establish cross-platform design tokens in `packages/ui`.
4. **Placeholder:** Offline-first data sync strategy for mobile sessions.

---

## Governance & delivery cadence
- Adopt a quarterly roadmap with monthly milestones aligned to the phases above.
- Maintain a public changelog covering landing updates, platform modules, and backend enhancements.
- Run design reviews at the start of each module phase to keep UX consistent with the landing narrative.
- Document TODO placeholders within the codebase linking back to this plan for traceability.

> **Placeholder:** Create contributor guidelines once additional engineers join the project.

---

## Appendix – Tracking checklist
- [x] Phase 0 repository prep completed
- [ ] Phase 1 landing page deployed
- [ ] Phase 2 platform shell stabilized
- [ ] Phase 3 core services live
- [ ] Phase 4 modules in production (Compass / Lens / Vanta / Aegis)
- [ ] Phase 5 mobile clients ready for beta

