"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { Label } from "../ui/label"
import { Checkbox } from "../ui/checkbox"
import { Slider } from "../ui/slider"
import { useRouter } from "next/navigation"
import { Brain, Zap, Moon, Dumbbell, Heart, Shield, ArrowRight, Sparkles, Target, User } from "lucide-react"

const GOALS = [
  { id: "cognitive", label: "Cognitive Enhancement", icon: Brain, description: "Focus, memory, mental clarity" },
  { id: "energy", label: "Energy & Alertness", icon: Zap, description: "Natural energy without crashes" },
  { id: "sleep", label: "Sleep Quality", icon: Moon, description: "Better sleep and recovery" },
  { id: "fitness", label: "Athletic Performance", icon: Dumbbell, description: "Strength, endurance, recovery" },
  { id: "health", label: "General Health", icon: Heart, description: "Overall wellness and vitality" },
  { id: "immunity", label: "Immune Support", icon: Shield, description: "Strengthen immune system" },
]

const LIFESTYLE_FACTORS = [
  "High stress job",
  "Irregular sleep schedule",
  "Regular exercise routine",
  "Vegetarian/Vegan diet",
  "Frequent travel",
  "Desk job/Sedentary",
  "Student/Academic",
  "Shift work",
]

export function AISuggestPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<{
    primaryGoal: string
    secondaryGoals: string[]
    age: number[]
    lifestyle: string[]
    experience: string
    budget: number[]
    timeCommitment: string
  }>({
    primaryGoal: "",
    secondaryGoals: [],
    age: [25],
    lifestyle: [],
    experience: "",
    budget: [100],
    timeCommitment: "",
  })

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1)
    } else {
      // Generate AI suggestions
      router.push(`/stack-lab?ai-suggestions=true&data=${encodeURIComponent(JSON.stringify(formData))}`)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const updateFormData = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                What's your primary goal?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup value={formData.primaryGoal} onValueChange={(value) => updateFormData("primaryGoal", value)}>
                <div className="grid md:grid-cols-2 gap-4">
                  {GOALS.map((goal) => {
                    const Icon = goal.icon
                    return (
                      <div
                        key={goal.id}
                        className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-muted/50"
                      >
                        <RadioGroupItem value={goal.id} id={goal.id} />
                        <Label htmlFor={goal.id} className="flex items-center gap-3 cursor-pointer flex-1">
                          <Icon className="w-5 h-5 text-primary" />
                          <div>
                            <div className="font-medium">{goal.label}</div>
                            <div className="text-sm text-muted-foreground">{goal.description}</div>
                          </div>
                        </Label>
                      </div>
                    )
                  })}
                </div>
              </RadioGroup>
            </CardContent>
          </Card>
        )

      case 2:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Any secondary goals? (Optional)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {GOALS.filter((g) => g.id !== formData.primaryGoal).map((goal) => {
                  const Icon = goal.icon
                  return (
                    <div key={goal.id} className="flex items-center space-x-2 p-4 border rounded-lg">
                      <Checkbox
                        id={goal.id}
                        checked={formData.secondaryGoals.includes(goal.id)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            updateFormData("secondaryGoals", [...formData.secondaryGoals, goal.id])
                          } else {
                            updateFormData(
                              "secondaryGoals",
                              formData.secondaryGoals.filter((g) => g !== goal.id),
                            )
                          }
                        }}
                      />
                      <Label htmlFor={goal.id} className="flex items-center gap-3 cursor-pointer flex-1">
                        <Icon className="w-5 h-5 text-primary" />
                        <div>
                          <div className="font-medium">{goal.label}</div>
                          <div className="text-sm text-muted-foreground">{goal.description}</div>
                        </div>
                      </Label>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        )

      case 3:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Tell us about yourself
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label className="text-base font-medium">Age: {formData.age[0]}</Label>
                <Slider
                  value={formData.age}
                  onValueChange={(value) => updateFormData("age", value)}
                  max={80}
                  min={18}
                  step={1}
                  className="mt-2"
                />
              </div>

              <div>
                <Label className="text-base font-medium mb-3 block">Lifestyle factors (select all that apply)</Label>
                <div className="grid md:grid-cols-2 gap-2">
                  {LIFESTYLE_FACTORS.map((factor) => (
                    <div key={factor} className="flex items-center space-x-2">
                      <Checkbox
                        id={factor}
                        checked={formData.lifestyle.includes(factor)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            updateFormData("lifestyle", [...formData.lifestyle, factor])
                          } else {
                            updateFormData(
                              "lifestyle",
                              formData.lifestyle.filter((f) => f !== factor),
                            )
                          }
                        }}
                      />
                      <Label htmlFor={factor} className="cursor-pointer">
                        {factor}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label className="text-base font-medium mb-3 block">Experience with supplements</Label>
                <RadioGroup value={formData.experience} onValueChange={(value) => updateFormData("experience", value)}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="beginner" id="beginner" />
                    <Label htmlFor="beginner">Beginner - New to supplements</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="intermediate" id="intermediate" />
                    <Label htmlFor="intermediate">Intermediate - Some experience</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="advanced" id="advanced" />
                    <Label htmlFor="advanced">Advanced - Very experienced</Label>
                  </div>
                </RadioGroup>
              </div>
            </CardContent>
          </Card>
        )

      case 4:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Budget & Time Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label className="text-base font-medium">Monthly budget: ${formData.budget[0]}</Label>
                <Slider
                  value={formData.budget}
                  onValueChange={(value) => updateFormData("budget", value)}
                  max={500}
                  min={25}
                  step={25}
                  className="mt-2"
                />
              </div>

              <div>
                <Label className="text-base font-medium mb-3 block">Daily time commitment</Label>
                <RadioGroup
                  value={formData.timeCommitment}
                  onValueChange={(value) => updateFormData("timeCommitment", value)}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="minimal" id="minimal" />
                    <Label htmlFor="minimal">Minimal (1-2 minutes) - Just the essentials</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="moderate" id="moderate" />
                    <Label htmlFor="moderate">Moderate (3-5 minutes) - Balanced approach</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="comprehensive" id="comprehensive" />
                    <Label htmlFor="comprehensive">Comprehensive (5+ minutes) - Optimized protocol</Label>
                  </div>
                </RadioGroup>
              </div>
            </CardContent>
          </Card>
        )

      case 5:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="w-5 h-5" />
                Ready to generate your personalized protocol?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-medium mb-2">Your Profile Summary:</h4>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <p>Primary Goal: {GOALS.find((g) => g.id === formData.primaryGoal)?.label}</p>
                    <p>Age: {formData.age[0]}</p>
                    <p>Experience: {formData.experience}</p>
                    <p>Budget: ${formData.budget[0]}/month</p>
                    <p>Time Commitment: {formData.timeCommitment}</p>
                  </div>
                </div>
                <p className="text-muted-foreground">
                  Our AI will analyze your profile against our database of 50,000+ studies to create a personalized
                  supplement protocol optimized for your goals and lifestyle.
                </p>
              </div>
            </CardContent>
          </Card>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="container mx-auto px-6 py-12 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">AI Protocol Builder</h1>
          <p className="text-xl text-muted-foreground">
            Answer a few questions and let our AI create a personalized supplement protocol for you.
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Step {currentStep} of 5</span>
            <span className="text-sm text-muted-foreground">{Math.round((currentStep / 5) * 100)}% Complete</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / 5) * 100}%` }}
            />
          </div>
        </div>

        {renderStep()}

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <Button variant="outline" onClick={handleBack} disabled={currentStep === 1}>
            Back
          </Button>
          <Button
            onClick={handleNext}
            disabled={
              (currentStep === 1 && !formData.primaryGoal) ||
              (currentStep === 3 && !formData.experience) ||
              (currentStep === 4 && !formData.timeCommitment)
            }
          >
            {currentStep === 5 ? (
              <>
                Generate Protocol
                <Sparkles className="w-4 h-4 ml-2" />
              </>
            ) : (
              <>
                Next
                <ArrowRight className="w-4 h-4 ml-2" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}
