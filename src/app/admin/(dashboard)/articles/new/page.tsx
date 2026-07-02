import Link from 'next/link'
import ArticleForm from '../../../ui/ArticleForm'

export default function NewArticlePage() {
  return (
    <main>
      <Link
        href="/admin/articles"
        className="text-[13px] text-[#999] hover:text-[#111] transition-colors no-underline hover:no-underline mb-8 inline-block"
      >
        ← Articles
      </Link>
      <h1 className="text-[24px] font-semibold tracking-[-0.02em] text-[#111] mb-8">New article</h1>
      <ArticleForm />
    </main>
  )
}
