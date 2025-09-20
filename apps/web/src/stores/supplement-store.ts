import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Supplement, SupplementSearchResult } from '@/types/supplement'

interface SupplementState {
  // Search state
  searchResults: SupplementSearchResult[]
  searchQuery: string
  searchFilters: {
    category?: string
    goals?: string[]
    minResearchScore?: number
  }
  isSearching: boolean

  // Trending and popular
  trendingSupplements: Supplement[]
  popularSupplements: Supplement[]

  // User favorites and recently viewed
  favorites: string[] // supplement IDs
  recentlyViewed: string[] // supplement IDs

  // Cache
  supplementCache: Map<string, Supplement>

  // Actions
  setSearchQuery: (query: string) => void
  setSearchResults: (results: SupplementSearchResult[]) => void
  setSearchFilters: (filters: any) => void
  setIsSearching: (loading: boolean) => void

  addToFavorites: (supplementId: string) => void
  removeFromFavorites: (supplementId: string) => void
  isFavorite: (supplementId: string) => boolean

  addToRecentlyViewed: (supplementId: string) => void
  clearRecentlyViewed: () => void

  cacheSupplement: (supplement: Supplement) => void
  getCachedSupplement: (id: string) => Supplement | undefined

  setTrendingSupplements: (supplements: Supplement[]) => void
  setPopularSupplements: (supplements: Supplement[]) => void

  clearSearch: () => void
}

export const useSupplementStore = create<SupplementState>()(
  persist(
    (set, get) => ({
      // Initial state
      searchResults: [],
      searchQuery: '',
      searchFilters: {},
      isSearching: false,
      trendingSupplements: [],
      popularSupplements: [],
      favorites: [],
      recentlyViewed: [],
      supplementCache: new Map(),

      // Search actions
      setSearchQuery: (query) => set({ searchQuery: query }),
      setSearchResults: (results) => set({ searchResults: results }),
      setSearchFilters: (filters) => set({ searchFilters: filters }),
      setIsSearching: (loading) => set({ isSearching: loading }),

      // Favorites actions
      addToFavorites: (supplementId) => set((state) => ({
        favorites: state.favorites.includes(supplementId)
          ? state.favorites
          : [...state.favorites, supplementId]
      })),

      removeFromFavorites: (supplementId) => set((state) => ({
        favorites: state.favorites.filter(id => id !== supplementId)
      })),

      isFavorite: (supplementId) => get().favorites.includes(supplementId),

      // Recently viewed actions
      addToRecentlyViewed: (supplementId) => set((state) => {
        const filtered = state.recentlyViewed.filter(id => id !== supplementId)
        return {
          recentlyViewed: [supplementId, ...filtered].slice(0, 10) // Keep last 10
        }
      }),

      clearRecentlyViewed: () => set({ recentlyViewed: [] }),

      // Cache actions
      cacheSupplement: (supplement) => set((state) => {
        const newCache = new Map(state.supplementCache)
        newCache.set(supplement.id, supplement)
        return { supplementCache: newCache }
      }),

      getCachedSupplement: (id) => get().supplementCache.get(id),

      // Trending/Popular actions
      setTrendingSupplements: (supplements) => set({ trendingSupplements: supplements }),
      setPopularSupplements: (supplements) => set({ popularSupplements: supplements }),

      // Utility actions
      clearSearch: () => set({
        searchResults: [],
        searchQuery: '',
        searchFilters: {},
        isSearching: false
      })
    }),
    {
      name: 'supplement-store',
      partialize: (state) => ({
        favorites: state.favorites,
        recentlyViewed: state.recentlyViewed,
        searchFilters: state.searchFilters
      })
    }
  )
)