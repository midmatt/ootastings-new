"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import PlaceholderImage from "./PlaceholderImage";
import { featuredTastings } from "@/lib/placeholders";

/**
 * Featured Tasting Flights — a three-card coverflow.
 *
 * One card holds the centre at full size; the other two sit behind it on either
 * side, smaller and faded. Arrows, a swipe, a click on a side card, the dots,
 * or the arrow keys rotate the ring, which loops forever rather than
 * dead-ending.
 *
 * Rotation is index-based (modulo), so nothing is duplicated or re-mounted:
 * each card just gets a new slot and animates there on transform and opacity
 * only. With three cards, one of them has to cross from the far left slot to
 * the far right (or back) on every step; it does that hidden — a quick fade
 * out, an untweened jump to the new slot, then a fade back in — so it never
 * slides across the centre card against the direction of travel.
 */

/** Slot offset as a percentage of card width, and the side cards' recession. */
const SHIFT = 68;
const SIDE_SCALE = 0.78;
const SIDE_OPACITY = 0.62;
const SIDE_TILT = 13;

const SLIDE_MS = 520;
const WRAP_MS = 170;
const AUTOPLAY_MS = 9000;

type Wrap = { id: number; seq: number } | null;

export default function FeaturedTastings() {
  const total = featuredTastings.length;
  const [active, setActive] = useState(0);
  const [wrap, setWrap] = useState<Wrap>(null);
  const [paused, setPaused] = useState(false);
  const [motionOk, setMotionOk] = useState(true);
  const seq = useRef(0);
  const touch = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setMotionOk(!mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const go = useCallback(
    (dir: 1 | -1) => {
      seq.current += 1;
      // Going forward, the left card is the one that has to jump to the right.
      setWrap({
        id: dir === 1 ? (active - 1 + total) % total : (active + 1) % total,
        seq: seq.current,
      });
      setActive((active + dir + total) % total);
    },
    [active, total],
  );

  // Let the wrapping card land, then fade it back in.
  useEffect(() => {
    if (!wrap) return;
    const t = setTimeout(() => setWrap(null), WRAP_MS);
    return () => clearTimeout(t);
  }, [wrap]);

  // Slow autoplay; any manual move resets it, hover and reduced motion stop it.
  useEffect(() => {
    if (paused || !motionOk) return;
    const t = setTimeout(() => go(1), AUTOPLAY_MS);
    return () => clearTimeout(t);
  }, [paused, motionOk, go]);

  /** Signed slot: 0 centre, 1 right, -1 left. */
  const slotOf = (i: number) => {
    const raw = (i - active + total) % total;
    return raw > total / 2 ? raw - total : raw;
  };

  const onTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0];
    touch.current = { x: t.clientX, y: t.clientY };
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    const start = touch.current;
    touch.current = null;
    if (!start) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - start.x;
    const dy = t.clientY - start.y;
    // Ignore anything that reads as a vertical scroll.
    if (Math.abs(dx) < 44 || Math.abs(dx) < Math.abs(dy)) return;
    go(dx < 0 ? 1 : -1);
  };

  return (
    <section
      id="featured"
      className="bg-olive anchor-offset relative isolate overflow-hidden"
    >
      <div className="grain absolute inset-0" />

      <div className="section-pad relative">
        <div className="shell">
          <div className="flex flex-wrap items-end justify-between gap-8">
            <div className="max-w-2xl">
              <p className="eyebrow text-terracotta-soft mb-5">
                This Season&apos;s Harvest
              </p>
              <h2 className="display text-cream text-[clamp(2.1rem,5.5vw,4.25rem)] uppercase">
                Featured Tasting Flights
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label="Previous tasting"
                className="border-cream/25 text-cream hover:bg-cream hover:text-olive flex h-12 w-12 items-center justify-center rounded-full border transition-all duration-250 ease-[var(--ease-brand)]"
              >
                ←
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label="Next tasting"
                className="border-cream/25 text-cream hover:bg-cream hover:text-olive flex h-12 w-12 items-center justify-center rounded-full border transition-all duration-250 ease-[var(--ease-brand)]"
              >
                →
              </button>
            </div>
          </div>

          {/* Coverflow stage */}
          <div
            role="group"
            aria-label="Featured tasting flights"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "ArrowLeft") go(-1);
              if (e.key === "ArrowRight") go(1);
            }}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocus={() => setPaused(true)}
            onBlur={() => setPaused(false)}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
            className="mt-14 grid touch-pan-y place-items-center outline-none [perspective:1600px] md:mt-20"
          >
            {featuredTastings.map((tasting, i) => {
              const slot = slotOf(i);
              const isCenter = slot === 0;
              const isWrapping = wrap?.id === i;

              return (
                <article
                  key={tasting.name}
                  aria-hidden={!isCenter}
                  className="col-start-1 row-start-1 w-[78vw] max-w-[23rem] will-change-[transform,opacity] sm:w-[21rem] lg:w-[24rem]"
                  style={{
                    transform: `translate3d(${slot * SHIFT}%, 0, 0) scale(${
                      isCenter ? 1 : SIDE_SCALE
                    }) rotateY(${slot * -SIDE_TILT}deg)`,
                    opacity: isWrapping ? 0 : isCenter ? 1 : SIDE_OPACITY,
                    zIndex: isCenter ? 30 : 10,
                    // While wrapping, only the fade is tweened: the jump to the
                    // far slot happens instantly, behind the fade.
                    transitionProperty: isWrapping
                      ? "opacity"
                      : "transform, opacity",
                    transitionDuration: `${isWrapping ? WRAP_MS : SLIDE_MS}ms`,
                    transitionTimingFunction: "cubic-bezier(0.42, 0, 0.2, 1)",
                  }}
                >
                  <a
                    href="#book"
                    onClick={(e) => {
                      if (isCenter) return; // centre card follows the link
                      e.preventDefault();
                      go(slot === 1 ? 1 : -1);
                    }}
                    tabIndex={isCenter ? 0 : -1}
                    className="group block"
                  >
                    <div
                      className={`rounded-card relative aspect-[3/4] overflow-hidden transition-shadow duration-300 ease-[var(--ease-brand)] ${
                        isCenter ? "shadow-lift" : "shadow-soft"
                      }`}
                    >
                      <PlaceholderImage
                        src={tasting.image.src}
                        alt={tasting.image.alt}
                        fill
                        sizes="(max-width: 640px) 78vw, (max-width: 1024px) 21rem, 24rem"
                        priority={i === 0}
                        className="object-cover transition-transform duration-500 ease-[var(--ease-brand)] group-hover:scale-[1.05]"
                      />
                      {/* Solid under the copy, clearing fast so the top of the
                          photograph still reads. */}
                      <div
                        className="absolute inset-0"
                        style={{
                          background:
                            "linear-gradient(to top, rgba(28,38,9,0.97) 0%, rgba(28,38,9,0.93) 40%, rgba(28,38,9,0.42) 64%, rgba(28,38,9,0.06) 88%)",
                        }}
                      />
                      {/* seats the badges against bright photography */}
                      <div className="from-olive-deep/55 absolute inset-x-0 top-0 h-24 bg-gradient-to-b to-transparent" />

                      <span className="text-cream/85 absolute top-5 left-5 font-mono text-xs font-semibold tracking-[0.2em]">
                        {String(i + 1).padStart(2, "0")}
                      </span>

                      <span className="bg-cream/90 text-olive absolute top-4 right-4 rounded-full px-3.5 py-1.5 text-[0.6875rem] font-semibold tracking-[0.12em] uppercase">
                        {tasting.duration}
                      </span>

                      <div className="absolute inset-x-0 bottom-0 p-6">
                        <h3 className="display text-cream text-[1.5rem] leading-tight">
                          {tasting.name}
                        </h3>
                        <p className="text-cream/65 mt-1.5 font-[family-name:var(--font-fraunces)] text-[0.8125rem] italic">
                          {tasting.subtitle}
                        </p>

                        <p className="text-terracotta-soft mt-3.5 flex items-baseline gap-1.5 text-[1.0625rem] font-semibold">
                          {tasting.price.split(" per ")[0]}
                          <span className="text-cream/55 text-[0.6875rem] font-medium tracking-[0.12em] uppercase">
                            per guest
                          </span>
                        </p>

                        <p className="text-cream/75 mt-3 text-[0.75rem] leading-[1.55] sm:text-[0.8125rem] sm:leading-[1.6]">
                          {tasting.description}
                        </p>

                        <span className="bg-terracotta-soft mt-4 block h-px w-10 origin-left transition-transform duration-400 ease-[var(--ease-brand)] group-hover:scale-x-[3.5]" />
                      </div>
                    </div>
                  </a>
                </article>
              );
            })}
          </div>

          {/* Position indicator */}
          <div className="mt-10 flex items-center justify-center gap-2.5">
            {featuredTastings.map((tasting, i) => (
              <button
                key={tasting.name}
                type="button"
                onClick={() => {
                  if (i === active) return;
                  go(slotOf(i) === 1 ? 1 : -1);
                }}
                aria-label={`Show ${tasting.name}`}
                aria-current={i === active}
                className={`h-1.5 rounded-full transition-all duration-400 ease-[var(--ease-brand)] ${
                  i === active
                    ? "bg-terracotta-soft w-8"
                    : "bg-cream/25 hover:bg-cream/45 w-2.5"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
