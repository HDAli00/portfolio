# Frontend Design Review — hdalidocs.dev

Reviewed: July 2026 · Scope: homepage, nav, writing index, shared components.
Goal stated by the owner: *clean, sophisticated, minimalist — but currently feels empty
and boring; dislikes the emoji-style glyphs and the lack of motion.*

The verdict in one line: **the site's problem isn't minimalism — it's that the minimalism
has no hierarchy, no motion choreography, and (with an empty database) no content.**
Minimal sites work when every remaining element is doing visible work. Right now most of
the page is idle whitespace.

---

## 1. Issues found (ordered by impact)

### Content & structure

1. **Empty states dominate the page.** With Supabase unseeded, the homepage renders
   "Articles coming soon / Projects coming soon / Nothing here yet" three times. That is
   the single biggest reason the page feels empty — no amount of styling fixes three
   apology strings in a row. Either seed real content, hardcode a fallback dataset in the
   repo, or hide sections that have no rows.
2. **Broken/dead UI.** `Nav` links to `/projects`, which doesn't exist as a route
   (`src/components/Nav.tsx:24`) — it should be `/#projects`. The search button
   (`Nav.tsx:32`) does nothing; dead controls read as unfinished, not minimal. Remove it
   or wire a command palette (⌘K) — the latter is a genuinely good "sophisticated" touch.
3. **Footer says © 2025** (`Footer.tsx:5`); it's 2026. Compute the year.

### The "emoji" problem

4. **Text glyphs used as icons** — `→` `↗` `✕` `☰` (`page.tsx:60,151`, `Nav.tsx:45`).
   These render with different metrics per OS/font, can't be animated independently, and
   read as placeholder. Replace with inline SVG (16px, `stroke-width:1.5`, `currentColor`)
   so arrows can slide on hover and the hamburger can animate into a cross.
5. **Hand-drawn brand "logos" in the marquee** (`TechMarquee.tsx`). The freehand Docker /
   AWS / Python approximations are the most emoji-feeling element on the page — they're
   recognizably *almost* the real marks, which reads as knock-off rather than minimal.
   Either use real marks (simple-icons) or go text-only with a separator dot — text-only
   is more in keeping with the editorial style (see Sample A).

### Motion

6. **No scroll choreography.** Everything below the fold is fully rendered on load. The
   two moving parts (typewriter, marquee) both sit above the fold, so the remaining 80%
   of the page is static. Add `IntersectionObserver`-driven reveals (opacity + 16–20px
   translate, ~600ms, ease-out) with a 60–90ms stagger on list rows. This one change is
   the cheapest "the site feels alive" win.
7. **Hover language is inconsistent and weak.** Highlights rows get the good treatment
   (background wash + left rule + arrow slide) while Articles/Projects/Contact rows get
   `hover:opacity-60` — fading an entire row is a dated pattern and reads as *less*
   feedback, not more. Unify on the Highlights language everywhere.
8. **No `prefers-reduced-motion` handling.** The marquee, typewriter, and cursor blink
   all run unconditionally (`globals.css:21–32,105–113`). Gate them — it's an
   accessibility requirement and a mark of a considered site.
9. **Missed micro-detail opportunities** (the "sophisticated" layer): a pulsing
   availability dot, a live local-time clock in the footer, animated link underlines in
   the nav, count-up stats. Each is one small moving part that rewards attention without
   adding clutter. Samples demonstrate all of these.

### Typography & hierarchy

10. **The scale is flat.** Section headings are 18px against 17px body
    (`page.tsx:58,92,132`) — a 1px difference does not create hierarchy; the hero h1 is
    the only large type on the page. Establish a real scale (e.g. 12 / 14 / 17 / 24 / 36 /
    52) and let section headings be headings.
11. **One typeface, one voice.** Everything is Inter. Sophistication in editorial
    minimalism usually comes from *one* contrast axis: a serif/italic display accent
    (Sample A/D) or an aggressive weight-and-size jump in the same face (Sample C).
    JetBrains Mono is already loaded via `prose-article` — it can be promoted to a
    deliberate second voice for eyebrows, dates, and metadata.

