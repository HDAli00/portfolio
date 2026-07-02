'use client'

import { useActionState } from 'react'
import type { Article } from '@/lib/supabase'
import { saveArticle, type ActionState } from '../actions'
import { ErrorNote, FieldLabel, SubmitButton, inputClass, textareaClass } from './fields'

function toDateInputValue(iso?: string) {
  if (!iso) return ''
  return new Date(iso).toISOString().slice(0, 10)
}

export default function ArticleForm({ article }: { article?: Article }) {
  const [state, action] = useActionState<ActionState, FormData>(saveArticle, null)

  return (
    <form action={action} className="flex flex-col gap-5 max-w-[680px]">
      {article && <input type="hidden" name="id" value={article.id} />}

      <label className="block">
        <FieldLabel>Title</FieldLabel>
        <input name="title" defaultValue={article?.title} required className={inputClass} />
      </label>

      <label className="block">
        <FieldLabel hint="used in the URL: /writing/your-slug">Slug</FieldLabel>
        <input
          name="slug"
          defaultValue={article?.slug}
          required
          pattern="[a-z0-9\-]+"
          className={`${inputClass} font-mono`}
        />
      </label>

      <label className="block">
        <FieldLabel>Description</FieldLabel>
        <textarea name="description" defaultValue={article?.description} className={`${textareaClass} min-h-[70px]`} />
      </label>

      <label className="block">
        <FieldLabel hint="HTML — rendered as-is on the article page">Content</FieldLabel>
        <textarea
          name="content"
          defaultValue={article?.content}
          className={`${textareaClass} min-h-[380px] font-mono text-[13px]`}
        />
      </label>

      <div className="flex items-end gap-6 flex-wrap">
        <label className="block">
          <FieldLabel>Publish date</FieldLabel>
          <input name="published_at" type="date" defaultValue={toDateInputValue(article?.published_at)} className={inputClass} />
        </label>

        <label className="flex items-center gap-2.5 pb-2.5 cursor-pointer">
          <input
            name="published"
            type="checkbox"
            defaultChecked={article?.published ?? false}
            className="w-4 h-4 accent-[#111]"
          />
          <span className="text-[14px] text-[#111]">Published</span>
        </label>
      </div>

      <ErrorNote error={state?.error} />
      <div>
        <SubmitButton>{article ? 'Save article' : 'Create article'}</SubmitButton>
      </div>
    </form>
  )
}
