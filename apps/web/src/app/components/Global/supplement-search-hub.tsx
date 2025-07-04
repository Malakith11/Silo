"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Badge } from "../ui/badge"
import { Progress } from "../ui/progress"
import {
  Search,
  TrendingUp,
  Shield,
  FlaskConical,
  AlertTriangle,
  Star,
  Users,
  ChevronRight,
  Pill,
  BarChart3,
  CheckCircle,
} from "lucide-react"

// Mock comprehensive supplement data
const SUPPLEMENT_DATABASE = [
  {
    id: "vitamin-d3",
    name: "Vitamin D3",
    category: "Vitamins",
    description: "Essential vitamin for bone health, immune function, and mood regulation",
    // Research Data
    research: {
      studyCount: 2847,
      efficacyScore: 92,
      evidenceLevel: "High",
      lastUpdated: "2024-01-15",
      topBenefits: ["Bone Health", "Immune Support", "Mood"],
      riskLevel: "Low",
    },
    // Quality/Audit Data
    audit: {
      overallScore: 85,
      brandCount: 156,
      testedProducts: 89,
      topBrands: ["Thorne", "Life Extension", "Nordic Naturals"],
      commonIssues: ["Dosage variance", "Absorption concerns"],
      certifications: ["USP", "NSF", "GMP"],
    },
    // User Data
    userData: {
      userCount: 45600,
      satisfactionScore: 4.3,
      adherenceRate: 78,
      popularDosages: ["1000 IU", "2000 IU", "5000 IU"],
      commonGoals: ["Bone Health", "Immune Support", "Energy"],
    },
    // Regulatory Data
    regulatory: {
      status: "Generally Recognized as Safe",
      warnings: [],
      recentUpdates: ["FDA dosage guidelines updated"],
      restrictions: "None",
      lastReview: "2023-12-01",
    },
    // Market Data
    market: {
      averagePrice: 18.5,
      priceRange: "$8 - $45",
      trending: "stable",
      popularityRank: 3,
      seasonalTrends: "Higher in winter months",
    },
  },
  {
    id: "omega-3",
    name: "Omega-3 Fish Oil",
    category: "Essential Fatty Acids",
    description: "Essential fatty acids supporting heart, brain, and joint health",
    research: {
      studyCount: 3421,
      efficacyScore: 88,
      evidenceLevel: "High",
      lastUpdated: "2024-01-12",
      topBenefits: ["Heart Health", "Brain Function", "Inflammation"],
      riskLevel: "Low",
    },
    audit: {
      overallScore: 79,
      brandCount: 203,
      testedProducts: 127,
      topBrands: ["Nordic Naturals", "Carlson", "Sports Research"],
      commonIssues: ["Mercury contamination", "Rancidity", "Label accuracy"],
      certifications: ["IFOS", "USP", "NSF"],
    },
    userData: {
      userCount: 38200,
      satisfactionScore: 4.1,
      adherenceRate: 72,
      popularDosages: ["1000mg", "1200mg", "2000mg"],
      commonGoals: ["Heart Health", "Brain Health", "Joint Support"],
    },
    regulatory: {
      status: "Generally Recognized as Safe",
      warnings: ["Blood thinning interactions"],
      recentUpdates: ["Mercury testing requirements updated"],
      restrictions: "Dosage limits for certain populations",
      lastReview: "2023-11-15",
    },
    market: {
      averagePrice: 24.75,
      priceRange: "$12 - $65",
      trending: "up",
      popularityRank: 2,
      seasonalTrends: "Consistent year-round",
    },
  },
  {
    id: "magnesium-glycinate",
    name: "Magnesium Glycinate",
    category: "Minerals",
    description: "Highly bioavailable form of magnesium for sleep, muscle, and nerve function",
    research: {
      studyCount: 1876,
      efficacyScore: 86,
      evidenceLevel: "Moderate-High",
      lastUpdated: "2024-01-10",
      topBenefits: ["Sleep Quality", "Muscle Function", "Stress Relief"],
      riskLevel: "Very Low",
    },
    audit: {
      overallScore: 82,
      brandCount: 89,
      testedProducts: 54,
      topBrands: ["Thorne", "Pure Encapsulations", "Doctor's Best"],
      commonIssues: ["Dosage accuracy", "Chelation quality"],
      certifications: ["USP", "GMP", "Third-party tested"],
    },
    userData: {
      userCount: 28900,
      satisfactionScore: 4.4,
      adherenceRate: 81,
      popularDosages: ["200mg", "400mg", "500mg"],
      commonGoals: ["Sleep", "Stress Relief", "Muscle Recovery"],
    },
    regulatory: {
      status: "Generally Recognized as Safe",
      warnings: [],
      recentUpdates: [],
      restrictions: "High doses may cause digestive upset",
      lastReview: "2023-10-20",
    },
    market: {
      averagePrice: 22.3,
      priceRange: "$15 - $40",
      trending: "up",
      popularityRank: 8,
      seasonalTrends: "Higher demand in winter",
    },
  },
]

