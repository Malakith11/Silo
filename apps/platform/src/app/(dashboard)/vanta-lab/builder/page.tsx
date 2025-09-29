import { StackBuilder } from '@/components/vanta-lab/stack-builder'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function VantaLabBuilderPage() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold">Stack Builder</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Build your personalized supplement protocol with drag-and-drop timeline scheduling
        </p>
      </div>

      <div className="grid gap-6 mb-8">
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Step 1: Add Supplements</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Search and add supplements to your protocol
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Step 2: Schedule Timing</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Drag supplements to optimal time blocks throughout your day
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Step 3: Optimize</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Get AI-powered suggestions to improve your stack
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <StackBuilder />
    </div>
  )
}