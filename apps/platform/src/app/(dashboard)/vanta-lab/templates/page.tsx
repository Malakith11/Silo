import { ProtocolBrowser } from '@/components/compass/protocol-browser'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default function VantaLabTemplatesPage() {
  const expertProtocols = [
    {
      id: '1',
      name: 'Sleep Optimization Protocol',
      goal: 'Sleep',
      supplements: ['Magnesium Glycinate', 'L-Theanine', 'Melatonin', 'Ashwagandha'],
      userCount: 1250,
      rating: 4.6
    },
    {
      id: '2',
      name: 'Cognitive Enhancement Stack',
      goal: 'Focus',
      supplements: ['Lion\'s Mane', 'Bacopa Monnieri', 'Rhodiola Rosea', 'B-Complex'],
      userCount: 890,
      rating: 4.4
    },
    {
      id: '3',
      name: 'Athletic Recovery Protocol',
      goal: 'Recovery',
      supplements: ['Creatine', 'Whey Protein', 'Curcumin', 'Tart Cherry'],
      userCount: 765,
      rating: 4.7
    },
    {
      id: '4',
      name: 'Longevity Foundation Stack',
      goal: 'Longevity',
      supplements: ['NMN', 'Resveratrol', 'Omega-3', 'Vitamin D3'],
      userCount: 543,
      rating: 4.5
    }
  ]

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold">Protocol Templates</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Start with expert-designed protocols for common health goals, then customize to your needs
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card className="text-center">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-blue-600">12</div>
            <div className="text-sm text-muted-foreground">Sleep Protocols</div>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-green-600">8</div>
            <div className="text-sm text-muted-foreground">Performance Stacks</div>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-purple-600">15</div>
            <div className="text-sm text-muted-foreground">Wellness Protocols</div>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-orange-600">6</div>
            <div className="text-sm text-muted-foreground">Longevity Stacks</div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-bold">Expert Protocols</h2>
          <Badge variant="secondary">Clinically Validated</Badge>
        </div>

        <ProtocolBrowser protocols={expertProtocols} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Community Protocols</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            <p>Community-shared protocols coming soon</p>
            <p className="text-sm">Be among the first to share your successful protocols</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}