'use client'

import { useState } from 'react'
import type { Highlight } from '@/lib/supabase'

const LABELS: Record<Highlight['type'], string> = {
  principle: 'Principle',
  project: 'Project',
  article: 'Article',
}

const TYPES: Highlight['type'][] = ['principle', 'project', 'article']

export default function Highlights({ highlights }: { highlights: Highlight[] }) {
  const [active, setActive] = useState<'all' | Highlight['type']>('all')

  const present = TYPES.filter(t => highlights.some(h => h.type === t))
  const rows = active === 'all' ? highlights : highlights.filter(h => h.type === active)

  return (
    <div className="max-w-[850px] mx-auto px-12 pt-16 pb-16">
      <p className="text-[13px] font-mono text-[#999] uppercase tracking-[0.02em] mb-4">Field notes</p>
      <h2 className="text-[clamp(28px,3.6vw,38px)] font-semibold leading-[1.18] tracking-[-0.025em] text-[#111] max-w-[22ch] mb-4">
        What production taught me to hold as non-negotiable.
      </h2>
      <p className="text-[17px] leading-[1.75] text-[#666] max-w-[560px] mb-9">
        A running index of principles, the projects that earned them, and things I&apos;ve written. Each one has a scar behind it.
      </p>

      {present.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-2">
          <button
            onClick={() => setActive('all')}
            className={`text-[12px] font-mono tracking-[0.02em] rounded-full px-3.5 py-1.5 border transition-colors cursor-pointer ${
              active === 'all'
                ? 'bg-[#111] text-white border-[#111]'
                : 'text-[#666] border-[#ececec] hover:border-[#999] hover:text-[#111]'
            }`}
          >
            All
          </button>
          {present.map(t => (
            <button
              key={t}
              onClick={() => setActive(t)}
              className={`text-[12px] font-mono tracking-[0.02em] rounded-full px-3.5 py-1.5 border transition-colors cursor-pointer ${
                active === t
                  ? 'bg-[#111] text-white border-[#111]'
                  : 'text-[#666] border-[#ececec] hover:border-[#999] hover:text-[#111]'
              }`}
            >
              {LABELS[t]}s
            </button>
          ))}
        </div>
      )}

      <div className="flex flex-col mt-5">
        {rows.length === 0 ? (
          <p className="text-[15px] text-[#999] py-8 font-mono">
            {highlights.length === 0 ? 'Nothing here yet.' : 'Nothing in this category yet.'}
          </p>
        ) : (
          rows.map((h, i) => (
            <a
              key={h.id}
              href={h.href}
              target={h.href?.startsWith('http') ? '_blank' : undefined}
              rel={h.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
              className={`group flex items-start gap-6 py-[26px] pl-3.5 pr-2 border-b border-l-2 border-l-transparent border-[#ececec] hover:bg-[#fafafa] hover:border-l-[#111] transition-colors no-underline hover:no-underline ${
                i === 0 ? 'border-t' : ''
              }`}
            >
              <div className="w-28 shrink-0 pt-0.5">
                <span className="block text-[11px] font-mono uppercase tracking-[0.08em] text-[#999]">
                  {LABELS[h.type]}
                </span>
                {h.topic && (
                  <span className="block text-[11px] font-mono text-[#999] mt-1 tracking-[0.02em]">{h.topic}</span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[17px] font-semibold leading-[1.35] tracking-[-0.01em] text-[#111] group-hover:underline decoration-[#ececec] underline-offset-[3px]">
                  {h.title}
                </div>
                <p className="text-[14.5px] leading-[1.6] text-[#666] mt-1.5 max-w-[60ch]">{h.blurb}</p>
                {h.meta && <p className="text-[11.5px] font-mono text-[#999] mt-2.5 tracking-[0.02em]">{h.meta}</p>}
              </div>
              <span className="shrink-0 self-center font-mono text-[#999] group-hover:text-[#111] group-hover:translate-x-1 transition-transform">
                →
              </span>
            </a>
          ))
        )}
      </div>
    </div>
  )
}
