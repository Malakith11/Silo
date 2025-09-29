"use client"
import { useRef, useState } from "react"

// Canvas-based pipeline visualization
export function IntelligencePipeline() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isHovering, setIsHovering] = useState<boolean>(false)
  const [isLoaded, setIsLoaded] = useState(true) // Start as loaded to show visual immediately

  // Simplified hover interaction
  const handleMouseEnter = () => setIsHovering(true)
  const handleMouseLeave = () => setIsHovering(false)

  return (
    <div className="relative p-8 space-y-6 overflow-hidden">
      {/* Faded border overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-border/30 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-b from-border/20 via-border/30 to-border/20" />

      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-green-500/5 animate-pulse" />

      <div className="text-center space-y-3 relative z-10">
        <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 bg-clip-text text-transparent">
          Intelligence Pipeline
        </h3>
        <p className="text-base text-muted-foreground max-w-2xl mx-auto">
          Real-time processing of research data into actionable insights with AI-powered analysis
        </p>
      </div>

      <div
        ref={containerRef}
        className="relative w-full h-[500px] bg-gradient-to-br from-background/80 via-background/60 to-background/40 rounded-xl border border-border/20 overflow-hidden shadow-inner backdrop-blur-sm"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Enhanced SVG with unique IDs */}
        <svg className="w-full h-full" viewBox="0 0 1200 500">
          {/* Animated background grid */}
          <defs>
            <pattern id="pipelineGrid" width="30" height="30" patternUnits="userSpaceOnUse">
              <path d="M 30 0 L 0 0 0 30" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.15" />
            </pattern>
            <linearGradient id="pipelineBlueGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#1d4ed8" stopOpacity="0.6" />
            </linearGradient>
            <linearGradient id="pipelinePurpleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.6" />
            </linearGradient>
            <linearGradient id="pipelineGreenGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#059669" stopOpacity="0.6" />
            </linearGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#pipelineGrid)" />

          {/* Data Sources */}
          <g className="data-sources">
            <rect
              x="40"
              y="60"
              width="180"
              height="80"
              rx="12"
              fill="url(#pipelineBlueGradient)"
              stroke="#3b82f6"
              strokeWidth="2"
            />
            <text x="130" y="90" textAnchor="middle" fontSize="14" fontWeight="bold" fill="white">
              Research Papers
            </text>
            <text x="130" y="110" textAnchor="middle" fontSize="12" fill="rgba(255,255,255,0.9)">
              PubMed, Cochrane, arXiv
            </text>
            <text x="130" y="125" textAnchor="middle" fontSize="12" fill="rgba(255,255,255,0.8)">
              2.4M+ Studies
            </text>

            <rect
              x="40"
              y="160"
              width="180"
              height="80"
              rx="12"
              fill="url(#pipelineBlueGradient)"
              stroke="#3b82f6"
              strokeWidth="2"
            />
            <text x="130" y="190" textAnchor="middle" fontSize="14" fontWeight="bold" fill="white">
              Clinical Trials
            </text>
            <text x="130" y="210" textAnchor="middle" fontSize="12" fill="rgba(255,255,255,0.9)">
              ClinicalTrials.gov
            </text>
            <text x="130" y="225" textAnchor="middle" fontSize="12" fill="rgba(255,255,255,0.8)">
              450K+ Trials
            </text>

            <rect
              x="40"
              y="260"
              width="180"
              height="80"
              rx="12"
              fill="url(#pipelineBlueGradient)"
              stroke="#3b82f6"
              strokeWidth="2"
            />
            <text x="130" y="290" textAnchor="middle" fontSize="14" fontWeight="bold" fill="white">
              Meta-Analyses
            </text>
            <text x="130" y="310" textAnchor="middle" fontSize="12" fill="rgba(255,255,255,0.9)">
              Systematic Reviews
            </text>
            <text x="130" y="325" textAnchor="middle" fontSize="12" fill="rgba(255,255,255,0.8)">
              85K+ Reviews
            </text>

            <rect
              x="40"
              y="360"
              width="180"
              height="80"
              rx="12"
              fill="url(#pipelineBlueGradient)"
              stroke="#3b82f6"
              strokeWidth="2"
            />
            <text x="130" y="390" textAnchor="middle" fontSize="14" fontWeight="bold" fill="white">
              Regulatory Data
            </text>
            <text x="130" y="410" textAnchor="middle" fontSize="12" fill="rgba(255,255,255,0.9)">
              FDA, EFSA, Health Canada
            </text>
            <text x="130" y="425" textAnchor="middle" fontSize="12" fill="rgba(255,255,255,0.8)">
              Real-time Updates
            </text>
          </g>

          {/* Processing Stage */}
          <g className="processing">
            <rect
              x="300"
              y="120"
              width="200"
              height="260"
              rx="16"
              fill="url(#pipelinePurpleGradient)"
              stroke="#8b5cf6"
              strokeWidth="3"
            />
            <text x="400" y="150" textAnchor="middle" fontSize="16" fontWeight="bold" fill="white">
              AI Processing Engine
            </text>

            <rect
              x="320"
              y="170"
              width="160"
              height="35"
              rx="6"
              fill="rgba(255,255,255,0.2)"
              stroke="rgba(255,255,255,0.4)"
              strokeWidth="1"
            />
            <text x="400" y="192" textAnchor="middle" fontSize="13" fontWeight="600" fill="white">
              Quality Assessment
            </text>

            <rect
              x="320"
              y="215"
              width="160"
              height="35"
              rx="6"
              fill="rgba(255,255,255,0.2)"
              stroke="rgba(255,255,255,0.4)"
              strokeWidth="1"
            />
            <text x="400" y="237" textAnchor="middle" fontSize="13" fontWeight="600" fill="white">
              Evidence Scoring
            </text>

            <rect
              x="320"
              y="260"
              width="160"
              height="35"
              rx="6"
              fill="rgba(255,255,255,0.2)"
              stroke="rgba(255,255,255,0.4)"
              strokeWidth="1"
            />
            <text x="400" y="282" textAnchor="middle" fontSize="13" fontWeight="600" fill="white">
              Bias Detection
            </text>

            <rect
              x="320"
              y="305"
              width="160"
              height="35"
              rx="6"
              fill="rgba(255,255,255,0.2)"
              stroke="rgba(255,255,255,0.4)"
              strokeWidth="1"
            />
            <text x="400" y="327" textAnchor="middle" fontSize="13" fontWeight="600" fill="white">
              Interaction Analysis
            </text>
          </g>

          {/* Analysis Stage */}
          <g className="analysis">
            <rect
              x="580"
              y="120"
              width="200"
              height="260"
              rx="16"
              fill="url(#pipelinePurpleGradient)"
              stroke="#8b5cf6"
              strokeWidth="3"
            />
            <text x="680" y="150" textAnchor="middle" fontSize="16" fontWeight="bold" fill="white">
              Analysis Engine
            </text>

            <rect
              x="600"
              y="170"
              width="160"
              height="35"
              rx="6"
              fill="rgba(255,255,255,0.2)"
              stroke="rgba(255,255,255,0.4)"
              strokeWidth="1"
            />
            <text x="680" y="192" textAnchor="middle" fontSize="13" fontWeight="600" fill="white">
              Effect Size Calculation
            </text>

            <rect
              x="600"
              y="215"
              width="160"
              height="35"
              rx="6"
              fill="rgba(255,255,255,0.2)"
              stroke="rgba(255,255,255,0.4)"
              strokeWidth="1"
            />
            <text x="680" y="237" textAnchor="middle" fontSize="13" fontWeight="600" fill="white">
              Dosage Optimization
            </text>

            <rect
              x="600"
              y="260"
              width="160"
              height="35"
              rx="6"
              fill="rgba(255,255,255,0.2)"
              stroke="rgba(255,255,255,0.4)"
              strokeWidth="1"
            />
            <text x="680" y="282" textAnchor="middle" fontSize="13" fontWeight="600" fill="white">
              Safety Profiling
            </text>

            <rect
              x="600"
              y="305"
              width="160"
              height="35"
              rx="6"
              fill="rgba(255,255,255,0.2)"
              stroke="rgba(255,255,255,0.4)"
              strokeWidth="1"
            />
            <text x="680" y="327" textAnchor="middle" fontSize="13" fontWeight="600" fill="white">
              Synergy Detection
            </text>
          </g>

          {/* Output Stage */}
          <g className="output">
            <rect
              x="860"
              y="60"
              width="180"
              height="80"
              rx="12"
              fill="url(#pipelineGreenGradient)"
              stroke="#10b981"
              strokeWidth="2"
            />
            <text x="950" y="90" textAnchor="middle" fontSize="14" fontWeight="bold" fill="white">
              Protocol Builder
            </text>
            <text x="950" y="110" textAnchor="middle" fontSize="12" fill="rgba(255,255,255,0.9)">
              Personalized Stacks
            </text>
            <text x="950" y="125" textAnchor="middle" fontSize="12" fill="rgba(255,255,255,0.8)">
              AI-Optimized
            </text>

            <rect
              x="860"
              y="160"
              width="180"
              height="80"
              rx="12"
              fill="url(#pipelineGreenGradient)"
              stroke="#10b981"
              strokeWidth="2"
            />
            <text x="950" y="190" textAnchor="middle" fontSize="14" fontWeight="bold" fill="white">
              Quality Scores
            </text>
            <text x="950" y="210" textAnchor="middle" fontSize="12" fill="rgba(255,255,255,0.9)">
              Evidence Ratings
            </text>
            <text x="950" y="225" textAnchor="middle" fontSize="12" fill="rgba(255,255,255,0.8)">
              Confidence Metrics
            </text>

            <rect
              x="860"
              y="260"
              width="180"
              height="80"
              rx="12"
              fill="url(#pipelineGreenGradient)"
              stroke="#10b981"
              strokeWidth="2"
            />
            <text x="950" y="290" textAnchor="middle" fontSize="14" fontWeight="bold" fill="white">
              Recommendations
            </text>
            <text x="950" y="310" textAnchor="middle" fontSize="12" fill="rgba(255,255,255,0.9)">
              Dosage & Timing
            </text>
            <text x="950" y="325" textAnchor="middle" fontSize="12" fill="rgba(255,255,255,0.8)">
              Interaction Warnings
            </text>

            <rect
              x="860"
              y="360"
              width="180"
              height="80"
              rx="12"
              fill="url(#pipelineGreenGradient)"
              stroke="#10b981"
              strokeWidth="2"
            />
            <text x="950" y="390" textAnchor="middle" fontSize="14" fontWeight="bold" fill="white">
              Purchase Links
            </text>
            <text x="950" y="410" textAnchor="middle" fontSize="12" fill="rgba(255,255,255,0.9)">
              Verified Suppliers
            </text>
            <text x="950" y="425" textAnchor="middle" fontSize="12" fill="rgba(255,255,255,0.8)">
              Best Pricing
            </text>
          </g>

          {/* Flow arrows */}
          <g className="arrows" stroke="#3b82f6" strokeWidth="3" fill="none">
            {/* Sources to Processing */}
            <path d="M 230 100 L 290 100 L 285 95 M 290 100 L 285 105" />
            <path d="M 230 200 L 260 200 L 260 220 L 290 220 L 285 215 M 290 220 L 285 225" />
            <path d="M 230 300 L 260 300 L 260 280 L 290 280 L 285 275 M 290 280 L 285 285" />
            <path d="M 230 400 L 260 400 L 260 360 L 290 360 L 285 355 M 290 360 L 285 365" />

            {/* Processing to Analysis */}
            <path d="M 510 250 L 570 250 L 565 245 M 570 250 L 565 255" />

            {/* Analysis to Outputs */}
            <path d="M 790 200 L 820 200 L 820 100 L 850 100 L 845 95 M 850 100 L 845 105" />
            <path d="M 790 250 L 850 250 L 845 245 M 850 250 L 845 255" />
            <path d="M 790 300 L 820 300 L 820 320 L 850 320 L 845 315 M 850 320 L 845 325" />
            <path d="M 790 350 L 820 350 L 820 400 L 850 400 L 845 395 M 850 400 L 845 405" />
          </g>

          {/* Animated particles on hover */}
          {isHovering && (
            <g className="particles">
              <circle r="4" fill="#3b82f6" fillOpacity="0.9">
                <animateMotion
                  dur="4s"
                  repeatCount="indefinite"
                  path="M 230 100 L 290 100 L 510 250 L 790 200 L 850 200"
                />
              </circle>
              <circle r="3" fill="#8b5cf6" fillOpacity="0.8">
                <animateMotion
                  dur="5s"
                  repeatCount="indefinite"
                  path="M 230 200 L 260 200 L 260 220 L 290 220 L 510 250 L 790 250 L 850 250"
                />
              </circle>
              <circle r="3.5" fill="#10b981" fillOpacity="0.9">
                <animateMotion
                  dur="4.5s"
                  repeatCount="indefinite"
                  path="M 230 300 L 260 300 L 260 280 L 290 280 L 510 250 L 790 300 L 820 300 L 820 320 L 850 320"
                />
              </circle>
            </g>
          )}
        </svg>

        {/* Hover overlay */}
        {isHovering && (
          <div className="absolute top-6 right-6 bg-background/95 backdrop-blur-md border border-border/50 rounded-xl p-4 shadow-2xl min-w-[200px]">
            <div className="text-sm space-y-2">
              <div className="flex justify-between gap-6">
                <span className="text-muted-foreground">Processing Rate:</span>
                <span className="font-semibold text-green-600">2.4k studies/day</span>
              </div>
              <div className="flex justify-between gap-6">
                <span className="text-muted-foreground">Quality Score:</span>
                <span className="font-semibold text-blue-600">94.2%</span>
              </div>
              <div className="flex justify-between gap-6">
                <span className="text-muted-foreground">Active Sources:</span>
                <span className="font-semibold text-purple-600">12</span>
              </div>
              <div className="flex justify-between gap-6">
                <span className="text-muted-foreground">AI Accuracy:</span>
                <span className="font-semibold text-orange-600">97.8%</span>
              </div>
              <div className="flex justify-between gap-6">
                <span className="text-muted-foreground">Protocols Built:</span>
                <span className="font-semibold text-indigo-600">15.2k</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
