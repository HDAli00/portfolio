'use client'

import { useFormStatus } from 'react-dom'

export const inputClass =
  'w-full border border-[#e3e3e3] rounded-[6px] px-3.5 py-2.5 text-[14px] text-[#111] bg-white outline-none focus:border-[#111] transition-colors placeholder:text-[#bbb]'

export const textareaClass = `${inputClass} min-h-[110px] leading-[1.6] resize-y`

export function FieldLabel({ children, hint }: { children: React.ReactNode; hint?: string }) {
  return (
    <span className="block text-[11px] font-mono uppercase tracking-[0.08em] text-[#999] mb-1.5">
      {children}
      {hint && <span className="normal-case tracking-normal text-[#bbb] ml-2">{hint}</span>}
    </span>
  )
}

export function ErrorNote({ error }: { error?: string | null }) {
  if (!error) return null
  return (
    <p className="text-[13px] text-[#c0392b] border border-[#f2d7d2] bg-[#fdf6f5] rounded-[6px] px-3.5 py-2.5">
      {error}
    </p>
  )
}

export function SubmitButton({ children }: { children: React.ReactNode }) {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending}
      className="bg-[#111] text-white text-[13px] font-medium rounded-[6px] px-5 py-2.5 hover:opacity-80 transition-opacity disabled:opacity-50 cursor-pointer"
    >
      {pending ? 'Saving…' : children}
    </button>
  )
}
