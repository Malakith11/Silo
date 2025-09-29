
---

# AEGIS Product Spec (Agent Context)

**Pillar:** AEGIS
**Role in SILO:** Brand integrity & quality audit engine for supplements.
**Goal:** Expose unsafe or misleading products, highlight trustworthy brands, and provide transparent scorecards to guide consumer choice.

---

## Mission & Value

* Supplements are largely unregulated; many mislabeled, contaminated, or adulterated.
* AEGIS closes this trust gap with **brand/product audits, quality scorecards, and transparent profiles.**
* Benefits:

  * Consumers → safe, informed choices.
  * Good manufacturers → rewarded with visibility.
  * Market → nudged toward higher standards.
* Positioning: “Yuka for supplements” + “LabDoor transparency” + SILO ecosystem synergy.

---

## Core Features

### 1. Quality Scorecards

* Each product receives a **multi-factor score** (0–100 / A–F + color coding).
* Weighted on:

  * **Purity** (contaminants, adulterants).
  * **Label Accuracy/Potency** (dosage matches label).
  * **Bioavailability** (ingredient forms).
  * **Ingredient sourcing** (traceability, ethics).
  * **Third-Party Testing** (USP, NSF, etc.).
  * **Compliance & Manufacturing Standards** (GMP, ISO).
  * **Regulatory history** (FDA recalls, warnings).
  * **Transparency/Conflicts** (ownership, lab independence).
* Red flags (adulterants, recalls) cap scores regardless of other metrics.

### 2. Deep Brand Profiles

Each profile page includes:

* **Score breakdown** by metric.
* **Ingredient traceability** & COAs (if disclosed).
* **Badges & certifications** (USP, NSF, Organic, Vegan, Non-GMO, etc.).
* **Regulatory flag history** (FDA letters, recalls, controversies).
* **Community usage stats** (e.g. “22% of SILO users include this brand”).
* **Issue reporting** (users can flag problems; moderated, no open reviews).
* **Recommended alternatives** (better-rated brands in category).

### 3. Search & Navigation

* Query by product/brand (“Fish Oil”, “Optimum Nutrition Whey”).
* Results ranked by quality score.
* Results cards = product name + brand + summary score + highlight badges.
* Filters: certifications, categories, formulations, score range.
* Product variants tracked separately but grouped (old vs new formula).

### 4. Cross-Pillar Integrations

* **COMPASS** → jump from general supplement info to trusted brand listings.
* **VANTA Lab** → add specific branded product to personal regimen (with quality score).
* **LENS** → scanning interface (barcode/label) that resolves to AEGIS product profile.

### 5. User Tools

* **Compare products side-by-side.**
* **Favorites/wishlist.**
* **Purchase links** (official site or retailer; potential affiliate).

---

## Personas

* **Primary:** Health-conscious consumer → wants brand trust, safety, and clarity.
* **Secondary:**

  * Clinicians → need quick brand credibility checks.
  * Brand managers/analysts → market positioning and gaps.
  * Researchers → see if usage/popularity aligns with quality.

---

## Data Acquisition & Maintenance

* **Web scraping/APIs:** Label databases, FDA recalls, brand sites.
* **Third-party feeds:** USP, NSF, ConsumerLab (if partnerships).
* **Manual staff curation:** Verification, audits, SILO-Verified seals.
* **User submissions:** Request missing products, report issues.
* **Moderation:** Staff validate reports, prevent fake entries.
* **Prioritization:** Start with most popular/trending brands; expand over time.

---

## Scoring Methodology

* Weighted criteria, transparent rationale.
* Example: Purity + Label Accuracy = 30%, Third-party testing 20%, Sourcing 20%, Transparency 15%, Regulatory 10%, Conflicts 5%.
* Critical red flags cap scores.
* Users always see **why** a product got its score (links to FDA/COA).

---

## Access & Monetization

* **Free tier:**

  * Search brands, see ranked list + basic score.
  * Serious safety alerts always visible.
* **Premium tier:**

  * Full profile breakdowns.
  * Alternatives, compare, favorites.
  * Barcode scanning (LENS).
  * Usage stats integration.
* **Brand verification program:** Optional SILO-audited seal (not pay-to-play).
* **Affiliate/purchase links:** Additional revenue stream.

---

## UX & Design

* **List view:** Ranked brand/product cards with summary scores.
* **Profile view:** Multi-section breakdown (score, sourcing, certifications, flags, usage stats).
* **Compare view:** Side-by-side metrics.
* **Scanner overlay:** AR/barcode → instant profile.
* **Integration links:** “View supplement details in COMPASS” / “Add to stack in VANTA.”

---

## Privacy & Compliance

* **No personal reviews/comments** → avoids manipulation.
* **Community data = anonymized aggregates only.**
* **RLS (row-level security)** ensures user logs stay private.
* **Critical safety warnings always public.**
* **Compliance:** GDPR/CCPA, FDA labeling/disclaimer rules, HIPAA-like safeguards if clinicians involved.

---

## KPIs

* **Engagement:** Search volume, profile views, scanner usage.
* **Conversions:** Premium upgrades, affiliate link clicks.
* **Adoption:** Add-to-stack from AEGIS into VANTA.
* **Coverage:** % of top searched brands/products profiled.
* **Trust metrics:** Issue reports resolved, % of profiles with verified COAs.
* **Retention:** Users with AEGIS access show higher 3/6-month retention.

---

## Roadmap (0–12 Months)

* **Phase 1 (0–3m):** Core search, brand/product list, basic scorecards.
* **Phase 2 (4–6m):** Detailed profiles, flags, alternatives, COMPASS/VANTA integration.
* **Phase 3 (7–9m):** Scanner integration, premium gating, recommendations.
* **Phase 4 (10–12m):** Personalization (rankings by user goals), medicine cabinet dashboard.

---

## Future Enhancements

* **Personalized rankings** (e.g. athletes filter by NSF-certified only).
* **Medicine cabinet dashboard** (alert users to quality issues across regimen).
* **Label/formula change tracking** (flag reformulations).
* **AR label overlay** (real-time ingredient-by-ingredient checks).
* **Enterprise dashboards** (brand/clinician intelligence).

---

## Guardrails for Agents

* Never allow user-generated reviews/comments (avoid bias/manipulation).
* Always expose safety recalls/flags, even in free tier.
* Maintain transparency in scoring logic (link to source docs).
* Enforce **privacy-first aggregation thresholds** for usage stats.
* Don’t allow brand influence over scores (no pay-to-win).

---
