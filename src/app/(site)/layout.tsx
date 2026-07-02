import Nav from '@/components/Nav'
import { getSiteContent } from '@/lib/site-content'

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const content = await getSiteContent()

  return (
    <>
      <Nav siteName={content.site_name} />
      {children}
    </>
  )
}
