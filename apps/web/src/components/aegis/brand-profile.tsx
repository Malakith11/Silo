"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Shield, AlertTriangle, CheckCircle } from "lucide-react"

interface BrandProfileProps {
  name: string
  overallScore: number
  certifications: string[]
  warnings: string[]
  testingStatus: "verified" | "partial" | "none"
}

export function BrandProfile({
  name,
  overallScore,
  certifications,
  warnings,
  testingStatus
}: BrandProfileProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-500"
    if (score >= 60) return "text-yellow-500"
    return "text-red-500"
  }

  const getTestingIcon = () => {
    switch (testingStatus) {
      case "verified":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "partial":
        return <Shield className="h-5 w-5 text-yellow-500" />
      default:
        return <AlertTriangle className="h-5 w-5 text-red-500" />
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl">{name}</CardTitle>
          <div className="flex items-center gap-2">
            {getTestingIcon()}
            <span className={`text-2xl font-bold ${getScoreColor(overallScore)}`}>
              {overallScore}/100
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {certifications.length > 0 && (
          <div>
            <h4 className="font-medium mb-2">Certifications</h4>
            <div className="flex flex-wrap gap-2">
              {certifications.map((cert, index) => (
                <Badge key={index} variant="secondary">
                  {cert}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {warnings.length > 0 && (
          <div>
            <h4 className="font-medium mb-2 text-red-600">Warnings</h4>
            <ul className="text-sm text-red-600 space-y-1">
              {warnings.map((warning, index) => (
                <li key={index}>• {warning}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex gap-2">
          <Button variant="outline" size="sm">View Details</Button>
          <Button size="sm">Compare Brands</Button>
        </div>
      </CardContent>
    </Card>
  )
}