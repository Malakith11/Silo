"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { Badge } from "../ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Slider } from "../ui/slider"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog"
import { Checkbox } from "../ui/checkbox"
import {
  Search,
  Plus,
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
  AlertCircle,
  CheckCircle2,
  Info,
  AlertTriangle,
  GripVertical,
  ChevronDown,
  ChevronUp,
  Grid3X3,
  List,
  Filter,
  X,
} from "lucide-react"
import type { Supplement } from "./stack-lab-builder"
import { createDragPreview } from "./drag-preview"

const SAMPLE_SUPPLEMENTS: Supplement[] = [
  {
    id: "vitamin-d3",
    name: "Vitamin D3",
    category: "Vitamins",
    dosage: "2000 IU",
    timing: ["morning"],
    price: 15,
    interactions: [],
    benefits: ["Bone Health", "Immune Support", "Mood"],
    warnings: [],
    color: "bg-gradient-to-br from-yellow-600/20 to-amber-600/20 border-yellow-500/30",
    icon: "Sun",
    research: {
      studyCount: 12,
      recentStudies: 3,
      lastUpdated: "May 2025",
      outcome: "Positive",
      efficacyScore: 92,
      safetyScore: 95,
      evidenceLevel: "Strong",
      goalRelevance: {
        "Focus & Cognitive Enhancement": 78,
        "Sleep Optimization": 65,
        "Energy & Performance": 82,
        "Immune System Support": 94,
        "Mood Support": 88,
      },
      sources: [
        {
          title: "Vitamin D supplementation and immune function: a systematic review",
          journal: "Journal of Clinical Medicine",
          year: 2025,
          type: "Meta-analysis",
          participants: 2847,
          url: "#",
        },
        {
          title: "Effects of vitamin D3 on mood and cognitive performance",
          journal: "Nutrients",
          year: 2024,
          type: "RCT",
          participants: 156,
          url: "#",
        },
        {
          title: "Vitamin D and bone health: updated evidence",
          journal: "Bone Research",
          year: 2024,
          type: "Review",
          participants: null,
          url: "#",
        },
      ],
      scorecard: {
        absorption: 88,
        bioavailability: 92,
        stability: 95,
        purity: 94,
        costEffectiveness: 89,
        researchQuality: 91,
      },
    },
  },
  {
    id: "omega-3",
    name: "Omega-3 Fish Oil",
    category: "Essential Fatty Acids",
    dosage: "1000mg",
    timing: ["morning", "evening"],
    price: 25,
    interactions: ["Blood thinners"],
    benefits: ["Heart Health", "Brain Function", "Inflammation"],
    warnings: ["Take with food"],
    color: "bg-gradient-to-br from-blue-600/20 to-cyan-600/20 border-blue-500/30",
    icon: "Fish",
    research: {
      studyCount: 18,
      recentStudies: 5,
      lastUpdated: "April 2025",
      outcome: "Positive",
      efficacyScore: 89,
      safetyScore: 91,
      evidenceLevel: "Strong",
      goalRelevance: {
        "Focus & Cognitive Enhancement": 85,
        "Heart Health": 96,
        "Brain Function": 92,
        Inflammation: 88,
      },
      sources: [
        {
          title: "Omega-3 fatty acids and cardiovascular disease: updated meta-analysis",
          journal: "American Heart Journal",
          year: 2025,
          type: "Meta-analysis",
          participants: 4521,
          url: "#",
        },
        {
          title: "EPA and DHA supplementation on cognitive function in healthy adults",
          journal: "Brain Research",
          year: 2025,
          type: "RCT",
          participants: 234,
          url: "#",
        },
        {
          title: "Anti-inflammatory effects of marine omega-3 fatty acids",
          journal: "Inflammation Research",
          year: 2024,
          type: "Clinical Trial",
          participants: 189,
          url: "#",
        },
      ],
      scorecard: {
        absorption: 85,
        bioavailability: 87,
        stability: 82,
        purity: 91,
        costEffectiveness: 78,
        researchQuality: 94,
      },
    },
  },
  {
    id: "magnesium",
    name: "Magnesium Glycinate",
    category: "Minerals",
    dosage: "400mg",
    timing: ["evening", "night"],
    price: 20,
    interactions: [],
    benefits: ["Sleep Quality", "Muscle Recovery", "Stress Relief"],
    warnings: [],
    color: "bg-gradient-to-br from-green-600/20 to-emerald-600/20 border-green-500/30",
    icon: "Leaf",
    research: {
      studyCount: 8,
      recentStudies: 2,
      lastUpdated: "March 2025",
      outcome: "Positive",
      efficacyScore: 86,
      safetyScore: 98,
      evidenceLevel: "Moderate",
      goalRelevance: {
        "Sleep Optimization": 91,
        "Muscle Recovery": 84,
        "Stress Relief": 79,
        "Energy & Performance": 72,
      },
      sources: [
        {
          title: "Magnesium supplementation and sleep quality: a systematic review",
          journal: "Sleep Medicine Reviews",
          year: 2025,
          type: "Systematic Review",
          participants: 1247,
          url: "#",
        },
        {
          title: "Effects of magnesium on muscle recovery in athletes",
          journal: "Sports Medicine",
          year: 2024,
          type: "RCT",
          participants: 98,
          url: "#",
        },
      ],
      scorecard: {
        absorption: 92,
        bioavailability: 89,
        stability: 96,
        purity: 97,
        costEffectiveness: 91,
        researchQuality: 83,
      },
    },
  },
  {
    id: "creatine",
    name: "Creatine Monohydrate",
    category: "Performance",
    dosage: "5g",
    timing: ["morning", "pre-workout"],
    price: 18,
    interactions: [],
    benefits: ["Muscle Strength", "Power Output", "Recovery"],
    warnings: ["Drink plenty of water"],
    color: "bg-gradient-to-br from-red-600/20 to-pink-600/20 border-red-500/30",
    icon: "Dumbbell",
    research: {
      studyCount: 25,
      recentStudies: 8,
      lastUpdated: "May 2025",
      outcome: "Positive",
      efficacyScore: 96,
      safetyScore: 94,
      evidenceLevel: "Very Strong",
      goalRelevance: {
        "Energy & Performance": 98,
        "Muscle Recovery": 92,
        "Focus & Cognitive Enhancement": 75,
      },
      sources: [],
      scorecard: {
        absorption: 95,
        bioavailability: 98,
        stability: 99,
        purity: 96,
        costEffectiveness: 95,
        researchQuality: 97,
      },
    },
  },
]

