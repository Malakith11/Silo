"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface SupplementCardProps {
  name: string
  description: string
  usagePercent: number
  qualityScore: number
  trending: boolean
}

export function SupplementCard({
  name,
  description,
  usagePercent,
  qualityScore,
  trending
}: SupplementCardProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{name}</CardTitle>
          {trending && <Badge variant="secondary">Trending</Badge>}
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">{description}</p>
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm">Usage: {usagePercent}%</span>
          <span className="text-sm">Quality: {qualityScore}/100</span>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">View Details</Button>
          <Button size="sm">Add to Stack</Button>
        </div>
      </CardContent>
    </Card>
  )
}