"use client"

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { TrendingUp, Users, Star, ArrowRight, Flame, Eye } from "lucide-react"

const TRENDING_SUPPLEMENTS = [
  {
    name: "Lion's Mane Mushroom",
    category: "Cognitive",
    trend: "up",
    trendPercentage: 45,
    users: 12847,
    rating: 4.8,
    weeklyGrowth: "+23%",
    description: "Nootropic mushroom for cognitive enhancement",
  },
  {
    name: "NMN (Nicotinamide Mononucleotide)",
    category: "Longevity",
    trend: "up",
    trendPercentage: 67,
    users: 8934,
    rating: 4.6,
    weeklyGrowth: "+34%",
    description: "NAD+ precursor for cellular health",
  },
  {
    name: "Magnesium Glycinate",
    category: "Sleep",
    trend: "up",
    trendPercentage: 28,
    users: 15623,
    rating: 4.9,
    weeklyGrowth: "+18%",
    description: "Highly bioavailable magnesium for sleep",
  },
]

const TRENDING_PROTOCOLS = [
  {
    name: "Longevity Stack",
    supplements: ["NMN", "Resveratrol", "Quercetin", "Vitamin D"],
    users: 5847,
    trend: "up",
    trendPercentage: 52,
    category: "Anti-Aging",
  },
  {
    name: "Cognitive Enhancement",
    supplements: ["Lion's Mane", "Bacopa", "Rhodiola", "Omega-3"],
    users: 7234,
    trend: "up",
    trendPercentage: 38,
    category: "Nootropics",
  },
]

export function TrendingPage() {
  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="container mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Flame className="w-8 h-8 text-orange-500" />
            <h1 className="text-4xl font-bold">Trending Now</h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover what's popular in the supplement community based on real user data and emerging research.
          </p>
        </div>

        {/* Trending Supplements */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">🔥 Trending Supplements</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TRENDING_SUPPLEMENTS.map((supplement, index) => (
              <Card key={supplement.name} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline">{supplement.category}</Badge>
                    <div className="flex items-center gap-1 text-green-600">
                      <TrendingUp className="w-4 h-4" />
                      <span className="text-sm font-medium">{supplement.weeklyGrowth}</span>
                    </div>
                  </div>
                  <CardTitle className="text-xl">{supplement.name}</CardTitle>
                  <p className="text-muted-foreground text-sm">{supplement.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span>{supplement.rating}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4 text-muted-foreground" />
                        <span>{supplement.users.toLocaleString()}</span>
                      </div>
                    </div>
                    <Button className="w-full" variant="outline">
                      <Eye className="w-4 h-4 mr-2" />
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Trending Protocols */}
        <section>
          <h2 className="text-2xl font-bold mb-6">📈 Trending Protocols</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {TRENDING_PROTOCOLS.map((protocol, index) => (
              <Card key={protocol.name} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline">{protocol.category}</Badge>
                    <div className="flex items-center gap-1 text-green-600">
                      <TrendingUp className="w-4 h-4" />
                      <span className="text-sm font-medium">+{protocol.trendPercentage}%</span>
                    </div>
                  </div>
                  <CardTitle className="text-xl">{protocol.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Supplements</h4>
                      <div className="flex flex-wrap gap-1">
                        {protocol.supplements.map((supplement) => (
                          <Badge key={supplement} variant="secondary" className="text-xs">
                            {supplement}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>{protocol.users.toLocaleString()} users</span>
                      </div>
                    </div>
                    <Button className="w-full">
                      Try This Protocol
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
