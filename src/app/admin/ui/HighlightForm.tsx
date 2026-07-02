'use client'

import { useActionState } from 'react'
import type { Highlight } from '@/lib/supabase'
import { saveHighlight, type ActionState } from '../actions'
import { ErrorNote, FieldLabel, SubmitButton, inputClass, textareaClass } from './fields'

export default function HighlightForm({ highlight }: { highlight?: Highlight }) {
  const [state, action] = useActionState<ActionState, FormData>(saveHighlight, null)

  return (
    <form action={action} className="flex flex-col gap-5 max-w-[680px]">
      {highlight && <input type="hidden" name="id" value={highlight.id} />}

      <div className="flex gap-6 flex-wrap">
        <label className="block">
          <FieldLabel>Type</FieldLabel>
          <select name="type" defaultValue={highlight?.type ?? 'principle'} className={`${inputClass} cursor-pointer`}>
            <option value="principle">Principle</option>
            <option value="project">Project</option>
            <option value="article">Article</option>
          </select>
        </label>

        <label className="block flex-1 min-w-[200px]">
          <FieldLabel hint="e.g. Observability">Topic</FieldLabel>
          <input name="topic" defaultValue={highlight?.topic ?? ''} className={inputClass} />
        </label>
      </div>

      <label className="block">
        <FieldLabel>Title</FieldLabel>
        <input name="title" defaultValue={highlight?.title} required className={inputClass} />
      </label>

      <label className="block">
        <FieldLabel>Blurb</FieldLabel>
        <textarea name="blurb" defaultValue={highlight?.blurb} className={`${textareaClass} min-h-[90px]`} />
      </label>

      <label className="block">
        <FieldLabel hint="small mono line under the blurb">Meta</FieldLabel>
        <input name="meta" defaultValue={highlight?.meta ?? ''} className={inputClass} />
      </label>

      <label className="block">
        <FieldLabel hint="# for no link">Link</FieldLabel>
        <input name="href" defaultValue={highlight?.href ?? '#'} className={inputClass} />
      </label>

      <div className="flex items-end gap-6 flex-wrap">
        <label className="block max-w-[160px]">
          <FieldLabel hint="lower = first">Sort order</FieldLabel>
          <input name="sort_order" type="number" defaultValue={highlight?.sort_order ?? 0} className={inputClass} />
        </label>

        <label className="flex items-center gap-2.5 pb-2.5 cursor-pointer">
          <input
            name="published"
            type="checkbox"
            defaultChecked={highlight?.published ?? true}
            className="w-4 h-4 accent-[#111]"
          />
          <span className="text-[14px] text-[#111]">Published</span>
        </label>
      </div>

      <ErrorNote error={state?.error} />
      <div>
        <SubmitButton>{highlight ? 'Save highlight' : 'Create highlight'}</SubmitButton>
      </div>
    </form>
  )
}
