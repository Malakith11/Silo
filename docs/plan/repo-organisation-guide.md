# Silo Organization Guide

> **Comprehensive guide to organizing the Silo monorepo at repository and folder levels**

---

## 📋 Root-Level Configuration Organization

### Current State (After Your Changes)

**✅ What You've Organized:**
- Created `config/` directory with:
  - `litellm.config.yaml` - LiteLLM router config
  - `docker-compose.yaml` - Docker services (Redis, Postgres)
  - `.env.example` - Environment template
  - `.env.local.example` - Local environment template

- Created new packages:
  - `packages/ai/` - AI utilities (empty, ready for setup)
  - `packages/database/` - Database utilities (empty)
  - `packages/analytics/` - Analytics utilities (empty)

- Organized documentation:
  - `docs/api/` - API documentation
  - `docs/architecture/` - Architecture decisions
  - `docs/diagrams/` - Architecture diagrams
  - `docs/guides/` - Development guides

- Organized scripts:
  - `scripts/db/` - Database scripts
  - `scripts/setup/` - Setup scripts

- Created test structure:
  - `tests/shared/` - Shared test utilities

**❌ What Still Needs Organization:**

At root level, these files are scattered:
- No `package.json` at root (seems deleted - should exist for monorepo)
- No `turbo.json` at root (seems deleted - required for Turborepo)
- No `tsconfig.json` at root (seems deleted - needed for TypeScript)
- No `pnpm-workspace.yaml` at root (seems deleted - required for pnpm)
- No `playwright.config.ts` at root (seems deleted - required for E2E tests)
- No `Makefile` at root (seems deleted - convenience commands)

Multiple docs at root:
- `implementation-plan.md` → should move to `docs/guides/`
- `env-setup-plan.md` → should move to `docs/guides/`
- `repo-assessment.md` → should move to `docs/architecture/`
- `repo-organisation.md` → should be renamed to `ORGANIZATION.md` or moved to docs
- `changelog.md` → should be `CHANGELOG.md` (uppercase)
- `contributing.md` → should be `CONTRIBUTING.md` (uppercase)
- `license` → should be `LICENSE` (uppercase)

### 🎯 Recommended Root-Level Structure

```
silo/
├── 📝 Documentation (uppercase = important)
│   ├── README.md                    # Main documentation (KEEP AT ROOT)
│   ├── ORGANIZATION.md             # This file (KEEP AT ROOT)
│   ├── CONTRIBUTING.md             # Contribution guide (KEEP AT ROOT)
│   ├── CHANGELOG.md                # Release notes (KEEP AT ROOT)
│   ├── LICENSE                     # License file (KEEP AT ROOT)
│   └── CODE_OF_CONDUCT.md          # (Optional) Community guidelines
│
├── 🔧 Core Configuration Files (MUST stay at root)
│   ├── package.json                # Root package.json (monorepo scripts)
│   ├── pnpm-workspace.yaml         # pnpm workspace config (REQUIRED)
│   ├── turbo.json                  # Turborepo config (REQUIRED)
│   ├── tsconfig.json               # Root TypeScript config (base)
│   └── .gitignore                  # Git ignore rules
│
├── 🧪 Testing Configuration (stays at root)
│   └── playwright.config.ts        # E2E test config (references ./tests)
│
├── ⚙️ Tool-Specific Configs (can stay at root OR move to config/)
│   ├── Makefile                    # Optional: convenience commands
│   ├── .npmrc                      # pnpm/npm settings (if exists)
│   ├── .nvmrc                      # Node version (if exists)
│   └── .editorconfig               # Editor settings (if exists)
│
├── 📦 Environment & Service Configs (MOVED to config/)
│   └── config/
│       ├── .env.example            # ✅ Already moved
│       ├── .env.local.example      # ✅ Already moved
│       ├── docker-compose.yaml     # ✅ Already moved
│       └── litellm.config.yaml     # ✅ Already moved
│
├── 🔒 Editor & IDE Configs (stay at root as dotfolders)
│   ├── .vscode/                    # VS Code settings
│   │   ├── settings.json           # Workspace settings
│   │   ├── extensions.json         # Recommended extensions
│   │   └── launch.json             # Debug configs (if needed)
│   ├── .devcontainer/              # Dev container config
│   │   └── devcontainer.json
│   └── .github/                    # GitHub specific
│       ├── workflows/              # CI/CD workflows
│       ├── ISSUE_TEMPLATE/         # Issue templates
│       └── pull_request_template.md
│
├── 🏗️ Project Structure
│   ├── apps/                       # Applications
│   ├── packages/                   # Shared packages
│   ├── tests/                      # E2E tests
│   ├── docs/                       # Detailed documentation
│   ├── scripts/                    # Automation scripts
│   ├── supabase/                   # Supabase config
│   └── agents/                     # AI agent configs
│
└── 🗑️ Build Artifacts (gitignored)
    ├── .dev/                       # Local dev state
    ├── .turbo/                     # Turbo cache
    ├── artifacts/                  # Test/build outputs
    ├── .pnpm-store/                # pnpm cache
    └── node_modules/               # Dependencies
```

