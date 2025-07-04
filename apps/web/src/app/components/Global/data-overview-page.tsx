"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { useRouter } from "next/navigation"
import {
  BarChart3,
  Shield,
  FileText,
  Users,
  Globe,
  Microscope,
  TrendingUp,
  CheckCircle,
  ArrowRight,
} from "lucide-react"

const DATA_SOURCES = [
  {
    title: "Clinical Research Database",
    description: "Over 50,000 peer-reviewed studies from PubMed, Cochrane, and major medical journals",
    icon: Microscope,
    stats: "50,000+ Studies",
    badge: "Updated Daily",
  },
  {
    title: "Supplement Quality Database",
    description: "Third-party testing results, manufacturing standards, and quality certifications",
    icon: Shield,
    stats: "10,000+ Products",
    badge: "Lab Verified",
  },
  {
    title: "User Protocol Database",
    description: "Anonymized data from thousands of user protocols and outcomes",
    icon: Users,
    stats: "25,000+ Protocols",
    badge: "Privacy Protected",
  },
  {
    title: "Regulatory Tracking",
    description: "Real-time monitoring of FDA, Health Canada, and international regulatory changes",
    icon: FileText,
    stats: "Global Coverage",
    badge: "Real-time",
  },
  {
    title: "Market Intelligence",
    description: "Pricing data, availability tracking, and market trend analysis",
    icon: TrendingUp,
    stats: "1,000+ Brands",
    badge: "Live Data",
  },
  {
    title: "Interaction Database",
    description: "Comprehensive supplement-drug and supplement-supplement interaction data",
    icon: Globe,
    stats: "500,000+ Interactions",
    badge: "Clinically Validated",
  },
]

const DATA_PRINCIPLES = [
  {
    title: "Evidence-Based",
    description: "All recommendations backed by peer-reviewed research and clinical data",
  },
  {
    title: "Transparency",
    description: "Full source attribution and confidence scores for all data points",
  },
  {
    title: "Privacy First",
    description: "User data is anonymized and never shared with third parties",
  },
  {
    title: "Continuous Updates",
    description: "Data refreshed daily with the latest research and regulatory changes",
  },
]

export function DataOverviewPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-6 py-24">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            Data & Research
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            The Data Behind <span className="text-blue-600">Silo</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our platform is built on the world's most comprehensive supplement and health research database, ensuring
            every recommendation is backed by science.
          </p>
        </div>

        {/* Data Sources Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {DATA_SOURCES.map((source, index) => {
            const Icon = source.icon
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <div className="p-2 rounded-lg bg-blue-600/10 text-blue-600">
                      <Icon className="h-5 w-5" />
                    </div>
                    <Badge variant="secondary">{source.badge}</Badge>
                  </div>
                  <CardTitle className="text-lg">{source.title}</CardTitle>
                  <CardDescription>{source.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 text-sm font-medium text-blue-600">
                    <BarChart3 className="h-4 w-4" />
                    {source.stats}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Data Principles */}
        <Card className="mb-16">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Our Data Principles</CardTitle>
            <CardDescription>How we ensure data quality, accuracy, and user privacy</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              {DATA_PRINCIPLES.map((principle, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">{principle.title}</h3>
                    <p className="text-sm text-muted-foreground">{principle.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Experience Data-Driven Supplements?</h2>
          <p className="text-muted-foreground mb-6">Start building your evidence-based protocol today</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" onClick={() => router.push("/stack-lab")} className="bg-blue-600 hover:bg-blue-700">
              Start Building <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="outline" size="lg" onClick={() => router.push("/database")}>
              Explore Database
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
