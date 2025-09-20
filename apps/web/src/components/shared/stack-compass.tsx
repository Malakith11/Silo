"use client"

import { useState } from "react"
import {
  Award,
  Calendar,
  ChevronRight,
  Clock,
  Compass,
  Eye,
  FileSearch,
  Filter,
  FlameIcon as Fire,
  Grid,
  Heart,
  Info,
  MapPin,
  Star,
  TrendingUpIcon as Trending,
  Users,
  X,
} from "lucide-react"
import { cn } from "../../../../lib/utils"
import { Button } from "../ui/button"
import { Badge } from "../ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog"
import { Progress } from "../ui/progress"

// Types
type ScoreCategory = "Quality" | "Efficacy" | "Interaction" | "Goal-Fit" | "Convenience"
type Goal = "Focus" | "Sleep" | "Recovery" | "Energy" | "Mood" | "Immunity" | "Longevity"
type Demographic = "Athletes" | "Students" | "Professionals" | "Seniors" | "Parents" | "Shift Workers"
type Region = "North America" | "Europe" | "Asia" | "Australia" | "Global"

interface Score {
  category: ScoreCategory
  value: number // 0-100
}

interface Stack {
  id: string
  name: string
  description: string
  creator: string
  creatorAvatar: string
  goals: Goal[]
  demographics: Demographic[]
  region: Region
  tags: string[]
  likes: number
  views: number
  trending: number // 0-100
  dateCreated: string
  scores: Score[]
  supplements: {
    name: string
    dosage: string
    timing: string
  }[]
}

