Add a new section to the portfolio homepage (`src/app/page.tsx`).

## Steps

1. **Ask** what section to add if not provided (e.g. "Timeline", "Open Source", "Speaking", "Testimonials", "Uses").

2. **Read** `src/app/page.tsx` and `src/app/globals.css` to understand the existing layout.

3. **Visual rules** to follow exactly:
   - Outer container: `<div className="max-w-[850px] mx-auto px-12 pt-16 pb-16">`
   - Divider before the section: `<hr className="max-w-[850px] mx-auto border-t border-[#ececec]" />`
   - Section heading: `text-[18px] font-semibold tracking-[-0.02em] mb-9`
   - Body text: `text-[17px] leading-[1.75] text-[#666]`
   - Colour palette: `#111` primary, `#666` secondary, `#999` tertiary, `#ececec` borders
   - No Tailwind colours outside this palette — no blues, purples, greens in layout elements

4. **If the section needs Supabase data**:
   a. Create the table/column via `mcp__ecba3a11*__execute_sql` (use `IF NOT EXISTS`)
   b. Add a typed fetch function to `src/lib/data.ts` that returns an empty fallback on error
   c. Add unit tests for the new function in `src/__tests__/lib/data.test.ts`

5. **Insert** the JSX block into `page.tsx` at the correct position.

6. **Commit** to the current active branch (`fix/vercel-build` or `main`).
