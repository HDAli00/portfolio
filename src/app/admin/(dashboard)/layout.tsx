import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { getAuthenticatedUser } from '@/lib/supabase/server'
import { getSiteContent } from '@/lib/site-content'
import { signOut } from '../actions'
import AdminNav from '../ui/AdminNav'

export const metadata: Metadata = {
  title: 'Admin',
  robots: { index: false, follow: false },
}

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  // The proxy guards /admin, but server actions and direct renders
  // re-verify here so the check can't be bypassed.
  const user = await getAuthenticatedUser()
  if (!user) redirect('/admin/login')

  const content = await getSiteContent()

  return (
    <>
      <AdminNav
        siteName={content.site_name}
        signOutButton={
          <form action={signOut}>
            <button
              type="submit"
              className="text-[14px] text-[#666] hover:text-[#111] transition-colors cursor-pointer whitespace-nowrap"
            >
              Sign out
            </button>
          </form>
        }
      />
      <div className="max-w-[1000px] mx-auto px-6 sm:px-12 py-12">{children}</div>
    </>
  )
}
