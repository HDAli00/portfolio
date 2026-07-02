'use client'

export default function DeleteButton({
  id,
  action,
  label = 'Delete',
}: {
  id: string
  action: (formData: FormData) => void
  label?: string
}) {
  return (
    <form
      action={action}
      onSubmit={e => {
        if (!confirm('Delete this item? This cannot be undone.')) e.preventDefault()
      }}
    >
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        className="text-[13px] text-[#c0392b] border border-[#f2d7d2] rounded-[6px] px-4 py-2 hover:bg-[#fdf6f5] transition-colors cursor-pointer"
      >
        {label}
      </button>
    </form>
  )
}