type Supplement = typeof SUPPLEMENT_DATABASE[number];
type SupplementSearchResultProps = {
  supplement: Supplement;
  onNavigate: (databasePath: string, supplementId: string) => void;
};

function SupplementSearchResult({ supplement, onNavigate }: SupplementSearchResultProps) {
  const getScoreColor = (score: number) => {
    if (score >= 85) return "text-green-600 dark:text-green-400"
    if (score >= 70) return "text-yellow-600 dark:text-yellow-400"
    return "text-red-600 dark:text-red-400"
  }

  const getTrendIcon = (trend: string) => {
    if (trend === "up") return <TrendingUp className="w-4 h-4 text-green-500" />
    if (trend === "down") return <TrendingUp className="w-4 h-4 text-red-500 rotate-180" />
    return <TrendingUp className="w-4 h-4 text-gray-500" />
  }

  const getRiskBadge = (
    risk: "Very Low" | "Low" | "Moderate" | "High" | string
  ) => {
    const colors: Record<"Very Low" | "Low" | "Moderate" | "High", string> = {
      "Very Low": "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400",
      Low: "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400",
      Moderate: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400",
      High: "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400",
    }
    return colors[risk as "Very Low" | "Low" | "Moderate" | "High"] || colors["Low"]
  }

  return (
    <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-white/20 dark:border-gray-700/50">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-xl font-bold text-gray-900 dark:text-gray-100">{supplement.name}</CardTitle>
            <CardDescription className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {supplement.description}
            </CardDescription>
            <div className="flex items-center gap-2 mt-2">
              <Badge variant="outline">{supplement.category}</Badge>
              <Badge className={getRiskBadge(supplement.research.riskLevel)}>
                {supplement.research.riskLevel} Risk
              </Badge>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              #{supplement.market.popularityRank}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Popularity</div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
              {supplement.research.studyCount.toLocaleString()}
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">Studies</div>
          </div>
          <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <div className="text-lg font-bold text-green-600 dark:text-green-400">
              {supplement.userData.userCount.toLocaleString()}
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">Users</div>
          </div>
          <div className="text-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
            <div className="text-lg font-bold text-purple-600 dark:text-purple-400">{supplement.audit.brandCount}</div>
            <div className="text-xs text-gray-600 dark:text-gray-400">Brands</div>
          </div>
          <div className="text-center p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
            <div className="text-lg font-bold text-orange-600 dark:text-orange-400">
              {supplement.market.averagePrice.toLocaleString("en-US", { style: "currency", currency: "USD" })}
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">Avg Price</div>
          </div>
        </div>

        {/* Database Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Research Section */}
          <Card
            className="cursor-pointer hover:shadow-md transition-all duration-200 hover:scale-[1.02] bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/10 dark:to-indigo-900/10 border-blue-200 dark:border-blue-800"
            onClick={() => onNavigate("/database/research", supplement.id)}
          >
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FlaskConical className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <CardTitle className="text-sm font-semibold">Research Data</CardTitle>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Efficacy Score</span>
                <div className="flex items-center gap-2">
                  <Progress value={supplement.research.efficacyScore} className="w-16 h-2" />
                  <span className={`text-sm font-bold ${getScoreColor(supplement.research.efficacyScore)}`}>
                    {supplement.research.efficacyScore}%
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Evidence Level</span>
                <Badge variant="outline" className="text-xs">
                  {supplement.research.evidenceLevel}
                </Badge>
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                Top Benefits: {supplement.research.topBenefits.slice(0, 2).join(", ")}
              </div>
            </CardContent>
          </Card>

          {/* Audit Section */}
          <Card
            className="cursor-pointer hover:shadow-md transition-all duration-200 hover:scale-[1.02] bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/10 dark:to-emerald-900/10 border-green-200 dark:border-green-800"
            onClick={() => onNavigate("/database/audit", supplement.id)}
          >
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-green-600 dark:text-green-400" />
                  <CardTitle className="text-sm font-semibold">Quality Audit</CardTitle>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Overall Score</span>
                <div className="flex items-center gap-2">
                  <Progress value={supplement.audit.overallScore} className="w-16 h-2" />
                  <span className={`text-sm font-bold ${getScoreColor(supplement.audit.overallScore)}`}>
                    {supplement.audit.overallScore}%
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Tested Products</span>
                <span className="text-sm font-medium">{supplement.audit.testedProducts}</span>
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                Top Brands: {supplement.audit.topBrands.slice(0, 2).join(", ")}
              </div>
            </CardContent>
          </Card>

          {/* User Data Section */}
          <Card
            className="cursor-pointer hover:shadow-md transition-all duration-200 hover:scale-[1.02] bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-900/10 dark:to-violet-900/10 border-purple-200 dark:border-purple-800"
            onClick={() => onNavigate("/database", supplement.id)}
          >
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  <CardTitle className="text-sm font-semibold">User Insights</CardTitle>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Satisfaction</span>
                <div className="flex items-center gap-1">
                  <Star className="w-3 h-3 text-yellow-500 fill-current" />
                  <span className="text-sm font-medium">{supplement.userData.satisfactionScore}/5</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Adherence Rate</span>
                <span className="text-sm font-medium">{supplement.userData.adherenceRate}%</span>
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                Common Goals: {supplement.userData.commonGoals.slice(0, 2).join(", ")}
              </div>
            </CardContent>
          </Card>

          {/* Regulatory Section */}
          <Card
            className="cursor-pointer hover:shadow-md transition-all duration-200 hover:scale-[1.02] bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/10 dark:to-red-900/10 border-orange-200 dark:border-orange-800"
            onClick={() => onNavigate("/regulatory-digest", supplement.id)}
          >
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                  <CardTitle className="text-sm font-semibold">Regulatory Status</CardTitle>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Status</span>
                <div className="flex items-center gap-1">
                  <CheckCircle className="w-3 h-3 text-green-500" />
                  <span className="text-xs font-medium">Safe</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Warnings</span>
                <span className="text-sm font-medium">{supplement.regulatory.warnings.length || "None"}</span>
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                Last Review: {new Date(supplement.regulatory.lastReview).toLocaleDateString()}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Market Trends */}
        <Card className="bg-gradient-to-r from-gray-50 to-slate-50 dark:from-gray-900/20 dark:to-slate-900/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Market Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="flex items-center justify-center gap-1 mb-1">
                  {getTrendIcon(supplement.market.trending)}
                  <span className="text-sm font-medium">Trending</span>
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 capitalize">{supplement.market.trending}</div>
              </div>
              <div>
                <div className="text-sm font-medium mb-1">Price Range</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">{supplement.market.priceRange}</div>
              </div>
              <div>
                <div className="text-sm font-medium mb-1">Popularity</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Rank #{supplement.market.popularityRank}</div>
              </div>
              <div>
                <div className="text-sm font-medium mb-1">Seasonal</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">{supplement.market.seasonalTrends}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  )
}

