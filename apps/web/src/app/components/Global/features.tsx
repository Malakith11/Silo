"use client"

import { useEffect, useState } from "react"
import { ArrowRight, BarChart3 } from "lucide-react"
import { useInView } from "react-intersection-observer"
import { useMotion } from "../Global/motion-provider"
import { motion } from "framer-motion"

// Pastel matte color set (darker)
const PASTEL_COLORS = [
  "bg-[#23263a]", // dark blue
  "bg-[#2d2321]", // dark peach
  "bg-[#232d23]", // dark green
  "bg-[#2d2330]", // dark purple
  "bg-[#2d2d23]", // dark yellow
  "bg-[#23282d]", // dark teal
  "bg-[#2d2328]", // dark pink
  "bg-[#232d28]", // dark mint
]

// Supplement type with optional extended properties
type Supplement = {
  id: string
  name: string
  short: string
  details: string
  more: string
  icon: string
  brand?: string
  score?: number
  clinicalSummary?: string
  optimizationSummary?: string
  studyOutcomes?: string
}

// Supplement Database (simplified for demo)
const SUPPLEMENTS: Supplement[] = [
  {
    id: "omega-3",
    name: "Omega-3 EPA/DHA",
    short: "Essential Fatty Acids",
    details:
      "Supports cardiovascular and cognitive health. Sourced from wild-caught fish, molecularly distilled for purity.",
    more: "Omega-3s are vital for brain and heart health. Our formula is third-party tested and sustainably sourced.",
    icon: "🟠",
    brand: "Silo",
    score: 9.1,
    clinicalSummary: "Reduces triglycerides, supports brain health.",
    optimizationSummary: "Take with meals for best absorption.",
    studyOutcomes: "Positive in 18+ RCTs.",
  },
  {
    id: "vitamin-d3",
    name: "Vitamin D3",
    short: "Fat-Soluble Vitamin",
    details: "Promotes bone health and immune function. Microencapsulated for optimal absorption.",
    more: "Vitamin D3 is crucial for calcium regulation and mood. Our D3 is plant-based and bioavailable.",
    icon: "🟡",
    brand: "Silo",
    score: 8.8,
    clinicalSummary: "Improves bone density, immune support.",
    optimizationSummary: "Take with fat-containing meals.",
    studyOutcomes: "Positive in 22+ studies.",
  },
  {
    id: "magnesium-glycinate",
    name: "Magnesium Glycinate",
    short: "Essential Mineral",
    details: "Aids sleep, muscle recovery, and stress relief. Gentle on the stomach.",
    more: "Highly bioavailable chelate form. Non-laxative and ideal for daily use.",
    icon: "🟢",
    brand: "Silo",
    score: 9.0,
    clinicalSummary: "Reduces muscle cramps, improves sleep.",
    optimizationSummary: "Take in the evening for sleep support.",
    studyOutcomes: "Positive in 10+ studies.",
  },
  {
    id: "curcumin",
    name: "Curcumin Complex",
    short: "Polyphenol",
    details: "Potent antioxidant and anti-inflammatory. Enhanced with piperine for absorption.",
    more: "Curcumin supports joint health and immune balance. Our blend is clinically studied.",
    icon: "🟣",
    brand: "Silo",
    score: 8.5,
    clinicalSummary: "Reduces inflammation, supports joints.",
    optimizationSummary: "Take with black pepper for absorption.",
    studyOutcomes: "Positive in 8+ studies.",
  },
  {
    id: "probiotics",
    name: "Multi-Strain Probiotics",
    short: "Digestive Health",
    details: "Balances gut flora and supports immunity. 12 strains, 50B CFU.",
    more: "Shelf-stable, dairy-free, and formulated for broad-spectrum digestive support.",
    icon: "🔵",
    brand: "Silo",
    score: 8.9,
    clinicalSummary: "Improves gut health, reduces bloating.",
    optimizationSummary: "Take before meals.",
    studyOutcomes: "Positive in 15+ studies.",
  },
  {
    id: "ashwagandha",
    name: "Ashwagandha KSM-66",
    short: "Adaptogen",
    details: "Reduces stress and boosts energy. Full-spectrum root extract.",
    more: "Clinically proven for stress adaptation and cognitive support.",
    icon: "🟤",
    brand: "Silo",
    score: 8.7,
    clinicalSummary: "Reduces cortisol, improves mood.",
    optimizationSummary: "Take in the morning or evening.",
    studyOutcomes: "Positive in 12+ studies.",
  },
  {
    id: "coq10",
    name: "CoQ10 Ubiquinol",
    short: "Antioxidant",
    details: "Supports cellular energy and heart health. Active ubiquinol form.",
    more: "Naturally fermented, non-GMO, and highly absorbable.",
    icon: "⚫",
    brand: "Silo",
    score: 8.6,
    clinicalSummary: "Improves heart function, energy.",
    optimizationSummary: "Take with fat-containing meals.",
    studyOutcomes: "Positive in 9+ studies.",
  },
  {
    id: "zinc-picolinate",
    name: "Zinc Picolinate",
    short: "Essential Mineral",
    details: "Boosts immunity and aids tissue repair. Highly absorbable form.",
    more: "Chelated for optimal uptake. Vegan and allergen-free.",
    icon: "⚪",
    brand: "Silo",
    score: 8.4,
    clinicalSummary: "Supports immunity, wound healing.",
    optimizationSummary: "Take with food.",
    studyOutcomes: "Positive in 7+ studies.",
  },
]

