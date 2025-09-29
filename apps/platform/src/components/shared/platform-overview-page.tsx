"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { useRouter } from "next/navigation"
import { Compass, Beaker, Database, Shield, BarChart3, ArrowRight, CheckCircle, Zap, Brain, Target } from "lucide-react"

const PLATFORM_FEATURES = [
  {
    title: "Stack Compass",
    description: "Discover trending protocols, expert spotlights, and curated templates",
    icon: Compass,
    color: "text-blue-600",
    bgColor: "bg-blue-600/10",
    features: ["Protocol Templates", "Trending Analysis", "Expert Spotlights", "Goal-Based Recommendations"],
  },
  {
    title: "Stack Lab",
    description: "Build, optimize, and manage your personalized supplement protocols",
    icon: Beaker,
    color: "text-green-600",
    bgColor: "bg-green-600/10",
    features: ["AI-Powered Builder", "Drag & Drop Interface", "Cost Optimization", "Interaction Checking"],
  },
  {
    title: "Research Database",
    description: "Access comprehensive supplement research and clinical data",
    icon: Database,
    color: "text-purple-600",
    bgColor: "bg-purple-600/10",
    features: ["50,000+ Studies", "Quality Ratings", "Efficacy Scores", "Safety Profiles"],
  },
  {
    title: "Quality Audit",
    description: "Third-party testing and quality verification for supplement brands",
    icon: Shield,
    color: "text-orange-600",
    bgColor: "bg-orange-600/10",
    features: ["Lab Testing", "Manufacturing Standards", "Purity Verification", "Brand Ratings"],
  },
]

const HOW_IT_WORKS_STEPS = [
  {
    step: "1",
    title: "Discover",
    description: "Explore trending protocols and expert recommendations in Stack Compass",
    icon: Compass,
  },
  {
    step: "2",
    title: "Build",
    description: "Create your personalized protocol using our AI-powered Stack Lab",
    icon: Beaker,
  },
  {
    step: "3",
    title: "Verify",
    description: "Check supplement quality and interactions using our research database",
    icon: Shield,
  },
  {
    step: "4",
    title: "Optimize",
    description: "Track results and continuously improve your protocol over time",
    icon: Target,
  },
]

const BENEFITS = [
  {
    title: "Evidence-Based Decisions",
    description: "Every recommendation backed by peer-reviewed research",
    icon: Brain,
  },
  {
    title: "Time Savings",
    description: "Skip hours of research with our curated data and AI insights",
    icon: Zap,
  },
  {
    title: "Cost Optimization",
    description: "Find the best value supplements without compromising quality",
    icon: BarChart3,
  },
  {
    title: "Safety First",
    description: "Comprehensive interaction checking and quality verification",
    icon: Shield,
  },
]

export function PlatformOverviewPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-6 py-24">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            Platform Overview
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            How <span className="text-blue-600">Silo</span> Works
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A comprehensive platform that combines AI, research data, and quality verification to help you build the
            perfect supplement protocol.
          </p>
        </div>

        {/* Platform Features */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {PLATFORM_FEATURES.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`p-2 rounded-lg ${feature.bgColor} ${feature.color}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </div>
                  <CardDescription className="text-base">{feature.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-2">
                    {feature.features.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-3 w-3 text-green-600" />
                        {item}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* How It Works Steps */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Your Journey with Silo</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {HOW_IT_WORKS_STEPS.map((step, index) => {
              const Icon = step.icon
              return (
                <div key={index} className="text-center">
                  <div className="relative mb-4">
                    <div className="w-16 h-16 mx-auto bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold">
                      {step.step}
                    </div>
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                      <div className="p-1 bg-white dark:bg-gray-800 rounded-full border-2 border-blue-600">
                        <Icon className="h-4 w-4 text-blue-600" />
                      </div>
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Benefits */}
        <Card className="mb-16">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Why Choose Silo?</CardTitle>
            <CardDescription>The benefits of using our comprehensive supplement platform</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              {BENEFITS.map((benefit, index) => {
                const Icon = benefit.icon
                return (
                  <div key={index} className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-blue-600/10 text-blue-600">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{benefit.title}</h3>
                      <p className="text-sm text-muted-foreground">{benefit.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-muted-foreground mb-6">Join thousands of users building better supplement protocols</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" onClick={() => router.push("/onboarding")} className="bg-blue-600 hover:bg-blue-700">
              Start Free Trial <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="outline" size="lg" onClick={() => router.push("/how-it-works/guide")}>
              Getting Started Guide
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
