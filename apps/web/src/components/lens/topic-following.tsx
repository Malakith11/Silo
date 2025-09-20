"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Bell, BellOff, Plus, Trash2 } from "lucide-react"
import { useState } from "react"

interface Topic {
  id: string
  name: string
  category: string
  followersCount: number
  isFollowing: boolean
  newStudiesCount: number
}

interface TopicFollowingProps {
  topics: Topic[]
  onFollow: (topicId: string) => void
  onUnfollow: (topicId: string) => void
}

export function TopicFollowing({ topics, onFollow, onUnfollow }: TopicFollowingProps) {
  const [showAll, setShowAll] = useState(false)

  const displayedTopics = showAll ? topics : topics.slice(0, 6)

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Following Topics</CardTitle>
          <Button variant="outline" size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Topic
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3 md:grid-cols-2">
          {displayedTopics.map((topic) => (
            <div
              key={topic.id}
              className="flex items-center justify-between p-3 border rounded-lg"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium">{topic.name}</span>
                  {topic.newStudiesCount > 0 && (
                    <Badge variant="destructive" className="text-xs">
                      {topic.newStudiesCount} new
                    </Badge>
                  )}
                </div>
                <div className="text-sm text-muted-foreground">
                  {topic.category} • {topic.followersCount} followers
                </div>
              </div>
              <div className="flex gap-1">
                {topic.isFollowing ? (
                  <>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onUnfollow(topic.id)}
                    >
                      <BellOff className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onUnfollow(topic.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </>
                ) : (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onFollow(topic.id)}
                  >
                    <Bell className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>

        {topics.length > 6 && (
          <div className="mt-4 text-center">
            <Button
              variant="ghost"
              onClick={() => setShowAll(!showAll)}
            >
              {showAll ? "Show Less" : `Show ${topics.length - 6} More`}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}