### 📐 Configuration File Categories

#### 1. **MUST Stay at Root** (Required by Tools)
These files MUST be at root level because tools expect them there:

```bash
package.json              # Monorepo root package - pnpm/npm expects this
pnpm-workspace.yaml       # Workspace definition - pnpm REQUIRES this
turbo.json               # Turborepo config - turbo REQUIRES this
tsconfig.json            # TypeScript base config - tsc expects this
playwright.config.ts     # Playwright config - expects to find tests from root
.gitignore              # Git ignore - git expects this at root
```

**Why they can't move:**
- Tools have hardcoded expectations for these paths
- Moving them breaks the build/dev toolchain
- No standard way to configure alternate paths

#### 2. **Should Stay at Root** (Convention)
Standard community convention - keeps them visible:

```bash
README.md               # First thing people see on GitHub
CONTRIBUTING.md         # Contribution guidelines
CHANGELOG.md           # Release history
LICENSE                # Legal requirements
ORGANIZATION.md        # Project structure guide
```

**Why at root:**
- GitHub/GitLab/Bitbucket display README.md automatically
- Developers expect these files at root
- LICENSE must be at root for GitHub to detect it
- Uppercase names signal importance

#### 3. **Can Move to config/** (Recommended)
Environment and service configurations:

```bash
config/
├── .env.example              # ✅ You moved this - GOOD
├── .env.local.example        # ✅ You moved this - GOOD
├── docker-compose.yaml       # ✅ You moved this - GOOD
├── litellm.config.yaml       # ✅ You moved this - GOOD
└── docker-compose.prod.yaml  # (Future) Production compose
```

**Create symlinks if needed:**
```bash
# If a tool absolutely needs config at root
ln -s config/docker-compose.yaml docker-compose.yaml
```

#### 4. **Tool-Specific Configs** (Case by Case)

**Keep at root:**
```bash
Makefile                 # Make expects this at root
.npmrc                   # pnpm/npm reads from root
.nvmrc                   # nvm reads from root
.editorconfig           # Editors read from root
```

**Can organize in dotfolders:**
```bash
.vscode/                 # Already a folder - GOOD
.devcontainer/          # Already a folder - GOOD
.github/                # Already a folder - GOOD
.husky/                 # Git hooks (if you add them)
```

### 🔄 Migration Steps for Your Repo

Based on your changes, here's what needs fixing:

#### Step 1: Restore Critical Files
```bash
# These files seem to be missing and MUST exist at root
# Check if they were accidentally deleted

# If they exist somewhere else, move them back:
# git restore package.json pnpm-workspace.yaml turbo.json tsconfig.json

# If they don't exist, you'll need to recreate them
```

#### Step 2: Move Documentation Files
```bash
# Move implementation/setup docs to guides
mv implementation-plan.md docs/guides/implementation-plan.md
mv env-setup-plan.md docs/guides/environment-setup.md

# Move assessment to architecture
mv repo-assessment.md docs/architecture/repository-assessment.md

# Rename this file to standard name (or move to docs)
mv repo-organisation.md ORGANIZATION.md
# OR: mv repo-organisation.md docs/architecture/organization-guide.md

# Standardize community files to uppercase
mv changelog.md CHANGELOG.md
mv contributing.md CONTRIBUTING.md
mv license LICENSE
```

