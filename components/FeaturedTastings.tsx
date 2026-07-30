"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import PlaceholderImage from "./PlaceholderImage";
import { featuredTastings } from "@/lib/placeholders";

export default function FeaturedTastings() {
  const trackRef = useRef<HTMLUListElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const sync = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft < 8);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 8);
  }, []);

  useEffect(() => {
    sync();
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
  }, [sync]);

  const scrollBy = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector("li");
    const step = card ? card.clientWidth + 24 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
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
                This Season's Harvest
              </p>
              <h2 className="display text-cream text-[clamp(2.1rem,5.5vw,4.25rem)] uppercase">
                Featured Tasting Flights
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <a
                href="#tastings"
                className="text-cream/70 hover:text-cream mr-2 hidden text-sm font-medium underline decoration-transparent underline-offset-4 transition-colors duration-200 hover:decoration-current sm:inline"
              >
                See full menu
              </a>
              <button
                type="button"
                onClick={() => scrollBy(-1)}
                disabled={atStart}
                aria-label="Previous tastings"
                className="border-cream/25 text-cream hover:bg-cream hover:text-olive flex h-12 w-12 items-center justify-center rounded-full border transition-all duration-250 ease-[var(--ease-brand)] disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-current"
              >
                ←
              </button>
              <button
                type="button"
                onClick={() => scrollBy(1)}
                disabled={atEnd}
                aria-label="Next tastings"
                className="border-cream/25 text-cream hover:bg-cream hover:text-olive flex h-12 w-12 items-center justify-center rounded-full border transition-all duration-250 ease-[var(--ease-brand)] disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-current"
              >
                →
              </button>
            </div>
          </div>
        </div>

        {/* Carousel track — bleeds to the right edge on desktop */}
        <ul
          ref={trackRef}
          onScroll={sync}
          className="no-scrollbar mt-12 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth px-[max(1.25rem,calc((100vw-84rem)/2+3.5rem))] pt-2 pb-4 md:mt-16"
        >
          {featuredTastings.map((tasting, i) => (
            <li
              key={tasting.name}
              className="w-[78vw] shrink-0 snap-start sm:w-[46vw] lg:w-[22.5rem]"
            >
              <a href="#book" className="group block">
                <div className="rounded-card shadow-soft group-hover:shadow-lift relative aspect-[4/5] overflow-hidden transition-shadow duration-300 ease-[var(--ease-brand)]">
                  <PlaceholderImage
                    src={tasting.image.src}
                    alt={tasting.image.alt}
                    fill
                    sizes="(max-width: 640px) 78vw, (max-width: 1024px) 46vw, 22.5rem"
                    className="object-cover transition-transform duration-500 ease-[var(--ease-brand)] group-hover:scale-[1.06]"
                  />
                  <div className="from-olive-deep/95 via-olive-deep/25 absolute inset-0 bg-gradient-to-t to-transparent" />

                  <span className="text-cream/70 absolute top-5 left-5 font-mono text-xs tracking-[0.2em]">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <span className="bg-cream/90 text-olive absolute top-4 right-4 rounded-full px-3.5 py-1.5 text-[0.6875rem] font-semibold tracking-[0.12em] uppercase">
                    {tasting.duration}
                  </span>

                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <h3 className="display text-cream text-[1.6rem] leading-tight">
                      {tasting.name}
                    </h3>
                    <p className="text-cream/75 mt-2 max-w-[22ch] text-sm leading-relaxed">
                      {tasting.note}
                    </p>
                    <span className="bg-terracotta-soft mt-4 block h-px w-10 origin-left transition-transform duration-400 ease-[var(--ease-brand)] group-hover:scale-x-[3.5]" />
                  </div>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
