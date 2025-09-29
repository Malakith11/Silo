import { SearchInterface } from '@/components/compass/search-interface'
import { TrendingList } from '@/components/compass/trending-list'
import { ProtocolBrowser } from '@/components/compass/protocol-browser'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function CompassPage() {
  // Mock data - replace with real data from APIs
  const trendingItems = [
    { id: '1', name: 'Creatine Monohydrate', trend: 'up' as const, percentage: 15 },
    { id: '2', name: 'Magnesium Glycinate', trend: 'up' as const, percentage: 12 },
    { id: '3', name: 'Ashwagandha', trend: 'down' as const, percentage: -5 },
    { id: '4', name: 'Lion\'s Mane', trend: 'up' as const, percentage: 8 },
  ]

  const protocols = [
    {
      id: '1',
      name: 'Sleep Optimization Stack',
      goal: 'Sleep',
      supplements: ['Magnesium', 'L-Theanine', 'Melatonin'],
      userCount: 1250,
      rating: 4.6
    },
    {
      id: '2',
      name: 'Energy & Focus Protocol',
      goal: 'Energy',
      supplements: ['Creatine', 'B-Complex', 'Rhodiola'],
      userCount: 890,
      rating: 4.4
    }
  ]

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">COMPASS</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Discover trending supplements and evidence-based protocols from the community
        </p>
      </div>

      <div className="flex justify-center">
        <SearchInterface />
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <TrendingList
          items={trendingItems}
          title="Trending This Week"
        />

        <Card>
          <CardHeader>
            <CardTitle>Community Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold">12,450</div>
                <div className="text-sm text-muted-foreground">Active Users</div>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold">248</div>
                <div className="text-sm text-muted-foreground">Tracked Supplements</div>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold">89</div>
                <div className="text-sm text-muted-foreground">Expert Protocols</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-6">Popular Protocols</h2>
        <ProtocolBrowser protocols={protocols} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Featured Article</CardTitle>
        </CardHeader>
        <CardContent>
          <h3 className="text-lg font-semibold mb-2">
            The Science Behind Supplement Timing: When to Take What
          </h3>
          <p className="text-muted-foreground mb-4">
            New research reveals optimal timing strategies for maximizing supplement absorption and effectiveness...
          </p>
          <button className="text-primary hover:underline">Read More →</button>
        </CardContent>
      </Card>
    </div>
  )
}