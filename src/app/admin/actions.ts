'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createSupabaseServerClient, getAuthenticatedUser } from '@/lib/supabase/server'
import { SITE_CONTENT_FIELDS } from '@/lib/site-content'

export type ActionState = { error: string } | null

// ---------- Auth ----------

export async function signIn(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const email = String(formData.get('email') ?? '').trim()
  const password = String(formData.get('password') ?? '')
  if (!email || !password) return { error: 'Email and password are required.' }

  const supabase = await createSupabaseServerClient()
  const { error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) return { error: 'Invalid email or password.' }

  redirect('/admin')
}

export async function signOut() {
  const supabase = await createSupabaseServerClient()
  await supabase.auth.signOut()
  redirect('/admin/login')
}

async function requireUser() {
  const user = await getAuthenticatedUser()
  if (!user) redirect('/admin/login')
}

function revalidateSite() {
  revalidatePath('/', 'layout')
}

// ---------- Articles ----------

export async function saveArticle(_prev: ActionState, formData: FormData): Promise<ActionState> {
  await requireUser()

  const id = String(formData.get('id') ?? '')
  const slug = String(formData.get('slug') ?? '').trim()
  const title = String(formData.get('title') ?? '').trim()
  const description = String(formData.get('description') ?? '').trim()
  const content = String(formData.get('content') ?? '')
  const published = formData.get('published') === 'on'
  const publishedAt = String(formData.get('published_at') ?? '').trim()

  if (!slug || !title) return { error: 'Slug and title are required.' }
  if (!/^[a-z0-9-]+$/.test(slug)) return { error: 'Slug may only contain lowercase letters, numbers, and hyphens.' }

  const row = {
    slug,
    title,
    description,
    content,
    published,
    published_at: publishedAt ? new Date(publishedAt).toISOString() : new Date().toISOString(),
  }

  const supabase = await createSupabaseServerClient()
  const { error } = id
    ? await supabase.from('articles').update(row).eq('id', id)
    : await supabase.from('articles').insert(row)
  if (error) return { error: error.message }

  revalidateSite()
  redirect('/admin/articles')
}

export async function deleteArticle(formData: FormData) {
  await requireUser()
  const id = String(formData.get('id') ?? '')
  if (!id) return

  const supabase = await createSupabaseServerClient()
  await supabase.from('articles').delete().eq('id', id)

  revalidateSite()
  redirect('/admin/articles')
}

// ---------- Highlights ----------

export async function saveHighlight(_prev: ActionState, formData: FormData): Promise<ActionState> {
  await requireUser()

  const id = String(formData.get('id') ?? '')
  const type = String(formData.get('type') ?? 'principle')
  const topic = String(formData.get('topic') ?? '').trim()
  const title = String(formData.get('title') ?? '').trim()
  const blurb = String(formData.get('blurb') ?? '').trim()
  const meta = String(formData.get('meta') ?? '').trim()
  const href = String(formData.get('href') ?? '').trim()
  const published = formData.get('published') === 'on'
  const sortOrder = Number(formData.get('sort_order') ?? 0)

  if (!title || !blurb) return { error: 'Title and blurb are required.' }
  if (!['principle', 'project', 'article'].includes(type)) return { error: 'Invalid type.' }

  const row = {
    type,
    topic: topic || null,
    title,
    blurb,
    meta: meta || null,
    href: href || '#',
    published,
    sort_order: Number.isFinite(sortOrder) ? sortOrder : 0,
  }

  const supabase = await createSupabaseServerClient()
  const { error } = id
    ? await supabase.from('highlights').update(row).eq('id', id)
    : await supabase.from('highlights').insert(row)
  if (error) return { error: error.message }

  revalidateSite()
  redirect('/admin/highlights')
}

export async function deleteHighlight(formData: FormData) {
  await requireUser()
  const id = String(formData.get('id') ?? '')
  if (!id) return

  const supabase = await createSupabaseServerClient()
  await supabase.from('highlights').delete().eq('id', id)

  revalidateSite()
  redirect('/admin/highlights')
}

// ---------- Contact messages ----------

export async function deleteMessage(formData: FormData) {
  await requireUser()
  const id = String(formData.get('id') ?? '')
  if (!id) return

  const supabase = await createSupabaseServerClient()
  await supabase.from('contact_messages').delete().eq('id', id)

  redirect('/admin/messages')
}

// ---------- Site content ----------

export async function saveSiteContent(_prev: ActionState, formData: FormData): Promise<ActionState> {
  await requireUser()

  const rows = SITE_CONTENT_FIELDS.map(field => ({
    key: field.key,
    value: String(formData.get(field.key) ?? ''),
    updated_at: new Date().toISOString(),
  }))

  const supabase = await createSupabaseServerClient()
  const { error } = await supabase.from('site_content').upsert(rows)
  if (error) return { error: error.message }

  revalidateSite()
  redirect('/admin/site?saved=1')
}
