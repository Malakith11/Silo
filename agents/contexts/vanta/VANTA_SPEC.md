
---

# VANTA Lab Product Spec (Agent Context)

**Pillar:** VANTA Lab
**Role in SILO:** Personalized supplement protocol builder & optimization engine.
**Goal:** Let users create, manage, and optimize daily supplement regimens (“stacks”) grounded in evidence, tracked with adherence, and integrated with research (LENS), discovery (COMPASS), and brand quality (AEGIS).

---

## Mission & Value

* Supplements are fragmented and overwhelming; VANTA Lab makes regimen design **intuitive, evidence-first, and adaptive.**
* Transforms insights → action → outcomes in one loop.
* Core differentiator: Continuous optimization using rules + NLP + research integration.
* Value for users: Every pill has a purpose.
* Value for investors: Defensible personalization engine linking SILO’s pillars.

---

## Core Features

### 1. Stack Builder

* **Drag & drop daily schedule** with up to 12 time blocks (Morning, Post-Workout, Evening, etc.).
* Add supplements via search, barcode scanning, or free-text custom entries.
* Editable cards: dose, frequency, timing, notes.
* Template library for common goals (sleep, focus, immunity).

### 2. Optimization Engine

* **Assistive mode (default):** generates suggestions, user accepts/rejects.
* **Directive mode (opt-in):** auto-applies critical changes (safety, overdosing), notifies user.
* Suggestion types:

  * Add/remove supplements (based on evidence or redundancy).
  * Dose/timing adjustments.
  * Safety flags (interactions, overdoses).
  * Synergies (e.g., Vit C + Iron).
  * Adherence/budget simplifications.
  * Quality alerts (via AEGIS).
* Always backed by research citations (LENS) or community stats.

### 3. Safety & Synergy Checks

* Real-time alerts for unsafe combos (e.g., St John’s Wort + SSRIs).
* Dosage caps enforced.
* Highlight positive synergies and evidence-backed pairings.

### 4. Adherence & Inventory Tracking

* Daily checklist logging.
* Reminders/notifications.
* Adherence analytics (per supplement, per block, overall %).
* Gamification: streaks, positive reinforcement.
* Inventory countdown + refill alerts (with AEGIS product links).

### 5. Wearables & Biomarker Correlation

* Integrates with Apple Health, Google Fit, Oura, Fitbit.
* Tracks sleep, HRV, RHR, activity, mood.
* Correlates intake vs outcomes (e.g., magnesium → +15m deep sleep).
* Surfaces insights (“positive association” / “no effect observed”).

### 6. Caregiver Mode

* 1:1 account linking.
* Caregiver can manage dependent’s regimen: build, log, track.
* Permissions enforced with row-level security.
* Notifications mirrored to caregiver.

### 7. Sharing, Versioning, Export

* **Share link:** read-only protocol view with import option.
* **Export:** PDF, CSV, JSON, .ics calendar feed.
* **Versioning:** history of stack changes with diffs, revert option.
* Supports professional use cases (doctor/nutritionist review).

### 8. Cross-Pillar Integration

* **COMPASS → VANTA:** import trending supplements or full protocols.
* **LENS → VANTA:** import study-backed supplements with dose/timing prefilled, linked citation.
* **AEGIS → VANTA:** brand/product quality substitution alerts.

---

## Personas

* **Primary:** Everyday users (wellness seekers, biohackers).
* **Secondary:** Caregivers, clinicians, investors, researchers.

---

## Back-End & Architecture

* **Supabase (Postgres):** central DB.
* **Key Tables:**

  * `stack`, `stack_item`, `adherence_log`, `supplement_inventory`.
* **RLS policies:** strict per-user access; caregiver exceptions via mapping.
* **Edge functions:** `optimizeStack`, `importFromLens`, `importFromCompass`, `generateInsights`.
* **NLP & RAG:** enrich optimization with research-backed rationale.
* **Real-time sync:** Supabase subscriptions keep devices in sync.

---

## UX & Design

* **Builder:** timeline view with draggable supplement cards.
* **Tracking:** checklist with reminders.
* **Insights:** side panel for optimization suggestions.
* **Compare/Export:** PDF/CSV views.
* **Caregiver toggle:** clear context switching.
* Visual tone: clinical yet approachable; accessibility-first design.

---

## Privacy & Compliance

* GDPR/CCPA compliant.
* HIPAA-style handling of health data (though not regulated entity).
* RLS enforcement = no cross-user data leakage.
* All AI queries anonymized (no PII passed).
* Users can export/delete data at any time.

---

## KPIs

* **Engagement:** stacks created, daily check-ins.
* **Adherence:** average user consistency %.
* **Optimization adoption:** % of suggestions accepted.
* **Outcome correlation:** # of biomarker-linked insights surfaced.
* **Retention:** 30/90-day active usage.
* **Conversion:** template imports, COMPASS/LENS handoffs.

---

## Guardrails for Agents

* Always enforce dose limits & safety checks.
* Never auto-apply changes without user consent (except red-flag safety in directive mode).
* All suggestions must cite evidence (via LENS) or rationale (community stats).
* Default to assistive mode for user control.
* Inventory, adherence, wearable data = private, caregiver exceptions only.
* Sharing = opt-in, no public exposure by default.

---
