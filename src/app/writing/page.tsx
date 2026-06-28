import Link from 'next/link'
import Footer from '@/components/Footer'
import { getPublishedArticles } from '@/lib/data'
import type { Metadata } from 'next'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Writing — Hassan Ali',
  description: 'Articles on platform engineering, observability, architecture, and systems design.',
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export default async function WritingPage() {
  const articles = await getPublishedArticles()

  return (
    <>
      <main>
        <div className="max-w-[850px] mx-auto px-12 pt-[72px] pb-16">
          <h1 className="text-[clamp(32px,4vw,44px)] font-semibold leading-[1.2] tracking-[-0.025em] text-[#111] mb-4">
            Writing
          </h1>
          <p className="text-[17px] leading-[1.75] text-[#666] max-w-[520px] mb-16">
            Long-form articles on platform engineering, observability,
            architecture, and systems design.
          </p>

          <div className="flex flex-col">
            {articles.length === 0 ? (
              <p className="text-[15px] text-[#999] py-8">Articles coming soon.</p>
            ) : (
              articles.map((article, i) => (
                <Link
                  key={article.id}
                  href={`/writing/${article.slug}`}
                  className={`flex justify-between items-start gap-6 py-6 border-b border-[#ececec] no-underline hover:no-underline hover:opacity-60 transition-opacity ${i === 0 ? 'border-t border-[#ececec]' : ''}`}
                >
                  <div className="flex-1 min-w-0">
                    <div className="text-[16px] font-medium text-[#111] mb-1 leading-snug">{article.title}</div>
                    <div className="text-[14px] text-[#666] leading-snug">{article.description}</div>
                  </div>
                  <span className="text-[13px] text-[#999] whitespace-nowrap shrink-0 pt-0.5">
                    {formatDate(article.published_at)}
                  </span>
                </Link>
              ))
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
