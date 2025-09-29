import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { TrendingUp, Zap, BookOpen, Shield, Plus, Activity } from 'lucide-react'
import Link from 'next/link'

export default function DashboardPage() {
  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Welcome to SILO</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Your personalized supplement optimization platform
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Link href="/compass">
          <Card className="cursor-pointer hover:shadow-lg transition-shadow h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-blue-500" />
                COMPASS
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Discover trending supplements and community insights
              </p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/vanta-lab">
          <Card className="cursor-pointer hover:shadow-lg transition-shadow h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-green-500" />
                VANTA Lab
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Build and optimize your supplement protocols
              </p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/lens">
          <Card className="cursor-pointer hover:shadow-lg transition-shadow h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-purple-500" />
                LENS
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Access research and evidence-based insights
              </p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/aegis">
          <Card className="cursor-pointer hover:shadow-lg transition-shadow h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-red-500" />
                AEGIS
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Quality audits and brand safety information
              </p>
            </CardContent>
          </Card>
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start" variant="outline" asChild>
              <Link href="/vanta-lab/builder">
                <Plus className="h-4 w-4 mr-2" />
                Create New Stack
              </Link>
            </Button>
            <Button className="w-full justify-start" variant="outline" asChild>
              <Link href="/compass/search">
                <TrendingUp className="h-4 w-4 mr-2" />
                Explore Supplements
              </Link>
            </Button>
            <Button className="w-full justify-start" variant="outline" asChild>
              <Link href="/aegis/scanner">
                <Shield className="h-4 w-4 mr-2" />
                Scan Supplement
              </Link>
            </Button>
            <Button className="w-full justify-start" variant="outline" asChild>
              <Link href="/lens/library">
                <BookOpen className="h-4 w-4 mr-2" />
                Browse Research
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 text-muted-foreground">
              <Activity className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No recent activity</p>
              <p className="text-sm">Start exploring to see your activity here</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Platform Stats</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4 text-center">
            <div>
              <div className="text-2xl font-bold">12,450</div>
              <div className="text-sm text-muted-foreground">Active Users</div>
            </div>
            <div>
              <div className="text-2xl font-bold">248</div>
              <div className="text-sm text-muted-foreground">Supplements</div>
            </div>
            <div>
              <div className="text-2xl font-bold">1,287</div>
              <div className="text-sm text-muted-foreground">Research Papers</div>
            </div>
            <div>
              <div className="text-2xl font-bold">89</div>
              <div className="text-sm text-muted-foreground">Expert Protocols</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}