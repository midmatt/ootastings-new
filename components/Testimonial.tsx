"use client";

import { useCallback, useEffect, useState } from "react";
import Reveal from "./Reveal";
import { testimonials } from "@/lib/placeholders";

/**
 * Guest testimonials — a quiet cross-fade carousel.
 *
 * Deliberately unlike the Featured Tasting Experiences coverflow: no cards, no
 * tilt, no arrows. One quote holds the centre and the next simply takes its
 * place, and the guests' names double as the navigation — the active one is
 * underlined by a terracotta rule that also runs down as the autoplay timer
 * does, so the rotation is legible without a row of dots.
 *
 * All three quotes are stacked in a single grid cell, so the block is as tall
 * as the longest one and nothing reflows as it rotates.
 */

/** Keep in sync with the wipe duration on the active name's rule below. */
const AUTOPLAY_MS = 7000;

export default function Testimonial() {
  const total = testimonials.length;
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [motionOk, setMotionOk] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setMotionOk(!mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  // Reduced motion holds a single quote rather than rotating it out from under
  // the reader; the names still switch it by hand.
  useEffect(() => {
    if (!motionOk || paused) return;
    const t = setTimeout(() => setActive((i) => (i + 1) % total), AUTOPLAY_MS);
    return () => clearTimeout(t);
  }, [motionOk, paused, active, total]);

  const go = useCallback(
    (dir: 1 | -1) => setActive((i) => (i + dir + total) % total),
    [total],
  );

  return (
    <section className="bg-olive relative isolate overflow-hidden">
      <div className="grain absolute inset-0" />

      {/* Oversized quote mark */}
      <span
        aria-hidden="true"
        className="display text-cream/[0.06] pointer-events-none absolute -top-16 left-1/2 -translate-x-1/2 text-[22rem] leading-none select-none md:text-[30rem]"
      >
        &rdquo;
      </span>

      <div className="section-pad shell relative">
        <Reveal className="mx-auto max-w-4xl text-center">
          <p className="eyebrow text-terracotta-soft mb-10">From the table</p>

          <div
            role="group"
            aria-roledescription="carousel"
            aria-label="What guests say"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "ArrowLeft") go(-1);
              if (e.key === "ArrowRight") go(1);
            }}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocus={() => setPaused(true)}
            onBlur={() => setPaused(false)}
            // Centred, so a short quote sits in the middle of the height the
            // longest one reserves rather than hanging from the top.
            className="grid items-center outline-none"
          >
            {testimonials.map((item, i) => (
              <blockquote
                key={item.name}
                aria-hidden={i !== active}
                className={`col-start-1 row-start-1 transition-all duration-500 ease-[var(--ease-brand)] ${
                  i === active
                    ? "translate-y-0 opacity-100"
                    : "pointer-events-none translate-y-3 opacity-0"
                }`}
              >
                <p className="text-cream font-[family-name:var(--font-fraunces)] text-[clamp(1.5rem,4vw,2.9rem)] leading-[1.24] font-light text-balance italic">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </blockquote>
            ))}
          </div>

          {/* The names are the controls. Three of them will not sit on one
              line on a phone, so they stack rather than wrap 2 + 1. */}
          <div className="mt-14 flex flex-col items-center gap-y-4 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-10 sm:gap-y-5">
            {testimonials.map((item, i) => {
              const isActive = i === active;
              return (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-current={isActive}
                  aria-label={`Show what ${item.name} said`}
                  className="group relative pb-2.5 text-[0.75rem] font-semibold tracking-[0.18em] uppercase outline-none"
                >
                  <span
                    className={`transition-colors duration-250 ease-[var(--ease-brand)] ${
                      isActive
                        ? "text-cream"
                        : "text-cream/40 group-hover:text-cream/80 group-focus-visible:text-cream/80"
                    }`}
                  >
                    {item.name}
                  </span>

                  <span
                    aria-hidden="true"
                    className="bg-cream/15 absolute inset-x-0 bottom-0 h-px"
                  />
                  {isActive && (
                    <span
                      // Remounting on change restarts the wipe from zero.
                      key={active}
                      aria-hidden="true"
                      style={
                        motionOk
                          ? { animationPlayState: paused ? "paused" : "running" }
                          : undefined
                      }
                      className={`bg-terracotta-soft absolute inset-x-0 bottom-0 h-px ${
                        motionOk
                          ? "origin-left [animation:wipe_7000ms_linear_both]"
                          : ""
                      }`}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
