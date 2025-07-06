// src/app/ClientLanding.tsx
"use client"

import { useInView } from "react-intersection-observer"
import { useRef, useState, useEffect } from "react"

import { Header } from "./components/Global/header"
import { Hero } from "./components/Global/hero"
import { Features } from "./components/Global/features"
import { DatabaseShowcase } from "./components/Global/database-showcase"
import { HowItWorks } from "./components/Global/how-it-works"
import { Pricing } from "./components/Global/pricing"
import { FAQ } from "./components/Global/faq"
import { Footer } from "./components/Global/footer"
import { SiloCoreFeatures } from "./components/Global/silo-core-features"
import { ScrollNavigation } from "./components/Global/scroll-navigation"

export default function ClientLanding() {
  const { ref: topRef } = useInView({ threshold: 0.5 })
  const [stuck, setStuck] = useState(false)
  const [scrollingUp, setScrollingUp] = useState(true)
  const [showHeader, setShowHeader] = useState(false)
  const lastScrollY = useRef(0)

  // Track scroll direction
  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY
      setScrollingUp(y < lastScrollY.current || y <= 0)
      lastScrollY.current = y
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleHeroAnimationComplete = () => {
    setShowHeader(true)
  }

  // Always show header once hero animation done OR scrolling up
  const shouldShowHeader = showHeader && scrollingUp

  return (
    <div className="relative bg-transparent text-foreground">
      <Header show={shouldShowHeader} />

      <section id="top" data-snap-section ref={topRef} className="min-h-screen">
        <Hero setStuck={setStuck} onAnimationComplete={handleHeroAnimationComplete} />
      </section>

      <section id="silo-core-features" data-snap-section className="min-h-screen">
        <SiloCoreFeatures />
      </section>

      <section id="database-showcase" data-snap-section className="min-h-screen">
        <DatabaseShowcase />
      </section>

      <section id="features" data-snap-section className="min-h-screen">
        <Features />
      </section>

      <section id="how-it-works" data-snap-section className="min-h-screen">
        <HowItWorks />
      </section>

      <section id="pricing" data-snap-section className="min-h-screen">
        <Pricing />
      </section>

      <section id="faq" data-snap-section className="min-h-screen">
        <FAQ />
      </section>

      <section id="footer">
        <Footer />
      </section>

      <ScrollNavigation />
    </div>
  )
}
