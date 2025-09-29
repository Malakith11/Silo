
---

# LENS Product Spec (Agent Context)

**Pillar:** LENS
**Role in SILO:** Research & evidence intelligence engine.
**Goal:** Make supplement science transparent, accessible, and actionable through structured study libraries, evidence scoring, and AI-driven summaries.

---

## Mission & Value

* Supplements are full of hype and conflicting claims; LENS grounds SILO in **peer-reviewed evidence and regulatory data**.
* Provides **semantic search + quality scoring + plain-language summaries.**
* Bridges the gap between dense clinical research and user decisions: *“From goal to dose in minutes.”*
* Core differentiator: Transparent scoring (RoB2, GRADE) + AI summarization + integration with other SILO pillars.

---

## Core Features

### 1. Searchable Research Library

* Hybrid search (BM25 keyword + pgvector semantic).
* Search by supplement, health outcome, biomarker, condition, author.
* Filters: study type (RCT, meta-analysis, observational), publication year, quality score.
* Output: study cards (title, journal, date, summary, quality badges).

### 2. Research Quality Scorecards

* Hybrid scoring model:

  * **Methodology (RoB2)** → bias risk.
  * **Evidence strength (GRADE)** → High/Moderate/Low/Very Low.
  * **Sample size & power.**
  * **Relevance to SILO users** (population, dose, outcome applicability).
  * **Conflicts of interest** (industry funding, author ties).
* Red flags (poor design, bias, conflicts) clearly surfaced.
* Output: at-a-glance rating (e.g., 82/100, “Low risk, Moderate evidence”).

### 3. Semantic RAG Summaries

* Retrieval-Augmented Generation (RAG) pipeline.
* GPT-4 (or equivalent) produces short summaries, always with citations.
* Plain-language but clinical tone: “Suggests benefit,” never prescriptive.
* Cached for common queries.

### 4. Personalized Topic Following & Digests

* Users can follow **topics** (compound, condition, category).
* Weekly digest: highlights new high-quality studies.
* Digest = email + in-app feed.
* Logged-out users see trending; logged-in get personalized updates.

### 5. Save/Bookmark System

* Save studies into “My Library.”
* Cloud-synced across devices.
* Saved studies show update status (e.g., retraction, newer studies).

### 6. Integration with VANTA Lab

* One-click import from study → supplement protocol.
* Transfers supplement name + suggested dose + study citation.
* In VANTA, users can see “Research-backed” badge under stack items.

### 7. Integration with COMPASS & AEGIS

* **COMPASS** → trending topics include latest research.
* **AEGIS** → flag conflicts (industry-funded trials linked to brand quality).
* **Cross-linking:**

  * From COMPASS supplement → “See evidence in LENS.”
  * From AEGIS brand → “See published studies.”

---

## Personas

* **Primary:** Everyday users → want quick, trustworthy research summaries.
* **Secondary:**

  * Clinicians → credibility checks for recommendations.
  * Researchers → structured, searchable study DB.
  * Investors/partners → defensible scientific foundation of SILO.

---

## Example Journeys

1. User searches “Magnesium sleep.” → gets list of studies + summary → imports supplement to VANTA stack.
2. User follows “Omega-3 + Heart Health.” → weekly digest highlights 2 new RCTs.
3. Clinician checks “Ashwagandha stress trials.” → sees evidence strength + funding conflicts.
4. Investor demos → views transparent RAG + scoring pipeline.

---

## Back-End Architecture

* **Database:** Supabase Postgres with pgvector + full-text indexes.
* **Entities:**

  * `research_study` (title, authors, abstract, score, embedding).
  * `topic` (compound, condition, category).
  * `study_tag` (study–topic join).
  * `study_supplement` (study–supplement join).
  * `saved_study` (user bookmarks).
  * `followed_topic` (user subscriptions).
* **Edge Functions:**

  * `lensSearch` (hybrid ranking).
  * `lensSummary` (RAG summarization).
  * `generateDigest` (scheduled weekly digest).
* **APIs:** REST endpoints auto-generated via Supabase; custom RPCs for hybrid search & RAG.

---

## UX & Design

* **Search → Results → Study card → Study detail.**
* Study cards show score & summary.
* Study detail = abstract + scorecard + AI summary + save/follow buttons.
* Topic pages: curated hubs (e.g., “Vitamin D” → top studies + digest option).
* Dashboard: “For You” research feed + “My Library.”

---

## Privacy & Compliance

* User data = preferences only (saves, follows, digests).
* **RLS** on `saved_study` and `followed_topic`.
* No personal identifiers passed to AI prompts.
* Summaries always cite sources → no hallucination risk.
* GDPR/CCPA compliant (export/delete data).
* Medical disclaimer: informational only.

---

## KPIs

* **Engagement:** searches/session, DAU.
* **Retention:** digest open rate, topic follow growth.
* **Adoption:** studies imported → VANTA stacks.
* **Quality:** % of studies with completed scorecards.
* **Performance:** search <300ms, summary <2s with caching.

---

## Guardrails for Agents

* Always ground summaries in retrieved text.
* Never recommend supplements directly → only cite evidence.
* Flag low-quality/biased studies; don’t up-rank them.
* Ensure RLS is enforced on user saves/follows.
* Always include disclaimers (“informational only”).

---
