"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "../ui/button"
import { Separator } from "../ui/separator"
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs"
import { SupplementSidebar } from "../Global/supplement-sidebar"
import { ProtocolCanvas } from "../Global/protocol-canvas"
import { AIAssistant } from "../Global/ai-assistant"
import { SiloAssessment } from "../Global/silo-assessment"
import { ProtocolOptimizer } from "../Global/protocol-optimizer"
import { SupplementAudit } from "../Global/supplement-audit"
import { SupplementPurchase } from "../Global/supplement-purchase"
import { StackCompass } from "../Global/stack-compass"
import { ProtocolVersionManager, type ProtocolVersion } from "../Global/protocol-version-manager"
import {
  ArrowLeft,
  Save,
  Download,
  Share2,
  Shield,
  ShoppingCart,
  Layers,
  Compass,
  Settings,
  History,
  PanelLeftOpen,
  PanelLeftClose,
  PanelRightOpen,
  PanelRightClose,
  Pin,
  PinOff,
  Zap,
  Target,
  DollarSign,
  Clock,
  Sparkles,
} from "lucide-react"
import Link from "next/link"

export interface SupplementResearch {
  studyCount: number
  recentStudies: number
  lastUpdated: string
  outcome: "Positive" | "Neutral" | "Negative"
  efficacyScore: number
  safetyScore: number
  evidenceLevel: "Very Strong" | "Strong" | "Moderate" | "Limited"
  goalRelevance: Record<string, number>
  sources: Array<{
    title: string
    journal: string
    year: number
    type: string
    participants: number | null
    url: string
  }>
  scorecard: {
    absorption: number
    bioavailability: number
    stability: number
    purity: number
    costEffectiveness: number
    researchQuality: number
  }
}

export interface Supplement {
  id: string
  name: string
  category: string
  dosage: string
  timing: string[]
  price: number
  interactions: string[]
  benefits: string[]
  warnings: string[]
  color: string
  icon: string
  research: SupplementResearch
}

export interface TimeSlot {
  id: string
  time: string
  supplements: Supplement[]
}

export interface ProtocolData {
  name: string
  description: string
  goal: string
  budget: number
  timeSlots: TimeSlot[]
  totalCost: number
  complexity: "Novice" | "Enthusiast" | "Expert"
}

export interface ProtocolCanvasProps {
  protocol: ProtocolData
  addSupplementToSlot: (supplement: Supplement, slotId: string, customDosage?: string) => void
  removeSupplementFromSlot: (supplementId: string, slotId: string) => void
  removeTimeSlot: (slotId: string) => void
  updateTimeSlot: (slotId: string, updates: Partial<TimeSlot>) => void
  addTimeSlot: () => void
  dragOverSlot: string | null
  setDragOverSlot: React.Dispatch<React.SetStateAction<string | null>>
}