#### Step 3: Organize Config Files
```bash
# Your config/ setup is good! Just ensure it has:
ls -la config/
# Should show:
# - .env.example
# - .env.local.example
# - docker-compose.yaml
# - litellm.config.yaml

# Optional: Create symlink if docker-compose is expected at root
ln -s config/docker-compose.yaml docker-compose.yaml
```

#### Step 4: Create Missing Config Templates
```bash
# Create .npmrc if it doesn't exist
cat > .npmrc << 'EOF'
# Use pnpm for all package management
package-manager=pnpm
# Hoist dependencies for better compatibility
shamefully-hoist=true
# Strict peer dependencies
strict-peer-dependencies=false
EOF

# Create .nvmrc if you want to lock Node version
echo "20" > .nvmrc

# Create .editorconfig for consistent coding styles
cat > .editorconfig << 'EOF'
root = true

[*]
charset = utf-8
end_of_line = lf
indent_style = space
indent_size = 2
insert_final_newline = true
trim_trailing_whitespace = true

[*.md]
trim_trailing_whitespace = false

[Makefile]
indent_style = tab
EOF
```

### 📊 Final Root Structure

After cleanup, your root should look like:

```
silo/
├── .devcontainer/          # ✅ Good - Dev container config
├── .github/                # ✅ Good - GitHub workflows
├── .vscode/                # ✅ Good - VS Code settings
├── apps/                   # ✅ Good - Applications
├── packages/               # ✅ Good - Shared packages (with new ai, database, analytics)
├── tests/                  # ✅ Good - E2E tests with shared/
├── docs/                   # ✅ Good - Documentation with api/, architecture/, guides/
├── scripts/                # ✅ Good - Scripts with db/, setup/
├── supabase/               # ✅ Good - Supabase with migrations/, functions/, seed/
├── agents/                 # ✅ Good - AI agents
├── config/                 # ✅ Good - Environment & service configs
├── .dev/                   # ✅ Good - Gitignored dev artifacts
├── artifacts/              # ✅ Good - Gitignored build outputs
│
├── package.json            # ⚠️ REQUIRED - Restore if missing
├── pnpm-workspace.yaml     # ⚠️ REQUIRED - Restore if missing
├── turbo.json              # ⚠️ REQUIRED - Restore if missing
├── tsconfig.json           # ⚠️ REQUIRED - Restore if missing
├── playwright.config.ts    # ⚠️ REQUIRED - Restore if missing
├── Makefile                # ⚠️ REQUIRED - Restore if missing
├── .gitignore              # ✅ Good
├── .npmrc                  # ➕ Add if needed
├── .nvmrc                  # ➕ Add if needed
├── .editorconfig           # ➕ Add if needed
│
├── README.md               # ✅ Good
├── ORGANIZATION.md         # 🔄 Rename from repo-organisation.md
├── CONTRIBUTING.md         # 🔄 Rename from contributing.md
├── CHANGELOG.md            # 🔄 Rename from changelog.md
└── LICENSE                 # 🔄 Rename from license
```

### 🎯 Key Principles

1. **Tool Requirements First:** If a tool requires a file at root, keep it there
2. **Community Conventions:** Follow standard naming (uppercase for important docs)
3. **Visibility:** Important files (README, LICENSE) stay visible at root
4. **Grouping:** Related configs can be grouped in `config/` or dotfolders
5. **Documentation:** Detailed docs go in `docs/`, high-level docs stay at root
6. **Environment Files:** Templates go in `config/`, actual `.env` stays gitignored at root

### ⚠️ Common Mistakes to Avoid

❌ **Don't move these from root:**
- `package.json` - npm/pnpm expects it here
- `pnpm-workspace.yaml` - pnpm REQUIRES this at root
- `turbo.json` - Turborepo won't work without it at root
- `.gitignore` - Git reads from root
- `tsconfig.json` - Base config for all packages

