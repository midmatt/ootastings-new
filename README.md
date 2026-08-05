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

## SEO

Metadata is centralised. `lib/seo.ts` holds the canonical origin, share image
and the business facts that feed structured data; `lib/schema.ts` builds the
JSON-LD. Per-page titles and descriptions live in each route's `metadata`
export, and the root layout supplies the `%s | OOT Tastings` title template plus
the shared Open Graph and Twitter defaults.

- `app/robots.ts` -> `/robots.txt` (allows everything except `/api/`).
- `app/sitemap.ts` -> `/sitemap.xml`. Only `/` and `/legal` exist; the nav's
  `#mission`, `#featured` etc. are in-page anchors, not routes, and fragments do
  not belong in a sitemap. Add entries as real routes land.
- `public/og-default.png` is a generated 1200x630 brand card. Swap it for
  photography once real assets are licensed.

**Schema choice:** `Organization` + `Service`, deliberately *not*
`LocalBusiness`. The tastings are delivered at the client's venue and the
business has no premises the public visits, so there is no address to publish —
`Service.areaServed` carries the geography instead. Do not "upgrade" this to
LocalBusiness/Restaurant without a real, confirmed address; fabricating one
breaks Google's structured-data policy.

**Canonical domain:** `https://www.ootastings.com` — **www, not the apex.**
Verified against the live site: `www.ootastings.com` returns 200 with no
redirects, while `ootastings.com` returns a 308 to it. Canonical tags, sitemap
`<loc>` values and the robots `Host:` must all name the final URL rather than
one that redirects, so they derive from `SITE_URL` in `lib/seo.ts`.

If the Vercel redirect is ever flipped to prefer the apex, change that one
constant and everything follows. The apex -> www redirect itself is a Vercel
**Domains** setting, not an in-app one — adding it to `next.config.ts` as well
risks a redirect loop.

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
with the copy on the left and a bottle-and-glass scene on the right. The bottle
tips into its pour angle, a curved stream leaves the spout into the glass, the
glass fills, and the copy settles alongside it.

The sequence **plays itself once when the section scrolls into view** — it is
not tied to scroll position. The section is an ordinary-height block: it never
pins, never holds the page, and the reader does not have to keep scrolling to
drive the animation.

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
- Timing over the `DURATION` (2200 ms): tilt 0–16%, stream 13–44%, fill 24–60%,
  copy staggered from 30% and settled by 88%. `TRIGGER_RATIO` is how much of the
  section must be on screen before it starts.

Behaviour and performance:

- An IntersectionObserver starts one rAF loop, which stops the moment the
  animation completes — nothing runs while the page is idle, and the observer
  disconnects after the first trigger so the pour reads as a finished action
  rather than a loop.
- Values go straight to element styles/attributes via refs, so React never
  re-renders while it plays; only transforms, opacity and one SVG `rotate`
  change.
- `prefers-reduced-motion: reduce` and no-JS both get the finished frame —
  bottle tilted, glass full, copy visible — with no observer and no rAF. The
  inline SVG defaults *are* the end state, so the static case needs nothing to
  run.

## Quote requests (Resend)

The package section at the foot of the page posts to `app/api/inquiry/route.ts`,
which formats the form fields plus the selected package and emails them via
[Resend](https://resend.com).

**This does not send until two things are set up:**

1. A Resend account (free tier is enough) and an API key in `.env.local`:
   ```
   RESEND_API_KEY=re_your_key_here
   ```
   Copy `.env.example` as a starting point. The key is never committed.
2. A real recipient in `TO_ADDRESS` in the route — it currently reads
   `TODO_CLIENT_EMAIL@example.com`.

Until then the route returns a 503 and the form shows a clear error with a
mailto fallback; it never reports a false success. `FROM_ADDRESS` uses Resend's
`onboarding@resend.dev` sender, which works immediately for testing — swap it
for an address on a domain verified in Resend before launch.

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

- "Book a Tasting" / "Reserve Your Tasting" point at `#book`, the package and
  quote-request section. That is the intended destination now, not a stub.
- Quote request form is wired to Resend but needs an API key and the client's
  real recipient address (see above).
- Nav links and footer links point at in-page anchors — they become real routes
  when `/tastings`, `/our-story`, `/private-events`, `/visit` are built.
- Social links point at instagram.com / facebook.com placeholders.
