"use client"
import { Card, CardContent } from "../ui/card"
import { Badge } from "../ui/badge"
import { Star, TrendingUp, Users, Award, Target } from "lucide-react"
import { useInView } from "react-intersection-observer"
import { useMotion } from "../Global/motion-provider"
import { useState, useEffect } from "react"

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

const STATS = [
  {
    icon: Users,
    value: "50,000+",
    label: "Active Users",
    description: "Researchers and practitioners worldwide",
  },
  {
    icon: Award,
    value: "15,000+",
    label: "Protocols Analyzed",
    description: "Evidence-based supplement combinations",
  },
  {
    icon: TrendingUp,
    value: "94%",
    label: "Improvement Rate",
    description: "Users report measurable health outcomes",
  },
  {
    icon: Target,
    value: "2.3M+",
    label: "Data Points",
    description: "Biomarker measurements tracked",
  },
]

const TESTIMONIALS = [
  {
    name: "Dr. Sarah Chen",
    role: "Functional Medicine Practitioner",
    location: "San Francisco, CA",
    avatar: "/placeholder.svg?height=48&width=48",
    quote:
      "Silo has transformed how I approach supplement protocols. The research depth and quality assessment tools save me hours of literature review.",
    results: [
      { metric: "Patient Outcomes", value: "+47%", description: "improvement in biomarker optimization" },
      { metric: "Protocol Efficiency", value: "+62%", description: "faster protocol development" },
    ],
    rating: 5,
  },
  {
    name: "Marcus Rodriguez",
    role: "Performance Coach",
    location: "Austin, TX",
    avatar: "/placeholder.svg?height=48&width=48",
    quote:
      "The Stack Lab's interaction analysis caught combinations I would have missed. My athletes are seeing consistent performance gains.",
    results: [
      { metric: "Athletic Performance", value: "+23%", description: "average improvement across clients" },
      { metric: "Recovery Time", value: "-31%", description: "reduction in post-workout recovery" },
    ],
    rating: 5,
  },
  {
    name: "Dr. Emily Watson",
    role: "Research Scientist",
    location: "Boston, MA",
    avatar: "/placeholder.svg?height=48&width=48",
    quote:
      "The transparency in methodology and quality scoring gives me confidence in recommending protocols to study participants.",
    results: [
      { metric: "Research Efficiency", value: "+89%", description: "faster literature synthesis" },
      { metric: "Protocol Accuracy", value: "+56%", description: "improvement in dosage precision" },
    ],
    rating: 5,
  },
]

type Stat = {
  icon: React.ElementType
  value: string
  label: string
  description: string
}

type StatCardProps = {
  stat: Stat
  index: number
  isVisible: boolean
}

function StatCard({ stat, index, isVisible }: StatCardProps) {
  const Icon = stat.icon
  const { shouldAnimate } = useMotion()

  return (
    <Card
      className={`text-center border-border/50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm hover:border-blue-600/30 hover:bg-blue-600/5 ${
        shouldAnimate ? "transition-all duration-700 transform" : "transition-colors"
      } ${
        shouldAnimate && isVisible
          ? "translate-y-0 opacity-100 scale-100"
          : shouldAnimate
            ? "translate-y-8 opacity-0 scale-95"
            : "opacity-100"
      }`}
      style={shouldAnimate ? { transitionDelay: `${index * 150}ms` } : {}}
    >
      <CardContent className="p-6 space-y-4">
        <div
          className={`mx-auto w-fit p-3 rounded-lg bg-blue-600/10 text-blue-600 ${
            shouldAnimate ? "transform transition-all duration-500" : ""
          } ${shouldAnimate && isVisible ? "rotate-0 scale-100" : shouldAnimate ? "rotate-12 scale-90" : ""}`}
          style={shouldAnimate ? { transitionDelay: `${index * 150 + 200}ms` } : {}}
        >
          <Icon className="w-6 h-6" />
        </div>
        <div
          className={`space-y-1 ${shouldAnimate ? "transform transition-all duration-500" : ""} ${
            shouldAnimate && isVisible
              ? "translate-y-0 opacity-100"
              : shouldAnimate
                ? "translate-y-4 opacity-0"
                : "opacity-100"
          }`}
          style={shouldAnimate ? { transitionDelay: `${index * 150 + 300}ms` } : {}}
        >
          <div className="text-2xl font-bold text-foreground">{stat.value}</div>
          <div className="text-sm font-medium text-blue-600">{stat.label}</div>
          <div className="text-xs text-muted-foreground">{stat.description}</div>
        </div>
      </CardContent>
    </Card>
  )
}

type Testimonial = {
  name: string
  role: string
  location: string
  avatar: string
  quote: string
  results: { metric: string; value: string; description: string }[]
  rating: number
}

type TestimonialCardProps = {
  testimonial: Testimonial
  index: number
  isVisible: boolean
}

