
---

# COMPASS Product Spec (Agent Context)

**Pillar:** COMPASS
**Role in SILO:** Discovery & trend intelligence engine guiding users on *what* supplements/protocols to consider, before they personalize them in **VANTA Lab**.

---

## Mission & Value

* Provide a trusted, evidence-based discovery layer for supplements/protocols.
* Replace guesswork and social-media hype with **community + research + brand audit data**.
* Tight integration with other pillars:

  * **VANTA Lab** → action (add to stack)
  * **LENS** → deeper research
  * **AEGIS** → brand/product quality

---

## Core Features

### 1. Searchable DB

* Hybrid search: exact, trigram, semantic (pgvector).
* Supports supplements, protocols, articles.
* Synonym/alias handling (“Niacin” = “Vitamin B3”).
* Goal-based queries (“muscle recovery”).

### 2. Supplement & Protocol Cards

Each card = **360° view** generated real-time from multiple DBs:

* **Overview & Research Score** (from LENS).
* **User Metrics** (percent adoption, growth trend).
* **Common Stacks & Synergies** (from Stack DB).
* **Brand Audit Insights** (from AEGIS Brand DB).
* **Research Backdrop** (RAG summary).
* **Warnings & Contraindications** (FDA/reg feeds, NLP).
* **Add-to-Stack** (direct → VANTA Lab).
* **Practical details** (forms, dosage, bioavailability).

### 3. Real-Time Usage Stats

* “Most logged this week”, “Most copied stacks”.
* “Rising star” ingredients.
* Benchmarks (“Your regimen has 8 items; 70% of users have fewer”).

### 4. Leaderboards

* Top supplements (overall/category).
* Trending stacks/protocols.
* Emerging entries.
* (Future) Brand leaderboard.

### 5. Editorial Content

* **Featured articles** (deep dives).
* **Spotlights** (short updates on new studies/trends).
* **Regulatory news** (safety alerts, recalls).
* Powered by lightweight CMS.

### 6. Community Browsing

* Public/shared protocol library.
* Filters & tags (by goal, category).
* Safe “social proof” (aggregated adherence, satisfaction).
* **Strictly anonymized; no social profiles.**

---

## User Personas

* **Primary:** Health-conscious consumer (wants discovery + validation).
* **Secondary:**

  * Clinicians (quick at-a-glance dossiers, safety validation).
  * Brand managers / industry analysts (market intel, popularity trends).
  * Researchers / content creators (identify usage gaps, research targets).

---

## Example Journeys

1. Consumer discovers trending creatine → validates with research + brand info → adds to stack.
2. Clinician validates patient protocol with COMPASS → sees evidence + adherence stats → advises safely.
3. Brand manager spots Bacopa trending → competitive gap identified.
4. Researcher filters “Metabolic health” → sees Apple Cider Vinegar popular but weak evidence → identifies study gap.

---

## UX Patterns

* **Global search bar** with type-ahead (supplements, protocols, articles).
* **Card drawer overlay** (desktop: slide-in panel, mobile: full-screen modal).
* **Trending lists** (leaderboards, carousels).
* **Cross-pillar links:**

  * “View more in LENS” → studies
  * “View full brand profile in AEGIS” → quality
* **Accessibility:** Keyboard nav, high contrast, screen-reader labels.
* **Performance:** Edge caching, async load of RAG summaries, <1s card load target.

---

## Data Sources & Dependencies

* **Supplement DB:** Canonical supplements, aliases, dosage ranges, categories.
* **Stack DB:** User stacks, templates, adoption/adherence stats.
* **Brand DB:** Brands, certifications, recalls, quality notes.
* **Research DB (LENS):** Studies, embeddings, evidence scoring.
* **Analytics Engine:** Aggregated stats, benchmarks, leaderboards.
* **CMS:** Editorial articles & spotlights.
* **Regulatory feeds:** FDA/NIH/EFSA recalls & advisories.
* **External (future):** Google Trends, social mentions, sales data.

---

## Back-End Architecture

* **Supabase (Postgres + Auth + RLS)** → primary DB + auth.
* **Edge Functions:** Search orchestration, add-to-stack.
* **Hybrid Search:** SQL (trigram) + pgvector semantic search.
* **Microservices:**

  * RAG engine (LENS research summaries).
  * NLP engine (warnings, contraindications).
  * Analytics engine (trend calcs).
* **GraphQL API Gateway:** Unified schema for supplementCard, protocolCard, etc.
* **Caching:** Redis / edge KV (30m TTL for cards).

---

## Privacy & Compliance

* **Anonymization:** Trends never show individual data.
* **RLS:** Strict per-user isolation in DB.
* **Thresholds:** Minimum cohort sizes before surfacing stats.
* **Encryption:** TLS + encrypted storage.
* **Disclaimers:** Informational only, not medical advice.
* **GDPR/CCPA compliance:** Right to delete/export, opt-in aggregation.

---

## Metrics & KPIs

* **Engagement:** DAU/MAU, session length, queries/session.
* **Feature adoption:** Card opens, protocol copies, leaderboard CTR.
* **Conversions:** Add-to-Stack % from COMPASS.
* **Retention impact:** Users with COMPASS engagement vs without.
* **Content reads:** Article/spotlight readership.
* **Performance:** Search <200ms, card <1000ms.
* **Privacy:** 0 incidents, no personal data in trends.

---

## Roadmap (0–12 Months)

* **Phase 1 (0–3m):** Search + basic cards + editorial MVP.
* **Phase 2 (4–6m):** Trending stats, leaderboards, early personalization.
* **Phase 3 (7–9m):** NLP/RAG research summaries, quality scores, premium prep.
* **Phase 4 (10–12m):** Feedback-driven enhancements, external feeds, groundwork for native apps.

---

## Future Enhancements

* Conversational COMPASS (chat interface).
* Predictive trend forecasting (time-series ML).
* Peer-group personalization.
* External health/research feeds (PubMed, ClinicalTrials).
* Safe opt-in social (protocol Q&A, reviews).
* Integration with wearables/outcomes (VANTA correlation).
* B2B dashboards for brands/clinicians.
* Localization for regional supplement trends.

---

## Guardrails for Agents

* Never expose personal or raw user-level data.
* Always cite evidence (via LENS/Research DB) in outputs.
* Maintain cross-pillar integrity (no duplicating supplement/brand entries).
* Use caching patterns (don’t re-query heavy stats per request).
* Respect RLS boundaries and privacy thresholds.
* Disclaimers must remain intact in UI copy.

---