❌ **Don't lowercase these:**
- `LICENSE` must be uppercase (GitHub requirement)
- `README.md` should stay capitalized (convention)
- `CONTRIBUTING.md` is conventionally uppercase

✅ **Do organize these:**
- Move detailed guides to `docs/guides/`
- Move service configs to `config/`
- Group editor configs in dotfolders (`.vscode/`, `.github/`)
- Keep high-level docs at root, detailed docs in `docs/`

---

## 🎯 Current State Analysis

### Issues Identified

1. **Component Bloat:**
   - `apps/platform/src/components/shared/` has 57 files (many AI-generated, unused)
   - `apps/platform/src/components/ui/` has 53 shadcn components (duplicates `@silo/ui`)

2. **Scattered Concerns:**
   - Database types in `apps/platform/src/lib/supabase/client.ts` (should be in `@silo/core`)
   - AI orchestrator in root `src/ai/` (should be in platform or shared package)
   - Legacy `apps/web/` folder still present (marked for deletion)

3. **Root Clutter:**
   - `repo-assessment.md` at root (should be in `docs/`)
   - `src/ai/` at root (monorepo anti-pattern)
   - `.dev/` and `artifacts/` now properly gitignored but structure unclear

4. **Missing Organization:**
   - No clear feature modules in platform
   - No separation between marketing/product components in landing
   - No lib utilities structure in `@silo/core`

---

## ✅ Recommended Repository Structure

### Root Level Organization

```
silo/
├── .github/                    # GitHub workflows, issue templates
│   ├── workflows/
│   │   ├── ci.yml             # Lint, typecheck, test
│   │   ├── deploy-landing.yml
│   │   └── deploy-platform.yml
│   ├── ISSUE_TEMPLATE/
│   └── pull_request_template.md
│
├── apps/                       # Application packages
│   ├── landing/               # Marketing site
│   └── platform/              # Product platform
│
├── packages/                   # Shared packages
│   ├── ui/                    # Design system
│   ├── core/                  # Domain logic
│   ├── config/                # Shared configs
│   └── [future: ai, database, analytics]
│
├── scripts/                    # Automation scripts
│   ├── dev-up.sh
│   ├── dev-down.sh
│   ├── post-rebuild.sh
│   ├── db/                    # Database scripts
│   │   ├── seed.ts
│   │   ├── migrate.ts
│   │   └── reset.ts
│   └── setup/                 # Setup scripts
│       ├── install-deps.sh
│       └── check-env.sh
│
├── tests/                      # E2E tests
│   ├── landing/
│   ├── platform/
│   └── shared/                # Shared test utilities
│       ├── fixtures/
│       ├── helpers/
│       └── mocks/
│
├── docs/                       # All documentation
│   ├── architecture/
│   │   ├── decisions/         # ADRs (Architecture Decision Records)
│   │   ├── diagrams/
│   │   └── database-schema.md
│   ├── guides/
│   │   ├── development.md
│   │   ├── deployment.md
│   │   └── contributing.md
│   ├── api/                   # API documentation
│   └── [current docs files]
│
├── supabase/                   # Supabase config
│   ├── config.toml
│   ├── migrations/            # Organized by domain
│   │   ├── 001_init/
│   │   ├── 002_compass/
│   │   ├── 003_lens/
│   │   ├── 004_vanta/
│   │   └── 005_aegis/
│   ├── functions/             # Edge functions
│   │   ├── waitlist/
│   │   └── webhooks/
│   └── seed/                  # Seed data
│       ├── supplements.sql
│       └── test-users.sql
│
├── agents/                     # AI agent configs (existing)
│   ├── manifests/
│   └── contexts/
│
├── config/                     # Root-level configs
│   ├── .env.example
│   ├── .env.local.example
│   ├── docker-compose.yml
│   └── litellm.config.yaml
│
├── .dev/                       # Local dev artifacts (gitignored)
├── artifacts/                  # Build/test outputs (gitignored)
│
├── README.md                   # Main documentation
├── ORGANIZATION.md            # This file
├── CONTRIBUTING.md            # Contribution guide
├── CHANGELOG.md               # Release notes
├── LICENSE                    # License file
│
└── [config files]              # Root configs
    ├── package.json
    ├── pnpm-workspace.yaml
    ├── turbo.json
    ├── tsconfig.json
    ├── playwright.config.ts
    └── Makefile
```

