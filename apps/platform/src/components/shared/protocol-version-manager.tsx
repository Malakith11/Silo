"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog"
import { Button } from "../ui/button"
import { Badge } from "../ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"
import { ScrollArea } from "../ui/scroll-area"
import { History, Save, RotateCcw, Clock, User, GitBranch, Calendar, ArrowRight, Check, X } from "lucide-react"
import type { ProtocolData } from "./stack-lab-builder"

export interface ProtocolVersion {
  id: string
  name: string
  description: string
  protocol: ProtocolData
  timestamp: Date
  changeType: "manual" | "auto" | "major"
  changes: string[]
  author: string
}

interface ProtocolVersionManagerProps {
  protocol: ProtocolData
  open: boolean
  onOpenChange: (open: boolean) => void
  onRevertToVersion: (version: ProtocolVersion) => void
  versions: ProtocolVersion[]
  onSaveVersion: (name: string, description: string, changeType: "manual" | "major") => void
}

export function ProtocolVersionManager({
  protocol,
  open,
  onOpenChange,
  onRevertToVersion,
  versions,
  onSaveVersion,
}: ProtocolVersionManagerProps) {
  const [selectedVersion, setSelectedVersion] = useState<ProtocolVersion | null>(null)
  const [showSaveDialog, setShowSaveDialog] = useState(false)
  const [saveName, setSaveName] = useState("")
  const [saveDescription, setSaveDescription] = useState("")

  const handleSaveVersion = () => {
    if (!saveName.trim()) return

    onSaveVersion(saveName, saveDescription, "manual")
    setSaveName("")
    setSaveDescription("")
    setShowSaveDialog(false)
  }

  const handleRevert = (version: ProtocolVersion) => {
    onRevertToVersion(version)
    onOpenChange(false)
  }

  const getChangeTypeColor = (changeType: string) => {
    switch (changeType) {
      case "manual":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
      case "major":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200"
      case "auto":
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
    }
  }

  const getChangeTypeIcon = (changeType: string) => {
    switch (changeType) {
      case "manual":
        return <Save className="w-3 h-3" />
      case "major":
        return <GitBranch className="w-3 h-3" />
      case "auto":
        return <Clock className="w-3 h-3" />
      default:
        return <Clock className="w-3 h-3" />
    }
  }

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date()
    const diff = now.getTime() - timestamp.getTime()
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(diff / 3600000)
    const days = Math.floor(diff / 86400000)

    if (minutes < 1) return "Just now"
    if (minutes < 60) return `${minutes}m ago`
    if (hours < 24) return `${hours}h ago`
    if (days < 7) return `${days}d ago`
    return timestamp.toLocaleDateString()
  }

  const compareProtocols = (current: ProtocolData, previous: ProtocolData) => {
    const changes: string[] = []

    // Compare supplements count
    const currentSupps = current.timeSlots.reduce((acc, slot) => acc + slot.supplements.length, 0)
    const previousSupps = previous.timeSlots.reduce((acc, slot) => acc + slot.supplements.length, 0)

    if (currentSupps !== previousSupps) {
      const diff = currentSupps - previousSupps
      changes.push(`${diff > 0 ? "+" : ""}${diff} supplements`)
    }

    // Compare cost
    const costDiff = current.totalCost - previous.totalCost
    if (Math.abs(costDiff) > 0.01) {
      changes.push(`${costDiff > 0 ? "+" : ""}$${Math.abs(costDiff).toFixed(2)} cost`)
    }

    // Compare time slots
    if (current.timeSlots.length !== previous.timeSlots.length) {
      const diff = current.timeSlots.length - previous.timeSlots.length
      changes.push(`${diff > 0 ? "+" : ""}${diff} time slots`)
    }

    return changes
  }

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-4xl max-h-[80vh] bg-white dark:bg-gray-800">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <History className="w-5 h-5" />
              <span>Protocol Version History</span>
              <Badge variant="outline" className="ml-2">
                {versions.length} versions
              </Badge>
            </DialogTitle>
          </DialogHeader>

          <div className="flex space-x-6 h-[60vh]">
            {/* Version List */}
            <div className="w-1/2 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">Version History</h3>
                <Button size="sm" onClick={() => setShowSaveDialog(true)}>
                  <Save className="w-4 h-4 mr-2" />
                  Save Current
                </Button>
              </div>

              <ScrollArea className="h-full">
                <div className="space-y-3">
                  {/* Current Version */}
                  <Card className="border-2 border-blue-200 dark:border-blue-700 bg-blue-50 dark:bg-blue-900/20">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <Badge className="bg-blue-600 text-white">
                            <Clock className="w-3 h-3 mr-1" />
                            Current
                          </Badge>
                          <span className="font-medium">{protocol.name}</span>
                        </div>
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                        {protocol.timeSlots.reduce((acc, slot) => acc + slot.supplements.length, 0)} supplements • $
                        {protocol.totalCost.toFixed(2)}/month
                      </div>
                      <div className="text-xs text-gray-500">Working version - unsaved changes</div>
                    </CardContent>
                  </Card>

                  {/* Previous Versions */}
                  {versions.map((version, index) => {
                    const isSelected = selectedVersion?.id === version.id
                    const changes =
                      index < versions.length - 1
                        ? compareProtocols(version.protocol, versions[index + 1].protocol)
                        : []

                    return (
                      <Card
                        key={version.id}
                        className={`cursor-pointer transition-all ${
                          isSelected
                            ? "border-2 border-blue-200 dark:border-blue-700 bg-blue-50 dark:bg-blue-900/20"
                            : "hover:border-gray-300 dark:hover:border-gray-600"
                        }`}
                        onClick={() => setSelectedVersion(version)}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-2">
                              <Badge className={getChangeTypeColor(version.changeType)}>
                                {getChangeTypeIcon(version.changeType)}
                                <span className="ml-1 capitalize">{version.changeType}</span>
                              </Badge>
                              <span className="font-medium">{version.name}</span>
                            </div>
                            <span className="text-xs text-gray-500">{formatTimestamp(version.timestamp)}</span>
                          </div>

                          {version.description && (
                            <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{version.description}</p>
                          )}

                          <div className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                            {version.protocol.timeSlots.reduce((acc, slot) => acc + slot.supplements.length, 0)}{" "}
                            supplements • ${version.protocol.totalCost.toFixed(2)}/month
                          </div>

                          {changes.length > 0 && (
                            <div className="flex flex-wrap gap-1">
                              {changes.map((change, i) => (
                                <Badge key={i} variant="outline" className="text-xs">
                                  {change}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              </ScrollArea>
            </div>

            {/* Version Details */}
            <div className="w-1/2 space-y-4">
              <h3 className="font-medium">Version Details</h3>

              {selectedVersion ? (
                <div className="space-y-4">
                  <Card>
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{selectedVersion.name}</CardTitle>
                        <Badge className={getChangeTypeColor(selectedVersion.changeType)}>
                          {getChangeTypeIcon(selectedVersion.changeType)}
                          <span className="ml-1 capitalize">{selectedVersion.changeType}</span>
                        </Badge>
                      </div>
                      {selectedVersion.description && (
                        <p className="text-sm text-gray-600 dark:text-gray-300">{selectedVersion.description}</p>
                      )}
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <div className="text-sm text-gray-500">Supplements</div>
                          <div className="font-medium">
                            {selectedVersion.protocol.timeSlots.reduce((acc, slot) => acc + slot.supplements.length, 0)}
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">Monthly Cost</div>
                          <div className="font-medium">${selectedVersion.protocol.totalCost.toFixed(2)}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">Time Slots</div>
                          <div className="font-medium">{selectedVersion.protocol.timeSlots.length}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">Complexity</div>
                          <div className="font-medium">{selectedVersion.protocol.complexity}</div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4" />
                          <span>{selectedVersion.timestamp.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <User className="w-4 h-4" />
                          <span>{selectedVersion.author}</span>
                        </div>
                      </div>

                      {selectedVersion.changes.length > 0 && (
                        <div>
                          <div className="text-sm font-medium mb-2">Changes Made:</div>
                          <div className="space-y-1">
                            {selectedVersion.changes.map((change, i) => (
                              <div key={i} className="flex items-center space-x-2 text-sm">
                                <ArrowRight className="w-3 h-3 text-gray-400" />
                                <span>{change}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  <div className="flex space-x-2">
                    <Button onClick={() => handleRevert(selectedVersion)} className="flex-1">
                      <RotateCcw className="w-4 h-4 mr-2" />
                      Revert to This Version
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-64 text-gray-500 dark:text-gray-400">
                  <History className="w-12 h-12 mb-4 opacity-50" />
                  <p>Select a version to view details</p>
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Save Version Dialog */}
      <Dialog open={showSaveDialog} onOpenChange={setShowSaveDialog}>
        <DialogContent className="max-w-md bg-white dark:bg-gray-800">
          <DialogHeader>
            <DialogTitle>Save Current Version</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Version Name</label>
              <Input
                value={saveName}
                onChange={(e) => setSaveName(e.target.value)}
                placeholder="e.g., Focus Stack v2.1"
                className="bg-white dark:bg-gray-800"
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Description (Optional)</label>
              <Textarea
                value={saveDescription}
                onChange={(e) => setSaveDescription(e.target.value)}
                placeholder="Describe what changed in this version..."
                className="bg-white dark:bg-gray-800"
                rows={3}
              />
            </div>

            <div className="flex space-x-2">
              <Button onClick={handleSaveVersion} disabled={!saveName.trim()} className="flex-1">
                <Check className="w-4 h-4 mr-2" />
                Save Version
              </Button>
              <Button variant="outline" onClick={() => setShowSaveDialog(false)}>
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
