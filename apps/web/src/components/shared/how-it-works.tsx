"use client"
import { Card, CardContent } from "../ui/card"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { Target, Brain, FlaskConical, TrendingUp, ArrowRight, Sparkles, CheckCircle } from "lucide-react"
import { useState, useEffect } from "react"
import { useInView } from "react-intersection-observer"
import { useMotion } from "../Global/motion-provider"

// Typing Animation Component
type TypedTextProps = {
  text: string
  delay?: number
  speed?: number
  className?: string
}

function TypedText({ text, delay = 0, speed = 50, className = "" }: TypedTextProps) {
  const [displayedText, setDisplayedText] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const { shouldAnimate } = useMotion()
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  useEffect(() => {
    if (!shouldAnimate || !inView) return

    let timeout

    timeout = setTimeout(() => {
      setIsTyping(true)
      let currentIndex = 0
      const interval = setInterval(() => {
        if (currentIndex <= text.length) {
          setDisplayedText(text.substring(0, currentIndex))
          currentIndex++
        } else {
          clearInterval(interval)
          setIsTyping(false)
        }
      }, speed)

      return () => clearInterval(interval)
    }, delay)

    return () => clearTimeout(timeout)
  }, [text, delay, speed, shouldAnimate, inView])

  return (
    <span ref={ref} className={className}>
      {displayedText}
      {isTyping && <span className="inline-block w-[0.1em] h-[1.1em] bg-blue-600 ml-1 animate-blink" />}
    </span>
  )
}

// Interactive Step Card Component
type Step = {
  number: number
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
  features: string[]
  tip: string
}

type StepCardProps = {
  step: Step
  onClick: (step: Step) => void
  delay?: number
}

function StepCard({ step, onClick, delay = 0 }: StepCardProps) {
  const { shouldAnimate } = useMotion()
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <div
      ref={ref}
      className={`relative cursor-pointer transform transition-all duration-500 ${
        shouldAnimate && inView
          ? "translate-y-0 opacity-100"
          : shouldAnimate
            ? "translate-y-8 opacity-0"
            : "opacity-100"
      }`}
      style={shouldAnimate ? { transitionDelay: `${delay}ms` } : {}}
      onClick={() => onClick(step)}
    >
      <Card
        className={`group relative overflow-hidden border-2 transition-all duration-300 border-border/30 hover:border-blue-400/50 bg-card/50 backdrop-blur-sm hover:shadow-2xl`}
      >
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <CardContent className="p-8 relative z-10">
          <div className="flex items-center mb-6">
            <div
              className={`w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300`}
            >
              <step.icon className="w-8 h-8 text-white" />
            </div>

            <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200">
              Step {step.number}
            </Badge>
          </div>

          <h3 className={`text-xl font-bold text-foreground mb-3 group-hover:text-blue-600 transition-colors`}>
            {step.title}
          </h3>

          <p className="text-muted-foreground leading-relaxed">{step.description}</p>

          {/* Hover Arrow */}
          <div
            className={`mt-6 flex items-center text-blue-600 opacity-0 group-hover:opacity-100 transition-all duration-300`}
          >
            <span className="text-sm font-medium mr-2">Explore this step</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Detailed Pop-out Panel
type DetailPanelProps = {
  step: Step | null
  isVisible: boolean
  onClose: () => void
}

function DetailPanel({ step, isVisible, onClose }: DetailPanelProps) {
  const { shouldAnimate } = useMotion()

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card
        className={`max-w-2xl w-full max-h-[80vh] overflow-y-auto transform transition-all duration-300 ${
          shouldAnimate ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
      >
        <CardContent className="p-8">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center">
                {step && <step.icon className="w-8 h-8 text-white" />}
              </div>
              <div>
                {step && (
                  <>
                    <Badge className="mb-2 bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200">
                      Step {step.number}
                    </Badge>
                    <h3 className="text-2xl font-bold text-foreground">{step.title}</h3>
                  </>
                )}
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              ✕
            </Button>
          </div>

          {step && (
            <p className="text-muted-foreground mb-6 leading-relaxed">{step.description}</p>
          )}

          <div className="space-y-3 mb-6">
            <h4 className="font-semibold text-foreground">Key Features:</h4>
            {step && step.features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span className="text-sm text-foreground">{feature}</span>
              </div>
            ))}
          </div>

          <div className="bg-blue-50 dark:bg-blue-950/20 rounded-xl p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Sparkles className="w-5 h-5 text-blue-600" />
              <span className="font-medium text-blue-600">Pro Tip</span>
            </div>
            <p className="text-sm text-blue-700 dark:text-blue-300">{step ? step.tip : null}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export function HowItWorks() {
  const { shouldAnimate } = useMotion()
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  const [selectedStep, setSelectedStep] = useState<any>(null)

  const steps = [
    {
      number: 1,
      icon: Target,
      title: "Define Your Goals",
      description: "Tell us what you want to achieve with our comprehensive health assessment.",
      features: [
        "Personalized health assessment",
        "Goal-specific questionnaires",
        "Lifestyle analysis",
        "Medical history consideration",
      ],
      tip: "Be specific about your goals - the more detail you provide, the better our AI can personalize your protocol.",
    },
    {
      number: 2,
      icon: Brain,
      title: "AI Analysis",
      description: "Our AI analyzes your profile against research and clinical studies.",
      features: [
        "Evidence-based recommendations",
        "Interaction checking",
        "Dosage optimization",
        "Timing recommendations",
      ],
      tip: "Our AI processes over 10,000 research papers and user outcomes to find your perfect match.",
    },
    {
      number: 3,
      icon: FlaskConical,
      title: "Custom Protocol",
      description: "Receive your personalized supplement protocol with detailed instructions.",
      features: [
        "Personalized dosing schedules",
        "Quality-verified products",
        "Budget-conscious options",
        "Progress tracking setup",
      ],
      tip: "Start with the core supplements and gradually add others as your body adapts.",
    },
    {
      number: 4,
      icon: TrendingUp,
      title: "Track & Optimize",
      description: "Monitor progress and receive ongoing optimizations based on results.",
      features: ["Progress monitoring", "Outcome tracking", "Protocol adjustments", "Continuous optimization"],
      tip: "Consistency is key - track your supplements daily for the best optimization results.",
    },
  ]

  const handleStepClick = (step: Step) => {
    setSelectedStep(step)
  }

  return (
    <section id="how-it-works" className="min-h-screen flex items-center px-6 py-16 bg-transparent">
      <h2 className="text-4xl md:text-5xl font-bold text-white text-left w-full">
        How It Works
      </h2>
    </section>
  )
}
