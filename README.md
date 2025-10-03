# Silo

> **Evidence-based supplement research, protocol building, and product verification platform**

Silo is a comprehensive health-tech platform designed to help users make informed decisions about supplements through research-backed insights, personalized protocol building, and product quality verification.

---

## 🎯 Project Vision

Silo addresses the complexity and information overload in the supplement space by providing four integrated modules:

- **Compass** – Intelligent supplement discovery based on health goals and biomarkers
- **Lens** – Research intelligence library with literature search and evidence synthesis
- **Vanta Lab** – Protocol builder with drag-drop timelines and optimization
- **Aegis** – Product scanner and brand quality verification

---

## 📁 Repository Structure

This is a **TypeScript monorepo** managed with **pnpm workspaces** and **Turborepo**.

```
silo/
├── apps/
│   ├── landing/          # Marketing website (Next.js 15)
│   ├── platform/         # Authenticated platform with 4 modules (Next.js 15)
│   └── web/              # [DEPRECATED] Legacy app to be removed
├── packages/
│   ├── ui/               # Shared UI components (Button, Card, etc.)
│   ├── core/             # Domain types, Supabase client, utilities
│   └── config/           # ESLint, Prettier, Tailwind, tsconfig presets
├── tests/
│   ├── landing/          # E2E tests for landing page
│   └── platform/         # E2E tests for platform
├── docs/                 # Project documentation
├── scripts/              # Development automation scripts
├── supabase/             # Supabase configuration
├── agents/               # AI agent configurations
└── artifacts/            # Build outputs, logs, test results
```

---

## 🛠️ Technology Stack

### Frontend
- **Framework:** Next.js 15.3.4 (App Router)
- **UI Library:** React 19
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS v4 + Radix UI + shadcn/ui
- **Animation:** Framer Motion
- **State Management:** React Query (TanStack Query)

### Backend & Services
- **Database:** Supabase (PostgreSQL + Real-time subscriptions)
- **Authentication:** Clerk
- **AI/ML:** OpenAI, LangChain
- **Vector Search:** Pinecone
- **Caching/Jobs:** Redis (ioredis), BullMQ
- **Document Processing:** Tesseract.js, pdf-parse, mammoth, sharp

