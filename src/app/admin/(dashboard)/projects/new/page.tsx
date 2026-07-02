import Link from 'next/link'
import ProjectForm from '../../../ui/ProjectForm'

export default function NewProjectPage() {
  return (
    <main>
      <Link
        href="/admin/projects"
        className="text-[13px] text-[#999] hover:text-[#111] transition-colors no-underline hover:no-underline mb-8 inline-block"
      >
        ← Projects
      </Link>
      <h1 className="text-[24px] font-semibold tracking-[-0.02em] text-[#111] mb-8">New project</h1>
      <ProjectForm />
    </main>
  )
}
