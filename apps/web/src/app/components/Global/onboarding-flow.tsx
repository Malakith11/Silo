"use client"

import React from "react"

import { useState } from "react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Progress } from "../ui/progress"
import { Textarea } from "../ui/textarea"
import { Checkbox } from "../ui/checkbox"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { ArrowRight, ArrowLeft, User, Target, Heart, Activity, BarChart3, Settings, CheckCircle } from "lucide-react"
import { useRouter } from "next/navigation"

interface UserProfile {
  // Demographics
  name: string
  age: string
  gender: string
  weight: string
  height: string
  activityLevel: string

  // Goals
  primaryGoal: string
  secondaryGoals: string[]
  timeframe: string

  // Health
  healthConditions: string[]
  medications: string[]
  allergies: string[]

  // Lifestyle
  sleepHours: string
  stressLevel: string
  exerciseFrequency: string
  dietType: string

  // Health Markers (optional)
  bloodPressure: string
  cholesterol: string
  vitaminD: string
  b12: string

  // Preferences
  budget: string
  supplementExperience: string
  preferredForms: string[]
  avoidIngredients: string[]
}

const initialProfile: UserProfile = {
  name: "",
  age: "",
  gender: "",
  weight: "",
  height: "",
  activityLevel: "",
  primaryGoal: "",
  secondaryGoals: [],
  timeframe: "",
  healthConditions: [],
  medications: [],
  allergies: [],
  sleepHours: "",
  stressLevel: "",
  exerciseFrequency: "",
  dietType: "",
  bloodPressure: "",
  cholesterol: "",
  vitaminD: "",
  b12: "",
  budget: "",
  supplementExperience: "",
  preferredForms: [],
  avoidIngredients: [],
}

const STEPS = [
  { id: 1, title: "Personal Info", icon: User, description: "Tell us about yourself" },
  { id: 2, title: "Goals", icon: Target, description: "What do you want to achieve?" },
  { id: 3, title: "Health", icon: Heart, description: "Your health background" },
  { id: 4, title: "Lifestyle", icon: Activity, description: "Daily habits and routines" },
  { id: 5, title: "Health Markers", icon: BarChart3, description: "Optional lab values" },
  { id: 6, title: "Preferences", icon: Settings, description: "Supplement preferences" },
]

const HEALTH_GOALS = [
  "Improve Energy & Focus",
  "Better Sleep Quality",
  "Muscle Building & Recovery",
  "Weight Management",
  "Immune System Support",
  "Heart Health",
  "Brain Health & Cognition",
  "Stress & Anxiety Management",
  "Digestive Health",
  "Bone & Joint Health",
  "Skin Health",
  "Athletic Performance",
]

const HEALTH_CONDITIONS = [
  "Diabetes",
  "High Blood Pressure",
  "High Cholesterol",
  "Thyroid Issues",
  "Anxiety/Depression",
  "Digestive Issues",
  "Autoimmune Condition",
  "Heart Disease",
  "Kidney Disease",
  "Liver Disease",
]

