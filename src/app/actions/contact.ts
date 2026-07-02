'use server'

import { supabase } from '@/lib/supabase'

export type ContactState = { ok: true } | { error: string } | null

// Best-effort email relay via FormSubmit (https://formsubmit.co), free and
// without an API key. If the relay fails the message is still stored in the
// database and shown in the admin inbox.
//
// The default is FormSubmit's alias for the activated recipient address, so
// the real email never appears in requests. To change the recipient, set
// CONTACT_FORM_EMAIL (a new address gets a one-time activation email first).
const FORMSUBMIT_ALIAS = 'd1634c6eed8dbaedb3f0edfd2e9b9ee3'

async function relayByEmail(subject: string, message: string) {
  const to = process.env.CONTACT_FORM_EMAIL || FORMSUBMIT_ALIAS
  if (!to) return

  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), 5000)
  try {
    await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(to)}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        // FormSubmit rejects requests without a page origin
        Origin: 'https://hdalidocs.dev',
        Referer: 'https://hdalidocs.dev/',
      },
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
  if (error) return { error: 'Something went wrong sending your message. Please try again.' }

  await relayByEmail(subject, message)
  return { ok: true }
}
