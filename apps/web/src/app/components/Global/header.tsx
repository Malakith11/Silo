"use client"
import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { useUser } from "@clerk/nextjs"
import { Button } from "../ui/button"
import { Badge } from "../ui/badge"
import { UserButton } from "../auth/user-button"
import { Menu, X, Compass, Beaker, Eye, Shield, HelpCircle, ChevronDown } from "lucide-react"

const NAVIGATION_ITEMS = [
  {
    label: "COMPASS",
    icon: Compass,
    href: "/compass",
    dropdownItems: [
      { label: "Stack Compass", href: "/stack-compass", description: "Personalized supplement recommendations" },
      { label: "Trending", href: "/compass/trending", description: "Popular supplements and protocols" },
      { label: "Spotlight", href: "/compass/spotlight", description: "Featured compounds and research" },
      { label: "Templates", href: "/compass/templates", description: "Pre-built protocol templates" },
    ],
  },
  {
    label: "VANTA Lab",
    icon: Beaker,
    href: "/stack-lab",
    dropdownItems: [
      { label: "Protocol Builder", href: "/stack-lab", description: "Build custom supplement protocols" },
      { label: "AI Suggestions", href: "/stack-lab/ai-suggest", description: "AI-powered protocol optimization" },
      { label: "Templates", href: "/stack-lab/templates", description: "Ready-made protocol templates" },
      { label: "Database", href: "/stack-lab/database", description: "Supplement interaction database" },
    ],
  },
  {
    label: "LENS",
    icon: Eye,
    href: "/lens",
    dropdownItems: [
      { label: "Research Database", href: "/database/research", description: "Scientific studies and evidence" },
      { label: "Supplement Database", href: "/database/supplements", description: "Comprehensive supplement profiles" },
      { label: "Quality Assessment", href: "/research", description: "Research quality evaluation" },
    ],
  },
  {
    label: "AEGIS",
    icon: Shield,
    href: "/aegis",
    dropdownItems: [
      { label: "Supplement Audit", href: "/audit", description: "Quality and safety analysis" },
      { label: "Regulatory Digest", href: "/regulatory-digest", description: "Latest regulatory updates" },
      { label: "Safety Database", href: "/database/regulatory", description: "Safety and compliance data" },
    ],
  },
  {
    label: "How Silo Works",
    icon: HelpCircle,
    href: "/how-it-works",
    dropdownItems: [
      { label: "Platform Overview", href: "/how-it-works/overview", description: "How Silo works end-to-end" },
      { label: "Getting Started", href: "/how-it-works/guide", description: "Step-by-step guide" },
      { label: "Data & Research", href: "/how-it-works/data", description: "Our data sources and methodology" },
    ],
  },
]

// Only include sections that actually have white backgrounds - removed "features"
const WHITE_BACKGROUND_SECTIONS = [
  "silo-core-features", // Core features section with white background
  "database-showcase", // Database showcase section
  "how-it-works", // How it works section
  "pricing", // Pricing section
  "testimonials", // Testimonials section if it has white background
]

