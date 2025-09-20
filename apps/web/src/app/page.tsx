"use client"

import { Header } from "@/components/shared/header"
import { Hero } from "@/components/shared/hero"
import { SiloCoreFeatures } from "@/components/shared/silo-core-features"
import { ScrollNavigation } from "@/components/shared/scroll-navigation"

export default function ClientLanding() {
  return (
    <div className="relative bg-transparent text-foreground">
      <Header />

      <section id="top" data-snap-section className="min-h-screen">
        <Hero />
      </section>

      <section id="silo-core-features" data-snap-section className="min-h-screen">
        <SiloCoreFeatures />
      </section>

      <ScrollNavigation />
    </div>
  )
}
