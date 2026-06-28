import { supabase, type Article, type Project } from './supabase'

export type ArticleListItem = Pick<Article, 'id' | 'slug' | 'title' | 'description' | 'published_at'>

function withTimeout<T>(promise: Promise<T>, ms = 5000): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error('Query timeout')), ms)
    ),
  ])
}

export async function getPublishedArticles(): Promise<ArticleListItem[]> {
  try {
    const { data, error } = await withTimeout(
      supabase
        .from('articles')
        .select('id, slug, title, description, published_at')
        .eq('published', true)
        .order('published_at', { ascending: false })
    )
    if (error) return []
    return (data ?? []) as ArticleListItem[]
  } catch {
    return []
  }
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  try {
    const { data, error } = await withTimeout(
      supabase
        .from('articles')
        .select('*')
        .eq('slug', slug)
        .eq('published', true)
        .single()
    )
    if (error) return null
    return data
  } catch {
    return null
  }
}

export async function getProjects(): Promise<Project[]> {
  try {
    const { data, error } = await withTimeout(
      supabase
        .from('projects')
        .select('*')
        .order('sort_order', { ascending: true })
    )
    if (error) return []
    return data ?? []
  } catch {
    return []
  }
}
