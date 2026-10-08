import { createClient } from '@supabase/supabase-js'

const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseUrl =
  rawUrl && !rawUrl.startsWith('http://') && !rawUrl.startsWith('https://')
    ? `https://${rawUrl}.supabase.co`
    : rawUrl
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
