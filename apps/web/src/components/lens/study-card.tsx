"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Users, Calendar, Star, BookOpen } from "lucide-react"

interface StudyCardProps {
  title: string
  authors: string[]
  journal: string
  year: number
  studyType: string
  sampleSize: number
  duration: string
  qualityScore: number
  keyFindings: string[]
  tags: string[]
  saved?: boolean
}

export function StudyCard({
  title,
  authors,
  journal,
  year,
  studyType,
  sampleSize,
  duration,
  qualityScore,
  keyFindings,
  tags,
  saved = false
}: StudyCardProps) {
  const getQualityColor = (score: number) => {
    if (score >= 80) return "text-green-500"
    if (score >= 60) return "text-yellow-500"
    return "text-red-500"
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <CardTitle className="text-lg mb-2 line-clamp-2">{title}</CardTitle>
            <div className="text-sm text-muted-foreground">
              {authors.slice(0, 2).join(", ")} {authors.length > 2 && "et al."} • {journal} ({year})
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <div className={`text-2xl font-bold ${getQualityColor(qualityScore)}`}>
              {qualityScore}/100
            </div>
            <Badge variant="outline">{studyType}</Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span>{sampleSize} participants</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>{duration}</span>
          </div>
        </div>

        <div>
          <h4 className="font-medium mb-2">Quality Score Breakdown</h4>
          <Progress value={qualityScore} className="h-2" />
        </div>

        <div>
          <h4 className="font-medium mb-2">Key Findings</h4>
          <ul className="text-sm space-y-1">
            {keyFindings.slice(0, 3).map((finding, index) => (
              <li key={index} className="text-muted-foreground">
                • {finding}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-wrap gap-2">
          {tags.slice(0, 4).map((tag, index) => (
            <Badge key={index} variant="secondary">
              {tag}
            </Badge>
          ))}
          {tags.length > 4 && (
            <Badge variant="outline">+{tags.length - 4} more</Badge>
          )}
        </div>

        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <BookOpen className="h-4 w-4 mr-2" />
            Read Full
          </Button>
          <Button variant="outline" size="sm">
            <Star className={`h-4 w-4 mr-2 ${saved ? "fill-current" : ""}`} />
            {saved ? "Saved" : "Save"}
          </Button>
          <Button size="sm">Import</Button>
        </div>
      </CardContent>
    </Card>
  )
}