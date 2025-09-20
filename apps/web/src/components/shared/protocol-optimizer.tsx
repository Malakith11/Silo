"use client"

import { useState } from "react"
import { Button } from "../ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import { Badge } from "../ui/badge"
import { Slider } from "../ui/slider"
import { Switch } from "../ui/switch"
import { Label } from "../ui/label"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { Progress } from "../ui/progress"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog"
import {
  Settings,
  Target,
  TrendingUp,
  DollarSign,
  Clock,
  Zap,
  Brain,
  Heart,
  Moon,
  Shield,
  AlertTriangle,
  CheckCircle,
  X,
  BarChart3,
  Sparkles,
  ArrowRight,
  Plus,
  Minus,
  Pill,
  Beaker,
  Droplet,
} from "lucide-react"
import type { ProtocolData, Supplement } from "./stack-lab-builder"

interface ProtocolOptimizerProps {
  protocol: ProtocolData
  open: boolean
  onOpenChange: (open: boolean) => void
  onApplyOptimization: (optimizedProtocol: ProtocolData) => void
}

interface OptimizationCriteria {
  efficacy: number
  budget: number
  complexity: number
  timing: number
  interactions: number
}

interface OptimizationFocus {
  id: string
  name: string
  selected: boolean
}

export function ProtocolOptimizer({ protocol, open, onOpenChange, onApplyOptimization }: ProtocolOptimizerProps) {
  const [activeTab, setActiveTab] = useState("criteria")
  const [optimizationProgress, setOptimizationProgress] = useState(0)
  const [isOptimizing, setIsOptimizing] = useState(false)
  const [optimizationComplete, setOptimizationComplete] = useState(false)
  const [optimizedProtocol, setOptimizedProtocol] = useState<ProtocolData | null>(null)

  const [criteria, setCriteria] = useState<OptimizationCriteria>({
    efficacy: 80,
    budget: 50,
    complexity: 60,
    timing: 70,
    interactions: 90,
  })

  const [focusAreas, setFocusAreas] = useState<OptimizationFocus[]>([
    { id: "cognitive", name: "Cognitive Enhancement", selected: true },
    { id: "sleep", name: "Sleep Quality", selected: false },
    { id: "energy", name: "Energy & Performance", selected: false },
    { id: "recovery", name: "Muscle Recovery", selected: false },
    { id: "stress", name: "Stress Management", selected: true },
    { id: "immune", name: "Immune Support", selected: false },
    { id: "heart", name: "Heart Health", selected: false },
  ])

  const [optimizationMethod, setOptimizationMethod] = useState("balanced")
  const [advancedOptions, setAdvancedOptions] = useState({
    prioritizeResearch: true,
    minimizeInteractions: true,
    considerTiming: true,
    allowNewSupplements: true,
    maxDailyDoses: 3,
  })

  const updateCriteria = (key: keyof OptimizationCriteria, value: number) => {
    setCriteria((prev) => ({ ...prev, [key]: value }))
  }

  const toggleFocusArea = (id: string) => {
    setFocusAreas((prev) => prev.map((area) => (area.id === id ? { ...area, selected: !area.selected } : area)))
  }

  const runOptimization = () => {
    setIsOptimizing(true)
    setOptimizationProgress(0)
    setOptimizationComplete(false)
    setOptimizedProtocol(null)
    setActiveTab("results")

    // Simulate optimization progress with more realistic timing
    const interval = setInterval(() => {
      setOptimizationProgress((prev) => {
        const increment = Math.random() * 12 + 8 // 8-20% increments
        const newProgress = Math.min(prev + increment, 100)

        if (newProgress >= 100) {
          clearInterval(interval)
          setTimeout(() => {
            setIsOptimizing(false)
            setOptimizationComplete(true)
            generateOptimizedProtocol()
          }, 800)
          return 100
        }
        return newProgress
      })
    }, 400)
  }

  const generateOptimizedProtocol = () => {
    // This would typically be a complex algorithm that analyzes the current protocol
    // and generates an optimized version based on the selected criteria and focus areas
    // For this demo, we'll create a modified version of the current protocol

    // Example optimization: adjust timing, remove some supplements, add new ones
    const optimized: ProtocolData = {
      ...protocol,
      timeSlots: [...protocol.timeSlots],
      totalCost: protocol.totalCost * 0.85, // 15% cost reduction
    }

    // Add a new recommended supplement based on focus areas
    const selectedFocusAreas = focusAreas.filter((area) => area.selected).map((area) => area.name)

    if (selectedFocusAreas.includes("Cognitive Enhancement")) {
      const newSupplement: Supplement = {
        id: "alpha-gpc",
        name: "Alpha GPC",
        category: "Nootropics",
        dosage: "300mg",
        timing: ["morning"],
        price: 22,
        interactions: [],
        benefits: ["Cognitive Function", "Memory", "Focus"],
        warnings: [],
        color: "bg-gradient-to-br from-blue-50 to-indigo-100 border-blue-200 hover:border-blue-300",
        icon: "Brain",
        research: {
          studyCount: 8,
          recentStudies: 3,
          lastUpdated: "April 2025",
          outcome: "Positive",
          efficacyScore: 87,
          safetyScore: 92,
          evidenceLevel: "Moderate",
          goalRelevance: {
            "Focus & Cognitive Enhancement": 92,
            "Energy & Performance": 75,
          },
          sources: [],
          scorecard: {
            absorption: 85,
            bioavailability: 82,
            stability: 90,
            purity: 88,
            costEffectiveness: 78,
            researchQuality: 84,
          },
        },
      }

      // Add to morning slot
      const morningSlot = optimized.timeSlots.find((slot) => slot.time.toLowerCase().includes("morning"))
      if (morningSlot) {
        morningSlot.supplements.push(newSupplement)
      }
    }

    if (selectedFocusAreas.includes("Sleep Quality")) {
      const newSupplement: Supplement = {
        id: "l-theanine",
        name: "L-Theanine",
        category: "Amino Acids",
        dosage: "200mg",
        timing: ["evening"],
        price: 15,
        interactions: [],
        benefits: ["Relaxation", "Sleep Quality", "Stress Reduction"],
        warnings: [],
        color: "bg-gradient-to-br from-indigo-50 to-purple-100 border-indigo-200 hover:border-indigo-300",
        icon: "Moon",
        research: {
          studyCount: 10,
          recentStudies: 4,
          lastUpdated: "March 2025",
          outcome: "Positive",
          efficacyScore: 85,
          safetyScore: 96,
          evidenceLevel: "Moderate",
          goalRelevance: {
            "Sleep Optimization": 88,
            "Stress Relief": 90,
          },
          sources: [],
          scorecard: {
            absorption: 90,
            bioavailability: 88,
            stability: 92,
            purity: 94,
            costEffectiveness: 86,
            researchQuality: 82,
          },
        },
      }

      // Add to evening slot
      const eveningSlot = optimized.timeSlots.find(
        (slot) => slot.time.toLowerCase().includes("evening") || slot.time.toLowerCase().includes("night"),
      )
      if (eveningSlot) {
        eveningSlot.supplements.push(newSupplement)
      }
    }

    // Optimize timing - move supplements to better slots
    optimized.timeSlots.forEach((slot) => {
      // Example: Move Vitamin D to morning if it exists in evening
      if (slot.time.toLowerCase().includes("evening")) {
        const vitaminDIndex = slot.supplements.findIndex((s) => s.name.includes("Vitamin D"))
        if (vitaminDIndex >= 0) {
          const vitaminD = slot.supplements[vitaminDIndex]
          slot.supplements.splice(vitaminDIndex, 1)

          const morningSlot = optimized.timeSlots.find((s) => s.time.toLowerCase().includes("morning"))
          if (morningSlot) {
            morningSlot.supplements.push(vitaminD)
          }
        }
      }
    })

    // Recalculate total cost
    optimized.totalCost = optimized.timeSlots.reduce(
      (total, slot) => total + slot.supplements.reduce((slotTotal, supp) => slotTotal + supp.price, 0),
      0,
    )

    setOptimizedProtocol(optimized)
  }

  const handleApplyOptimization = () => {
    if (optimizedProtocol) {
      onApplyOptimization(optimizedProtocol)
      onOpenChange(false)
    }
  }

  const getOptimizationImpact = () => {
    if (!optimizedProtocol) return null

    const originalEfficacy =
      protocol.timeSlots
        .flatMap((slot) => slot.supplements.map((s) => s.research.efficacyScore))
        .reduce((sum, score) => sum + score, 0) / protocol.timeSlots.flatMap((slot) => slot.supplements).length

    const optimizedEfficacy =
      optimizedProtocol.timeSlots
        .flatMap((slot) => slot.supplements.map((s) => s.research.efficacyScore))
        .reduce((sum, score) => sum + score, 0) / optimizedProtocol.timeSlots.flatMap((slot) => slot.supplements).length

    return {
      efficacyChange: Math.round((optimizedEfficacy - originalEfficacy) * 10) / 10,
      costChange: Math.round((optimizedProtocol.totalCost - protocol.totalCost) * 10) / 10,
      supplementCount: {
        original: protocol.timeSlots.flatMap((slot) => slot.supplements).length,
        optimized: optimizedProtocol.timeSlots.flatMap((slot) => slot.supplements).length,
      },
      newSupplements: optimizedProtocol.timeSlots.flatMap((slot) =>
        slot.supplements.filter(
          (s) => !protocol.timeSlots.flatMap((os) => os.supplements).some((os) => os.id === s.id),
        ),
      ),
      removedSupplements: protocol.timeSlots.flatMap((slot) =>
        slot.supplements.filter(
          (s) => !optimizedProtocol.timeSlots.flatMap((os) => os.supplements).some((os) => os.id === s.id),
        ),
      ),
      movedSupplements: optimizedProtocol.timeSlots.flatMap((slot) =>
        slot.supplements.filter((s) => {
          const originalSlot = protocol.timeSlots.find((os) => os.supplements.some((os) => os.id === s.id))
          return originalSlot && originalSlot.id !== slot.id
        }),
      ),
    }
  }

  const impact = optimizationComplete ? getOptimizationImpact() : null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2 text-xl">
            <Settings className="w-5 h-5 text-blue-600" />
            <span>Protocol Optimizer</span>
          </DialogTitle>
          <DialogDescription>
            Fine-tune your supplement protocol for maximum efficacy, optimal timing, and cost efficiency
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="criteria" disabled={isOptimizing}>
              <Target className="w-4 h-4 mr-2" />
              Optimization Criteria
            </TabsTrigger>
            <TabsTrigger value="focus" disabled={isOptimizing}>
              <TrendingUp className="w-4 h-4 mr-2" />
              Focus Areas
            </TabsTrigger>
            <TabsTrigger value="results">
              <BarChart3 className="w-4 h-4 mr-2" />
              Results
            </TabsTrigger>
          </TabsList>

          <TabsContent value="criteria" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Efficacy Slider */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center">
                    <TrendingUp className="w-4 h-4 mr-2 text-blue-600" />
                    Research Efficacy
                  </CardTitle>
                  <CardDescription>Prioritize supplements with stronger research evidence</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Importance:</span>
                      <Badge variant={criteria.efficacy >= 75 ? "default" : "outline"}>
                        {criteria.efficacy >= 90
                          ? "Critical"
                          : criteria.efficacy >= 75
                            ? "High"
                            : criteria.efficacy >= 50
                              ? "Medium"
                              : "Low"}
                      </Badge>
                    </div>
                    <Slider
                      value={[criteria.efficacy]}
                      min={0}
                      max={100}
                      step={5}
                      onValueChange={(value) => updateCriteria("efficacy", value[0])}
                    />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Balanced</span>
                      <span>Evidence-Focused</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Budget Slider */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center">
                    <DollarSign className="w-4 h-4 mr-2 text-green-600" />
                    Budget Optimization
                  </CardTitle>
                  <CardDescription>Balance cost efficiency with supplement efficacy</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Target budget:</span>
                      <Badge variant="outline" className="font-mono">
                        ${Math.round(protocol.totalCost * (criteria.budget / 100))}
                      </Badge>
                    </div>
                    <Slider
                      value={[criteria.budget]}
                      min={0}
                      max={100}
                      step={5}
                      onValueChange={(value) => updateCriteria("budget", value[0])}
                    />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Cost-Focused</span>
                      <span>Performance-Focused</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Complexity Slider */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center">
                    <Pill className="w-4 h-4 mr-2 text-purple-600" />
                    Protocol Complexity
                  </CardTitle>
                  <CardDescription>Adjust the number of supplements and dosing frequency</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Complexity level:</span>
                      <Badge
                        variant={
                          criteria.complexity <= 30 ? "secondary" : criteria.complexity >= 70 ? "default" : "outline"
                        }
                      >
                        {criteria.complexity >= 80
                          ? "Expert"
                          : criteria.complexity >= 60
                            ? "Enthusiast"
                            : criteria.complexity >= 40
                              ? "Intermediate"
                              : "Beginner"}
                      </Badge>
                    </div>
                    <Slider
                      value={[criteria.complexity]}
                      min={0}
                      max={100}
                      step={5}
                      onValueChange={(value) => updateCriteria("complexity", value[0])}
                    />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Simplified</span>
                      <span>Comprehensive</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Timing Slider */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center">
                    <Clock className="w-4 h-4 mr-2 text-orange-600" />
                    Timing Optimization
                  </CardTitle>
                  <CardDescription>Optimize supplement timing for maximum absorption and effect</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Timing importance:</span>
                      <Badge variant={criteria.timing >= 75 ? "default" : "outline"}>
                        {criteria.timing >= 90
                          ? "Critical"
                          : criteria.timing >= 75
                            ? "High"
                            : criteria.timing >= 50
                              ? "Medium"
                              : "Low"}
                      </Badge>
                    </div>
                    <Slider
                      value={[criteria.timing]}
                      min={0}
                      max={100}
                      step={5}
                      onValueChange={(value) => updateCriteria("timing", value[0])}
                    />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Convenience</span>
                      <span>Optimal Timing</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center">
                  <Settings className="w-4 h-4 mr-2 text-gray-600" />
                  Advanced Options
                </CardTitle>
                <CardDescription>Fine-tune additional optimization parameters</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="prioritize-research"
                      checked={advancedOptions.prioritizeResearch}
                      onCheckedChange={(checked) =>
                        setAdvancedOptions((prev) => ({ ...prev, prioritizeResearch: checked }))
                      }
                    />
                    <Label htmlFor="prioritize-research">Prioritize research-backed supplements</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="minimize-interactions"
                      checked={advancedOptions.minimizeInteractions}
                      onCheckedChange={(checked) =>
                        setAdvancedOptions((prev) => ({ ...prev, minimizeInteractions: checked }))
                      }
                    />
                    <Label htmlFor="minimize-interactions">Minimize supplement interactions</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="consider-timing"
                      checked={advancedOptions.considerTiming}
                      onCheckedChange={(checked) =>
                        setAdvancedOptions((prev) => ({ ...prev, considerTiming: checked }))
                      }
                    />
                    <Label htmlFor="consider-timing">Consider circadian rhythm</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="allow-new"
                      checked={advancedOptions.allowNewSupplements}
                      onCheckedChange={(checked) =>
                        setAdvancedOptions((prev) => ({ ...prev, allowNewSupplements: checked }))
                      }
                    />
                    <Label htmlFor="allow-new">Allow new supplement recommendations</Label>
                  </div>
                </div>
                <div className="mt-4">
                  <Label htmlFor="max-doses" className="mb-2 block">
                    Maximum daily doses
                  </Label>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setAdvancedOptions((prev) => ({ ...prev, maxDailyDoses: Math.max(1, prev.maxDailyDoses - 1) }))
                      }
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    <span className="w-8 text-center font-medium">{advancedOptions.maxDailyDoses}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setAdvancedOptions((prev) => ({ ...prev, maxDailyDoses: Math.min(6, prev.maxDailyDoses + 1) }))
                      }
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end">
              <Button onClick={() => setActiveTab("focus")}>
                Continue to Focus Areas
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="focus" className="space-y-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center">
                  <Target className="w-4 h-4 mr-2 text-blue-600" />
                  Optimization Focus
                </CardTitle>
                <CardDescription>Select the primary health goals for your protocol</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {focusAreas.map((area) => (
                    <div key={area.id} className="flex items-center space-x-3">
                      <div
                        className={`p-2 rounded-lg ${
                          area.selected
                            ? "bg-blue-100 text-blue-700 border border-blue-200"
                            : "bg-gray-100 text-gray-500 border border-gray-200"
                        }`}
                      >
                        {area.id === "cognitive" && <Brain className="w-5 h-5" />}
                        {area.id === "sleep" && <Moon className="w-5 h-5" />}
                        {area.id === "energy" && <Zap className="w-5 h-5" />}
                        {area.id === "recovery" && <Droplet className="w-5 h-5" />}
                        {area.id === "stress" && <Beaker className="w-5 h-5" />}
                        {area.id === "immune" && <Shield className="w-5 h-5" />}
                        {area.id === "heart" && <Heart className="w-5 h-5" />}
                      </div>
                      <div className="flex-1">
                        <Label htmlFor={`focus-${area.id}`} className="flex items-center justify-between">
                          <span>{area.name}</span>
                          <Switch
                            id={`focus-${area.id}`}
                            checked={area.selected}
                            onCheckedChange={() => toggleFocusArea(area.id)}
                          />
                        </Label>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center">
                  <Settings className="w-4 h-4 mr-2 text-gray-600" />
                  Optimization Method
                </CardTitle>
                <CardDescription>Choose how aggressively to optimize your protocol</CardDescription>
              </CardHeader>
              <CardContent>
                <RadioGroup value={optimizationMethod} onValueChange={setOptimizationMethod}>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-start space-x-2">
                      <RadioGroupItem value="conservative" id="conservative" />
                      <div>
                        <Label htmlFor="conservative" className="font-medium">
                          Conservative
                        </Label>
                        <p className="text-xs text-gray-500">Minor adjustments to timing and dosage only</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-2">
                      <RadioGroupItem value="balanced" id="balanced" />
                      <div>
                        <Label htmlFor="balanced" className="font-medium">
                          Balanced
                        </Label>
                        <p className="text-xs text-gray-500">Moderate changes with some new recommendations</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-2">
                      <RadioGroupItem value="aggressive" id="aggressive" />
                      <div>
                        <Label htmlFor="aggressive" className="font-medium">
                          Aggressive
                        </Label>
                        <p className="text-xs text-gray-500">Complete protocol redesign for optimal results</p>
                      </div>
                    </div>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setActiveTab("criteria")}>
                Back to Criteria
              </Button>
              <Button onClick={runOptimization} disabled={focusAreas.filter((area) => area.selected).length === 0}>
                <Sparkles className="w-4 h-4 mr-2" />
                Run Optimization
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="results" className="space-y-6">
            {isOptimizing ? (
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center">
                    <Sparkles className="w-4 h-4 mr-2 text-blue-600 animate-pulse" />
                    Optimizing Your Protocol
                  </CardTitle>
                  <CardDescription>
                    Analyzing supplements, research data, and interactions to create your optimized protocol
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Progress value={optimizationProgress} className="h-2" />
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                      <span>Analyzing efficacy data...</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span>Optimizing timing...</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                      <span>Checking interactions...</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
                      <span>Balancing cost efficiency...</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : optimizationComplete && impact ? (
              <>
                <Card className="border-2 border-blue-100 bg-gradient-to-r from-blue-50 to-indigo-50">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center">
                      <Sparkles className="w-4 h-4 mr-2 text-blue-600" />
                      Optimization Complete
                    </CardTitle>
                    <CardDescription>
                      Your protocol has been optimized based on your selected criteria and focus areas
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                      <div className="bg-white rounded-lg p-3 shadow-sm">
                        <div className="text-sm text-gray-600 mb-1">Efficacy Score</div>
                        <div className="text-2xl font-bold text-blue-600">
                          {impact.efficacyChange > 0 ? "+" : ""}
                          {impact.efficacyChange}%
                        </div>
                      </div>
                      <div className="bg-white rounded-lg p-3 shadow-sm">
                        <div className="text-sm text-gray-600 mb-1">Monthly Cost</div>
                        <div className="text-2xl font-bold text-green-600">
                          {impact.costChange <= 0 ? "-" : "+"}${Math.abs(impact.costChange).toFixed(2)}
                        </div>
                      </div>
                      <div className="bg-white rounded-lg p-3 shadow-sm">
                        <div className="text-sm text-gray-600 mb-1">Supplements</div>
                        <div className="text-2xl font-bold text-purple-600">
                          {impact.supplementCount.original} → {impact.supplementCount.optimized}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {impact.newSupplements.length > 0 && (
                        <div className="bg-green-50 rounded-lg p-3 border border-green-200">
                          <h4 className="font-medium text-green-800 mb-2 flex items-center">
                            <Plus className="w-4 h-4 mr-2" />
                            Added Supplements ({impact.newSupplements.length})
                          </h4>
                          <div className="space-y-2">
                            {impact.newSupplements.map((supp) => (
                              <div key={supp.id} className="flex items-center space-x-2 text-sm">
                                <CheckCircle className="w-4 h-4 text-green-600" />
                                <span>
                                  {supp.name} ({supp.dosage}) - ${supp.price}/mo
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {impact.removedSupplements.length > 0 && (
                        <div className="bg-red-50 rounded-lg p-3 border border-red-200">
                          <h4 className="font-medium text-red-800 mb-2 flex items-center">
                            <Minus className="w-4 h-4 mr-2" />
                            Removed Supplements ({impact.removedSupplements.length})
                          </h4>
                          <div className="space-y-2">
                            {impact.removedSupplements.map((supp) => (
                              <div key={supp.id} className="flex items-center space-x-2 text-sm">
                                <X className="w-4 h-4 text-red-600" />
                                <span>
                                  {supp.name} ({supp.dosage}) - ${supp.price}/mo
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {impact.movedSupplements.length > 0 && (
                        <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                          <h4 className="font-medium text-blue-800 mb-2 flex items-center">
                            <Clock className="w-4 h-4 mr-2" />
                            Timing Adjustments ({impact.movedSupplements.length})
                          </h4>
                          <div className="space-y-2">
                            {impact.movedSupplements.map((supp) => (
                              <div key={supp.id} className="flex items-center space-x-2 text-sm">
                                <ArrowRight className="w-4 h-4 text-blue-600" />
                                <span>
                                  {supp.name} moved to {supp.timing.join("/")}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="bg-yellow-50 rounded-lg p-3 border border-yellow-200">
                      <h4 className="font-medium text-yellow-800 mb-2 flex items-center">
                        <AlertTriangle className="w-4 h-4 mr-2" />
                        Optimization Notes
                      </h4>
                      <ul className="space-y-1 text-sm text-yellow-700">
                        <li>• Vitamin D moved to morning for better absorption with food</li>
                        <li>• Added Alpha GPC to support cognitive enhancement goals</li>
                        <li>• Reduced overall protocol cost by 15% while maintaining efficacy</li>
                        <li>• Improved timing to reduce potential supplement interactions</li>
                      </ul>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end space-x-2 pt-0">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setActiveTab("criteria")
                        setOptimizationComplete(false)
                      }}
                    >
                      Adjust Criteria
                    </Button>
                    <Button onClick={handleApplyOptimization}>Apply Optimization</Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center">
                      <Target className="w-4 h-4 mr-2 text-purple-600" />
                      Focus Area Impact
                    </CardTitle>
                    <CardDescription>How the optimized protocol addresses your selected focus areas</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {focusAreas
                        .filter((area) => area.selected)
                        .map((area) => (
                          <div key={area.id} className="space-y-2">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                {area.id === "cognitive" && <Brain className="w-4 h-4 text-blue-600" />}
                                {area.id === "sleep" && <Moon className="w-4 h-4 text-indigo-600" />}
                                {area.id === "energy" && <Zap className="w-4 h-4 text-yellow-600" />}
                                {area.id === "recovery" && <Droplet className="w-4 h-4 text-cyan-600" />}
                                {area.id === "stress" && <Beaker className="w-4 h-4 text-green-600" />}
                                {area.id === "immune" && <Shield className="w-4 h-4 text-red-600" />}
                                {area.id === "heart" && <Heart className="w-4 h-4 text-pink-600" />}
                                <span className="font-medium">{area.name}</span>
                              </div>
                              <Badge
                                variant={
                                  area.id === "cognitive" || area.id === "stress"
                                    ? "default"
                                    : area.id === "sleep"
                                      ? "secondary"
                                      : "outline"
                                }
                              >
                                {area.id === "cognitive" || area.id === "stress"
                                  ? "Significant Improvement"
                                  : area.id === "sleep"
                                    ? "Moderate Improvement"
                                    : "Maintained"}
                              </Badge>
                            </div>
                            <Progress
                              value={
                                area.id === "cognitive" ? 92 : area.id === "stress" ? 88 : area.id === "sleep" ? 75 : 60
                              }
                              className="h-2"
                            />
                            <div className="text-xs text-gray-600">
                              {area.id === "cognitive" && "Alpha GPC added for enhanced cognitive function and focus"}
                              {area.id === "stress" && "Ashwagandha timing optimized for better stress management"}
                              {area.id === "sleep" && "L-Theanine added to improve sleep quality and reduce anxiety"}
                              {area.id === "energy" && "Maintained current energy support supplements"}
                              {area.id === "recovery" && "Current protocol already addresses recovery needs"}
                              {area.id === "immune" && "Current protocol provides adequate immune support"}
                              {area.id === "heart" && "Omega-3 dosage maintained for heart health benefits"}
                            </div>
                          </div>
                        ))}
                    </div>
                  </CardContent>
                </Card>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <Target className="w-12 h-12 text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-700 mb-2">Ready to Optimize</h3>
                <p className="text-gray-500 max-w-md">
                  Configure your optimization criteria and focus areas, then run the optimization to see results
                </p>
                <Button className="mt-6" onClick={() => setActiveTab("criteria")}>
                  Configure Optimization
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          {optimizationComplete && <Button onClick={handleApplyOptimization}>Apply Optimization</Button>}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
