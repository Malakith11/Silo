"use client"
import { useInView } from "react-intersection-observer"
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
import { useRef, useState, useEffect } from "react"

export default function LandingPage() {
  const { ref: topRef, inView: heroInView } = useInView({ threshold: 0.5, triggerOnce: false })
  const [stuck, setStuck] = useState(false)
  const [scrollingUp, setScrollingUp] = useState(true)
  const [showHeader, setShowHeader] = useState(false)
  const lastScrollY = useRef(0)

  // Track scroll direction
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setScrollingUp(currentScrollY < lastScrollY.current || currentScrollY <= 0)
      lastScrollY.current = currentScrollY
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleHeroAnimationComplete = () => {
    setShowHeader(true)
  }

  // Show header if: hero animation complete AND (scrolling up OR not stuck)
  const shouldShowHeader = showHeader && (scrollingUp || !stuck)

  return (
    <div className="relative bg-transparent text-foreground">
      {/* Show Header after hero animation completes, and on scroll up */}
      <Header show={true} />

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

      {/* Add scroll navigation */}
      <ScrollNavigation />
    </div>
  )
}
