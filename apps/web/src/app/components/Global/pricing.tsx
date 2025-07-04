import { Check } from "lucide-react"

import { cn } from "../../../../lib/utils"
import { buttonVariants } from "../ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"

const tiers = [
  {
    name: "Explorer",
    id: "explorer",
    href: "#",
    priceMonthly: "Free",
    description: "Perfect for getting started with supplement optimization.",
    features: ["Basic protocol builder", "Access to supplement database", "Community support", "3 saved protocols"],
  },
  {
    name: "Optimizer",
    id: "optimizer",
    href: "#",
    priceMonthly: "$12",
    description: "For serious supplement enthusiasts and biohackers.",
    features: [
      "Advanced protocol builder",
      "Full research database access",
      "AI-powered recommendations",
      "Unlimited saved protocols",
      "Progress tracking",
      "Priority support",
    ],
  },
  {
    name: "Expert",
    id: "expert",
    href: "#",
    priceMonthly: "$29",
    description: "For health professionals and advanced users.",
    features: [
      "Everything in Optimizer",
      "Advanced analytics & insights",
      "Custom research alerts",
      "Export protocols to PDF",
      "1-on-1 consultation credits",
      "Early access to new features",
    ],
  },
]

export function Pricing() {
  return (
    <section id="pricing" className="relative bg-transparent py-24">
      <div className="container grid items-center justify-center gap-4 pb-8 text-center md:pb-12 lg:gap-8">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Optimize Your Health Journey</h2>
          <p className="max-w-[700px] text-foreground/70 md:text-xl dark:text-muted-foreground">
            Choose the plan that fits your supplement optimization goals. Start free, upgrade as you grow.
          </p>
        </div>
      </div>
      <div className="container grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {tiers.map((tier) => (
          <Card key={tier.id} className="border-none">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">{tier.name}</CardTitle>
              <CardDescription className="text-muted-foreground">{tier.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4 text-6xl font-bold">{tier.priceMonthly}</div>
              <ul className="space-y-2">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" />
                    <span className="text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <a
                href={tier.href}
                className={cn(buttonVariants({ variant: "secondary", size: "lg", className: "w-full" }))}
              >
                Choose plan
              </a>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  )
}
