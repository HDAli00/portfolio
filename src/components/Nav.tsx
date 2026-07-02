'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Nav({ siteName = 'Hassan Ali' }: { siteName?: string }) {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-[#f0f0f0]">
      <div className="max-w-[850px] mx-auto px-12 py-7 flex items-center justify-between">
        <Link
          href="/"
          className="text-[15px] font-semibold text-[#111] hover:opacity-70 transition-opacity no-underline hover:no-underline"
        >
          {siteName}
        </Link>

        {/* Desktop links */}
        <div className="hidden sm:flex items-center gap-7">
          <Link href="/writing" className="text-[14px] text-[#666] hover:text-[#111] transition-colors no-underline hover:no-underline">
            Writing
          </Link>
          <Link href="/#contact" className="text-[14px] text-[#666] hover:text-[#111] transition-colors no-underline hover:no-underline">
            Contact
          </Link>

          {/* Search icon */}
          <button className="text-[#666] hover:text-[#111] transition-colors" aria-label="Search">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="sm:hidden text-[#111] text-lg"
          aria-label="Menu"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="sm:hidden border-t border-[#ececec] px-6 py-4 flex flex-col gap-4">
          <Link href="/writing" className="text-[14px] text-[#666]" onClick={() => setMobileOpen(false)}>Writing</Link>
          <Link href="/#contact" className="text-[14px] text-[#666]" onClick={() => setMobileOpen(false)}>Contact</Link>
        </div>
      )}
    </nav>
  )
}
