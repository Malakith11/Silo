# Silo Development Environment Setup Guide

## Overview
This guide will walk you through setting up the complete development environment for Silo, including all AI/ML services, third-party integrations, and infrastructure components required for COMPASS, AEGIS, LENS, and VANTA Lab modules.

## Current Stack Summary
- **Frontend**: Next.js 15.3.4 + React 19 + TypeScript 5
- **Database**: Supabase (PostgreSQL + Real-time)
- **Auth**: Clerk
- **Styling**: Tailwind CSS v4 + Radix UI + shadcn/ui
- **Animation**: Framer Motion
- **Package Manager**: pnpm (monorepo)

---

## Phase 1: Core AI/ML Infrastructure Setup

### 1.1 OpenAI Configuration
**Purpose**: Powers all AI features across COMPASS, AEGIS, LENS, and VANTA
**Cost**: Pay-per-use, ~$0.002/1K tokens

**Setup Steps:**
1. Visit [OpenAI Platform](https://platform.openai.com)
2. Create account and verify phone number
3. Navigate to API Keys section
4. Generate new secret key
5. Add billing method (required for API access)
6. Set usage limits to prevent overspend

**Integration:**
```bash
npm install openai
```

**Environment Variables:**
```env
OPENAI_API_KEY=sk-proj-...
OPENAI_ORG_ID=org-... # Optional but recommended
```

**Usage in App:**
- **COMPASS**: Content analysis, trend summarization
- **AEGIS**: Brand quality scoring, content evaluation
- **LENS**: Document summarization, research insights
- **VANTA**: Protocol optimization, automation suggestions

### 1.2 Vector Database (Pinecone)
**Purpose**: Semantic search, similarity matching, RAG implementation
**Cost**: Free tier 100K vectors, $0.096/million vectors after

**Setup Steps:**
1. Sign up at [Pinecone](https://www.pinecone.io)
2. Create new project
3. Generate API key
4. Note your environment (e.g., `us-east-1-aws`)
5. Create indexes for each module:
   - `compass-trends` (dimension: 1536)
   - `aegis-brands` (dimension: 1536)
   - `lens-documents` (dimension: 1536)
   - `vanta-protocols` (dimension: 1536)

**Integration:**
```bash
npm install @pinecone-database/pinecone
```

**Environment Variables:**
```env
PINECONE_API_KEY=...
PINECONE_ENVIRONMENT=us-east-1-aws
```

### 1.3 Supabase Enhanced Setup
**Purpose**: Enhanced for vector operations and real-time features
**Cost**: Free tier generous, $25/month Pro

**Additional Setup:**
1. Enable pgvector extension in Supabase SQL editor:
   ```sql
   CREATE EXTENSION IF NOT EXISTS vector;
   ```
2. Create vector tables for each module
3. Set up Row Level Security (RLS) policies
4. Configure real-time subscriptions

**Integration:**
```bash
npm install @supabase/supabase-js
```

---

## Phase 2: External API Integrations

### 2.1 Social Media APIs (COMPASS Module)

#### Reddit API
**Purpose**: Community trend analysis, sentiment tracking
**Cost**: Free with rate limits

**Setup:**
1. Visit [Reddit Apps](https://www.reddit.com/prefs/apps)
2. Create "script" application
3. Note client ID and secret
4. Implement OAuth2 flow for user data

**Environment Variables:**
```env
REDDIT_CLIENT_ID=...
REDDIT_CLIENT_SECRET=...
REDDIT_USER_AGENT=Silo/1.0
```

#### Twitter/X API v2
**Purpose**: Real-time trend monitoring, social sentiment
**Cost**: $100/month for Basic tier

**Setup:**
1. Apply for [Twitter Developer Account](https://developer.twitter.com)
2. Create new project and app
3. Generate Bearer Token
4. Request elevated access for historical data

**Environment Variables:**
```env
TWITTER_BEARER_TOKEN=...
TWITTER_API_KEY=...
TWITTER_API_SECRET=...
```

#### Google Trends (Unofficial)
**Purpose**: Search trend data, geographic insights
**Cost**: Free (rate limited)

**Note**: Use google-trends-api package or web scraping approach

### 2.2 Document Processing APIs

#### PDF Processing
**Setup:**
```bash
npm install pdf-parse pdf2pic sharp
```

#### OCR (Tesseract.js)
**Purpose**: Extract text from images and scanned documents
```bash
npm install tesseract.js
```

---

## Phase 3: Infrastructure Services

### 3.1 Redis Setup (Caching & Real-time)
**Purpose**: Session storage, job queues, pub/sub, caching
**Cost**: Free tier on Railway/Upstash, ~$7/month paid

**Option A: Local Development**
```bash
# Using Docker
docker run -d --name redis -p 6379:6379 redis:alpine

# Using Homebrew (macOS)
brew install redis
brew services start redis
```

**Option B: Cloud Redis (Recommended)**
1. Sign up for [Upstash](https://upstash.com) or [Railway](https://railway.app)
2. Create Redis database
3. Copy connection URL

**Integration:**
```bash
npm install ioredis
```

**Environment Variables:**
```env
REDIS_URL=redis://localhost:6379
# OR for cloud:
REDIS_URL=rediss://default:password@host:port
```

### 3.2 Background Job Processing
**Purpose**: Async AI processing, data scraping, report generation

**Setup:**
```bash
npm install bullmq # Redis-based job queue
npm install node-cron # Scheduled tasks
```

**Integration with Redis:**
- Job queues for heavy AI processing
- Scheduled trend analysis
- Document processing pipelines

---

## Phase 4: Development Tools & Environment

### 4.1 Environment Variable Management
**Create `.env.local` file:**
```env
# Next.js
NEXT_PUBLIC_APP_URL=http://localhost:3001

# Clerk Auth (already configured)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=...
CLERK_SECRET_KEY=...

# Supabase (already configured)
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...

# OpenAI
OPENAI_API_KEY=...
OPENAI_ORG_ID=...

# Pinecone
PINECONE_API_KEY=...
PINECONE_ENVIRONMENT=...

# Redis
REDIS_URL=...

# Social Media APIs
REDDIT_CLIENT_ID=...
REDDIT_CLIENT_SECRET=...
TWITTER_BEARER_TOKEN=...

# Optional: Analytics & Monitoring
VERCEL_ANALYTICS_ID=...
SENTRY_DSN=...
```

### 4.2 Package Installation Plan

**Phase 1: Core AI/ML**
```bash
pnpm add openai @pinecone-database/pinecone langchain
pnpm add @supabase/supabase-js
pnpm add ioredis bullmq node-cron
```

**Phase 2: Data Processing**
```bash
pnpm add cheerio axios pdf-parse sharp
pnpm add mammoth pdf2pic tesseract.js
pnpm add csv-parser exceljs archiver multer
pnpm add sentiment compromise fuse.js
```

**Phase 3: Advanced UI**
```bash
pnpm add react-flow @monaco-editor/react
pnpm add d3 @visx/visx @nivo/core
pnpm add react-select react-datepicker
pnpm add react-grid-layout react-window
pnpm add @tanstack/react-query
```

**Phase 4: Development Tools**
```bash
pnpm add -D @types/d3 @types/pdf-parse @types/cheerio
pnpm add -D @types/multer @types/archiver
pnpm add -D nodemon dotenv
```

---

## Phase 5: Docker Development Environment

### 5.1 Create `docker-compose.yml`
```yaml
version: '3.8'
services:
  redis:
    image: redis:alpine
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data

  postgres:
    image: postgres:15
    environment:
      POSTGRES_DB: silo_dev
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  redis_data:
  postgres_data:
```

### 5.2 Start Services
```bash
docker-compose up -d
```

---

## Phase 6: Module-Specific Setup

### 6.1 COMPASS (Trend Discovery)
**Required Services:**
- OpenAI (content analysis)
- Pinecone (trend similarity)
- Redis (trend caching)
- Social media APIs

**Key Features to Implement:**
- Real-time trend monitoring
- Community sentiment analysis
- Trend prediction algorithms
- Social media integration

### 6.2 AEGIS (Brand Quality Auditing)
**Required Services:**
- OpenAI (brand analysis)
- Sharp (image processing)
- Document parsing libraries

**Key Features to Implement:**
- Brand scoring algorithms
- Competitive analysis
- Quality metrics dashboard
- Automated reporting

### 6.3 LENS (Research Intelligence)
**Required Services:**
- OpenAI (summarization)
- Pinecone (document search)
- OCR services
- Document processors

**Key Features to Implement:**
- RAG-based document search
- Intelligent summarization
- Evidence tracking
- Research workflows

### 6.4 VANTA Lab (Protocol Builder)
**Required Services:**
- Monaco Editor (code editing)
- React Flow (visual workflows)
- YAML processing

**Key Features to Implement:**
- Drag-drop protocol builder
- Code generation
- Protocol optimization
- Automation engine

---

## Phase 7: Testing & Validation

### 7.1 Service Health Checks
Create `/pages/api/health.ts`:
```typescript
export default async function handler(req, res) {
  const checks = {
    openai: await testOpenAI(),
    pinecone: await testPinecone(),
    redis: await testRedis(),
    supabase: await testSupabase()
  };

  res.status(200).json(checks);
}
```

### 7.2 Development Scripts
Add to `package.json`:
```json
{
  "scripts": {
    "dev": "next dev",
    "dev:docker": "docker-compose up -d && next dev",
    "health": "curl http://localhost:3001/api/health",
    "test:services": "node scripts/test-services.js"
  }
}
```

---

## Phase 8: Security & Performance

### 8.1 Rate Limiting
```bash
pnpm add express-rate-limit helmet
```

### 8.2 Input Validation
```bash
pnpm add joi zod # zod already installed
```

### 8.3 Security Headers
Configure in `next.config.js`:
```javascript
const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'origin-when-cross-origin' }
        ]
      }
    ];
  }
};
```

---

## Phase 9: Monitoring & Analytics

### 9.1 Error Tracking (Optional)
```bash
pnpm add @sentry/nextjs
```

### 9.2 Analytics (Optional)
```bash
pnpm add @vercel/analytics
```

---

## Estimated Costs (Monthly)

| Service | Free Tier | Paid Tier |
|---------|-----------|-----------|
| OpenAI | - | $20-100 |
| Pinecone | 100K vectors | $10-50 |
| Supabase | 500MB DB | $25 |
| Redis (Upstash) | 10K requests | $7 |
| Twitter API | - | $100 |
| **Total** | **Limited** | **$162-282/month** |

---

## Next Steps

1. **Start with Phase 1**: Set up OpenAI and basic AI functionality
2. **Choose services**: Decide between free/paid tiers based on usage
3. **Implement incrementally**: Build one module at a time
4. **Test thoroughly**: Use health check endpoints
5. **Monitor usage**: Set up billing alerts

---

## Troubleshooting

### Common Issues:
1. **OpenAI Rate Limits**: Implement exponential backoff
2. **Pinecone Index Issues**: Check dimension consistency
3. **Redis Connection**: Verify URL format and connectivity
4. **CORS Errors**: Configure API routes properly

### Debug Commands:
```bash
# Test Redis connection
redis-cli ping

# Check environment variables
printenv | grep -E "(OPENAI|PINECONE|REDIS)"

# Test API endpoints
curl http://localhost:3001/api/health
```

---

This setup will provide a robust foundation for all Silo modules. Start with the core services and gradually add complexity as needed.