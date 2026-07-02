This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Admin portal

Every piece of content on the site — articles, projects, highlights/principles, and all fixed copy (titles, headings, intros, contact links, footer) — is editable from the admin portal at **`/admin`**. It ships with the app, so deploying `main` deploys the portal too; no extra infrastructure is needed.

### One-time setup

1. **Run the migration** — open the Supabase SQL editor and run `supabase/admin.sql` (after `supabase/schema.sql` if the base tables don't exist yet). It creates the `site_content` table and grants signed-in users write access to all content tables.
2. **Create your admin user** — in Supabase → Authentication → Users, click "Add user" and set your email + password.
3. **Disable public sign-ups** — in Supabase → Authentication → Sign In / Up, turn off new user sign-ups so nobody else can create an account. (Row Level Security grants write access to any authenticated user, so this step is what makes the portal yours alone.)

The app only needs the two env vars already in `.env.example` (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`) — set them in Vercel for production.

### Using it

Visit `/admin`, sign in, and edit:

- **Articles** — write, edit, publish/unpublish, and delete articles (content is HTML).
- **Projects** — name, description, stack, GitHub link, ordering.
- **Highlights** — the principles/field-notes index on the homepage.
- **Site copy** — every fixed string: hero heading and typewriter phrases, section headings, contact links, writing-page intro, footer, and SEO titles/descriptions.

Public pages are cached (ISR); saving in the admin revalidates them, so changes go live within seconds.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
