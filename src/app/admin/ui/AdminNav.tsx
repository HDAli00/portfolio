'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const SECTIONS = [
  { href: '/admin', label: 'Overview' },
  { href: '/admin/articles', label: 'Articles' },
  { href: '/admin/projects', label: 'Projects' },
  { href: '/admin/highlights', label: 'Highlights' },
  { href: '/admin/site', label: 'Site copy' },
]

export default function AdminNav({
  siteName,
  signOutButton,
}: {
  siteName: string
  signOutButton: React.ReactNode
}) {
  const pathname = usePathname()

  const isActive = (href: string) =>
    href === '/admin' ? pathname === '/admin' : pathname.startsWith(href)

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-[#f0f0f0]">
      <div className="max-w-[1000px] mx-auto px-6 sm:px-12 py-5 flex items-center justify-between gap-4">
        <div className="flex items-baseline gap-3 shrink-0">
          <Link
            href="/admin"
            className="text-[15px] font-semibold text-[#111] hover:opacity-70 transition-opacity no-underline hover:no-underline"
          >
            {siteName}
          </Link>
          <span className="text-[11px] font-mono uppercase tracking-[0.08em] text-[#999]">Admin</span>
        </div>

        <div className="flex items-center gap-6 overflow-x-auto">
          {SECTIONS.map(s => (
            <Link
              key={s.href}
              href={s.href}
              className={`text-[14px] whitespace-nowrap transition-colors no-underline hover:no-underline ${
                isActive(s.href) ? 'text-[#111] font-medium' : 'text-[#666] hover:text-[#111]'
              }`}
            >
              {s.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-6 shrink-0">
          <Link
            href="/"
            className="text-[14px] text-[#666] hover:text-[#111] transition-colors no-underline hover:no-underline whitespace-nowrap"
          >
            View site
          </Link>
          {signOutButton}
        </div>
      </div>
    </nav>
  )
}