### Accessibility & polish

12. **Contrast failures.** `#999` on white is ~2.8:1 — below WCAG AA (4.5:1) for the
    13px dates, stack labels, and footer text set in it. Use ≥`#767676`, or keep the
    color and enlarge/bold the text only where it's decorative.
13. **No visible focus styles** in the app (the older `design-preview/highlights-index.html`
    has them; the React app doesn't). Add `:focus-visible` outlines globally.
14. **`px-12` (48px) horizontal padding at all breakpoints** (`page.tsx:29` et al.) —
    on a 375px phone that's 26% of the viewport gone. Use `px-5 sm:px-12` or
    `clamp(20px, 5vw, 48px)`.
15. **Hardcoded hex values everywhere.** `#111`, `#666`, `#999`, `#ececec` are repeated
    inline across every component. Define them once as CSS variables / Tailwind theme
    tokens — it makes a future dark mode (worth having for this audience) a token swap
    instead of a rewrite.

---

## 2. What's already good (keep it)

- The 850px single-column measure and hairline-rule section grammar — a solid skeleton.
- The Highlights row hover (wash + left accent + arrow slide) — the best interaction on
  the site; the fix is to promote it, not replace it.
- The typewriter greeting concept — personality without clutter (needs a reduced-motion
  gate and a fixed-height wrapper so it can't cause layout shift).
- The marquee *as a device* — it just needs honest content (text, not pseudo-logos).

---

## 3. The four sample directions

Self-contained HTML files in this folder — open them in a browser; all motion is live.
All four: no emoji glyphs (inline SVG only), scroll-reveal choreography with stagger,
consistent hover language, `prefers-reduced-motion` support, visible focus states,
WCAG-safe grays, populated demo content.

| Sample | File | Direction | Motion signature |
|---|---|---|---|
| **A — Quiet Editorial** | `sample-a-quiet-editorial.html` | Closest evolution of today's site: white, hairline rules, serif-italic accents (Newsreader), numbered sections, dot-grid hero texture | Word-by-word hero rise, staggered row reveals, background-sweep row hover, pulsing status dot, live footer clock |
| **B — Systems Dark** | `sample-b-systems-dark.html` | Platform-engineer identity: near-black, mono-first, terminal status board, phosphor green | Ambient node-graph canvas in hero, blinking prompt, LED pulses, lift-on-hover cards |
| **C — Swiss Grid** | `sample-c-swiss-grid.html` | International typographic style: oversized uppercase type, outlined ghost words, exposed rules, giant section indices | Line-by-line hero mask reveal, big-type marquee, rows invert to solid black on hover, scroll progress bar |
| **D — Warm Serif** | `sample-d-warm-serif.html` | Paper-warm background, Fraunces display serif, single deep-green accent, soft cards | Drifting gradient blobs, card lift + shadow, growing underline on article titles, magnetic-feeling buttons |

**Recommendation:** A as the base (it keeps everything you already like), stealing the
status board idea from B for the hero and the inverted-row hover from C for the contact
list. B is the strongest *brand* statement if you want the site to say "platform
engineer" before a single word is read; C is the boldest visually; D is the warmest and
most writer-ish.

---

## 4. Implementation order (if adopting Sample A into the Next.js app)

1. Seed/fallback content + fix `/projects` link, dead search, footer year. *(kills the emptiness)*
2. Replace glyphs with SVG icons; unify row hover on the Highlights pattern. *(kills the emoji feel)*
3. Add a `<Reveal>` client component (IntersectionObserver) and wrap sections/rows; gate all animation behind `prefers-reduced-motion`. *(kills the static feel)*
4. Type scale + serif accent via `next/font` (Newsreader italic); promote mono for metadata. *(adds the sophistication)*
5. Tokens for colors, `:focus-visible`, responsive padding, contrast fixes. *(polish + a11y)*

Each step is independently shippable.
