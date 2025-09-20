"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface QualityMetric {
  name: string
  score: number
  maxScore: number
  description: string
}

interface QualityScorecardProps {
  metrics: QualityMetric[]
  overallScore: number
}

export function QualityScorecard({ metrics, overallScore }: QualityScorecardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quality Scorecard</CardTitle>
        <div className="text-3xl font-bold">
          {overallScore}/100
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {metrics.map((metric, index) => (
          <div key={index} className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-medium">{metric.name}</span>
              <span className="text-sm text-muted-foreground">
                {metric.score}/{metric.maxScore}
              </span>
            </div>
            <Progress
              value={(metric.score / metric.maxScore) * 100}
              className="h-2"
            />
            <p className="text-xs text-muted-foreground">
              {metric.description}
            </p>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}