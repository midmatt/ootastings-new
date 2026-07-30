# OOT Tastings — Home page (UI pass)

Next.js (App Router) + TypeScript + Tailwind CSS v4. This pass is **UI only**:
look, feel, layout and polish for the client preview. No booking, auth, CMS or
payment logic is wired up.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
```

## Deployment

Live at https://ootastings-new.vercel.app (Vercel, deploys from `main`).

`vercel.json` pins `"framework": "nextjs"`. Keep it: the project was created
with the Framework Preset set to **Other**, which made Vercel publish the
`public/` folder as a static site — every asset resolved but `/` returned 404,
because no Next.js route was ever deployed. Settings in `vercel.json` override
the dashboard, so the preset can't drift back.

Requires Next 16 (`next lint` no longer exists in 16, so there is no lint
script). If a local build fails with `Cannot find module for page: /_not-found`,
`node_modules` is stale from an older Next — `rm -rf node_modules .next && npm
install` clears it.

## Brand system

Tokens live in `app/globals.css` under `@theme` — use the Tailwind classes, not
raw hex values.

| Token          | Value     | Used for                                   |
| -------------- | --------- | ------------------------------------------ |
| `olive`        | `#374515` | sampled from the logo — full-bleed blocks  |
| `olive-deep`   | `#232d0d` | footer, image gradients                    |
| `cream`        | `#f5f0e4` | sampled from the logo — base background    |
| `linen`        | `#ece5d3` | second cream tone (Instagram strip, cards) |
| `terracotta`   | `#c06b3c` | CTA buttons, eyebrows, accent rules        |
| `ink`          | `#241f14` | body copy                                  |

Type: **Fraunces** (display + italic pull-quotes) and **Work Sans** (body), both
loaded via `next/font/google`.

Logo: `public/logo-olive.png` and `public/logo-cream.png` — both generated from
the supplied `ootastings logo.png` with the cream background knocked out, so the
mark sits cleanly on light and dark blocks. No other logo is used anywhere.

## Page structure

`app/page.tsx` composes, in order: Header → Hero → PourMission →
FeaturedTastings → ExperienceGrid → Testimonial → AtmosphereCollage →
InstagramStrip → BrandStatement → EmailCapture → Footer. Backgrounds alternate
cream / olive down the page.

## Navigation

Single page for now, so every nav item is a plain `<a href="#...">`. Plain
anchors (not `next/link`) keep the browser's native fragment jump, which is what
makes `scroll-behavior: smooth` and per-section `scroll-margin-top` work. The
`.anchor-offset` utility in `globals.css` sets that margin to
`clamp(5.5rem, 8vw, 7rem)` so headings clear the sticky header.

| Nav item        | Anchor            | Lands on                              |
| --------------- | ----------------- | ------------------------------------- |
| Tastings        | `#tastings`       | Tasting Experience card grid          |
| Our Story       | `#story`          | Brand statement block                 |
| Private Events  | `#private-events` | Footer private events block           |
| Visit Us        | `#visit`          | Footer visit block                    |
| Book a Tasting  | `#book`           | Tasting Club / booking strip          |

No `/book` route exists yet, so the header CTA lands on the booking strip —
swap `BOOK_HREF` in `components/Header.tsx` for the real route when it's built.
Private Events and Visit Us are footer blocks (there are no dedicated sections
yet); both sit at the page bottom, so the two links land on the same screen with
their own block in view. Point them at real pages once those exist. The mobile
drawer closes on tap and releases the body scroll lock.

## The pour section (`components/PourMission.tsx`)

The mission section and the pour animation are one thing: a two-column layout
with the copy on the left and a bottle-and-glass scene on the right. Scrolling
into it tips the bottle into its pour angle, sends a curved stream from the
spout into the glass, fills the glass, and settles — then holds. Scroll-linked,
never scroll-jacked; the page scrolls at its normal speed while the scene is
sticky in frame. Copy and graphic never overlap at any width.

Scene notes:

- The bottle pivots on its own **spout tip**, so the stream's origin is fixed no
  matter where the tilt is in its swing — it starts tipped back at -70° and
  rotates to -115° (`POUR_ANGLE` / `TILT_SWING`).
- The stream is a cubic curve leaving the spout along the neck's axis and
  straightening under gravity into the glass, revealed by a translating clip
  rect (transform only, no `stroke-dashoffset` repaint).
- Liquid is olive-gold (`#ADA54B → #63752F`) with a lighter surface, a surface
  highlight and an elongated sheen down the body — the cues that read oil rather
  than water. Bottle and glass are thin-line olive at the same stroke weight.
- Timing: tilt 0–10% of the sequence, stream 7–26%, fill 15–44%, copy staggered
  from 18% and fully settled by 70%. The sequence starts while the section is
  still scrolling in (`ENTRY_LEAD`, 60% of a viewport) rather than waiting for
  the sticky pin — otherwise a whole screen of scroll passes before the bottle
  moves. At 1440x900 that means the bottle is tilted by ~120px of scroll and the
  glass is full by ~500px, landing right as the section settles into place and
  leaving the pinned remainder as a calm beat.

Behaviour and performance:

- Progress comes from the section's position in the viewport, read in a passive
  scroll listener coalesced into one `requestAnimationFrame` per frame. Values
  go straight to element styles/attributes via refs, so React never re-renders
  during scroll; only transforms, opacity and one SVG `rotate` change.
  Measured at 1440×900: 16.7 ms average frame, 17.7 ms worst — locked 60 fps.
- **Touch devices, viewports under 768px, `prefers-reduced-motion: reduce`, and
  no-JS** all get the finished frame — bottle tilted, glass full, copy visible,
  graphic stacked above the text on mobile — with no scroll listener attached.
  The inline SVG defaults *are* the end state, so the static case needs nothing
  to run.
- The section itself must not carry `overflow-hidden`: that would make it a
  scroll container and silently break the sticky scene inside it.

## Placeholders — running list for client follow-up

Everything below is filler and must be replaced before launch.

**Photography** — all images are Unsplash placeholders defined in one place,
`lib/placeholders.ts`. Every rendered `<img>` carries `data-placeholder="true"`,
so they can also be found in the DOM:

```bash
grep -rn "data-placeholder" .    # or search the rendered page
```

**Copy marked `TODO: client copy needed` in source:**

- Hero eyebrow — real location line (currently "Guided Olive Oil Tastings").
- Mission strip supporting sentence.
- Testimonial quote + attribution ("Sofia R.") — needs a real, permissioned
  guest quote and photo.
- Atmosphere collage intro line — real location / directions.
- Brand statement philosophy paragraph.
- Tasting names, durations and one-liners in `lib/placeholders.ts`.

**Not wired up (UI only):**

- "Book a Tasting" / "Reserve Your Tasting" point at the in-page `#book`
  anchor. Route these to the real booking tool once it's chosen.
- Tasting Club email form validates and shows a confirmation state, but does not
  submit anywhere.
- Nav links and footer links point at in-page anchors — they become real routes
  when `/tastings`, `/our-story`, `/private-events`, `/visit` are built.
- Social links point at instagram.com / facebook.com placeholders.
