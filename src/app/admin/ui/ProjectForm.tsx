'use client'

import { useActionState } from 'react'
import type { Project } from '@/lib/supabase'
import { saveProject, type ActionState } from '../actions'
import { ErrorNote, FieldLabel, SubmitButton, inputClass, textareaClass } from './fields'

export default function ProjectForm({ project }: { project?: Project }) {
  const [state, action] = useActionState<ActionState, FormData>(saveProject, null)

  return (
    <form action={action} className="flex flex-col gap-5 max-w-[680px]">
      {project && <input type="hidden" name="id" value={project.id} />}

      <label className="block">
        <FieldLabel>Name</FieldLabel>
        <input name="name" defaultValue={project?.name} required className={`${inputClass} font-mono`} />
      </label>

      <label className="block">
        <FieldLabel>Description</FieldLabel>
        <textarea name="description" defaultValue={project?.description} className={`${textareaClass} min-h-[90px]`} />
      </label>

      <label className="block">
        <FieldLabel hint="comma-separated, e.g. Terraform, AWS, Kubernetes">Stack</FieldLabel>
        <input name="stack" defaultValue={project?.stack?.join(', ')} className={inputClass} />
      </label>

      <label className="block">
        <FieldLabel>GitHub URL</FieldLabel>
        <input name="github_url" type="url" defaultValue={project?.github_url} className={inputClass} />
      </label>

      <label className="block max-w-[160px]">
        <FieldLabel hint="lower = first">Sort order</FieldLabel>
        <input name="sort_order" type="number" defaultValue={project?.sort_order ?? 0} className={inputClass} />
      </label>

      <ErrorNote error={state?.error} />
      <div>
        <SubmitButton>{project ? 'Save project' : 'Create project'}</SubmitButton>
      </div>
    </form>
  )
}
