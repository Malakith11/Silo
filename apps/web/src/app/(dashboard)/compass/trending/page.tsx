import { TrendingList } from '@/components/compass/trending-list'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function CompassTrendingPage() {
  const trendingItems = [
    { id: '1', name: 'Creatine Monohydrate', trend: 'up' as const, percentage: 15 },
    { id: '2', name: 'Magnesium Glycinate', trend: 'up' as const, percentage: 12 },
    { id: '3', name: 'Ashwagandha', trend: 'down' as const, percentage: -5 },
    { id: '4', name: 'Lion\'s Mane', trend: 'up' as const, percentage: 8 },
    { id: '5', name: 'NMN', trend: 'up' as const, percentage: 22 },
    { id: '6', name: 'Rhodiola Rosea', trend: 'up' as const, percentage: 18 },
  ]

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold">Trending Supplements</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Discover what's trending in the supplement community based on real usage data
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <TrendingList items={trendingItems} title="Trending This Week" />

        <Card>
          <CardHeader>
            <CardTitle>Trending Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Nootropics</span>
                <span className="text-green-500">↑ 28%</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Sleep Support</span>
                <span className="text-green-500">↑ 15%</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Longevity</span>
                <span className="text-green-500">↑ 12%</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Performance</span>
                <span className="text-red-500">↓ 3%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}