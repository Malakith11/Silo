"use client"

import { useState, useEffect, useMemo } from 'react'
import { Supplement, SupplementSearchResult } from '@/types/supplement'
import { supplementDb } from '@/lib/data/supplement-db'

export interface UseSupplementSearchOptions {
  query: string
  category?: string
  goals?: string[]
  minResearchScore?: number
  limit?: number
  debounceMs?: number
}

export interface UseSupplementSearchReturn {
  results: SupplementSearchResult[]
  isLoading: boolean
  error: string | null
  totalCount: number
  hasMore: boolean
  loadMore: () => void
  retry: () => void
}

export function useSupplementSearch(options: UseSupplementSearchOptions): UseSupplementSearchReturn {
  const {
    query,
    category,
    goals,
    minResearchScore,
    limit = 20,
    debounceMs = 300
  } = options

  const [results, setResults] = useState<SupplementSearchResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [totalCount, setTotalCount] = useState(0)
  const [hasMore, setHasMore] = useState(false)

  // Debounced query
  const [debouncedQuery, setDebouncedQuery] = useState(query)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query)
    }, debounceMs)

    return () => clearTimeout(timer)
  }, [query, debounceMs])

  // Search filters object
  const filters = useMemo(() => ({
    category,
    goals,
    minResearchScore
  }), [category, goals, minResearchScore])

  // Perform search
  const performSearch = async () => {
    if (!debouncedQuery.trim()) {
      setResults([])
      setTotalCount(0)
      setHasMore(false)
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const supplements = await supplementDb.searchSupplements(
        debouncedQuery,
        filters,
        limit
      )

      const searchResults: SupplementSearchResult[] = supplements.map(supplement => ({
        supplement,
        relevanceScore: calculateRelevanceScore(supplement, debouncedQuery),
        matchType: getMatchType(supplement, debouncedQuery),
        trending: supplement.popularityScore > 80
      }))

      setResults(searchResults)
      setTotalCount(searchResults.length)
      setHasMore(searchResults.length === limit)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Search failed')
      setResults([])
      setTotalCount(0)
      setHasMore(false)
    } finally {
      setIsLoading(false)
    }
  }

  // Effect to trigger search
  useEffect(() => {
    performSearch()
  }, [debouncedQuery, filters, limit])

  const loadMore = async () => {
    if (!hasMore || isLoading) return

    setIsLoading(true)
    try {
      const supplements = await supplementDb.searchSupplements(
        debouncedQuery,
        filters,
        results.length + limit
      )

      const newResults: SupplementSearchResult[] = supplements
        .slice(results.length)
        .map(supplement => ({
          supplement,
          relevanceScore: calculateRelevanceScore(supplement, debouncedQuery),
          matchType: getMatchType(supplement, debouncedQuery),
          trending: supplement.popularityScore > 80
        }))

      setResults(prev => [...prev, ...newResults])
      setHasMore(supplements.length === results.length + limit)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load more')
    } finally {
      setIsLoading(false)
    }
  }

  const retry = () => {
    performSearch()
  }

  return {
    results,
    isLoading,
    error,
    totalCount,
    hasMore,
    loadMore,
    retry
  }
}

function calculateRelevanceScore(supplement: Supplement, query: string): number {
  const queryLower = query.toLowerCase()
  let score = 0

  // Exact name match
  if (supplement.name.toLowerCase() === queryLower) {
    score += 100
  } else if (supplement.name.toLowerCase().includes(queryLower)) {
    score += 80
  }

  // Common names match
  if (supplement.commonNames.some(name => name.toLowerCase() === queryLower)) {
    score += 90
  } else if (supplement.commonNames.some(name => name.toLowerCase().includes(queryLower))) {
    score += 70
  }

  // Description match
  if (supplement.description.toLowerCase().includes(queryLower)) {
    score += 50
  }

  // Category match
  if (supplement.category.toLowerCase().includes(queryLower)) {
    score += 40
  }

  // Research and popularity boost
  score += supplement.researchScore * 0.2
  score += supplement.popularityScore * 0.1

  return Math.min(score, 100)
}

function getMatchType(supplement: Supplement, query: string): 'name' | 'description' | 'goal' | 'category' {
  const queryLower = query.toLowerCase()

  if (supplement.name.toLowerCase().includes(queryLower) ||
      supplement.commonNames.some(name => name.toLowerCase().includes(queryLower))) {
    return 'name'
  }

  if (supplement.goals.some(goal => goal.toLowerCase().includes(queryLower))) {
    return 'goal'
  }

  if (supplement.category.toLowerCase().includes(queryLower)) {
    return 'category'
  }

  return 'description'
}