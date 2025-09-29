"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { Badge } from "../ui/badge"
import { Progress } from "../ui/progress"
import {
  X,
  Clock,
  AlertTriangle,
  CheckCircle,
  Sun,
  Fish,
  Zap,
  Leaf,
  Dumbbell,
  Moon,
  Heart,
  Brain,
  Shield,
  Flame,
  Edit2,
  Trash2,
  Plus,
  Info,
} from "lucide-react"
import type { ProtocolData, Supplement, TimeSlot } from "./stack-lab-builder"

interface ProtocolCanvasProps {
  protocol: ProtocolData
  addSupplementToSlot: (supplement: Supplement, slotId: string) => void
  removeSupplementFromSlot: (supplementId: string, slotId: string) => void
  removeTimeSlot: (slotId: string) => void
  updateTimeSlot: (slotId: string, updates: Partial<TimeSlot>) => void
  addTimeSlot: () => void
}

const getSupplementIcon = (iconName: string) => {
  const icons = {
    Sun,
    Fish,
    Zap,
    Leaf,
    Dumbbell,
    Moon,
    Heart,
    Brain,
    Shield,
    Flame,
  }
  const IconComponent = icons[iconName as keyof typeof icons] || Zap
  return IconComponent
}

interface TimeSlotEditorProps {
  slot: TimeSlot
  onUpdate: (updates: Partial<TimeSlot>) => void
  onRemove: () => void
  canRemove: boolean
}

function TimeSlotEditor({ slot, onUpdate, onRemove, canRemove }: TimeSlotEditorProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editTime, setEditTime] = useState(slot.time)

  const handleSave = () => {
    onUpdate({ time: editTime })
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditTime(slot.time)
    setIsEditing(false)
  }

  const timePresets = [
    "Morning (7:00 AM)",
    "Mid-Morning (10:00 AM)",
    "Lunch (12:00 PM)",
    "Afternoon (3:00 PM)",
    "Pre-Workout (5:00 PM)",
    "Evening (6:00 PM)",
    "Dinner (7:00 PM)",
    "Night (10:00 PM)",
    "Before Bed (11:00 PM)",
  ]

  if (isEditing) {
    return (
      <div className="flex items-center space-x-2 mb-3">
        <select
          value={editTime}
          onChange={(e) => setEditTime(e.target.value)}
          className="flex-1 p-2 border border-gray-200 rounded text-sm"
          aria-label="Select time slot"
        >
          {timePresets.map((preset) => (
            <option key={preset} value={preset}>
              {preset}
            </option>
          ))}
          <option value={editTime}>{editTime}</option>
        </select>
        <Button size="sm" onClick={handleSave} className="h-8">
          <CheckCircle className="w-4 h-4" />
        </Button>
        <Button size="sm" variant="outline" onClick={handleCancel} className="h-8">
          <X className="w-4 h-4" />
        </Button>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-between mb-3">
      <div className="flex items-center space-x-2">
        <h3 className="text-lg font-semibold">{slot.time}</h3>
        <Button variant="ghost" size="sm" onClick={() => setIsEditing(true)} className="h-6 w-6 p-0 hover:bg-gray-100">
          <Edit2 className="w-3 h-3" />
        </Button>
      </div>
      {canRemove && (
        <Button variant="ghost" size="sm" onClick={onRemove} className="h-6 w-6 p-0 hover:bg-red-100 text-red-600">
          <Trash2 className="w-3 h-3" />
        </Button>
      )}
    </div>
  )
}

