import Link from 'next/link'
import { createSupabaseServerClient } from '@/lib/supabase/server'
import type { Article } from '@/lib/supabase'

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

export default async function AdminArticlesPage() {
  const supabase = await createSupabaseServerClient()
  const { data } = await supabase
    .from('articles')
    .select('id, slug, title, description, published, published_at')
    .order('published_at', { ascending: false })
  const articles = (data ?? []) as Article[]

  return (
    <main>
      <div className="flex items-center justify-between gap-4 mb-8">
        <h1 className="text-[24px] font-semibold tracking-[-0.02em] text-[#111]">Articles</h1>
        <Link
          href="/admin/articles/new"
          className="bg-[#111] text-white text-[13px] font-medium rounded-[6px] px-4 py-2 no-underline hover:no-underline hover:opacity-80 transition-opacity"
        >
          New article
        </Link>
      </div>

      {articles.length === 0 ? (
        <p className="text-[14px] text-[#999] py-8">No articles yet — write your first one.</p>
      ) : (
        <div className="flex flex-col">
          {articles.map((article, i) => (
            <Link
              key={article.id}
              href={`/admin/articles/${article.id}`}
              className={`flex justify-between items-start gap-6 py-5 border-b border-[#ececec] no-underline hover:no-underline hover:opacity-60 transition-opacity ${i === 0 ? 'border-t border-[#ececec]' : ''}`}
            >
              <div className="flex-1 min-w-0">
                <div className="text-[15px] font-medium text-[#111] mb-1 leading-snug">{article.title}</div>
                <div className="text-[13px] text-[#999] font-mono">/writing/{article.slug}</div>
              </div>
              <div className="text-right shrink-0">
                <span
                  className={`inline-block text-[11px] font-mono uppercase tracking-[0.08em] rounded-full px-2.5 py-1 mb-1 ${
                    article.published ? 'bg-[#eef7f0] text-[#1e7d43]' : 'bg-[#f5f5f5] text-[#999]'
                  }`}
                >
                  {article.published ? 'Published' : 'Draft'}
                </span>
                <div className="text-[12px] text-[#999]">{formatDate(article.published_at)}</div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  )
}
