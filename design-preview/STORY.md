# The Story of the Page — narrative before pixels

## The premise

The current baseline (and all four earlier samples) still secretly behave like a CV:
lead with a job title, prove competence with counters ("6+ years", "40+ services"),
list outputs in reverse-chronological tables, end with contact. That structure answers
*"should we hire this person?"* — but that's not the question this site exists to answer.

The site is **a notebook, not a résumé**. Its real promise to a visitor is:

> "I think about infrastructure for a living, I write those thoughts down,
> and I build small things to test them. Here's the notebook. You're welcome to read
> over my shoulder — and to write back."

Everything on the page should be evidence of *thinking*, not evidence of *employment*.
That single reframe decides what stays, what goes, and what order things appear in.

## What gets cut from the baseline

- **The stat counters.** Numbers of years/services are CV proof. A notebook proves
  itself by its contents.
- **"Latest Articles" / "Projects" as section titles.** Those are database table names,
  not chapter titles. Sections get named for what they *mean*: thoughts, experiments.
- **The tech marquee as a skills badge-wall.** Tools are context, not identity. The
  stack shows up *inside* entries ("built with Go against real clusters"), not as a
  conveyor belt of logos.
- **"View all →" energy.** A notebook invites wandering, not pagination.

## The reader's journey — six chapters, one thread

A literal thread is stitched down the left margin of the page. It draws itself as you
scroll and knots at each chapter — the visual promise that this is *one* continuous
train of thought, not a stack of widgets.

**Ch. 0 — The desk (hero).**
Not "I am a platform engineer at X." Instead: *"This is where I think out loud."*
One warm sentence about who's writing, and a live, rotating "right now I'm chewing
on…" phrase — the page opens mid-thought, the way a notebook does. The job title is
demoted to marginalia where it belongs.

**Ch. 1 — Field notes (the deck).**
The heart of the site and the first thing after the intro — *principles before
outputs*, because convictions are the most personal thing an engineer can publish.
Presented as a small stack of ruled index cards that shuffle — a slide deck you can
flip by hand or let riffle on its own. Each card: one scar, one sentence, one story
behind it.

**Ch. 2 — Thoughts, written down (essays).**
The long-form writing, styled as journal entries: date in the margin, serif first
line, one honest sentence of what the piece actually argues. No "read more" buttons —
the title is the invitation.

**Ch. 3 — Built to find out (experiments).**
Projects reframed as questions. Not "drift-watch — Go, K8s" but *"Could config drift
open its own pull request?"* — name and stack become the footnote to the curiosity
that caused the project. This is the strongest anti-CV move on the page: outputs
presented as evidence of wondering.

**Ch. 4 — In the margin (currently).**
A short interlude, not a section: reading / building / wondering. Three fragments
that date the notebook and make it feel alive *today*.

**Ch. 5 — Write back (contact).**
Contact reframed as an exchange between readers: *"The margins are open."* Channels
listed like correspondence options, with a promise of reply.

## The mood — paper by day, lamplight by night

- **Day:** warm note-paper (#f6f1e7), iron-gall ink, one vermilion accent — the red
  margin rule of an index card.
- **Night:** the same desk under a lamp — deep umber paper, cream ink, the vermilion
  warmed to amber. Not "dark mode" as inversion; *the same room, later*.
- The **sun/moon toggle** morphs (rays retract, a shadow slides across the disc) and
  the whole palette cross-fades — the one theatrical moment on the page, and it's
  earned because it *is* the metaphor.

## Motion as narrative (not decoration)

Every moving part has a story job:

| Element | Motion | Narrative job |
|---|---|---|
| Margin thread | Draws with scroll, knots at chapters | "One continuous line of thought" |
| Hero phrase | Rotating "chewing on…" with blur-morph | The notebook is open mid-thought |
| Field-note deck | Index cards shuffle/morph, auto-riffle, manual flip | Notes are handled, not archived |
| Ink blot | Slow border-radius morph behind hero | The page breathes; ink is wet |
| Essay titles | Underline draws itself on hover | A pen stroke, not a hyperlink |
| Sun/moon | SVG morph + full palette cross-fade | Same desk, different hour |
| Footer clock | Live Amsterdam time | Someone is actually here |

All gated behind `prefers-reduced-motion`; the deck degrades to manual-only flipping.

## What this implies for the data model (later, when we build it)

The existing Supabase tables already fit the story — they just need reframing fields:
- `highlights` → the deck (already has type/topic/title/blurb/meta — perfect card anatomy)
- `articles` → thoughts (add an optional `argument` one-liner distinct from SEO description)
- `projects` → experiments (add a `question` field — the "could X…?" hook; stack stays as footnote)
- new tiny `now` table (or a hardcoded array) → reading / building / wondering

Sample implementation: `sample-e-ink-and-paper.html` in this folder.
