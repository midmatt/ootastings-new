import PlaceholderImage from "./PlaceholderImage";
import Reveal from "./Reveal";

/**
 * Meet Our Health Coach — Justin Blyden, between the mission block and the
 * video lounge.
 *
 * Deliberately short. The supplied bio ran to three long paragraphs plus a
 * "Connection to OOTastings" block that restated most of them, so the two are
 * merged here; the roles carry as chips rather than a bulleted column, and one
 * of the five Video Lounge lines stands as a pull quote instead of all five.
 *
 * The portrait sits in the Blob store under `coach/` rather than `atmosphere/`
 * so re-syncing the gallery selection cannot delete it.
 */
const PORTRAIT =
  "https://5mimhywtvsblan4k.public.blob.vercel-storage.com/coach/justin-blyden.jpg";

const ROLE = [
  "Health coaching sessions",
  "Wellness-forward tastings",
  "Video Lounge",
  "Corporate activations",
  "Creator & hotel partnerships",
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
                The Olive Oil Health Coach · Author of{" "}
                <span className="text-cream/80">Change Your Mode</span>
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
                  He leads each session with warmth and clarity, breaking down
                  the science, the sensory notes, and the wellness impact of
                  high-quality oils. Corporate hour, creator tasting or Video
                  Lounge, he helps people shift into a brighter,
                  Mediterranean-forward mode — one drizzle at a time.
                </p>
              </div>
            </Reveal>

            <Reveal delay={140}>
              <p className="border-terracotta-soft/50 text-cream/70 mt-7 border-l-2 pl-5 font-[family-name:var(--font-fraunces)] text-[1.0625rem] leading-snug italic">
                Shift your mode — Mediterranean style.
              </p>
            </Reveal>

            <Reveal delay={180}>
              <ul className="mt-8 flex flex-wrap gap-2.5">
                {ROLE.map((item) => (
                  <li
                    key={item}
                    className="border-cream/20 text-cream/70 rounded-full border px-3.5 py-1.5 text-[0.6875rem] font-semibold tracking-[0.1em] uppercase"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
