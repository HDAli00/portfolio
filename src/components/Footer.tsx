export default function Footer() {
  return (
    <footer className="border-t border-[#ececec] mt-8">
      <div className="max-w-[850px] mx-auto px-12 py-10 flex items-center justify-between flex-wrap gap-4">
        <span className="text-[13px] text-[#999]">© 2025 Hassan Ali</span>
        <ul className="flex gap-5 list-none">
          {[
            { label: 'GitHub', href: 'https://github.com/HDAli00' },
            { label: 'LinkedIn', href: 'https://linkedin.com/in/hdali' },
            { label: 'Email', href: 'mailto:hello@hdalidocs.dev' },
          ].map(l => (
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
