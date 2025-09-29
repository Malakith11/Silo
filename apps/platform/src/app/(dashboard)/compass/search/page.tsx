import { SearchInterface } from '@/components/compass/search-interface'
import { SupplementCard } from '@/components/compass/supplement-card'

export default function CompassSearchPage() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold">Supplement Search</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Search through our comprehensive database of supplements and protocols
        </p>
      </div>

      <SearchInterface />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* Search results will be populated here */}
        <div className="text-center py-12 text-muted-foreground col-span-full">
          <p>Enter a search query to find supplements</p>
        </div>
      </div>
    </div>
  )
}