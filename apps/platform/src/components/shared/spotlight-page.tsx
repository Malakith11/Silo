"use client"

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { Star, Calendar, User, BookOpen, ArrowRight, Award } from "lucide-react"

const TODAY_SPOTLIGHT = {
  supplement: "Rhodiola Rosea",
  category: "Adaptogen",
  rating: 4.7,
  reviewDate: "January 15, 2024",
  reviewer: "Dr. Sarah Chen, MD",
  reviewerCredentials: "Integrative Medicine Specialist",
  summary:
    "A comprehensive analysis of Rhodiola Rosea's adaptogenic properties and clinical applications for stress management and cognitive performance.",
  keyPoints: [
    "Significant stress reduction in 73% of clinical trials",
    "Improved cognitive performance under stress conditions",
    "Well-tolerated with minimal side effects",
    "Optimal dosing ranges from 200-400mg daily",
  ],
  clinicalEvidence: {
    studies: 47,
    participants: 3420,
    averageStudyDuration: "8 weeks",
  },
  safetyProfile: "Excellent",
  recommendation: "Highly Recommended for stress management and cognitive support",
}

const PREVIOUS_SPOTLIGHTS = [
  {
    date: "January 14, 2024",
    supplement: "Lion's Mane Mushroom",
    category: "Nootropic",
    rating: 4.8,
    reviewer: "Dr. Michael Torres, PhD",
  },
  {
    date: "January 13, 2024",
    supplement: "Magnesium Glycinate",
    category: "Mineral",
    rating: 4.9,
    reviewer: "Dr. Lisa Park, MD",
  },
  {
    date: "January 12, 2024",
    supplement: "Omega-3 EPA/DHA",
    category: "Essential Fatty Acid",
    rating: 4.6,
    reviewer: "Dr. James Wilson, MD",
  },
]

export function SpotlightPage() {
  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="container mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Star className="w-8 h-8 text-yellow-500" />
            <h1 className="text-4xl font-bold">Daily Spotlight</h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            In-depth daily reviews by certified medical professionals, analyzing the latest research and clinical
            evidence.
          </p>
        </div>

        {/* Today's Spotlight */}
        <Card className="mb-12 border-2 border-yellow-200 dark:border-yellow-800">
          <CardHeader>
            <div className="flex items-center justify-between mb-4">
              <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                Today's Spotlight
              </Badge>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="w-4 h-4" />
                <span>{TODAY_SPOTLIGHT.reviewDate}</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-3xl mb-2">{TODAY_SPOTLIGHT.supplement}</CardTitle>
                <Badge variant="outline" className="mb-4">
                  {TODAY_SPOTLIGHT.category}
                </Badge>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-1 mb-2">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="text-2xl font-bold">{TODAY_SPOTLIGHT.rating}</span>
                </div>
                <div className="text-sm text-muted-foreground">Overall Rating</div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Reviewer Info */}
            <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
              <div className="p-2 bg-primary/10 rounded-full">
                <User className="w-5 h-5 text-primary" />
              </div>
              <div>
                <div className="font-semibold">{TODAY_SPOTLIGHT.reviewer}</div>
                <div className="text-sm text-muted-foreground">{TODAY_SPOTLIGHT.reviewerCredentials}</div>
              </div>
            </div>

            {/* Summary */}
            <div>
              <h3 className="text-xl font-semibold mb-3">Expert Summary</h3>
              <p className="text-muted-foreground leading-relaxed">{TODAY_SPOTLIGHT.summary}</p>
            </div>

            {/* Key Points */}
            <div>
              <h3 className="text-xl font-semibold mb-3">Key Findings</h3>
              <div className="space-y-2">
                {TODAY_SPOTLIGHT.keyPoints.map((point, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Clinical Evidence */}
            <div className="grid md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-primary">{TODAY_SPOTLIGHT.clinicalEvidence.studies}</div>
                  <div className="text-sm text-muted-foreground">Clinical Studies</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-primary">
                    {TODAY_SPOTLIGHT.clinicalEvidence.participants.toLocaleString()}
                  </div>
                  <div className="text-sm text-muted-foreground">Total Participants</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-primary">
                    {TODAY_SPOTLIGHT.clinicalEvidence.averageStudyDuration}
                  </div>
                  <div className="text-sm text-muted-foreground">Avg Study Duration</div>
                </CardContent>
              </Card>
            </div>

            {/* Recommendation */}
            <div className="p-4 bg-green-50 dark:bg-green-950/50 rounded-lg border border-green-200 dark:border-green-800">
              <div className="flex items-center gap-2 mb-2">
                <Award className="w-5 h-5 text-green-600" />
                <span className="font-semibold text-green-800 dark:text-green-200">Expert Recommendation</span>
              </div>
              <p className="text-green-700 dark:text-green-300">{TODAY_SPOTLIGHT.recommendation}</p>
            </div>

            <div className="flex gap-4">
              <Button className="flex-1">
                <BookOpen className="w-4 h-4 mr-2" />
                Read Full Review
              </Button>
              <Button variant="outline" className="flex-1">
                Add to Stack Lab
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Previous Spotlights */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Previous Spotlights</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PREVIOUS_SPOTLIGHTS.map((spotlight, index) => (
              <Card key={spotlight.date} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline">{spotlight.category}</Badge>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{spotlight.rating}</span>
                    </div>
                  </div>
                  <CardTitle className="text-xl">{spotlight.supplement}</CardTitle>
                  <div className="text-sm text-muted-foreground">Reviewed by {spotlight.reviewer}</div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{spotlight.date}</span>
                    <Button variant="outline" size="sm">
                      Read Review
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
