"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import PlaceholderImage from "./PlaceholderImage";
import { featuredTastings } from "@/lib/placeholders";

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

type Tasting = (typeof featuredTastings)[number];
type Wrap = { id: number; seq: number } | null;

/**
 * The "+" affordance and its brief. Used both on the centre card and inside the
 * expanded detail panel, so the same summary is one hover away in either state.
 */
function BriefAffordance({
  tasting,
  open,
  setOpen,
  enabled,
  tone = "on-photo",
  /**
   * How the brief is sized inside its container. The default fills the
   * container edge to edge — on a card that means exactly the card's rendered
   * width, tracked live rather than assumed, so it can never spill onto a
   * neighbouring card. The detail panel passes a capped width instead, since
   * edge-to-edge on a 72rem panel would be absurd.
   */
  panelClass = "inset-x-0",
}: {
  tasting: Tasting;
  open: boolean;
  setOpen: (fn: (v: boolean) => boolean) => void;
  enabled: boolean;
  tone?: "on-photo" | "on-cream";
  panelClass?: string;
}) {
  const { brief } = tasting;
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // The button and the brief are siblings (the brief has to be sized against
  // the card, not the button), so leaving one to enter the other would close
  // it mid-move. A short grace period on close covers the gap.
  const openNow = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(() => true);
  };
  const closeSoon = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpen(() => false), 140);
  };

  useEffect(
    () => () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
    },
    [],
  );

  // Pointer-typed so a tap does not fire the hover-open path and then get
  // toggled shut again by its own click.
  const hover = {
    onPointerEnter: (e: React.PointerEvent) =>
      e.pointerType === "mouse" && enabled && openNow(),
    onPointerLeave: (e: React.PointerEvent) =>
      e.pointerType === "mouse" && enabled && closeSoon(),
  };

  return (
    <div className="pointer-events-none absolute inset-0 z-30">
      <button
        type="button"
        {...hover}
        onClick={(e) => {
          e.stopPropagation();
          if (closeTimer.current) clearTimeout(closeTimer.current);
          setOpen((v) => !v);
        }}
        aria-label={`What's included in ${tasting.name}`}
        aria-expanded={enabled && open}
        tabIndex={enabled ? 0 : -1}
        className={`absolute right-5 bottom-5 z-40 flex h-11 w-11 items-center justify-center rounded-full border text-xl leading-none backdrop-blur-sm transition-all duration-250 ease-[var(--ease-brand)] ${
          enabled ? "pointer-events-auto" : ""
        } ${
          // Once the brief is open the button sits on cream, so it has to
          // switch tone or the × disappears into the panel behind it.
          tone === "on-cream" || (enabled && open)
            ? "border-olive/25 bg-cream/80 text-olive hover:bg-olive hover:text-cream"
            : "border-cream/50 bg-cream/20 text-cream hover:bg-cream hover:text-olive"
        }`}
      >
        <span
          className={`block transition-transform duration-250 ease-[var(--ease-brand)] ${
            enabled && open ? "rotate-45" : ""
          }`}
        >
          +
        </span>
      </button>

      {/* Sized against the card itself — same left and right edges, never wider. */}
      <div
        role="dialog"
        aria-label={`${tasting.name} summary`}
        {...hover}
        onClick={(e) => e.stopPropagation()}
        className={`bg-cream rounded-card absolute bottom-0 z-30 max-h-full origin-bottom overflow-y-auto p-6 pb-20 shadow-[0_28px_60px_-20px_rgba(15,20,5,0.6)] transition-all duration-250 ease-[var(--ease-brand)] ${panelClass} ${
          enabled && open
            ? "pointer-events-auto scale-100 opacity-100"
            : "pointer-events-none scale-95 opacity-0"
        }`}
      >
        <p className="eyebrow text-terracotta mb-3">What&apos;s included</p>

        <p className="text-olive text-[0.9375rem] leading-[1.55]">
          {brief.summary}
        </p>

        <dl className="border-olive/10 mt-4 grid gap-x-8 gap-y-3 border-t pt-4 sm:grid-cols-2">
          <div>
            <dt className="text-olive/45 text-[0.625rem] font-semibold tracking-[0.16em] uppercase">
              Led by
            </dt>
            <dd className="text-olive mt-0.5 text-[0.8125rem] leading-snug">
              {brief.lead}
            </dd>
          </div>
          <div>
            <dt className="text-olive/45 text-[0.625rem] font-semibold tracking-[0.16em] uppercase">
              Includes
            </dt>
            <dd className="text-olive mt-0.5 text-[0.8125rem] leading-snug">
              {brief.includes}
            </dd>
          </div>
          <div>
            <dt className="text-olive/45 text-[0.625rem] font-semibold tracking-[0.16em] uppercase">
              Ideal for
            </dt>
            <dd className="text-olive mt-0.5 text-[0.8125rem] leading-snug">
              {brief.idealFor}
            </dd>
          </div>
          <div>
            <dt className="text-olive/45 text-[0.625rem] font-semibold tracking-[0.16em] uppercase">
              Add-ons available
            </dt>
            <dd className="text-olive mt-0.5 text-[0.8125rem] leading-snug">
              {brief.addOns}
            </dd>
          </div>
          {brief.note && (
            <div className="sm:col-span-2">
              <dd className="text-olive/60 text-[0.8125rem] leading-snug italic">
                {brief.note}
              </dd>
            </div>
          )}
        </dl>
      </div>
    </div>
  );
}

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
  const panel = useRef<HTMLDivElement>(null);

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

  // Bring the panel into frame, leaving room for the sticky header and the
  // panel's own close button.
  useEffect(() => {
    if (!expanded || !panel.current) return;
    const top = panel.current.getBoundingClientRect().top;
    window.scrollTo({ top: window.scrollY + top - 116, behavior: "smooth" });
  }, [expanded]);

  // Escape closes the detail panel.
  useEffect(() => {
    if (!expanded) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeExpanded();
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

                    <div className="absolute inset-x-0 bottom-0 p-5 pr-16 sm:p-7 sm:pr-24">
                      <h3 className="display text-cream text-[1.45rem] leading-tight sm:text-[1.8rem]">
                        {tasting.name}
                      </h3>
                      <p className="text-cream/65 mt-1.5 font-[family-name:var(--font-fraunces)] text-[0.8rem] italic sm:text-[0.85rem]">
                        {tasting.subtitle}
                      </p>

                      <p className="text-terracotta-soft mt-3.5 flex flex-wrap items-baseline gap-x-2 text-[1.05rem] font-semibold sm:mt-4 sm:text-[1.15rem]">
                        {tasting.price.base}
                        <span className="text-cream/55 text-[0.6875rem] font-medium tracking-[0.12em] uppercase">
                          base · {tasting.price.includes}
                        </span>
                      </p>
                      <p className="text-cream/55 mt-1 text-[0.6875rem] tracking-[0.06em]">
                        {tasting.price.additional}
                      </p>

                      <p className="text-cream/75 mt-2.5 text-[0.75rem] leading-[1.5] sm:mt-3 sm:text-[0.875rem] sm:leading-[1.6]">
                        {tasting.description}
                      </p>

                      <span className="bg-terracotta-soft mt-4 block h-px w-10 origin-left transition-transform duration-400 ease-[var(--ease-brand)] group-hover:scale-x-[3.5]" />
                    </div>
                  </div>

                  {/* Outside the card: the card clips its overflow, and the
                      brief is deliberately wider than the card. */}
                  <BriefAffordance
                    tasting={tasting}
                    open={infoOpen}
                    setOpen={setInfoOpen}
                    enabled={isCenter && !expanded}
                  />
                </article>
              );
            })}

            {/* ---------- expanded detail panel ---------- */}
            <div
              ref={panel}
              aria-hidden={!expanded}
              className={`col-start-1 row-start-1 z-40 w-[min(72rem,92vw)] transition-all duration-340 ease-[var(--ease-brand)] ${
                expanded
                  ? "scale-100 opacity-100"
                  : "pointer-events-none scale-95 opacity-0"
              }`}
            >
              <div className="bg-cream rounded-card shadow-lift relative grid max-h-[86vh] overflow-x-hidden overflow-y-auto md:max-h-none md:grid-cols-[minmax(0,44%)_1fr] md:overflow-hidden">
                <div className="relative h-44 sm:h-56 md:h-auto md:min-h-[30rem]">
                  <PlaceholderImage
                    src={current.image.src}
                    alt={current.image.alt}
                    fill
                    sizes="(max-width: 768px) 92vw, 32rem"
                    className="object-cover"
                  />
                  <div className="from-olive-deep/70 absolute inset-0 bg-gradient-to-t via-transparent to-transparent md:bg-gradient-to-r" />
                  <span className="text-cream/85 absolute top-5 left-5 font-mono text-xs font-semibold tracking-[0.2em]">
                    {String(active + 1).padStart(2, "0")}
                  </span>
                  <span className="bg-cream/90 text-olive absolute top-4 right-4 rounded-full px-3.5 py-1.5 text-[0.6875rem] font-semibold tracking-[0.12em] uppercase md:hidden">
                    {current.duration}
                  </span>
                </div>

                <div className="relative flex flex-col p-6 pb-20 sm:p-10 sm:pb-24 lg:p-12 lg:pb-24">
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

                  <div className="border-olive/12 mt-5 flex flex-wrap items-baseline gap-x-3 gap-y-1 border-y py-3.5 sm:mt-6 sm:py-4">
                    <span className="display text-terracotta text-[1.75rem] leading-none">
                      {current.price.base}
                    </span>
                    <span className="text-olive/60 text-[0.75rem] font-semibold tracking-[0.14em] uppercase">
                      base · {current.price.includes}
                    </span>
                    <span className="text-ink/55 w-full text-[0.8125rem]">
                      {current.price.additional}
                    </span>
                  </div>

                  <p className="text-ink/70 mt-5 max-w-xl text-[0.875rem] leading-[1.7] sm:mt-6 sm:text-[0.9375rem] sm:leading-[1.75]">
                    {current.description}
                  </p>

                  <div className="mt-6 flex flex-wrap items-center gap-4 sm:mt-8">
                    <a href="#book" className="btn btn-lg btn-terracotta">
                      Reserve this tasting
                    </a>
                    <span className="text-olive/45 text-[0.75rem] tracking-[0.12em] uppercase">
                      Led by {current.brief.lead}
                    </span>
                  </div>
                </div>

                <BriefAffordance
                  tasting={current}
                  open={infoOpen}
                  setOpen={setInfoOpen}
                  enabled={expanded}
                  tone="on-cream"
                  panelClass="right-0 w-[min(34rem,100%)]"
                />
              </div>

              <button
                type="button"
                onClick={closeExpanded}
                aria-label="Close expanded card"
                tabIndex={expanded ? 0 : -1}
                className="bg-cream text-olive absolute -top-4 -right-4 z-50 flex h-11 w-11 items-center justify-center rounded-full text-xl leading-none shadow-lg transition-transform duration-250 ease-[var(--ease-brand)] hover:scale-110"
              >
                ×
              </button>
            </div>
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
