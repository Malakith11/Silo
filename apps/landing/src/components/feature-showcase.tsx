import { Compass, Library, Activity, Scan } from "lucide-react";
import { Card, Heading } from "@silo/ui";

const modules = [
  {
    name: "Compass",
    description:
      "Guided supplement discovery tuned to your biomarkers and goals.",
    icon: Compass,
  },
  {
    name: "Lens",
    description:
      "An evidence graph that surfaces the research powering every suggestion.",
    icon: Library,
  },
  {
    name: "Vanta",
    description:
      "Protocol builder with smart scheduling, analytics, and adherence tracking.",
    icon: Activity,
  },
  {
    name: "Aegis",
    description:
      "Product scanner that flags contamination, dosage variance, and compliance gaps.",
    icon: Scan,
  },
];

export function FeatureShowcase() {
  return (
    <div className="grid gap-3">
      {modules.map((module) => (
        <Card
          key={module.name}
          variant="outline"
          className="border-brand-primary/10 bg-white/80"
        >
          <div className="flex items-start gap-4">
            <module.icon
              className="mt-1 h-6 w-6 text-brand-primary"
              aria-hidden
            />
            <div className="space-y-1">
              <Heading level={5}>{module.name}</Heading>
              <p className="text-sm text-brand-dark/70">{module.description}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