// Sample data
const sampleStacks: Stack[] = [
  {
    id: "stack-1",
    name: "Morning Focus Protocol",
    description: "Designed to enhance cognitive function and mental clarity for productive mornings.",
    creator: "Dr. Sarah Chen",
    creatorAvatar: "/placeholder.svg?height=40&width=40",
    goals: ["Focus", "Energy"],
    demographics: ["Professionals", "Students"],
    region: "North America",
    tags: ["Nootropic", "Productivity", "Mental Clarity"],
    likes: 342,
    views: 1205,
    trending: 85,
    dateCreated: "2023-11-15",
    scores: [
      { category: "Quality", value: 92 },
      { category: "Efficacy", value: 88 },
      { category: "Interaction", value: 95 },
      { category: "Goal-Fit", value: 90 },
      { category: "Convenience", value: 82 },
    ],
    supplements: [
      { name: "L-Theanine", dosage: "200mg", timing: "Morning" },
      { name: "Caffeine", dosage: "100mg", timing: "Morning" },
      { name: "Alpha-GPC", dosage: "300mg", timing: "Morning" },
      { name: "Bacopa Monnieri", dosage: "300mg", timing: "Evening" },
    ],
  },
  {
    id: "stack-2",
    name: "Deep Sleep Enhancer",
    description: "Formulated to improve sleep quality and reduce time to fall asleep.",
    creator: "Sleep Specialist Mike",
    creatorAvatar: "/placeholder.svg?height=40&width=40",
    goals: ["Sleep"],
    demographics: ["Professionals", "Seniors", "Shift Workers"],
    region: "Global",
    tags: ["Sleep Quality", "Relaxation", "Circadian Rhythm"],
    likes: 528,
    views: 2310,
    trending: 92,
    dateCreated: "2023-10-22",
    scores: [
      { category: "Quality", value: 94 },
      { category: "Efficacy", value: 90 },
      { category: "Interaction", value: 88 },
      { category: "Goal-Fit", value: 96 },
      { category: "Convenience", value: 85 },
    ],
    supplements: [
      { name: "Magnesium Glycinate", dosage: "400mg", timing: "Evening" },
      { name: "L-Theanine", dosage: "200mg", timing: "Evening" },
      { name: "Melatonin", dosage: "0.3mg", timing: "Before bed" },
      { name: "Ashwagandha", dosage: "300mg", timing: "Evening" },
    ],
  },
  {
    id: "stack-3",
    name: "Athletic Recovery Boost",
    description: "Optimized for post-workout recovery and reducing inflammation.",
    creator: "Coach Taylor",
    creatorAvatar: "/placeholder.svg?height=40&width=40",
    goals: ["Recovery", "Immunity"],
    demographics: ["Athletes"],
    region: "Europe",
    tags: ["Anti-inflammatory", "Muscle Recovery", "Joint Health"],
    likes: 412,
    views: 1876,
    trending: 78,
    dateCreated: "2023-12-05",
    scores: [
      { category: "Quality", value: 90 },
      { category: "Efficacy", value: 93 },
      { category: "Interaction", value: 87 },
      { category: "Goal-Fit", value: 94 },
      { category: "Convenience", value: 80 },
    ],
    supplements: [
      { name: "Curcumin", dosage: "500mg", timing: "With meals" },
      { name: "Omega-3", dosage: "2g", timing: "With meals" },
      { name: "Collagen Peptides", dosage: "15g", timing: "Post-workout" },
      { name: "Tart Cherry Extract", dosage: "480mg", timing: "Evening" },
    ],
  },
  {
    id: "stack-4",
    name: "Mood & Stress Balance",
    description: "Designed to support emotional wellbeing and stress resilience.",
    creator: "Dr. Emma Roberts",
    creatorAvatar: "/placeholder.svg?height=40&width=40",
    goals: ["Mood", "Focus"],
    demographics: ["Professionals", "Parents"],
    region: "Australia",
    tags: ["Stress Relief", "Mood Support", "Adaptogenic"],
    likes: 287,
    views: 1432,
    trending: 72,
    dateCreated: "2023-11-28",
    scores: [
      { category: "Quality", value: 89 },
      { category: "Efficacy", value: 85 },
      { category: "Interaction", value: 92 },
      { category: "Goal-Fit", value: 88 },
      { category: "Convenience", value: 90 },
    ],
    supplements: [
      { name: "Ashwagandha", dosage: "600mg", timing: "Morning & Evening" },
      { name: "Rhodiola Rosea", dosage: "500mg", timing: "Morning" },
      { name: "Vitamin D3", dosage: "5000 IU", timing: "Morning" },
      { name: "Magnesium Threonate", dosage: "144mg", timing: "Evening" },
    ],
  },
  {
    id: "stack-5",
    name: "Longevity Foundation",
    description: "Comprehensive stack focused on cellular health and longevity pathways.",
    creator: "Longevity Lab",
    creatorAvatar: "/placeholder.svg?height=40&width=40",
    goals: ["Longevity", "Immunity"],
    demographics: ["Professionals", "Seniors"],
    region: "Global",
    tags: ["Anti-aging", "NAD+", "Cellular Health"],
    likes: 631,
    views: 2845,
    trending: 95,
    dateCreated: "2023-09-18",
    scores: [
      { category: "Quality", value: 96 },
      { category: "Efficacy", value: 87 },
      { category: "Interaction", value: 93 },
      { category: "Goal-Fit", value: 91 },
      { category: "Convenience", value: 78 },
    ],
    supplements: [
      { name: "NMN", dosage: "500mg", timing: "Morning" },
      { name: "Resveratrol", dosage: "500mg", timing: "Morning with fat" },
      { name: "CoQ10", dosage: "200mg", timing: "With meals" },
      { name: "Berberine", dosage: "500mg", timing: "With meals" },
    ],
  },
  {
    id: "stack-6",
    name: "Student Focus Formula",
    description: "Tailored for academic performance and sustained mental energy.",
    creator: "Academic Edge",
    creatorAvatar: "/placeholder.svg?height=40&width=40",
    goals: ["Focus", "Energy"],
    demographics: ["Students"],
    region: "North America",
    tags: ["Memory", "Concentration", "Mental Stamina"],
    likes: 356,
    views: 1689,
    trending: 82,
    dateCreated: "2023-10-30",
    scores: [
      { category: "Quality", value: 88 },
      { category: "Efficacy", value: 92 },
      { category: "Interaction", value: 90 },
      { category: "Goal-Fit", value: 94 },
      { category: "Convenience", value: 86 },
    ],
    supplements: [
      { name: "Bacopa Monnieri", dosage: "300mg", timing: "Morning" },
      { name: "Lion's Mane", dosage: "1000mg", timing: "Morning" },
      { name: "Citicoline", dosage: "250mg", timing: "Morning" },
      { name: "Rhodiola Rosea", dosage: "300mg", timing: "Midday" },
    ],
  },
]

