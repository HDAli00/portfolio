import { createSupabaseServerClient } from '@/lib/supabase/server'
import type { ContactMessage } from '@/lib/supabase'
import DeleteButton from '../../ui/DeleteButton'
import { deleteMessage } from '../../actions'

function formatDate(iso: string) {
  return new Date(iso).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  })
}

export default async function AdminMessagesPage() {
  const supabase = await createSupabaseServerClient()
  const { data } = await supabase
    .from('contact_messages')
    .select('*')
    .order('created_at', { ascending: false })
  const messages = (data ?? []) as ContactMessage[]

  return (
    <main>
      <h1 className="text-[24px] font-semibold tracking-[-0.02em] text-[#111] mb-2">Messages</h1>
      <p className="text-[14px] text-[#666] mb-10">
        Sent from the contact form in the site footer.
      </p>

      {messages.length === 0 ? (
        <p className="text-[14px] text-[#999] py-8">No messages yet.</p>
      ) : (
        <div className="flex flex-col gap-4 max-w-[720px]">
          {messages.map(msg => (
            <div key={msg.id} className="border border-[#ececec] rounded-[8px] p-6">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <div className="text-[15px] font-medium text-[#111] leading-snug">{msg.subject}</div>
                  <div className="text-[12px] text-[#999] mt-1">{formatDate(msg.created_at)}</div>
                </div>
                <DeleteButton id={msg.id} action={deleteMessage} label="Delete" />
              </div>
              <p className="text-[14px] leading-[1.7] text-[#444] whitespace-pre-wrap">{msg.message}</p>
            </div>
          ))}
        </div>
      )}
    </main>
  )
}
