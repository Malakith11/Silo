import { NextRequest, NextResponse } from 'next/server'
import { optimizationEngine } from '@/lib/ai/optimization-engine'
import { auth } from '@clerk/nextjs'

export async function POST(request: NextRequest) {
  try {
    const { userId } = auth()

    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { currentStack, userProfile } = body

    if (!currentStack || !userProfile) {
      return NextResponse.json(
        { error: 'Missing required fields: currentStack, userProfile' },
        { status: 400 }
      )
    }

    const suggestions = await optimizationEngine.optimizeStack(
      currentStack,
      userProfile
    )

    return NextResponse.json({
      suggestions,
      timestamp: new Date().toISOString(),
      userId
    })

  } catch (error) {
    console.error('Optimization API error:', error)
    return NextResponse.json(
      { error: 'Failed to generate optimization suggestions' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json(
    {
      message: 'AI Optimization API',
      endpoints: {
        'POST /api/ai/optimize': 'Generate optimization suggestions for a supplement stack'
      }
    },
    { status: 200 }
  )
}