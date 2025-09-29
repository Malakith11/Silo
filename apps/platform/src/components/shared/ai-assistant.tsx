"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "../ui/card"
import { Button } from "../ui/button"
import { Badge } from "../ui/badge"
import { Separator } from "../ui/separator"
import { Bot, AlertTriangle, CheckCircle, TrendingUp, Lightbulb, Target, DollarSign, Clock, Shield } from "lucide-react"
import type { ProtocolData } from "./stack-lab-builder"

interface AIInsight {
  id: string
  type: "warning" | "suggestion" | "optimization" | "info"
  title: string
  message: string
  action?: string
}

interface ProtocolAlternative {
  id: string
  name: string
  changes: string[]
  costDiff: number
  benefits: string[]
  score: number
}

interface AIAssistantProps {
  protocol: ProtocolData
  onOptimize?: () => void
  onAudit?: () => void
}

export function AIAssistant({ protocol, onOptimize, onAudit }: AIAssistantProps) {
  const [insights, setInsights] = useState<AIInsight[]>([])
  const [alternatives, setAlternatives] = useState<ProtocolAlternative[]>([])
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  useEffect(() => {
    setIsAnalyzing(true)
    const timer = setTimeout(() => {
      generateInsights()
      generateAlternatives()
      setIsAnalyzing(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [protocol])

  const generateInsights = () => {
    const newInsights: AIInsight[] = []

    if (protocol.totalCost > 150) {
      newInsights.push({
        id: "budget-warning",
        type: "warning",
        title: "High Budget Alert",
        message: `Your protocol costs $${protocol.totalCost.toFixed(2)}/month. Consider generic alternatives to reduce costs.`,
        action: "Show alternatives",
      })
    } else if (protocol.totalCost < 30) {
      newInsights.push({
        id: "budget-low",
        type: "suggestion",
        title: "Budget Optimization",
        message: "You have room in your budget for additional beneficial supplements.",
        action: "View suggestions",
      })
    }

    const slotsWithManySupplements = protocol.timeSlots.filter((slot) => slot.supplements.length > 4)
    if (slotsWithManySupplements.length > 0) {
      newInsights.push({
        id: "slot-overload",
        type: "warning",
        title: "Time Slot Overload",
        message: `${slotsWithManySupplements.length} time slot(s) have too many supplements. Consider spreading them out.`,
        action: "Optimize timing",
      })
    }

    if (protocol.totalCost > 0 && protocol.totalCost <= 100) {
      newInsights.push({
        id: "good-balance",
        type: "info",
        title: "Well-Balanced Protocol",
        message: "Your protocol shows a good balance of cost-effectiveness and comprehensive coverage.",
      })
    }

    setInsights(newInsights)
  }

  const generateAlternatives = () => {
    const newAlternatives: ProtocolAlternative[] = [
      {
        id: "budget-friendly",
        name: "Budget-Friendly Alternative",
        changes: ["Replace Ashwagandha with L-Theanine", "Use Vitamin D2 instead of D3"],
        costDiff: -25,
        benefits: ["Lower cost", "Similar stress relief"],
        score: 85,
      },
      {
        id: "performance-focused",
        name: "Performance-Enhanced",
        changes: ["Add Beta-Alanine", "Increase Creatine timing"],
        costDiff: 15,
        benefits: ["Better workout performance", "Enhanced recovery"],
        score: 92,
      },
      {
        id: "simplified",
        name: "Simplified Protocol",
        changes: ["Combine into multivitamin", "Reduce to 2 time slots"],
        costDiff: -10,
        benefits: ["Easier adherence", "Fewer pills"],
        score: 78,
      },
    ]

    setAlternatives(newAlternatives)
  }

  const getInsightIcon = (type: string) => {
    switch (type) {
      case "warning":
        return <AlertTriangle className="w-4 h-4 text-amber-500" />
      case "suggestion":
        return <Lightbulb className="w-4 h-4 text-blue-500" />
      case "optimization":
        return <TrendingUp className="w-4 h-4 text-green-500" />
      case "info":
        return <CheckCircle className="w-4 h-4 text-green-500" />
      default:
        return <Bot className="w-4 h-4 text-gray-500" />
    }
  }

  const getInsightColor = (type: string) => {
    switch (type) {
      case "warning":
        return "border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-900/20"
      case "suggestion":
        return "border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-900/20"
      case "optimization":
        return "border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20"
      case "info":
        return "border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20"
      default:
        return "border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800"
    }
  }

  const handleInsightAction = (insight: AIInsight) => {
    if (insight.action === "Optimize timing" && onOptimize) {
      onOptimize()
    } else if (insight.action === "Show alternatives" && onOptimize) {
      onOptimize()
    }
  }

  return (
    <div className="h-full flex flex-col bg-white dark:bg-gray-800">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-2 mb-4">
          <Bot className="w-5 h-5 text-blue-600" />
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">AI Assistant</h2>
          {isAnalyzing && (
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <span className="text-xs text-gray-500 dark:text-gray-400">Analyzing...</span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="text-center p-2 bg-gray-50 dark:bg-gray-700 rounded">
            <DollarSign className="w-4 h-4 mx-auto mb-1 text-green-600" />
            <div className="text-xs font-medium text-gray-900 dark:text-gray-100">
              ${protocol.totalCost.toFixed(0)}/mo
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Total Cost</div>
          </div>
          <div className="text-center p-2 bg-gray-50 dark:bg-gray-700 rounded">
            <Target className="w-4 h-4 mx-auto mb-1 text-blue-600" />
            <div className="text-xs font-medium text-gray-900 dark:text-gray-100">{protocol.complexity}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Complexity</div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <div>
          <h3 className="text-sm font-semibold mb-3 flex items-center text-gray-900 dark:text-gray-100">
            <Lightbulb className="w-4 h-4 mr-2" />
            AI Insights
          </h3>
          <div className="space-y-3">
            {insights.map((insight) => (
              <Card key={insight.id} className={`${getInsightColor(insight.type)} border`}>
                <CardContent className="p-3">
                  <div className="flex items-start space-x-2">
                    {getInsightIcon(insight.type)}
                    <div className="flex-1">
                      <h4 className="text-sm font-medium mb-1 text-gray-900 dark:text-gray-100">{insight.title}</h4>
                      <p className="text-xs text-gray-600 dark:text-gray-300 mb-2">{insight.message}</p>
                      {insight.action && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-xs h-6"
                          onClick={() => handleInsightAction(insight)}
                        >
                          {insight.action}
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <Separator className="dark:bg-gray-700" />

        <div>
          <h3 className="text-sm font-semibold mb-3 flex items-center text-gray-900 dark:text-gray-100">
            <TrendingUp className="w-4 h-4 mr-2" />
            Alternative Protocols
          </h3>
          <div className="space-y-3">
            {alternatives.map((alternative) => (
              <Card
                key={alternative.id}
                className="border hover:shadow-md transition-shadow bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600"
              >
                <CardContent className="p-3">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100">{alternative.name}</h4>
                    <Badge variant="outline" className="text-xs">
                      Score: {alternative.score}
                    </Badge>
                  </div>

                  <div className="space-y-2">
                    <div>
                      <p className="text-xs text-gray-600 dark:text-gray-300 mb-1">Changes:</p>
                      <ul className="text-xs space-y-1">
                        {alternative.changes.map((change, index) => (
                          <li key={index} className="flex items-center space-x-1">
                            <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                            <span className="text-gray-700 dark:text-gray-300">{change}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <p className="text-xs text-gray-600 dark:text-gray-300 mb-1">Benefits:</p>
                      <div className="flex flex-wrap gap-1">
                        {alternative.benefits.map((benefit) => (
                          <Badge key={benefit} variant="secondary" className="text-xs">
                            {benefit}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center space-x-1">
                        <DollarSign className="w-3 h-3" />
                        <span
                          className={`text-xs font-medium ${
                            alternative.costDiff < 0 ? "text-green-600" : "text-red-600"
                          }`}
                        >
                          {alternative.costDiff > 0 ? "+" : ""}${alternative.costDiff}
                        </span>
                      </div>
                      <Button variant="outline" size="sm" className="text-xs h-6">
                        Apply
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <Separator className="dark:bg-gray-700" />

        <div>
          <h3 className="text-sm font-semibold mb-3 text-gray-900 dark:text-gray-100">Quick Actions</h3>
          <div className="space-y-2">
            <Button variant="outline" size="sm" className="w-full justify-start text-xs" onClick={onOptimize}>
              <Clock className="w-3 h-3 mr-2" />
              Optimize Timing
            </Button>
            <Button variant="outline" size="sm" className="w-full justify-start text-xs">
              <DollarSign className="w-3 h-3 mr-2" />
              Reduce Costs
            </Button>
            <Button variant="outline" size="sm" className="w-full justify-start text-xs">
              <Target className="w-3 h-3 mr-2" />
              Add Goal Focus
            </Button>
            <Button variant="outline" size="sm" className="w-full justify-start text-xs" onClick={onAudit}>
              <Shield className="w-3 h-3 mr-2" />
              Run Quality Audit
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
