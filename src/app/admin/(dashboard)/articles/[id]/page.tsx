import Link from 'next/link'
import { notFound } from 'next/navigation'
import { createSupabaseServerClient } from '@/lib/supabase/server'
import type { Article } from '@/lib/supabase'
import ArticleForm from '../../../ui/ArticleForm'
import DeleteButton from '../../../ui/DeleteButton'
import { deleteArticle } from '../../../actions'

export default async function EditArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createSupabaseServerClient()
  const { data } = await supabase.from('articles').select('*').eq('id', id).single()
  if (!data) notFound()
  const article = data as Article

  return (
    <main>
      <div className="flex items-center justify-between gap-4 mb-8">
        <Link
          href="/admin/articles"
          className="text-[13px] text-[#999] hover:text-[#111] transition-colors no-underline hover:no-underline"
        >
          ← Articles
        </Link>
        <DeleteButton id={article.id} action={deleteArticle} label="Delete article" />
      </div>
      <h1 className="text-[24px] font-semibold tracking-[-0.02em] text-[#111] mb-2">Edit article</h1>
      <p className="text-[13px] text-[#999] font-mono mb-8">
        {article.published ? (
          <a href={`/writing/${article.slug}`} target="_blank" rel="noopener noreferrer" className="hover:text-[#111]">
            /writing/{article.slug} ↗
          </a>
        ) : (
          <>/writing/{article.slug} (draft)</>
        )}
      </p>
      <ArticleForm article={article} />
    </main>
  )
}
