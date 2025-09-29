"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { useRouter } from "next/navigation"
import { Search, Clock, Target, Brain, Zap, Moon, Dumbbell, Heart, Shield, Star, Users, ArrowRight } from "lucide-react"

const PROTOCOL_TEMPLATES = [
  {
    id: "cognitive-boost",
    name: "Cognitive Enhancement",
    description: "Optimize focus, memory, and mental clarity",
    icon: Brain,
    difficulty: "Beginner",
    duration: "4-6 weeks",
    supplements: ["Lion's Mane", "Bacopa Monnieri", "Rhodiola Rosea"],
    goals: ["Focus", "Memory", "Mental Energy"],
    users: 2847,
    rating: 4.8,
    timeCommitment: "5 min/day",
    category: "Cognitive",
  },
  {
    id: "energy-optimizer",
    name: "Natural Energy Boost",
    description: "Sustained energy without crashes",
    icon: Zap,
    difficulty: "Beginner",
    duration: "2-4 weeks",
    supplements: ["Caffeine + L-Theanine", "B-Complex", "CoQ10"],
    goals: ["Energy", "Alertness", "Endurance"],
    users: 3421,
    rating: 4.9,
    timeCommitment: "3 min/day",
    category: "Energy",
  },
  {
    id: "sleep-optimizer",
    name: "Sleep Quality Enhancement",
    description: "Improve sleep quality and recovery",
    icon: Moon,
    difficulty: "Beginner",
    duration: "3-5 weeks",
    supplements: ["Magnesium Glycinate", "Melatonin", "L-Theanine"],
    goals: ["Sleep Quality", "Recovery", "Relaxation"],
    users: 1923,
    rating: 4.7,
    timeCommitment: "2 min/day",
    category: "Sleep",
  },
  {
    id: "athletic-performance",
    name: "Athletic Performance",
    description: "Enhance strength, endurance, and recovery",
    icon: Dumbbell,
    difficulty: "Intermediate",
    duration: "6-8 weeks",
    supplements: ["Creatine", "Beta-Alanine", "Citrulline", "Protein"],
    goals: ["Strength", "Endurance", "Recovery"],
    users: 4156,
    rating: 4.8,
    timeCommitment: "8 min/day",
    category: "Performance",
  },
  {
    id: "heart-health",
    name: "Cardiovascular Support",
    description: "Support heart health and circulation",
    icon: Heart,
    difficulty: "Beginner",
    duration: "8-12 weeks",
    supplements: ["Omega-3", "CoQ10", "Magnesium", "Vitamin D"],
    goals: ["Heart Health", "Circulation", "Blood Pressure"],
    users: 1654,
    rating: 4.6,
    timeCommitment: "4 min/day",
    category: "Health",
  },
  {
    id: "immune-support",
    name: "Immune System Boost",
    description: "Strengthen immune function and resilience",
    icon: Shield,
    difficulty: "Beginner",
    duration: "4-6 weeks",
    supplements: ["Vitamin C", "Vitamin D", "Zinc", "Elderberry"],
    goals: ["Immunity", "Resilience", "Recovery"],
    users: 2341,
    rating: 4.5,
    timeCommitment: "3 min/day",
    category: "Health",
  },
]

const CATEGORIES = ["All", "Cognitive", "Energy", "Sleep", "Performance", "Health"]
const DIFFICULTIES = ["All", "Beginner", "Intermediate", "Advanced"]

export function ProtocolTemplatesPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedDifficulty, setSelectedDifficulty] = useState("All")

  const filteredTemplates = PROTOCOL_TEMPLATES.filter((template) => {
    const matchesSearch =
      template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All" || template.category === selectedCategory
    const matchesDifficulty = selectedDifficulty === "All" || template.difficulty === selectedDifficulty

    return matchesSearch && matchesCategory && matchesDifficulty
  })

  const handleUseTemplate = (templateId: string) => {
    router.push(`/stack-lab?template=${templateId}`)
  }

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="container mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Protocol Templates</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Choose from our curated collection of evidence-based supplement protocols designed for specific goals and
            lifestyles.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search templates..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {CATEGORIES.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Difficulty" />
            </SelectTrigger>
            <SelectContent>
              {DIFFICULTIES.map((difficulty) => (
                <SelectItem key={difficulty} value={difficulty}>
                  {difficulty}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Templates Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map((template) => {
            const Icon = template.icon
            return (
              <Card key={template.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <Badge variant="outline">{template.difficulty}</Badge>
                  </div>
                  <CardTitle className="text-xl">{template.name}</CardTitle>
                  <p className="text-muted-foreground">{template.description}</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Stats */}
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span>{template.rating}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4 text-muted-foreground" />
                      <span>{template.users.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span>{template.timeCommitment}</span>
                    </div>
                  </div>

                  {/* Goals */}
                  <div>
                    <h4 className="font-medium mb-2">Goals</h4>
                    <div className="flex flex-wrap gap-1">
                      {template.goals.map((goal) => (
                        <Badge key={goal} variant="secondary" className="text-xs">
                          {goal}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Key Supplements */}
                  <div>
                    <h4 className="font-medium mb-2">Key Supplements</h4>
                    <div className="text-sm text-muted-foreground">
                      {template.supplements.slice(0, 3).join(", ")}
                      {template.supplements.length > 3 && ` +${template.supplements.length - 3} more`}
                    </div>
                  </div>

                  {/* Duration */}
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Target className="w-4 h-4" />
                    <span>Expected results in {template.duration}</span>
                  </div>

                  <Button className="w-full" onClick={() => handleUseTemplate(template.id)}>
                    Use This Template
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {filteredTemplates.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No templates found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  )
}
