"use client"
import { useState, useEffect } from "react"
import { Target, Beaker, Brain, Activity, LineChart, Zap, Heart, Moon, Dna } from "lucide-react"
import { useInView } from "react-intersection-observer"
import { useMotion } from "./motion-provider"

// Protocol type definitions with their unique visual properties
const PROTOCOL_TYPES = {
  cognitive: {
    name: "Cognitive",
    description: "Enhance mental performance and clarity",
    primaryColor: "#1a365d",
    secondaryColor: "#4a5568",
    accentColor: "#2979ff",
    icon: Brain,
    particleShape: "circle",
    flowSpeed: "normal",
    flowPattern: "neural",
    glowIntensity: "medium",
  },
  recovery: {
    name: "Recovery",
    description: "Reduce inflammation and enhance healing",
    primaryColor: "#2e7d32",
    secondaryColor: "#4caf50",
    accentColor: "#69dc39",
    icon: Heart,
    particleShape: "pulse",
    flowSpeed: "slow",
    flowPattern: "wave",
    glowIntensity: "high",
  },
  sleep: {
    name: "Sleep",
    description: "Improve sleep quality and duration",
    primaryColor: "#283593",
    secondaryColor: "#7986cb",
    accentColor: "#add8e6",
    icon: Moon,
    particleShape: "star",
    flowSpeed: "very-slow",
    flowPattern: "gentle",
    glowIntensity: "low",
  },
  energy: {
    name: "Energy",
    description: "Boost performance and endurance",
    primaryColor: "#d32f2f",
    secondaryColor: "#f44336",
    accentColor: "#ff6f00",
    icon: Zap,
    particleShape: "spark",
    flowSpeed: "fast",
    flowPattern: "burst",
    glowIntensity: "high",
  },
  longevity: {
    name: "Longevity",
    description: "Support cellular health and aging",
    primaryColor: "#7b1fa2",
    secondaryColor: "#ba68c8",
    accentColor: "#e040fb",
    icon: Dna,
    particleShape: "helix",
    flowSpeed: "very-slow",
    flowPattern: "spiral",
    glowIntensity: "medium",
  },
} as const

type ProtocolType = keyof typeof PROTOCOL_TYPES

// Helper function to get animation duration based on flow speed
const getAnimationDuration = (speed: any) => {
  switch (speed) {
    case "very-fast":
      return { base: 1.5, variance: 0.5 }
    case "fast":
      return { base: 2.5, variance: 0.5 }
    case "normal":
      return { base: 3.5, variance: 0.7 }
    case "slow":
      return { base: 4.5, variance: 0.8 }
    case "very-slow":
      return { base: 5.5, variance: 1 }
    default:
      return { base: 3.5, variance: 0.7 }
  }
}

