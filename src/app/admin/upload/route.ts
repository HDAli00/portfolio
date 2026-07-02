import { NextResponse } from 'next/server'
import { createSupabaseServerClient } from '@/lib/supabase/server'

const BUCKET = 'article-images'
const MAX_BYTES = 8 * 1024 * 1024
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml', 'image/avif']

export async function POST(request: Request) {
  const supabase = await createSupabaseServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const form = await request.formData()
  const file = form.get('file')
  if (!(file instanceof File)) {
    return NextResponse.json({ error: 'No file provided.' }, { status: 400 })
  }
  if (!ALLOWED_TYPES.includes(file.type)) {
    return NextResponse.json({ error: 'Only image files are allowed.' }, { status: 400 })
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: 'Image is too large (max 8 MB).' }, { status: 400 })
  }

  const ext = file.name.includes('.') ? file.name.split('.').pop()!.toLowerCase() : 'bin'
  const now = new Date()
  const path = `${now.getFullYear()}/${String(now.getMonth() + 1).padStart(2, '0')}/${crypto.randomUUID()}.${ext}`

  const { error } = await supabase.storage.from(BUCKET).upload(path, file, {
    contentType: file.type,
    cacheControl: '31536000',
  })
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from(BUCKET).getPublicUrl(path)

  return NextResponse.json({ url: publicUrl })
}
