import { siGithub } from 'simple-icons'
import { getSiteContent } from '@/lib/site-content'
import ContactForm from './ContactForm'

// LinkedIn is not in simple-icons (trademark policy); flat logo from the
// MIT-licensed devicon set (viewBox 0 0 128 128).
const LINKEDIN_PATH =
  'M116 3H12a8.91 8.91 0 00-9 8.8v104.42a8.91 8.91 0 009 8.78h104a8.93 8.93 0 009-8.81V11.77A8.93 8.93 0 00116 3zM39.17 107H21.06V48.73h18.11zm-9-66.21a10.5 10.5 0 1110.49-10.5 10.5 10.5 0 01-10.54 10.48zM107 107H88.89V78.65c0-6.75-.12-15.44-9.41-15.44s-10.87 7.36-10.87 15V107H50.53V48.73h17.36v8h.24c2.42-4.58 8.32-9.41 17.13-9.41C103.6 47.28 107 59.35 107 75z'

const socialLinkClass =
  'w-10 h-10 rounded-full border border-[#e3e3e3] flex items-center justify-center text-[#666] hover:text-white hover:bg-(--accent) hover:border-(--accent) transition-colors no-underline hover:no-underline'

export default async function Footer() {
  const content = await getSiteContent()

  return (
    <footer id="contact" className="border-t border-[#ececec] mt-8 bg-[#fafafa]">
      <div className="max-w-[850px] mx-auto px-12 py-16 grid grid-cols-1 sm:grid-cols-[1fr_1.2fr] gap-12">
        {/* Reach out */}
        <div>
          <p className="text-[13px] font-mono uppercase tracking-[0.08em] text-(--accent) mb-4">Contact</p>
          <h2 className="text-[26px] font-semibold tracking-[-0.02em] text-[#111] mb-4">{content.footer_heading}</h2>
          <p className="text-[15px] leading-[1.75] text-[#666] mb-8 max-w-[38ch]">{content.footer_blurb}</p>

          <div className="flex items-center gap-3">
            <a
              href={content.github_url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              title="GitHub"
              className={socialLinkClass}
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px]" aria-hidden="true">
                <path d={siGithub.path} />
              </svg>
            </a>
            <a
              href={content.linkedin_url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              title="LinkedIn"
              className={socialLinkClass}
            >
              <svg viewBox="0 0 128 128" fill="currentColor" className="w-[17px] h-[17px]" aria-hidden="true">
                <path d={LINKEDIN_PATH} />
              </svg>
            </a>
            <a href={`mailto:${content.contact_email}`} aria-label="Email" title="Email" className={socialLinkClass}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]" aria-hidden="true">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m22 7-10 6L2 7" />
              </svg>
            </a>
          </div>
        </div>

        {/* Direct message form */}
        <ContactForm />
      </div>

      <div className="border-t border-[#ececec]">
        <div className="max-w-[850px] mx-auto px-12 py-6 flex items-center justify-between flex-wrap gap-2">
          <span className="text-[13px] text-[#999]">{content.footer_copyright}</span>
          <span className="text-[13px] text-[#999]">{content.contact_email}</span>
        </div>
      </div>
    </footer>
  )
}
