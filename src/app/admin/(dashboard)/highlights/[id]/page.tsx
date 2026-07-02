import Link from 'next/link'
import { notFound } from 'next/navigation'
import { createSupabaseServerClient } from '@/lib/supabase/server'
import type { Highlight } from '@/lib/supabase'
import HighlightForm from '../../../ui/HighlightForm'
import DeleteButton from '../../../ui/DeleteButton'
import { deleteHighlight } from '../../../actions'

export default async function EditHighlightPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createSupabaseServerClient()
  const { data } = await supabase.from('highlights').select('*').eq('id', id).single()
  if (!data) notFound()
  const highlight = data as Highlight

  return (
    <main>
      <div className="flex items-center justify-between gap-4 mb-8">
        <Link
          href="/admin/highlights"
          className="text-[13px] text-[#999] hover:text-[#111] transition-colors no-underline hover:no-underline"
        >
          ← Highlights
        </Link>
        <DeleteButton id={highlight.id} action={deleteHighlight} label="Delete highlight" />
      </div>
      <h1 className="text-[24px] font-semibold tracking-[-0.02em] text-[#111] mb-8">Edit highlight</h1>
      <HighlightForm highlight={highlight} />
    </main>
  )
}
