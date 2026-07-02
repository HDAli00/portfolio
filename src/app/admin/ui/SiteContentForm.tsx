'use client'

import { useActionState } from 'react'
import type { SiteContent, SiteContentField } from '@/lib/site-content'
import { saveSiteContent, type ActionState } from '../actions'
import { ErrorNote, FieldLabel, SubmitButton, inputClass, textareaClass } from './fields'

export default function SiteContentForm({
  fields,
  content,
  saved,
}: {
  fields: SiteContentField[]
  content: SiteContent
  saved?: boolean
}) {
  const [state, action] = useActionState<ActionState, FormData>(saveSiteContent, null)

  const groups: { name: string; fields: SiteContentField[] }[] = []
  for (const field of fields) {
    const group = groups.find(g => g.name === field.group)
    if (group) group.fields.push(field)
    else groups.push({ name: field.group, fields: [field] })
  }

  return (
    <form action={action} className="flex flex-col gap-10 max-w-[680px]">
      {saved && !state && (
        <p className="text-[13px] text-[#1e7d43] border border-[#d3ead9] bg-[#f4faf6] rounded-[6px] px-3.5 py-2.5">
          Saved. The live site will show the new copy shortly.
        </p>
      )}

      {groups.map(group => (
        <fieldset key={group.name} className="flex flex-col gap-5">
          <legend className="text-[15px] font-semibold text-[#111] tracking-[-0.01em] mb-4 pb-2 border-b border-[#ececec] w-full">
            {group.name}
          </legend>
          {group.fields.map(field => (
            <label key={field.key} className="block">
              <FieldLabel hint={field.hint}>{field.label}</FieldLabel>
              {field.multiline ? (
                <textarea name={field.key} defaultValue={content[field.key]} className={textareaClass} />
              ) : (
                <input name={field.key} defaultValue={content[field.key]} className={inputClass} />
              )}
            </label>
          ))}
        </fieldset>
      ))}

      <ErrorNote error={state?.error} />
      <div className="sticky bottom-0 bg-white/95 backdrop-blur-sm py-4 border-t border-[#ececec]">
        <SubmitButton>Save all copy</SubmitButton>
      </div>
    </form>
  )
}