export function Header({ show = true, className }: { show?: boolean; className?: string }) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [hoveredButton, setHoveredButton] = useState<string | null>(null)
  const [hoveredDropdown, setHoveredDropdown] = useState<string | null>(null)
  const [isOnWhiteBackground, setIsOnWhiteBackground] = useState(false)
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const router = useRouter()
  const headerRef = useRef<HTMLElement>(null)
  const { isSignedIn } = useUser()

  useEffect(() => {
    let lastScrollY = window.scrollY
    let ticking = false

    const detectBackgroundColor = () => {
      const headerHeight = 64
      // Check at the header bottom edge - as soon as header enters a section
      const checkPoint = window.scrollY + headerHeight

      // Check if we're currently in a known white background section
      let isInWhiteSection = false
      let currentSection = ""

      for (const sectionId of WHITE_BACKGROUND_SECTIONS) {
        const element = document.getElementById(sectionId)
        if (element) {
          const rect = element.getBoundingClientRect()
          const elementTop = rect.top + window.scrollY
          const elementBottom = elementTop + rect.height

          // Switch as soon as the header bottom touches the section top
          if (checkPoint >= elementTop && checkPoint <= elementBottom) {
            isInWhiteSection = true
            currentSection = sectionId
            break
          }
        }
      }

      // Enhanced color sampling to verify white background
      let hasWhiteBackground = false

      if (isInWhiteSection) {
        // Sample the background color to confirm it's actually white
        const samplePoints = [
          { x: window.innerWidth * 0.5, y: headerHeight + 10 }, // Center point just below header
        ]

        for (const point of samplePoints) {
          const element = document.elementFromPoint(point.x, point.y)
          if (element) {
            const computedStyle = window.getComputedStyle(element)
            const bgColor = computedStyle.backgroundColor

            // Walk up the DOM tree to find the actual background
            let currentElement = element
            let actualBgColor = bgColor

            while (currentElement && (actualBgColor === "rgba(0, 0, 0, 0)" || actualBgColor === "transparent")) {
              if (currentElement.parentElement) {
                currentElement = currentElement.parentElement
                actualBgColor = window.getComputedStyle(currentElement).backgroundColor
              } else {
                break
              }
            }

            // Check if the actual background is white
            const isWhiteish =
              actualBgColor === "rgb(255, 255, 255)" ||
              actualBgColor === "white" ||
              actualBgColor === "rgba(255, 255, 255, 1)" ||
              actualBgColor.startsWith("rgb(255, 255, 255)")

            hasWhiteBackground = isWhiteish
            break
          }
        }
      }

      setIsOnWhiteBackground(hasWhiteBackground)
    }

    const handleScroll = () => {
      const currentScrollY = window.scrollY
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(currentScrollY > 10)
          detectBackgroundColor()
          lastScrollY = currentScrollY
          ticking = false
        })
        ticking = true
      }
    }

    // Initial check
    detectBackgroundColor()

    document.addEventListener("scroll", handleScroll, { passive: true })
    return () => document.removeEventListener("scroll", handleScroll)
  }, [])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setActiveDropdown(null)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleDropdownToggle = (label: string) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current)
    }
    setActiveDropdown(activeDropdown === label ? null : label)
  }

  const handleDropdownMouseEnter = (label: string) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current)
    }
    setHoveredDropdown(label)
  }

  const handleDropdownMouseLeave = () => {
    setHoveredDropdown(null)
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null)
    }, 300)
  }

  const handleDropdownItemClick = (href: string) => {
    setActiveDropdown(null)
    router.push(href)
  }

  // Dynamic background and text colors based on background detection
  const getDynamicStyles = () => {
    if (isOnWhiteBackground) {
      // Light theme for white backgrounds - enhanced blue-tinted blur
      return {
        headerBg: isScrolled
          ? "bg-white/80 backdrop-blur-xl border-b border-blue-200/30 shadow-lg shadow-blue-100/50"
          : "bg-white/70 backdrop-blur-xl border-b border-blue-200/20",
        textColor: "text-gray-900",
        hoverColor: "hover:text-blue-700",
        iconColor: "text-gray-900",
        logoColor: "text-gray-900",
        badgeStyle: "text-blue-900 border-blue-300/60 bg-blue-100/80",
        underlineColor: "bg-gradient-to-r from-blue-600 to-blue-500",
        dropdownBg: "bg-white/95 backdrop-blur-xl border-blue-200/40 shadow-2xl shadow-blue-100/30",
        dropdownText: "text-gray-900",
        dropdownHover: "hover:bg-blue-50/80 group-hover:text-blue-700",
        dropdownDesc: "text-gray-600 group-hover:text-gray-800",
        mobileMenuBg: "bg-white/95 backdrop-blur-xl border-t border-blue-200/40",
      }
    } else {
      // Dark theme for non-white backgrounds
      return {
        headerBg: isScrolled
          ? "bg-black/20 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/20"
          : "bg-transparent backdrop-blur-sm",
        textColor: "text-white",
        hoverColor: "hover:text-blue-200",
        iconColor: "text-white",
        logoColor: "text-white",
        badgeStyle: "text-white border-white/40 bg-white/10",
        underlineColor: "bg-gradient-to-r from-blue-400 to-blue-300",
        dropdownBg: "bg-black/95 backdrop-blur-xl border-white/10 shadow-2xl shadow-black/50",
        dropdownText: "text-white",
        dropdownHover: "hover:bg-white/10 group-hover:text-blue-200",
        dropdownDesc: "text-white/70 group-hover:text-white/90",
        mobileMenuBg: "bg-black/95 backdrop-blur-xl border-t border-white/10",
      }
    }
  }

  const styles = getDynamicStyles()

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 z-50 w-full transition-all duration-700 ease-in-out ${styles.headerBg} ${className} ${
        show ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
      }`}
      style={{
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
      }}
    >
      <div className="flex items-center h-16 w-full">
        {/* Left: Logo & Beta */}
        <div className="flex items-center pl-4 md:pl-8 lg:pl-16 min-w-[180px]">
          <button
            onClick={() => router.push("/")}
            className="flex items-center gap-3 no-underline bg-transparent border-none cursor-pointer"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white font-bold text-sm transition-all duration-700 ease-in-out">
              S
            </div>
            <span className={`text-xl font-bold transition-all duration-700 ease-in-out ${styles.logoColor}`}>
              Silo
            </span>
            <Badge variant="outline" className={`text-xs transition-all duration-700 ease-in-out ${styles.badgeStyle}`}>
              Beta
            </Badge>
          </button>
        </div>

        {/* Center: Core Navigation */}
        <nav className="flex-1 flex justify-center items-center">
          <div className="hidden md:flex gap-1 relative">
            {NAVIGATION_ITEMS.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => handleDropdownMouseEnter(item.label)}
                onMouseLeave={handleDropdownMouseLeave}
              >
                <Button
                  variant="ghost"
                  className={`gap-2 text-sm font-medium bg-transparent px-4 py-2 relative transition-all duration-700 ease-in-out ${styles.textColor} ${styles.hoverColor} ${
                    hoveredButton === item.label ? "transform scale-105" : ""
                  }`}
                  onClick={() => handleDropdownToggle(item.label)}
                  onMouseEnter={() => setHoveredButton(item.label)}
                  onMouseLeave={() => setHoveredButton(null)}
                >
                  <item.icon className={`h-4 w-4 transition-all duration-700 ease-in-out ${styles.iconColor}`} />
                  {item.label}
                  <ChevronDown
                    className={`h-3 w-3 transition-all duration-700 ease-in-out ${styles.iconColor} ${
                      activeDropdown === item.label ? "rotate-180" : ""
                    }`}
                  />

                  {/* Animated underline with gradient */}
                  <div
                    className={`absolute bottom-0 left-1/2 h-0.5 rounded-full transition-all duration-300 ease-out ${styles.underlineColor} ${
                      hoveredButton === item.label ? "w-3/4 -translate-x-1/2" : "w-0 -translate-x-1/2"
                    }`}
                  />
                </Button>

                {/* Dropdown Menu */}
                <div
                  className={`absolute top-full left-0 mt-2 w-80 rounded-lg border transition-all duration-300 ease-out ${styles.dropdownBg} ${
                    activeDropdown === item.label
                      ? "opacity-100 translate-y-0 pointer-events-auto"
                      : "opacity-0 -translate-y-2 pointer-events-none"
                  }`}
                  style={{
                    backdropFilter: "blur(20px)",
                    WebkitBackdropFilter: "blur(20px)",
                  }}
                  onMouseEnter={() => handleDropdownMouseEnter(item.label)}
                  onMouseLeave={handleDropdownMouseLeave}
                >
                  <div className="p-2">
                    {item.dropdownItems.map((dropdownItem, index) => (
                      <button
                        key={dropdownItem.href}
                        onClick={() => handleDropdownItemClick(dropdownItem.href)}
                        className={`w-full text-left p-3 rounded-md transition-all duration-200 group ${styles.dropdownHover} ${
                          activeDropdown === item.label ? `animate-fade-in-up` : ""
                        }`}
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        <div
                          className={`font-medium text-sm transition-all duration-700 ease-in-out ${styles.dropdownText}`}
                        >
                          {dropdownItem.label}
                        </div>
                        <div className={`text-xs mt-1 transition-all duration-700 ease-in-out ${styles.dropdownDesc}`}>
                          {dropdownItem.description}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`transition-all duration-700 ease-in-out ${styles.textColor}`}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </nav>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 pr-4 md:pr-8 lg:pr-16 min-w-[200px] justify-end">
          {isSignedIn ? (
            <UserButton />
          ) : (
            <>
              <Button
                variant="ghost"
                size="sm"
                className={`text-sm font-medium bg-transparent relative group transition-all duration-700 ease-in-out ${styles.textColor} ${styles.hoverColor}`}
                onClick={() => router.push("/sign-in")}
              >
                Sign In
                <div
                  className={`absolute bottom-0 left-1/2 h-0.5 rounded-full transition-all duration-300 ease-out group-hover:w-3/4 group-hover:-translate-x-1/2 w-0 -translate-x-1/2 ${styles.underlineColor}`}
                />
              </Button>
              <Button
                size="sm"
                className="bg-black text-white hover:bg-neutral-900 font-semibold px-5 py-2 rounded-lg transition-all duration-200 hover:scale-105 hover:shadow-lg"
                onClick={() => router.push("/sign-up")}
              >
                Join Silo
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div
          className={`md:hidden animate-fade-in ${styles.mobileMenuBg}`}
          style={{
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
          }}
        >
          <div className="px-4 py-4 space-y-2">
            {NAVIGATION_ITEMS.map((item) => (
              <div key={item.label}>
                <Button
                  variant="ghost"
                  className={`w-full justify-between gap-2 transition-all duration-700 ease-in-out ${styles.textColor} ${styles.hoverColor}`}
                  onClick={() => handleDropdownToggle(`mobile-${item.label}`)}
                >
                  <div className="flex items-center gap-2">
                    <item.icon className="h-4 w-4" />
                    {item.label}
                  </div>
                  <ChevronDown
                    className={`h-3 w-3 transition-transform duration-200 ${
                      activeDropdown === `mobile-${item.label}` ? "rotate-180" : ""
                    }`}
                  />
                </Button>

                {/* Mobile Dropdown */}
                <div
                  className={`overflow-hidden transition-all duration-300 ease-out ${
                    activeDropdown === `mobile-${item.label}` ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="pl-6 py-2 space-y-1">
                    {item.dropdownItems.map((dropdownItem) => (
                      <button
                        key={dropdownItem.href}
                        onClick={() => {
                          handleDropdownItemClick(dropdownItem.href)
                          setIsMobileMenuOpen(false)
                        }}
                        className={`block w-full text-left p-2 text-sm rounded transition-all duration-200 ${
                          isOnWhiteBackground
                            ? "text-gray-700 hover:text-blue-700 hover:bg-blue-50"
                            : "text-white/80 hover:text-white hover:bg-white/10"
                        }`}
                      >
                        {dropdownItem.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
