"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, BookOpen, TrendingUp, Mail } from "lucide-react"

interface DigestItem {
  id: string
  title: string
  type: "new_study" | "trending_topic" | "regulatory_update"
  summary: string
  topic: string
  date: string
  readTime: number
}

interface DigestViewerProps {
  digestItems: DigestItem[]
  weekOf: string
}

export function DigestViewer({ digestItems, weekOf }: DigestViewerProps) {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case "new_study":
        return <BookOpen className="h-4 w-4" />
      case "trending_topic":
        return <TrendingUp className="h-4 w-4" />
      case "regulatory_update":
        return <Mail className="h-4 w-4" />
      default:
        return <BookOpen className="h-4 w-4" />
    }
  }

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "new_study":
        return <Badge className="bg-blue-500">New Study</Badge>
      case "trending_topic":
        return <Badge className="bg-green-500">Trending</Badge>
      case "regulatory_update":
        return <Badge className="bg-orange-500">Regulatory</Badge>
      default:
        return <Badge variant="secondary">Update</Badge>
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Weekly Research Digest</CardTitle>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              Week of {weekOf}
            </div>
          </div>
          <Button variant="outline" size="sm">
            <Mail className="h-4 w-4 mr-2" />
            Email Settings
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {digestItems.map((item) => (
            <div key={item.id} className="border-l-2 border-gray-200 pl-4 pb-4">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  {getTypeIcon(item.type)}
                  <span className="font-medium">{item.title}</span>
                </div>
                <div className="flex items-center gap-2">
                  {getTypeBadge(item.type)}
                  <span className="text-xs text-muted-foreground">
                    {item.readTime} min read
                  </span>
                </div>
              </div>

              <div className="text-sm text-muted-foreground mb-2">
                Topic: {item.topic} • {item.date}
              </div>

              <p className="text-sm mb-3">{item.summary}</p>

              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  Read More
                </Button>
                <Button variant="ghost" size="sm">
                  Save
                </Button>
              </div>
            </div>
          ))}
        </div>

        {digestItems.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <Mail className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No digest items this week</p>
            <p className="text-sm">Follow more topics to receive updates</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}