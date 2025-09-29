"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FocusButton } from "./focus-animations"
import { useMotion } from "./motion-provider"
import { ChevronUp, ChevronDown, Home, Sparkles, Cog, DollarSign, HelpCircle, Database, ChevronsUp } from "lucide-react"

const NAVIGATION_SECTIONS = [
  { id: "hero", label: "Home", icon: Home },
  { id: "silo-core-features", label: "Core Features", icon: Sparkles },
  { id: "features", label: "Features", icon: Sparkles },
  { id: "database-showcase", label: "Database", icon: Database },
  { id: "how-it-works", label: "How It Works", icon: Cog },
  { id: "pricing", label: "Pricing", icon: DollarSign },
  { id: "faq", label: "FAQ", icon: HelpCircle },
]

export function ScrollNavigation() {
  const [isVisible, setIsVisible] = useState(false)
  const [isScrolling, setIsScrolling] = useState(false)
  const [activeSection, setActiveSection] = useState("top")
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { shouldAnimate } = useMotion()
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const observerRef      = useRef<IntersectionObserver  | null>(null)

  // Handle scroll visibility and progress
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = Math.min((scrollTop / docHeight) * 100, 100)

      setScrollProgress(progress)
      setIsVisible(scrollTop > 300)
      setIsScrolling(true)

      // Clear existing timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }

      // Set new timeout to hide scrolling state
      scrollTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false)
      }, 150)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", handleScroll)
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
    }
  }, [])

  // Intersection Observer for active section
  useEffect(() => {
    const updateActiveSection = () => {
      const scrollTop = window.pageYOffset

      // If at very top, set to hero
      if (scrollTop < 100) {
        setActiveSection("hero")
        return
      }

      // Find the section that's currently in view
      for (let i = NAVIGATION_SECTIONS.length - 1; i >= 0; i--) {
        const section = NAVIGATION_SECTIONS[i]
        const element = document.getElementById(section.id)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 200) {
            setActiveSection(section.id)
            break
          }
        }
      }
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
            setActiveSection(entry.target.id)
          }
        })
      },
      {
        threshold: [0.3],
        rootMargin: "-20% 0px -20% 0px",
      },
    )

    // Observe all sections with IDs
    NAVIGATION_SECTIONS.forEach(({ id }) => {
      const element = document.getElementById(id)
      if (element) {
        observerRef.current?.observe(element)
      }
    })

    // Add scroll listener for fallback detection
    window.addEventListener("scroll", updateActiveSection, { passive: true })

    return () => {
      observerRef.current?.disconnect()
      window.removeEventListener("scroll", updateActiveSection)
    }
  }, [])

  const scrollToSection = (sectionId: string) => {
    if (sectionId === "hero") {
      window.scrollTo({ top: 0, behavior: "smooth" })
      setIsMenuOpen(false)
      return
    }

    const element = document.getElementById(sectionId)
    if (element) {
      const headerHeight = 80 // Reduced header offset
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
      const offsetPosition = elementPosition - headerHeight

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })
      setIsMenuOpen(false)
    }
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const navigateToNext = () => {
    const currentIndex = NAVIGATION_SECTIONS.findIndex((section) => section.id === activeSection)

    if (currentIndex < NAVIGATION_SECTIONS.length - 1) {
      // Navigate to next section
      const nextIndex = currentIndex + 1
      scrollToSection(NAVIGATION_SECTIONS[nextIndex].id)
    } else {
      // If at last section, scroll to bottom
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      window.scrollTo({
        top: maxScroll,
        behavior: "smooth",
      })
    }
  }

  const navigateToPrevious = () => {
    const currentIndex = NAVIGATION_SECTIONS.findIndex((section) => section.id === activeSection)

    if (currentIndex > 0) {
      // Navigate to previous section
      const previousIndex = currentIndex - 1
      scrollToSection(NAVIGATION_SECTIONS[previousIndex].id)
    } else {
      // If at first section, scroll to absolute top
      scrollToTop()
    }
  }

  if (!isVisible) return null

  return (
    <div
      className={`fixed right-4 top-1/2 -translate-y-1/2 z-40 transition-all duration-300 ${
        isScrolling ? "opacity-30 scale-95" : "opacity-100 scale-100"
      }`}
    >
      {/* Navigation Menu */}
      <div
        className={`absolute right-12 top-1/2 -translate-y-1/2 transition-all duration-300 ${
          isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="bg-background/95 backdrop-blur-xl border border-border/20 rounded-xl shadow-xl p-2 min-w-[180px]">
          <div className="space-y-1">
            {NAVIGATION_SECTIONS.map(({ id, label, icon: Icon }) => {
              const isActive = activeSection === id
              return (
                <FocusButton key={id} intensity="subtle" className="w-full">
                  <button
                    onClick={() => scrollToSection(id)}
                    className={`flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? "bg-blue-600/10 text-blue-600"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    } ${shouldAnimate ? "hover:scale-[1.02] focus-visible:scale-[1.02]" : ""}`}
                  >
                    <Icon
                      className={`h-4 w-4 transition-all duration-200 ${
                        isActive ? "text-blue-600" : ""
                      } ${shouldAnimate && isActive ? "scale-110" : ""}`}
                    />
                    {label}
                    {isActive && (
                      <Badge variant="secondary" className="ml-auto text-xs">
                        Current
                      </Badge>
                    )}
                  </button>
                </FocusButton>
              )
            })}
          </div>
        </div>
      </div>

      {/* Scroll Controls */}
      <div className="flex items-center gap-2">
        {/* Progress Indicator & Menu Toggle - Made Thinner */}
        <FocusButton intensity="subtle">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`relative h-10 w-6 rounded-full bg-background/95 backdrop-blur-xl border border-border/20 shadow-lg transition-all duration-200 overflow-hidden ${
              shouldAnimate ? "hover:scale-110 focus-visible:scale-110" : ""
            } ${isMenuOpen ? "bg-blue-600/10 border-blue-600/30" : ""}`}
          >
            {/* Progress Bar */}
            <div
              className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-blue-600 to-blue-400 transition-all duration-300 ease-out"
              style={{ height: `${scrollProgress}%` }}
            />

            {/* Menu Indicator Dots */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-0.5">
              <div
                className={`w-1 h-1 rounded-full bg-foreground/60 transition-all duration-200 ${
                  isMenuOpen ? "opacity-100 scale-100" : "opacity-40 scale-75"
                }`}
              />
              <div
                className={`w-1 h-1 rounded-full bg-foreground/60 transition-all duration-200 ${
                  isMenuOpen ? "opacity-100 scale-100" : "opacity-40 scale-75"
                }`}
              />
              <div
                className={`w-1 h-1 rounded-full bg-foreground/60 transition-all duration-200 ${
                  isMenuOpen ? "opacity-100 scale-100" : "opacity-40 scale-75"
                }`}
              />
            </div>
          </button>
        </FocusButton>

        {/* Vertical Controls */}
        <div className="flex flex-col gap-1">
          {/* Scroll to Top (Double Arrow) */}
          <FocusButton intensity="subtle">
            <Button
              variant="outline"
              size="icon"
              onClick={scrollToTop}
              className={`h-7 w-7 rounded-full bg-background/95 backdrop-blur-xl border-border/20 shadow-lg transition-all duration-200 ${
                shouldAnimate ? "hover:scale-110 focus-visible:scale-110" : ""
              }`}
            >
              <ChevronsUp className="h-3 w-3" />
              <span className="sr-only">Scroll to top</span>
            </Button>
          </FocusButton>

          {/* Scroll to Previous Section */}
          <FocusButton intensity="subtle">
            <Button
              variant="outline"
              size="icon"
              onClick={navigateToPrevious}
              className={`h-7 w-7 rounded-full bg-background/95 backdrop-blur-xl border-border/20 shadow-lg transition-all duration-200 ${
                shouldAnimate ? "hover:scale-110 focus-visible:scale-110" : ""
              }`}
            >
              <ChevronUp className="h-3 w-3" />
              <span className="sr-only">Previous section</span>
            </Button>
          </FocusButton>

          {/* Scroll to Next Section */}
          <FocusButton intensity="subtle">
            <Button
              variant="outline"
              size="icon"
              onClick={navigateToNext}
              className={`h-7 w-7 rounded-full bg-background/95 backdrop-blur-xl border-border/20 shadow-lg transition-all duration-200 ${
                shouldAnimate ? "hover:scale-110 focus-visible:scale-110" : ""
              }`}
            >
              <ChevronDown className="h-3 w-3" />
              <span className="sr-only">Next section</span>
            </Button>
          </FocusButton>
        </div>
      </div>

      {/* Click outside to close menu */}
      {isMenuOpen && <div className="fixed inset-0 z-[-1]" onClick={() => setIsMenuOpen(false)} />}
    </div>
  )
}
