import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? 'placeholder'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Article = {
  id: string
  slug: string
  title: string
  description: string
  content: string
  published_at: string
  published: boolean
}

export type Project = {
  id: string
  name: string
  description: string
  stack: string[]
  github_url: string
  sort_order: number
}