---

## 📁 App-Level Organization

### apps/landing/ Structure

```
apps/landing/
├── src/
│   ├── app/                   # Next.js App Router
│   │   ├── (site)/           # Main site routes
│   │   │   ├── page.tsx      # Homepage
│   │   │   └── layout.tsx
│   │   ├── layout.tsx        # Root layout
│   │   ├── globals.css
│   │   └── not-found.tsx
│   │
│   ├── components/
│   │   ├── sections/         # Page sections
│   │   │   ├── hero.tsx
│   │   │   ├── features.tsx
│   │   │   ├── pillars.tsx
│   │   │   ├── evidence-highlights.tsx
│   │   │   ├── testimonials.tsx
│   │   │   └── waitlist.tsx
│   │   ├── layout/           # Layout components
│   │   │   ├── site-header.tsx
│   │   │   └── site-footer.tsx
│   │   └── forms/            # Forms
│   │       └── waitlist-form.tsx
│   │
│   ├── lib/
│   │   ├── utils.ts          # Utilities
│   │   └── constants.ts      # Constants
│   │
│   └── styles/               # Additional styles
│
├── public/                    # Static assets
│   ├── images/
│   ├── videos/
│   └── fonts/
│
└── [config files]
```

### apps/platform/ Structure (Refactored)

```
apps/platform/
├── src/
│   ├── app/                   # Next.js App Router
│   │   ├── (auth)/           # Auth routes
│   │   │   ├── sign-in/
│   │   │   └── sign-up/
│   │   │
│   │   ├── (dashboard)/      # Protected routes
│   │   │   ├── layout.tsx    # Dashboard shell
│   │   │   ├── page.tsx      # Dashboard home
│   │   │   │
│   │   │   ├── compass/      # Compass module
│   │   │   │   ├── page.tsx
│   │   │   │   ├── [id]/
│   │   │   │   └── loading.tsx
│   │   │   │
│   │   │   ├── lens/         # Lens module
│   │   │   │   ├── page.tsx
│   │   │   │   ├── studies/
│   │   │   │   └── library/
│   │   │   │
│   │   │   ├── vanta-lab/    # Vanta Lab module
│   │   │   │   ├── page.tsx
│   │   │   │   ├── builder/
│   │   │   │   └── protocols/
│   │   │   │
│   │   │   ├── aegis/        # Aegis module
│   │   │   │   ├── page.tsx
│   │   │   │   ├── scanner/
│   │   │   │   └── brands/
│   │   │   │
│   │   │   └── settings/     # User settings
│   │   │
│   │   ├── (admin)/          # Admin routes
│   │   │   ├── layout.tsx
│   │   │   ├── analytics/
│   │   │   ├── users/
│   │   │   └── content/
│   │   │
│   │   ├── (public)/         # Public marketing pages
│   │   │   ├── about/
│   │   │   └── pricing/
│   │   │
│   │   ├── api/              # API routes
│   │   │   ├── ai/
│   │   │   ├── health/
│   │   │   ├── supplements/
│   │   │   └── webhooks/
│   │   │
│   │   ├── layout.tsx        # Root layout
│   │   ├── globals.css
│   │   └── page.tsx          # Root redirect
│   │
│   ├── components/
│   │   ├── compass/          # Compass-specific components
│   │   │   ├── search-interface.tsx
│   │   │   ├── supplement-card.tsx
│   │   │   ├── protocol-browser.tsx
│   │   │   └── trending-list.tsx
│   │   │
│   │   ├── lens/             # Lens-specific components
│   │   │   ├── research-library.tsx
│   │   │   ├── study-card.tsx
│   │   │   ├── digest-viewer.tsx
│   │   │   └── topic-following.tsx
│   │   │
│   │   ├── vanta-lab/        # Vanta-specific components
│   │   │   ├── stack-builder.tsx
│   │   │   ├── drag-drop-timeline.tsx
│   │   │   └── protocol-optimizer.tsx
│   │   │
│   │   ├── aegis/            # Aegis-specific components
│   │   │   ├── scanner-interface.tsx
│   │   │   ├── brand-profile.tsx
│   │   │   ├── quality-scorecard.tsx
│   │   │   └── comparison-table.tsx
│   │   │
│   │   ├── dashboard/        # Shared dashboard components
│   │   │   ├── nav/
│   │   │   │   ├── sidebar.tsx
│   │   │   │   ├── topbar.tsx
│   │   │   │   └── breadcrumbs.tsx
│   │   │   ├── user-menu.tsx
│   │   │   └── notifications.tsx
│   │   │
│   │   ├── auth/             # Auth components
│   │   │   ├── sign-in-button.tsx
│   │   │   ├── sign-up-button.tsx
│   │   │   └── user-button.tsx
│   │   │
│   │   └── ui/               # [TO DELETE - use @silo/ui]
│   │
│   ├── features/             # Feature modules (business logic)
│   │   ├── compass/
│   │   │   ├── hooks/
│   │   │   ├── services/
│   │   │   ├── types.ts
│   │   │   └── utils.ts
│   │   ├── lens/
│   │   ├── vanta-lab/
│   │   └── aegis/
│   │
│   ├── lib/                  # Shared utilities
│   │   ├── ai/              # AI utilities
│   │   │   ├── openai-client.ts
│   │   │   ├── embeddings.ts
│   │   │   └── optimization-engine.ts
│   │   ├── api/             # API clients
│   │   │   ├── supabase.ts
│   │   │   ├── clerk.ts
│   │   │   └── pinecone.ts
│   │   ├── hooks/           # Shared hooks
│   │   ├── utils/           # Utilities
│   │   └── constants.ts     # Constants
│   │
│   ├── stores/              # State management
│   │   ├── supplement-store.ts
│   │   ├── protocol-store.ts
│   │   └── user-store.ts
│   │
│   ├── types/               # App-specific types
│   │   ├── supplement.ts
│   │   ├── protocol.ts
│   │   └── index.ts
│   │
│   └── middleware.ts        # Next.js middleware
│
├── public/                  # Static assets
│
└── [config files]
```

