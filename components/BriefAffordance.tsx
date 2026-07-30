"use client";

import { useEffect, useRef } from "react";

/**
 * The condensed package brief shown behind a "+" button. Shared by the
 * Featured Tasting Experiences carousel and the networking package grid so the
 * two sections behave identically.
 *
 * The brief is sized by its container rather than a fixed width: dropped into a
 * card, it takes exactly that card's rendered width at every breakpoint and can
 * never spill onto a neighbour.
 */
export type Brief = {
  summary: string;
  lead: string;
  includes: string;
  idealFor: string;
  addOns?: string;
  note?: string;
};

export default function BriefAffordance({
  name,
  brief,
  open,
  setOpen,
  enabled,
  tone = "on-photo",
  /**
   * How the brief is sized inside its container. The default fills the
   * container edge to edge — on a card that means exactly the card's rendered
   * width, tracked live rather than assumed. The detail panel passes a capped
   * width instead, since edge-to-edge on a 72rem panel would be absurd.
   */
  panelClass = "inset-x-0",
}: {
  name: string;
  brief: Brief;
  open: boolean;
  setOpen: (fn: (v: boolean) => boolean) => void;
  enabled: boolean;
  tone?: "on-photo" | "on-cream";
  panelClass?: string;
}) {
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // The button and the brief are siblings (the brief has to be sized against
  // the card, not the button), so leaving one to enter the other would close it
  // mid-move. A short grace period on close covers the gap.
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

  const field = (label: string, value: string) => (
    <div>
      <dt className="text-olive/45 text-[0.625rem] font-semibold tracking-[0.16em] uppercase">
        {label}
      </dt>
      <dd className="text-olive mt-0.5 text-[0.8125rem] leading-snug">
        {value}
      </dd>
    </div>
  );

  return (
    <div className="pointer-events-none absolute inset-0 z-30">
      <button
        type="button"
        {...hover}
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          if (closeTimer.current) clearTimeout(closeTimer.current);
          setOpen((v) => !v);
        }}
        aria-label={`What's included in ${name}`}
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
        aria-label={`${name} summary`}
        {...hover}
        onClick={(e) => e.stopPropagation()}
        className={`bg-cream rounded-card absolute bottom-0 z-30 max-h-full origin-bottom p-6 pb-20 shadow-[0_28px_60px_-20px_rgba(15,20,5,0.6)] transition-all duration-250 ease-[var(--ease-brand)] ${panelClass} ${
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
          {field("Led by", brief.lead)}
          {field("Includes", brief.includes)}
          {field("Ideal for", brief.idealFor)}
          {brief.addOns && field("Add-ons available", brief.addOns)}
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
