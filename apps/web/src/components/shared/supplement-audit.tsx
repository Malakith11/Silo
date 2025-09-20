"use client"

import { DialogFooter } from "../ui/dialog"

import { useState, useEffect } from "react"
import { Button } from "../ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import { Badge } from "../ui/badge"
import { Progress } from "../ui/progress"
import { Separator } from "../ui/separator"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog"
import {
  Shield,
  AlertTriangle,
  CheckCircle,
  FileText,
  Search,
  Building,
  FlaskRoundIcon as Flask,
  Microscope,
  Award,
  Leaf,
  Pill,
  Droplet,
  Gauge,
  Hourglass,
  Fingerprint,
  Download,
  Share2,
  Printer,
} from "lucide-react"
import type { ProtocolData, Supplement } from "./stack-lab-builder"

interface SupplementAuditProps {
  protocol: ProtocolData
  open: boolean
  onOpenChange: (open: boolean) => void
}

interface AuditResult {
  overallScore: number
  categories: {
    manufacturing: number
    purity: number
    potency: number
    safety: number
    transparency: number
    sustainability: number
  }
  supplements: SupplementAuditResult[]
  warnings: string[]
  recommendations: string[]
}

interface SupplementAuditResult {
  supplement: Supplement
  score: number
  verificationStatus: "Verified" | "Partially Verified" | "Unverified" | "Flagged"
  manufacturingDetails: {
    facility: string
    certifications: string[]
    location: string
    processScore: number
  }
  labResults: {
    purity: number
    potency: number
    contaminants: {
      heavy_metals: boolean
      microbes: boolean
      pesticides: boolean
    }
    lastTested: string
  }
  transparency: {
    score: number
    sourceDisclosure: boolean
    thirdPartyTesting: boolean
    labelAccuracy: number
  }
  warnings: string[]
  recommendations: string[]
}

