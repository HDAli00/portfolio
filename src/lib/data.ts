import { supabase, type Article, type Highlight } from './supabase'

export type ArticleListItem = Pick<Article, 'id' | 'slug' | 'title' | 'description' | 'published_at'>

export async function getPublishedArticles(): Promise<ArticleListItem[]> {
  try {
    const { data, error } = await supabase
      .from('articles')
      .select('id, slug, title, description, published_at')
      .eq('published', true)
      .order('published_at', { ascending: false })
    if (error) return []
    return (data ?? []) as ArticleListItem[]
  } catch {
    return []
  }
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  try {
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .eq('slug', slug)
      .eq('published', true)
      .single()
    if (error) return null
    return data
  } catch {
    return null
  }
}

export async function getHighlights(): Promise<Highlight[]> {
  try {
    const { data, error } = await supabase
      .from('highlights')
      .select('id, type, topic, title, blurb, meta, href, sort_order')
      .eq('published', true)
      .order('sort_order', { ascending: true })
    if (error) return []
    return (data ?? []) as Highlight[]
  } catch {
    return []
  }
}
