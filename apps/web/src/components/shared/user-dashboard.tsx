"use client"

import { useState, useEffect } from "react"
import { Button } from "../ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Badge } from "../ui/badge"
import { Progress } from "../ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import { Avatar, AvatarFallback } from "../ui/avatar"
import {
  User,
  Target,
  Zap,
  Brain,
  Trophy,
  Flame,
  Calendar,
  BookOpen,
  Pill,
  ArrowRight,
  Sparkles,
  Bot,
  Edit3,
} from "lucide-react"
import { useRouter } from "next/navigation"

interface UserProfile {
  name: string
  age: string
  gender: string
  primaryGoal: string
  secondaryGoals: string[]
  activityLevel: string
  budget: string
  supplementExperience: string
  timeframe: string
}

const ACHIEVEMENT_BADGES = [
  { id: "profile-complete", name: "Profile Complete", icon: User, color: "bg-blue-500", earned: true },
  { id: "goal-setter", name: "Goal Setter", icon: Target, color: "bg-green-500", earned: true },
  { id: "health-conscious", name: "Health Conscious", icon: Zap, color: "bg-yellow-500", earned: true },
  { id: "first-stack", name: "First Stack", icon: Pill, color: "bg-purple-500", earned: false },
  { id: "research-reader", name: "Research Reader", icon: BookOpen, color: "bg-indigo-500", earned: false },
  { id: "streak-starter", name: "7-Day Streak", icon: Flame, color: "bg-orange-500", earned: false },
]

