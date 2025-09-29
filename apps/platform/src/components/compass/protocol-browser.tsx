"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Users, Star } from "lucide-react"

interface Protocol {
  id: string
  name: string
  goal: string
  supplements: string[]
  userCount: number
  rating: number
}

interface ProtocolBrowserProps {
  protocols: Protocol[]
}

export function ProtocolBrowser({ protocols }: ProtocolBrowserProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {protocols.map((protocol) => (
        <Card key={protocol.id}>
          <CardHeader>
            <CardTitle className="text-lg">{protocol.name}</CardTitle>
            <Badge variant="outline">{protocol.goal}</Badge>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="text-sm text-muted-foreground">
                {protocol.supplements.slice(0, 3).join(", ")}
                {protocol.supplements.length > 3 && ` +${protocol.supplements.length - 3} more`}
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  {protocol.userCount} users
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-current" />
                  {protocol.rating}/5
                </div>
              </div>
              <Button className="w-full" size="sm">
                Import Protocol
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}