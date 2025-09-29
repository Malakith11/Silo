"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Filter, BookOpen, Star } from "lucide-react"
import { useState } from "react"

interface Study {
  id: string
  title: string
  authors: string[]
  journal: string
  year: number
  studyType: string
  qualityScore: number
  tags: string[]
  summary: string
}

interface ResearchLibraryProps {
  studies: Study[]
}

export function ResearchLibrary({ studies }: ResearchLibraryProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFilter, setSelectedFilter] = useState<string>("all")

  const getQualityBadge = (score: number) => {
    if (score >= 80) return <Badge className="bg-green-500">High Quality</Badge>
    if (score >= 60) return <Badge className="bg-yellow-500">Medium Quality</Badge>
    return <Badge variant="destructive">Low Quality</Badge>
  }

  return (
    <div className="space-y-6">
      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search studies, supplements, outcomes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline">
          <Filter className="h-4 w-4 mr-2" />
          Filters
        </Button>
      </div>

      <div className="grid gap-4">
        {studies.map((study) => (
          <Card key={study.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <CardTitle className="text-lg mb-2">{study.title}</CardTitle>
                  <div className="text-sm text-muted-foreground">
                    {study.authors.slice(0, 3).join(", ")} et al. • {study.journal} ({study.year})
                  </div>
                </div>
                <div className="flex flex-col gap-2 items-end">
                  {getQualityBadge(study.qualityScore)}
                  <Badge variant="outline">{study.studyType}</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">{study.summary}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {study.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Read Full Study
                </Button>
                <Button variant="outline" size="sm">
                  <Star className="h-4 w-4 mr-2" />
                  Save
                </Button>
                <Button size="sm">Add to VANTA Lab</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}