function TestimonialCard({ testimonial, index, isVisible }: TestimonialCardProps) {
  const { shouldAnimate } = useMotion()

  return (
    <Card
      className={`border-border/50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm hover:border-blue-600/30 hover:bg-blue-600/5 ${
        shouldAnimate ? "transition-all duration-700 transform" : "transition-colors"
      } ${
        shouldAnimate && isVisible
          ? "translate-y-0 opacity-100"
          : shouldAnimate
            ? "translate-y-12 opacity-0"
            : "opacity-100"
      }`}
      style={shouldAnimate ? { transitionDelay: `${index * 200}ms` } : {}}
    >
      <CardContent className="p-6 space-y-6">
        {/* Header */}
        <div
          className={`flex items-start gap-4 ${shouldAnimate ? "transform transition-all duration-500" : ""} ${
            shouldAnimate && isVisible
              ? "translate-x-0 opacity-100"
              : shouldAnimate
                ? "translate-x-[-20px] opacity-0"
                : "opacity-100"
          }`}
          style={shouldAnimate ? { transitionDelay: `${index * 200 + 200}ms` } : {}}
        >
          <img
            src={testimonial.avatar || "/placeholder.svg"}
            alt={testimonial.name}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                <p className="text-sm text-blue-600">{testimonial.role}</p>
                <p className="text-xs text-muted-foreground">{testimonial.location}</p>
              </div>
              <div className="flex items-center gap-1">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Quote */}
        <blockquote
          className={`text-muted-foreground italic leading-relaxed ${
            shouldAnimate ? "transform transition-all duration-500" : ""
          } ${
            shouldAnimate && isVisible
              ? "translate-y-0 opacity-100"
              : shouldAnimate
                ? "translate-y-4 opacity-0"
                : "opacity-100"
          }`}
          style={shouldAnimate ? { transitionDelay: `${index * 200 + 400}ms` } : {}}
        >
          "{testimonial.quote}"
        </blockquote>

        {/* Results */}
        <div className="space-y-3 pt-4 border-t border-border/50">
          <div
            className={`text-sm font-medium text-foreground ${
              shouldAnimate ? "transform transition-all duration-500" : ""
            } ${
              shouldAnimate && isVisible
                ? "translate-x-0 opacity-100"
                : shouldAnimate
                  ? "translate-x-[-10px] opacity-0"
                  : "opacity-100"
            }`}
            style={shouldAnimate ? { transitionDelay: `${index * 200 + 600}ms` } : {}}
          >
            Measured Results:
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {testimonial.results.map((result, resultIndex) => (
              <div
                key={resultIndex}
                className={`space-y-1 ${shouldAnimate ? "transform transition-all duration-500" : ""} ${
                  shouldAnimate && isVisible
                    ? "translate-y-0 opacity-100"
                    : shouldAnimate
                      ? "translate-y-4 opacity-0"
                      : "opacity-100"
                }`}
                style={shouldAnimate ? { transitionDelay: `${index * 200 + 700 + resultIndex * 100}ms` } : {}}
              >
                <div className="flex items-center gap-2">
                  <div className="text-lg font-bold text-blue-600">{result.value}</div>
                  <div className="text-sm font-medium text-foreground">{result.metric}</div>
                </div>
                <div className="text-xs text-muted-foreground">{result.description}</div>
              </div>
            ))}
          </div>
        </div>
        </CardContent>
      </Card>
    )
}

export function Testimonials() {
  const { shouldAnimate } = useMotion()

  const { ref: headerRef, inView: headerInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const { ref: statsRef, inView: statsInView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  })

  const { ref: testimonialsRef, inView: testimonialsInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section className="py-24 px-6 bg-silo-bg">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16 space-y-4" ref={headerRef}>
          <Badge
            variant="outline"
            className={`inline-flex items-center gap-2 px-4 py-2 text-sm font-medium border-blue-600/20 bg-blue-600/5 text-blue-600 ${
              shouldAnimate ? "transform transition-all duration-700" : ""
            } ${
              shouldAnimate && headerInView
                ? "translate-y-0 opacity-100"
                : shouldAnimate
                  ? "translate-y-4 opacity-0"
                  : "opacity-100"
            }`}
          >
            <Users className="w-4 h-4" />
            Trusted by Professionals
          </Badge>

          <h2
            className={`text-3xl md:text-4xl font-bold tracking-tight text-foreground ${
              shouldAnimate ? "transform transition-all duration-700" : ""
            } ${
              shouldAnimate && headerInView
                ? "translate-y-0 opacity-100"
                : shouldAnimate
                  ? "translate-y-6 opacity-0"
                  : "opacity-100"
            }`}
            style={shouldAnimate ? { transitionDelay: "200ms" } : {}}
          >
            <TypedText text="Measurable Results for" delay={200} speed={60} />
            <br />
            <TypedText text="Health Professionals" delay={1500} speed={60} className="text-blue-600" />
          </h2>

          <p
            className={`text-lg md:text-xl leading-relaxed text-muted-foreground max-w-3xl mx-auto ${
              shouldAnimate ? "transform transition-all duration-700" : ""
            } ${
              shouldAnimate && headerInView
                ? "translate-y-0 opacity-100"
                : shouldAnimate
                  ? "translate-y-6 opacity-0"
                  : "opacity-100"
            }`}
            style={shouldAnimate ? { transitionDelay: "2800ms" } : {}}
          >
            Practitioners, researchers, and coaches rely on Silo for evidence-based supplementation protocols that
            deliver consistent, measurable outcomes.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16" ref={statsRef}>
          {STATS.map((stat, index) => (
            <StatCard key={index} stat={stat} index={index} isVisible={statsInView} />
          ))}
        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8" ref={testimonialsRef}>
          {TESTIMONIALS.map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} index={index} isVisible={testimonialsInView} />
          ))}
        </div>
      </div>
    </section>
  )
}