export function SupplementSearchHub() {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<Supplement[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [selectedSupplement, setSelectedSupplement] = useState(null)
  const router = useRouter()

  useEffect(() => {
    if (searchQuery.trim()) {
      setIsSearching(true)
      // Simulate search delay
      const timer = setTimeout(() => {
        const results = SUPPLEMENT_DATABASE.filter(
          (supplement) =>
            supplement.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            supplement.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
            supplement.description.toLowerCase().includes(searchQuery.toLowerCase()),
        )
        setSearchResults(results)
        setIsSearching(false)
      }, 300)

      return () => clearTimeout(timer)
    } else {
      setSearchResults([])
    }
  }, [searchQuery])

  const handleNavigateToDatabase = (databasePath: any, supplementId: any) => {
    // Store the supplement context for the target page
    sessionStorage.setItem(
      "searchedSupplement",
      JSON.stringify({
        id: supplementId,
        query: searchQuery,
        timestamp: Date.now(),
      }),
    )

    router.push(`${databasePath}?supplement=${supplementId}&from=search`)
  }

  return (
    <div className="space-y-6">
      {/* Search Header */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <Search className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            Supplement Intelligence Hub
          </CardTitle>
          <CardDescription>Search any supplement to see comprehensive data from all our databases</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search for any supplement (e.g., Vitamin D, Omega-3, Magnesium)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 text-lg bg-white dark:bg-gray-800"
            />
          </div>

          {searchQuery && (
            <div className="mt-4 flex flex-wrap gap-2">
              <Badge variant="outline" className="text-xs">
                <FlaskConical className="w-3 h-3 mr-1" />
                Research Data
              </Badge>
              <Badge variant="outline" className="text-xs">
                <Shield className="w-3 h-3 mr-1" />
                Quality Scores
              </Badge>
              <Badge variant="outline" className="text-xs">
                <Users className="w-3 h-3 mr-1" />
                User Insights
              </Badge>
              <Badge variant="outline" className="text-xs">
                <AlertTriangle className="w-3 h-3 mr-1" />
                Regulatory Status
              </Badge>
              <Badge variant="outline" className="text-xs">
                <BarChart3 className="w-3 h-3 mr-1" />
                Market Trends
              </Badge>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Search Results */}
      {isSearching && (
        <Card>
          <CardContent className="py-8">
            <div className="flex items-center justify-center space-x-2">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
              <span className="text-gray-600 dark:text-gray-400">Searching databases...</span>
            </div>
          </CardContent>
        </Card>
      )}

      {searchResults.length > 0 && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Search Results ({searchResults.length})
            </h3>
            <Button variant="outline" size="sm" onClick={() => setSearchQuery("")}>
              Clear Search
            </Button>
          </div>

          {searchResults.map((supplement) => (
            <SupplementSearchResult key={supplement.id} supplement={supplement} onNavigate={handleNavigateToDatabase} />
          ))}
        </div>
      )}

      {searchQuery && searchResults.length === 0 && !isSearching && (
        <Card>
          <CardContent className="py-8 text-center">
            <Pill className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">No supplements found</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              We couldn't find any supplements matching "{searchQuery}"
            </p>
            <Button variant="outline" onClick={() => setSearchQuery("")}>
              Clear Search
            </Button>
          </CardContent>
        </Card>
      )}

      {!searchQuery && (
        <Card>
          <CardContent className="py-8 text-center">
            <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">Start Your Search</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Enter a supplement name to see comprehensive data from all our databases
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {["Vitamin D", "Omega-3", "Magnesium", "Probiotics", "B-Complex"].map((suggestion) => (
                <Button key={suggestion} variant="outline" size="sm" onClick={() => setSearchQuery(suggestion)}>
                  {suggestion}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