// Simple chart bar for score
function ScoreChart({ score }: { score: number }) {
  return (
    <div className="flex items-center gap-2 mt-2">
      <BarChart3 className="w-4 h-4 text-blue-300" />
      <div className="flex-1 h-2 bg-white/10 rounded">
        <div className="h-2 rounded bg-blue-400 transition-all" style={{ width: `${(score / 10) * 100}%` }} />
      </div>
      <span className="text-xs text-white ml-2">{score.toFixed(1)}/10</span>
    </div>
  )
}

// Supplement Card with responsive sizing
function SupplementCard({
  supplement,
  color,
  onHover,
  onLeave,
  onClick,
  isActive,
  cardHeight,
}: {
  supplement: Supplement
  color: string
  onHover: () => void
  onLeave: () => void
  onClick: () => void
  isActive: boolean
  cardHeight?: string
}) {
  return (
    <motion.div
      layout
      className={`flex flex-col justify-between w-[18rem] sm:w-[20rem] md:w-[22rem] min-w-[18rem] sm:min-w-[20rem] md:min-w-[22rem] max-w-[18rem] sm:max-w-[20rem] md:max-w-[22rem] rounded-lg shadow-2xl border border-white/10 ${color} bg-opacity-90 backdrop-blur-md p-4 sm:p-5 md:p-6 transition-all duration-300 cursor-pointer relative grayscale`}
      style={{
        height: cardHeight || "20rem",
        filter: isActive ? "brightness(1.1) blur(0px)" : undefined,
        zIndex: isActive ? 30 : 1,
      }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onClick={onClick}
      whileHover={{ scale: 1.01, filter: "grayscale(0)" }}
    >
      <div className="flex items-center gap-2 sm:gap-3 mb-2">
        <span className="text-2xl sm:text-3xl">{supplement.icon}</span>
        <span className="font-bold text-lg sm:text-xl text-white">{supplement.name}</span>
      </div>
      <div className="text-xs sm:text-sm text-white/80 mb-1">{supplement.short}</div>
      <div className="text-xs text-white/70 mb-1">
        Brand: <span className="font-semibold">{supplement.brand}</span>
      </div>
      <div className="text-xs text-white/70 mb-1">
        Score: <span className="font-semibold">{supplement.score?.toFixed(1)}</span>
      </div>
      <div className="text-xs text-white/70 mb-1">
        Clinical Summary: <span className="font-normal">{supplement.clinicalSummary}</span>
      </div>
      <div className="text-xs text-white/70 mb-1">
        Optimization: <span className="font-normal">{supplement.optimizationSummary}</span>
      </div>
      <div className="text-xs text-white/70 mb-2">
        Study Outcomes: <span className="font-normal">{supplement.studyOutcomes}</span>
      </div>
      <div className="flex-1" />
      <ScoreChart score={supplement.score ?? 8.5} />
      <div className="flex justify-end mt-3 sm:mt-4">
        <button
          className="rounded-full bg-blue-700 hover:bg-blue-500 transition-colors p-2"
          aria-label="View supplement details"
          title="View supplement details"
        >
          <ArrowRight className="w-4 sm:w-5 h-4 sm:h-5 text-white" />
        </button>
      </div>
    </motion.div>
  )
}

// Animate numbers from 0 to target
function useAnimatedNumber(target: number, start: boolean, duration = 3000) {
  const [value, setValue] = useState(0)
  useEffect(() => {
    if (!start) {
      setValue(0)
      return
    }
    let startTimestamp: number | null = null
    let frame: number
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp
      const progress = Math.min((timestamp - startTimestamp) / duration, 1)
      setValue(Math.floor(progress * target))
      if (progress < 1) {
        frame = requestAnimationFrame(step)
      } else {
        setValue(target)
      }
    }
    frame = requestAnimationFrame(step)
    return () => cancelAnimationFrame(frame)
  }, [target, start, duration])
  return value
}

