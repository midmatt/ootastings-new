"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import PlaceholderImage from "./PlaceholderImage";
import AddToPackageButton from "./AddToPackageButton";
import BriefAffordance from "./BriefAffordance";
import ExpandedDetail from "./ExpandedDetail";
import { featuredTastings, tastingSharedInclusions } from "@/lib/placeholders";

/**
 * Featured Tasting Experiences — a three-card coverflow.
 *
 * One card holds the centre at full size; the other two sit behind it on either
 * side, smaller, tilted and faded. Arrows, a swipe, a click on a side card, the
 * dots, or the arrow keys rotate the ring, which loops forever rather than
 * dead-ending.
 *
 * Rotation is index-based (modulo), so nothing is duplicated or re-mounted:
 * each card just gets a new slot and animates there on transform and opacity
 * only. With three cards, one of them has to cross from the far left slot to
 * the far right (or back) on every step; it does that hidden — a quick fade
 * out, an untweened jump to the new slot, then a fade back in — so it never
 * slides across the centre card against the direction of travel.
 *
 * Two layers sit on top of that:
 * - a "+" button opens a short package brief (hover on desktop, tap on touch),
 *   laid out wide and shallow so it reads in a few seconds;
 * - clicking the centre card opens a full-width detail panel over the stage.
 *   Rotation locks while it is open — arrows, dots, swipe and autoplay all
 *   stand down until it is closed via the X, the backdrop, or Escape.
 */

/** Slot offset as a percentage of card width, and the side cards' recession. */
const SHIFT = 66;
const SIDE_SCALE = 0.74;
const SIDE_OPACITY = 0.62;
/** All three cards recede behind the detail panel while it is open. */
const OPACITY_BEHIND_PANEL = 0.16;
const SIDE_TILT = 12;

const SLIDE_MS = 340;
const WRAP_MS = 130;
const AUTOPLAY_MS = 5000;

type Wrap = { id: number; seq: number } | null;