export function ProtocolCanvas({
  protocol,
  addSupplementToSlot,
  removeSupplementFromSlot,
  removeTimeSlot,
  updateTimeSlot,
  addTimeSlot,
}: ProtocolCanvasProps) {
  // State to track which slot is being dragged over
  const [dragOverSlot, setDragOverSlot] = useState<string | null>(null);

  // Handler for allowing drop on the time slot
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>, slotId: string) => {
    e.preventDefault();
    setDragOverSlot(slotId);
  };

  // Handler for drag leave event
  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    setDragOverSlot(null);
  };

  // Handler for drop event on a time slot
  const handleDrop = (e: React.DragEvent<HTMLDivElement>, slotId: string) => {
    e.preventDefault();
    setDragOverSlot(null);
    try {
      const dataString = e.dataTransfer.getData("application/json");
      const data = JSON.parse(dataString);
      // Check for multiple supplement drop
      if (data.type === "multiple" && Array.isArray(data.supplements)) {
        data.supplements.forEach((supplement: any) => {
          addSupplementToSlot(supplement, slotId);
        });
      } else {
        // Single supplement drop
        addSupplementToSlot(data, slotId);
      }
      console.log("Dropped supplements into slot:", slotId);
    } catch (error) {
      console.error("Error parsing dropped supplement data:", error);
    }
  };

  const getSlotStatus = (slot: TimeSlot) => {
    if (slot.supplements.length === 0) return "empty"
    if (slot.supplements.length <= 2) return "optimal"
    if (slot.supplements.length <= 4) return "moderate"
    return "complex"
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "empty":
        return "border-gray-200 bg-gray-50"
      case "optimal":
        return "border-green-200 bg-green-50"
      case "moderate":
        return "border-yellow-200 bg-yellow-50"
      case "complex":
        return "border-red-200 bg-red-50"
      default:
        return "border-gray-200 bg-gray-50"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "optimal":
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case "moderate":
        return <AlertTriangle className="w-4 h-4 text-yellow-600" />
      case "complex":
        return <AlertTriangle className="w-4 h-4 text-red-600" />
      default:
        return <Clock className="w-4 h-4 text-gray-400" />
    }
  }

  const getSlotEfficacyScore = (slot: TimeSlot) => {
    if (slot.supplements.length === 0) return 0

    // Safely map efficacy scores with fallbacks for missing data
    const scores = slot.supplements.map((s) => s.research?.efficacyScore ?? 0)

    // Avoid division by zero if there are no valid scores
    if (scores.length === 0) return 0

    return Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
  }

  return (
    <div className="space-y-6">
      {/* Protocol Overview */}
      <Card className="border-2 border-gray-200 dark:border-gray-700 shadow-sm bg-white dark:bg-gray-800">
        <CardHeader className="pb-3 pt-4 bg-white dark:bg-gray-800">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center space-x-2">
              <Clock className="w-5 h-5 text-blue-600" />
              <span>Protocol Timeline</span>
            </CardTitle>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center space-x-2">
                  <span className="text-gray-600 dark:text-gray-300">Total Cost:</span>
                  <Badge variant="outline" className="text-base font-semibold">
                    ${protocol.totalCost.toFixed(2)}/month
                  </Badge>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-gray-600 dark:text-gray-300">Supplements:</span>
                  <Badge variant="outline" className="text-base font-semibold">
                    {protocol.timeSlots.reduce((total, slot) => total + slot.supplements.length, 0)}
                  </Badge>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" onClick={addTimeSlot} className="h-9">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Time Slot
                </Button>
                <Badge variant="outline" className="text-sm">
                  {protocol.timeSlots.length} slots
                </Badge>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0 pb-4">
          <div
            className={`grid gap-4 ${
              protocol.timeSlots.length <= 4
                ? `grid-cols-${protocol.timeSlots.length}`
                : protocol.timeSlots.length <= 6
                  ? "grid-cols-3 lg:grid-cols-6"
                  : "grid-cols-4 lg:grid-cols-8"
            }`}
          >
            {protocol.timeSlots.map((slot) => {
              const status = getSlotStatus(slot)
              const totalSupplements = slot.supplements.length
              const slotCost = slot.supplements.reduce((sum, supp) => sum + supp.price, 0)
              const efficacyScore = getSlotEfficacyScore(slot)

              return (
                <div key={slot.id} className="text-center">
                  <div className="text-sm font-medium mb-1">{slot.time.split(" ")[0]}</div>
                  <div className="text-xs text-gray-600 mb-2">{slot.time.split(" ").slice(1).join(" ")}</div>
                  <div className="flex items-center justify-center space-x-1 mb-1">
                    {getStatusIcon(status)}
                    <span className="text-xs">{totalSupplements} supplements</span>
                  </div>
                  <div className="text-xs text-gray-600 mb-1">${slotCost.toFixed(2)}/mo</div>
                  {efficacyScore > 0 && (
                    <div className="flex items-center justify-center space-x-1">
                      <Progress value={efficacyScore} className="w-12 h-1" />
                      <span className="text-xs text-green-600">{efficacyScore}%</span>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Time Slots */}
      <div
        className={`grid gap-6 ${
          protocol.timeSlots.length === 1
            ? "grid-cols-1 max-w-2xl mx-auto"
            : protocol.timeSlots.length === 2
              ? "grid-cols-1 lg:grid-cols-2"
              : protocol.timeSlots.length === 3
                ? "grid-cols-1 lg:grid-cols-3"
                : protocol.timeSlots.length === 4
                  ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
                  : protocol.timeSlots.length <= 6
                    ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                    : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        }`}
      >
        {protocol.timeSlots.map((slot) => {
          const status = getSlotStatus(slot)
          const isDragOver = dragOverSlot === slot.id
          const efficacyScore = getSlotEfficacyScore(slot)

          return (
            <Card
              key={slot.id}
              className={`min-h-[400px] transition-all duration-300 ${getStatusColor(status)} ${
                isDragOver
                  ? "ring-4 ring-blue-400 ring-opacity-75 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 scale-[1.02] shadow-2xl border-blue-400 transform"
                  : ""
              } shadow-sm bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 relative overflow-hidden`}
              onDragOver={(e) => handleDragOver(e, slot.id)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, slot.id)}
            >
              <CardHeader className="pb-4">
                <TimeSlotEditor
                  slot={slot}
                  onUpdate={(updates) => updateTimeSlot(slot.id, updates)}
                  onRemove={() => removeTimeSlot(slot.id)}
                  canRemove={protocol.timeSlots.length > 1}
                />
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(status)}
                    <Badge variant="outline" className="text-xs">
                      {slot.supplements.length} supplements
                    </Badge>
                    {efficacyScore > 0 && (
                      <Badge variant="secondary" className="text-xs">
                        {efficacyScore}% efficacy
                      </Badge>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {slot.supplements.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-48 text-gray-500 dark:text-gray-400 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50/50 dark:bg-gray-700/50">
                    <Clock className="w-8 h-8 mb-2 opacity-50" />
                    <p className="text-sm">Drag supplements here</p>
                    <p className="text-xs opacity-75">or click + to add</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {slot.supplements.map((supplement, index) => {
                      const IconComponent = getSupplementIcon(supplement.icon)
                      // Removed droppedSupplements animation logic for now

                      return (
                        <Card
                          key={supplement.id}
                          className={`${supplement.color} border-2 shadow-sm bg-white dark:bg-gray-800 transition-all duration-500`}
                          style={{
                            animationDelay: `${index * 100}ms`,
                            animationFillMode: "both",
                          }}
                        >
                          <CardContent className="p-3">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center justify-between mb-2">
                                  <div className="flex items-center space-x-2">
                                    <div className="p-1 bg-white/50 rounded">
                                      <IconComponent className="w-4 h-4" />
                                    </div>
                                    <h4 className="font-medium text-sm">{supplement.name}</h4>
                                  </div>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-6 w-6 p-0 hover:bg-red-100"
                                    onClick={() => removeSupplementFromSlot(supplement.id, slot.id)}
                                  >
                                    <X className="w-3 h-3" />
                                  </Button>
                                </div>

                                <div className="grid grid-cols-2 gap-2 mb-2">
                                  <div className="text-xs">
                                    <span className="text-gray-600">Dosage:</span>
                                    <div className="font-medium">{supplement.dosage}</div>
                                  </div>
                                  <div className="text-xs">
                                    <span className="text-gray-600">Cost:</span>
                                    <div className="font-medium">${supplement.price}/mo</div>
                                  </div>
                                </div>

                                {/* Research Score */}
                                <div className="bg-white/50 dark:bg-gray-700/50 rounded p-2 mb-2">
                                  <div className="flex items-center justify-between mb-1">
                                    <span className="text-xs font-medium text-blue-600">Research Score</span>
                                    <Badge variant="secondary" className="text-xs">
                                      {supplement.research.evidenceLevel}
                                    </Badge>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <Progress value={supplement.research.efficacyScore} className="flex-1 h-1" />
                                    <span className="text-xs font-medium">{supplement.research.efficacyScore}%</span>
                                  </div>
                                </div>

                                <div className="flex items-center justify-between">
                                  <div className="flex flex-wrap gap-1">
                                    {supplement.benefits.slice(0, 2).map((benefit) => (
                                      <Badge key={benefit} variant="secondary" className="text-xs">
                                        {benefit}
                                      </Badge>
                                    ))}
                                    {supplement.benefits.length > 2 && (
                                      <Badge variant="secondary" className="text-xs">
                                        +{supplement.benefits.length - 2}
                                      </Badge>
                                    )}
                                  </div>

                                  <Button variant="ghost" size="sm" className="h-6 p-0 px-1">
                                    <Info className="w-3 h-3" />
                                  </Button>
                                </div>

                                {(supplement.warnings.length > 0 || supplement.interactions.length > 0) && (
                                  <div className="mt-2 pt-2 border-t border-gray-200/50">
                                    {supplement.warnings.length > 0 && (
                                      <div className="flex items-center space-x-1 text-xs text-amber-600">
                                        <AlertTriangle className="w-3 h-3 flex-shrink-0" />
                                        <span className="truncate">{supplement.warnings[0]}</span>
                                      </div>
                                    )}

                                    {supplement.interactions.length > 0 && (
                                      <div className="flex items-center space-x-1 text-xs text-red-600">
                                        <AlertTriangle className="w-3 h-3 flex-shrink-0" />
                                        <span className="truncate">Interacts with: {supplement.interactions[0]}</span>
                                      </div>
                                    )}
                                  </div>
                                )}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      )
                    })}
                  </div>
                )}
              </CardContent>
              {isDragOver && (
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 flex items-center justify-center pointer-events-none z-10">
                  <div className="bg-blue-600 text-white px-6 py-3 rounded-xl shadow-2xl animate-pulse border-2 border-blue-400">
                    <div className="flex items-center space-x-3">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                        <div
                          className="w-2 h-2 bg-white rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-white rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                      </div>
                      <span className="font-semibold">Drop supplements here</span>
                      <div className="flex space-x-1">
                        <div
                          className="w-2 h-2 bg-white rounded-full animate-bounce"
                          style={{ animationDelay: "0.3s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-white rounded-full animate-bounce"
                          style={{ animationDelay: "0.4s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-white rounded-full animate-bounce"
                          style={{ animationDelay: "0.5s" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </Card>
          )
        })}
      </div>
      <style jsx>{`
        @keyframes slideInFromTop {
          from {
            opacity: 0;
            transform: translateY(-20px) scale(0.9);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        .animate-in {
          animation: slideInFromTop 0.4s ease-out;
        }

        @keyframes zoomIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .zoom-in-95 {
          animation: zoomIn 0.3s ease-out;
        }
        
        .drag-over-glow {
          box-shadow: 0 0 30px rgba(59, 130, 246, 0.5);
        }
      `}</style>
    </div>
  )
}
