import { Heading, Section, Card } from "@silo/ui";
import { Brain, Microscope, Workflow, Users } from "lucide-react";

const pillars = [
  {
    icon: Brain,
    title: "Profile-first intelligence",
    description:
      "Start with your goals, biomarkers, and supplements in rotation so Silo can synthesize what matters next.",
  },
  {
    icon: Microscope,
    title: "Evidence transparency",
    description:
      "Every insight links back to Lens research summaries, so you can audit the literature behind recommendations.",
  },
  {
    icon: Workflow,
    title: "Continuous optimization",
    description:
      "Protocols evolve as your data and inputs change, making stack adjustments proactive instead of reactive.",
  },
  {
    icon: Users,
    title: "Collaborative ready",
    description:
      "Invite coaches or clinicians to review your stack, leave notes, and co-manage interventions securely.",
  },
];

export function Pillars() {
  return (
    <Section className="bg-white">
      <Heading level={2} align="center" eyebrow="Why Silo">
        Cut through the marketing maze with a profile anchored experience
      </Heading>
      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {pillars.map((pillar) => (
          <Card key={pillar.title} className="space-y-4">
            <pillar.icon className="h-7 w-7 text-brand-primary" aria-hidden />
            <Heading level={4}>{pillar.title}</Heading>
            <p className="text-brand-dark/70">{pillar.description}</p>
          </Card>
        ))}
      </div>
    </Section>
  );
}
