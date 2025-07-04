"use client"

import { JSX, SVGProps, useState } from "react"
import { Header } from "../Global/header"
import { Footer } from "../Global/footer"
import { Button } from "../ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import { Badge } from "../ui/badge"
import { Input } from "../ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Slider } from "../ui/slider"
import {
  Search,
  TrendingUp,
  Calendar,
  Users,
  ExternalLink,
  Bookmark,
  ThumbsUp,
  ThumbsDown,
  AlertCircle,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Beaker,
  Pill,
  Clock,
  DollarSign,
  Percent,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
  Info,
  Brain,
  ShieldIcon,
} from "lucide-react"
import { Progress } from "../ui/progress"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip"
import { IntelligencePipeline } from "../Global/intelligence-pipeline"

// Study outcome types
type OutcomeType = "positive" | "negative" | "neutral" | "mixed"

// Study quality levels
type QualityLevel = "high" | "moderate" | "low"

// Clinical significance levels
type ClinicalSignificance = "significant" | "moderate" | "minimal" | "none"

// Study interface
interface Study {
  id: number
  title: string
  journal: string
  date: string
  participants: string
  type: string
  tags: string[]
  quality: QualityLevel
  outcome: OutcomeType
  clinicalSignificance: ClinicalSignificance
  effectSize: number // 0-100
  confidenceInterval: string
  dosage: string
  duration: string
  costEffectiveness: number // 0-100
  safetyProfile: number // 0-100
  relevanceScore: number // 0-100
}

// Helper function to get outcome icon
const getOutcomeIcon = (outcome: OutcomeType) => {
  switch (outcome) {
    case "positive":
      return <ThumbsUp className="w-5 h-5 text-green-500" />
    case "negative":
      return <ThumbsDown className="w-5 h-5 text-red-500" />
    case "neutral":
      return <Minus className="w-5 h-5 text-gray-500 dark:text-gray-400" />
    case "mixed":
      return <AlertCircle className="w-5 h-5 text-amber-500" />
  }
}

// Helper function to get quality icon
const getQualityIcon = (quality: QualityLevel) => {
  switch (quality) {
    case "high":
      return <CheckCircle2 className="w-5 h-5 text-green-500" />
    case "moderate":
      return <HelpCircle className="w-5 h-5 text-amber-500" />
    case "low":
      return <XCircle className="w-5 h-5 text-red-500" />
  }
}

// Helper function to get clinical significance icon
const getClinicalIcon = (significance: ClinicalSignificance) => {
  switch (significance) {
    case "significant":
      return <ArrowUpRight className="w-5 h-5 text-green-500" />
    case "moderate":
      return <ArrowUpRight className="w-5 h-5 text-blue-500" />
    case "minimal":
      return <ArrowDownRight className="w-5 h-5 text-amber-500" />
    case "none":
      return <Minus className="w-5 h-5 text-gray-500 dark:text-gray-400" />
  }
}

