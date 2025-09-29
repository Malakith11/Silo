import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    // Test creating a user without webhook verification
    const { data, error } = await supabase
      .from('users')
      .insert([{
        clerk_user_id: body.clerk_user_id || 'test_123',
        email: body.email || 'test@example.com',
        first_name: body.first_name || 'Test',
        last_name: body.last_name || 'User',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }])

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    console.log('User created successfully:', data)
    return NextResponse.json({ success: true, data })

  } catch (err) {
    console.error('Error in test endpoint:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}