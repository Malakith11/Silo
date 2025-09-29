"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { useRouter } from "next/navigation"
import {
  Play,
  CheckCircle,
  Clock,
  Users,
  Target,
  Compass,
  Beaker,
  Database,
  Shield,
  BookOpen,
  Lightbulb,
} from "lucide-react"

const GETTING_STARTED_STEPS = [
  {
    title: "Create Your Account",
    description: "Sign up for free and complete your health profile",
    icon: Users,
    time: "2 minutes",
    actions: ["Enter basic information", "Set health goals", "List current supplements"],
  },
  {
    title: "Explore Stack Compass",
    description: "Discover trending protocols and expert recommendations",
    icon: Compass,
    time: "5 minutes",
    actions: ["Browse protocol templates", "Read expert spotlights", "Check trending supplements"],
  },
  {
    title: "Build Your First Protocol",
    description: "Use Stack Lab to create your personalized supplement stack",
    icon: Beaker,
    time: "10 minutes",
    actions: ["Choose AI-guided or manual building", "Add supplements to time slots", "Review interactions and costs"],
  },
  {
    title: "Verify Quality & Safety",
    description: "Check supplement quality and potential interactions",
    icon: Shield,
    time: "5 minutes",
    actions: ["Review quality ratings", "Check interaction warnings", "Verify third-party testing"],
  },
  {
    title: "Optimize & Track",
    description: "Monitor your protocol and make data-driven improvements",
    icon: Target,
    time: "Ongoing",
    actions: ["Track protocol adherence", "Monitor health outcomes", "Adjust based on results"],
  },
]

const QUICK_TIPS = [
  {
    title: "Start Simple",
    description: "Begin with 3-5 core supplements rather than a complex protocol",
    icon: Lightbulb,
  },
  {
    title: "Use Templates",
    description: "Protocol templates are a great starting point for common health goals",
    icon: BookOpen,
  },
  {
    title: "Check Interactions",
    description: "Always review potential supplement-drug interactions before starting",
    icon: Shield,
  },
  {
    title: "Track Progress",
    description: "Keep notes on how you feel and any changes you notice",
    icon: Target,
  },
]

const COMMON_WORKFLOWS = [
  {
    title: "The Explorer",
    description: "Browse research and trending protocols before building",
    path: "Compass → Database → Lab",
    icon: Compass,
  },
  {
    title: "The Builder",
    description: "Jump straight into creating a custom protocol",
    path: "Lab → AI Suggest → Optimize",
    icon: Beaker,
  },
  {
    title: "The Researcher",
    description: "Deep dive into supplement research and quality data",
    path: "Database → Research → Audit",
    icon: Database,
  },
]

export function GettingStartedPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-6 py-24">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            Getting Started Guide
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Your First Steps with <span className="text-blue-600">Silo</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Follow this step-by-step guide to get the most out of our supplement platform and build your first
            evidence-based protocol.
          </p>
        </div>

        {/* Getting Started Steps */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-8">Step-by-Step Walkthrough</h2>
          <div className="space-y-6">
            {GETTING_STARTED_STEPS.map((step, index) => {
              const Icon = step.icon
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                          {index + 1}
                        </div>
                        <div className="p-2 rounded-lg bg-blue-600/10 text-blue-600">
                          <Icon className="h-5 w-5" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <CardTitle className="text-lg">{step.title}</CardTitle>
                          <Badge variant="secondary" className="text-xs">
                            <Clock className="h-3 w-3 mr-1" />
                            {step.time}
                          </Badge>
                        </div>
                        <CardDescription>{step.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="ml-12 space-y-2">
                      {step.actions.map((action, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          {action}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Common Workflows */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-8">Choose Your Workflow</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {COMMON_WORKFLOWS.map((workflow, index) => {
              const Icon = workflow.icon
              return (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="p-3 rounded-lg bg-blue-600/10 text-blue-600 w-fit mx-auto mb-3">
                      <Icon className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-lg">{workflow.title}</CardTitle>
                    <CardDescription>{workflow.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm font-medium text-blue-600 mb-4">{workflow.path}</div>
                    <Button variant="outline" size="sm" onClick={() => router.push("/onboarding")}>
                      Start Here
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Quick Tips */}
        <Card className="mb-16">
          <CardHeader>
            <CardTitle className="text-2xl">Pro Tips for Success</CardTitle>
            <CardDescription>Expert advice to help you get the most out of Silo</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              {QUICK_TIPS.map((tip, index) => {
                const Icon = tip.icon
                return (
                  <div key={index} className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-yellow-100 text-yellow-600 dark:bg-yellow-900/20">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{tip.title}</h3>
                      <p className="text-sm text-muted-foreground">{tip.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Begin Your Journey?</h2>
          <p className="text-muted-foreground mb-6">Start building your evidence-based supplement protocol today</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" onClick={() => router.push("/onboarding")} className="bg-blue-600 hover:bg-blue-700">
              <Play className="mr-2 h-4 w-4" />
              Start Now
            </Button>
            <Button variant="outline" size="lg" onClick={() => router.push("/how-it-works/overview")}>
              Platform Overview
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