export function OnboardingFlow() {
  const [currentStep, setCurrentStep] = useState(1)
  const [profile, setProfile] = useState<UserProfile>(initialProfile)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const updateProfile = (updates: Partial<UserProfile>) => {
    setProfile((prev) => ({ ...prev, ...updates }))
  }

  const handleArrayToggle = (array: string[], value: string, key: keyof UserProfile) => {
    const newArray = array.includes(value) ? array.filter((item) => item !== value) : [...array, value]
    updateProfile({ [key]: newArray })
  }

  const nextStep = () => {
    if (currentStep < STEPS.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)

    // Save profile to localStorage (in a real app, you'd send to your backend)
    localStorage.setItem("siloUserProfile", JSON.stringify(profile))

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    router.push("/dashboard")
  }

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return profile.name && profile.age && profile.gender && profile.activityLevel
      case 2:
        return profile.primaryGoal && profile.timeframe
      case 3:
        return true // Health step is optional
      case 4:
        return profile.sleepHours && profile.stressLevel && profile.exerciseFrequency && profile.dietType
      case 5:
        return true // Health markers are optional
      case 6:
        return profile.budget && profile.supplementExperience
      default:
        return false
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  value={profile.name}
                  onChange={(e) => updateProfile({ name: e.target.value })}
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <Label htmlFor="age">Age *</Label>
                <Input
                  id="age"
                  type="number"
                  value={profile.age}
                  onChange={(e) => updateProfile({ age: e.target.value })}
                  placeholder="Enter your age"
                />
              </div>
            </div>

            <div>
              <Label>Gender *</Label>
              <RadioGroup value={profile.gender} onValueChange={(value) => updateProfile({ gender: value })}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="male" id="male" />
                  <Label htmlFor="male">Male</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="female" id="female" />
                  <Label htmlFor="female">Female</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="other" id="other" />
                  <Label htmlFor="other">Other</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="weight">Weight (lbs)</Label>
                <Input
                  id="weight"
                  type="number"
                  value={profile.weight}
                  onChange={(e) => updateProfile({ weight: e.target.value })}
                  placeholder="Enter weight"
                />
              </div>
              <div>
                <Label htmlFor="height">Height (inches)</Label>
                <Input
                  id="height"
                  type="number"
                  value={profile.height}
                  onChange={(e) => updateProfile({ height: e.target.value })}
                  placeholder="Enter height"
                />
              </div>
            </div>

            <div>
              <Label>Activity Level *</Label>
              <Select value={profile.activityLevel} onValueChange={(value) => updateProfile({ activityLevel: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your activity level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sedentary">Sedentary (little to no exercise)</SelectItem>
                  <SelectItem value="light">Light (1-3 days/week)</SelectItem>
                  <SelectItem value="moderate">Moderate (3-5 days/week)</SelectItem>
                  <SelectItem value="active">Active (6-7 days/week)</SelectItem>
                  <SelectItem value="very-active">Very Active (2x/day or intense training)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <Label>Primary Health Goal *</Label>
              <RadioGroup value={profile.primaryGoal} onValueChange={(value) => updateProfile({ primaryGoal: value })}>
                {HEALTH_GOALS.map((goal) => (
                  <div key={goal} className="flex items-center space-x-2">
                    <RadioGroupItem value={goal} id={goal} />
                    <Label htmlFor={goal}>{goal}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div>
              <Label>Secondary Goals (optional)</Label>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {HEALTH_GOALS.filter((goal) => goal !== profile.primaryGoal).map((goal) => (
                  <div key={goal} className="flex items-center space-x-2">
                    <Checkbox
                      id={`secondary-${goal}`}
                      checked={profile.secondaryGoals.includes(goal)}
                      onCheckedChange={() => handleArrayToggle(profile.secondaryGoals, goal, "secondaryGoals")}
                    />
                    <Label htmlFor={`secondary-${goal}`} className="text-sm">
                      {goal}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label>Timeframe *</Label>
              <Select value={profile.timeframe} onValueChange={(value) => updateProfile({ timeframe: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="When do you want to see results?" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1-month">1 Month</SelectItem>
                  <SelectItem value="3-months">3 Months</SelectItem>
                  <SelectItem value="6-months">6 Months</SelectItem>
                  <SelectItem value="1-year">1 Year or more</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <Label>Health Conditions (select all that apply)</Label>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {HEALTH_CONDITIONS.map((condition) => (
                  <div key={condition} className="flex items-center space-x-2">
                    <Checkbox
                      id={condition}
                      checked={profile.healthConditions.includes(condition)}
                      onCheckedChange={() => handleArrayToggle(profile.healthConditions, condition, "healthConditions")}
                    />
                    <Label htmlFor={condition} className="text-sm">
                      {condition}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="medications">Current Medications</Label>
              <Textarea
                id="medications"
                value={profile.medications.join(", ")}
                onChange={(e) => updateProfile({ medications: e.target.value.split(", ").filter(Boolean) })}
                placeholder="List any medications you're currently taking (separated by commas)"
              />
            </div>

            <div>
              <Label htmlFor="allergies">Allergies & Sensitivities</Label>
              <Textarea
                id="allergies"
                value={profile.allergies.join(", ")}
                onChange={(e) => updateProfile({ allergies: e.target.value.split(", ").filter(Boolean) })}
                placeholder="List any allergies or sensitivities (separated by commas)"
              />
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <Label>Average Sleep Hours *</Label>
              <Select value={profile.sleepHours} onValueChange={(value) => updateProfile({ sleepHours: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="How many hours do you sleep?" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="less-than-5">Less than 5 hours</SelectItem>
                  <SelectItem value="5-6">5-6 hours</SelectItem>
                  <SelectItem value="6-7">6-7 hours</SelectItem>
                  <SelectItem value="7-8">7-8 hours</SelectItem>
                  <SelectItem value="8-9">8-9 hours</SelectItem>
                  <SelectItem value="more-than-9">More than 9 hours</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Stress Level *</Label>
              <RadioGroup value={profile.stressLevel} onValueChange={(value) => updateProfile({ stressLevel: value })}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="low" id="stress-low" />
                  <Label htmlFor="stress-low">Low</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="moderate" id="stress-moderate" />
                  <Label htmlFor="stress-moderate">Moderate</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="high" id="stress-high" />
                  <Label htmlFor="stress-high">High</Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label>Exercise Frequency *</Label>
              <Select
                value={profile.exerciseFrequency}
                onValueChange={(value) => updateProfile({ exerciseFrequency: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="How often do you exercise?" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="never">Never</SelectItem>
                  <SelectItem value="1-2-times">1-2 times per week</SelectItem>
                  <SelectItem value="3-4-times">3-4 times per week</SelectItem>
                  <SelectItem value="5-6-times">5-6 times per week</SelectItem>
                  <SelectItem value="daily">Daily</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Diet Type *</Label>
              <Select value={profile.dietType} onValueChange={(value) => updateProfile({ dietType: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="What best describes your diet?" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="omnivore">Omnivore</SelectItem>
                  <SelectItem value="vegetarian">Vegetarian</SelectItem>
                  <SelectItem value="vegan">Vegan</SelectItem>
                  <SelectItem value="keto">Ketogenic</SelectItem>
                  <SelectItem value="paleo">Paleo</SelectItem>
                  <SelectItem value="mediterranean">Mediterranean</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <p className="text-gray-600 dark:text-gray-400">
                If you have recent lab results, enter them below. This helps us provide more accurate recommendations.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="bloodPressure">Blood Pressure</Label>
                <Input
                  id="bloodPressure"
                  value={profile.bloodPressure}
                  onChange={(e) => updateProfile({ bloodPressure: e.target.value })}
                  placeholder="e.g., 120/80"
                />
              </div>
              <div>
                <Label htmlFor="cholesterol">Total Cholesterol</Label>
                <Input
                  id="cholesterol"
                  value={profile.cholesterol}
                  onChange={(e) => updateProfile({ cholesterol: e.target.value })}
                  placeholder="e.g., 180 mg/dL"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="vitaminD">Vitamin D</Label>
                <Input
                  id="vitaminD"
                  value={profile.vitaminD}
                  onChange={(e) => updateProfile({ vitaminD: e.target.value })}
                  placeholder="e.g., 30 ng/mL"
                />
              </div>
              <div>
                <Label htmlFor="b12">Vitamin B12</Label>
                <Input
                  id="b12"
                  value={profile.b12}
                  onChange={(e) => updateProfile({ b12: e.target.value })}
                  placeholder="e.g., 400 pg/mL"
                />
              </div>
            </div>
          </div>
        )

      case 6:
        return (
          <div className="space-y-6">
            <div>
              <Label>Monthly Budget *</Label>
              <Select value={profile.budget} onValueChange={(value) => updateProfile({ budget: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="How much are you willing to spend monthly?" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="under-50">Under $50</SelectItem>
                  <SelectItem value="50-100">$50 - $100</SelectItem>
                  <SelectItem value="100-200">$100 - $200</SelectItem>
                  <SelectItem value="200-300">$200 - $300</SelectItem>
                  <SelectItem value="over-300">Over $300</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Supplement Experience *</Label>
              <RadioGroup
                value={profile.supplementExperience}
                onValueChange={(value) => updateProfile({ supplementExperience: value })}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="beginner" id="exp-beginner" />
                  <Label htmlFor="exp-beginner">Beginner (new to supplements)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="intermediate" id="exp-intermediate" />
                  <Label htmlFor="exp-intermediate">Intermediate (some experience)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="advanced" id="exp-advanced" />
                  <Label htmlFor="exp-advanced">Advanced (very experienced)</Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label>Preferred Forms (select all that apply)</Label>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {["Capsules", "Tablets", "Powders", "Liquids", "Gummies", "Softgels"].map((form) => (
                  <div key={form} className="flex items-center space-x-2">
                    <Checkbox
                      id={form}
                      checked={profile.preferredForms.includes(form)}
                      onCheckedChange={() => handleArrayToggle(profile.preferredForms, form, "preferredForms")}
                    />
                    <Label htmlFor={form} className="text-sm">
                      {form}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="avoidIngredients">Ingredients to Avoid</Label>
              <Textarea
                id="avoidIngredients"
                value={profile.avoidIngredients.join(", ")}
                onChange={(e) => updateProfile({ avoidIngredients: e.target.value.split(", ").filter(Boolean) })}
                placeholder="List any ingredients you want to avoid (separated by commas)"
              />
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Create Your Health Profile</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Help us understand your unique needs to create the perfect supplement protocol
          </p>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {STEPS.map((step, index) => {
              const Icon = step.icon
              const isActive = currentStep === step.id
              const isCompleted = currentStep > step.id

              return (
                <div key={step.id} className="flex flex-col items-center">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-colors ${
                      isCompleted
                        ? "bg-green-500 border-green-500 text-white"
                        : isActive
                          ? "bg-blue-500 border-blue-500 text-white"
                          : "bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-400"
                    }`}
                  >
                    {isCompleted ? <CheckCircle className="w-6 h-6" /> : <Icon className="w-6 h-6" />}
                  </div>
                  <div className="text-center mt-2">
                    <div
                      className={`text-sm font-medium ${isActive ? "text-blue-600 dark:text-blue-400" : "text-gray-500 dark:text-gray-400"}`}
                    >
                      {step.title}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
          <Progress value={(currentStep / STEPS.length) * 100} className="h-2" />
        </div>

        {/* Content */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {React.createElement(STEPS[currentStep - 1].icon, { className: "w-5 h-5" })}
              {STEPS[currentStep - 1].title}
            </CardTitle>
            <CardDescription>{STEPS[currentStep - 1].description}</CardDescription>
          </CardHeader>
          <CardContent>{renderStep()}</CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button variant="outline" onClick={prevStep} disabled={currentStep === 1} className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Previous
          </Button>

          {currentStep === STEPS.length ? (
            <Button
              onClick={handleSubmit}
              disabled={!isStepValid() || isSubmitting}
              className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white"
            >
              {isSubmitting ? "Creating Profile..." : "Complete Setup"}
              <ArrowRight className="w-4 h-4" />
            </Button>
          ) : (
            <Button onClick={nextStep} disabled={!isStepValid()} className="flex items-center gap-2">
              Next
              <ArrowRight className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
