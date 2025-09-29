import { ArrowRight, Sparkles, Star, Scan, Library, Compass, Activity } from "lucide-react";
import Link from "next/link";
import { Button, Card, Heading, Section } from "@silo/ui";
import { FeatureShowcase } from "@/components/feature-showcase";
import { Pillars } from "@/components/pillars";
import { WaitlistForm } from "@/components/waitlist-form";
import { EvidenceHighlights } from "@/components/evidence-highlights";
import { Testimonials } from "@/components/testimonials";

const heroHighlights = [
  {
    icon: Sparkles,
    title: "Personalized intelligence",
    description: "Translate biomarkers and goals into targeted supplement actions.",
  },
  {
    icon: Library,
    title: "Evidence you can audit",
    description: "Trace every protocol recommendation back to peer-reviewed literature.",
  },
  {
    icon: Scan,
    title: "Product verification",
    description: "Scan labels with Aegis to surface purity, dosage, and compliance gaps.",
  },
];

export default function LandingPage() {
  return (
    <main>
      <Section className="relative overflow-hidden pb-32 pt-24" width="wide">
        <div className="absolute inset-0 -z-10 bg-hero-radial" aria-hidden />
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-center">
          <div className="space-y-8">
            <Heading level={1} eyebrow="Precision supplement strategy" className="max-w-2xl">
              Build your Silo health profile and stop guessing your stack
            </Heading>
            <p className="max-w-xl text-lg text-brand-dark/80">
              Silo weaves Compass discovery, Lens evidence, Vanta protocols, and Aegis scanning into a single
              profile-driven experience. Join the waitlist to preview how the platform unblocks confident
              decisions in minutes.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Button asChild size="lg">
                <Link href="#waitlist">
                  Join the waitlist
                  <ArrowRight className="ml-2 h-5 w-5" aria-hidden />
                </Link>
              </Button>
              <Button variant="ghost" asChild size="lg" className="backdrop-blur">
                <Link href="#features">Explore the modules</Link>
              </Button>
            </div>
            <dl className="grid gap-4 sm:grid-cols-3">
              {heroHighlights.map((highlight) => (
                <Card key={highlight.title} variant="subtle" className="space-y-2 p-5">
                  <highlight.icon className="h-6 w-6 text-brand-primary" aria-hidden />
                  <dt className="font-semibold">{highlight.title}</dt>
                  <dd className="text-sm text-brand-dark/70">{highlight.description}</dd>
                </Card>
              ))}
            </dl>
          </div>
          <Card className="space-y-6 border border-brand-primary/10 bg-white/70 backdrop-blur">
            <Heading level={3} eyebrow="A profile-first demo" align="left">
              See where each module fits
            </Heading>
            <FeatureShowcase />
          </Card>
        </div>
      </Section>

      <Pillars />

      <Section id="features" padded width="wide" className="bg-white">
        <Heading level={2} align="center" eyebrow="Four connected modules">
          Everything orbits your Silo health profile
        </Heading>
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <Card className="space-y-4">
            <Compass className="h-8 w-8 text-brand-primary" aria-hidden />
            <Heading level={4}>Compass</Heading>
            <p className="text-brand-dark/70">
              Discover evidence-backed supplements filtered to your goals, biomarkers, and sensitivities. Pull
              products directly into your protocols.
            </p>
          </Card>
          <Card className="space-y-4">
            <Library className="h-8 w-8 text-brand-primary" aria-hidden />
            <Heading level={4}>Lens</Heading>
            <p className="text-brand-dark/70">
              Audit the latest research with structured study summaries, quality grades, and citations for every
              recommendation Silo makes.
            </p>
          </Card>
          <Card className="space-y-4">
            <Activity className="h-8 w-8 text-brand-primary" aria-hidden />
            <Heading level={4}>Vanta</Heading>
            <p className="text-brand-dark/70">
              Design and iterate protocols with scheduling, dosage tracking, and adherence analytics. Share plans
              with coaches or clinicians in a click.
            </p>
          </Card>
          <Card className="space-y-4">
            <Scan className="h-8 w-8 text-brand-primary" aria-hidden />
            <Heading level={4}>Aegis</Heading>
            <p className="text-brand-dark/70">
              Validate every product you touch with barcode scanning, label parsing, and third-party testing
              scores.
            </p>
          </Card>
        </div>
      </Section>

      <EvidenceHighlights />
      <Testimonials />

      <Section id="waitlist" className="bg-brand-dark text-brand-light">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          <div className="space-y-6">
            <Heading level={2} align="left" eyebrow="Get early access" className="text-brand-light">
              Help shape the Silo beta experience
            </Heading>
            <p className="text-brand-light/80">
              Answer a few questions about your goals so we can prioritize the right modules and data sources for
              you. Early cohort members receive concierge onboarding and exclusive roadmap previews.
            </p>
            <ul className="space-y-2 text-brand-light/70">
              <li className="flex items-center gap-2">
                <Star className="h-4 w-4 text-brand-secondary" aria-hidden /> Personalized onboarding interview
              </li>
              <li className="flex items-center gap-2">
                <Star className="h-4 w-4 text-brand-secondary" aria-hidden /> Priority access to Lens research drops
              </li>
              <li className="flex items-center gap-2">
                <Star className="h-4 w-4 text-brand-secondary" aria-hidden /> Influence upcoming mobile-first
                experiences
              </li>
            </ul>
          </div>
          <Card variant="outline" className="border-brand-light/20 bg-brand-dark/60 backdrop-blur">
            <WaitlistForm />
          </Card>
        </div>
      </Section>

      <Section padded className="bg-brand-light/60 py-12 text-center text-sm text-brand-dark/60">
        <p>
          © {new Date().getFullYear()} Silo Labs. Join the waitlist to receive launch updates and platform
          previews.
        </p>
      </Section>
    </main>
  );
}