export function UserDashboard() {
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Load profile from localStorage
    const savedProfile = localStorage.getItem("siloUserProfile")
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile))
    } else {
      // Redirect to onboarding if no profile
      router.push("/onboarding")
    }
    setLoading(false)
  }, [router])

  const handleStackGeneration = (type: "ai-generated" | "ai-suggestions" | "start-fresh") => {
    // Store the generation type preference
    localStorage.setItem("stackGenerationType", type)
    router.push("/stack-lab")
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  if (!profile) {
    return null
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  const earnedBadges = ACHIEVEMENT_BADGES.filter((badge) => badge.earned)
  const profileCompleteness = 85 // Calculate based on filled fields

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Avatar className="h-16 w-16">
                <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xl font-bold">
                  {getInitials(profile.name)}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  Welcome back, {profile.name.split(" ")[0]}!
                </h1>
                <p className="text-gray-600 dark:text-gray-400">Ready to optimize your health journey?</p>
              </div>
            </div>
            <Button variant="outline" className="flex items-center gap-2">
              <Edit3 className="w-4 h-4" />
              Edit Profile
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Profile Complete</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{profileCompleteness}%</p>
                </div>
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                  <User className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
              <Progress value={profileCompleteness} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Current Streak</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">0 days</p>
                </div>
                <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-full">
                  <Flame className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Badges Earned</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{earnedBadges.length}</p>
                </div>
                <div className="p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-full">
                  <Trophy className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Stacks Created</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">0</p>
                </div>
                <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-full">
                  <Pill className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Stack Generation Options */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              Create Your First Stack
            </CardTitle>
            <CardDescription>Choose how you'd like to build your personalized supplement protocol</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* AI Generated */}
              <Card className="border-2 border-dashed border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400 transition-colors cursor-pointer group">
                <CardContent className="p-6 text-center">
                  <div className="p-4 bg-blue-100 dark:bg-blue-900/30 rounded-full w-fit mx-auto mb-4 group-hover:bg-blue-200 dark:group-hover:bg-blue-900/50 transition-colors">
                    <Bot className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">AI-Generated Stack</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    Let our AI create a complete protocol based on your profile and goals
                  </p>
                  <Button
                    onClick={() => handleStackGeneration("ai-generated")}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    Generate My Stack
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>

              {/* AI Suggestions */}
              <Card className="border-2 border-dashed border-gray-200 dark:border-gray-700 hover:border-green-500 dark:hover:border-green-400 transition-colors cursor-pointer group">
                <CardContent className="p-6 text-center">
                  <div className="p-4 bg-green-100 dark:bg-green-900/30 rounded-full w-fit mx-auto mb-4 group-hover:bg-green-200 dark:group-hover:bg-green-900/50 transition-colors">
                    <Brain className="w-8 h-8 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">AI Suggestions</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    Get AI recommendations while building your stack manually
                  </p>
                  <Button
                    onClick={() => handleStackGeneration("ai-suggestions")}
                    variant="outline"
                    className="w-full border-green-500 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20"
                  >
                    Build with AI Help
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>

              {/* Start Fresh */}
              <Card className="border-2 border-dashed border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-400 transition-colors cursor-pointer group">
                <CardContent className="p-6 text-center">
                  <div className="p-4 bg-purple-100 dark:bg-purple-900/30 rounded-full w-fit mx-auto mb-4 group-hover:bg-purple-200 dark:group-hover:bg-purple-900/50 transition-colors">
                    <Edit3 className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Start Fresh</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    Build your stack from scratch with full control
                  </p>
                  <Button
                    onClick={() => handleStackGeneration("start-fresh")}
                    variant="outline"
                    className="w-full border-purple-500 text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/20"
                  >
                    Start Building
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>

        {/* Dashboard Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="goals">Goals</TabsTrigger>
            <TabsTrigger value="research">Research</TabsTrigger>
            <TabsTrigger value="supplements">Supplements</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Profile Summary */}
              <Card>
                <CardHeader>
                  <CardTitle>Profile Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Primary Goal:</span>
                    <Badge variant="secondary">{profile.primaryGoal}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Activity Level:</span>
                    <span className="font-medium">{profile.activityLevel}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Experience:</span>
                    <span className="font-medium">{profile.supplementExperience}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Budget:</span>
                    <span className="font-medium">{profile.budget}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                    <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No activity yet</p>
                    <p className="text-sm">Create your first stack to get started!</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="goals" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Your Health Goals</CardTitle>
                <CardDescription>Track your progress towards your health objectives</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-blue-900 dark:text-blue-100">Primary Goal</h3>
                      <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100">
                        {profile.timeframe}
                      </Badge>
                    </div>
                    <p className="text-blue-800 dark:text-blue-200">{profile.primaryGoal}</p>
                    <Progress value={0} className="mt-2" />
                    <p className="text-sm text-blue-600 dark:text-blue-400 mt-1">0% complete</p>
                  </div>

                  {profile.secondaryGoals.length > 0 && (
                    <div>
                      <h3 className="font-semibold mb-2">Secondary Goals</h3>
                      <div className="space-y-2">
                        {profile.secondaryGoals.map((goal, index) => (
                          <div key={index} className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                            <p className="text-gray-800 dark:text-gray-200">{goal}</p>
                            <Progress value={0} className="mt-2" />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="research" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Saved Research</CardTitle>
                <CardDescription>Studies and articles you've bookmarked</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No saved research yet</p>
                  <p className="text-sm">Bookmark studies as you explore supplement research</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="supplements" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Your Supplements</CardTitle>
                <CardDescription>Track your current supplement regimen</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  <Pill className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No supplements tracked yet</p>
                  <p className="text-sm">Create a stack to start tracking your supplements</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Achievements</CardTitle>
                <CardDescription>Your progress milestones and badges</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {ACHIEVEMENT_BADGES.map((badge) => {
                    const Icon = badge.icon
                    return (
                      <div
                        key={badge.id}
                        className={`p-4 rounded-lg border-2 text-center transition-all ${
                          badge.earned
                            ? "border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20"
                            : "border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 opacity-50"
                        }`}
                      >
                        <div
                          className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2 ${
                            badge.earned ? badge.color : "bg-gray-300 dark:bg-gray-600"
                          }`}
                        >
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="font-semibold text-sm">{badge.name}</h3>
                        {badge.earned && (
                          <Badge className="mt-2 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                            Earned
                          </Badge>
                        )}
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
