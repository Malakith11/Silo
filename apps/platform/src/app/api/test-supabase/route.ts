import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

function resolveSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!url || !serviceRoleKey) {
    console.warn('Supabase environment variables are not set; skipping test endpoint execution.')
    return null
  }

  return createClient(url, serviceRoleKey)
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    // Test creating a user without webhook verification
    const supabase = resolveSupabase()

    if (!supabase) {
      return NextResponse.json({ error: 'Supabase credentials are not configured.' }, { status: 500 })
    }

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