### Development Tools
- **Package Manager:** pnpm 10.17.1
- **Monorepo:** Turborepo
- **Testing:** Playwright (E2E)
- **Linting:** ESLint 9, Prettier
- **CI/CD:** GitHub Actions (planned)

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** 20+ and **pnpm** 10+
- **Git**
- Environment variables (see [Environment Setup](#environment-setup))

### Installation

```bash
# Clone the repository
git clone https://github.com/your-org/silo.git
cd silo

# Install dependencies
pnpm install

# Start development environment
make up
# OR manually:
pnpm dev
```

### Available Commands

```bash
# Development
pnpm dev                    # Start all apps in parallel
pnpm dev:landing            # Start landing page only (port 3003)
pnpm dev:platform           # Start platform only (port 3004)

# Building
pnpm build                  # Build all apps
pnpm --filter @silo/landing build
pnpm --filter @silo/platform build

# Code Quality
pnpm lint                   # Lint all packages
pnpm typecheck              # Type-check all packages
pnpm format                 # Format code with Prettier

# Testing
pnpm test                   # Run all tests
pnpm test:e2e               # Run Playwright E2E tests

# Utilities
make up                     # Start dev environment with automation
make down                   # Stop dev environment (with git/deploy prompts)
```

---

## 🔧 Environment Setup

### Required Environment Variables

Create `.env.local` files in each app directory:

#### apps/landing/.env.local
```env
# Public variables only
NEXT_PUBLIC_APP_URL=http://localhost:3003
```

#### apps/platform/.env.local
```env
# Next.js
NEXT_PUBLIC_APP_URL=http://localhost:3004

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
CLERK_WEBHOOK_SECRET=whsec_...

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...

# OpenAI
OPENAI_API_KEY=sk-proj-...
OPENAI_ORG_ID=org-...

# Pinecone (Vector Database)
PINECONE_API_KEY=...
PINECONE_ENVIRONMENT=us-east-1-aws

# Redis (Optional - for caching/jobs)
REDIS_URL=redis://localhost:6379

# Sentry (Optional - for error tracking)
SENTRY_DSN=...
```

See [docs/dev-env-to-do.md](docs/dev-env-to-do.md) for detailed service setup instructions.

---

## 📦 Package Overview

### Apps

#### `@silo/landing`
Lightweight marketing website with:
- Hero section and feature storytelling
- Waitlist capture
- Social proof and testimonials
- Minimal dependencies for fast deployments

**Port:** 3003 | **Dependencies:** Next.js, React, Tailwind, @silo/ui

#### `@silo/platform`
Authenticated platform containing all four modules:

**Port:** 3004 | **Routes:**
- `/dashboard` – User home with onboarding
- `/compass` – Supplement discovery
- `/lens` – Research library
- `/vanta-lab` – Protocol builder
- `/aegis` – Product scanner
- `/admin` – Admin analytics and content management

**Dependencies:** Full stack including AI/ML, data processing, visualization libraries

### Packages

#### `@silo/ui`
Shared design system primitives:
- Base components (Button, Card, Heading, Section)
- Tailwind utilities and merge helpers
- Consistent styling across apps

#### `@silo/core`
Domain logic and utilities:
- TypeScript types (`UserProfile`, `Supplement`, `Protocol`, `LiteratureReference`)
- Supabase client configuration
- Shared utility functions
- Zod schemas for validation

#### `@silo/config`
Shared configuration presets:
- ESLint configs (`eslint/next.cjs`)
- Prettier config
- Tailwind preset
- TypeScript configs (`tsconfig/base.json`, `tsconfig/next-app.json`, `tsconfig/react-library.json`)

---

## 🧪 Testing

### E2E Testing with Playwright

Tests are organized by app:

```bash
# Run all E2E tests
pnpm test:e2e

# Run specific project
pnpm exec playwright test --project=landing-chrome
pnpm exec playwright test --project=platform-chrome

# Debug mode
pnpm exec playwright test --debug

# View test report
pnpm exec playwright show-report artifacts/e2e/output
```

**Test Configuration:**
- Landing tests: `tests/landing/*.spec.ts` (runs on port 3003)
- Platform tests: `tests/platform/*.spec.ts` (runs on port 3004)
- Playwright auto-starts dev servers and captures screenshots/videos on failure

---

## 📐 Architecture Decisions

### Monorepo Strategy
- **Single platform app** instead of 4 separate repos – modules share auth, user profiles, supplement catalog, and analytics
- **Separate landing app** for independent marketing iteration and deployment
- **Shared packages** for UI consistency and code reuse

### Data Layer
- **Supabase** for all persistent data with Row-Level Security (RLS)
- **Pinecone** for semantic search and RAG implementation
- **Redis** for caching, session storage, and background job queues

### Authentication Flow
- **Clerk** handles user auth with webhook sync to Supabase
- User profile data enriched in Supabase for platform features
- Server-side auth checks with Next.js middleware

### Progressive Enhancement
- Feature modules enabled via route-level toggles
- Can launch Compass beta while Vanta remains "coming soon"
- Mobile clients (future) will reuse `@silo/core` and share Supabase backend

---

## 🗺️ Development Roadmap

### ✅ Phase 0 – Repository Preparation (Complete)
- [x] pnpm workspace structure
- [x] Split landing and platform apps
- [x] Shared packages (`ui`, `core`, `config`)
- [x] Playwright E2E setup
- [x] Development scripts and Makefile

### 🚧 Phase 1 – Landing Page (In Progress)
- [ ] Content architecture (hero, features, waitlist)
- [ ] Rebuild marketing components using @silo/ui
- [ ] Waitlist funnel with Supabase Edge Function
- [ ] Analytics integration
- [ ] Production deployment

### 📋 Phase 2 – Platform Shell Stabilization
- [ ] Simplified routing and layout
- [ ] Hardened Clerk integration
- [ ] Onboarding wizard for profile creation
- [ ] React Query setup with Supabase
- [ ] Replace AI-generated components with design system

### 📋 Phase 3 – Core Services & Database
- [ ] Supabase schema expansion (supplements, protocols, literature, scans)
- [ ] Domain-based migration structure
- [ ] Data ingestion pipelines for supplement datasets
- [ ] Supabase RPC functions and API contracts
- [ ] Row-Level Security policies

### 📋 Phase 4 – Feature Modules
- [ ] **Compass:** Discovery dashboard with catalog integration
- [ ] **Lens:** Searchable research library with AI summarization
- [ ] **Vanta Lab:** Protocol builder with version history
- [ ] **Aegis:** Product search and quality scoring

### 📋 Phase 5 – Mobile Readiness (Future)
- [ ] Evaluate React Native/Expo
- [ ] Cross-platform design tokens
- [ ] Native scanner capabilities
- [ ] Offline-first data sync

For detailed implementation plans, see:
- [docs/implementation-plan.md](docs/implementation-plan.md) – Staged execution plan
- [docs/repository-assessment.md](docs/repository-assessment.md) – Architecture analysis
- [docs/dev-env-to-do.md](docs/dev-env-to-do.md) – Service setup guide

---

## 🏗️ Module Details

### 🧭 Compass (Supplement Discovery)
**Status:** In Development
**Purpose:** Help users discover supplements based on health goals and biomarkers

**Features:**
- Intelligent search with filters (goals, conditions, biomarkers)
- Literature-backed supplement cards
- Trending supplements and community insights
- "Add to protocol" actions linking to Vanta

**Tech:** React Query, Fuse.js (fuzzy search), sentiment analysis

---

### 🔬 Lens (Research Intelligence)
**Status:** In Development
**Purpose:** Evidence library with AI-powered literature search

**Features:**
- Searchable database of clinical studies
- AI summarization of research papers
- Citation tracking and quality scores
- Bookmark and export functionality
- RAG-based semantic search

**Tech:** OpenAI, Pinecone, pdf-parse, Tesseract.js

---

### 🧪 Vanta Lab (Protocol Builder)
**Status:** In Development
**Purpose:** Design, optimize, and track supplement protocols

**Features:**
- Drag-drop timeline builder
- Dosage tracking and reminders
- Protocol version history
- Shareable protocol links
- Analytics (adherence, outcomes)

**Tech:** React Flow, Monaco Editor, D3/Visx (visualization)

---

### 🛡️ Aegis (Product Scanner)
**Status:** Planned
**Purpose:** Verify product quality and brand reputation

**Features:**
- Barcode scanning (mobile-first)
- Web-based product search
- Quality scorecard with compliance badges
- Competitive brand analysis
- Third-party testing verification

**Tech:** Tesseract.js (OCR), image processing, future native mobile scanner

---

## 🤝 Contributing

### Development Workflow

1. Create a feature branch from `main`:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make changes and ensure quality:
   ```bash
   pnpm lint
   pnpm typecheck
   pnpm test:e2e
   ```

3. Commit with descriptive messages:
   ```bash
   git add .
   git commit -m "feat(compass): add supplement filtering by biomarkers"
   ```

4. Push and create a pull request:
   ```bash
   git push origin feature/your-feature-name
   ```

### Code Standards
- **Linting:** ESLint 9 with TypeScript, React, and Next.js rules
- **Formatting:** Prettier with Tailwind plugin
- **Type Safety:** Strict TypeScript mode enabled
- **Components:** Use shared `@silo/ui` components when possible
- **Styles:** Tailwind utility classes, avoid custom CSS unless necessary

### Commit Conventions
Follow conventional commits:
- `feat(scope):` new features
- `fix(scope):` bug fixes
- `refactor(scope):` code refactoring
- `docs:` documentation changes
- `test:` test additions/updates
- `chore:` tooling/config changes

---

## 📊 Project Status

**Current Focus:** Phase 1 – Landing Page Development
**Active Branch:** `pr-1`
**Main Branch:** `main`

### Recent Updates
- ✅ Monorepo restructure complete (landing/platform separation)
- ✅ E2E testing infrastructure with Playwright
- ✅ Development automation with scripts and Makefile
- 🚧 Landing page content and components in progress
- 🚧 Platform UI cleanup (removing AI-generated components)

### Known Issues
1. **Dependency cleanup needed** – Platform has unused heavy dependencies (BullMQ, LangChain partially unused)
2. **Mock data layer** – `lib/data/supplement-db.ts` and `analytics.ts` need Supabase integration
3. **Missing migrations** – No database schema for supplements, protocols, literature yet
4. **Git workspace** – Uncommitted changes in config files (.gitignore, ESLint, globals.css)

---

## 📚 Documentation

- **[Implementation Plan](docs/implementation-plan.md)** – Phased development roadmap
- **[Repository Assessment](docs/repository-assessment.md)** – Architecture analysis and recommendations
- **[Dev Environment Setup](docs/dev-env-to-do.md)** – Detailed service configuration guide
- **[Daily TODO](docs/daily-to-do.md)** – Current development priorities

---

## 🔐 Security

- **Environment Variables:** Never commit `.env` files – use `.env.example` templates
- **API Keys:** Rotate keys regularly, use separate keys for dev/staging/prod
- **Authentication:** All platform routes protected with Clerk middleware
- **Database:** Row-Level Security (RLS) policies enforce user tenancy
- **Rate Limiting:** API routes protected with `express-rate-limit`
- **Security Headers:** Configured in Next.js for CSP, XSS protection

---

## 📄 License

This project is private and proprietary. All rights reserved.

---

## 🙋 Support

For questions or issues:
1. Check existing documentation in `/docs`
2. Review [Implementation Plan](docs/implementation-plan.md) for feature roadmap
3. Contact the development team

---

## 🔗 Links

- **Production:** TBD
- **Staging:** TBD
- **Supabase Dashboard:** TBD
- **Clerk Dashboard:** TBD

---

**Built with ❤️ for evidence-based health optimization**
