"use client";

import { useCallback, useEffect, useState } from "react";
import PlaceholderImage from "./PlaceholderImage";
import Reveal from "./Reveal";
import { atmospherePhotos } from "@/lib/atmosphere";

/**
 * "Where it all happens" — the client's photography, five frames at a time,
 * turning over every five seconds.
 *
 * Three sets are mounted at once: the one going out, the one on screen, and the
 * next one sitting at zero opacity. That last one is the point — it has already
 * fetched by the time it is its turn, so a change is a true cross-fade rather
 * than a flash of empty tiles waiting on the network. Everything else stays
 * unmounted, so fifteen images are in the DOM instead of all 163.
 *
 * The window advances five photographs at a time and wraps with a modulo. Five
 * and 163 share no factors, so every photograph eventually appears in every
 * position — which is what lets the narrow layouts show two or three frames
 * instead of five without ever cutting anyone off from part of the set.
 */

/** Frames on screen at once, and how long each set holds. */
const PER_PAGE = 5;
const INTERVAL_MS = 5000;
const FADE_MS = 900;

/** A gentle stagger, so five frames in a row do not read as a filmstrip. */
const OFFSETS = ["", "md:mt-10", "", "md:mt-14", "md:mt-4"];

/** Narrow screens carry fewer frames; the wrap-around covers the rest. */
const VISIBILITY = [
  "",
  "",
  "hidden sm:block",
  "hidden md:block",
  "hidden md:block",
];

export default function AtmosphereCollage() {
  const total = atmospherePhotos.length;
  const [page, setPage] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [motionOk, setMotionOk] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setMotionOk(!mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const running = playing && motionOk;

  useEffect(() => {
    if (!running) return;
    const t = setTimeout(() => setPage((p) => p + 1), INTERVAL_MS);
    return () => clearTimeout(t);
  }, [running, page]);

  const photosFor = useCallback(
    (p: number) =>
      Array.from(
        { length: PER_PAGE },
        (_, k) => atmospherePhotos[(p * PER_PAGE + k) % total],
      ),
    [total],
  );

  // out-going, current, and the pre-loaded next
  const mounted = [page - 1, page, page + 1].filter((p) => p >= 0);

  return (
    <section
      id="atmosphere"
      className="bg-cream anchor-offset relative isolate overflow-hidden"
    >
      <div className="grain absolute inset-0" />
      <div className="section-pad shell relative">
        <Reveal className="max-w-2xl">
          <p className="eyebrow text-terracotta mb-5">The Room &amp; The Grove</p>
          <h2 className="display text-olive text-[clamp(2.1rem,5.5vw,4.25rem)] uppercase">
            Where it all happens
          </h2>
          <p className="text-ink/65 mt-6 max-w-md text-[0.9375rem] leading-relaxed">
            Long tables, cool stone, and the trees that started all of it.
          </p>
        </Reveal>

        <div
          role="group"
          aria-roledescription="carousel"
          aria-label="Photographs from our tastings"
          className="relative mt-14 grid md:mt-20"
        >
          {mounted.map((p) => {
            const isCurrent = p === page;
            return (
              <ul
                key={p}
                aria-hidden={!isCurrent}
                className={`col-start-1 row-start-1 grid grid-cols-2 items-start gap-4 transition-opacity ease-[var(--ease-brand)] sm:grid-cols-3 md:grid-cols-5 md:gap-6 ${
                  isCurrent
                    ? "opacity-100"
                    : "pointer-events-none opacity-0"
                }`}
                style={{ transitionDuration: `${FADE_MS}ms` }}
              >
                {photosFor(p).map((photo, k) => (
                  <li
                    key={`${p}-${k}`}
                    className={`${OFFSETS[k]} ${VISIBILITY[k]} rounded-tile shadow-soft relative aspect-[3/4] overflow-hidden`}
                  >
                    <PlaceholderImage
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      sizes="(max-width: 640px) 45vw, (max-width: 768px) 30vw, 18vw"
                      className="object-cover"
                    />
                  </li>
                ))}
              </ul>
            );
          })}
        </div>

        {/* An auto-rotating block needs a way to stop it — the accessibility
            statement promises as much. */}
        <div className="mt-10 flex items-center gap-4">
          <button
            type="button"
            onClick={() => setPlaying((v) => !v)}
            aria-label={
              playing ? "Pause the photo carousel" : "Play the photo carousel"
            }
            className="border-olive/25 text-olive hover:bg-olive hover:text-cream flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-colors duration-250 ease-[var(--ease-brand)]"
          >
            {playing ? (
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="h-3.5 w-3.5"
                fill="currentColor"
              >
                <rect x="6" y="5" width="4" height="14" rx="1" />
                <rect x="14" y="5" width="4" height="14" rx="1" />
              </svg>
            ) : (
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="ml-0.5 h-3.5 w-3.5"
                fill="currentColor"
              >
                <path d="M7 4.5v15l13-7.5z" />
              </svg>
            )}
          </button>
          <span className="text-ink/40 text-[0.6875rem] tracking-[0.16em] uppercase">
            {total} moments from the table
          </span>
        </div>
      </div>
    </section>
  );
}
