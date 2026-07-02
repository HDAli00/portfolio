'use client'

import { useState } from 'react'
import { EditorContent, useEditor, useEditorState, type Editor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

type ToolbarState = {
  bold: boolean
  italic: boolean
  underline: boolean
  strike: boolean
  code: boolean
  h2: boolean
  h3: boolean
  paragraph: boolean
  bulletList: boolean
  orderedList: boolean
  blockquote: boolean
  codeBlock: boolean
  link: boolean
  canUndo: boolean
  canRedo: boolean
}

function ToolbarButton({
  onClick,
  active,
  disabled,
  title,
  children,
}: {
  onClick: () => void
  active?: boolean
  disabled?: boolean
  title: string
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      title={title}
      disabled={disabled}
      onMouseDown={e => e.preventDefault()}
      onClick={onClick}
      className={`h-8 min-w-8 px-1.5 inline-flex items-center justify-center rounded-[5px] text-[13px] transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-default ${
        active ? 'bg-[#111] text-white' : 'text-[#444] hover:bg-[#f0f0f0] hover:text-[#111]'
      }`}
    >
      {children}
    </button>
  )
}

function Divider() {
  return <span className="w-px h-5 bg-[#ececec] mx-1" />
}

const icon = (d: string) => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
)

const ICONS = {
  bulletList: icon('M8 6h13M8 12h13M8 18h13M3.5 6h.01M3.5 12h.01M3.5 18h.01'),
  orderedList: icon('M10 6h11M10 12h11M10 18h11M4 6h1v4M4 10h2M6 18H4c0-1 2-2 2-3s-1-1.5-2-1'),
  blockquote: icon('M6 10c-1.5 0-2.5 1-2.5 2.5S4.5 15 6 15c2 0 2.5-2 2.5-4C8.5 8 7 6.5 5 6.5M15 10c-1.5 0-2.5 1-2.5 2.5S13.5 15 15 15c2 0 2.5-2 2.5-4 0-3-1.5-4.5-3.5-4.5'),
  codeBlock: icon('M16 18l6-6-6-6M8 6l-6 6 6 6'),
  link: icon('M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7'),
  hr: icon('M4 12h16'),
  undo: icon('M3 7v6h6M3 13a9 9 0 1 0 3-7.5'),
  redo: icon('M21 7v6h-15M21 13a9 9 0 1 1-3-7.5'),
}

function Toolbar({ editor }: { editor: Editor }) {
  const state = useEditorState<ToolbarState>({
    editor,
    selector: ({ editor: e }) => ({
      bold: e.isActive('bold'),
      italic: e.isActive('italic'),
      underline: e.isActive('underline'),
      strike: e.isActive('strike'),
      code: e.isActive('code'),
      h2: e.isActive('heading', { level: 2 }),
      h3: e.isActive('heading', { level: 3 }),
      paragraph: e.isActive('paragraph'),
      bulletList: e.isActive('bulletList'),
      orderedList: e.isActive('orderedList'),
      blockquote: e.isActive('blockquote'),
      codeBlock: e.isActive('codeBlock'),
      link: e.isActive('link'),
      canUndo: e.can().undo(),
      canRedo: e.can().redo(),
    }),
  })

  const setLink = () => {
    const previous = editor.getAttributes('link').href as string | undefined
    const url = window.prompt('Link URL', previous ?? 'https://')
    if (url === null) return
    if (url === '' || url === 'https://') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run()
      return
    }
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
  }

  return (
    <div className="flex flex-wrap items-center gap-0.5 px-2 py-1.5 border-b border-[#ececec] bg-[#fafafa] rounded-t-[6px]">
      <ToolbarButton title="Paragraph" active={state.paragraph && !state.bulletList && !state.orderedList && !state.blockquote} onClick={() => editor.chain().focus().setParagraph().run()}>
        <span className="text-[12px]">Text</span>
      </ToolbarButton>
      <ToolbarButton title="Heading 2" active={state.h2} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>
        <span className="text-[12px] font-semibold">H2</span>
      </ToolbarButton>
      <ToolbarButton title="Heading 3" active={state.h3} onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}>
        <span className="text-[12px] font-semibold">H3</span>
      </ToolbarButton>

      <Divider />

      <ToolbarButton title="Bold (Ctrl+B)" active={state.bold} onClick={() => editor.chain().focus().toggleBold().run()}>
        <span className="font-bold">B</span>
      </ToolbarButton>
      <ToolbarButton title="Italic (Ctrl+I)" active={state.italic} onClick={() => editor.chain().focus().toggleItalic().run()}>
        <span className="italic font-serif">I</span>
      </ToolbarButton>
      <ToolbarButton title="Underline (Ctrl+U)" active={state.underline} onClick={() => editor.chain().focus().toggleUnderline().run()}>
        <span className="underline underline-offset-2">U</span>
      </ToolbarButton>
      <ToolbarButton title="Strikethrough" active={state.strike} onClick={() => editor.chain().focus().toggleStrike().run()}>
        <span className="line-through">S</span>
      </ToolbarButton>
      <ToolbarButton title="Inline code" active={state.code} onClick={() => editor.chain().focus().toggleCode().run()}>
        <span className="font-mono text-[12px]">{'<>'}</span>
      </ToolbarButton>

      <Divider />

      <ToolbarButton title="Bullet list" active={state.bulletList} onClick={() => editor.chain().focus().toggleBulletList().run()}>
        {ICONS.bulletList}
      </ToolbarButton>
      <ToolbarButton title="Numbered list" active={state.orderedList} onClick={() => editor.chain().focus().toggleOrderedList().run()}>
        {ICONS.orderedList}
      </ToolbarButton>
      <ToolbarButton title="Quote" active={state.blockquote} onClick={() => editor.chain().focus().toggleBlockquote().run()}>
        {ICONS.blockquote}
      </ToolbarButton>
      <ToolbarButton title="Code block" active={state.codeBlock} onClick={() => editor.chain().focus().toggleCodeBlock().run()}>
        {ICONS.codeBlock}
      </ToolbarButton>
      <ToolbarButton title="Link" active={state.link} onClick={setLink}>
        {ICONS.link}
      </ToolbarButton>
      <ToolbarButton title="Divider line" onClick={() => editor.chain().focus().setHorizontalRule().run()}>
        {ICONS.hr}
      </ToolbarButton>

      <Divider />

      <ToolbarButton title="Undo (Ctrl+Z)" disabled={!state.canUndo} onClick={() => editor.chain().focus().undo().run()}>
        {ICONS.undo}
      </ToolbarButton>
      <ToolbarButton title="Redo (Ctrl+Shift+Z)" disabled={!state.canRedo} onClick={() => editor.chain().focus().redo().run()}>
        {ICONS.redo}
      </ToolbarButton>
    </div>
  )
}

export default function RichTextEditor({
  name,
  initialHTML = '',
}: {
  name: string
  initialHTML?: string
}) {
  const [html, setHtml] = useState(initialHTML)

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3] },
        link: { openOnClick: false },
      }),
    ],
    content: initialHTML,
    editorProps: {
      attributes: { class: 'prose-article rte-content' },
    },
    immediatelyRender: false,
    onUpdate: ({ editor: e }) => setHtml(e.isEmpty ? '' : e.getHTML()),
  })

  return (
    <div className="rte border border-[#e3e3e3] rounded-[6px] bg-white focus-within:border-[#111] transition-colors">
      <input type="hidden" name={name} value={html} />
      {editor && <Toolbar editor={editor} />}
      <EditorContent editor={editor} />
    </div>
  )
}