export function SupplementAudit({ protocol, open, onOpenChange }: SupplementAuditProps) {
  const [activeTab, setActiveTab] = useState("overview")
  const [auditProgress, setAuditProgress] = useState(0)
  const [isAuditing, setIsAuditing] = useState(false)
  const [auditComplete, setAuditComplete] = useState(false)
  const [auditResults, setAuditResults] = useState<AuditResult | null>(null)
  const [selectedSupplement, setSelectedSupplement] = useState<string | null>(null)

  useEffect(() => {
    if (open && !auditComplete && !isAuditing && !auditResults) {
      // Add a small delay to allow the dialog to fully open
      const timer = setTimeout(() => {
        runAudit()
      }, 300)

      return () => clearTimeout(timer)
    }
  }, [open, auditComplete, isAuditing, auditResults])

  const runAudit = () => {
    setIsAuditing(true)
    setAuditProgress(0)
    setAuditComplete(false)
    setAuditResults(null)

    // Simulate audit progress with more realistic timing
    const interval = setInterval(() => {
      setAuditProgress((prev) => {
        const increment = Math.random() * 10 + 5 // 5-15% increments
        const newProgress = Math.min(prev + increment, 100)

        if (newProgress >= 100) {
          clearInterval(interval)
          setTimeout(() => {
            setIsAuditing(false)
            setAuditComplete(true)
            generateAuditResults()
          }, 1000)
          return 100
        }
        return newProgress
      })
    }, 500)
  }

  const generateAuditResults = () => {
    // Generate mock audit results for the protocol
    const supplements = protocol.timeSlots.flatMap((slot) => slot.supplements)
    const uniqueSupplements = Array.from(new Map(supplements.map((s) => [s.id, s])).values())

    const supplementResults: SupplementAuditResult[] = uniqueSupplements.map((supplement) => {
      // Generate random but realistic audit results for each supplement
      const score = Math.floor(70 + Math.random() * 30) // 70-100 range

      // Determine verification status based on score
      let verificationStatus: "Verified" | "Partially Verified" | "Unverified" | "Flagged"
      if (score >= 90) verificationStatus = "Verified"
      else if (score >= 80) verificationStatus = "Partially Verified"
      else if (score >= 70) verificationStatus = "Unverified"
      else verificationStatus = "Flagged"

      // Generate manufacturing details
      const manufacturingDetails = {
        facility: ["GMP Certified Facility", "ISO 9001 Facility", "FDA Registered Facility"][
          Math.floor(Math.random() * 3)
        ],
        certifications: [
          "cGMP",
          "NSF Certified",
          "USP Verified",
          "Informed Choice",
          "Non-GMO Project",
          "Organic",
        ].slice(0, 2 + Math.floor(Math.random() * 3)),
        location: ["USA", "Canada", "EU", "Japan", "Australia"][Math.floor(Math.random() * 5)],
        processScore: Math.floor(70 + Math.random() * 30),
      }

      // Generate lab results
      const labResults = {
        purity: Math.floor(90 + Math.random() * 10),
        potency: Math.floor(85 + Math.random() * 15),
        contaminants: {
          heavy_metals: Math.random() > 0.9,
          microbes: Math.random() > 0.95,
          pesticides: Math.random() > 0.9,
        },
        lastTested: `${Math.floor(1 + Math.random() * 11)}/${2024 + Math.floor(Math.random() * 2)}`,
      }

      // Generate transparency score
      const transparency = {
        score: Math.floor(60 + Math.random() * 40),
        sourceDisclosure: Math.random() > 0.3,
        thirdPartyTesting: Math.random() > 0.4,
        labelAccuracy: Math.floor(80 + Math.random() * 20),
      }

      // Generate warnings based on the results
      const warnings: string[] = []
      if (labResults.contaminants.heavy_metals) {
        warnings.push("Trace heavy metals detected (within allowable limits)")
      }
      if (labResults.contaminants.microbes) {
        warnings.push("Microbial presence detected (within allowable limits)")
      }
      if (transparency.score < 70) {
        warnings.push("Limited transparency on sourcing and manufacturing")
      }
      if (labResults.potency < 90) {
        warnings.push("Potency variation between batches detected")
      }

      // Generate recommendations
      const recommendations: string[] = []
      if (verificationStatus !== "Verified") {
        recommendations.push("Consider alternatives with third-party verification")
      }
      if (transparency.score < 80) {
        recommendations.push("Request Certificate of Analysis from manufacturer")
      }
      if (manufacturingDetails.processScore < 85) {
        recommendations.push("Monitor for batch consistency issues")
      }

      return {
        supplement,
        score,
        verificationStatus,
        manufacturingDetails,
        labResults,
        transparency,
        warnings,
        recommendations,
      }
    })

    // Calculate overall scores
    const overallScore = Math.round(
      supplementResults.reduce((sum, result) => sum + result.score, 0) / supplementResults.length,
    )

    // Calculate category scores
    const categories = {
      manufacturing: Math.round(
        supplementResults.reduce((sum, result) => sum + result.manufacturingDetails.processScore, 0) /
          supplementResults.length,
      ),
      purity: Math.round(
        supplementResults.reduce((sum, result) => sum + result.labResults.purity, 0) / supplementResults.length,
      ),
      potency: Math.round(
        supplementResults.reduce((sum, result) => sum + result.labResults.potency, 0) / supplementResults.length,
      ),
      safety: Math.round(
        supplementResults.reduce(
          (sum, result) =>
            sum +
            (result.labResults.contaminants.heavy_metals ||
            result.labResults.contaminants.microbes ||
            result.labResults.contaminants.pesticides
              ? 70
              : 95),
          0,
        ) / supplementResults.length,
      ),
      transparency: Math.round(
        supplementResults.reduce((sum, result) => sum + result.transparency.score, 0) / supplementResults.length,
      ),
      sustainability: Math.round(60 + Math.random() * 30),
    }

    // Compile overall warnings and recommendations
    const allWarnings = Array.from(new Set(supplementResults.flatMap((result) => result.warnings))).slice(0, 5)

    const allRecommendations = Array.from(new Set(supplementResults.flatMap((result) => result.recommendations))).slice(
      0,
      5,
    )

    setAuditResults({
      overallScore,
      categories,
      supplements: supplementResults,
      warnings: allWarnings,
      recommendations: allRecommendations,
    })
  }

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600"
    if (score >= 80) return "text-blue-600"
    if (score >= 70) return "text-yellow-600"
    return "text-red-600"
  }

  const getScoreBg = (score: number) => {
    if (score >= 90) return "bg-green-100"
    if (score >= 80) return "bg-blue-100"
    if (score >= 70) return "bg-yellow-100"
    return "bg-red-100"
  }

  const getVerificationBadge = (status: string) => {
    switch (status) {
      case "Verified":
        return <Badge className="bg-green-100 text-green-800 border-green-200">Verified</Badge>
      case "Partially Verified":
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200">Partially Verified</Badge>
      case "Unverified":
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Unverified</Badge>
      case "Flagged":
        return <Badge className="bg-red-100 text-red-800 border-red-200">Flagged</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const getSelectedSupplementResult = () => {
    if (!auditResults || !selectedSupplement) return null
    return auditResults.supplements.find((result) => result.supplement.id === selectedSupplement) || null
  }

  const selectedResult = getSelectedSupplementResult()

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2 text-xl">
            <Shield className="w-5 h-5 text-red-600" />
            <span>Supplement Audit</span>
          </DialogTitle>
          <DialogDescription>Comprehensive quality assessment of all supplements in your protocol</DialogDescription>
        </DialogHeader>

        {isAuditing ? (
          <div className="space-y-6 py-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center">
                  <Search className="w-4 h-4 mr-2 text-blue-600 animate-pulse" />
                  Running Comprehensive Audit
                </CardTitle>
                <CardDescription>
                  Analyzing manufacturing processes, lab results, and verifying supplement quality
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Progress value={auditProgress} className="h-2" />
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                    <span>Verifying manufacturing facilities...</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span>Checking lab certifications...</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                    <span>Analyzing purity reports...</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
                    <span>Validating label claims...</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : auditComplete && auditResults ? (
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="overview">
                <Shield className="w-4 h-4 mr-2" />
                Audit Overview
              </TabsTrigger>
              <TabsTrigger value="supplements">
                <Pill className="w-4 h-4 mr-2" />
                Supplement Details
              </TabsTrigger>
              <TabsTrigger value="recommendations">
                <CheckCircle className="w-4 h-4 mr-2" />
                Recommendations
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <Card className="border-2 border-red-100 bg-gradient-to-r from-red-50 to-orange-50">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base flex items-center">
                      <Shield className="w-4 h-4 mr-2 text-red-600" />
                      Silo Quality Assessment
                    </CardTitle>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium">Overall Score:</span>
                      <Badge
                        className={`${getScoreBg(auditResults.overallScore)} ${getScoreColor(
                          auditResults.overallScore,
                        )} border`}
                      >
                        {auditResults.overallScore}%
                      </Badge>
                    </div>
                  </div>
                  <CardDescription>
                    Comprehensive quality analysis of {auditResults.supplements.length} supplements in your protocol
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Score Summary */}
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="bg-white rounded-lg p-3 shadow-sm">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <Building className="w-4 h-4 text-blue-600" />
                          <span className="text-sm font-medium">Manufacturing</span>
                        </div>
                        <span className={`text-sm font-bold ${getScoreColor(auditResults.categories.manufacturing)}`}>
                          {auditResults.categories.manufacturing}%
                        </span>
                      </div>
                      <Progress value={auditResults.categories.manufacturing} className="h-1.5" />
                    </div>

                    <div className="bg-white rounded-lg p-3 shadow-sm">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <Droplet className="w-4 h-4 text-green-600" />
                          <span className="text-sm font-medium">Purity</span>
                        </div>
                        <span className={`text-sm font-bold ${getScoreColor(auditResults.categories.purity)}`}>
                          {auditResults.categories.purity}%
                        </span>
                      </div>
                      <Progress value={auditResults.categories.purity} className="h-1.5" />
                    </div>

                    <div className="bg-white rounded-lg p-3 shadow-sm">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <Gauge className="w-4 h-4 text-purple-600" />
                          <span className="text-sm font-medium">Potency</span>
                        </div>
                        <span className={`text-sm font-bold ${getScoreColor(auditResults.categories.potency)}`}>
                          {auditResults.categories.potency}%
                        </span>
                      </div>
                      <Progress value={auditResults.categories.potency} className="h-1.5" />
                    </div>

                    <div className="bg-white rounded-lg p-3 shadow-sm">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <Shield className="w-4 h-4 text-red-600" />
                          <span className="text-sm font-medium">Safety</span>
                        </div>
                        <span className={`text-sm font-bold ${getScoreColor(auditResults.categories.safety)}`}>
                          {auditResults.categories.safety}%
                        </span>
                      </div>
                      <Progress value={auditResults.categories.safety} className="h-1.5" />
                    </div>

                    <div className="bg-white rounded-lg p-3 shadow-sm">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <Fingerprint className="w-4 h-4 text-orange-600" />
                          <span className="text-sm font-medium">Transparency</span>
                        </div>
                        <span className={`text-sm font-bold ${getScoreColor(auditResults.categories.transparency)}`}>
                          {auditResults.categories.transparency}%
                        </span>
                      </div>
                      <Progress value={auditResults.categories.transparency} className="h-1.5" />
                    </div>

                    <div className="bg-white rounded-lg p-3 shadow-sm">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <Leaf className="w-4 h-4 text-green-600" />
                          <span className="text-sm font-medium">Sustainability</span>
                        </div>
                        <span className={`text-sm font-bold ${getScoreColor(auditResults.categories.sustainability)}`}>
                          {auditResults.categories.sustainability}%
                        </span>
                      </div>
                      <Progress value={auditResults.categories.sustainability} className="h-1.5" />
                    </div>
                  </div>

                  {/* Verification Summary */}
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <h3 className="text-sm font-medium mb-3">Verification Status</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      <div className="bg-green-50 rounded-lg p-3 text-center border border-green-100">
                        <div className="text-xl font-bold text-green-600 mb-1">
                          {auditResults.supplements.filter((s) => s.verificationStatus === "Verified").length}
                        </div>
                        <div className="text-xs text-gray-600">Verified</div>
                      </div>
                      <div className="bg-blue-50 rounded-lg p-3 text-center border border-blue-100">
                        <div className="text-xl font-bold text-blue-600 mb-1">
                          {auditResults.supplements.filter((s) => s.verificationStatus === "Partially Verified").length}
                        </div>
                        <div className="text-xs text-gray-600">Partially Verified</div>
                      </div>
                      <div className="bg-yellow-50 rounded-lg p-3 text-center border border-yellow-100">
                        <div className="text-xl font-bold text-yellow-600 mb-1">
                          {auditResults.supplements.filter((s) => s.verificationStatus === "Unverified").length}
                        </div>
                        <div className="text-xs text-gray-600">Unverified</div>
                      </div>
                      <div className="bg-red-50 rounded-lg p-3 text-center border border-red-100">
                        <div className="text-xl font-bold text-red-600 mb-1">
                          {auditResults.supplements.filter((s) => s.verificationStatus === "Flagged").length}
                        </div>
                        <div className="text-xs text-gray-600">Flagged</div>
                      </div>
                    </div>
                  </div>

                  {/* Warnings */}
                  {auditResults.warnings.length > 0 && (
                    <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
                      <h3 className="text-sm font-medium text-yellow-800 mb-3 flex items-center">
                        <AlertTriangle className="w-4 h-4 mr-2" />
                        Quality Warnings
                      </h3>
                      <ul className="space-y-2">
                        {auditResults.warnings.map((warning, index) => (
                          <li key={index} className="flex items-start space-x-2 text-sm text-yellow-700">
                            <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                            <span>{warning}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Supplement Summary */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center">
                    <Pill className="w-4 h-4 mr-2 text-purple-600" />
                    Supplement Quality Summary
                  </CardTitle>
                  <CardDescription>Quick overview of all supplements in your protocol</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {auditResults.supplements.map((result) => (
                      <div
                        key={result.supplement.id}
                        className="flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors"
                        onClick={() => {
                          setSelectedSupplement(result.supplement.id)
                          setActiveTab("supplements")
                        }}
                      >
                        <div className="flex items-center space-x-3">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center ${getScoreBg(
                              result.score,
                            )}`}
                          >
                            <span className={`text-sm font-bold ${getScoreColor(result.score)}`}>{result.score}</span>
                          </div>
                          <div>
                            <div className="font-medium">{result.supplement.name}</div>
                            <div className="text-xs text-gray-500">{result.supplement.category}</div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          {getVerificationBadge(result.verificationStatus)}
                          {result.warnings.length > 0 && (
                            <Badge variant="outline" className="bg-yellow-50 text-yellow-800 border-yellow-200">
                              {result.warnings.length} {result.warnings.length === 1 ? "Warning" : "Warnings"}
                            </Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="supplements" className="space-y-6">
              {selectedResult ? (
                <div className="space-y-6">
                  <Card className="border-2 border-purple-100">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base flex items-center">
                          <Pill className="w-4 h-4 mr-2 text-purple-600" />
                          {selectedResult.supplement.name}
                        </CardTitle>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-medium">Quality Score:</span>
                          <Badge
                            className={`${getScoreBg(selectedResult.score)} ${getScoreColor(
                              selectedResult.score,
                            )} border`}
                          >
                            {selectedResult.score}%
                          </Badge>
                        </div>
                      </div>
                      <CardDescription>
                        {selectedResult.supplement.category} • {selectedResult.supplement.dosage}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Shield className="w-4 h-4 text-gray-600" />
                          <span className="text-sm font-medium">Verification Status:</span>
                        </div>
                        {getVerificationBadge(selectedResult.verificationStatus)}
                      </div>

                      <Separator />

                      {/* Manufacturing Details */}
                      <div>
                        <h3 className="text-sm font-medium mb-3 flex items-center">
                          <Building className="w-4 h-4 mr-2 text-blue-600" />
                          Manufacturing Details
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="bg-white rounded-lg p-3 border">
                            <div className="text-xs text-gray-500 mb-1">Facility</div>
                            <div className="font-medium">{selectedResult.manufacturingDetails.facility}</div>
                          </div>
                          <div className="bg-white rounded-lg p-3 border">
                            <div className="text-xs text-gray-500 mb-1">Location</div>
                            <div className="font-medium">{selectedResult.manufacturingDetails.location}</div>
                          </div>
                          <div className="bg-white rounded-lg p-3 border">
                            <div className="text-xs text-gray-500 mb-1">Certifications</div>
                            <div className="flex flex-wrap gap-1">
                              {selectedResult.manufacturingDetails.certifications.map((cert, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {cert}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div className="bg-white rounded-lg p-3 border">
                            <div className="text-xs text-gray-500 mb-1">Process Quality</div>
                            <div className="flex items-center space-x-2">
                              <Progress
                                value={selectedResult.manufacturingDetails.processScore}
                                className="h-2 flex-1"
                              />
                              <span
                                className={`text-sm font-bold ${getScoreColor(
                                  selectedResult.manufacturingDetails.processScore,
                                )}`}
                              >
                                {selectedResult.manufacturingDetails.processScore}%
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <Separator />

                      {/* Lab Results */}
                      <div>
                        <h3 className="text-sm font-medium mb-3 flex items-center">
                          <Flask className="w-4 h-4 mr-2 text-green-600" />
                          Laboratory Analysis
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="bg-white rounded-lg p-3 border">
                            <div className="flex items-center justify-between mb-2">
                              <div className="text-sm font-medium">Purity</div>
                              <span className={`text-sm font-bold ${getScoreColor(selectedResult.labResults.purity)}`}>
                                {selectedResult.labResults.purity}%
                              </span>
                            </div>
                            <Progress value={selectedResult.labResults.purity} className="h-2" />
                            <div className="text-xs text-gray-500 mt-1">
                              {selectedResult.labResults.purity >= 95
                                ? "Pharmaceutical grade"
                                : selectedResult.labResults.purity >= 90
                                  ? "High purity"
                                  : "Standard purity"}
                            </div>
                          </div>
                          <div className="bg-white rounded-lg p-3 border">
                            <div className="flex items-center justify-between mb-2">
                              <div className="text-sm font-medium">Potency</div>
                              <span className={`text-sm font-bold ${getScoreColor(selectedResult.labResults.potency)}`}>
                                {selectedResult.labResults.potency}%
                              </span>
                            </div>
                            <Progress value={selectedResult.labResults.potency} className="h-2" />
                            <div className="text-xs text-gray-500 mt-1">
                              {selectedResult.labResults.potency >= 95
                                ? "Exceeds label claim"
                                : selectedResult.labResults.potency >= 90
                                  ? "Meets label claim"
                                  : "Slight variation from label"}
                            </div>
                          </div>
                          <div className="bg-white rounded-lg p-3 border col-span-1 md:col-span-2">
                            <div className="text-sm font-medium mb-2">Contaminant Testing</div>
                            <div className="grid grid-cols-3 gap-2">
                              <div className="flex items-center space-x-2">
                                {selectedResult.labResults.contaminants.heavy_metals ? (
                                  <AlertTriangle className="w-4 h-4 text-yellow-500" />
                                ) : (
                                  <CheckCircle className="w-4 h-4 text-green-500" />
                                )}
                                <span className="text-sm">
                                  Heavy Metals{" "}
                                  {selectedResult.labResults.contaminants.heavy_metals
                                    ? "(Trace Amounts)"
                                    : "(None Detected)"}
                                </span>
                              </div>
                              <div className="flex items-center space-x-2">
                                {selectedResult.labResults.contaminants.microbes ? (
                                  <AlertTriangle className="w-4 h-4 text-yellow-500" />
                                ) : (
                                  <CheckCircle className="w-4 h-4 text-green-500" />
                                )}
                                <span className="text-sm">
                                  Microbes{" "}
                                  {selectedResult.labResults.contaminants.microbes
                                    ? "(Within Limits)"
                                    : "(None Detected)"}
                                </span>
                              </div>
                              <div className="flex items-center space-x-2">
                                {selectedResult.labResults.contaminants.pesticides ? (
                                  <AlertTriangle className="w-4 h-4 text-yellow-500" />
                                ) : (
                                  <CheckCircle className="w-4 h-4 text-green-500" />
                                )}
                                <span className="text-sm">
                                  Pesticides{" "}
                                  {selectedResult.labResults.contaminants.pesticides
                                    ? "(Trace Amounts)"
                                    : "(None Detected)"}
                                </span>
                              </div>
                            </div>
                            <div className="text-xs text-gray-500 mt-2">
                              Last tested: {selectedResult.labResults.lastTested}
                            </div>
                          </div>
                        </div>
                      </div>

                      <Separator />

                      {/* Transparency */}
                      <div>
                        <h3 className="text-sm font-medium mb-3 flex items-center">
                          <Fingerprint className="w-4 h-4 mr-2 text-orange-600" />
                          Transparency Assessment
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="bg-white rounded-lg p-3 border">
                            <div className="flex items-center justify-between mb-2">
                              <div className="text-sm font-medium">Overall Transparency</div>
                              <span className={`text-sm font-bold ${getScoreColor(selectedResult.transparency.score)}`}>
                                {selectedResult.transparency.score}%
                              </span>
                            </div>
                            <Progress value={selectedResult.transparency.score} className="h-2" />
                          </div>
                          <div className="bg-white rounded-lg p-3 border">
                            <div className="flex items-center justify-between mb-2">
                              <div className="text-sm font-medium">Label Accuracy</div>
                              <span
                                className={`text-sm font-bold ${getScoreColor(
                                  selectedResult.transparency.labelAccuracy,
                                )}`}
                              >
                                {selectedResult.transparency.labelAccuracy}%
                              </span>
                            </div>
                            <Progress value={selectedResult.transparency.labelAccuracy} className="h-2" />
                          </div>
                          <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                            <span className="text-sm">Source Disclosure</span>
                            {selectedResult.transparency.sourceDisclosure ? (
                              <Badge className="bg-green-100 text-green-800 border-green-200">Disclosed</Badge>
                            ) : (
                              <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Limited</Badge>
                            )}
                          </div>
                          <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                            <span className="text-sm">Third-Party Testing</span>
                            {selectedResult.transparency.thirdPartyTesting ? (
                              <Badge className="bg-green-100 text-green-800 border-green-200">Verified</Badge>
                            ) : (
                              <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Limited</Badge>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Warnings & Recommendations */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {selectedResult.warnings.length > 0 && (
                          <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
                            <h3 className="text-sm font-medium text-yellow-800 mb-3 flex items-center">
                              <AlertTriangle className="w-4 h-4 mr-2" />
                              Warnings
                            </h3>
                            <ul className="space-y-2">
                              {selectedResult.warnings.map((warning, index) => (
                                <li key={index} className="flex items-start space-x-2 text-sm text-yellow-700">
                                  <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                                  <span>{warning}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {selectedResult.recommendations.length > 0 && (
                          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                            <h3 className="text-sm font-medium text-blue-800 mb-3 flex items-center">
                              <CheckCircle className="w-4 h-4 mr-2" />
                              Recommendations
                            </h3>
                            <ul className="space-y-2">
                              {selectedResult.recommendations.map((recommendation, index) => (
                                <li key={index} className="flex items-start space-x-2 text-sm text-blue-700">
                                  <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                                  <span>{recommendation}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" onClick={() => setSelectedSupplement(null)}>
                        Back to All Supplements
                      </Button>
                      <Button variant="outline">
                        <FileText className="w-4 h-4 mr-2" />
                        View Certificate of Analysis
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">All Supplements</h3>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-500">Sort by:</span>
                      <select className="text-sm border rounded p-1">
                        <option>Quality Score</option>
                        <option>Verification Status</option>
                        <option>Name</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {auditResults.supplements.map((result) => (
                      <Card
                        key={result.supplement.id}
                        className={`cursor-pointer hover:shadow-md transition-shadow border-l-4 ${
                          result.score >= 90
                            ? "border-l-green-500"
                            : result.score >= 80
                              ? "border-l-blue-500"
                              : result.score >= 70
                                ? "border-l-yellow-500"
                                : "border-l-red-500"
                        }`}
                        onClick={() => setSelectedSupplement(result.supplement.id)}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center space-x-3">
                              <div
                                className={`w-10 h-10 rounded-full flex items-center justify-center ${getScoreBg(
                                  result.score,
                                )}`}
                              >
                                <span className={`text-lg font-bold ${getScoreColor(result.score)}`}>
                                  {result.score}
                                </span>
                              </div>
                              <div>
                                <div className="font-medium">{result.supplement.name}</div>
                                <div className="text-xs text-gray-500">
                                  {result.supplement.category} • {result.supplement.dosage}
                                </div>
                              </div>
                            </div>
                            {getVerificationBadge(result.verificationStatus)}
                          </div>

                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <div className="flex items-center space-x-2">
                              <Building className="w-3 h-3 text-gray-500" />
                              <span className="text-gray-600">{result.manufacturingDetails.location}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Flask className="w-3 h-3 text-gray-500" />
                              <span className="text-gray-600">
                                Purity: <span className="font-medium">{result.labResults.purity}%</span>
                              </span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Microscope className="w-3 h-3 text-gray-500" />
                              <span className="text-gray-600">
                                Potency: <span className="font-medium">{result.labResults.potency}%</span>
                              </span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Fingerprint className="w-3 h-3 text-gray-500" />
                              <span className="text-gray-600">
                                Transparency: <span className="font-medium">{result.transparency.score}%</span>
                              </span>
                            </div>
                          </div>

                          {result.warnings.length > 0 && (
                            <div className="mt-3 pt-3 border-t">
                              <div className="flex items-center space-x-2 text-yellow-700">
                                <AlertTriangle className="w-4 h-4" />
                                <span className="text-sm">
                                  {result.warnings.length} {result.warnings.length === 1 ? "warning" : "warnings"}
                                </span>
                              </div>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="recommendations" className="space-y-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                    Quality Improvement Recommendations
                  </CardTitle>
                  <CardDescription>
                    Actionable steps to improve the quality and safety of your supplement protocol
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* General Recommendations */}
                  <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                    <h3 className="text-sm font-medium text-blue-800 mb-3">General Recommendations</h3>
                    <ul className="space-y-3">
                      {auditResults.recommendations.map((recommendation, index) => (
                        <li key={index} className="flex items-start space-x-3 text-sm">
                          <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-gray-800">{recommendation}</p>
                          </div>
                        </li>
                      ))}
                      <li className="flex items-start space-x-3 text-sm">
                        <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-gray-800">
                            Request Certificates of Analysis (CoA) from manufacturers for all supplements with
                            verification status below "Verified"
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start space-x-3 text-sm">
                        <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-gray-800">
                            Consider alternatives for supplements with quality scores below 80% from brands with
                            third-party testing
                          </p>
                        </div>
                      </li>
                    </ul>
                  </div>

                  {/* Alternative Brands */}
                  <div>
                    <h3 className="text-sm font-medium mb-3">Recommended Alternative Brands</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {auditResults.supplements
                        .filter((result) => result.score < 80)
                        .map((result) => (
                          <Card key={result.supplement.id} className="border">
                            <CardContent className="p-4">
                              <div className="flex items-center justify-between mb-3">
                                <div>
                                  <div className="font-medium">{result.supplement.name}</div>
                                  <div className="text-xs text-gray-500">Current Quality Score: {result.score}%</div>
                                </div>
                                {getVerificationBadge(result.verificationStatus)}
                              </div>

                              <div className="space-y-2">
                                <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                                  <div className="flex items-center space-x-2">
                                    <Award className="w-4 h-4 text-green-600" />
                                    <span className="text-sm font-medium">Thorne Research</span>
                                  </div>
                                  <Badge className="bg-green-100 text-green-800">95% Quality</Badge>
                                </div>
                                <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                                  <div className="flex items-center space-x-2">
                                    <Award className="w-4 h-4 text-blue-600" />
                                    <span className="text-sm font-medium">Pure Encapsulations</span>
                                  </div>
                                  <Badge className="bg-green-100 text-green-800">93% Quality</Badge>
                                </div>
                                <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                                  <div className="flex items-center space-x-2">
                                    <Award className="w-4 h-4 text-purple-600" />
                                    <span className="text-sm font-medium">Jarrow Formulas</span>
                                  </div>
                                  <Badge className="bg-blue-100 text-blue-800">88% Quality</Badge>
                                </div>
                              </div>

                              <Button variant="outline" size="sm" className="w-full mt-3">
                                <Search className="w-4 h-4 mr-2" />
                                View Alternatives
                              </Button>
                            </CardContent>
                          </Card>
                        ))}
                    </div>
                  </div>

                  {/* Quality Monitoring */}
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base flex items-center">
                        <Hourglass className="w-4 h-4 mr-2 text-orange-600" />
                        Ongoing Quality Monitoring
                      </CardTitle>
                      <CardDescription>Set up regular quality checks to maintain supplement safety</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                            <span className="font-bold text-blue-600">1</span>
                          </div>
                          <div>
                            <h4 className="font-medium">Schedule Quarterly Audits</h4>
                            <p className="text-sm text-gray-600">
                              Set up automatic quality checks every 3 months to monitor for changes
                            </p>
                          </div>
                          <Button variant="outline" size="sm" className="ml-auto">
                            Schedule
                          </Button>
                        </div>

                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                            <span className="font-bold text-green-600">2</span>
                          </div>
                          <div>
                            <h4 className="font-medium">Enable Regulatory Alerts</h4>
                            <p className="text-sm text-gray-600">
                              Get notified about FDA warnings or recalls for your supplements
                            </p>
                          </div>
                          <Button variant="outline" size="sm" className="ml-auto">
                            Enable
                          </Button>
                        </div>

                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                            <span className="font-bold text-purple-600">3</span>
                          </div>
                          <div>
                            <h4 className="font-medium">Request Lab Certificates</h4>
                            <p className="text-sm text-gray-600">
                              Automatically request updated CoAs from manufacturers
                            </p>
                          </div>
                          <Button variant="outline" size="sm" className="ml-auto">
                            Set Up
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Shield className="w-12 h-12 text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-700 mb-2">Ready to Run Audit</h3>
            <p className="text-gray-500 max-w-md">
              Run a comprehensive quality assessment of all supplements in your protocol
            </p>
            <Button className="mt-6" onClick={runAudit} disabled={isAuditing}>
              {isAuditing ? (
                <>
                  <div className="w-4 h-4 mr-2 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Running Audit...
                </>
              ) : (
                <>
                  <Shield className="w-4 h-4 mr-2" />
                  Start Audit
                </>
              )}
            </Button>
          </div>
        )}

        <DialogFooter className="flex justify-between">
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <Printer className="w-4 h-4 mr-2" />
              Print Report
            </Button>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Download PDF
            </Button>
            <Button variant="outline" size="sm">
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
          </div>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
