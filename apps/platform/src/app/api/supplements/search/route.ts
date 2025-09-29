import { NextRequest, NextResponse } from 'next/server'
import { supplementDb } from '@/lib/data/supplement-db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get('q') || ''
    const category = searchParams.get('category') || undefined
    const goals = searchParams.get('goals')?.split(',') || undefined
    const minResearchScore = searchParams.get('minResearchScore')
      ? parseInt(searchParams.get('minResearchScore')!)
      : undefined
    const limit = searchParams.get('limit')
      ? parseInt(searchParams.get('limit')!)
      : 20

    if (!query.trim()) {
      return NextResponse.json(
        { error: 'Search query is required' },
        { status: 400 }
      )
    }

    const filters = {
      category,
      goals,
      minResearchScore
    }

    const supplements = await supplementDb.searchSupplements(
      query,
      filters,
      limit
    )

    return NextResponse.json({
      results: supplements,
      query,
      filters,
      count: supplements.length,
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('Supplement search API error:', error)
    return NextResponse.json(
      { error: 'Failed to search supplements' },
      { status: 500 }
    )
  }
}

export async function POST() {
  return NextResponse.json(
    { error: 'Method not allowed. Use GET for searching supplements.' },
    { status: 405 }
  )
}