import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? 'placeholder'

function fetchWithTimeout(url: RequestInfo | URL, options?: RequestInit) {
  const controller = new AbortController()
  const id = setTimeout(() => controller.abort(), 5000)
  return fetch(url, { ...options, signal: controller.signal }).finally(() =>
    clearTimeout(id)
  )
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  global: { fetch: fetchWithTimeout },
})

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

export type Highlight = {
  id: string
  type: 'principle' | 'project' | 'article'
  topic: string | null
  title: string
  blurb: string
  meta: string | null
  href: string
  sort_order: number
}
