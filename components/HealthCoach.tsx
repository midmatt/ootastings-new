import PlaceholderImage from "./PlaceholderImage";
import Reveal from "./Reveal";

/**
 * Meet Our Health Coach — Justin Blyden, between the mission block and the
 * video lounge.
 *
 * The bio sits beside the portrait; the six offerings run full width beneath it
 * because each carries a sentence of copy and would crush into the narrower
 * column.
 *
 * The portrait sits in the Blob store under `coach/` rather than `atmosphere/`
 * so re-syncing the gallery selection cannot delete it.
 */
const PORTRAIT =
  "https://5mimhywtvsblan4k.public.blob.vercel-storage.com/coach/justin-blyden.jpg";

const OFFERINGS = [
  {
    title: "Health Coaching Sessions",
    copy: "Personalized, Mediterranean-forward coaching rooted in Justin’s Change Your Mode method — helping guests elevate energy, mindset, and daily wellness through simple, sustainable rituals.",
  },
  {
    title: "Wellness-Forward Tastings",
    copy: "Guided olive-oil experiences that blend flavor exploration with lifestyle coaching, teaching guests how EVOO can support digestion, inflammation balance, and overall vitality.",
  },
  {
    title: "Video Lounge",
    copy: "A creator-friendly space where Justin brings the Change Your Mode philosophy to life on camera — delivering bite-sized wellness insights, sensory education, and Mediterranean mindset shifts.",
  },
  {
    title: "Corporate Activations",
    copy: "Mediterranean-bright wellness programming designed for teams, leadership groups, and corporate culture initiatives — helping professionals Change Their Mode toward clarity, focus, and healthier daily rhythms.",
  },
  {
    title: "Creator & Hotel Partnerships",
    copy: "Collaborations that fuse hospitality, wellness, and storytelling — bringing the Change Your Mode lifestyle to boutique hotels, luxury resorts, and creator communities seeking elevated guest engagement.",
  },
  {
    title: "The Olive Oil Social Circuit",
    copy: "A signature blend of tasting, coaching, and Mediterranean lifestyle education — guiding guests toward a brighter, more intentional mode of living… one drizzle at a time.",
  },
];

export default function HealthCoach() {
  return (
    <section
      id="health-coach"
      className="bg-olive text-cream anchor-offset relative isolate overflow-hidden"
    >
      <div className="grain absolute inset-0" />

      <div className="section-pad shell relative">
        <div className="grid items-center gap-10 md:grid-cols-[minmax(0,36%)_1fr] md:gap-14 lg:gap-20">
          {/* ---------------- portrait ---------------- */}
          <Reveal>
            <div className="rounded-card shadow-lift relative aspect-[4/5] overflow-hidden">
              <PlaceholderImage
                src={PORTRAIT}
                alt="Justin Blyden speaking on stage, microphone in hand, in front of a screen reading Change Your Mode"
                fill
                sizes="(max-width: 768px) 92vw, 32vw"
                className="object-cover object-top"
              />
            </div>
          </Reveal>

          {/* ---------------- copy ---------------- */}
          <div>
            <Reveal>
              <p className="eyebrow text-terracotta-soft mb-5">
                Meet Our Health Coach
              </p>
              <h2 className="display text-[clamp(1.9rem,4.4vw,3.2rem)] uppercase">
                Justin Blyden
              </h2>
              <p className="text-cream/60 mt-3 font-[family-name:var(--font-fraunces)] text-[1.0625rem] italic">
                <span className="text-cream/80">Change Your Mode</span> — The
                Olive Oil Social Circuit Way
              </p>
            </Reveal>

            <Reveal delay={80}>
              <div className="text-cream/75 mt-7 space-y-4 text-[0.9375rem] leading-[1.7] sm:text-[1rem]">
                <p>
                  Justin is the wellness voice of the Olive Oil Social Circuit,
                  guiding guests through the flavor and lifestyle benefits of
                  Mediterranean olive-oil rituals — not just what they&apos;re
                  tasting, but how olive oil can lift their daily health, energy,
                  and mindset.
                </p>
                <p>
                  As the Author of Change Your Mode, Justin brings a
                  coaching-forward approach to every session, helping guests
                  reconnect with their bodies, reset their habits, and tap into
                  the vitality that Mediterranean living inspires. He leads with
                  warmth, clarity, and grounded expertise, breaking down the
                  science, the sensory notes, and the wellness impact of
                  high-quality oils.
                </p>
                <p>
                  Corporate hour, creator tasting, or Video Lounge — Justin
                  helps people Change Their Mode into a brighter, more
                  intentional, Mediterranean-forward way of living… one drizzle
                  at a time.
                </p>
              </div>
            </Reveal>
          </div>
        </div>

        {/* ---------------- six core offerings ---------------- */}
        <Reveal>
          <div className="border-cream/15 mt-20 border-t pt-14 md:mt-24">
            <p className="eyebrow text-terracotta-soft mb-4">
              Change Your Mode — Mediterranean Style
            </p>
            <h3 className="display text-[clamp(1.4rem,2.6vw,2rem)] uppercase">
              Six core offerings of the Olive Oil Social Circuit
            </h3>
          </div>
        </Reveal>

        <ul className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {OFFERINGS.map((item, i) => (
            <Reveal as="li" key={item.title} delay={(i % 3) * 90}>
              <div className="border-cream/15 border-t pt-5">
                <span className="display text-terracotta-soft text-[1.25rem] leading-none">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h4 className="text-cream mt-3 text-[0.75rem] font-semibold tracking-[0.14em] uppercase">
                  {item.title}
                </h4>
                <p className="text-cream/70 mt-2.5 text-[0.875rem] leading-[1.7]">
                  {item.copy}
                </p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