export function StackLabBuilder() {
  const [activeView, setActiveView] = useState<"builder" | "compass">("builder")
  const [activeTab, setActiveTab] = useState("build")
  const [protocol, setProtocol] = useState<ProtocolData>({
    name: "My Custom Protocol",
    description: "",
    goal: "",
    budget: 100,
    timeSlots: [
      { id: "morning", time: "Morning (7:00 AM)", supplements: [] },
      { id: "evening", time: "Evening (6:00 PM)", supplements: [] },
    ],
    totalCost: 0,
    complexity: "Novice",
  })

  const [selectedGoals, setSelectedGoals] = useState<string[]>([])
  const [budgetRange, setBudgetRange] = useState<[number, number]>([0, 200])
  const [optimizerOpen, setOptimizerOpen] = useState(false)
  const [auditOpen, setAuditOpen] = useState(false)
  const [purchaseOpen, setPurchaseOpen] = useState(false)
  const [versionManagerOpen, setVersionManagerOpen] = useState(false)
  const [dragOverSlot, setDragOverSlot] = useState<string | null>(null)

  // Sidebar states
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(true)
  const [rightSidebarOpen, setRightSidebarOpen] = useState(true)
  const [leftSidebarPinned, setLeftSidebarPinned] = useState(true)
  const [rightSidebarPinned, setRightSidebarPinned] = useState(true)

  // Version management
  const [versions, setVersions] = useState<ProtocolVersion[]>([])
  const [lastSavedProtocol, setLastSavedProtocol] = useState<ProtocolData | null>(null)

  // Auto-save major changes
  useEffect(() => {
    if (!lastSavedProtocol) {
      setLastSavedProtocol(protocol)
      return
    }

    const currentSupps = protocol.timeSlots.reduce((acc, slot) => acc + slot.supplements.length, 0)
    const lastSupps = lastSavedProtocol.timeSlots.reduce((acc, slot) => acc + slot.supplements.length, 0)
    const suppDiff = Math.abs(currentSupps - lastSupps)
    const costDiff = Math.abs(protocol.totalCost - lastSavedProtocol.totalCost)
    const slotDiff = Math.abs(protocol.timeSlots.length - lastSavedProtocol.timeSlots.length)

    if (suppDiff >= 2 || costDiff >= 25 || slotDiff >= 1) {
      const changes: string[] = []
      if (suppDiff > 0)
        changes.push(
          `${currentSupps > lastSupps ? "Added" : "Removed"} ${suppDiff} supplement${suppDiff > 1 ? "s" : ""}`,
        )
      if (costDiff > 0)
        changes.push(
          `Cost ${protocol.totalCost > lastSavedProtocol.totalCost ? "increased" : "decreased"} by $${costDiff.toFixed(2)}`,
        )
      if (slotDiff > 0)
        changes.push(
          `${protocol.timeSlots.length > lastSavedProtocol.timeSlots.length ? "Added" : "Removed"} ${slotDiff} time slot${slotDiff > 1 ? "s" : ""}`,
        )

      const autoVersion: ProtocolVersion = {
        id: `auto-${Date.now()}`,
        name: `Auto-save ${new Date().toLocaleTimeString()}`,
        description: "Automatic save due to major changes",
        protocol: { ...lastSavedProtocol },
        timestamp: new Date(),
        changeType: "auto",
        changes,
        author: "System",
      }

      setVersions((prev) => [autoVersion, ...prev])
      setLastSavedProtocol(protocol)
    }
  }, [protocol, lastSavedProtocol])

  const updateProtocol = (updates: Partial<ProtocolData>) => {
    setProtocol((prev) => ({ ...prev, ...updates }))
  }

  const addSupplementToSlot = (supplement: Supplement, slotId: string, customDosage?: string) => {
    const supplementToAdd = customDosage ? { ...supplement, dosage: customDosage } : supplement

    const newTimeSlots = protocol.timeSlots.map((slot) => {
      if (slot.id === slotId) {
        return {
          ...slot,
          supplements: [...slot.supplements, { ...supplementToAdd, id: `${supplement.id}-${Date.now()}` }],
        }
      }
      return slot
    })

    const newTotalCost = newTimeSlots.reduce(
      (total, slot) => total + slot.supplements.reduce((slotTotal, supp) => slotTotal + supp.price, 0),
      0,
    )

    updateProtocol({
      timeSlots: newTimeSlots,
      totalCost: newTotalCost,
      complexity: newTotalCost > 150 ? "Expert" : newTotalCost > 75 ? "Enthusiast" : "Novice",
    })
  }

  const addMultipleSupplementsToSlot = (supplements: Supplement[], slotId: string) => {
    const newTimeSlots = protocol.timeSlots.map((slot) => {
      if (slot.id === slotId) {
        const newSupplements = supplements.map((supp) => ({ ...supp, id: `${supp.id}-${Date.now()}-${Math.random()}` }))
        return {
          ...slot,
          supplements: [...slot.supplements, ...newSupplements],
        }
      }
      return slot
    })

    const newTotalCost = newTimeSlots.reduce(
      (total, slot) => total + slot.supplements.reduce((slotTotal, supp) => slotTotal + supp.price, 0),
      0,
    )

    updateProtocol({
      timeSlots: newTimeSlots,
      totalCost: newTotalCost,
      complexity: newTotalCost > 150 ? "Expert" : newTotalCost > 75 ? "Enthusiast" : "Novice",
    })
  }

  const addSupplementToProtocol = (supplement: Supplement, customDosage?: string) => {
    const preferredSlot = protocol.timeSlots.find((slot) =>
      supplement.timing.some((timing) => slot.time.toLowerCase().includes(timing.toLowerCase())),
    )

    const targetSlot = preferredSlot || protocol.timeSlots[0]
    addSupplementToSlot(supplement, targetSlot.id, customDosage)
  }

  const removeSupplementFromSlot = (supplementId: string, slotId: string) => {
    const newTimeSlots = protocol.timeSlots.map((slot) => {
      if (slot.id === slotId) {
        return {
          ...slot,
          supplements: slot.supplements.filter((supp) => supp.id !== supplementId),
        }
      }
      return slot
    })

    const newTotalCost = newTimeSlots.reduce(
      (total, slot) => total + slot.supplements.reduce((slotTotal, supp) => slotTotal + supp.price, 0),
      0,
    )

    updateProtocol({
      timeSlots: newTimeSlots,
      totalCost: newTotalCost,
      complexity: newTotalCost > 150 ? "Expert" : newTotalCost > 75 ? "Enthusiast" : "Novice",
    })
  }

  const addTimeSlot = () => {
    const newSlot: TimeSlot = {
      id: `slot-${Date.now()}`,
      time: "Custom Time",
      supplements: [],
    }

    updateProtocol({
      timeSlots: [...protocol.timeSlots, newSlot],
    })
  }

  const removeTimeSlot = (slotId: string) => {
    if (protocol.timeSlots.length <= 1) return

    const newTimeSlots = protocol.timeSlots.filter((slot) => slot.id !== slotId)
    const newTotalCost = newTimeSlots.reduce(
      (total, slot) => total + slot.supplements.reduce((slotTotal, supp) => slotTotal + supp.price, 0),
      0,
    )

    updateProtocol({
      timeSlots: newTimeSlots,
      totalCost: newTotalCost,
      complexity: newTotalCost > 150 ? "Expert" : newTotalCost > 75 ? "Enthusiast" : "Novice",
    })
  }

  const updateTimeSlot = (slotId: string, updates: Partial<TimeSlot>) => {
    const newTimeSlots = protocol.timeSlots.map((slot) => (slot.id === slotId ? { ...slot, ...updates } : slot))

    updateProtocol({
      timeSlots: newTimeSlots,
    })
  }

  const handleApplyOptimization = (optimizedProtocol: ProtocolData) => {
    const optimizationVersion: ProtocolVersion = {
      id: `pre-opt-${Date.now()}`,
      name: "Before Optimization",
      description: "Saved before applying optimization",
      protocol: { ...protocol },
      timestamp: new Date(),
      changeType: "major",
      changes: ["Pre-optimization snapshot"],
      author: "User",
    }

    setVersions((prev) => [optimizationVersion, ...prev])
    setProtocol(optimizedProtocol)
    setLastSavedProtocol(optimizedProtocol)
  }

  const handleSaveVersion = (name: string, description: string, changeType: "manual" | "major") => {
    const newVersion: ProtocolVersion = {
      id: `manual-${Date.now()}`,
      name,
      description,
      protocol: { ...protocol },
      timestamp: new Date(),
      changeType,
      changes: ["Manual save point"],
      author: "User",
    }

    setVersions((prev) => [newVersion, ...prev])
    setLastSavedProtocol(protocol)
  }

  const handleRevertToVersion = (version: ProtocolVersion) => {
    const revertVersion: ProtocolVersion = {
      id: `pre-revert-${Date.now()}`,
      name: "Before Revert",
      description: `Saved before reverting to ${version.name}`,
      protocol: { ...protocol },
      timestamp: new Date(),
      changeType: "auto",
      changes: ["Pre-revert snapshot"],
      author: "System",
    }

    setVersions((prev) => [revertVersion, ...prev])
    setProtocol(version.protocol)
    setLastSavedProtocol(version.protocol)
  }

  const handleTabChange = (value: string) => {
    setActiveTab(value)

    if (value === "optimize") {
      setOptimizerOpen(true)
    } else if (value === "audit") {
      setAuditOpen(true)
    }
  }

  const handleDrop = (e: React.DragEvent, slotId: string) => {
    e.preventDefault()
    setDragOverSlot(null)

    try {
      const dragData = JSON.parse(e.dataTransfer.getData("application/json"))

      if (dragData.type === "multiple") {
        addMultipleSupplementsToSlot(dragData.supplements, slotId)
      } else {
        addSupplementToSlot(dragData, slotId)
      }

      console.log(`Successfully added supplements to ${slotId}`)
    } catch (error) {
      console.error("Error parsing dropped supplement data:", error)
    }
  }

  if (activeView === "compass") {
    return (
      <div className="min-h-screen bg-slate-950">
        <div className="border-b border-slate-800 bg-slate-900 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <Link href="/">
                <Button variant="ghost" size="sm" className="text-slate-300 hover:text-white">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
              <Separator orientation="vertical" className="h-8 bg-slate-700" />
              <div className="flex items-center space-x-4">
                <Button
                  variant="default"
                  onClick={() => setActiveView("builder")}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Layers className="w-4 h-4 mr-2" />
                  Stack Builder
                </Button>
                <Button
                  variant={activeView === "compass" ? "default" : "outline"}
                  onClick={() => setActiveView("compass")}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  <Compass className="w-4 h-4 mr-2" />
                  Stack Compass
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="p-6">
          <StackCompass />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">
      {/* Top Control Bar */}
      <div className="bg-slate-900 border-b border-slate-800 px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Left Section - Navigation */}
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-4">
              <Button
                variant={activeView === "builder" ? "default" : "outline"}
                onClick={() => setActiveView("builder")}
                size="sm"
                className="bg-blue-600 hover:bg-blue-700 border-blue-500"
              >
                <Layers className="w-4 h-4 mr-2" />
                Stack Builder
              </Button>
              <Button
                variant="outline"
                onClick={() => setActiveView("compass")}
                size="sm"
                className="border-purple-500 text-purple-400 hover:bg-purple-600 hover:text-white"
              >
                <Compass className="w-4 h-4 mr-2" />
                Stack Compass
              </Button>
            </div>
          </div>

          {/* Center Section - Protocol Info */}
          <div className="flex items-center space-x-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{protocol.name}</div>
              <div className="text-sm text-slate-400">{protocol.complexity} Level Protocol</div>
            </div>
          </div>

          {/* Right Section - Stats */}
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-4">
              <div className="text-center">
                <div className="flex items-center space-x-1">
                  <DollarSign className="w-4 h-4 text-green-400" />
                  <span className="text-lg font-bold text-green-400">${protocol.totalCost.toFixed(0)}</span>
                </div>
                <div className="text-xs text-slate-400">Monthly Cost</div>
              </div>
              <div className="text-center">
                <div className="flex items-center space-x-1">
                  <Target className="w-4 h-4 text-blue-400" />
                  <span className="text-lg font-bold text-blue-400">
                    {protocol.timeSlots.reduce((total, slot) => total + slot.supplements.length, 0)}
                  </span>
                </div>
                <div className="text-xs text-slate-400">Supplements</div>
              </div>
              <div className="text-center">
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4 text-purple-400" />
                  <span className="text-lg font-bold text-purple-400">{protocol.timeSlots.length}</span>
                </div>
                <div className="text-xs text-slate-400">Time Slots</div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Bar */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-800">
          {/* Left - Sidebar Controls */}
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setLeftSidebarOpen(!leftSidebarOpen)}
              className={`border-slate-600 ${leftSidebarOpen ? "bg-slate-700 text-white" : "text-slate-400"}`}
            >
              {leftSidebarOpen ? <PanelLeftClose className="w-4 h-4" /> : <PanelLeftOpen className="w-4 h-4" />}
              <span className="ml-2">Supplements</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setRightSidebarOpen(!rightSidebarOpen)}
              className={`border-slate-600 ${rightSidebarOpen ? "bg-slate-700 text-white" : "text-slate-400"}`}
            >
              {rightSidebarOpen ? <PanelRightClose className="w-4 h-4" /> : <PanelRightOpen className="w-4 h-4" />}
              <span className="ml-2">AI Assistant</span>
            </Button>
          </div>

          {/* Center - Tabs */}
          <Tabs value={activeTab} onValueChange={handleTabChange} className="w-auto">
            <TabsList className="bg-slate-800 border border-slate-700">
              <TabsTrigger
                value="build"
                className="data-[state=active]:bg-blue-600 data-[state=active]:text-white text-slate-300"
              >
                <Layers className="w-4 h-4 mr-2" />
                Build
              </TabsTrigger>
              <TabsTrigger
                value="optimize"
                className="data-[state=active]:bg-green-600 data-[state=active]:text-white text-slate-300"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Optimize
              </TabsTrigger>
              <TabsTrigger
                value="audit"
                className="data-[state=active]:bg-orange-600 data-[state=active]:text-white text-slate-300"
              >
                <Shield className="w-4 h-4 mr-2" />
                Audit
              </TabsTrigger>
              <TabsTrigger
                value="settings"
                className="data-[state=active]:bg-slate-600 data-[state=active]:text-white text-slate-300"
              >
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Right - Action Buttons */}
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setVersionManagerOpen(true)}
              className="border-slate-600 text-slate-300 hover:bg-slate-700"
            >
              <History className="w-4 h-4 mr-2" />
              History
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPurchaseOpen(true)}
              className="border-slate-600 text-slate-300 hover:bg-slate-700"
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Purchase
            </Button>
            <Button variant="outline" size="sm" className="border-slate-600 text-slate-300 hover:bg-slate-700">
              <Save className="w-4 h-4 mr-2" />
              Save
            </Button>
            <Button variant="outline" size="sm" className="border-slate-600 text-slate-300 hover:bg-slate-700">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="border-emerald-500 text-emerald-400 hover:bg-emerald-600 hover:text-white"
            >
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex">
        {/* Left Sidebar */}
        {leftSidebarOpen && (
          <div
            className={`w-96 bg-slate-900 border-r border-slate-800 ${
              leftSidebarPinned ? "relative" : "fixed left-0 top-32 bottom-0 z-30 shadow-2xl"
            }`}
          >
            <div className="h-full flex flex-col">
              <div className="p-4 border-b border-slate-800 bg-slate-800/50">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-white flex items-center">
                    <Target className="w-5 h-5 mr-2 text-blue-400" />
                    Supplement Database
                  </h2>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setLeftSidebarPinned(!leftSidebarPinned)}
                      className="text-slate-300 hover:text-white"
                    >
                      {leftSidebarPinned ? <PinOff className="w-4 h-4" /> : <Pin className="w-4 h-4" />}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setLeftSidebarOpen(false)}
                      className="text-slate-300 hover:text-white"
                    >
                      <PanelLeftClose className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
              <div className="flex-1">
                <SupplementSidebar
                  selectedGoals={selectedGoals}
                  setSelectedGoals={setSelectedGoals}
                  budgetRange={budgetRange}
                  setBudgetRange={setBudgetRange}
                  onAddToProtocol={addSupplementToProtocol}
                  onAddMultipleToSlot={addMultipleSupplementsToSlot}
                />
              </div>
            </div>
          </div>
        )}

        {/* Main Canvas */}
        <div className="flex-1 bg-slate-950 overflow-hidden">
          <div className="h-full overflow-y-auto p-6 space-y-6">
            {/* Protocol Overview Card */}
            <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-xl border border-slate-700 p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h1 className="text-2xl font-bold text-white mb-2">Protocol Builder</h1>
                  <p className="text-slate-400">
                    Build your personalized supplement protocol with AI-powered recommendations
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-emerald-400">{protocol.complexity}</div>
                    <div className="text-xs text-slate-400">Complexity</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-400">
                      {Math.round((protocol.totalCost / protocol.budget) * 100)}%
                    </div>
                    <div className="text-xs text-slate-400">Budget Used</div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="flex items-center space-x-3">
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700" onClick={() => setOptimizerOpen(true)}>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Optimize Protocol
                </Button>
                <Button size="sm" variant="outline" onClick={() => setAuditOpen(true)} className="border-slate-600">
                  <Shield className="w-4 h-4 mr-2" />
                  Run Audit
                </Button>
                <Button size="sm" variant="outline" onClick={addTimeSlot} className="border-slate-600">
                  <Clock className="w-4 h-4 mr-2" />
                  Add Time Slot
                </Button>
              </div>
            </div>

            {/* Silo Assessment */}
            <SiloAssessment protocol={protocol} selectedGoals={selectedGoals} />

            {/* Protocol Canvas */}
            <ProtocolCanvas
              protocol={protocol}
              addSupplementToSlot={addSupplementToSlot}
              removeSupplementFromSlot={removeSupplementFromSlot}
              removeTimeSlot={removeTimeSlot}
              updateTimeSlot={updateTimeSlot}
              addTimeSlot={addTimeSlot}
            />
          </div>
        </div>

        {/* Right Sidebar */}
        {rightSidebarOpen && (
          <div
            className={`w-80 bg-slate-900 border-l border-slate-800 ${
              rightSidebarPinned ? "relative" : "fixed right-0 top-32 bottom-0 z-30 shadow-2xl"
            }`}
          >
            <div className="h-full flex flex-col">
              <div className="p-4 border-b border-slate-800 bg-slate-800/50">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-white flex items-center">
                    <Zap className="w-5 h-5 mr-2 text-purple-400" />
                    AI Assistant
                  </h2>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setRightSidebarPinned(!rightSidebarPinned)}
                      className="text-slate-300 hover:text-white"
                    >
                      {rightSidebarPinned ? <PinOff className="w-4 h-4" /> : <Pin className="w-4 h-4" />}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setRightSidebarOpen(false)}
                      className="text-slate-300 hover:text-white"
                    >
                      <PanelRightClose className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
              <div className="flex-1">
                <AIAssistant
                  protocol={protocol}
                  onOptimize={() => setOptimizerOpen(true)}
                  onAudit={() => setAuditOpen(true)}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Dialogs */}
      <ProtocolOptimizer
        protocol={protocol}
        open={optimizerOpen}
        onOpenChange={setOptimizerOpen}
        onApplyOptimization={handleApplyOptimization}
      />
      <SupplementAudit protocol={protocol} open={auditOpen} onOpenChange={setAuditOpen} />
      <SupplementPurchase protocol={protocol} open={purchaseOpen} onOpenChange={setPurchaseOpen} />
      <ProtocolVersionManager
        protocol={protocol}
        open={versionManagerOpen}
        onOpenChange={setVersionManagerOpen}
        onRevertToVersion={handleRevertToVersion}
        versions={versions}
        onSaveVersion={handleSaveVersion}
      />
    </div>
  )
}
