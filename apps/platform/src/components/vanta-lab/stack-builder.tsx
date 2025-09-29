"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Plus, Search, Clock } from "lucide-react"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"

interface Supplement {
  id: string
  name: string
  dose: string
  form: string
  notes?: string
}

interface TimeBlock {
  id: string
  name: string
  time: string
  supplements: Supplement[]
}

interface StackBuilderProps {
  initialStack?: TimeBlock[]
}

export function StackBuilder({ initialStack = [] }: StackBuilderProps) {
  const [timeBlocks, setTimeBlocks] = useState<TimeBlock[]>(
    initialStack.length > 0 ? initialStack : [
      { id: "morning", name: "Morning", time: "8:00 AM", supplements: [] },
      { id: "afternoon", name: "Afternoon", time: "2:00 PM", supplements: [] },
      { id: "evening", name: "Evening", time: "8:00 PM", supplements: [] }
    ]
  )
  const [searchQuery, setSearchQuery] = useState("")

  const handleOnDragEnd = (result: any) => {
    if (!result.destination) return

    const { source, destination } = result

    // TODO: Implement drag and drop logic
    console.log("Drag from", source, "to", destination)
  }

  const addTimeBlock = () => {
    const newBlock: TimeBlock = {
      id: `block-${Date.now()}`,
      name: "New Block",
      time: "12:00 PM",
      supplements: []
    }
    setTimeBlocks([...timeBlocks, newBlock])
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Supplement Search</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search supplements to add..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">Browse Categories</Button>
          </div>
        </CardContent>
      </Card>

      <DragDropContext onDragEnd={handleOnDragEnd}>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {timeBlocks.map((block) => (
            <Card key={block.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{block.name}</CardTitle>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    {block.time}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Droppable droppableId={block.id}>
                  {(provided) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className="min-h-[200px] space-y-2"
                    >
                      {block.supplements.map((supplement, index) => (
                        <Draggable
                          key={supplement.id}
                          draggableId={supplement.id}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="p-3 border rounded-lg bg-white shadow-sm"
                            >
                              <div className="font-medium">{supplement.name}</div>
                              <div className="text-sm text-muted-foreground">
                                {supplement.dose} • {supplement.form}
                              </div>
                              {supplement.notes && (
                                <div className="text-xs text-muted-foreground mt-1">
                                  {supplement.notes}
                                </div>
                              )}
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}

                      {block.supplements.length === 0 && (
                        <div className="text-center py-8 text-muted-foreground border-2 border-dashed rounded-lg">
                          <p>Drop supplements here</p>
                          <p className="text-sm">or click + to add</p>
                        </div>
                      )}
                    </div>
                  )}
                </Droppable>

                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full mt-2"
                  onClick={() => {
                    // TODO: Add supplement to this time block
                    console.log("Add supplement to", block.id)
                  }}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Supplement
                </Button>
              </CardContent>
            </Card>
          ))}

          <Card className="border-dashed">
            <CardContent className="flex items-center justify-center h-full min-h-[250px]">
              <Button variant="ghost" onClick={addTimeBlock}>
                <Plus className="h-4 w-4 mr-2" />
                Add Time Block
              </Button>
            </CardContent>
          </Card>
        </div>
      </DragDropContext>

      <div className="flex justify-between">
        <Button variant="outline">Save as Template</Button>
        <div className="flex gap-2">
          <Button variant="outline">Preview Schedule</Button>
          <Button>Save Stack</Button>
        </div>
      </div>
    </div>
  )
}