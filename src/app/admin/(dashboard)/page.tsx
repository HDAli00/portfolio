import Link from 'next/link'
import { createSupabaseServerClient } from '@/lib/supabase/server'

export default async function AdminOverviewPage() {
  const supabase = await createSupabaseServerClient()

  const [articles, highlights, messages] = await Promise.all([
    supabase.from('articles').select('id, published'),
    supabase.from('highlights').select('id, published'),
    supabase.from('contact_messages').select('id'),
  ])

  const articleRows = articles.data ?? []
  const highlightRows = highlights.data ?? []

  const cards = [
    {
      href: '/admin/articles',
      label: 'Articles',
      count: articleRows.length,
      detail: `${articleRows.filter(a => a.published).length} published`,
    },
    {
      href: '/admin/highlights',
      label: 'Highlights',
      count: highlightRows.length,
      detail: `${highlightRows.filter(h => h.published).length} published`,
    },
    {
      href: '/admin/messages',
      label: 'Messages',
      count: (messages.data ?? []).length,
      detail: 'sent from the footer contact form',
    },
    {
      href: '/admin/site',
      label: 'Site copy',
      count: null,
      detail: 'titles, headings, and text across the site',
    },
  ]

  return (
    <main>
      <h1 className="text-[24px] font-semibold tracking-[-0.02em] text-[#111] mb-2">Content</h1>
      <p className="text-[14px] text-[#666] mb-10">
        Everything the site shows is edited from here. Changes go live within a few seconds.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-[680px]">
        {cards.map(card => (
          <Link
            key={card.href}
            href={card.href}
            className="border border-[#ececec] rounded-[8px] p-6 no-underline hover:no-underline hover:border-[#999] transition-colors"
          >
            <div className="flex items-baseline justify-between mb-2">
              <span className="text-[15px] font-medium text-[#111]">{card.label}</span>
              {card.count !== null && <span className="text-[22px] font-semibold text-[#111]">{card.count}</span>}
            </div>
            <p className="text-[13px] text-[#999]">{card.detail}</p>
          </Link>
        ))}
      </div>
    </main>
  )
}
