import { cache } from 'react'
import { supabase } from './supabase'

export type SiteContentField = {
  key: string
  label: string
  group: string
  multiline?: boolean
  hint?: string
  default: string
}

// Every piece of fixed copy on the site, editable from /admin/site.
// The defaults below mirror what was previously hardcoded, so the site
// renders identically until a value is overridden in the database.
export const SITE_CONTENT_FIELDS: SiteContentField[] = [
  // Site & navigation
  { key: 'site_name', label: 'Site name (nav logo)', group: 'Site & navigation', default: 'Hassan Ali' },
  { key: 'site_title', label: 'Browser / SEO title', group: 'Site & navigation', default: 'Hassan Ali' },
  {
    key: 'site_description', label: 'SEO description', group: 'Site & navigation', multiline: true,
    default: 'Platform engineer, writer, design and architecture enthusiast.',
  },

  // Hero
  { key: 'greeting_prefix', label: 'Greeting prefix', group: 'Hero', default: "Hi, I'm " },
  {
    key: 'greeting_phrases', label: 'Typewriter phrases', group: 'Hero', multiline: true,
    hint: 'One phrase per line.',
    default: '/hassan\n/platform-engineer\n/writer\n/design-and-architecture-enthusiast',
  },
  {
    key: 'hero_heading', label: 'Hero heading', group: 'Hero', multiline: true,
    hint: 'Line breaks are kept.',
    default: 'I build platform infrastructure\nand write about engineering\nat scale.',
  },
  {
    key: 'hero_intro', label: 'Hero intro', group: 'Hero', multiline: true,
    default:
      'Platform engineer at Capgemini, based in the Netherlands. I work on observability, Kubernetes, cloud-native pipelines, and the infrastructure other engineers rely on — quietly, reliably, at scale.',
  },

  // Highlights section
  { key: 'highlights_eyebrow', label: 'Eyebrow label', group: 'Highlights section', default: 'Field notes' },
  {
    key: 'highlights_heading', label: 'Heading', group: 'Highlights section', multiline: true,
    default: 'What production taught me to hold as non-negotiable.',
  },
  {
    key: 'highlights_intro', label: 'Intro', group: 'Highlights section', multiline: true,
    default: 'A running index of hard-earned principles — each one has a scar behind it.',
  },

  // Articles section
  { key: 'articles_heading', label: 'Heading', group: 'Articles section', default: 'Latest Articles' },
  { key: 'articles_empty', label: 'Empty-state text', group: 'Articles section', default: 'Articles coming soon.' },

  // Projects section
  { key: 'projects_heading', label: 'Heading', group: 'Projects section', default: 'Projects' },
  { key: 'projects_empty', label: 'Empty-state text', group: 'Projects section', default: 'Projects coming soon.' },

  // Contact section
  { key: 'contact_heading', label: 'Heading', group: 'Contact section', default: 'Contact' },
  {
    key: 'contact_intro', label: 'Intro', group: 'Contact section', multiline: true,
    default: "Got a question, a project, or want to talk platform engineering? I'm reachable — pick your channel.",
  },
  { key: 'github_url', label: 'GitHub URL', group: 'Contact section', default: 'https://github.com/HDAli00' },
  { key: 'linkedin_url', label: 'LinkedIn URL', group: 'Contact section', default: 'https://linkedin.com/in/hdali' },
  { key: 'contact_email', label: 'Contact email', group: 'Contact section', default: 'hello@hdalidocs.dev' },

  // Writing page
  { key: 'writing_title', label: 'Page title', group: 'Writing page', default: 'Writing' },
  {
    key: 'writing_intro', label: 'Intro', group: 'Writing page', multiline: true,
    default: 'Long-form articles on platform engineering, observability, architecture, and systems design.',
  },
  {
    key: 'writing_meta_description', label: 'SEO description', group: 'Writing page', multiline: true,
    default: 'Articles on platform engineering, observability, architecture, and systems design.',
  },

  // Footer
  { key: 'footer_copyright', label: 'Copyright line', group: 'Footer', default: '© 2025 Hassan Ali' },
]

export type SiteContent = Record<string, string>

export const SITE_CONTENT_DEFAULTS: SiteContent = Object.fromEntries(
  SITE_CONTENT_FIELDS.map(f => [f.key, f.default])
)

// Deduped per render pass; pages using this stay ISR-cacheable.
export const getSiteContent = cache(async (): Promise<SiteContent> => {
  try {
    const { data, error } = await supabase.from('site_content').select('key, value')
    if (error || !data) return { ...SITE_CONTENT_DEFAULTS }
    const overrides = Object.fromEntries(
      data.filter(row => row.value !== '').map(row => [row.key, row.value])
    )
    return { ...SITE_CONTENT_DEFAULTS, ...overrides }
  } catch {
    return { ...SITE_CONTENT_DEFAULTS }
  }
})