// Auto-scrolling rows using translateX for smoothness
function useTranslateXScroll(length: number, speed = 0.3, reverse = false) {
  const [offset, setOffset] = useState(0)
  useEffect(() => {
    let raf: number
    const animate = () => {
      setOffset((prev) => {
        let next = prev + (reverse ? -speed : speed)
        if (next > length) next = 0
        if (next < 0) next = length
        return next
      })
      raf = requestAnimationFrame(animate)
    }
    raf = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(raf)
  }, [length, speed, reverse])
  return offset
}

export function Features() {
  const { shouldAnimate } = useMotion()
  const { ref: sectionRef, inView: sectionInView } = useInView({ threshold: 0.3, triggerOnce: false })

  // For smooth translateX scroll - responsive card width
  const cardWidth = typeof window !== "undefined" && window.innerWidth < 640 ? 300 : window.innerWidth < 768 ? 340 : 380
  const rowLength = SUPPLEMENTS.length * cardWidth
  const offset1 = useTranslateXScroll(rowLength, 0.8, false)
  const offset2 = useTranslateXScroll(rowLength, 0.8, true)

  // Animated numbers
  const studies = useAnimatedNumber(156203, sectionInView)
  const supplements = useAnimatedNumber(12847, sectionInView)

  return (
    <section
      id="features"
      ref={sectionRef}
      className="relative min-h-screen w-full flex flex-col lg:flex-row justify-between overflow-hidden z-0 bg-black px-4 sm:px-6 md:px-8 lg:px-12"
      data-snap-section
    >
      {/* Left Column - Mobile: full width, Desktop: 2/5 width */}
      <div className="relative w-full lg:w-2/5 h-[50vh] lg:h-screen min-h-[50vh] lg:min-h-screen flex flex-col rounded-2xl bg-clip-padding">
        <img
          className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
          src="/General Images/Closeup-Molecule.webp"
          alt="Abstract Hand Left Col Compass Image"
          style={{ opacity: 0.3 }}
        />
        {/* Top Left: Compass Blueprint + Title */}
        <div className="relative z-10 flex flex-row items-center px-4 sm:px-6 md:px-8 lg:px-12 pt-4 sm:pt-6">
          <div className="flex flex-col">
            <span className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-none tracking-wide">
              COMPASS.
            </span>
            <span className="text-sm sm:text-base md:text-lg lg:text-2xl font-semibold text-blue-200 leading-tight mt-1">
              – Proprietary Database
            </span>
          </div>
        </div>
        {/* Center Middle: Main Headline */}
        <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 md:px-8 lg:px-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-extrabold tracking-tight text-white drop-shadow-lg leading-tight text-left lg:-mt-80">
            Optimize your Stack using an Intelligence-Driven Database.
          </h2>
        </div>
        {/* Bottom Right: Word Stack + Tagline */}
        <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 lg:bottom-12 right-4 sm:right-6 md:right-8 lg:right-12 flex flex-col items-end z-20 max-w-[300px] sm:max-w-[350px] md:max-w-[420px]">
          <span className="block text-white text-sm sm:text-base md:text-lg lg:text-2xl font-semibold mb-4 sm:mb-6 text-right">
            Cut through marketing, partnerships and conflicts of interest through evidence backed supplementation.
          </span>
          <span className="text-blue-200 text-xl sm:text-2xl md:text-3xl lg:text-5xl font-bold uppercase tracking-widest leading-tight">
            Access
          </span>
          <span className="text-blue-200 text-xl sm:text-2xl md:text-3xl lg:text-5xl font-bold uppercase tracking-widest leading-tight">
            Learn
          </span>
          <span className="text-blue-200 text-xl sm:text-2xl md:text-3xl lg:text-5xl font-bold uppercase tracking-widest leading-tight">
            Navigate
          </span>
          <span className="text-blue-200 text-xl sm:text-2xl md:text-3xl lg:text-5xl font-bold uppercase tracking-widest leading-tight">
            Implement
          </span>
        </div>
      </div>

      {/* Right Column - Mobile: full width, Desktop: 3/5 width */}
      <div className="relative z-10 w-full lg:w-3/5 h-[50vh] lg:h-screen min-h-[50vh] lg:min-h-screen flex flex-col justify-between bg-white px-0 py-0 rounded-2xl bg-clip-padding">
        {/* Database Stats - Top Right, blurred background */}
        <div className="absolute top-0 right-0 w-full flex justify-end z-30 pt-4 sm:pt-6 md:pt-8 lg:pt-12 pr-4 sm:pr-6 md:pr-8 lg:pr-12">
          <div className="backdrop-blur-md bg-white/10 px-4 sm:px-6 md:px-8 py-4 sm:py-6 rounded-xl flex flex-col items-end gap-2 sm:gap-4 text-right shadow-lg">
            <div className="flex items-baseline gap-2 sm:gap-3">
              <span className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold drop-shadow-lg">
                {supplements.toLocaleString()}
              </span>
              <span className="text-blue-200 text-sm sm:text-base md:text-xl lg:text-2xl font-bold">Supplements</span>
            </div>
            <div className="flex items-baseline gap-2 sm:gap-3">
              <span className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold drop-shadow-lg">
                {studies.toLocaleString()}
              </span>
              <span className="text-blue-200 text-sm sm:text-base md:text-xl lg:text-2xl font-bold">Studies</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 sm:w-3 h-2 sm:h-3 bg-green-400 rounded-full animate-pulse" />
              <span className="text-green-200 font-bold text-sm sm:text-base md:text-lg">Database Live</span>
            </div>
          </div>
        </div>

        {/* Two Scrolling Rows - Hide on mobile, show on tablet+ */}
        <div className="hidden sm:flex flex-col gap-2 md:gap-4 w-full h-full justify-center px-0 relative pb-0 pt-0 mt-4 mb-4">
          {/* Row 1 */}
          <div className="relative w-full flex-1 overflow-x-hidden">
            <div
              className="flex gap-2 md:gap-4 h-full"
              style={{
                width: rowLength * 2,
                height: "100%",
                transform: `translateX(-${offset1}px)`,
                transition: "transform 0.1s linear",
              }}
            >
              {[...SUPPLEMENTS, ...SUPPLEMENTS].map((supplement, index) => (
                <SupplementCard
                  key={`row1-${supplement.id}-${index}`}
                  supplement={supplement}
                  color={PASTEL_COLORS[index % PASTEL_COLORS.length]}
                  onHover={() => {}}
                  onLeave={() => {}}
                  onClick={() => {}}
                  isActive={false}
                  cardHeight="100%"
                />
              ))}
            </div>
          </div>
          {/* Row 2 */}
          <div className="relative w-full flex-1 overflow-x-hidden">
            <div
              className="flex gap-2 md:gap-4 h-full"
              style={{
                width: rowLength * 2,
                height: "100%",
                transform: `translateX(-${offset2}px)`,
                transition: "transform 0.1s linear",
              }}
            >
              {[...SUPPLEMENTS, ...SUPPLEMENTS].reverse().map((supplement, index) => (
                <SupplementCard
                  key={`row2-${supplement.id}-${index}`}
                  supplement={supplement}
                  color={PASTEL_COLORS[index % PASTEL_COLORS.length]}
                  onHover={() => {}}
                  onLeave={() => {}}
                  onClick={() => {}}
                  isActive={false}
                  cardHeight="100%"
                />
              ))}
            </div>
          </div>
        </div>

        {/* Mobile fallback - show static content */}
        <div className="sm:hidden flex items-center justify-center h-full">
          <div className="text-center p-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Supplement Database</h3>
            <p className="text-gray-600 mb-6">Explore our comprehensive database of research-backed supplements</p>
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold">View Database</button>
          </div>
        </div>
        <div
          className="pointer-events-none absolute left-0 top-0 h-full z-30 hidden sm:block rounded-l-2xl"
          style={{
            width: "72px",
            background:
              "linear-gradient(to right, rgba(30,64,175,1) 0%, rgba(30,64,175,0.85) 25%, rgba(30,64,175,0.5) 45%, rgba(30,64,175,0.15) 65%, transparent 100%)",
          }}
        />
      </div>
    </section>
  )
}
