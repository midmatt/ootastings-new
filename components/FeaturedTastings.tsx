"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import PlaceholderImage from "./PlaceholderImage";
import { featuredTastings } from "@/lib/placeholders";

/**
 * Featured Tasting Flights — a three-card coverflow.
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
 * - a "+" button on each card opens a details panel (hover on desktop, tap on
 *   touch) carrying the package comparison data;
 * - clicking the centre card expands it for easier reading, which locks
 *   rotation entirely — arrows, dots, swipe and autoplay all stand down until
 *   it is closed via the X, the backdrop, Escape, or another click on the card.
 */

/** Slot offset as a percentage of card width, and the side cards' recession. */
const SHIFT = 66;
const SIDE_SCALE = 0.74;
const SIDE_OPACITY = 0.62;
/** Side cards recede further while a card is expanded. */
const SIDE_OPACITY_LOCKED = 0.16;
const SIDE_TILT = 12;
const EXPANDED_SCALE = 1.12;

const SLIDE_MS = 340;
const WRAP_MS = 130;
const AUTOPLAY_MS = 9000;

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

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setMotionOk(!mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const go = useCallback(
    (dir: 1 | -1) => {
      if (expanded) return; // rotation is locked while a card is open
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

  // Slow autoplay; a manual move resets it. Hover, an expanded card, or
  // reduced motion all stop it.
  useEffect(() => {
    if (hovered || expanded || !motionOk) return;
    const t = setTimeout(() => go(1), AUTOPLAY_MS);
    return () => clearTimeout(t);
  }, [hovered, expanded, motionOk, go]);

  // An expanded card is nearly viewport-height on a laptop, so bring it into
  // frame rather than letting it run off the bottom — and leave room at the top
  // for the sticky header and the card's own close button. The rect is measured
  // unscaled (the growth is still animating), so the scale is applied by hand.
  useEffect(() => {
    if (!expanded) return;
    const card = stage.current?.querySelector('article[aria-hidden="false"]');
    if (!card) return;
    const r = card.getBoundingClientRect();
    const grownTop = r.top - (r.height * (EXPANDED_SCALE - 1)) / 2;
    window.scrollTo({ top: window.scrollY + grownTop - 116, behavior: "smooth" });
  }, [expanded]);

  // Escape closes the expanded card.
  useEffect(() => {
    if (!expanded) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setExpanded(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [expanded]);

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
                Featured Tasting Flights
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
            aria-label="Featured tasting flights"
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
            {/* click-outside target while a card is expanded */}
            <button
              type="button"
              tabIndex={-1}
              aria-label="Close details"
              onClick={closeExpanded}
              className={`bg-olive-deep/45 absolute inset-x-[-50vw] -inset-y-20 z-20 cursor-default transition-opacity duration-300 ${
                expanded ? "opacity-100" : "pointer-events-none opacity-0"
              }`}
            />

            {featuredTastings.map((tasting, i) => {
              const slot = slotOf(i);
              const isCenter = slot === 0;
              const isWrapping = wrap?.id === i;
              const isOpen = isCenter && expanded;
              const scale = isOpen ? EXPANDED_SCALE : isCenter ? 1 : SIDE_SCALE;

              return (
                <article
                  key={tasting.name}
                  aria-hidden={!isCenter}
                  className={`col-start-1 row-start-1 w-[88vw] max-w-[26rem] will-change-[transform,opacity] sm:w-[27rem] sm:max-w-none lg:w-[32rem] ${
                    !isCenter && expanded ? "pointer-events-none" : ""
                  }`}
                  style={{
                    transform: `translate3d(${slot * SHIFT}%, 0, 0) scale(${scale}) rotateY(${
                      isOpen ? 0 : slot * -SIDE_TILT
                    }deg)`,
                    opacity: isWrapping
                      ? 0
                      : isCenter
                        ? 1
                        : expanded
                          ? SIDE_OPACITY_LOCKED
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
                  <div className="relative">
                    {/* close affordance for the expanded state */}
                    <button
                      type="button"
                      onClick={closeExpanded}
                      aria-label="Close expanded card"
                      className={`bg-cream text-olive absolute -top-3 -right-3 z-40 flex h-9 w-9 items-center justify-center rounded-full text-lg leading-none shadow-lg transition-all duration-250 ease-[var(--ease-brand)] hover:scale-110 ${
                        isOpen
                          ? "scale-100 opacity-100"
                          : "pointer-events-none scale-75 opacity-0"
                      }`}
                    >
                      ×
                    </button>

                    <div
                      role="button"
                      tabIndex={isCenter ? 0 : -1}
                      aria-expanded={isCenter ? expanded : undefined}
                      onClick={() => {
                        if (isCenter) {
                          setExpanded((v) => !v);
                          setInfoOpen(false);
                        } else {
                          go(slot === 1 ? 1 : -1);
                        }
                      }}
                      onKeyDown={(e) => {
                        if (e.key !== "Enter" && e.key !== " ") return;
                        e.preventDefault();
                        if (isCenter) setExpanded((v) => !v);
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
                        sizes="(max-width: 640px) 84vw, (max-width: 1024px) 27rem, 32rem"
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

                      <div className="absolute inset-x-0 bottom-0 p-5 pr-16 sm:p-7 sm:pr-24">
                        <h3 className="display text-cream text-[1.45rem] leading-tight sm:text-[1.8rem]">
                          {tasting.name}
                        </h3>
                        <p className="text-cream/65 mt-1.5 font-[family-name:var(--font-fraunces)] text-[0.8rem] italic sm:text-[0.85rem]">
                          {tasting.subtitle}
                        </p>

                        <p className="text-terracotta-soft mt-3.5 flex items-baseline gap-1.5 text-[1.05rem] font-semibold sm:mt-4 sm:text-[1.15rem]">
                          {tasting.price.split(" per ")[0]}
                          <span className="text-cream/55 text-[0.6875rem] font-medium tracking-[0.12em] uppercase">
                            per guest
                          </span>
                        </p>

                        <p className="text-cream/75 mt-2.5 text-[0.75rem] leading-[1.5] sm:mt-3 sm:text-[0.875rem] sm:leading-[1.6]">
                          {tasting.description}
                        </p>

                        <span className="bg-terracotta-soft mt-4 block h-px w-10 origin-left transition-transform duration-400 ease-[var(--ease-brand)] group-hover:scale-x-[3.5]" />

                        {/* booking stays reachable once the card is open */}
                        <a
                          href="#book"
                          onClick={(e) => e.stopPropagation()}
                          tabIndex={isOpen ? 0 : -1}
                          className={`btn btn-terracotta mt-5 px-5 py-2.5 text-[0.8125rem] transition-all duration-300 ease-[var(--ease-brand)] ${
                            isOpen
                              ? "pointer-events-auto translate-y-0 opacity-100"
                              : "pointer-events-none h-0 translate-y-2 overflow-hidden py-0 opacity-0"
                          }`}
                        >
                          Reserve this tasting
                        </a>
                      </div>

                      {/* ---- details "+" button and panel ---- */}
                      <div
                        className={`absolute right-5 bottom-5 z-30 ${
                          isCenter ? "" : "pointer-events-none"
                        }`}
                        // Pointer-typed so a tap does not fire the hover-open
                        // path and then get toggled shut again by its own click.
                        onPointerEnter={(e) =>
                          e.pointerType === "mouse" && isCenter && setInfoOpen(true)
                        }
                        onPointerLeave={(e) =>
                          e.pointerType === "mouse" && isCenter && setInfoOpen(false)
                        }
                      >
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setInfoOpen((v) => !v);
                          }}
                          aria-label={`What's included in ${tasting.name}`}
                          aria-expanded={isCenter && infoOpen}
                          tabIndex={isCenter ? 0 : -1}
                          className="border-cream/50 bg-cream/20 text-cream hover:bg-cream hover:text-olive flex h-11 w-11 items-center justify-center rounded-full border text-xl leading-none backdrop-blur-sm transition-all duration-250 ease-[var(--ease-brand)]"
                        >
                          <span
                            className={`block transition-transform duration-250 ease-[var(--ease-brand)] ${
                              isCenter && infoOpen ? "rotate-45" : ""
                            }`}
                          >
                            +
                          </span>
                        </button>

                        <div
                          role="dialog"
                          aria-label={`${tasting.name} details`}
                          onClick={(e) => e.stopPropagation()}
                          className={`bg-cream rounded-card absolute right-0 bottom-14 w-[min(21rem,72vw)] origin-bottom-right p-5 shadow-[0_28px_60px_-20px_rgba(15,20,5,0.6)] transition-all duration-250 ease-[var(--ease-brand)] ${
                            isCenter && infoOpen
                              ? "pointer-events-auto scale-100 opacity-100"
                              : "pointer-events-none scale-90 opacity-0"
                          }`}
                        >
                          <p className="eyebrow text-terracotta mb-3">
                            What&apos;s included
                          </p>
                          <dl className="max-h-[min(22rem,44vh)] overflow-y-auto pr-1">
                            {tasting.details.map((row) => (
                              <div
                                key={row.label}
                                className="border-olive/10 border-b py-2 last:border-0"
                              >
                                <dt className="text-olive/45 text-[0.625rem] font-semibold tracking-[0.16em] uppercase">
                                  {row.label}
                                </dt>
                                <dd className="text-olive mt-0.5 text-[0.8125rem] leading-snug">
                                  {row.value}
                                </dd>
                              </div>
                            ))}
                          </dl>
                          {/* signals that the list scrolls */}
                          <div className="from-cream pointer-events-none absolute inset-x-5 bottom-5 h-7 bg-gradient-to-t to-transparent" />
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
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
