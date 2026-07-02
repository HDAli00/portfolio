import { notFound } from 'next/navigation'
import Link from 'next/link'
import Footer from '@/components/Footer'
import { getArticleBySlug, getPublishedArticles } from '@/lib/data'
import { getSiteContent } from '@/lib/site-content'
import type { Metadata } from 'next'

export const revalidate = 3600

export async function generateStaticParams() {
  try {
    const articles = await getPublishedArticles()
    return articles.map(a => ({ slug: a.slug }))
  } catch {
    return []
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const [article, content] = await Promise.all([getArticleBySlug(slug), getSiteContent()])
  if (!article) return {}
  return {
    title: `${article.title} · ${content.site_title}`,
    description: article.description,
  }
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = await getArticleBySlug(slug)
  if (!article) notFound()

  return (
    <>
      <main>
        <div className="max-w-[850px] mx-auto px-12 pt-[72px] pb-16">
          {/* Back link */}
          <Link
            href="/writing"
            className="text-[13px] text-[#999] hover:text-[#111] transition-colors no-underline hover:no-underline mb-12 inline-block"
          >
            ← Writing
          </Link>

          {/* Header */}
          <div className="mb-12">
            <h1 className="text-[clamp(28px,4vw,40px)] font-semibold leading-[1.2] tracking-[-0.025em] text-[#111] mb-4">
              {article.title}
            </h1>
            <p className="text-[15px] text-[#999]">{formatDate(article.published_at)}</p>
          </div>

          <hr className="border-t border-[#ececec] mb-12" />

          {/* Content */}
          <div
            className="prose-article"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </div>
      </main>
      <Footer />
    </>
  )
}
