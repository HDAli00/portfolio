import Link from 'next/link'
import HighlightForm from '../../../ui/HighlightForm'

export default function NewHighlightPage() {
  return (
    <main>
      <Link
        href="/admin/highlights"
        className="text-[13px] text-[#999] hover:text-[#111] transition-colors no-underline hover:no-underline mb-8 inline-block"
      >
        ← Highlights
      </Link>
      <h1 className="text-[24px] font-semibold tracking-[-0.02em] text-[#111] mb-8">New highlight</h1>
      <HighlightForm />
    </main>
  )
}
