import { getSiteContent } from '@/lib/site-content'

export default async function Footer() {
  const content = await getSiteContent()

  const links = [
    { label: 'GitHub', href: content.github_url },
    { label: 'LinkedIn', href: content.linkedin_url },
    { label: 'Email', href: `mailto:${content.contact_email}` },
  ]

  return (
    <footer className="border-t border-[#ececec] mt-8">
      <div className="max-w-[850px] mx-auto px-12 py-10 flex items-center justify-between flex-wrap gap-4">
        <span className="text-[13px] text-[#999]">{content.footer_copyright}</span>
        <ul className="flex gap-5 list-none">
          {links.map(l => (
            <li key={l.label}>
              <a
                href={l.href}
                target={l.href.startsWith('mailto') ? undefined : '_blank'}
                rel="noopener noreferrer"
                className="text-[13px] text-[#999] hover:text-[#111] transition-colors no-underline hover:no-underline"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  )
}
