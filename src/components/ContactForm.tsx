'use client'

import { useActionState } from 'react'
import { useFormStatus } from 'react-dom'
import { sendMessage, type ContactState } from '@/app/actions/contact'

const inputClass =
  'w-full border border-[#e3e3e3] rounded-[8px] px-4 py-3 text-[14px] text-[#111] bg-white outline-none focus:border-(--accent) focus:ring-2 focus:ring-(--accent)/15 transition placeholder:text-[#aaa]'

function SendButton() {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex items-center gap-2 bg-(--accent) text-white text-[14px] font-medium rounded-[8px] px-6 py-3 hover:opacity-85 transition-opacity disabled:opacity-50 cursor-pointer"
    >
      {pending ? 'Sending…' : 'Send'}
      {!pending && (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
        </svg>
      )}
    </button>
  )
}

export default function ContactForm() {
  const [state, action] = useActionState<ContactState, FormData>(sendMessage, null)

  if (state && 'ok' in state) {
    return (
      <div className="border border-[#d3ead9] bg-[#f4faf6] rounded-[10px] px-6 py-8 text-center">
        <p className="text-[15px] font-medium text-[#1e7d43] mb-1">Message sent</p>
        <p className="text-[13px] text-[#666]">Thanks for reaching out — I&apos;ll get back to you.</p>
      </div>
    )
  }

  return (
    <form action={action} className="flex flex-col gap-4">
      <label className="block">
        <span className="block text-[11px] font-mono uppercase tracking-[0.08em] text-[#999] mb-1.5">Subject</span>
        <input name="subject" required maxLength={200} placeholder="What's this about?" className={inputClass} />
      </label>
      <label className="block">
        <span className="block text-[11px] font-mono uppercase tracking-[0.08em] text-[#999] mb-1.5">Message</span>
        <textarea
          name="message"
          required
          maxLength={5000}
          rows={5}
          placeholder="Write your message…"
          className={`${inputClass} resize-y min-h-[120px] leading-[1.6]`}
        />
      </label>
      {state && 'error' in state && (
        <p className="text-[13px] text-[#c0392b]">{state.error}</p>
      )}
      <div>
        <SendButton />
      </div>
    </form>
  )
}