export default function FeaturedTastings() {
  const total = featuredTastings.length;
  const [active, setActive] = useState(0);
  const [wrap, setWrap] = useState<Wrap>(null);
  const [hovered, setHovered] = useState(false);
  const [motionOk, setMotionOk] = useState(true);
  const [expanded, setExpanded] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);
  const seq = useRef(0);
  const touch = useRef<{ x: number; y: number } | null>(null);
  const stage = useRef<HTMLDivElement>(null);

  const current = featuredTastings[active];

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setMotionOk(!mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const go = useCallback(
    (dir: 1 | -1) => {
      if (expanded) return; // rotation is locked while the detail panel is open
      seq.current += 1;
      // Going forward, the left card is the one that has to jump to the right.
      setWrap({
        id: dir === 1 ? (active - 1 + total) % total : (active + 1) % total,
        seq: seq.current,
      });
      setActive((active + dir + total) % total);
      setInfoOpen(false);
    },
    [active, total, expanded],
  );

  // Let the wrapping card land, then fade it back in.
  useEffect(() => {
    if (!wrap) return;
    const t = setTimeout(() => setWrap(null), WRAP_MS);
    return () => clearTimeout(t);
  }, [wrap]);

  // Slow autoplay; a manual move resets it. Hover, the detail panel, or
  // reduced motion all stop it.
  useEffect(() => {
    if (hovered || expanded || !motionOk) return;
    const t = setTimeout(() => go(1), AUTOPLAY_MS);
    return () => clearTimeout(t);
  }, [hovered, expanded, motionOk, go]);

  /** Signed slot: 0 centre, 1 right, -1 left. */
  const slotOf = (i: number) => {
    const raw = (i - active + total) % total;
    return raw > total / 2 ? raw - total : raw;
  };

  const closeExpanded = () => {
    setExpanded(false);
    setInfoOpen(false);
  };

  const onTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0];
    touch.current = { x: t.clientX, y: t.clientY };
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    const start = touch.current;
    touch.current = null;
    if (!start || expanded) return;
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
                Featured Networking Experiences
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => go(-1)}
                disabled={expanded}
                aria-label="Previous tasting"
                className="border-cream/25 text-cream hover:bg-cream hover:text-olive flex h-12 w-12 items-center justify-center rounded-full border transition-all duration-250 ease-[var(--ease-brand)] disabled:pointer-events-none disabled:opacity-25"
              >
                ←
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                disabled={expanded}
                aria-label="Next tasting"
                className="border-cream/25 text-cream hover:bg-cream hover:text-olive flex h-12 w-12 items-center justify-center rounded-full border transition-all duration-250 ease-[var(--ease-brand)] disabled:pointer-events-none disabled:opacity-25"
              >
                →
              </button>
            </div>
          </div>

          {/* Coverflow stage */}
          <div
            ref={stage}
            role="group"
            aria-label="Featured tasting experiences"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "ArrowLeft") go(-1);
              if (e.key === "ArrowRight") go(1);
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onFocus={() => setHovered(true)}
            onBlur={() => setHovered(false)}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
            className="relative mt-16 grid touch-pan-y place-items-center outline-none [perspective:1800px] md:mt-24"
          >
            {/* click-outside target while the detail panel is open */}
            <button
              type="button"
              tabIndex={-1}
              aria-label="Close details"
              onClick={closeExpanded}
              className={`bg-olive-deep/55 absolute inset-x-[-50vw] -inset-y-[200vh] z-20 cursor-default transition-opacity duration-300 ${
                expanded ? "opacity-100" : "pointer-events-none opacity-0"
              }`}
            />

            {featuredTastings.map((tasting, i) => {
              const slot = slotOf(i);
              const isCenter = slot === 0;
              const isWrapping = wrap?.id === i;

              return (
                <article
                  key={tasting.name}
                  aria-hidden={!isCenter}
                  className={`relative col-start-1 row-start-1 w-[88vw] max-w-[26rem] will-change-[transform,opacity] sm:w-[27rem] sm:max-w-none lg:w-[32rem] ${
                    expanded ? "pointer-events-none" : ""
                  }`}
                  style={{
                    transform: `translate3d(${slot * SHIFT}%, 0, 0) scale(${
                      isCenter ? 1 : SIDE_SCALE
                    }) rotateY(${slot * -SIDE_TILT}deg)`,
                    opacity: isWrapping
                      ? 0
                      : expanded
                        ? OPACITY_BEHIND_PANEL
                        : isCenter
                          ? 1
                          : SIDE_OPACITY,
                    zIndex: isCenter ? 30 : 10,
                    // While wrapping, only the fade is tweened: the jump to the
                    // far slot happens instantly, behind the fade.
                    transitionProperty: isWrapping
                      ? "opacity"
                      : "transform, opacity",
                    transitionDuration: `${isWrapping ? WRAP_MS : SLIDE_MS}ms`,
                    transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
                  }}
                >
                  <div
                    role="button"
                    tabIndex={isCenter && !expanded ? 0 : -1}
                    aria-expanded={isCenter ? expanded : undefined}
                    onClick={() => {
                      if (isCenter) {
                        setExpanded(true);
                        setInfoOpen(false);
                      } else {
                        go(slot === 1 ? 1 : -1);
                      }
                    }}
                    onKeyDown={(e) => {
                      if (e.key !== "Enter" && e.key !== " ") return;
                      e.preventDefault();
                      if (isCenter) setExpanded(true);
                      else go(slot === 1 ? 1 : -1);
                    }}
                    className={`group rounded-card relative block aspect-[3/4] cursor-pointer overflow-hidden transition-shadow duration-300 ease-[var(--ease-brand)] ${
                      isCenter ? "shadow-lift" : "shadow-soft"
                    }`}
                  >
                    <PlaceholderImage
                      src={tasting.image.src}
                      alt={tasting.image.alt}
                      fill
                      sizes="(max-width: 640px) 88vw, (max-width: 1024px) 27rem, 32rem"
                      priority={i === 0}
                      className="object-cover transition-transform duration-500 ease-[var(--ease-brand)] group-hover:scale-[1.04]"
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

                    {/* Still bottom-anchored and content-sized, but capped so it
                        can never grow up into the two badges — 4rem is the band
                        they sit in. `overflow-hidden` keeps that cap honest if
                        the copy ever outgrows the card. */}
                    <div className="absolute inset-x-0 bottom-0 max-h-[calc(100%-4rem)] overflow-hidden p-5 pr-16 sm:p-7 sm:pr-24">
                      <h3 className="display text-cream text-[1.45rem] leading-tight sm:text-[1.8rem]">
                        {tasting.name}
                      </h3>
                      <p className="text-cream/65 mt-1.5 font-[family-name:var(--font-fraunces)] text-[0.8rem] italic sm:text-[0.85rem]">
                        {tasting.subtitle}
                      </p>

                      <p className="text-terracotta-soft mt-3.5 flex flex-wrap items-baseline gap-x-2 text-[1.05rem] font-semibold sm:mt-4 sm:text-[1.15rem]">
                        {tasting.price.base}
                        <span className="text-cream/55 text-[0.6875rem] font-medium tracking-[0.12em] uppercase">
                          booking fee · {tasting.price.includes}
                        </span>
                      </p>
                      <p className="text-cream/55 mt-1 text-[0.6875rem] tracking-[0.06em]">
                        {tasting.price.additional}
                      </p>
                      <p className="text-cream/50 mt-1 line-clamp-2 text-[0.6875rem] leading-snug tracking-[0.04em] sm:line-clamp-none">
                        {tasting.price.optionalPairings}
                      </p>

                      {/* The card is a teaser — the expanded panel carries the
                          description in full, so it is clamped here to what the
                          card can actually hold at each width. */}
                      <p className="text-cream/75 mt-2.5 line-clamp-3 text-[0.75rem] leading-[1.5] min-[420px]:line-clamp-5 sm:mt-3 sm:line-clamp-6 sm:text-[0.875rem] sm:leading-[1.6] lg:line-clamp-none">
                        {tasting.description}
                      </p>

                      <span className="bg-terracotta-soft mt-4 block h-px w-10 origin-left transition-transform duration-400 ease-[var(--ease-brand)] group-hover:scale-x-[3.5]" />
                    </div>
                  </div>

                  {/* Outside the card: the card clips its overflow, and the
                      brief is deliberately wider than the card. */}
                  <BriefAffordance
                    name={tasting.name}
                    brief={tasting.brief}
                    open={infoOpen}
                    setOpen={setInfoOpen}
                    enabled={isCenter && !expanded}
                  />
                </article>
              );
            })}

            {/* ---------- expanded detail panel ---------- */}
            <ExpandedDetail
              open={expanded}
              onClose={closeExpanded}
              image={current.image}
              index={active}
              badge={current.duration}
              name={current.name}
              brief={current.brief}
              className="col-start-1 row-start-1"
            >
              <div className="flex flex-wrap items-center gap-4">
                <p className="eyebrow text-terracotta">
                  Featured Tasting Experience
                </p>
                <span className="bg-olive/8 text-olive/70 hidden rounded-full px-3 py-1 text-[0.6875rem] font-semibold tracking-[0.12em] uppercase md:inline">
                  {current.duration}
                </span>
              </div>

              <h3 className="display text-olive mt-3 text-[clamp(1.75rem,3.4vw,2.9rem)] leading-[1.05] sm:mt-4">
                {current.name}
              </h3>
              <p className="text-olive/60 mt-2 font-[family-name:var(--font-fraunces)] text-[1rem] italic">
                {current.subtitle}
              </p>

              <div className="border-olive/12 mt-5 flex flex-col gap-1.5 border-y py-3.5 sm:mt-6 sm:py-4">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span className="display text-terracotta text-[1.75rem] leading-none">
                    {current.price.base}
                  </span>
                  <span className="text-olive/60 text-[0.75rem] font-semibold tracking-[0.14em] uppercase">
                    booking fee · {current.price.includes}
                  </span>
                </div>
                <span className="text-ink/55 text-[0.8125rem]">
                  {current.price.additional}
                </span>
                <span className="text-olive/55 text-[0.8125rem] leading-snug italic">
                  {current.price.optionalPairings}
                </span>
              </div>

              <p className="text-ink/70 mt-5 max-w-xl text-[0.875rem] leading-[1.7] sm:mt-6 sm:text-[0.9375rem] sm:leading-[1.75]">
                {current.description}
              </p>

              <div className="border-olive/10 mt-6 max-w-xl border-t pt-5 sm:mt-7">
                <p className="text-olive/55 text-[0.6875rem] font-semibold tracking-[0.16em] uppercase">
                  Every tasting includes
                </p>
                <ul className="text-ink/65 mt-3 space-y-2 text-[0.8125rem] leading-relaxed sm:text-[0.875rem]">
                  {tastingSharedInclusions.map((item) => (
                    <li key={item} className="flex gap-2.5">
                      <span
                        aria-hidden="true"
                        className="bg-terracotta/80 mt-2 h-1 w-1 shrink-0 rounded-full"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-4 sm:mt-8">
                <AddToPackageButton
                  item={{
                    kind: "tasting",
                    name: current.name,
                    priceLabel: `${current.price.base} booking fee · ${current.price.includes}`,
                    priceNote: current.price.additional,
                    image: current.image,
                  }}
                />
                <span className="text-olive/45 text-[0.75rem] tracking-[0.12em] uppercase">
                  Led by {current.brief.lead}
                </span>
              </div>
            </ExpandedDetail>
          </div>

          {/* Position indicator */}
          <div className="relative z-30 mt-12 flex items-center justify-center gap-2.5">
            {featuredTastings.map((tasting, i) => (
              <button
                key={tasting.name}
                type="button"
                disabled={expanded}
                onClick={() => {
                  if (i === active) return;
                  go(slotOf(i) === 1 ? 1 : -1);
                }}
                aria-label={`Show ${tasting.name}`}
                aria-current={i === active}
                className={`h-1.5 rounded-full transition-all duration-400 ease-[var(--ease-brand)] disabled:opacity-30 ${
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