---

## 📦 Packages Organization

### packages/ui/ Structure

```
packages/ui/
├── src/
│   ├── components/
│   │   ├── primitives/      # Base components
│   │   │   ├── button.tsx
│   │   │   ├── heading.tsx
│   │   │   ├── text.tsx
│   │   │   ├── card.tsx
│   │   │   ├── section.tsx
│   │   │   └── container.tsx
│   │   │
│   │   ├── forms/           # Form components
│   │   │   ├── input.tsx
│   │   │   ├── select.tsx
│   │   │   ├── textarea.tsx
│   │   │   └── checkbox.tsx
│   │   │
│   │   ├── feedback/        # Feedback components
│   │   │   ├── alert.tsx
│   │   │   ├── toast.tsx
│   │   │   ├── badge.tsx
│   │   │   └── skeleton.tsx
│   │   │
│   │   ├── layout/          # Layout components
│   │   │   ├── stack.tsx
│   │   │   ├── grid.tsx
│   │   │   └── divider.tsx
│   │   │
│   │   └── overlays/        # Overlays
│   │       ├── dialog.tsx
│   │       ├── drawer.tsx
│   │       └── popover.tsx
│   │
│   ├── hooks/               # Shared hooks
│   │   ├── use-media-query.ts
│   │   └── use-disclosure.ts
│   │
│   ├── utils/               # Utilities
│   │   ├── cn.ts           # classname helper
│   │   └── variants.ts     # CVA helpers
│   │
│   ├── styles/              # Styles
│   │   └── globals.css
│   │
│   └── index.ts             # Exports
│
└── [config files]
```

### packages/core/ Structure (Expanded)

