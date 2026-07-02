import type { Metadata } from 'next'
import LoginForm from '../ui/LoginForm'

export const metadata: Metadata = {
  title: 'Admin — Sign in',
  robots: { index: false, follow: false },
}

export default function AdminLoginPage() {
  return (
    <main className="min-h-[70vh] flex items-center justify-center px-6">
      <div className="w-full max-w-[360px]">
        <p className="text-[13px] font-mono text-[#999] uppercase tracking-[0.08em] mb-3">Admin</p>
        <h1 className="text-[26px] font-semibold tracking-[-0.02em] text-[#111] mb-8">Sign in</h1>
        <LoginForm />
      </div>
    </main>
  )
}
