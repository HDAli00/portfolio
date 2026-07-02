import Link from 'next/link'
import { notFound } from 'next/navigation'
import { createSupabaseServerClient } from '@/lib/supabase/server'
import type { Project } from '@/lib/supabase'
import ProjectForm from '../../../ui/ProjectForm'
import DeleteButton from '../../../ui/DeleteButton'
import { deleteProject } from '../../../actions'

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createSupabaseServerClient()
  const { data } = await supabase.from('projects').select('*').eq('id', id).single()
  if (!data) notFound()
  const project = data as Project

  return (
    <main>
      <div className="flex items-center justify-between gap-4 mb-8">
        <Link
          href="/admin/projects"
          className="text-[13px] text-[#999] hover:text-[#111] transition-colors no-underline hover:no-underline"
        >
          ← Projects
        </Link>
        <DeleteButton id={project.id} action={deleteProject} label="Delete project" />
      </div>
      <h1 className="text-[24px] font-semibold tracking-[-0.02em] text-[#111] mb-8">Edit project</h1>
      <ProjectForm project={project} />
    </main>
  )
}