const GOALS = [
  "Focus & Cognitive Enhancement",
  "Sleep Optimization",
  "Energy & Performance",
  "Muscle Recovery",
  "Mood Support",
  "Immune System Support",
  "Stress Relief",
  "Heart Health",
  "Brain Function",
  "Weight Management",
]

const CATEGORIES = [
  "All",
  "Vitamins",
  "Minerals",
  "Adaptogens",
  "Performance",
  "Essential Fatty Acids",
  "Probiotics",
  "Antioxidants",
  "Anti-inflammatory",
]

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

const getEvidenceBadge = (evidenceLevel: string) => {
  switch (evidenceLevel) {
    case "Very Strong":
      return <Badge className="bg-emerald-600/20 text-emerald-400 border-emerald-500/30 text-xs">Very Strong</Badge>
    case "Strong":
      return <Badge className="bg-green-600/20 text-green-400 border-green-500/30 text-xs">Strong</Badge>
    case "Moderate":
      return <Badge className="bg-yellow-600/20 text-yellow-400 border-yellow-500/30 text-xs">Moderate</Badge>
    case "Limited":
      return <Badge className="bg-gray-600/20 text-gray-400 border-gray-500/30 text-xs">Limited</Badge>
    default:
      return (
        <Badge variant="outline" className="text-xs border-gray-500/30 text-gray-400">
          Unknown
        </Badge>
      )
  }
}

