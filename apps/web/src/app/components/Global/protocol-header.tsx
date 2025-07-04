"use client"

import { useState } from "react"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { Badge } from "../ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Edit2, Check, X } from "lucide-react"
import type { ProtocolData } from "./stack-lab-builder"

interface ProtocolHeaderProps {
  protocol: ProtocolData
  updateProtocol: (updates: Partial<ProtocolData>) => void
}

export function ProtocolHeader({ protocol, updateProtocol }: ProtocolHeaderProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editName, setEditName] = useState(protocol.name)
  const [editGoal, setEditGoal] = useState(protocol.goal)

  const handleSave = () => {
    updateProtocol({
      name: editName,
      goal: editGoal,
    })
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditName(protocol.name)
    setEditGoal(protocol.goal)
    setIsEditing(false)
  }

  const goals = [
    "Focus & Cognitive Enhancement",
    "Sleep Optimization",
    "Energy & Performance",
    "Muscle Recovery",
    "Stress & Mood Support",
    "Immune System Support",
    "Heart Health",
    "General Wellness",
  ]

  if (isEditing) {
    return (
      <div className="flex flex-col space-y-3">
        <div className="flex items-center space-x-4">
          <Input
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            className="w-64 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100"
            placeholder="Protocol name..."
          />
          <Select value={editGoal} onValueChange={setEditGoal}>
            <SelectTrigger className="w-48 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100">
              <SelectValue placeholder="Select goal..." />
            </SelectTrigger>
            <SelectContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              {goals.map((goal) => (
                <SelectItem
                  key={goal}
                  value={goal}
                  className="text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  {goal}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button size="sm" onClick={handleSave}>
            <Check className="w-4 h-4" />
          </Button>
          <Button size="sm" variant="outline" onClick={handleCancel}>
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col space-y-3">
      <div className="flex items-center space-x-4">
        <div>
          <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{protocol.name}</h1>
          {protocol.goal && (
            <Badge variant="outline" className="mt-1">
              {protocol.goal}
            </Badge>
          )}
        </div>
        <Button size="sm" variant="ghost" onClick={() => setIsEditing(true)}>
          <Edit2 className="w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}
