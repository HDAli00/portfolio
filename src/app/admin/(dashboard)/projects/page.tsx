import Link from 'next/link'
import { createSupabaseServerClient } from '@/lib/supabase/server'
import type { Project } from '@/lib/supabase'

export default async function AdminProjectsPage() {
  const supabase = await createSupabaseServerClient()
  const { data } = await supabase.from('projects').select('*').order('sort_order', { ascending: true })
  const projects = (data ?? []) as Project[]

  return (
    <main>
      <div className="flex items-center justify-between gap-4 mb-8">
        <h1 className="text-[24px] font-semibold tracking-[-0.02em] text-[#111]">Projects</h1>
        <Link
          href="/admin/projects/new"
          className="bg-[#111] text-white text-[13px] font-medium rounded-[6px] px-4 py-2 no-underline hover:no-underline hover:opacity-80 transition-opacity"
        >
          New project
        </Link>
      </div>

      {projects.length === 0 ? (
        <p className="text-[14px] text-[#999] py-8">No projects yet.</p>
      ) : (
        <div className="flex flex-col">
          {projects.map((project, i) => (
            <Link
              key={project.id}
              href={`/admin/projects/${project.id}`}
              className={`flex justify-between items-start gap-6 py-5 border-b border-[#ececec] no-underline hover:no-underline hover:opacity-60 transition-opacity ${i === 0 ? 'border-t border-[#ececec]' : ''}`}
            >
              <div className="flex-1 min-w-0">
                <div className="text-[15px] font-medium text-[#111] mb-1 font-mono">{project.name}</div>
                <div className="text-[13px] text-[#666] leading-snug">{project.description}</div>
              </div>
              <span className="text-[12px] text-[#999] whitespace-nowrap shrink-0 pt-0.5">
                {project.stack.join(' · ')}
              </span>
            </Link>
          ))}
        </div>
      )}
    </main>
  )
}
