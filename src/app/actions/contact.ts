'use server'

import { supabase } from '@/lib/supabase'
import { getSiteContent } from '@/lib/site-content'

export type ContactState = { ok: true } | { error: string } | null

// Best-effort email relay via FormSubmit (https://formsubmit.co) — free,
// no API key. The first message triggers a one-time activation email to
// the recipient. If the relay fails the message is still stored in the
// database and shown in the admin inbox.
async function relayByEmail(subject: string, message: string) {
  const content = await getSiteContent()
  const to = process.env.CONTACT_FORM_EMAIL || content.contact_email
  if (!to) return

  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), 5000)
  try {
    await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(to)}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        _subject: `Portfolio contact: ${subject}`,
        subject,
        message,
        _template: 'box',
      }),
      signal: controller.signal,
    })
  } catch {
    // Delivery is best-effort; the admin inbox is the source of truth.
  } finally {
    clearTimeout(timer)
  }
}

export async function sendMessage(_prev: ContactState, formData: FormData): Promise<ContactState> {
  const subject = String(formData.get('subject') ?? '').trim()
  const message = String(formData.get('message') ?? '').trim()

  if (!subject || !message) return { error: 'Please fill in both a subject and a message.' }
  if (subject.length > 200) return { error: 'Subject is too long (max 200 characters).' }
  if (message.length > 5000) return { error: 'Message is too long (max 5000 characters).' }

  const { error } = await supabase.from('contact_messages').insert({ subject, message })
  if (error) return { error: 'Something went wrong sending your message — please try again.' }

  await relayByEmail(subject, message)
  return { ok: true }
}
