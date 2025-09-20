"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, GripVertical, Edit, Trash2 } from "lucide-react"

interface TimeSlot {
  id: string
  time: string
  label: string
  supplements: SupplementInstance[]
}

interface SupplementInstance {
  id: string
  name: string
  dose: string
  form: string
  color: string
}

interface DragDropTimelineProps {
  timeSlots: TimeSlot[]
  onUpdateSlots: (slots: TimeSlot[]) => void
}

export function DragDropTimeline({ timeSlots, onUpdateSlots }: DragDropTimelineProps) {
  const [draggedItem, setDraggedItem] = useState<SupplementInstance | null>(null)
  const [draggedFrom, setDraggedFrom] = useState<string | null>(null)

  const handleDragStart = (supplement: SupplementInstance, fromSlotId: string) => {
    setDraggedItem(supplement)
    setDraggedFrom(fromSlotId)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent, toSlotId: string) => {
    e.preventDefault()

    if (!draggedItem || !draggedFrom) return

    const newSlots = timeSlots.map(slot => {
      if (slot.id === draggedFrom) {
        return {
          ...slot,
          supplements: slot.supplements.filter(s => s.id !== draggedItem.id)
        }
      }
      if (slot.id === toSlotId) {
        return {
          ...slot,
          supplements: [...slot.supplements, draggedItem]
        }
      }
      return slot
    })

    onUpdateSlots(newSlots)
    setDraggedItem(null)
    setDraggedFrom(null)
  }

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-2">Daily Timeline</h3>
        <p className="text-sm text-muted-foreground">
          Drag supplements between time slots to organize your daily schedule
        </p>
      </div>

      <div className="grid gap-4">
        {timeSlots.map((slot) => (
          <Card
            key={slot.id}
            className="relative"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, slot.id)}
          >
            <CardContent className="p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">{slot.time}</span>
                </div>
                <Badge variant="outline">{slot.label}</Badge>
              </div>

              <div className="min-h-[60px] border-2 border-dashed border-gray-200 rounded-lg p-3">
                {slot.supplements.length === 0 ? (
                  <div className="text-center text-muted-foreground text-sm py-4">
                    Drop supplements here
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {slot.supplements.map((supplement) => (
                      <div
                        key={supplement.id}
                        draggable
                        onDragStart={() => handleDragStart(supplement, slot.id)}
                        className="flex items-center gap-2 bg-white border rounded-lg p-2 cursor-move hover:shadow-md transition-shadow"
                        style={{ borderLeftColor: supplement.color, borderLeftWidth: "4px" }}
                      >
                        <GripVertical className="h-4 w-4 text-gray-400" />
                        <div className="flex-1">
                          <div className="font-medium text-sm">{supplement.name}</div>
                          <div className="text-xs text-muted-foreground">
                            {supplement.dose} {supplement.form}
                          </div>
                        </div>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="sm">
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center">
        <Button variant="outline">
          Add Time Slot
        </Button>
      </div>
    </div>
  )
}