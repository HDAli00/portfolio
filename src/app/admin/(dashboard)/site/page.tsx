import { createSupabaseServerClient } from '@/lib/supabase/server'
import { SITE_CONTENT_DEFAULTS, SITE_CONTENT_FIELDS, type SiteContent } from '@/lib/site-content'
import SiteContentForm from '../../ui/SiteContentForm'

export default async function AdminSitePage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string }>
}) {
  const { saved } = await searchParams
  const supabase = await createSupabaseServerClient()
  const { data } = await supabase.from('site_content').select('key, value')

  const overrides = Object.fromEntries(
    (data ?? []).filter(row => row.value !== '').map(row => [row.key, row.value])
  )
  const content: SiteContent = { ...SITE_CONTENT_DEFAULTS, ...overrides }

  return (
    <main>
      <h1 className="text-[24px] font-semibold tracking-[-0.02em] text-[#111] mb-2">Site copy</h1>
      <p className="text-[14px] text-[#666] mb-10 max-w-[560px]">
        Every fixed piece of text on the site — page titles, headings, intros, links, and the footer.
        Clear a field to fall back to its default.
      </p>
      <SiteContentForm fields={SITE_CONTENT_FIELDS} content={content} saved={saved === '1'} />
    </main>
  )
}
