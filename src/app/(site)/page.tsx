import Link from 'next/link'
import TypewriterGreeting from '@/components/TypewriterGreeting'
import TechMarquee from '@/components/TechMarquee'
import Highlights from '@/components/Highlights'
import Footer from '@/components/Footer'
import { getPublishedArticles, getProjects, getHighlights } from '@/lib/data'
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
  const [articles, projects, highlights, content] = await Promise.all([
    getPublishedArticles(),
    getProjects(),
    getHighlights(),
    getSiteContent(),
  ])

  const greetingPhrases = content.greeting_phrases
    .split('\n')
    .map(p => p.trim())
    .filter(Boolean)
  const heroHeadingLines = content.hero_heading.split('\n').filter(Boolean)

  const contactLinks = [
    { label: 'GitHub', href: content.github_url },
    { label: 'LinkedIn', href: content.linkedin_url },
    { label: content.contact_email, href: `mailto:${content.contact_email}` },
  ]

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

        <hr className="max-w-[850px] mx-auto border-t border-[#ececec]" />

        {/* PROJECTS */}
        <div className="max-w-[850px] mx-auto px-12 pt-16 pb-16">
          <div className="flex items-baseline justify-between mb-9">
            <h2 className="text-[18px] font-semibold tracking-[-0.02em]">{content.projects_heading}</h2>
            <a
              href={content.github_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[13px] text-[#666] hover:text-[#111] transition-colors no-underline hover:no-underline"
            >
              GitHub →
            </a>
          </div>

          <div className="flex flex-col">
            {projects.length === 0 ? (
              <p className="text-[15px] text-[#999] py-8">{content.projects_empty}</p>
            ) : (
              projects.map((project, i) => (
                <a
                  key={project.id}
                  href={project.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex justify-between items-start gap-6 py-6 border-b border-[#ececec] no-underline hover:no-underline hover:opacity-60 transition-opacity ${i === 0 ? 'border-t border-[#ececec]' : ''}`}
                >
                  <div className="flex-1">
                    <div className="text-[15px] font-medium text-[#111] mb-1 font-mono">{project.name}</div>
                    <div className="text-[14px] text-[#666] leading-snug">{project.description}</div>
                  </div>
                  <span className="text-[12px] text-[#999] whitespace-nowrap shrink-0 text-right pt-0.5">
                    {project.stack.join(' · ')}
                  </span>
                </a>
              ))
            )}
          </div>
        </div>

        <hr className="max-w-[850px] mx-auto border-t border-[#ececec]" />

        {/* CONTACT */}
        <div className="max-w-[850px] mx-auto px-12 pt-16 pb-16" id="contact">
          <h2 className="text-[18px] font-semibold tracking-[-0.02em] mb-9">{content.contact_heading}</h2>
          <p className="text-[17px] leading-[1.75] text-[#666] max-w-[520px] mb-12">
            {content.contact_intro}
          </p>
          <div className="flex flex-col">
            {contactLinks.map((item, i) => (
              <a
                key={item.label}
                href={item.href}
                target={item.href.startsWith('mailto') ? undefined : '_blank'}
                rel="noopener noreferrer"
                className={`flex justify-between items-center py-5 border-b border-[#ececec] text-[16px] font-medium text-[#111] no-underline hover:no-underline hover:opacity-50 transition-opacity ${i === 0 ? 'border-t border-[#ececec]' : ''}`}
              >
                <span>{item.label}</span>
                <span className="text-[14px] text-[#999]">↗</span>
              </a>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}
