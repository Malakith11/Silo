import { Card, Heading, Section } from "@silo/ui";

const testimonials = [
  {
    quote:
      "Silo connected the dots between my lab panels and supplement routine faster than any practitioner I\'ve worked with.",
    name: "Maya R.",
    role: "Biohacker & early alpha tester",
  },
  {
    quote:
      "The Lens research summaries make it effortless to justify every protocol change with credible sources.",
    name: "Dr. Julian V.",
    role: "Functional medicine physician",
  },
];

export function Testimonials() {
  return (
    <Section className="bg-white">
      <Heading level={2} align="center" eyebrow="Social proof">
        Trusted by early clinical partners and advanced self-quantifiers
      </Heading>
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {testimonials.map((testimonial) => (
          <Card key={testimonial.name} className="space-y-4">
            <p className="text-lg italic text-brand-dark/80">“{testimonial.quote}”</p>
            <div className="text-sm font-semibold text-brand-dark">{testimonial.name}</div>
            <p className="text-sm text-brand-dark/60">{testimonial.role}</p>
          </Card>
        ))}
      </div>
    </Section>
  );
}