export function ResearchPage() {
  const [activeTab, setActiveTab] = useState("feed")
  const [selectedSupplement, setSelectedSupplement] = useState("all")
  const [selectedOutcome, setSelectedOutcome] = useState("all")
  const [qualityFilter, setQualityFilter] = useState<QualityLevel[]>(["high", "moderate", "low"])
  const [relevanceThreshold, setRelevanceThreshold] = useState(50)

  // Sample studies data
  const studies: Study[] = [
    {
      id: 1,
      title: "Vitamin D Supplementation and Immune Function: A Systematic Review",
      journal: "Journal of Clinical Immunology",
      date: "Dec 2024",
      participants: "12,847",
      type: "Meta-Analysis",
      tags: ["Vitamin D", "Immune Function", "Meta-Analysis"],
      quality: "high",
      outcome: "positive",
      clinicalSignificance: "significant",
      effectSize: 78,
      confidenceInterval: "95% CI: 0.65-0.89",
      dosage: "2000-4000 IU daily",
      duration: "12-24 weeks",
      costEffectiveness: 85,
      safetyProfile: 95,
      relevanceScore: 92,
    },
    {
      id: 2,
      title: "Omega-3 Fatty Acids and Cardiovascular Health: Updated Guidelines",
      journal: "Journal of the American Heart Association",
      date: "3 days ago",
      participants: "8,542",
      type: "Clinical Trial",
      tags: ["Omega-3", "Heart Health", "Prevention"],
      quality: "high",
      outcome: "positive",
      clinicalSignificance: "moderate",
      effectSize: 65,
      confidenceInterval: "95% CI: 0.52-0.78",
      dosage: "1-2g EPA+DHA daily",
      duration: "24 weeks",
      costEffectiveness: 70,
      safetyProfile: 90,
      relevanceScore: 85,
    },
    {
      id: 3,
      title: "Magnesium Supplementation for Sleep Quality in Adults",
      journal: "Sleep Medicine Reviews",
      date: "1 week ago",
      participants: "2,156",
      type: "RCT",
      tags: ["Magnesium", "Sleep", "Insomnia"],
      quality: "moderate",
      outcome: "mixed",
      clinicalSignificance: "moderate",
      effectSize: 58,
      confidenceInterval: "95% CI: 0.42-0.74",
      dosage: "300-400mg daily",
      duration: "8 weeks",
      costEffectiveness: 90,
      safetyProfile: 95,
      relevanceScore: 78,
    },
    {
      id: 4,
      title: "Probiotics and Gut Microbiome Diversity: Long-term Effects",
      journal: "Nature Microbiology",
      date: "2 weeks ago",
      participants: "1,847",
      type: "Longitudinal Study",
      tags: ["Probiotics", "Gut Health", "Microbiome"],
      quality: "high",
      outcome: "positive",
      clinicalSignificance: "significant",
      effectSize: 72,
      confidenceInterval: "95% CI: 0.61-0.83",
      dosage: "10-30 billion CFU daily",
      duration: "12 weeks",
      costEffectiveness: 75,
      safetyProfile: 98,
      relevanceScore: 88,
    },
    {
      id: 5,
      title: "Creatine Supplementation in Aging Adults: Cognitive Benefits",
      journal: "Neurology",
      date: "3 weeks ago",
      participants: "956",
      type: "Double-Blind RCT",
      tags: ["Creatine", "Cognitive Health", "Aging"],
      quality: "high",
      outcome: "positive",
      clinicalSignificance: "moderate",
      effectSize: 62,
      confidenceInterval: "95% CI: 0.48-0.76",
      dosage: "5g daily",
      duration: "12 weeks",
      costEffectiveness: 95,
      safetyProfile: 90,
      relevanceScore: 82,
    },
    {
      id: 6,
      title: "Vitamin B12 Deficiency: Prevalence and Supplementation Strategies",
      journal: "American Journal of Clinical Nutrition",
      date: "1 month ago",
      participants: "15,234",
      type: "Cross-sectional Study",
      tags: ["Vitamin B12", "Deficiency", "Supplementation"],
      quality: "moderate",
      outcome: "positive",
      clinicalSignificance: "significant",
      effectSize: 75,
      confidenceInterval: "95% CI: 0.64-0.86",
      dosage: "500-1000mcg daily",
      duration: "Ongoing",
      costEffectiveness: 85,
      safetyProfile: 98,
      relevanceScore: 90,
    },
    {
      id: 7,
      title: "Ashwagandha for Stress and Anxiety: Systematic Review",
      journal: "Phytotherapy Research",
      date: "1 month ago",
      participants: "3,421",
      type: "Systematic Review",
      tags: ["Ashwagandha", "Stress", "Anxiety"],
      quality: "high",
      outcome: "positive",
      clinicalSignificance: "moderate",
      effectSize: 68,
      confidenceInterval: "95% CI: 0.55-0.81",
      dosage: "300-600mg daily",
      duration: "8 weeks",
      costEffectiveness: 80,
      safetyProfile: 85,
      relevanceScore: 75,
    },
    {
      id: 8,
      title: "Zinc Supplementation and Common Cold Duration: Meta-analysis",
      journal: "Clinical Infectious Diseases",
      date: "2 months ago",
      participants: "7,842",
      type: "Meta-Analysis",
      tags: ["Zinc", "Common Cold", "Immune Support"],
      quality: "moderate",
      outcome: "mixed",
      clinicalSignificance: "minimal",
      effectSize: 45,
      confidenceInterval: "95% CI: 0.32-0.58",
      dosage: "75-100mg daily (acute)",
      duration: "7-10 days",
      costEffectiveness: 65,
      safetyProfile: 75,
      relevanceScore: 68,
    },
  ]

  // Filter studies based on selected supplement, outcome, and quality
  const filteredStudies = studies.filter((study) => {
    // Filter by supplement
    const supplementMatch =
      selectedSupplement === "all" ||
      study.tags.some((tag) => tag.toLowerCase().includes(selectedSupplement.toLowerCase()))

    // Filter by outcome
    const outcomeMatch =
      selectedOutcome === "all" || study.tags.some((tag) => tag.toLowerCase().includes(selectedOutcome.toLowerCase()))

    // Filter by quality
    const qualityMatch = qualityFilter.includes(study.quality)

    // Filter by relevance score
    const relevanceMatch = study.relevanceScore >= relevanceThreshold

    return supplementMatch && outcomeMatch && qualityMatch && relevanceMatch
  })

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <main className="pt-20">
        <div className="container mx-auto px-4 py-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
              <Brain className="w-4 h-4 mr-2" />
              Supplement Intelligence Platform
            </div>
            <h1 className="text-5xl font-bold text-gray-900 dark:text-gray-50 mb-6">
              Research Database
              <br />
              <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent dark:from-primary dark:to-blue-400">
                Evidence-Based Intelligence
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
              Access our comprehensive research intelligence platform with evidence scoring, quality assessment, and
              real-time data processing.
            </p>

            {/* Intelligence Pipeline Section */}
            <div className="max-w-6xl mx-auto mb-16">
              <IntelligencePipeline />
            </div>

            {/* Supplement and Outcome Selection */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto mb-8">
              <Select value={selectedSupplement} onValueChange={setSelectedSupplement}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Supplement" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Supplements</SelectItem>
                  <SelectItem value="vitamin d">Vitamin D</SelectItem>
                  <SelectItem value="omega-3">Omega-3</SelectItem>
                  <SelectItem value="magnesium">Magnesium</SelectItem>
                  <SelectItem value="probiotics">Probiotics</SelectItem>
                  <SelectItem value="creatine">Creatine</SelectItem>
                  <SelectItem value="vitamin b12">Vitamin B12</SelectItem>
                  <SelectItem value="ashwagandha">Ashwagandha</SelectItem>
                  <SelectItem value="zinc">Zinc</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedOutcome} onValueChange={setSelectedOutcome}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Outcome" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Outcomes</SelectItem>
                  <SelectItem value="immune">Immune Function</SelectItem>
                  <SelectItem value="heart">Heart Health</SelectItem>
                  <SelectItem value="sleep">Sleep</SelectItem>
                  <SelectItem value="gut">Gut Health</SelectItem>
                  <SelectItem value="cognitive">Cognitive Health</SelectItem>
                  <SelectItem value="stress">Stress & Anxiety</SelectItem>
                </SelectContent>
              </Select>

              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input placeholder="Search research..." className="pl-10" />
              </div>
            </div>

            {/* Advanced Filters */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm mb-8 max-w-3xl mx-auto">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium text-gray-900 dark:text-gray-100">Advanced Filters</h3>
                <Button variant="ghost" size="sm">
                  Reset
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Study Quality
                  </label>
                  <div className="flex gap-2">
                    <Button
                      variant={qualityFilter.includes("high") ? "default" : "outline"}
                      size="sm"
                      onClick={() => {
                        if (qualityFilter.includes("high")) {
                          setQualityFilter(qualityFilter.filter((q) => q !== "high"))
                        } else {
                          setQualityFilter([...qualityFilter, "high"])
                        }
                      }}
                      className={qualityFilter.includes("high") ? "bg-green-600 hover:bg-green-700" : ""}
                    >
                      <CheckCircle2 className="w-4 h-4 mr-1" />
                      High
                    </Button>
                    <Button
                      variant={qualityFilter.includes("moderate") ? "default" : "outline"}
                      size="sm"
                      onClick={() => {
                        if (qualityFilter.includes("moderate")) {
                          setQualityFilter(qualityFilter.filter((q) => q !== "moderate"))
                        } else {
                          setQualityFilter([...qualityFilter, "moderate"])
                        }
                      }}
                      className={qualityFilter.includes("moderate") ? "bg-amber-500 hover:bg-amber-600" : ""}
                    >
                      <HelpCircle className="w-4 h-4 mr-1" />
                      Moderate
                    </Button>
                    <Button
                      variant={qualityFilter.includes("low") ? "default" : "outline"}
                      size="sm"
                      onClick={() => {
                        if (qualityFilter.includes("low")) {
                          setQualityFilter(qualityFilter.filter((q) => q !== "low"))
                        } else {
                          setQualityFilter([...qualityFilter, "low"])
                        }
                      }}
                      className={qualityFilter.includes("low") ? "bg-red-500 hover:bg-red-600" : ""}
                    >
                      <XCircle className="w-4 h-4 mr-1" />
                      Low
                    </Button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Minimum Relevance Score: {relevanceThreshold}%
                  </label>
                  <Slider
                    value={[relevanceThreshold]}
                    onValueChange={(value) => setRelevanceThreshold(value[0])}
                    min={0}
                    max={100}
                    step={5}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="feed">
                <TrendingUp className="w-4 h-4 mr-2" />
                Research Feed
              </TabsTrigger>
              <TabsTrigger value="saved">
                <Bookmark className="w-4 h-4 mr-2" />
                Saved Studies
              </TabsTrigger>
            </TabsList>

            <TabsContent value="feed" className="space-y-6">
              {/* Research Feed Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <Card>
                  <CardContent className="p-4 flex items-center">
                    <Beaker className="w-8 h-8 text-blue-500 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Studies Found</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-gray-50">{filteredStudies.length}</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4 flex items-center">
                    <CheckCircle2 className="w-8 h-8 text-green-500 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Positive Outcomes</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-gray-50">
                        {filteredStudies.filter((s) => s.outcome === "positive").length}
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4 flex items-center">
                    <Users className="w-8 h-8 text-purple-500 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Total Participants</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-gray-50">
                        {filteredStudies
                          .reduce((sum, study) => sum + Number.parseInt(study.participants.replace(/,/g, "")), 0)
                          .toLocaleString()}
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4 flex items-center">
                    <Calendar className="w-8 h-8 text-amber-500 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Latest Study</p>
                      <p className="text-lg font-bold text-gray-900 dark:text-gray-50">
                        {filteredStudies.length > 0 ? filteredStudies[0].date : "N/A"}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Featured Research */}
              {filteredStudies.length > 0 && (
                <Card className="border-green-200 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950/30 dark:to-blue-950/30 dark:border-green-900">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <Badge className="bg-green-600 text-white">Featured Study</Badge>
                      <Badge variant="outline">{filteredStudies[0].type}</Badge>
                    </div>
                    <CardTitle className="text-xl">{filteredStudies[0].title}</CardTitle>
                    <CardDescription>{filteredStudies[0].journal}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {/* Study Score Card */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 mb-4 shadow-sm">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-3">
                        Study Outcome Summary
                      </h3>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div className="flex flex-col items-center p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                                {getOutcomeIcon(filteredStudies[0].outcome)}
                                <span className="text-sm font-medium mt-1 text-gray-700 dark:text-gray-300">
                                  {filteredStudies[0].outcome.charAt(0).toUpperCase() +
                                    filteredStudies[0].outcome.slice(1)}{" "}
                                  Outcome
                                </span>
                              </div>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Overall study outcome based on primary endpoints</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>

                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div className="flex flex-col items-center p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                                {getQualityIcon(filteredStudies[0].quality)}
                                <span className="text-sm font-medium mt-1 text-gray-700 dark:text-gray-300">
                                  {filteredStudies[0].quality.charAt(0).toUpperCase() +
                                    filteredStudies[0].quality.slice(1)}{" "}
                                  Quality
                                </span>
                              </div>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Study quality based on methodology, sample size, and controls</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>

                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div className="flex flex-col items-center p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                                {getClinicalIcon(filteredStudies[0].clinicalSignificance)}
                                <span className="text-sm font-medium mt-1 text-gray-700 dark:text-gray-300">
                                  {filteredStudies[0].clinicalSignificance.charAt(0).toUpperCase() +
                                    filteredStudies[0].clinicalSignificance.slice(1)}{" "}
                                  Impact
                                </span>
                              </div>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Clinical significance of the observed effects</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>

                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div className="flex flex-col items-center p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                                <div className="relative w-10 h-10 flex items-center justify-center">
                                  <svg className="w-10 h-10" viewBox="0 0 36 36">
                                    <path
                                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                      fill="none"
                                      stroke="#E5E7EB"
                                      strokeWidth="3"
                                      className="dark:stroke-gray-700"
                                    />
                                    <path
                                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                      fill="none"
                                      stroke={
                                        filteredStudies[0].effectSize > 70
                                          ? "#10B981"
                                          : filteredStudies[0].effectSize > 40
                                            ? "#F59E0B"
                                            : "#EF4444"
                                      }
                                      strokeWidth="3"
                                      strokeDasharray={`${filteredStudies[0].effectSize}, 100`}
                                    />
                                  </svg>
                                  <span className="absolute text-sm font-semibold">
                                    {filteredStudies[0].effectSize}%
                                  </span>
                                </div>
                                <span className="text-sm font-medium mt-1 text-gray-700 dark:text-gray-300">
                                  Effect Size
                                </span>
                              </div>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Magnitude of the observed effect</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Dosage</p>
                          <div className="flex items-center">
                            <Pill className="w-4 h-4 mr-2 text-blue-500" />
                            <p className="font-medium text-gray-900 dark:text-gray-100">{filteredStudies[0].dosage}</p>
                          </div>
                        </div>

                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Duration</p>
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-2 text-purple-500" />
                            <p className="font-medium text-gray-900 dark:text-gray-100">
                              {filteredStudies[0].duration}
                            </p>
                          </div>
                        </div>

                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Confidence Interval</p>
                          <div className="flex items-center">
                            <Percent className="w-4 h-4 mr-2 text-amber-500" />
                            <p className="font-medium text-gray-900 dark:text-gray-100">
                              {filteredStudies[0].confidenceInterval}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Cost-Effectiveness</p>
                        <Progress value={filteredStudies[0].costEffectiveness} className="h-2" />
                        <div className="flex items-center justify-between mt-1">
                          <DollarSign className="w-4 h-4 text-green-500" />
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {filteredStudies[0].costEffectiveness}%
                          </span>
                        </div>
                      </div>

                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Safety Profile</p>
                        <Progress value={filteredStudies[0].safetyProfile} className="h-2" />
                        <div className="flex items-center justify-between mt-1">
                          <ShieldIcon className="w-4 h-4 text-blue-500" />
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {filteredStudies[0].safetyProfile}%
                          </span>
                        </div>
                      </div>

                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Relevance Score</p>
                        <Progress value={filteredStudies[0].relevanceScore} className="h-2" />
                        <div className="flex items-center justify-between mt-1">
                          <Target className="w-4 h-4 text-purple-500" />
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {filteredStudies[0].relevanceScore}%
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-6 text-sm text-gray-600 dark:text-gray-400 mb-4">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        Published: {filteredStudies[0].date}
                      </div>
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        {filteredStudies[0].participants} participants
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex space-x-2">
                        {filteredStudies[0].tags.map((tag, tagIndex) => (
                          <Badge key={tagIndex} variant="secondary" className="dark:bg-gray-700">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <Button variant="outline" size="sm">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Read Study
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Research Feed */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredStudies.slice(1).map((study, index) => (
                  <Card key={index} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline">{study.type}</Badge>
                        <div className="flex items-center">
                          {getQualityIcon(study.quality)}
                          <span className="ml-1 text-sm">
                            {study.quality.charAt(0).toUpperCase() + study.quality.slice(1)}
                          </span>
                        </div>
                      </div>
                      <CardTitle className="text-lg leading-tight">{study.title}</CardTitle>
                      <CardDescription>{study.journal}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {/* Study Outcome Summary */}
                      <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-3 mb-3">
                        <div className="grid grid-cols-3 gap-2">
                          <div className="flex flex-col items-center">
                            {getOutcomeIcon(study.outcome)}
                            <span className="text-xs font-medium mt-1 text-gray-700 dark:text-gray-300">
                              {study.outcome.charAt(0).toUpperCase() + study.outcome.slice(1)}
                            </span>
                          </div>

                          <div className="flex flex-col items-center">
                            {getClinicalIcon(study.clinicalSignificance)}
                            <span className="text-xs font-medium mt-1 text-gray-700 dark:text-gray-300">
                              {study.clinicalSignificance.charAt(0).toUpperCase() + study.clinicalSignificance.slice(1)}
                            </span>
                          </div>

                          <div className="flex flex-col items-center">
                            <div className="relative w-8 h-8 flex items-center justify-center">
                              <svg className="w-8 h-8" viewBox="0 0 36 36">
                                <path
                                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                  fill="none"
                                  stroke="#E5E7EB"
                                  strokeWidth="3"
                                  className="dark:stroke-gray-700"
                                />
                                <path
                                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                  fill="none"
                                  stroke={
                                    study.effectSize > 70 ? "#10B981" : study.effectSize > 40 ? "#F59E0B" : "#EF4444"
                                  }
                                  strokeWidth="3"
                                  strokeDasharray={`${study.effectSize}, 100`}
                                />
                              </svg>
                              <span className="absolute text-xs font-semibold">{study.effectSize}%</span>
                            </div>
                            <span className="text-xs font-medium mt-1 text-gray-700 dark:text-gray-300">Effect</span>
                          </div>
                        </div>
                      </div>

                      {/* Key Study Information */}
                      <div className="grid grid-cols-2 gap-2 mb-3 text-sm">
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Dosage</p>
                          <p className="font-medium text-gray-900 dark:text-gray-100">{study.dosage}</p>
                        </div>

                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Duration</p>
                          <p className="font-medium text-gray-900 dark:text-gray-100">{study.duration}</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400 mb-3">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {study.date}
                        </div>
                        <div className="flex items-center">
                          <Users className="w-4 h-4 mr-1" />
                          {study.participants}
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1 mb-4">
                        {study.tags.map((tag, tagIndex) => (
                          <Badge key={tagIndex} variant="secondary" className="text-xs dark:bg-gray-700">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center justify-between">
                        <Button variant="ghost" size="sm">
                          <Bookmark className="w-4 h-4 mr-2" />
                          Save
                        </Button>
                        <Button variant="outline" size="sm">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Read
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {filteredStudies.length === 0 && (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <Info className="w-12 h-12 text-gray-300 dark:text-gray-600 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                      No studies match your criteria
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 text-center max-w-md mb-4">
                      Try adjusting your filters or selecting different supplements/outcomes to see more research.
                    </p>
                    <Button
                      onClick={() => {
                        setSelectedSupplement("all")
                        setSelectedOutcome("all")
                        setQualityFilter(["high", "moderate", "low"])
                        setRelevanceThreshold(50)
                      }}
                    >
                      Reset Filters
                    </Button>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="saved" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Your Saved Studies</CardTitle>
                  <CardDescription>Research papers and studies you've bookmarked for later reading</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <Bookmark className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">No saved studies yet</h3>
                    <p className="text-gray-500 dark:text-gray-400 mb-4">
                      Start saving interesting research papers to build your personal library
                    </p>
                    <Button onClick={() => setActiveTab("feed")}>Browse Research Feed</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  )
}

// Missing components
function Target(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  )
}
