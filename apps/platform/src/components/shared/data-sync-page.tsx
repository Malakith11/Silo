"use client"

import { useState } from "react"
import { Header } from "./header"
import { Footer } from "./footer"
import { Button } from "../ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import { Badge } from "../ui/badge"
import { Progress } from "../ui/progress"
import {
  Smartphone,
  Watch,
  Activity,
  Heart,
  Moon,
  Zap,
  TrendingUp,
  Settings,
  Wifi,
  WifiOff,
  Plus,
  BarChart3,
} from "lucide-react"

export function DataSyncPage() {
  const [activeTab, setActiveTab] = useState("devices")

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="pt-20">
        <div className="container mx-auto px-4 py-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 bg-orange-100 text-orange-800 rounded-full text-sm font-medium mb-6">
              <Smartphone className="w-4 h-4 mr-2" />
              Connected Health Platform
            </div>
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Data Sync
              <br />
              <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                Connected Insights
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Integrate your wearables and health devices to track supplement effectiveness and optimize your wellness
              protocols with real-time biometric data.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-orange-600 hover:bg-orange-700">
                <Plus className="w-5 h-5 mr-2" />
                Connect Device
              </Button>
              <Button variant="outline" size="lg">
                <BarChart3 className="w-5 h-5 mr-2" />
                View Dashboard
              </Button>
            </div>
          </div>

          {/* Main Content */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="devices">
                <Smartphone className="w-4 h-4 mr-2" />
                Connected Devices
              </TabsTrigger>
              <TabsTrigger value="dashboard">
                <BarChart3 className="w-4 h-4 mr-2" />
                Metrics Dashboard
              </TabsTrigger>
            </TabsList>

            <TabsContent value="devices" className="space-y-8">
              {/* Connected Devices */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    name: "Apple Watch Series 9",
                    type: "Smartwatch",
                    status: "Connected",
                    lastSync: "2 minutes ago",
                    metrics: ["Heart Rate", "HRV", "Sleep", "Activity"],
                    icon: Watch,
                    color: "green",
                  },
                  {
                    name: "Oura Ring Gen 3",
                    type: "Sleep Tracker",
                    status: "Connected",
                    lastSync: "5 minutes ago",
                    metrics: ["Sleep Quality", "Recovery", "Temperature"],
                    icon: Activity,
                    color: "blue",
                  },
                  {
                    name: "Fitbit Charge 6",
                    type: "Fitness Tracker",
                    status: "Disconnected",
                    lastSync: "2 hours ago",
                    metrics: ["Steps", "Heart Rate", "Sleep"],
                    icon: Activity,
                    color: "gray",
                  },
                ].map((device, index) => (
                  <Card
                    key={index}
                    className={`border-l-4 ${device.color === "green" ? "border-l-green-500" : device.color === "blue" ? "border-l-blue-500" : "border-l-gray-300"}`}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <device.icon
                          className={`w-8 h-8 ${device.color === "green" ? "text-green-600" : device.color === "blue" ? "text-blue-600" : "text-gray-400"}`}
                        />
                        <div className="flex items-center space-x-2">
                          {device.status === "Connected" ? (
                            <Wifi className="w-4 h-4 text-green-500" />
                          ) : (
                            <WifiOff className="w-4 h-4 text-gray-400" />
                          )}
                          <Badge
                            variant={device.status === "Connected" ? "default" : "secondary"}
                            className={device.status === "Connected" ? "bg-green-600" : ""}
                          >
                            {device.status}
                          </Badge>
                        </div>
                      </div>
                      <CardTitle className="text-lg">{device.name}</CardTitle>
                      <CardDescription>{device.type}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="text-sm text-gray-600">
                          Last sync: <span className="font-medium">{device.lastSync}</span>
                        </div>
                        <div>
                          <div className="text-sm font-medium mb-2">Tracked Metrics:</div>
                          <div className="flex flex-wrap gap-1">
                            {device.metrics.map((metric, metricIndex) => (
                              <Badge key={metricIndex} variant="outline" className="text-xs">
                                {metric}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <Button
                          variant={device.status === "Connected" ? "outline" : "default"}
                          size="sm"
                          className="w-full"
                        >
                          {device.status === "Connected" ? (
                            <>
                              <Settings className="w-4 h-4 mr-2" />
                              Configure
                            </>
                          ) : (
                            <>
                              <Wifi className="w-4 h-4 mr-2" />
                              Reconnect
                            </>
                          )}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Available Integrations */}
              <Card>
                <CardHeader>
                  <CardTitle>Available Integrations</CardTitle>
                  <CardDescription>Connect additional devices and health platforms</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { name: "Garmin", icon: "🏃" },
                      { name: "Polar", icon: "⌚" },
                      { name: "Whoop", icon: "💪" },
                      { name: "MyFitnessPal", icon: "🍎" },
                      { name: "Strava", icon: "🚴" },
                      { name: "Google Fit", icon: "📱" },
                      { name: "Samsung Health", icon: "📊" },
                      { name: "Withings", icon: "⚖️" },
                    ].map((integration, index) => (
                      <Button key={index} variant="outline" className="h-16 flex-col space-y-1">
                        <span className="text-2xl">{integration.icon}</span>
                        <span className="text-sm">{integration.name}</span>
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="dashboard" className="space-y-8">
              {/* Key Metrics Overview */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center">
                      <Heart className="w-4 h-4 mr-2 text-red-500" />
                      Resting HR
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-gray-900 mb-1">58 bpm</div>
                    <div className="text-sm text-green-600">-3 from last week</div>
                    <Progress value={75} className="h-2 mt-2" />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center">
                      <Activity className="w-4 h-4 mr-2 text-blue-500" />
                      HRV
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-gray-900 mb-1">45 ms</div>
                    <div className="text-sm text-green-600">+8 from last week</div>
                    <Progress value={68} className="h-2 mt-2" />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center">
                      <Moon className="w-4 h-4 mr-2 text-purple-500" />
                      Sleep Score
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-gray-900 mb-1">84</div>
                    <div className="text-sm text-green-600">+12 from last week</div>
                    <Progress value={84} className="h-2 mt-2" />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center">
                      <Zap className="w-4 h-4 mr-2 text-yellow-500" />
                      Energy Level
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-gray-900 mb-1">7.8/10</div>
                    <div className="text-sm text-green-600">+1.2 from last week</div>
                    <Progress value={78} className="h-2 mt-2" />
                  </CardContent>
                </Card>
              </div>

              {/* Trends and Insights */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <TrendingUp className="w-5 h-5 mr-2" />
                      Weekly Trends
                    </CardTitle>
                    <CardDescription>Key metric changes over the past week</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { metric: "Sleep Quality", change: "+15%", trend: "up", color: "green" },
                        { metric: "Recovery Score", change: "+8%", trend: "up", color: "green" },
                        { metric: "Stress Level", change: "-12%", trend: "down", color: "green" },
                        { metric: "Energy Level", change: "+18%", trend: "up", color: "green" },
                      ].map((item, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <span className="text-sm font-medium">{item.metric}</span>
                          <div className="flex items-center space-x-2">
                            <span className={`text-sm font-bold text-${item.color}-600`}>{item.change}</span>
                            <TrendingUp className={`w-4 h-4 text-${item.color}-500`} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Supplement Correlation</CardTitle>
                    <CardDescription>How your supplements are affecting your metrics</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        {
                          supplement: "Magnesium Glycinate",
                          metric: "Sleep Quality",
                          correlation: "+23%",
                          confidence: "High",
                        },
                        {
                          supplement: "Omega-3",
                          metric: "HRV",
                          correlation: "+15%",
                          confidence: "Medium",
                        },
                        {
                          supplement: "Vitamin D3",
                          metric: "Energy Level",
                          correlation: "+12%",
                          confidence: "Medium",
                        },
                        {
                          supplement: "Ashwagandha",
                          metric: "Stress Level",
                          correlation: "-18%",
                          confidence: "High",
                        },
                      ].map((item, index) => (
                        <div key={index} className="p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-medium text-sm">{item.supplement}</span>
                            <Badge
                              variant={item.confidence === "High" ? "default" : "secondary"}
                              className={`text-xs ${item.confidence === "High" ? "bg-green-600" : ""}`}
                            >
                              {item.confidence}
                            </Badge>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">{item.metric}</span>
                            <span className="font-bold text-green-600">{item.correlation}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  )
}
