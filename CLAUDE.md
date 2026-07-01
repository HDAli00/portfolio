# Hassan Ali Portfolio

Next.js 16 App Router portfolio with a Supabase backend, deployed on Vercel.

## Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16.2.9, React 19, TypeScript 5 (strict) |
| Styling | Tailwind CSS v4 |
| Database | Supabase (PostgreSQL + RLS) |
| Testing | Vitest + @testing-library/react |
| CI/CD | GitHub Actions → Vercel |

## Key Files

| Path | Purpose |
|---|---|
| `src/app/page.tsx` | Homepage: hero, marquee, articles, projects, contact |
| `src/app/writing/page.tsx` | Article list |
| `src/app/writing/[slug]/page.tsx` | Article detail (`return notFound()` pattern) |
| `src/components/Footer.tsx` | Footer with links |
| `src/components/Nav.tsx` | Sticky nav with mobile toggle (`'use client'`) |
| `src/components/TechMarquee.tsx` | Infinite-scroll tech logo strip |
| `src/components/TypewriterGreeting.tsx` | Typewriter effect (`'use client'`) |
| `src/lib/supabase.ts` | Supabase client with 5-second `AbortController` timeout |
| `src/lib/data.ts` | Data-fetch functions — always return empty fallback, never throw |
| `src/__tests__/` | Unit tests |
| `.github/workflows/test.yml` | CI: runs tests on every PR and push |
| `next.config.ts` | `eslint.ignoreDuringBuilds: true` (ESLint 9 flat-config workaround) |

## Commands

```bash
npm run dev        # start dev server (Turbopack)
npm test           # run unit tests once
npm run test:watch # watch mode
npm run build      # production build
```

## Supabase

- **Project ID**: `ljgohthtldcazbyzumep`
- **URL**: `https://ljgohthtldcazbyzumep.supabase.co`
- **Tables**:
  - `articles` — `id, slug, title, description, content (html), published_at, published`
  - `projects` — `id, name, description, stack (text[]), github_url, sort_order`
- RLS is ON; the anon key grants read access to published rows only.

## Deployment

- **Production**: `main` branch → Vercel auto-deploy
- **Preview**: any branch → Vercel preview URL
- **Env vars required** in Vercel: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- **Current fix branch**: `fix/vercel-build`

## Conventions

- Server Components by default; `'use client'` only when hooks are needed.
- All data functions catch errors and return `[]` / `null` — never propagate to the client.
- `notFound()` must be `return notFound()` so TypeScript narrows the type below.
- No comments unless the WHY is non-obvious.
- ISR revalidation is set to `3600` seconds (1 hour) on all data-fetching pages.