interface SupplementSidebarProps {
  selectedGoals: string[]
  setSelectedGoals: (goals: string[]) => void
  budgetRange: [number, number]
  setBudgetRange: (range: [number, number]) => void
  onAddToProtocol?: (supplement: Supplement, customDosage?: string) => void
  onAddMultipleToSlot?: (supplements: Supplement[], slotId: string) => void
}

interface SupplementDetailModalProps {
  supplement: Supplement
  open: boolean
  onOpenChange: (open: boolean) => void
  selectedGoals: string[]
  onAddToProtocol?: (supplement: Supplement, customDosage?: string) => void
}

function SupplementDetailModal({
  supplement,
  open,
  onOpenChange,
  selectedGoals,
  onAddToProtocol,
}: SupplementDetailModalProps) {
  const [customDosage, setCustomDosage] = useState(supplement.dosage)
  const [dosageMultiplier, setDosageMultiplier] = useState(1)

  const IconComponent = getSupplementIcon(supplement.icon)
  const goalRelevance =
    selectedGoals.length > 0
      ? Math.round(
          selectedGoals.map((goal) => supplement.research.goalRelevance[goal] || 0).reduce((a, b) => a + b, 0) /
            selectedGoals.length,
        )
      : null

  const getDosageStatus = (multiplier: number) => {
    if (multiplier > 2) return { status: "high", color: "text-red-400", icon: AlertTriangle }
    if (multiplier > 1.5) return { status: "elevated", color: "text-yellow-400", icon: AlertCircle }
    if (multiplier > 1) return { status: "above-normal", color: "text-blue-400", icon: Info }
    return { status: "normal", color: "text-green-400", icon: CheckCircle2 }
  }

  const dosageStatus = getDosageStatus(dosageMultiplier)
  const StatusIcon = dosageStatus.icon

  const handleDosageChange = (value: number[]) => {
    const multiplier = value[0]
    setDosageMultiplier(multiplier)

    const originalValue = Number.parseFloat(supplement.dosage.replace(/[^\d.]/g, ""))
    const unit = supplement.dosage.replace(/[\d.]/g, "")
    const newValue = Math.round(originalValue * multiplier)
    setCustomDosage(`${newValue}${unit}`)
  }

  const handleAddToProtocol = () => {
    if (onAddToProtocol) {
      onAddToProtocol(supplement, customDosage)
      onOpenChange(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-gray-800 border-gray-700">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-3">
            <div className="p-3 bg-gray-700/70 rounded-xl shadow-sm border border-gray-600/50">
              <IconComponent className="w-6 h-6 text-gray-300" />
            </div>
            <div>
              <span className="text-xl font-bold text-white">{supplement.name}</span>
              <div className="flex items-center space-x-2 mt-1">
                <Badge variant="outline" className="text-xs border-gray-500/30 text-gray-400">
                  {supplement.category}
                </Badge>
                {getEvidenceBadge(supplement.research.evidenceLevel)}
                {goalRelevance && (
                  <Badge className="bg-green-600/20 text-green-400 text-xs">{goalRelevance}% goal match</Badge>
                )}
              </div>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <Card className="border-2 border-blue-500/30 bg-blue-600/10">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center justify-between text-white">
                <span>Dosage Adjustment</span>
                <div className="flex items-center space-x-2">
                  <StatusIcon className={`w-4 h-4 ${dosageStatus.color}`} />
                  <span className={`text-sm font-medium ${dosageStatus.color} capitalize`}>
                    {dosageStatus.status.replace("-", " ")}
                  </span>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-300 mb-2 block">Standard Dosage</label>
                  <div className="p-3 bg-gray-700 rounded-lg border border-gray-600">
                    <span className="text-lg font-semibold text-white">{supplement.dosage}</span>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-300 mb-2 block">Custom Dosage</label>
                  <div className="p-3 bg-gray-700 rounded-lg border border-gray-600">
                    <span className="text-lg font-semibold text-white">{customDosage}</span>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-gray-300">Dosage Multiplier</label>
                  <span className="text-sm text-gray-400">{dosageMultiplier}x</span>
                </div>
                <Slider
                  value={[dosageMultiplier]}
                  onValueChange={handleDosageChange}
                  min={0.5}
                  max={3}
                  step={0.1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>0.5x (Half)</span>
                  <span>1x (Standard)</span>
                  <span>2x (Double)</span>
                  <span>3x (Triple)</span>
                </div>
              </div>

              {dosageMultiplier > 1.5 && (
                <div className="bg-yellow-600/10 border border-yellow-500/30 rounded-lg p-3">
                  <div className="flex items-start space-x-2">
                    <AlertTriangle className="w-4 h-4 text-yellow-400 mt-0.5" />
                    <div className="text-sm">
                      <p className="font-medium text-yellow-400">Higher than recommended dosage</p>
                      <p className="text-yellow-300">
                        Consider consulting with a healthcare provider before using doses significantly above the
                        standard recommendation.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-700">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="border-gray-600 text-gray-300 hover:bg-gray-700"
            >
              Cancel
            </Button>
            <Button onClick={handleAddToProtocol} className="bg-blue-600 hover:bg-blue-700 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Add to Protocol
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export function SupplementSidebar({
  selectedGoals,
  setSelectedGoals,
  budgetRange,
  setBudgetRange,
  onAddToProtocol,
  onAddMultipleToSlot,
}: SupplementSidebarProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedSupplement, setSelectedSupplement] = useState<Supplement | null>(null)
  const [detailModalOpen, setDetailModalOpen] = useState(false)
  const [viewMode, setViewMode] = useState<"cards" | "list">("cards")
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [searchMinimized, setSearchMinimized] = useState(false)
  const [selectedSupplements, setSelectedSupplements] = useState<Set<string>>(new Set())
  const [dragPreview, setDragPreview] = useState<{ supplement: Supplement; position: { x: number; y: number } } | null>(
    null,
  )

  const filteredSupplements = SAMPLE_SUPPLEMENTS.filter((supplement) => {
    const matchesSearch = supplement.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All" || supplement.category === selectedCategory
    const matchesBudget = supplement.price >= budgetRange[0] && supplement.price <= budgetRange[1]
    const matchesGoals =
      selectedGoals.length === 0 ||
      selectedGoals.some(
        (goal) =>
          supplement.benefits.some((benefit) => benefit.toLowerCase().includes(goal.toLowerCase())) ||
          (supplement.research.goalRelevance[goal] && supplement.research.goalRelevance[goal] > 70),
      )

    return matchesSearch && matchesCategory && matchesBudget && matchesGoals
  })

  const toggleGoal = (goal: string) => {
    setSelectedGoals(selectedGoals.includes(goal) ? selectedGoals.filter((g) => g !== goal) : [...selectedGoals, goal])
  }

  const handleSupplementClick = (supplement: Supplement) => {
    setSelectedSupplement(supplement)
    setDetailModalOpen(true)
  }

  const handleQuickAdd = (supplement: Supplement, e: React.MouseEvent) => {
    e.stopPropagation()
    if (onAddToProtocol) {
      onAddToProtocol(supplement)
    }
  }

  const toggleSupplementSelection = (supplementId: string, e: React.MouseEvent) => {
    e.stopPropagation()
    const newSelected = new Set(selectedSupplements)
    if (newSelected.has(supplementId)) {
      newSelected.delete(supplementId)
    } else {
      newSelected.add(supplementId)
    }
    setSelectedSupplements(newSelected)
  }

  const getGoalRelevanceScore = (supplement: Supplement) => {
    if (selectedGoals.length === 0) return null
    const scores = selectedGoals.map((goal) => supplement.research.goalRelevance[goal] || 0)
    return Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
  }

  const handleDragStart = (e: React.DragEvent, supplement: Supplement) => {
    const isMultiDrag = selectedSupplements.size > 1 && selectedSupplements.has(supplement.id)

    // Create custom drag preview
    const previewElement = createDragPreview(supplement, isMultiDrag, isMultiDrag ? selectedSupplements.size : 1)

    document.body.appendChild(previewElement)
    e.dataTransfer.setDragImage(previewElement, 100, 30)

    // Remove the preview element immediately after setting the drag image
    setTimeout(() => {
      if (document.body.contains(previewElement)) {
        document.body.removeChild(previewElement)
      }
    }, 0)

    if (isMultiDrag) {
      const selectedSupps = SAMPLE_SUPPLEMENTS.filter((s) => selectedSupplements.has(s.id))
      e.dataTransfer.setData("application/json", JSON.stringify({ type: "multiple", supplements: selectedSupps }))
    } else {
      e.dataTransfer.setData("application/json", JSON.stringify(supplement))
    }
    e.dataTransfer.effectAllowed = "copy"
  }

  const clearSelection = () => {
    setSelectedSupplements(new Set())
  }

  return (
    <div className="h-full flex flex-col bg-gray-800 dark:bg-gray-900">
      {/* Search Section */}
      <div
        className={`transition-all duration-300 ${searchMinimized ? "h-16" : "h-auto"} bg-gray-800 dark:bg-gray-900 border-b border-gray-700 flex-shrink-0`}
      >
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setViewMode(viewMode === "cards" ? "list" : "cards")}
                className="text-gray-300 hover:text-white"
              >
                {viewMode === "cards" ? <List className="w-4 h-4" /> : <Grid3X3 className="w-4 h-4" />}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setFiltersOpen(!filtersOpen)}
                className="text-gray-300 hover:text-white"
              >
                <Filter className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSearchMinimized(!searchMinimized)}
                className="text-gray-300 hover:text-white"
              >
                {searchMinimized ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
              </Button>
            </div>
            <Badge variant="outline" className="text-xs bg-blue-600/20 text-blue-400 border-blue-500/30">
              {filteredSupplements.length} supplements
            </Badge>
          </div>

          {!searchMinimized && (
            <>
              {/* Search */}
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search supplements..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 h-10 border-gray-600 focus:border-blue-500 text-sm bg-gray-700 text-white"
                />
                {searchTerm && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSearchTerm("")}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 text-gray-400 hover:text-white"
                  >
                    <X className="w-3 h-3" />
                  </Button>
                )}
              </div>

              {filtersOpen && (
                <>
                  {/* Goals Filter */}
                  <div className="mb-4">
                    <h3 className="text-xs font-semibold mb-2 text-gray-300">
                      Health Goals ({selectedGoals.length} selected)
                    </h3>
                    <div className="flex flex-wrap gap-1">
                      {GOALS.map((goal) => (
                        <Badge
                          key={goal}
                          variant={selectedGoals.includes(goal) ? "default" : "outline"}
                          className={`cursor-pointer text-xs py-1 px-2 transition-all duration-200 ${
                            selectedGoals.includes(goal)
                              ? "bg-blue-600 text-white border-blue-600 shadow-sm hover:bg-blue-700"
                              : "hover:bg-blue-600/20 border-gray-500/30 hover:border-blue-500/30 hover:text-blue-400 text-gray-400"
                          }`}
                          onClick={() => toggleGoal(goal)}
                        >
                          {goal.split(" ")[0]}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Budget Range */}
                  <div className="mb-4">
                    <h3 className="text-xs font-semibold mb-2 text-gray-300">
                      Budget: ${budgetRange[0]} - ${budgetRange[1]}/mo
                    </h3>
                    <Slider
                      value={budgetRange}
                      onValueChange={(value) => setBudgetRange(value as [number, number])}
                      max={100}
                      min={0}
                      step={5}
                      className="w-full"
                    />
                  </div>

                  {/* Category Filter */}
                  <div>
                    <h3 className="text-xs font-semibold mb-2 text-gray-300">Category</h3>
                    <div className="flex flex-wrap gap-1">
                      {CATEGORIES.map((category) => (
                        <Badge
                          key={category}
                          variant={selectedCategory === category ? "default" : "outline"}
                          className={`cursor-pointer text-xs py-1 px-2 transition-all duration-200 ${
                            selectedCategory === category
                              ? "bg-purple-600 text-white border-purple-600 shadow-sm hover:bg-purple-700"
                              : "hover:bg-purple-600/20 border-gray-500/30 hover:border-purple-500/30 hover:text-purple-400 text-gray-400"
                          }`}
                          onClick={() => setSelectedCategory(category)}
                        >
                          {category}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>

      {/* Multi-select Actions */}
      {selectedSupplements.size > 0 && (
        <div className="p-4 bg-blue-600/10 border-b border-blue-500/30">
          <div className="flex items-center justify-between">
            <span className="text-sm text-blue-400">{selectedSupplements.size} supplements selected</span>
            <div className="flex items-center space-x-2">
              <Button
                size="sm"
                variant="outline"
                onClick={clearSelection}
                className="border-gray-600 text-gray-300 hover:bg-gray-700"
              >
                Clear
              </Button>
              <span className="text-xs text-gray-400">Drag to add multiple</span>
            </div>
          </div>
        </div>
      )}

      {/* Supplements List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4" style={{ minHeight: 0 }}>
        {viewMode === "cards" ? (
          // Card View
          filteredSupplements.map((supplement, index) => {
            const IconComponent = getSupplementIcon(supplement.icon)
            const goalRelevance = getGoalRelevanceScore(supplement)
            const isSelected = selectedSupplements.has(supplement.id)

            return (
              <Card
                key={supplement.id}
                draggable
                onDragStart={(e) => {
                  handleDragStart(e, supplement)
                  // Add drag start animation
                  e.currentTarget.style.transform = "scale(0.95)"
                  e.currentTarget.style.opacity = "0.7"
                }}
                onDragEnd={(e) => {
                  // Reset animation
                  e.currentTarget.style.transform = ""
                  e.currentTarget.style.opacity = ""
                }}
                className={`cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-[1.02] ${supplement.color} shadow-lg border-2 group ${isSelected ? "ring-2 ring-blue-500" : ""} drag-source`}
                onClick={() => handleSupplementClick(supplement)}
                style={{
                  animationDelay: `${index * 50}ms`,
                }}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          checked={isSelected}
                          onCheckedChange={(checked) =>
                            toggleSupplementSelection(supplement.id, { stopPropagation: () => {} } as React.MouseEvent)
                          }
                          onClick={(e) => toggleSupplementSelection(supplement.id, e)}
                          className="border-gray-500"
                        />
                        <GripVertical className="w-4 h-4 text-gray-400 group-hover:text-gray-300 transition-colors" />
                        <div className="p-2 bg-gray-700/80 rounded-xl shadow-sm border border-gray-600/50 group-hover:bg-gray-700 transition-colors">
                          <IconComponent className="w-5 h-5 text-gray-300" />
                        </div>
                      </div>
                      <div>
                        <CardTitle className="text-base font-bold text-white">{supplement.name}</CardTitle>
                        <p className="text-sm text-gray-400 font-medium mt-1">{supplement.category}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge
                            variant="outline"
                            className="text-xs bg-gray-700/80 border-gray-500/30 font-medium text-gray-300"
                          >
                            {supplement.dosage}
                          </Badge>
                          <Badge
                            variant="outline"
                            className="text-xs bg-gray-700/80 border-gray-500/30 font-medium text-gray-300"
                          >
                            ${supplement.price}/mo
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      onClick={(e) => handleQuickAdd(supplement, e)}
                      className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm"
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      {getEvidenceBadge(supplement.research.evidenceLevel)}
                      {goalRelevance && (
                        <Badge className="bg-green-600/20 text-green-400 text-xs border-green-500/30">
                          {goalRelevance}% match
                        </Badge>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {supplement.benefits.slice(0, 3).map((benefit) => (
                        <Badge
                          key={benefit}
                          variant="outline"
                          className="text-xs bg-gray-700/50 border-gray-500/30 text-gray-300"
                        >
                          {benefit}
                        </Badge>
                      ))}
                      {supplement.benefits.length > 3 && (
                        <Badge variant="outline" className="text-xs bg-gray-700/50 border-gray-500/30 text-gray-400">
                          +{supplement.benefits.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })
        ) : (
          // List View
          <div className="space-y-2">
            {filteredSupplements.map((supplement, index) => {
              const IconComponent = getSupplementIcon(supplement.icon)
              const goalRelevance = getGoalRelevanceScore(supplement)
              const isSelected = selectedSupplements.has(supplement.id)

              return (
                <div
                  key={supplement.id}
                  draggable
                  onDragStart={(e) => {
                    handleDragStart(e, supplement)
                    // Add drag start animation
                    e.currentTarget.style.transform = "scale(0.95)"
                    e.currentTarget.style.opacity = "0.7"
                  }}
                  onDragEnd={(e) => {
                    // Reset animation
                    e.currentTarget.style.transform = ""
                    e.currentTarget.style.opacity = ""
                  }}
                  className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-all duration-200 hover:bg-gray-700/50 border border-gray-600/50 group ${isSelected ? "ring-2 ring-blue-500 bg-blue-600/10" : "bg-gray-800/50"}`}
                  onClick={() => handleSupplementClick(supplement)}
                  style={{
                    animationDelay: `${index * 30}ms`,
                  }}
                >
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      checked={isSelected}
                      onCheckedChange={(checked) =>
                        toggleSupplementSelection(supplement.id, { stopPropagation: () => {} } as React.MouseEvent)
                      }
                      onClick={(e) => toggleSupplementSelection(supplement.id, e)}
                      className="border-gray-500"
                    />
                    <GripVertical className="w-4 h-4 text-gray-400 group-hover:text-gray-300 transition-colors" />
                    <div className="p-2 bg-gray-700/80 rounded-lg border border-gray-600/50">
                      <IconComponent className="w-4 h-4 text-gray-300" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-white text-sm">{supplement.name}</h3>
                        <p className="text-xs text-gray-400">{supplement.category}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className="text-xs border-gray-500/30 text-gray-400">
                          {supplement.dosage}
                        </Badge>
                        <Badge variant="outline" className="text-xs border-gray-500/30 text-gray-400">
                          ${supplement.price}/mo
                        </Badge>
                        {goalRelevance && (
                          <Badge className="bg-green-600/20 text-green-400 text-xs border-green-500/30">
                            {goalRelevance}%
                          </Badge>
                        )}
                        <Button
                          size="sm"
                          onClick={(e) => handleQuickAdd(supplement, e)}
                          className="bg-blue-600 hover:bg-blue-700 text-white h-7 w-7 p-0"
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {filteredSupplements.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-2">
              <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p className="text-lg font-medium">No supplements found</p>
              <p className="text-sm">Try adjusting your search or filters</p>
            </div>
          </div>
        )}
      </div>

      {/* Supplement Detail Modal */}
      {selectedSupplement && (
        <SupplementDetailModal
          supplement={selectedSupplement}
          open={detailModalOpen}
          onOpenChange={setDetailModalOpen}
          selectedGoals={selectedGoals}
          onAddToProtocol={onAddToProtocol}
        />
      )}

      <style jsx>{`
        .drag-source:active {
          transform: scale(0.95);
          opacity: 0.8;
        }
        
        .drag-preview {
          transform: scale(0.75);
          opacity: 0.9;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
        }
      `}</style>
    </div>
  )
}
