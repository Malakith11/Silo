"use client"

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Badge } from "../ui/badge"
import { Progress } from "../ui/progress"
import { Button } from "../ui/button"
import {
  Target,
  TrendingUp,
  Shield,
  DollarSign,
  Clock,
  AlertTriangle,
  CheckCircle,
  Brain,
  Heart,
  Zap,
  Moon,
  Activity,
  ChevronDown,
  ChevronUp,
} from "lucide-react"
import { useState } from "react"
import type { ProtocolData } from "./stack-lab-builder"

interface SiloAssessmentProps {
  protocol: ProtocolData
  selectedGoals: string[]
}

export function SiloAssessment({ protocol, selectedGoals }: SiloAssessmentProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const allSupplements = protocol.timeSlots.flatMap((slot) => slot.supplements)

  const calculateGoalAlignment = () => {
    if (selectedGoals.length === 0 || allSupplements.length === 0) return 0

    const relevanceScores = allSupplements.map((supplement) => {
      if (!supplement.research?.goalRelevance) return 0
      const goalScores = selectedGoals.map((goal) => supplement.research.goalRelevance[goal] || 0)
      return goalScores.reduce((a, b) => a + b, 0) / goalScores.length
    })

    return Math.round(relevanceScores.reduce((a, b) => a + b, 0) / relevanceScores.length)
  }

  const calculateEfficacyScore = () => {
    if (allSupplements.length === 0) return 0
    const scores = allSupplements.map((s) => s.research?.efficacyScore || 0)
    return Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
  }

  const calculateSafetyScore = () => {
    if (allSupplements.length === 0) return 0
    const scores = allSupplements.map((s) => s.research?.safetyScore || 0)
    return Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
  }

  const calculateBudgetEfficiency = () => {
    if (protocol.totalCost === 0) return 0
    const efficacyPerDollar = calculateEfficacyScore() / protocol.totalCost
    return Math.min(100, Math.round(efficacyPerDollar * 10))
  }

  const getOverallScore = () => {
    const scores = [
      calculateGoalAlignment(),
      calculateEfficacyScore(),
      calculateSafetyScore(),
      calculateBudgetEfficiency(),
    ]
    return Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
  }

  const getScoreColor = (score: number) => {
    if (score >= 85) return "text-green-600"
    if (score >= 70) return "text-yellow-600"
    return "text-red-600"
  }

  const getScoreIcon = (score: number) => {
    if (score >= 85) return <CheckCircle className="w-4 h-4 text-green-600" />
    if (score >= 70) return <AlertTriangle className="w-4 h-4 text-yellow-600" />
    return <AlertTriangle className="w-4 h-4 text-red-600" />
  }

  const getGoalIcon = (goal: string) => {
    const icons: Record<string, any> = {
      "Focus & Cognitive Enhancement": Brain,
      "Heart Health": Heart,
      "Energy & Performance": Zap,
      "Sleep Optimization": Moon,
      "Muscle Recovery": Activity,
    }
    const IconComponent = icons[goal] || Target
    return <IconComponent className="w-4 h-4" />
  }

  const overallScore = getOverallScore()
  const goalAlignment = calculateGoalAlignment()
  const efficacyScore = calculateEfficacyScore()
  const safetyScore = calculateSafetyScore()
  const budgetEfficiency = calculateBudgetEfficiency()

  return (
    <Card className="border-2 border-blue-100 dark:border-blue-800 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 shadow-sm">
      <CardHeader className="pb-2 pt-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2 text-base">
            <div className="p-1.5 bg-blue-100 dark:bg-blue-800 rounded-lg">
              <Target className="w-4 h-4 text-blue-600 dark:text-blue-300" />
            </div>
            <span className="text-gray-900 dark:text-gray-100">Silo Assessment</span>
          </CardTitle>
          <div className="flex items-center space-x-2">
            <div className="text-right">
              <div className="text-xl font-bold text-blue-600 dark:text-blue-400">{overallScore}</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">Overall Score</div>
            </div>
            {getScoreIcon(overallScore)}
            <Button variant="ghost" size="sm" className="p-0 h-8 w-8" onClick={() => setIsExpanded(!isExpanded)}>
              {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </CardHeader>

      {isExpanded ? (
        <CardContent className="space-y-4 pt-2">
          <div className="grid grid-cols-4 gap-2">
            <div className="text-center p-2 bg-white dark:bg-gray-700 rounded-lg">
              <div className="flex items-center justify-center mb-1">
                <Target className="w-3 h-3 text-blue-600" />
              </div>
              <div className="text-base font-bold text-gray-900 dark:text-gray-100">{allSupplements.length}</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">Supplements</div>
            </div>
            <div className="text-center p-2 bg-white dark:bg-gray-700 rounded-lg">
              <div className="flex items-center justify-center mb-1">
                <DollarSign className="w-3 h-3 text-green-600" />
              </div>
              <div className="text-base font-bold text-gray-900 dark:text-gray-100">${protocol.totalCost}</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">Monthly Cost</div>
            </div>
            <div className="text-center p-2 bg-white dark:bg-gray-700 rounded-lg">
              <div className="flex items-center justify-center mb-1">
                <Clock className="w-3 h-3 text-purple-600" />
              </div>
              <div className="text-base font-bold text-gray-900 dark:text-gray-100">{protocol.timeSlots.length}</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">Time Slots</div>
            </div>
            <div className="text-center p-2 bg-white dark:bg-gray-700 rounded-lg">
              <div className="flex items-center justify-center mb-1">
                <TrendingUp className="w-3 h-3 text-orange-600" />
              </div>
              <div className="text-base font-bold text-gray-900 dark:text-gray-100">{protocol.complexity}</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">Complexity</div>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-medium text-gray-900 dark:text-gray-100 text-sm">Assessment Breakdown</h4>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Target className="w-3 h-3 text-blue-600" />
                  <span className="text-xs font-medium text-gray-900 dark:text-gray-100">Goal Alignment</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Progress value={goalAlignment} className="w-16 h-1.5" />
                  <span className={`text-xs font-bold w-6 ${getScoreColor(goalAlignment)}`}>{goalAlignment}%</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="w-3 h-3 text-green-600" />
                  <span className="text-xs font-medium text-gray-900 dark:text-gray-100">Research Efficacy</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Progress value={efficacyScore} className="w-16 h-1.5" />
                  <span className={`text-xs font-bold w-6 ${getScoreColor(efficacyScore)}`}>{efficacyScore}%</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Shield className="w-3 h-3 text-purple-600" />
                  <span className="text-xs font-medium text-gray-900 dark:text-gray-100">Safety Profile</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Progress value={safetyScore} className="w-16 h-1.5" />
                  <span className={`text-xs font-bold w-6 ${getScoreColor(safetyScore)}`}>{safetyScore}%</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <DollarSign className="w-3 h-3 text-orange-600" />
                  <span className="text-xs font-medium text-gray-900 dark:text-gray-100">Budget Efficiency</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Progress value={budgetEfficiency} className="w-16 h-1.5" />
                  <span className={`text-xs font-bold w-6 ${getScoreColor(budgetEfficiency)}`}>
                    {budgetEfficiency}%
                  </span>
                </div>
              </div>
            </div>
          </div>

          {selectedGoals.length > 0 && (
            <div>
              <h4 className="font-medium text-gray-900 dark:text-gray-100 text-sm mb-2">Target Goals</h4>
              <div className="flex flex-wrap gap-1">
                {selectedGoals.map((goal) => (
                  <Badge key={goal} variant="outline" className="flex items-center space-x-1 text-xs">
                    {getGoalIcon(goal)}
                    <span>{goal}</span>
                  </Badge>
                ))}
              </div>
            </div>
          )}

          <div className="flex space-x-2">
            <Button variant="outline" size="sm" className="flex-1 text-xs h-8">
              <TrendingUp className="w-3 h-3 mr-1" />
              Optimize Protocol
            </Button>
            <Button variant="outline" size="sm" className="flex-1 text-xs h-8">
              <Shield className="w-3 h-3 mr-1" />
              Run Full Audit
            </Button>
          </div>
        </CardContent>
      ) : (
        <CardContent className="pt-0 pb-3">
          <div className="flex items-center justify-between">
            <div className="flex space-x-4">
              <div className="flex items-center space-x-1">
                <Target className="w-3 h-3 text-blue-600" />
                <span className="text-xs text-gray-900 dark:text-gray-100">{allSupplements.length} supplements</span>
              </div>
              <div className="flex items-center space-x-1">
                <DollarSign className="w-3 h-3 text-green-600" />
                <span className="text-xs text-gray-900 dark:text-gray-100">${protocol.totalCost}/mo</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="w-3 h-3 text-purple-600" />
                <span className="text-xs text-gray-900 dark:text-gray-100">{protocol.timeSlots.length} slots</span>
              </div>
            </div>

            {selectedGoals.length > 0 && (
              <div className="flex items-center space-x-1">
                <span className="text-xs text-gray-600 dark:text-gray-400">Goals:</span>
                <div className="flex space-x-1">
                  {selectedGoals.slice(0, 2).map((goal) => (
                    <Badge key={goal} variant="outline" className="text-xs py-0 px-1 h-5">
                      {goal.split(" ")[0]}
                    </Badge>
                  ))}
                  {selectedGoals.length > 2 && (
                    <Badge variant="outline" className="text-xs py-0 px-1 h-5">
                      +{selectedGoals.length - 2}
                    </Badge>
                  )}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      )}
    </Card>
  )
}
