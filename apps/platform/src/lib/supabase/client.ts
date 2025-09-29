import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

let cachedSupabase: ReturnType<typeof createClient> | null = null

export const getSupabaseClient = () => {
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Supabase public credentials are not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.')
  }

  if (!cachedSupabase) {
    cachedSupabase = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true
      },
      realtime: {
        params: {
          eventsPerSecond: 10
        }
      }
    })
  }

  return cachedSupabase
}

// Database types will be generated from Supabase CLI
export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          clerk_user_id: string
          email: string
          first_name: string | null
          last_name: string | null
          profile_image_url: string | null
          username: string | null
          phone_number: string | null
          email_verified: boolean
          phone_verified: boolean
          banned: boolean
          locked: boolean
          created_at: string
          updated_at: string
          last_sign_in_at: string | null
          last_active_at: string | null
        }
        Insert: {
          id?: string
          clerk_user_id: string
          email: string
          first_name?: string | null
          last_name?: string | null
          profile_image_url?: string | null
          username?: string | null
          phone_number?: string | null
          email_verified?: boolean
          phone_verified?: boolean
          banned?: boolean
          locked?: boolean
          created_at?: string
          updated_at?: string
          last_sign_in_at?: string | null
          last_active_at?: string | null
        }
        Update: {
          id?: string
          clerk_user_id?: string
          email?: string
          first_name?: string | null
          last_name?: string | null
          profile_image_url?: string | null
          username?: string | null
          phone_number?: string | null
          email_verified?: boolean
          phone_verified?: boolean
          banned?: boolean
          locked?: boolean
          updated_at?: string
          last_sign_in_at?: string | null
          last_active_at?: string | null
        }
      }
      supplements: {
        Row: {
          id: string
          name: string
          category: string
          description: string
          research_score: number
          popularity_score: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          category: string
          description: string
          research_score?: number
          popularity_score?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          category?: string
          description?: string
          research_score?: number
          popularity_score?: number
          updated_at?: string
        }
      }
      protocols: {
        Row: {
          id: string
          name: string
          description: string
          creator_id: string
          is_public: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description: string
          creator_id: string
          is_public?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string
          creator_id?: string
          is_public?: boolean
          updated_at?: string
        }
      }
      user_protocols: {
        Row: {
          id: string
          user_id: string
          protocol_id: string
          status: string
          start_date: string
          end_date: string | null
          adherence_rate: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          protocol_id: string
          status?: string
          start_date: string
          end_date?: string | null
          adherence_rate?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          protocol_id?: string
          status?: string
          start_date?: string
          end_date?: string | null
          adherence_rate?: number
          updated_at?: string
        }
      }
      supplement_logs: {
        Row: {
          id: string
          user_id: string
          supplement_id: string
          dose: number
          unit: string
          taken_at: string
          notes: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          supplement_id: string
          dose: number
          unit: string
          taken_at: string
          notes?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          supplement_id?: string
          dose?: number
          unit?: string
          taken_at?: string
          notes?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      search_supplements: {
        Args: {
          search_query: string
          similarity_threshold?: number
          match_count?: number
        }
        Returns: {
          id: string
          name: string
          category: string
          description: string
          similarity: number
        }[]
      }
    }
    Enums: {
      supplement_category: 'vitamins' | 'minerals' | 'herbs' | 'amino_acids' | 'other'
      protocol_status: 'active' | 'paused' | 'completed' | 'discontinued'
    }
  }
}

export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row']
export type InsertTables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Insert']
export type UpdateTables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Update']