```
packages/core/
├── src/
│   ├── types/               # Domain types
│   │   ├── user.ts
│   │   ├── supplement.ts
│   │   ├── protocol.ts
│   │   ├── literature.ts
│   │   ├── product.ts
│   │   └── index.ts
│   │
│   ├── schemas/             # Zod schemas
│   │   ├── supplement.schema.ts
│   │   ├── protocol.schema.ts
│   │   └── index.ts
│   │
│   ├── lib/                 # Core utilities
│   │   ├── supabase/
│   │   │   ├── client.ts
│   │   │   ├── server.ts
│   │   │   ├── types.ts    # Generated types
│   │   │   └── queries/
│   │   │       ├── supplements.ts
│   │   │       ├── protocols.ts
│   │   │       └── users.ts
│   │   │
│   │   ├── api/            # API utilities
│   │   │   ├── fetcher.ts
│   │   │   └── error-handler.ts
│   │   │
│   │   └── utils/          # Shared utils
│   │       ├── date.ts
│   │       ├── string.ts
│   │       └── validation.ts
│   │
│   ├── constants/          # Constants
│   │   ├── supplement-categories.ts
│   │   ├── protocol-statuses.ts
│   │   └── index.ts
│   │
│   └── index.ts            # Exports
│
└── [config files]
```

### packages/config/ Structure

```
packages/config/
├── eslint/
│   ├── base.cjs            # Base config
│   ├── next.cjs            # Next.js config
│   └── react-library.cjs   # React library config
│
├── prettier/
│   └── index.cjs           # Prettier config
│
├── tailwind/
│   ├── preset.cjs          # Tailwind preset
│   └── tokens.cjs          # Design tokens
│
├── tsconfig/
│   ├── base.json           # Base TS config
│   ├── next-app.json       # Next.js app config
│   └── react-library.json  # React library config
│
└── package.json
```

---

## 🔧 Immediate Action Items

### 1. Root Level Cleanup

```bash
# Move documentation
mv repo-assessment.md docs/architecture/repository-assessment.md

# Remove legacy
rm -rf apps/web

# Move AI orchestrator
mv src/ai apps/platform/src/lib/ai/orchestrator.ts
rm -rf src

# Organize configs
mkdir -p config
mv litellm.config.yaml config/
ln -s config/litellm.config.yaml litellm.config.yaml  # Keep symlink if needed
```

### 2. Platform Components Reorganization

```bash
cd apps/platform/src/components

# Create feature directories
mkdir -p compass lens vanta-lab aegis dashboard

# Move module-specific components
# (Manual step - review and categorize each component)

# Delete duplicate UI components
rm -rf ui/  # Use @silo/ui instead
```

### 3. Core Package Enhancement

```bash
cd packages/core/src

# Create organized structure
mkdir -p types schemas lib/{supabase,api,utils} constants

# Move database types from platform
# Move types from apps/platform/src/lib/supabase/client.ts
# to packages/core/src/lib/supabase/types.ts
```

### 4. Landing App Organization

```bash
cd apps/landing/src/components

# Create structure
mkdir -p sections layout forms

# Move components to appropriate folders
mv site-header.tsx layout/
mv *-form.tsx forms/
mv hero.tsx features.tsx pillars.tsx sections/
```

### 5. Tests Organization

```bash
cd tests

# Create shared utilities
mkdir -p shared/{fixtures,helpers,mocks}

# Move common test utilities
```

### 6. Documentation Structure

```bash
cd docs

# Create organized structure
mkdir -p architecture/{decisions,diagrams} guides api

# Move existing docs
mv implementation-plan.md guides/
mv dev-env-to-do.md guides/environment-setup.md
mv repository-assessment.md architecture/
```

---

## 📋 File Naming Conventions

### Components
- **React Components:** `kebab-case.tsx` (e.g., `user-profile.tsx`)
- **Component Index:** `index.ts` for barrel exports
- **Test Files:** `*.test.tsx` or `*.spec.tsx`

### Utilities & Hooks
- **Utilities:** `kebab-case.ts` (e.g., `format-date.ts`)
- **Hooks:** `use-*.ts` prefix (e.g., `use-supplement-search.ts`)
- **Constants:** `UPPER_SNAKE_CASE` or `kebab-case.ts` files

