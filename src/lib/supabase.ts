import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables:', {
    url: !!supabaseUrl,
    key: !!supabaseAnonKey
  })
}

export const supabase = createClient(
  supabaseUrl || '',
  supabaseAnonKey || ''
)

// Server-side client for admin operations
export const createServerClient = () => {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!serviceRoleKey) {
    console.error('Missing SUPABASE_SERVICE_ROLE_KEY environment variable')
  }
  
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    serviceRoleKey || ''
  )
} 