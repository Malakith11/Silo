export interface Supplement {
  id: string
  name: string
  commonNames: string[]
  category: string
  description: string
  defaultDose: {
    min: number
    max: number
    unit: string
    frequency: string
  }
  bioavailability: {
    form: string
    absorption: 'high' | 'medium' | 'low'
    notes: string
  }[]
  interactions: {
    type: 'supplement' | 'medication' | 'food'
    target: string
    severity: 'major' | 'moderate' | 'minor'
    description: string
  }[]
  contraindications: string[]
  sideEffects: string[]
  bestTiming: string[]
  goals: string[]
  researchScore: number
  popularityScore: number
  createdAt: Date
  updatedAt: Date
}

export interface SupplementSearchFilters {
  category?: string
  goals?: string[]
  minResearchScore?: number
  excludeInteractions?: string[]
  priceRange?: [number, number]
}

export class SupplementDatabase {
  private supplements: Map<string, Supplement> = new Map()

  async searchSupplements(
    query: string,
    filters?: SupplementSearchFilters,
    limit: number = 20
  ): Promise<Supplement[]> {
    // TODO: Implement semantic search with embeddings
    const results = Array.from(this.supplements.values())
      .filter(supplement => this.matchesQuery(supplement, query))
      .filter(supplement => this.matchesFilters(supplement, filters))
      .sort((a, b) => b.popularityScore - a.popularityScore)
      .slice(0, limit)

    return results
  }

  async getSupplementById(id: string): Promise<Supplement | null> {
    return this.supplements.get(id) || null
  }

  async getTrendingSupplements(timeframe: 'daily' | 'weekly' | 'monthly' = 'weekly'): Promise<Supplement[]> {
    // TODO: Implement trending calculation based on usage data
    return Array.from(this.supplements.values())
      .sort((a, b) => b.popularityScore - a.popularityScore)
      .slice(0, 10)
  }

  async getSimilarSupplements(supplementId: string, limit: number = 5): Promise<Supplement[]> {
    const supplement = await this.getSupplementById(supplementId)
    if (!supplement) return []

    // TODO: Implement similarity search using embeddings
    return Array.from(this.supplements.values())
      .filter(s => s.id !== supplementId && s.category === supplement.category)
      .slice(0, limit)
  }

  async addSupplement(supplement: Supplement): Promise<void> {
    this.supplements.set(supplement.id, supplement)
  }

  async updateSupplement(id: string, updates: Partial<Supplement>): Promise<boolean> {
    const supplement = this.supplements.get(id)
    if (!supplement) return false

    this.supplements.set(id, { ...supplement, ...updates, updatedAt: new Date() })
    return true
  }

  private matchesQuery(supplement: Supplement, query: string): boolean {
    const searchText = query.toLowerCase()
    return (
      supplement.name.toLowerCase().includes(searchText) ||
      supplement.commonNames.some(name => name.toLowerCase().includes(searchText)) ||
      supplement.description.toLowerCase().includes(searchText)
    )
  }

  private matchesFilters(supplement: Supplement, filters?: SupplementSearchFilters): boolean {
    if (!filters) return true

    if (filters.category && supplement.category !== filters.category) {
      return false
    }

    if (filters.goals && !filters.goals.some(goal => supplement.goals.includes(goal))) {
      return false
    }

    if (filters.minResearchScore && supplement.researchScore < filters.minResearchScore) {
      return false
    }

    if (filters.excludeInteractions) {
      const hasExcludedInteraction = supplement.interactions.some(interaction =>
        filters.excludeInteractions!.includes(interaction.target)
      )
      if (hasExcludedInteraction) return false
    }

    return true
  }
}

export const supplementDb = new SupplementDatabase()