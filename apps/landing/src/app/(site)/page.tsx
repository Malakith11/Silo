import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  CircleDashed,
  Layers,
  LineChart,
  Microscope,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Button, Card, Heading, Section } from "@silo/ui";

import { FeatureShowcase } from "../../components/feature-showcase";
import { SiteHeader } from "../../components/site-header";
import { Pillars } from "../../components/pillars";
import { WaitlistForm } from "../../components/waitlist-form";
import { EvidenceHighlights } from "../../components/evidence-highlights";
import { Testimonials } from "../../components/testimonials";

export const dynamic = "force-dynamic";

const metrics = [
  { value: "4,200+", label: "research studies indexed" },
  { value: "31k", label: "products scored by Aegis" },
  { value: "1,800", label: "personalized protocols in pilot" },
];

const experienceHighlights = [
  {
    title: "Unified intelligence",
    description:
      "Compass, Lens, Vanta, and Aegis share a single profile so every recommendation understands your biomarkers, sensitivities, and objectives.",
    icon: Layers,
  },
  {
    title: "Audit-ready evidence",
    description:
      "Every suggestion links back to transparent, quality-weighted research summaries so you can defend protocol decisions in seconds.",
    icon: Microscope,
  },
  {
    title: "Adaptive protocols",
    description:
      "Stacks evolve as your labs, symptoms, and adherence change—nudging you before a deficiency trend becomes a setback.",
    icon: LineChart,
  },
];

const workflow = [
  {
    phase: "01",
    title: "Capture your context",
    description:
      "Intake your goals, biomarker history, medications, and current stack so Silo can understand the whole picture from day one.",
    icon: Sparkles,
  },
  {
    phase: "02",
    title: "See what matters",
    description:
      "Compass surfaces high-leverage interventions while Lens reveals the evidence strength, populations, and safety notes behind each option.",
    icon: ShieldCheck,
  },
  {
    phase: "03",
    title: "Activate your stack",
    description:
      "Vanta translates decisions into precise dosing schedules, while Aegis validates product quality and flags compliance or sourcing risks.",
    icon: CircleDashed,
  },
];

const trustedBy = [
  "Performance clinics",
  "Longevity labs",
  "Integrative coaches",
  "Biohackers",
];

const moduleHighlights = [
  {
    title: "Guided workspace",
    description:
      "Kick off with a single profile that unifies labs, habits, and goals so Compass can prioritize the highest-leverage moves immediately.",
    icon: Sparkles,
  },
  {
    title: "Evidence on demand",
    description:
      "Lens keeps citations, populations, and safety notes one tap away for every suggestion so you never guess at justification.",
    icon: ShieldCheck,
  },
  {
    title: "Adaptive execution",
    description:
      "Vanta and Aegis sync adherence, inventory, and biomarker shifts to keep dosing and sourcing decisions current.",
    icon: LineChart,
  },
];

