import { Section, Heading, Card } from "@silo/ui";

const highlights = [
  {
    title: "Lens evidence models",
    description:
      "Structured summaries for 4,200+ peer-reviewed studies spanning longevity, cognitive performance, and metabolic health.",
  },
  {
    title: "Compass catalog",
    description:
      "Curated supplement taxonomy with ingredient provenance, contamination watchlists, and dosage guardrails.",
  },
  {
    title: "Vanta telemetry",
    description:
      "Protocol analytics ready for wearable integrations and outcome tracking in upcoming releases.",
  },
];

export function EvidenceHighlights() {
  return (
    <Section className="bg-brand-light">
      <Heading level={2} align="center" eyebrow="Evidence-first foundations">
        The infrastructure is already in motion
      </Heading>
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {highlights.map((highlight) => (
          <Card key={highlight.title} variant="outline" className="border-brand-dark/10 bg-white/80">
            <Heading level={4}>{highlight.title}</Heading>
            <p className="mt-3 text-brand-dark/70">{highlight.description}</p>
          </Card>
        ))}
      </div>
    </Section>
  );
}
