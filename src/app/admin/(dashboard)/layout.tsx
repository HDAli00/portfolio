import type { Metadata } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { getAuthenticatedUser } from '@/lib/supabase/server'
import { signOut } from '../actions'

export const metadata: Metadata = {
  title: 'Admin',
  robots: { index: false, follow: false },
}

const SECTIONS = [
  { href: '/admin', label: 'Overview' },
  { href: '/admin/articles', label: 'Articles' },
  { href: '/admin/projects', label: 'Projects' },
  { href: '/admin/highlights', label: 'Highlights' },
  { href: '/admin/site', label: 'Site copy' },
]

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  // The proxy guards /admin, but server actions and direct renders
  // re-verify here so the check can't be bypassed.
  const user = await getAuthenticatedUser()
  if (!user) redirect('/admin/login')

  return (
    <div className="max-w-[1000px] mx-auto px-6 sm:px-12">
      <header className="flex items-center justify-between gap-4 flex-wrap py-6 border-b border-[#ececec]">
        <div className="flex items-center gap-6 flex-wrap">
          <span className="text-[13px] font-mono uppercase tracking-[0.08em] text-[#111] font-semibold">Admin</span>
          <nav className="flex items-center gap-4 flex-wrap">
            {SECTIONS.map(s => (
              <Link
                key={s.href}
                href={s.href}
                className="text-[13px] text-[#666] hover:text-[#111] transition-colors no-underline hover:no-underline"
              >
                {s.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="text-[13px] text-[#666] hover:text-[#111] transition-colors no-underline hover:no-underline"
          >
            View site ↗
          </Link>
          <form action={signOut}>
            <button
              type="submit"
              className="text-[13px] text-[#666] border border-[#ececec] rounded-[6px] px-3.5 py-1.5 hover:text-[#111] hover:border-[#999] transition-colors cursor-pointer"
            >
              Sign out
            </button>
          </form>
        </div>
      </header>
      <div className="py-10">{children}</div>
    </div>
  )
}
