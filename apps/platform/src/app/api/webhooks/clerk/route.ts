import { NextRequest, NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { Webhook } from 'svix'
import { createClient } from '@supabase/supabase-js'

const resolveSupabase = () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!url || !serviceRoleKey) {
    console.warn('Supabase environment variables missing; webhook handlers will no-op.')
    return null
  }

  return createClient(url, serviceRoleKey)
}

const webhookSecret = process.env.CLERK_WEBHOOK_SECRET!

export async function OPTIONS() {
  return new NextResponse(null, { status: 200 })
}

export async function POST(req: NextRequest) {
  if (!webhookSecret) {
    throw new Error('Please add CLERK_WEBHOOK_SECRET from Clerk Dashboard to .env')
  }

  // Get headers
  const headerPayload = await headers()
  const svix_id = headerPayload.get('svix-id')
  const svix_timestamp = headerPayload.get('svix-timestamp')
  const svix_signature = headerPayload.get('svix-signature')

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new NextResponse('Error occurred -- missing headers', {
      status: 400,
    })
  }

  // Get body
  const payload = await req.json()
  const body = JSON.stringify(payload)

  // Verify webhook with svix
  const wh = new Webhook(webhookSecret)
  let evt: any

  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    })
  } catch (err) {
    console.error('Error verifying webhook:', err)
    return new NextResponse('Error occurred', {
      status: 400,
    })
  }

  // Handle the webhook event
  const eventType = evt.type
  console.log(`Clerk webhook received: ${eventType}`)

  try {
    const supabase = resolveSupabase()

    switch (eventType) {
      case 'user.created':
        await handleUserCreated(evt.data, supabase)
        break

      case 'user.updated':
        await handleUserUpdated(evt.data, supabase)
        break

      case 'user.deleted':
        await handleUserDeleted(evt.data, supabase)
        break

      case 'session.created':
        await handleSessionCreated(evt.data, supabase)
        break

      default:
        console.log(`Unhandled event type: ${eventType}`)
    }

    return new NextResponse('Success', { status: 200 })
  } catch (error) {
    console.error('Error handling webhook:', error)
    return new NextResponse('Error processing webhook', { status: 500 })
  }
}

async function handleUserCreated(userData: any, supabase: ReturnType<typeof resolveSupabase>) {
  if (!supabase) {
    console.warn('Supabase client unavailable; skipping user.created webhook handling.')
    return
  }

  const { data, error } = await supabase
    .from('users')
    .insert([{
      clerk_user_id: userData.id,
      email: userData.email_addresses[0]?.email_address || '',
      first_name: userData.first_name,
      last_name: userData.last_name,
      profile_image_url: userData.image_url,
      username: userData.username,
      phone_number: userData.phone_numbers[0]?.phone_number,
      email_verified: userData.email_addresses[0]?.verification?.status === 'verified',
      phone_verified: userData.phone_numbers[0]?.verification?.status === 'verified',
      banned: userData.banned,
      locked: userData.locked,
      created_at: new Date(userData.created_at).toISOString(),
      updated_at: new Date(userData.updated_at).toISOString(),
      last_sign_in_at: userData.last_sign_in_at ? new Date(userData.last_sign_in_at).toISOString() : null,
      last_active_at: userData.last_active_at ? new Date(userData.last_active_at).toISOString() : null,
    }])

  if (error) {
    console.error('Error creating user in Supabase:', error)
    throw error
  }

  console.log('User created in Supabase:', data)
}

async function handleUserUpdated(userData: any, supabase: ReturnType<typeof resolveSupabase>) {
  if (!supabase) {
    console.warn('Supabase client unavailable; skipping user.updated webhook handling.')
    return
  }

  const { data, error } = await supabase
    .from('users')
    .update({
      email: userData.email_addresses[0]?.email_address || '',
      first_name: userData.first_name,
      last_name: userData.last_name,
      profile_image_url: userData.image_url,
      username: userData.username,
      phone_number: userData.phone_numbers[0]?.phone_number,
      email_verified: userData.email_addresses[0]?.verification?.status === 'verified',
      phone_verified: userData.phone_numbers[0]?.verification?.status === 'verified',
      banned: userData.banned,
      locked: userData.locked,
      updated_at: new Date(userData.updated_at).toISOString(),
      last_sign_in_at: userData.last_sign_in_at ? new Date(userData.last_sign_in_at).toISOString() : null,
      last_active_at: userData.last_active_at ? new Date(userData.last_active_at).toISOString() : null,
    })
    .eq('clerk_user_id', userData.id)

  if (error) {
    console.error('Error updating user in Supabase:', error)
    throw error
  }

  console.log('User updated in Supabase:', data)
}

async function handleUserDeleted(userData: any, supabase: ReturnType<typeof resolveSupabase>) {
  if (!supabase) {
    console.warn('Supabase client unavailable; skipping user.deleted webhook handling.')
    return
  }

  const { data, error } = await supabase
    .from('users')
    .delete()
    .eq('clerk_user_id', userData.id)

  if (error) {
    console.error('Error deleting user from Supabase:', error)
    throw error
  }

  console.log('User deleted from Supabase:', data)
}

async function handleSessionCreated(sessionData: any, supabase: ReturnType<typeof resolveSupabase>) {
  if (!supabase) {
    console.warn('Supabase client unavailable; skipping session.created webhook handling.')
    return
  }

  const { data, error } = await supabase
    .from('users')
    .update({
      last_sign_in_at: new Date(sessionData.created_at).toISOString(),
      last_active_at: new Date().toISOString(),
    })
    .eq('clerk_user_id', sessionData.user_id)

  if (error) {
    console.error('Error updating user last_sign_in_at:', error)
    throw error
  }

  console.log('User last_sign_in_at updated:', data)
}
