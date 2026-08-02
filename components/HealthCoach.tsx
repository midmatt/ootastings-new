import PlaceholderImage from "./PlaceholderImage";
import Reveal from "./Reveal";

/**
 * Meet Our Health Coach — Justin Blyden, between the mission block and the
 * video lounge.
 *
 * The portrait sits in the Blob store under `coach/` rather than `atmosphere/`
 * so re-syncing the gallery selection cannot delete it.
 */
const PORTRAIT =
  "https://5mimhywtvsblan4k.public.blob.vercel-storage.com/coach/justin-blyden.jpg";

const ROLE = [
  "Lead Olive Oil Health Coaching Sessions",
  "Host wellness-forward tastings",
  "Appear in the OOTastings Video Lounge",
  "Guide corporate wellness activations",
  "Provide Mediterranean lifestyle insights",
  "Support creator and hotel partnerships",
  "Introduce the health benefits of premium olive oils",
];

const LOUNGE_LINES = [
  "Justin Blyden breaks down the wellness magic behind green gold.",
  "Shift your mode — Mediterranean style.",
  "Your olive oil health coach explains the drizzle difference.",
  "Justin's wellness-forward tasting moment.",
  "Change Your Mode meets the Olive Oil Social Circuit.",
];

export default function HealthCoach() {
  return (
    <section
      id="health-coach"
      className="bg-olive text-cream anchor-offset relative isolate overflow-hidden"
    >
      <div className="grain absolute inset-0" />

      <div className="section-pad shell relative">
        <div className="grid gap-12 md:grid-cols-[minmax(0,38%)_1fr] md:gap-16 lg:gap-20">
          {/* ---------------- portrait ---------------- */}
          <Reveal className="md:sticky md:top-28 md:self-start">
            <div className="rounded-card shadow-lift relative aspect-[4/5] overflow-hidden md:aspect-[3/4]">
              <PlaceholderImage
                src={PORTRAIT}
                alt="Justin Blyden speaking on stage, microphone in hand, in front of a screen reading Change Your Mode"
                fill
                sizes="(max-width: 768px) 92vw, 34vw"
                className="object-cover object-top"
              />
            </div>
            <p className="text-cream/45 mt-4 text-[0.6875rem] font-semibold tracking-[0.16em] uppercase">
              Author of <span className="italic">Change Your Mode</span>
            </p>
          </Reveal>

          {/* ---------------- copy ---------------- */}
          <div>
            <Reveal>
              <p className="eyebrow text-terracotta-soft mb-5">
                Meet Our Health Coach
              </p>
              <h2 className="display text-[clamp(1.9rem,4.4vw,3.4rem)] uppercase">
                Justin Blyden
              </h2>
              <p className="text-cream/60 mt-3 font-[family-name:var(--font-fraunces)] text-[1.0625rem] italic">
                The Olive Oil Health Coach
              </p>
            </Reveal>

            <Reveal delay={80}>
              <div className="text-cream/75 mt-8 space-y-5 text-[0.9375rem] leading-[1.75] sm:text-[1rem]">
                <p>
                  Justin Blyden is the official Olive Oil Health Coach for
                  OOTastings.com, guiding guests through the wellness, flavor,
                  and lifestyle benefits of Mediterranean olive-oil rituals. As
                  the author of{" "}
                  <span className="text-cream italic">Change Your Mode</span>,
                  Justin brings a transformation-driven approach to every
                  tasting, helping guests understand not just what they&apos;re
                  tasting — but how olive oil can elevate their daily health,
                  energy, and mindset.
                </p>
                <p>
                  With a signature blend of warmth, clarity, and coaching
                  expertise, Justin leads each session with intention. He breaks
                  down the science, the sensory notes, and the wellness impact of
                  high-quality olive oils, turning every tasting into a moment of
                  education, empowerment, and connection.
                </p>
                <p>
                  Whether he&apos;s hosting a corporate Drizzle &amp; Deal hour,
                  guiding a creator tasting, or welcoming guests inside the
                  OOTastings Video Lounge, Justin helps people shift into a
                  brighter, Mediterranean-forward mode — one drizzle at a time.
                </p>
              </div>
            </Reveal>

            {/* ---------- connection ---------- */}
            <Reveal delay={120}>
              <div className="border-cream/12 mt-12 border-t pt-10">
                <h3 className="text-cream text-[0.75rem] font-semibold tracking-[0.16em] uppercase">
                  Connection to OOTastings
                </h3>
                <div className="text-cream/75 mt-5 space-y-5 text-[0.9375rem] leading-[1.75]">
                  <p>
                    Justin joins OOTastings.com as the wellness voice of the
                    Olive Oil Social Circuit. His coaching philosophy aligns
                    perfectly with the Mediterranean lifestyle at the heart of
                    our tastings: balance, brightness, intentionality, and
                    connection.
                  </p>
                  <p>
                    His book{" "}
                    <span className="text-cream italic">Change Your Mode</span>{" "}
                    inspires guests to rethink their habits, their energy, and
                    their daily rituals — making olive oil not just a flavor, but
                    a lifestyle upgrade.
                  </p>
                </div>
              </div>
            </Reveal>

            {/* ---------- role ---------- */}
            <Reveal delay={160}>
              <div className="border-cream/12 mt-10 border-t pt-10">
                <h3 className="text-cream text-[0.75rem] font-semibold tracking-[0.16em] uppercase">
                  Justin&apos;s Role
                </h3>
                <ul className="text-cream/75 mt-5 grid gap-x-10 gap-y-3 text-[0.9375rem] leading-relaxed sm:grid-cols-2">
                  {ROLE.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span
                        aria-hidden="true"
                        className="bg-terracotta-soft mt-2.5 h-1 w-1 shrink-0 rounded-full"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            {/* ---------- video lounge lines ---------- */}
            <Reveal delay={200}>
              <div className="border-cream/12 mt-10 border-t pt-10">
                <h3 className="text-cream text-[0.75rem] font-semibold tracking-[0.16em] uppercase">
                  In the Video Lounge
                </h3>
                <ul className="mt-5 space-y-3">
                  {LOUNGE_LINES.map((line) => (
                    <li
                      key={line}
                      className="border-terracotta-soft/40 text-cream/70 border-l-2 pl-4 font-[family-name:var(--font-fraunces)] text-[0.9375rem] leading-relaxed italic"
                    >
                      {line}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