### Types & Schemas
- **Types:** `PascalCase` types in `kebab-case.ts` files
- **Schemas:** `*.schema.ts` suffix (e.g., `supplement.schema.ts`)
- **Interfaces:** Prefix with `I` only when necessary

### API & Routes
- **API Routes:** `route.ts` (Next.js App Router convention)
- **Pages:** `page.tsx` (Next.js App Router convention)
- **Layouts:** `layout.tsx` (Next.js App Router convention)

---

## 🗂️ Import Path Aliases

Update `tsconfig.json` paths:

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"],
      "@/components/*": ["./src/components/*"],
      "@/features/*": ["./src/features/*"],
      "@/lib/*": ["./src/lib/*"],
      "@/types/*": ["./src/types/*"],
      "@/hooks/*": ["./src/lib/hooks/*"],
      "@/utils/*": ["./src/lib/utils/*"],
      "@/stores/*": ["./src/stores/*"]
    }
  }
}
```

---

## 📝 Component Organization Patterns

### Feature-Based Organization

Each feature module should be self-contained:

```
features/compass/
├── components/          # Feature-specific components
├── hooks/              # Feature-specific hooks
├── services/           # API calls, business logic
├── types.ts            # Feature types
├── utils.ts            # Feature utilities
└── index.ts            # Public API
```

### Colocation Strategy

Keep related files close:
- Component + test + story in same directory
- Feature logic with its UI components
- Types near their usage

---

## 🚀 Migration Checklist

### Phase 1: Cleanup (Immediate)
- [ ] Remove `apps/web/`
- [ ] Move `src/ai/` to `apps/platform/src/lib/ai/`
- [ ] Move `repo-assessment.md` to `docs/architecture/`
- [ ] Delete duplicate UI components in platform (use `@silo/ui`)

### Phase 2: Reorganize Platform (Week 1)
- [ ] Create feature directories (`features/*`)
- [ ] Move components to module folders (`components/{compass,lens,vanta-lab,aegis}`)
- [ ] Consolidate `lib/` utilities
- [ ] Update import paths

### Phase 3: Enhance Packages (Week 1-2)
- [ ] Move database types to `@silo/core`
- [ ] Expand `@silo/ui` with more primitives
- [ ] Create schemas in `@silo/core`
- [ ] Add barrel exports

### Phase 4: Documentation (Week 2)
- [ ] Organize docs into folders
- [ ] Create CONTRIBUTING.md
- [ ] Add ADRs for major decisions
- [ ] Document API contracts

### Phase 5: Testing & CI (Week 3)
- [ ] Create shared test utilities
- [ ] Add GitHub workflows
- [ ] Set up proper CI pipeline

---

## 💡 Best Practices

### Do's ✅
- Keep feature modules self-contained
- Use barrel exports (`index.ts`) for public APIs
- Colocate related files
- Prefer flat over deeply nested structures
- Use path aliases for clean imports
- Keep shared code in packages

### Don'ts ❌
- Don't duplicate components across apps
- Don't mix concerns (UI + business logic)
- Don't create deep folder hierarchies (max 3-4 levels)
- Don't put app-specific code in shared packages
- Don't ignore naming conventions
- Don't skip documentation for complex modules

---

## 🔍 Quick Reference

### Where Should This File Go?

| File Type | Location |
|-----------|----------|
| UI Component (shared) | `packages/ui/src/components/` |
| UI Component (app-specific) | `apps/{app}/src/components/` |
| Feature Component | `apps/platform/src/components/{module}/` |
| Domain Type | `packages/core/src/types/` |
| App Type | `apps/{app}/src/types/` |
| Shared Utility | `packages/core/src/lib/utils/` |
| App Utility | `apps/{app}/src/lib/utils/` |
| Database Query | `packages/core/src/lib/supabase/queries/` |
| API Route | `apps/{app}/src/app/api/` |
| Hook (shared) | `packages/ui/src/hooks/` or `packages/core/src/hooks/` |
| Hook (feature) | `apps/platform/src/features/{module}/hooks/` |
| Config | `packages/config/` or root |
| Documentation | `docs/` |
| Script | `scripts/` |

---

This organization guide should be treated as a living document and updated as the project evolves.
