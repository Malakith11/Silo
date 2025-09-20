import { SearchInterface } from '@/components/compass/search-interface'
import { BrandProfile } from '@/components/aegis/brand-profile'

export default function AegisSearchPage() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold">Brand Search & Audit</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Search supplement brands and view comprehensive quality audits and safety profiles
        </p>
      </div>

      <SearchInterface />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Brand results will be populated here */}
        <div className="text-center py-12 text-muted-foreground col-span-full">
          <p>Search for supplement brands to view quality audits</p>
        </div>
      </div>
    </div>
  )
}