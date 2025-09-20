import { NextRequest, NextResponse } from 'next/server'
import { analytics } from '@/lib/data/analytics'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const timeframe = searchParams.get('timeframe') as 'daily' | 'weekly' | 'monthly' || 'weekly'
    const limit = searchParams.get('limit')
      ? parseInt(searchParams.get('limit')!)
      : 10

    const trendingSupplements = await analytics.getTrendingSupplements(limit, timeframe)

    return NextResponse.json({
      trending: trendingSupplements,
      timeframe,
      limit,
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('Trending supplements API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch trending supplements' },
      { status: 500 }
    )
  }
}

export async function POST() {
  return NextResponse.json(
    { error: 'Method not allowed. Use GET for trending supplements.' },
    { status: 405 }
  )
}