export default function LandingPage() {
  return (
    <div className="relative isolate overflow-hidden">
      <div className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-brand-primary/20 blur-3xl" />
      <div className="pointer-events-none absolute right-[-12rem] top-24 -z-10 h-[30rem] w-[30rem] rounded-full bg-brand-secondary/20 blur-3xl" />
      <div className="pointer-events-none absolute left-[12%] top-[32rem] -z-10 h-56 w-56 rounded-full bg-brand-accent/15 blur-3xl animate-glow-loop" />

      <SiteHeader />

      <main className="relative z-10">
        <Section
          id="hero"
          width="wide"
          padded={false}
          className="relative pb-28 pt-28 sm:pb-32 sm:pt-36"
        >
          <div className="relative grid gap-16 lg:grid-cols-[minmax(0,0.95fr)_minmax(380px,1fr)] lg:items-center">
            <div className="space-y-10">
              <div className="flex flex-wrap items-center gap-3 text-sm">
                <span className="inline-flex items-center gap-2 rounded-full border border-brand-primary/30 bg-white/80 px-4 py-1 font-medium text-brand-primary backdrop-blur">
                  <Sparkles className="h-4 w-4" aria-hidden />
                  Beta waitlist now open
                </span>
                <span className="text-brand-dark/60">
                  Invite cohorts begin June 2025
                </span>
              </div>

              <div className="space-y-6">
                <Heading
                  level={1}
                  eyebrow="Precision supplement intelligence"
                  className="max-w-3xl"
                >
                  Stop guessing your stack. Build a research-backed protocol in
                  minutes.
                </Heading>
                <p className="max-w-2xl text-lg leading-relaxed text-brand-dark/75">
                  Silo unifies intake, evidence, and execution so you can
                  translate biomarkers, goals, and product quality data into
                  confident supplement plans without spreadsheets or manual
                  reconciliations.
                </p>
                <div className="flex flex-wrap items-center gap-4">
                  <Button size="lg" asChild>
                    <Link href="#waitlist">
                      Join the waitlist
                      <ArrowRight className="ml-2 h-5 w-5" aria-hidden />
                    </Link>
                  </Button>
                  <Button variant="secondary" size="lg" asChild>
                    <Link href="#modules">See product overview</Link>
                  </Button>
                  <Button variant="ghost" size="lg" asChild>
                    <Link href="#evidence">Review the evidence</Link>
                  </Button>
                </div>
              </div>

              <dl className="grid gap-6 rounded-[2rem] border border-white/50 bg-white/80 p-6 shadow-xl shadow-brand-primary/5 backdrop-blur lg:grid-cols-3">
                {metrics.map((metric) => (
                  <div key={metric.label} className="space-y-1">
                    <dt className="text-sm font-medium uppercase tracking-wide text-brand-dark/55">
                      {metric.label}
                    </dt>
                    <dd className="text-3xl font-semibold text-brand-dark">
                      {metric.value}
                    </dd>
                  </div>
                ))}
              </dl>

              <div className="flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-brand-dark/60">
                <span className="font-medium text-brand-dark/80">
                  Trusted by
                </span>
                {trustedBy.map((label) => (
                  <span key={label} className="flex items-center gap-2">
                    <CheckCircle2
                      className="h-4 w-4 text-brand-primary"
                      aria-hidden
                    />
                    {label}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                <div className="animate-float-slow inline-flex items-center gap-2 rounded-2xl border border-brand-primary/20 bg-white/70 px-4 py-2 text-xs font-semibold text-brand-primary/80 shadow-sm">
                  <Sparkles className="h-3.5 w-3.5" aria-hidden />
                  Adaptive insights refresh nightly
                </div>
                <div className="animate-float-slow inline-flex items-center gap-2 rounded-2xl border border-brand-dark/10 bg-white/60 px-4 py-2 text-xs font-semibold text-brand-dark/70 shadow-sm [animation-delay:1.5s]">
                  <ShieldCheck
                    className="h-3.5 w-3.5 text-brand-secondary"
                    aria-hidden
                  />
                  Evidence traceability built-in
                </div>
              </div>
            </div>

            <div className="relative rounded-[2.25rem] border border-white/50 bg-white/85 p-6 shadow-[0_35px_110px_-60px_rgba(28,28,40,0.4)]">
              <Heading level={3} className="text-brand-dark">
                Unified intelligence across Compass, Lens, Vanta, and Aegis
              </Heading>
              <p className="mt-4 text-brand-dark/70">
                Live demo coming soon. In the meantime, explore each module below to see
                how Silo guides evidence-backed decisions.
              </p>
              <div className="pointer-events-none absolute -left-10 bottom-[-2.5rem] hidden animate-float-slow rounded-2xl border border-brand-dark/10 bg-white/80 px-5 py-4 text-sm font-semibold text-brand-dark shadow-lg shadow-brand-dark/10 lg:flex">
                <LineChart
                  className="mr-3 h-4 w-4 text-brand-primary"
                  aria-hidden
                />
                Real-time personalization score:
                <span className="ml-2 text-brand-primary">92%</span>
              </div>
            </div>
          </div>
        </Section>

        <Section id="modules" className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-brand-primary/10 via-white to-brand-secondary/15" />
          <div className="pointer-events-none absolute -right-24 top-12 -z-10 h-64 w-64 rounded-full bg-brand-primary/15 blur-3xl" />
          <div className="relative grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(320px,400px)] lg:items-start">
            <div className="space-y-8">
              <span className="inline-flex items-center justify-center rounded-full border border-brand-primary/20 bg-white/70 px-4 py-1 text-sm font-medium text-brand-primary/80">
                Compass • Lens • Vanta • Aegis
              </span>
              <Heading level={2} className="mt-2">
                An operating system for evidence-backed supplementation
              </Heading>
              <p className="max-w-2xl text-brand-dark/70">
                Map every decision back to transparent research, auto-validated
                products, and adaptive dosing plans that respond to your body in
                real time.
              </p>
              <div className="rounded-[2.25rem] border border-white/50 bg-white/85 p-6 shadow-[0_35px_110px_-60px_rgba(28,28,40,0.4)] backdrop-blur">
                <FeatureShowcase />
              </div>
            </div>

            <Card className="border-white/60 bg-white/85 shadow-[0_30px_90px_-60px_rgba(28,28,40,0.4)]">
              <Heading level={4} eyebrow="What launches with beta">
                More than a static dashboard
              </Heading>
              <ul className="mt-6 space-y-4 text-sm text-brand-dark/70">
                {moduleHighlights.map((highlight) => {
                  const Icon = highlight.icon;
                  return (
                    <li
                      key={highlight.title}
                      className="flex items-start gap-3 rounded-2xl border border-transparent bg-white/70 px-4 py-4 transition hover:border-brand-primary/20 hover:bg-white"
                    >
                      <span className="mt-1 flex h-8 w-8 items-center justify-center rounded-xl bg-brand-primary/10 text-brand-primary">
                        <Icon className="h-4 w-4" aria-hidden />
                      </span>
                      <div>
                        <p className="text-base font-semibold text-brand-dark">
                          {highlight.title}
                        </p>
                        <p className="mt-2 text-sm text-brand-dark/65">
                          {highlight.description}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </Card>
          </div>
        </Section>

        <Section className="relative" aria-labelledby="experience-heading">
          <div className="absolute inset-0 rounded-3xl bg-white/75 shadow-[0_50px_140px_-70px_rgba(28,28,40,0.35)]" />
          <div className="relative space-y-8 px-6 py-12 sm:px-10">
            <Heading
              id="experience-heading"
              level={2}
              eyebrow="Why teams switch to Silo"
              className="text-center"
            >
              Keep your stack accountable without losing speed
            </Heading>
            <div className="grid gap-6 lg:grid-cols-3">
              {experienceHighlights.map((item) => (
                <Card
                  key={item.title}
                  className="group h-full border border-brand-primary/10 bg-white/90 p-6 shadow-none transition hover:-translate-y-1 hover:border-brand-primary/25 hover:shadow-[0_35px_80px_-55px_rgba(28,28,40,0.45)]"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-primary/10 text-brand-primary transition group-hover:bg-brand-primary/20">
                    <item.icon className="h-6 w-6" aria-hidden />
                  </div>
                  <Heading level={4} className="mt-5">
                    {item.title}
                  </Heading>
                  <p className="mt-3 text-sm text-brand-dark/70">
                    {item.description}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </Section>

        <Section id="workflow" className="relative">
          <div className="text-center">
            <Heading level={2} eyebrow="How Silo adapts to you">
              A guided loop from intake to ongoing refinement
            </Heading>
            <p className="mx-auto mt-4 max-w-2xl text-brand-dark/70">
              Design evidence-backed stacks, confirm product quality, and keep
              protocols accountable as biomarkers and real-world results evolve.
            </p>
          </div>
          <div className="relative mt-12 grid gap-6 lg:grid-cols-3">
            {workflow.map((stage) => (
              <Card
                key={stage.title}
                className="relative h-full border border-white/50 bg-white/85 p-8 shadow-[0_30px_90px_-60px_rgba(28,28,40,0.35)] transition hover:-translate-y-1 hover:border-brand-primary/20"
              >
                <div className="mb-6 flex items-center gap-3 text-sm font-medium text-brand-primary">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-primary/15 text-base font-semibold text-brand-primary">
                    {stage.phase}
                  </span>
                  <span>Journey</span>
                </div>
                <div className="flex items-start gap-4">
                  <span className="rounded-lg bg-brand-primary/10 p-2 text-brand-primary">
                    <stage.icon className="h-5 w-5" aria-hidden />
                  </span>
                  <div className="space-y-3">
                    <Heading level={4}>{stage.title}</Heading>
                    <p className="text-sm text-brand-dark/70">
                      {stage.description}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Section>

        <Section id="pillars" className="relative">
          <div className="absolute inset-0 rounded-3xl bg-brand-primary/5" />
          <div className="relative space-y-12 px-6 py-12 sm:px-10">
            <Heading level={2} className="text-center">
              Built for practitioners, experimenters, and
              <span className="block sm:inline sm:ml-1">
                performance teams alike
              </span>
            </Heading>
            <Pillars />
          </div>
        </Section>

        <Section id="evidence" className="relative">
          <div className="absolute -inset-x-6 inset-y-0 rounded-[2.5rem] bg-white/85 shadow-[0_50px_120px_-60px_rgba(28,28,40,0.4)]" />
          <div className="relative px-6 py-12 sm:px-10">
            <Heading level={2} className="text-center">
              Every claim, sourced. Every protocol, defensible.
            </Heading>
            <p className="mx-auto mt-4 max-w-2xl text-center text-brand-dark/70">
              Lens distills thousands of papers into structured,
              clinician-friendly briefs so you can audit efficacy, dosing, and
              safety before anything hits the stack.
            </p>
            <div className="mt-10">
              <EvidenceHighlights />
            </div>
          </div>
        </Section>

        <Section className="relative">
          <div className="absolute inset-0 rounded-3xl bg-brand-dark" />
          <div className="relative px-6 py-16 sm:px-10">
            <Heading
              level={2}
              className="text-center text-brand-light"
              eyebrow="Proof from the field"
            >
              Trusted by early clinical partners and advanced self-quantifiers
            </Heading>
            <p className="mx-auto mt-4 max-w-2xl text-center text-brand-light/70">
              From integrative clinics launching outcome-driven programs to
              biohackers staying ahead of their biomarkers, Silo keeps stacks
              accountable.
            </p>
            <div className="mt-12">
              <Testimonials />
            </div>
          </div>
        </Section>

        <section
          id="waitlist"
          className="relative isolate overflow-hidden bg-brand-dark py-24 text-brand-light"
        >
          <div className="pointer-events-none absolute inset-x-1/2 top-0 h-64 w-64 -translate-x-1/2 rounded-full bg-brand-secondary/30 blur-3xl" />
          <Section padded={false} className="relative z-10">
            <div className="mx-auto grid max-w-6xl gap-12 px-6 sm:px-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(320px,1fr)] lg:items-start">
              <div className="space-y-6">
                <Heading
                  level={2}
                  eyebrow="Get early access"
                  className="text-brand-light"
                >
                  Help shape the Silo beta and bring evidence-led protocols to
                  life
                </Heading>
                <p className="text-brand-light/75">
                  <span>
                    Join the waitlist to receive launch updates, early
                    walkthroughs, and concierge onboarding when beta cohorts
                    open.
                  </span>
                  <span className="block">
                    We’ll use your responses to prioritize integrations and
                    evidence reviews.
                  </span>
                </p>
                <ul className="space-y-3 text-sm text-brand-light/70">
                  <li className="flex items-center gap-2">
                    <CheckCircle2
                      className="h-4 w-4 text-brand-secondary"
                      aria-hidden
                    />
                    Personalized onboarding session with the Silo team
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2
                      className="h-4 w-4 text-brand-secondary"
                      aria-hidden
                    />
                    Early access to Lens research drops and protocol templates
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2
                      className="h-4 w-4 text-brand-secondary"
                      aria-hidden
                    />
                    Influence the roadmap for integrations, biomarkers, and
                    evidence packages
                  </li>
                </ul>
              </div>
              <Card
                variant="outline"
                className="border-brand-light/25 bg-white/5 p-6 backdrop-blur"
              >
                <WaitlistForm />
              </Card>
            </div>
          </Section>
        </section>
      </main>
    </div>
  );
}
