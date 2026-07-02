import Link from 'next/link'
import TypewriterGreeting from '@/components/TypewriterGreeting'
import TechMarquee from '@/components/TechMarquee'
import Highlights from '@/components/Highlights'
import Footer from '@/components/Footer'
import { getPublishedArticles, getHighlights } from '@/lib/data'
import { getSiteContent } from '@/lib/site-content'

export const revalidate = 3600

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export default async function Home() {
  const [articles, highlights, content] = await Promise.all([
    getPublishedArticles(),
    getHighlights(),
    getSiteContent(),
  ])

  const greetingPhrases = content.greeting_phrases
    .split('\n')
    .map(p => p.trim())
    .filter(Boolean)
  const heroHeadingLines = content.hero_heading.split('\n').filter(Boolean)

  return (
    <>
      <main>
        {/* HERO */}
        <div className="max-w-[850px] mx-auto px-12 pt-[72px] pb-16">
          <TypewriterGreeting prefix={content.greeting_prefix} phrases={greetingPhrases} />
          <h1 className="text-[clamp(36px,5vw,52px)] font-semibold leading-[1.18] tracking-[-0.025em] text-[#111] mb-6 max-w-[680px]">
            {heroHeadingLines.map((line, i) => (
              <span key={i}>
                {line}
                {i < heroHeadingLines.length - 1 && <br />}
              </span>
            ))}
          </h1>
          <p className="text-[17px] leading-[1.75] text-[#666] max-w-[540px]">
            {content.hero_intro}
          </p>
        </div>

        {/* TECH MARQUEE */}
        <div className="pb-16">
          <TechMarquee />
        </div>

        <hr className="max-w-[850px] mx-auto border-t border-[#ececec]" />

        {/* HIGHLIGHTS */}
        <Highlights
          highlights={highlights}
          eyebrow={content.highlights_eyebrow}
          heading={content.highlights_heading}
          intro={content.highlights_intro}
        />

        <hr className="max-w-[850px] mx-auto border-t border-[#ececec]" />

        {/* ARTICLES */}
        <div className="max-w-[850px] mx-auto px-12 pt-16 pb-16">
          <div className="flex items-baseline justify-between mb-9">
            <h2 className="text-[18px] font-semibold tracking-[-0.02em]">{content.articles_heading}</h2>
            <Link href="/writing" className="text-[13px] text-[#666] hover:text-[#111] transition-colors no-underline hover:no-underline">
              View all →
            </Link>
          </div>

          <div className="flex flex-col">
            {articles.length === 0 ? (
              <p className="text-[15px] text-[#999] py-8">{content.articles_empty}</p>
            ) : (
              articles.slice(0, 4).map((article, i) => (
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
