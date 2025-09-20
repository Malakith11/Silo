import { StackBuilder } from '@/components/vanta-lab/stack-builder'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus, Template, Zap } from 'lucide-react'

export default function VantaLabPage() {
  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">VANTA Lab</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Build and optimize your personalized supplement protocol with AI-powered insights
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Build from Scratch
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Create a completely custom supplement stack tailored to your specific goals
            </p>
            <Button className="w-full">Start Building</Button>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Template className="h-5 w-5" />
              Use Template
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Start with expert-designed protocols for common health goals
            </p>
            <Button variant="outline" className="w-full">Browse Templates</Button>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5" />
              AI Optimization
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Get AI-powered suggestions to optimize your current stack
            </p>
            <Button variant="outline" className="w-full">Analyze Current Stack</Button>
          </CardContent>
        </Card>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-6">Stack Builder</h2>
        <StackBuilder />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Your Current Stacks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 text-muted-foreground">
              <p>No active stacks yet</p>
              <p className="text-sm">Create your first supplement protocol above</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 text-muted-foreground">
              <p>No recent activity</p>
              <p className="text-sm">Start building to see your activity here</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}