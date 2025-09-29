"use client"

import { useState } from "react"
import { Header } from "./header"
import { Footer } from "./footer"
import { Button } from "../ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import { Badge } from "../ui/badge"
import { Progress } from "../ui/progress"
import { Input } from "../ui/input"
import {
  Shield,
  Search,
  AlertTriangle,
  CheckCircle,
  Building,
  FlaskRoundIcon as Flask,
  FileText,
  TrendingUp,
  Award,
  Microscope,
  Upload,
  Globe,
  Bot,
  Database,
} from "lucide-react"

export function AuditPage() {
  const [activeTab, setActiveTab] = useState("checker")
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  // Mock data for demonstration
  const industryAverages = {
    manufacturing: 76,
    labTesting: 68,
    certifications: 52,
  }

  const brandData = {
    "Nature's Best": {
      manufacturing: 92,
      labTesting: 89,
      certifications: 76,
    },
    "Generic Brand": {
      manufacturing: 64,
      labTesting: 58,
      certifications: 41,
    },
  }

  const currentData =
    selectedBrand && brandData[selectedBrand as keyof typeof brandData]
      ? brandData[selectedBrand as keyof typeof brandData]
      : industryAverages

  const isShowingBrand = selectedBrand && brandData[selectedBrand as keyof typeof brandData]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <main className="pt-20">
        <div className="container mx-auto px-4 py-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-300 rounded-full text-sm font-medium mb-6">
              <Bot className="w-4 h-4 mr-2" />
              AI-Powered Quality Intelligence
            </div>
            <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Supplement Quality
              <br />
              <span className="bg-gradient-to-r from-red-600 to-purple-600 bg-clip-text text-transparent">
                Audit & Intelligence
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
              AI-powered web scraping system that analyzes manufacturing data, lab results, and certifications from
              across the internet to generate comprehensive brand quality scores.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button size="lg" className="bg-red-600 hover:bg-red-700">
                <Upload className="w-5 h-5 mr-2" />
                Upload Supplement List
              </Button>
              <Button variant="outline" size="lg">
                <Database className="w-5 h-5 mr-2" />
                Browse Database
              </Button>
            </div>

            {/* Search Bar */}
            <div className="max-w-md mx-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search brand or product to audit..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 dark:bg-gray-800 dark:border-gray-700"
                />
              </div>
              {searchQuery && (
                <div className="mt-2 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg shadow-lg">
                  <div
                    className="p-3 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                    onClick={() => {
                      setSelectedBrand("Nature's Best")
                      setSearchQuery("Nature's Best")
                    }}
                  >
                    <div className="font-medium">Nature's Best</div>
                    <div className="text-sm text-gray-500">Premium supplement brand</div>
                  </div>
                  <div
                    className="p-3 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                    onClick={() => {
                      setSelectedBrand("Generic Brand")
                      setSearchQuery("Generic Brand")
                    }}
                  >
                    <div className="font-medium">Generic Brand</div>
                    <div className="text-sm text-gray-500">Budget supplement manufacturer</div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Main Content */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="checker">
                <Shield className="w-4 h-4 mr-2" />
                Quality Checker
              </TabsTrigger>
              <TabsTrigger value="regulatory">
                <FileText className="w-4 h-4 mr-2" />
                Regulatory Feed
              </TabsTrigger>
            </TabsList>

            <TabsContent value="checker" className="space-y-8">
              {/* Current Analysis Header */}
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {isShowingBrand ? `${selectedBrand} Quality Analysis` : "Industry Average Quality Metrics"}
                    </h2>
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                      <Globe className="w-4 h-4 mr-2" />
                      {isShowingBrand
                        ? "Data scraped from manufacturer websites, lab reports, and certification databases"
                        : "Aggregated data from 2,847 supplement brands and 15,623 products"}
                    </div>
                  </div>
                  {isShowingBrand && (
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSelectedBrand(null)
                        setSearchQuery("")
                      }}
                    >
                      View Industry Average
                    </Button>
                  )}
                </div>
              </div>

              {/* Quality Assessment Dashboard */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card className="dark:bg-gray-800 dark:border-gray-700">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center dark:text-white">
                      <Building className="w-4 h-4 mr-2 text-blue-600" />
                      Manufacturing Quality
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-blue-600 mb-2">{currentData.manufacturing}%</div>
                    <Progress value={currentData.manufacturing} className="h-2 mb-3" />
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                      {isShowingBrand ? "Brand Score" : "Industry Average"}
                    </p>

                    <div className="space-y-2 text-xs text-gray-500 dark:text-gray-400">
                      <div className="flex justify-between">
                        <span>GMP Certification</span>
                        <span className="font-medium">{isShowingBrand ? "96%" : "78%"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Process Compliance</span>
                        <span className="font-medium">{isShowingBrand ? "94%" : "76%"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Quality Control Systems</span>
                        <span className="font-medium">{isShowingBrand ? "89%" : "74%"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Facility Inspections</span>
                        <span className="font-medium">{isShowingBrand ? "88%" : "72%"}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="dark:bg-gray-800 dark:border-gray-700">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center dark:text-white">
                      <Flask className="w-4 h-4 mr-2 text-green-600" />
                      Lab Testing
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-green-600 mb-2">{currentData.labTesting}%</div>
                    <Progress value={currentData.labTesting} className="h-2 mb-3" />
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                      {isShowingBrand ? "Brand Score" : "Industry Average"}
                    </p>

                    <div className="space-y-2 text-xs text-gray-500 dark:text-gray-400">
                      <div className="flex justify-between">
                        <span>Third-Party Verification</span>
                        <span className="font-medium">{isShowingBrand ? "93%" : "71%"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Potency Testing</span>
                        <span className="font-medium">{isShowingBrand ? "91%" : "68%"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Contaminant Screening</span>
                        <span className="font-medium">{isShowingBrand ? "87%" : "65%"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Heavy Metals Testing</span>
                        <span className="font-medium">{isShowingBrand ? "85%" : "63%"}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="dark:bg-gray-800 dark:border-gray-700">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center dark:text-white">
                      <Award className="w-4 h-4 mr-2 text-purple-600" />
                      Certifications
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-purple-600 mb-2">{currentData.certifications}%</div>
                    <Progress value={currentData.certifications} className="h-2 mb-3" />
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                      {isShowingBrand ? "Brand Score" : "Industry Average"}
                    </p>

                    <div className="space-y-2 text-xs text-gray-500 dark:text-gray-400">
                      <div className="flex justify-between">
                        <span>NSF Certification</span>
                        <span className="font-medium">{isShowingBrand ? "82%" : "56%"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>USP Verification</span>
                        <span className="font-medium">{isShowingBrand ? "78%" : "51%"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Organic Certifications</span>
                        <span className="font-medium">{isShowingBrand ? "74%" : "49%"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>ISO Compliance</span>
                        <span className="font-medium">{isShowingBrand ? "71%" : "47%"}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* AI Scraping Status */}
              <Card className="dark:bg-gray-800 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center dark:text-white">
                    <Bot className="w-5 h-5 mr-2" />
                    AI Web Scraping Status
                  </CardTitle>
                  <CardDescription className="dark:text-gray-300">
                    Real-time data collection from manufacturer websites, regulatory databases, and lab reports
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">2,847</div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">Brands Monitored</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">15,623</div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">Products Analyzed</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">847</div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">Data Sources</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-orange-600">24h</div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">Update Frequency</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Audits */}
              <Card className="dark:bg-gray-800 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center dark:text-white">
                    <Microscope className="w-5 h-5 mr-2" />
                    Recent AI Quality Audits
                  </CardTitle>
                  <CardDescription className="dark:text-gray-300">
                    Latest automated quality assessments from web-scraped data
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        name: "Vitamin D3 2000 IU",
                        brand: "Nature's Best",
                        score: 94,
                        status: "Verified",
                        issues: 0,
                        lastScraped: "2 hours ago",
                      },
                      {
                        name: "Omega-3 Fish Oil",
                        brand: "Nordic Naturals",
                        score: 91,
                        status: "Verified",
                        issues: 0,
                        lastScraped: "4 hours ago",
                      },
                      {
                        name: "Magnesium Glycinate",
                        brand: "Doctor's Best",
                        score: 87,
                        status: "Partially Verified",
                        issues: 1,
                        lastScraped: "6 hours ago",
                      },
                      {
                        name: "Multivitamin Complex",
                        brand: "Generic Brand",
                        score: 72,
                        status: "Flagged",
                        issues: 3,
                        lastScraped: "1 day ago",
                      },
                    ].map((audit, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                      >
                        <div className="flex items-center space-x-4">
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center ${
                              audit.score >= 90
                                ? "bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400"
                                : audit.score >= 80
                                  ? "bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400"
                                  : audit.score >= 70
                                    ? "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/20 dark:text-yellow-400"
                                    : "bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400"
                            }`}
                          >
                            <span className="font-bold text-sm">{audit.score}</span>
                          </div>
                          <div>
                            <div className="font-medium dark:text-white">{audit.name}</div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">{audit.brand}</div>
                            <div className="text-xs text-gray-400 dark:text-gray-500">
                              Last scraped: {audit.lastScraped}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Badge
                            variant={
                              audit.status === "Verified"
                                ? "default"
                                : audit.status === "Partially Verified"
                                  ? "secondary"
                                  : "destructive"
                            }
                          >
                            {audit.status}
                          </Badge>
                          {audit.issues > 0 && (
                            <Badge
                              variant="outline"
                              className="text-yellow-600 border-yellow-200 dark:text-yellow-400 dark:border-yellow-800"
                            >
                              {audit.issues} {audit.issues === 1 ? "Issue" : "Issues"}
                            </Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="regulatory" className="space-y-8">
              {/* Regulatory Alerts */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <Card className="border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-900/10">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center text-yellow-800 dark:text-yellow-300">
                      <AlertTriangle className="w-4 h-4 mr-2" />
                      Active Alerts
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400 mb-2">3</div>
                    <p className="text-sm text-yellow-700 dark:text-yellow-300">FDA warnings this month</p>
                  </CardContent>
                </Card>

                <Card className="border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/10">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center text-green-800 dark:text-green-300">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Compliance Rate
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-2">94%</div>
                    <p className="text-sm text-green-700 dark:text-green-300">Industry compliance average</p>
                  </CardContent>
                </Card>
              </div>

              {/* Regulatory Feed */}
              <Card className="dark:bg-gray-800 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center dark:text-white">
                    <TrendingUp className="w-5 h-5 mr-2" />
                    Regulatory Intelligence Feed
                  </CardTitle>
                  <CardDescription className="dark:text-gray-300">
                    Latest regulatory updates and industry news
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        title: "FDA Issues Warning Letter to Supplement Manufacturer",
                        source: "FDA",
                        date: "2 days ago",
                        type: "Warning",
                        description: "Concerns over manufacturing practices and labeling accuracy",
                      },
                      {
                        title: "New cGMP Guidelines for Dietary Supplements",
                        source: "FDA",
                        date: "1 week ago",
                        type: "Guideline",
                        description: "Updated current Good Manufacturing Practice regulations",
                      },
                      {
                        title: "Recall Notice: Contaminated Protein Powder",
                        source: "FDA",
                        date: "2 weeks ago",
                        type: "Recall",
                        description: "Heavy metal contamination detected in multiple batches",
                      },
                      {
                        title: "Industry Report: Supplement Quality Trends 2024",
                        source: "NSF International",
                        date: "3 weeks ago",
                        type: "Report",
                        description: "Annual analysis of supplement quality and safety metrics",
                      },
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="flex items-start space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                      >
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                            item.type === "Warning"
                              ? "bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400"
                              : item.type === "Recall"
                                ? "bg-orange-100 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400"
                                : item.type === "Guideline"
                                  ? "bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400"
                                  : "bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400"
                          }`}
                        >
                          {item.type === "Warning" ? (
                            <AlertTriangle className="w-4 h-4" />
                          ) : item.type === "Recall" ? (
                            <AlertTriangle className="w-4 h-4" />
                          ) : item.type === "Guideline" ? (
                            <FileText className="w-4 h-4" />
                          ) : (
                            <TrendingUp className="w-4 h-4" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h3 className="font-medium text-gray-900 dark:text-white">{item.title}</h3>
                            <Badge variant="outline" className="text-xs">
                              {item.type}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{item.description}</p>
                          <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                            <span>{item.source}</span>
                            <span className="mx-2">•</span>
                            <span>{item.date}</span>
                          </div>
                        </div>
                      </div>
                    ))}
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