// Stack Card Component
const StackCard = ({ stack, onQuickView }: { stack: Stack; onQuickView: (stack: Stack) => void }) => {
  const averageScore = Math.round(stack.scores.reduce((sum, score) => sum + score.value, 0) / stack.scores.length)

  return (
    <div className="relative flex flex-col bg-card text-card-foreground rounded-lg shadow-md overflow-hidden border border-border hover:shadow-lg transition-shadow">
      {/* Top trending indicator */}
      {stack.trending > 90 && (
        <div className="absolute top-0 right-0 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs px-2 py-1 rounded-bl-md flex items-center">
          <Fire className="h-3 w-3 mr-1" /> Top Trending
        </div>
      )}

      {/* Header */}
      <div className="p-4 pb-2">
        <div className="flex justify-between items-start">
          <h3 className="font-semibold text-foreground line-clamp-1">{stack.name}</h3>
          <Badge variant="outline" className="ml-2 flex-shrink-0">
            <Star className="h-3 w-3 mr-1 text-amber-500 fill-amber-500" />
            {averageScore}
          </Badge>
        </div>
        <p className="text-muted-foreground text-sm mt-1 line-clamp-2">{stack.description}</p>
      </div>

      {/* Tags */}
      <div className="px-4 py-2">
        <div className="flex flex-wrap gap-1">
          {stack.goals.map((goal) => (
            <Badge
              key={goal}
              variant="secondary"
              className="bg-blue-50 text-blue-700 hover:bg-blue-100 dark:bg-blue-900/20 dark:text-blue-300 dark:hover:bg-blue-900/30 text-xs"
            >
              {goal}
            </Badge>
          ))}
          {stack.tags.slice(0, 2).map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
          {stack.tags.length > 2 && (
            <Badge variant="outline" className="text-xs">
              +{stack.tags.length - 2} more
            </Badge>
          )}
        </div>
      </div>

      {/* Mini Scorecard */}
      <div className="px-4 py-2">
        <div className="grid grid-cols-5 gap-1">
          {stack.scores.map((score) => (
            <div key={score.category} className="flex flex-col items-center">
              <div className="w-full h-1 rounded-full bg-muted overflow-hidden">
                <div
                  className={cn(
                    "h-full rounded-full",
                    score.value >= 90
                      ? "bg-green-500"
                      : score.value >= 80
                        ? "bg-blue-500"
                        : score.value >= 70
                          ? "bg-yellow-500"
                          : "bg-red-500",
                  )}
                  style={{ width: `${score.value}%` }}
                />
              </div>
              <span className="text-[10px] text-muted-foreground mt-1 truncate w-full text-center">
                {score.category.substring(0, 4)}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Supplements Preview */}
      <div className="px-4 py-2">
        <h4 className="text-xs font-medium text-muted-foreground mb-2">Key Supplements</h4>
        <div className="space-y-1">
          {stack.supplements.slice(0, 3).map((supplement, index) => (
            <div key={index} className="flex justify-between items-center text-xs">
              <span className="font-medium text-foreground">{supplement.name}</span>
              <span className="text-muted-foreground">{supplement.dosage}</span>
            </div>
          ))}
          {stack.supplements.length > 3 && (
            <div className="text-xs text-muted-foreground italic">+{stack.supplements.length - 3} more supplements</div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-auto border-t border-border p-3 flex justify-between items-center">
        <div className="flex items-center">
          <img
            src={stack.creatorAvatar || "/placeholder.svg"}
            alt={stack.creator}
            className="h-5 w-5 rounded-full mr-2"
          />
          <span className="text-xs text-muted-foreground">{stack.creator}</span>
        </div>
        <div className="flex gap-3">
          <Button variant="ghost" size="sm" className="h-7 px-2 text-xs" onClick={() => onQuickView(stack)}>
            <Eye className="h-3 w-3 mr-1" /> Quick View
          </Button>
          <Button variant="outline" size="sm" className="h-7 px-2 text-xs">
            <FileSearch className="h-3 w-3 mr-1" /> Full Audit
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-muted px-3 py-2 flex justify-between text-xs text-muted-foreground">
        <div className="flex items-center">
          <Heart className="h-3 w-3 mr-1" /> {stack.likes}
        </div>
        <div className="flex items-center">
          <Eye className="h-3 w-3 mr-1" /> {stack.views}
        </div>
        <div className="flex items-center">
          <Calendar className="h-3 w-3 mr-1" />{" "}
          {new Date(stack.dateCreated).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
        </div>
      </div>
    </div>
  )
}

// Stack Quick View Component
const StackQuickView = ({ stack, isOpen, onClose }: { stack: Stack | null; isOpen: boolean; onClose: () => void }) => {
  if (!stack) return null

  const averageScore = Math.round(stack.scores.reduce((sum, score) => sum + score.value, 0) / stack.scores.length)

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] p-0 flex flex-col">
        <DialogHeader className="p-6 pb-4 border-b border-border">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl">{stack.name}</DialogTitle>
            <Badge variant="outline" className="flex items-center">
              <Star className="h-3 w-3 mr-1 text-amber-500 fill-amber-500" />
              {averageScore} Overall Score
            </Badge>
          </div>
          <DialogDescription className="text-base mt-2">{stack.description}</DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Creator info */}
          <div className="flex items-center">
            <img
              src={stack.creatorAvatar || "/placeholder.svg"}
              alt={stack.creator}
              className="h-10 w-10 rounded-full mr-3"
            />
            <div>
              <div className="text-sm font-medium text-foreground">{stack.creator}</div>
              <div className="text-xs text-muted-foreground">
                Created on {new Date(stack.dateCreated).toLocaleDateString()}
              </div>
            </div>
          </div>

          {/* Tags */}
          <div>
            <h4 className="text-sm font-medium mb-3 text-foreground">Categories</h4>
            <div className="flex flex-wrap gap-2">
              {stack.goals.map((goal) => (
                <Badge
                  key={goal}
                  variant="secondary"
                  className="bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300"
                >
                  {goal}
                </Badge>
              ))}
              {stack.demographics.map((demo) => (
                <Badge
                  key={demo}
                  variant="secondary"
                  className="bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-300"
                >
                  {demo}
                </Badge>
              ))}
              {stack.tags.map((tag) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          {/* Detailed Scorecard */}
          <div>
            <h4 className="text-sm font-medium mb-3 text-foreground">Stack Scorecard</h4>
            <div className="space-y-4">
              {stack.scores.map((score) => (
                <div key={score.category} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-foreground">{score.category}</span>
                    <span className="font-semibold text-blue-600 dark:text-blue-400">{score.value}/100</span>
                  </div>
                  <Progress
                    value={score.value}
                    className={cn(
                      "h-2",
                      score.value >= 90
                        ? "[&>div]:bg-green-500"
                        : score.value >= 80
                          ? "[&>div]:bg-blue-500"
                          : score.value >= 70
                            ? "[&>div]:bg-yellow-500"
                            : "[&>div]:bg-red-500",
                    )}
                  />
                  <p className="text-xs text-muted-foreground">
                    {score.category === "Quality" && "Assessment of ingredient quality and formulation standards"}
                    {score.category === "Efficacy" && "Evidence-based effectiveness for stated goals"}
                    {score.category === "Interaction" && "Safety profile and potential supplement interactions"}
                    {score.category === "Goal-Fit" && "Alignment with stated objectives and outcomes"}
                    {score.category === "Convenience" && "Ease of adherence and integration into daily routine"}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Supplements */}
          <div>
            <h4 className="text-sm font-medium mb-3 flex items-center text-foreground">
              Supplements in this Stack
              <Badge variant="outline" className="ml-2 text-xs">
                {stack.supplements.length} total
              </Badge>
            </h4>
            <div className="space-y-3">
              {stack.supplements.map((supplement, index) => (
                <div
                  key={index}
                  className="flex justify-between items-start p-4 bg-muted rounded-lg border border-border"
                >
                  <div className="flex-1">
                    <div className="font-semibold text-foreground text-base">{supplement.name}</div>
                    <div className="text-sm text-muted-foreground mt-1">
                      <span className="inline-flex items-center font-medium">
                        Dosage: <span className="ml-1 text-blue-600 dark:text-blue-400">{supplement.dosage}</span>
                      </span>
                    </div>
                  </div>
                  <Badge
                    variant="outline"
                    className="bg-background border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 ml-3"
                  >
                    <Clock className="h-3 w-3 mr-1" />
                    {supplement.timing}
                  </Badge>
                </div>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3">
            <div className="flex flex-col items-center justify-center p-4 bg-muted rounded-lg">
              <div className="flex items-center text-muted-foreground mb-1">
                <Heart className="h-4 w-4 mr-1" /> Likes
              </div>
              <div className="text-xl font-semibold text-foreground">{stack.likes}</div>
            </div>
            <div className="flex flex-col items-center justify-center p-4 bg-muted rounded-lg">
              <div className="flex items-center text-muted-foreground mb-1">
                <Eye className="h-4 w-4 mr-1" /> Views
              </div>
              <div className="text-xl font-semibold text-foreground">{stack.views}</div>
            </div>
            <div className="flex flex-col items-center justify-center p-4 bg-muted rounded-lg">
              <div className="flex items-center text-muted-foreground mb-1">
                <MapPin className="h-4 w-4 mr-1" /> Region
              </div>
              <div className="text-xl font-semibold text-center text-foreground">{stack.region}</div>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center p-6 pt-4 border-t border-border bg-muted">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button>
            See Full Audit <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

// Main Stack Compass Component
export function StackCompass() {
  const [activeTab, setActiveTab] = useState("gallery")
  const [selectedStack, setSelectedStack] = useState<Stack | null>(null)
  const [quickViewOpen, setQuickViewOpen] = useState(false)
  const [activeFilters, setActiveFilters] = useState<{
    goals: Goal[]
    demographics: Demographic[]
  }>({
    goals: [],
    demographics: [],
  })

  // Filter stacks based on active filters
  const filteredStacks = sampleStacks.filter((stack) => {
    if (activeFilters.goals.length > 0 && !stack.goals.some((goal) => activeFilters.goals.includes(goal))) {
      return false
    }
    if (
      activeFilters.demographics.length > 0 &&
      !stack.demographics.some((demo) => activeFilters.demographics.includes(demo))
    ) {
      return false
    }
    return true
  })

  // Get stacks for different tabs
  const galleryStacks = filteredStacks
  const trendingStacks = [...filteredStacks].sort((a, b) => b.trending - a.trending)
  const spotlightStack = trendingStacks[0] // Just use the top trending stack for spotlight

  // Toggle filter function
  const toggleFilter = (type: "goals" | "demographics", value: Goal | Demographic) => {
    setActiveFilters((prev) => {
      if (type === "goals") {
        const current = prev.goals
        return {
          ...prev,
          goals: current.includes(value as Goal)
            ? current.filter((item) => item !== value)
            : [...current, value as Goal],
        }
      } else {
        const current = prev.demographics
        return {
          ...prev,
          demographics: current.includes(value as Demographic)
            ? current.filter((item) => item !== value)
            : [...current, value as Demographic],
        }
      }
    })
  }

  // Handle quick view
  const handleQuickView = (stack: Stack) => {
    setSelectedStack(stack)
    setQuickViewOpen(true)
  }

  // Close quick view
  const handleCloseQuickView = () => {
    setQuickViewOpen(false)
  }

  return (
    <div className="bg-card text-card-foreground rounded-xl shadow-md p-6 border border-border">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <Compass className="h-6 w-6 mr-2 text-blue-600 dark:text-blue-400" />
          <h2 className="text-2xl font-bold text-foreground">Stack Compass</h2>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <Filter className="h-4 w-4" /> Filters
          </Button>
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <Info className="h-4 w-4" /> About
          </Button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="mb-6 space-y-4">
        <div>
          <h3 className="text-sm font-medium mb-2 flex items-center text-foreground">
            <Award className="h-4 w-4 mr-1 text-blue-600 dark:text-blue-400" /> Goals
          </h3>
          <div className="flex flex-wrap gap-1">
            {["Focus", "Sleep", "Recovery", "Energy", "Mood", "Immunity", "Longevity"].map((goal) => (
              <Badge
                key={goal}
                variant={activeFilters.goals.includes(goal as Goal) ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => toggleFilter("goals", goal as Goal)}
              >
                {goal}
                {activeFilters.goals.includes(goal as Goal) && <X className="ml-1 h-3 w-3" />}
              </Badge>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium mb-2 flex items-center text-foreground">
            <Users className="h-4 w-4 mr-1 text-blue-600 dark:text-blue-400" /> Demographics
          </h3>
          <div className="flex flex-wrap gap-1">
            {["Athletes", "Students", "Professionals", "Seniors", "Parents", "Shift Workers"].map((demo) => (
              <Badge
                key={demo}
                variant={activeFilters.demographics.includes(demo as Demographic) ? "secondary" : "outline"}
                className={cn(
                  "cursor-pointer",
                  activeFilters.demographics.includes(demo as Demographic)
                    ? "bg-purple-100 text-purple-800 hover:bg-purple-200 dark:bg-purple-900/20 dark:text-purple-300 dark:hover:bg-purple-900/30"
                    : "",
                )}
                onClick={() => toggleFilter("demographics", demo as Demographic)}
              >
                {demo}
                {activeFilters.demographics.includes(demo as Demographic) && <X className="ml-1 h-3 w-3" />}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="gallery" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="gallery" className="flex items-center gap-1">
            <Grid className="h-4 w-4" /> Gallery
          </TabsTrigger>
          <TabsTrigger value="spotlight" className="flex items-center gap-1">
            <Star className="h-4 w-4" /> Spotlight
          </TabsTrigger>
          <TabsTrigger value="trending" className="flex items-center gap-1">
            <Trending className="h-4 w-4" /> Trending
          </TabsTrigger>
        </TabsList>

        {/* Gallery Tab */}
        <TabsContent value="gallery" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {galleryStacks.map((stack) => (
              <StackCard key={stack.id} stack={stack} onQuickView={handleQuickView} />
            ))}
          </div>
        </TabsContent>

        {/* Spotlight Tab */}
        <TabsContent value="spotlight" className="space-y-4">
          {spotlightStack && (
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 rounded-lg p-6 border border-border">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <Star className="h-5 w-5 mr-2 text-amber-500 fill-amber-500" />
                  <h3 className="text-xl font-bold text-foreground">Today's Spotlight</h3>
                </div>
                <Badge variant="outline" className="bg-background">
                  {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                </Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-2">{spotlightStack.name}</h2>
                  <p className="text-muted-foreground mb-4">{spotlightStack.description}</p>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {spotlightStack.goals.map((goal) => (
                      <Badge
                        key={goal}
                        variant="secondary"
                        className="bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300"
                      >
                        {goal}
                      </Badge>
                    ))}
                    {spotlightStack.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="bg-background">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center mb-4">
                    <img
                      src={spotlightStack.creatorAvatar || "/placeholder.svg"}
                      alt={spotlightStack.creator}
                      className="h-10 w-10 rounded-full mr-3"
                    />
                    <div>
                      <div className="font-medium text-foreground">{spotlightStack.creator}</div>
                      <div className="text-sm text-muted-foreground">Expert Creator</div>
                    </div>
                  </div>

                  <div className="flex gap-3 mt-6">
                    <Button onClick={() => handleQuickView(spotlightStack)}>
                      <Eye className="h-4 w-4 mr-2" /> Quick View
                    </Button>
                    <Button variant="outline">
                      <FileSearch className="h-4 w-4 mr-2" /> Full Audit
                    </Button>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-card rounded-lg p-4 shadow-sm border border-border">
                    <h4 className="font-medium text-foreground mb-3">Stack Scorecard</h4>
                    <div className="space-y-3">
                      {spotlightStack.scores.map((score) => (
                        <div key={score.category} className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span className="text-foreground">{score.category}</span>
                            <span className="font-medium text-foreground">{score.value}/100</span>
                          </div>
                          <Progress
                            value={score.value}
                            className={cn(
                              score.value >= 90
                                ? "bg-green-100 dark:bg-green-900/20"
                                : score.value >= 80
                                  ? "bg-blue-100 dark:bg-blue-900/20"
                                  : score.value >= 70
                                    ? "bg-yellow-100 dark:bg-yellow-900/20"
                                    : "bg-red-100 dark:bg-red-900/20",
                            )}
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-card rounded-lg p-4 shadow-sm border border-border">
                    <h4 className="font-medium text-foreground mb-3">
                      Key Supplements ({spotlightStack.supplements.length})
                    </h4>
                    <div className="space-y-2">
                      {spotlightStack.supplements.map((supplement, index) => (
                        <div key={index} className="flex justify-between items-center p-2 bg-muted rounded-md">
                          <div>
                            <div className="font-medium text-foreground">{supplement.name}</div>
                            <div className="text-xs text-muted-foreground">Dosage: {supplement.dosage}</div>
                          </div>
                          <Badge variant="outline" className="bg-background text-xs">
                            <Clock className="h-3 w-3 mr-1" />
                            {supplement.timing}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </TabsContent>

        {/* Trending Tab */}
        <TabsContent value="trending" className="space-y-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-foreground">Top Trending Stacks</h3>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="flex items-center gap-1">
                <MapPin className="h-3 w-3" /> Global
              </Badge>
              <Badge variant="outline" className="flex items-center gap-1">
                <Calendar className="h-3 w-3" /> This Week
              </Badge>
            </div>
          </div>

          <div className="space-y-4">
            {trendingStacks.slice(0, 5).map((stack, index) => (
              <div
                key={stack.id}
                className="flex items-center bg-card rounded-lg border border-border p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 font-bold mr-4">
                  {index + 1}
                </div>

                <div className="flex-1">
                  <h4 className="font-medium text-foreground">{stack.name}</h4>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <span className="flex items-center mr-3">
                      <Users className="h-3 w-3 mr-1" />
                      {stack.demographics.join(", ")}
                    </span>
                    <span className="flex items-center">
                      <Award className="h-3 w-3 mr-1" />
                      {stack.goals.join(", ")}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 ml-4">
                  <div className="flex items-center text-sm">
                    <Fire className="h-4 w-4 mr-1 text-orange-500" />
                    <span className="font-medium text-foreground">{stack.trending}</span>
                  </div>

                  <Button variant="ghost" size="sm" onClick={() => handleQuickView(stack)}>
                    <Eye className="h-4 w-4 mr-1" /> View
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Quick View Dialog */}
      <StackQuickView stack={selectedStack} isOpen={quickViewOpen} onClose={handleCloseQuickView} />
    </div>
  )
}
