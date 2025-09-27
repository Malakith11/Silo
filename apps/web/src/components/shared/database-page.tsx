"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { Badge } from "../ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import { Progress } from "../ui/progress"
import {
  Database,
  Users,
  FlaskConical,
  Shield,
  Building2,
  TrendingUp,
  BarChart3,
  Eye,
  Lock,
  CheckCircle,
  ArrowLeft,
  Download,
  Calendar,
  Globe,
} from "lucide-react"
import { ThemeToggle } from "./theme-toggle"
import { SupplementSearchHub } from "./supplement-search-hub"

export function DatabasePage() {
  const [activeTab, setActiveTab] = useState("search")

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-blue-950 dark:to-indigo-950">
      {/* Header */}
      <div className="border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" asChild>
                <a href="/" className="flex items-center space-x-2">
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Home</span>
                </a>
              </Button>
              <div className="h-6 w-px bg-gray-300 dark:bg-gray-600" />
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Database className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">Silo Database</h1>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Complete transparency into our data</p>
                </div>
              </div>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-white/20 dark:border-gray-700/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Records</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">2.4M+</div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Across all databases</p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-white/20 dark:border-gray-700/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">Research Studies</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">45,000+</div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Clinical trials & studies</p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-white/20 dark:border-gray-700/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">User Responses</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">1.8M+</div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Aggregated & anonymized</p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-white/20 dark:border-gray-700/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Quality Assessments
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">12,500+</div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Products & brands</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <TabsTrigger value="search">Search Hub</TabsTrigger>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="user-data">User Data</TabsTrigger>
            <TabsTrigger value="research">Research</TabsTrigger>
            <TabsTrigger value="quality">Quality</TabsTrigger>
            <TabsTrigger value="privacy">Privacy</TabsTrigger>
          </TabsList>

          <TabsContent value="search" className="space-y-6">
            <SupplementSearchHub />
          </TabsContent>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Database Architecture */}
              <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-white/20 dark:border-gray-700/50">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Database className="w-5 h-5" />
                    <span>Database Architecture</span>
                  </CardTitle>
                  <CardDescription>Our multi-database system ensures data integrity and transparency</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Users className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                        <span className="font-medium text-gray-900 dark:text-gray-100">User Response DB</span>
                      </div>
                      <Badge variant="secondary">1.8M records</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <FlaskConical className="w-4 h-4 text-green-600 dark:text-green-400" />
                        <span className="font-medium text-gray-900 dark:text-gray-100">Research DB</span>
                      </div>
                      <Badge variant="secondary">45K studies</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Shield className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                        <span className="font-medium text-gray-900 dark:text-gray-100">Quality DB</span>
                      </div>
                      <Badge variant="secondary">12.5K products</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Building2 className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                        <span className="font-medium text-gray-900 dark:text-gray-100">Brand DB</span>
                      </div>
                      <Badge variant="secondary">3.2K brands</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Data Sources */}
              <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-white/20 dark:border-gray-700/50">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Globe className="w-5 h-5" />
                    <span>Data Sources</span>
                  </CardTitle>
                  <CardDescription>We aggregate data from trusted, verified sources</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-900 dark:text-gray-100">PubMed/MEDLINE</span>
                      <Badge variant="outline">Primary</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-900 dark:text-gray-100">ClinicalTrials.gov</span>
                      <Badge variant="outline">Primary</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-900 dark:text-gray-100">FDA Databases</span>
                      <Badge variant="outline">Regulatory</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-900 dark:text-gray-100">Third-party Testing</span>
                      <Badge variant="outline">Quality</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-900 dark:text-gray-100">User Submissions</span>
                      <Badge variant="outline">Community</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Update Frequency */}
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-white/20 dark:border-gray-700/50">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5" />
                  <span>Update Frequency</span>
                </CardTitle>
                <CardDescription>How often we refresh data across our databases</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">Real-time</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">User Responses</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400">Daily</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Research Studies</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">Weekly</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Quality Assessments</div>
                  </div>
                  <div className="text-center p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">Monthly</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Brand Information</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="user-data" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Aggregated User Insights */}
              <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-white/20 dark:border-gray-700/50">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="w-5 h-5" />
                    <span>Popular Supplement Categories</span>
                  </CardTitle>
                  <CardDescription>Based on 1.8M+ anonymized user responses</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-900 dark:text-gray-100">Vitamin D</span>
                      <div className="flex items-center space-x-2">
                        <Progress value={85} className="w-20" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">85%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-900 dark:text-gray-100">Omega-3</span>
                      <div className="flex items-center space-x-2">
                        <Progress value={72} className="w-20" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">72%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-900 dark:text-gray-100">Magnesium</span>
                      <div className="flex items-center space-x-2">
                        <Progress value={68} className="w-20" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">68%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-900 dark:text-gray-100">Probiotics</span>
                      <div className="flex items-center space-x-2">
                        <Progress value={61} className="w-20" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">61%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-900 dark:text-gray-100">B-Complex</span>
                      <div className="flex items-center space-x-2">
                        <Progress value={54} className="w-20" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">54%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Adherence Patterns */}
              <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-white/20 dark:border-gray-700/50">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BarChart3 className="w-5 h-5" />
                    <span>Adherence Patterns</span>
                  </CardTitle>
                  <CardDescription>How users stick to their supplement protocols</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <div>
                        <div className="font-medium text-gray-900 dark:text-gray-100">High Adherence</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">90%+ compliance</div>
                      </div>
                      <div className="text-2xl font-bold text-green-600 dark:text-green-400">34%</div>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                      <div>
                        <div className="font-medium text-gray-900 dark:text-gray-100">Moderate Adherence</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">70-89% compliance</div>
                      </div>
                      <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">42%</div>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                      <div>
                        <div className="font-medium text-gray-900 dark:text-gray-100">Low Adherence</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Below 70% compliance</div>
                      </div>
                      <div className="text-2xl font-bold text-red-600 dark:text-red-400">24%</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Stack Popularity */}
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-white/20 dark:border-gray-700/50">
              <CardHeader>
                <CardTitle>Most Popular Stack Combinations</CardTitle>
                <CardDescription>Top supplement combinations based on user data</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <div className="font-medium text-gray-900 dark:text-gray-100 mb-2">Sleep Stack</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                      <div>• Magnesium Glycinate</div>
                      <div>• Melatonin</div>
                      <div>• L-Theanine</div>
                    </div>
                    <div className="mt-2 text-xs text-blue-600 dark:text-blue-400">Used by 28% of users</div>
                  </div>
                  <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <div className="font-medium text-gray-900 dark:text-gray-100 mb-2">Energy Stack</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                      <div>• B-Complex</div>
                      <div>• CoQ10</div>
                      <div>• Iron</div>
                    </div>
                    <div className="mt-2 text-xs text-green-600 dark:text-green-400">Used by 22% of users</div>
                  </div>
                  <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <div className="font-medium text-gray-900 dark:text-gray-100 mb-2">Immune Stack</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                      <div>• Vitamin D3</div>
                      <div>• Zinc</div>
                      <div>• Vitamin C</div>
                    </div>
                    <div className="mt-2 text-xs text-purple-600 dark:text-purple-400">Used by 19% of users</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="research" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Research Database Stats */}
              <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-white/20 dark:border-gray-700/50">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <FlaskConical className="w-5 h-5" />
                    <span>Research Database</span>
                  </CardTitle>
                  <CardDescription>45,000+ clinical studies and research papers</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <div className="text-xl font-bold text-blue-600 dark:text-blue-400">28,500</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Peer-reviewed studies</div>
                    </div>
                    <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <div className="text-xl font-bold text-green-600 dark:text-green-400">16,500</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Clinical trials</div>
                    </div>
                    <div className="text-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                      <div className="text-xl font-bold text-purple-600 dark:text-purple-400">2,400</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Meta-analyses</div>
                    </div>
                    <div className="text-center p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                      <div className="text-xl font-bold text-orange-600 dark:text-orange-400">850</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Systematic reviews</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Study Quality Distribution */}
              <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-white/20 dark:border-gray-700/50">
                <CardHeader>
                  <CardTitle>Study Quality Distribution</CardTitle>
                  <CardDescription>Quality assessment of research in our database</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-900 dark:text-gray-100">High Quality (RCT)</span>
                      <div className="flex items-center space-x-2">
                        <Progress value={45} className="w-20" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">45%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-900 dark:text-gray-100">Medium Quality</span>
                      <div className="flex items-center space-x-2">
                        <Progress value={35} className="w-20" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">35%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-900 dark:text-gray-100">Observational</span>
                      <div className="flex items-center space-x-2">
                        <Progress value={20} className="w-20" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">20%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Research Coverage */}
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-white/20 dark:border-gray-700/50">
              <CardHeader>
                <CardTitle>Research Coverage by Category</CardTitle>
                <CardDescription>Distribution of studies across supplement categories</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-center">
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">8,500</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Vitamins & Minerals</div>
                  </div>
                  <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg text-center">
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400">6,200</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Herbal Supplements</div>
                  </div>
                  <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg text-center">
                    <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">4,800</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Amino Acids</div>
                  </div>
                  <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg text-center">
                    <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">3,400</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Probiotics</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="quality" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Quality Assessment Overview */}
              <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-white/20 dark:border-gray-700/50">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Shield className="w-5 h-5" />
                    <span>Quality Assessment Database</span>
                  </CardTitle>
                  <CardDescription>12,500+ products across 3,200+ brands</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <div className="text-xl font-bold text-green-600 dark:text-green-400">8,200</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Third-party tested</div>
                    </div>
                    <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <div className="text-xl font-bold text-blue-600 dark:text-blue-400">6,800</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">GMP certified</div>
                    </div>
                    <div className="text-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                      <div className="text-xl font-bold text-purple-600 dark:text-purple-400">4,500</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">NSF certified</div>
                    </div>
                    <div className="text-center p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                      <div className="text-xl font-bold text-orange-600 dark:text-orange-400">3,200</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">USP verified</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Brand Quality Scores */}
              <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-white/20 dark:border-gray-700/50">
                <CardHeader>
                  <CardTitle>Brand Quality Distribution</CardTitle>
                  <CardDescription>Quality scores across all assessed brands</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-900 dark:text-gray-100">Excellent (90-100)</span>
                      <div className="flex items-center space-x-2">
                        <Progress value={15} className="w-20" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">15%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-900 dark:text-gray-100">Good (80-89)</span>
                      <div className="flex items-center space-x-2">
                        <Progress value={35} className="w-20" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">35%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-900 dark:text-gray-100">Fair (70-79)</span>
                      <div className="flex items-center space-x-2">
                        <Progress value={30} className="w-20" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">30%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-900 dark:text-gray-100">Poor (Below 70)</span>
                      <div className="flex items-center space-x-2">
                        <Progress value={20} className="w-20" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">20%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quality Metrics */}
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-white/20 dark:border-gray-700/50">
              <CardHeader>
                <CardTitle>Quality Assessment Metrics</CardTitle>
                <CardDescription>Key factors we evaluate for each product and brand</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100">Manufacturing</h4>
                    <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>GMP Certification</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>Facility Inspections</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>Quality Control</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100">Testing</h4>
                    <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>Third-party Testing</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>Purity Analysis</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>Contaminant Screening</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100">Transparency</h4>
                    <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>Ingredient Sourcing</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>COA Availability</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>Label Accuracy</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="privacy" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Privacy Protection */}
              <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-white/20 dark:border-gray-700/50">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Lock className="w-5 h-5" />
                    <span>Privacy Protection</span>
                  </CardTitle>
                  <CardDescription>How we protect user privacy and data</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                      <div>
                        <div className="font-medium text-gray-900 dark:text-gray-100">Data Anonymization</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">All personal identifiers removed</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                      <div>
                        <div className="font-medium text-gray-900 dark:text-gray-100">Data Aggregation</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          Individual responses combined into groups
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                      <div>
                        <div className="font-medium text-gray-900 dark:text-gray-100">Encryption</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          End-to-end encryption for all data
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Data Transparency */}
              <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-white/20 dark:border-gray-700/50">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Eye className="w-5 h-5" />
                    <span>Data Transparency</span>
                  </CardTitle>
                  <CardDescription>What data we collect and how we use it</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <div className="font-medium text-gray-900 dark:text-gray-100 mb-1">Supplement Usage</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        Which supplements users take and dosages
                      </div>
                    </div>
                    <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <div className="font-medium text-gray-900 dark:text-gray-100 mb-1">Effectiveness Ratings</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        User-reported outcomes and satisfaction
                      </div>
                    </div>
                    <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <div className="font-medium text-gray-900 dark:text-gray-100 mb-1">Adherence Patterns</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        How consistently users follow protocols
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Data Usage Policy */}
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-white/20 dark:border-gray-700/50">
              <CardHeader>
                <CardTitle>Data Usage Policy</CardTitle>
                <CardDescription>Our commitment to responsible data use</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-green-600 dark:text-green-400">
                      What We Do
                    </h4>
                    <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>Aggregate data for research insights</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>Improve supplement recommendations</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>Enhance platform functionality</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>Provide transparency reports</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-semibold text-red-600 dark:text-red-400">
                      What We Don't Do
                    </h4>
                    <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 rounded-full bg-red-500 flex items-center justify-center">
                          <div className="w-2 h-0.5 bg-white"></div>
                        </div>
                        <span>Sell personal data to third parties</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 rounded-full bg-red-500 flex items-center justify-center">
                          <div className="w-2 h-0.5 bg-white"></div>
                        </div>
                        <span>Share individual user information</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 rounded-full bg-red-500 flex items-center justify-center">
                          <div className="w-2 h-0.5 bg-white"></div>
                        </div>
                        <span>Use data for advertising purposes</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 rounded-full bg-red-500 flex items-center justify-center">
                          <div className="w-2 h-0.5 bg-white"></div>
                        </div>
                        <span>Store unnecessary personal information</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Data Export */}
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-white/20 dark:border-gray-700/50">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Download className="w-5 h-5" />
                  <span>Data Export & Access</span>
                </CardTitle>
                <CardDescription>Access your data and our aggregated insights</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button className="flex-1">
                    <Download className="w-4 h-4 mr-2" />
                    Export Your Data
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Eye className="w-4 h-4 mr-2" />
                    View Privacy Policy
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Shield className="w-4 h-4 mr-2" />
                    Data Deletion Request
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
