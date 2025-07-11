"use client"

import { Header } from "./components/Global/header"
import { Hero } from "./components/Global/hero"
import { SiloCoreFeatures } from "./components/Global/silo-core-features"
import { ScrollNavigation } from "./components/Global/scroll-navigation"

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