// Helper function to generate a random duration within the speed range
const getRandomDuration = (speed: any) => {
  const { base, variance } = getAnimationDuration(speed)
  return base + (Math.random() * variance * 2 - variance)
}
// Protocol Visualization Component
export function ProtocolVisualization({
  isVisible = false,
  protocolType = "cognitive",
}: {
  isVisible?: boolean
  protocolType?: ProtocolType
}) {
  const [activeNode, setActiveNode] = useState(0)
  const { shouldAnimate } = useMotion()
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  })

  // Get protocol style based on type
  const protocol = PROTOCOL_TYPES[protocolType] || PROTOCOL_TYPES.cognitive

  // Define nodes based on protocol type
  const getNodes = () => {
    const baseNodes = [
      { id: 0, name: "Goal", icon: Target, x: 10, y: 50 },
      { id: 1, name: "Analysis", icon: protocol.icon, x: 30, y: 30 },
      { id: 2, name: "Protocol", icon: Beaker, x: 50, y: 50 },
      { id: 3, name: "Tracking", icon: Activity, x: 70, y: 30 },
      { id: 4, name: "Results", icon: LineChart, x: 90, y: 50 },
    ]

    // Customize node positions based on flow pattern
    if (protocol.flowPattern === "spiral") {
      return baseNodes.map((node, i) => ({
        ...node,
        x: 50 + Math.cos((i * Math.PI * 2) / 5) * 40,
        y: 50 + Math.sin((i * Math.PI * 2) / 5) * 20,
      }))
    }

    if (protocol.flowPattern === "wave") {
      return baseNodes.map((node, i) => ({
        ...node,
        y: 50 + (i % 2 === 0 ? -15 : 15),
      }))
    }

    return baseNodes
  }

  const nodes = getNodes()

  useEffect(() => {
    if (!isVisible || !shouldAnimate || !inView) return

    const interval = setInterval(() => {
      setActiveNode((prev) => (prev + 1) % nodes.length)
    }, 2000)

    return () => clearInterval(interval)
  }, [isVisible, shouldAnimate, inView, nodes.length])

  // Generate path between nodes based on protocol flow pattern
  const getPath = (startNode: { x: any; y: any }, endNode: { x: any; y: any }) => {
    const { x: x1, y: y1 } = startNode
    const { x: x2, y: y2 } = endNode

    switch (protocol.flowPattern) {
      case "neural":
        return `M ${x1}% ${y1}% Q ${(x1 + x2) / 2}% ${Math.min(y1, y2) - 15}% ${x2}% ${y2}%`
      case "wave":
        return `M ${x1}% ${y1}% Q ${(x1 + x2) / 2}% ${(y1 + y2) / 2 + (y1 < y2 ? -20 : 20)}% ${x2}% ${y2}%`
      case "gentle":
        return `M ${x1}% ${y1}% C ${x1 + 10}% ${y1}%, ${x2 - 10}% ${y2}%, ${x2}% ${y2}%`
      case "burst":
        return `M ${x1}% ${y1}% L ${x2}% ${y2}%`
      case "spiral":
        const midX = (x1 + x2) / 2
        const midY = (y1 + y2) / 2
        const cpX1 = x1 + (midX - x1) * 0.5 + (y2 > y1 ? 10 : -10)
        const cpY1 = y1 + (midY - y1) * 0.5 + (x2 > x1 ? -10 : 10)
        const cpX2 = x2 - (x2 - midX) * 0.5 + (y2 > y1 ? -10 : 10)
        const cpY2 = y2 - (y2 - midY) * 0.5 + (x2 > x1 ? 10 : -10)
        return `M ${x1}% ${y1}% C ${cpX1}% ${cpY1}%, ${cpX2}% ${cpY2}%, ${x2}% ${y2}%`
      default:
        return `M ${x1}% ${y1}% Q ${(x1 + x2) / 2}% ${Math.min(y1, y2) - 15}% ${x2}% ${y2}%`
    }
  }

  // Generate particle shape based on protocol type
  const renderParticleShape = (type: any, size = 3) => {
    switch (type) {
      case "circle":
        return <circle r={size} />
      case "pulse":
        return (
          <g>
            <circle r={size} />
            <circle r={size * 1.5} opacity="0.3" strokeWidth="1" stroke={protocol.primaryColor} fill="none" />
          </g>
        )
      case "star":
        return (
          <path
            d={`M 0,-${size * 1.5} L ${size * 0.5},-${size * 0.5} L ${size * 1.5},0 L ${size * 0.5},${size * 0.5} L 0,${
              size * 1.5
            } L -${size * 0.5},${size * 0.5} L -${size * 1.5},0 L -${size * 0.5},-${size * 0.5} Z`}
          />
        )
      case "spark":
        return (
          <path
            d={`M 0,-${size * 2} L ${size * 0.5},-${size * 0.5} L ${size * 2},0 L ${size * 0.5},${size * 0.5} L 0,${
              size * 2
            } L -${size * 0.5},${size * 0.5} L -${size * 2},0 L -${size * 0.5},-${size * 0.5} Z`}
          />
        )
      case "helix":
        return (
          <g>
            <ellipse rx={size * 1.5} ry={size * 0.8} />
            <ellipse rx={size * 1.5} ry={size * 0.8} transform="rotate(60)" />
          </g>
        )
      default:
        return <circle r={size} />
    }
  }

  // Generate glow filter based on protocol intensity
  const getGlowFilter = (intensity: any) => {
    switch (intensity) {
      case "low":
        return "url(#lowGlow)"
      case "medium":
        return "url(#mediumGlow)"
      case "high":
        return "url(#highGlow)"
      default:
        return "url(#mediumGlow)"
    }
  }

  return (
    <div
      ref={ref}
      className={`relative h-32 w-full my-8 ${shouldAnimate ? "transform transition-all duration-1000" : ""} ${
        shouldAnimate && isVisible && inView
          ? "translate-y-0 opacity-100 scale-100"
          : shouldAnimate
            ? "translate-y-8 opacity-0 scale-95"
            : "opacity-100"
      }`}
    >
      {/* Core Services */}
      <div className="flex items-center justify-center h-full">
        <div className="grid grid-cols-5 gap-8 w-full max-w-4xl">
          <div className="text-center">
            <div className="text-sm font-medium text-gray-600">Stack Lab</div>
            <div className="text-xs text-gray-400 mt-1">Protocol Builder</div>
          </div>
          <div className="text-center">
            <div className="text-sm font-medium text-gray-600">Stack Compass</div>
            <div className="text-xs text-gray-400 mt-1">Goal Tracking</div>
          </div>
          <div className="text-center">
            <div className="text-sm font-medium text-gray-600">Audit</div>
            <div className="text-xs text-gray-400 mt-1">Quality Analysis</div>
          </div>
          <div className="text-center">
            <div className="text-sm font-medium text-gray-600">Research</div>
            <div className="text-xs text-gray-400 mt-1">Evidence Base</div>
          </div>
          <div className="text-center">
            <div className="text-sm font-medium text-gray-600">Data Sync</div>
            <div className="text-xs text-gray-400 mt-1">Integration Hub</div>
          </div>
        </div>
      </div>
    </div>
  )
}

