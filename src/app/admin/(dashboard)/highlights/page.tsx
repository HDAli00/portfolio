import Link from 'next/link'
import { createSupabaseServerClient } from '@/lib/supabase/server'
import type { Highlight } from '@/lib/supabase'

const LABELS: Record<Highlight['type'], string> = {
  principle: 'Principle',
  project: 'Project',
  article: 'Article',
}

export default async function AdminHighlightsPage() {
  const supabase = await createSupabaseServerClient()
  const { data } = await supabase.from('highlights').select('*').order('sort_order', { ascending: true })
  const highlights = (data ?? []) as Highlight[]

  return (
    <main>
      <div className="flex items-center justify-between gap-4 mb-8">
        <h1 className="text-[24px] font-semibold tracking-[-0.02em] text-[#111]">Highlights</h1>
        <Link
          href="/admin/highlights/new"
          className="bg-[#111] text-white text-[13px] font-medium rounded-[6px] px-4 py-2 no-underline hover:no-underline hover:opacity-80 transition-opacity"
        >
          New highlight
        </Link>
      </div>

      {highlights.length === 0 ? (
        <p className="text-[14px] text-[#999] py-8">No highlights yet.</p>
      ) : (
        <div className="flex flex-col">
          {highlights.map((highlight, i) => (
            <Link
              key={highlight.id}
              href={`/admin/highlights/${highlight.id}`}
              className={`flex justify-between items-start gap-6 py-5 border-b border-[#ececec] no-underline hover:no-underline hover:opacity-60 transition-opacity ${i === 0 ? 'border-t border-[#ececec]' : ''}`}
            >
              <div className="flex-1 min-w-0">
                <div className="text-[11px] font-mono uppercase tracking-[0.08em] text-[#999] mb-1">
                  {LABELS[highlight.type]}
                  {highlight.topic ? ` · ${highlight.topic}` : ''}
                </div>
                <div className="text-[15px] font-medium text-[#111] leading-snug">{highlight.title}</div>
              </div>
              <span
                className={`inline-block text-[11px] font-mono uppercase tracking-[0.08em] rounded-full px-2.5 py-1 shrink-0 ${
                  highlight.published !== false ? 'bg-[#eef7f0] text-[#1e7d43]' : 'bg-[#f5f5f5] text-[#999]'
                }`}
              >
                {highlight.published !== false ? 'Published' : 'Hidden'}
              </span>
            </Link>
          ))}
        </div>
      )}
    </main>
  )
}
