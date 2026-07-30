"use client";

import { useCallback, useState } from "react";
import BriefAffordance from "./BriefAffordance";
import ExpandedDetail from "./ExpandedDetail";
import PlaceholderImage from "./PlaceholderImage";
import Reveal from "./Reveal";
import {
  networkingExperiences,
  optionalEnhancements,
} from "@/lib/placeholders";

/**
 * Enhanced Networking Experiences — three package cards over a quieter
 * reference list of optional enhancements.
 *
 * The "+" brief is the same component the Featured Tasting Experiences carousel
 * uses, so both sections read and behave the same; here it sits inside each
 * card's image tile, which makes that tile's rendered width the brief's width.
 */
export default function ExperienceGrid() {
  const [openId, setOpenId] = useState<number | null>(null);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const expandedItem =
    expandedId === null ? null : networkingExperiences[expandedId];
  const closeExpanded = useCallback(() => setExpandedId(null), []);

  return (
    <section
      id="tastings"
      className="bg-cream anchor-offset relative isolate overflow-hidden"
    >
      <div className="grain absolute inset-0" />
      <div className="section-pad shell relative">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Reveal className="max-w-2xl">
            <p className="eyebrow text-terracotta mb-5">The Tasting Room</p>
            <h2 className="display text-olive text-[clamp(2.1rem,5.5vw,4.25rem)] uppercase">
              Pick your table
            </h2>
          </Reveal>
          <Reveal delay={100} className="max-w-sm">
            <p className="text-ink/65 text-[0.9375rem] leading-relaxed">
              {/* TODO: client copy needed */}
              Three ways to bring a room together — styled, hosted, and built
              around the table rather than the queue at the bar.
            </p>
          </Reveal>
        </div>

        <div className="relative mt-14 grid">
          {/* click-outside target while the detail panel is open */}
          <button
            type="button"
            tabIndex={-1}
            aria-label="Close details"
            onClick={closeExpanded}
            className={`bg-olive-deep/45 absolute inset-x-[-50vw] -inset-y-[200vh] z-20 cursor-default transition-opacity duration-300 ${
              expandedItem ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
          />

          <ul
            className={`col-start-1 row-start-1 grid grid-cols-1 gap-x-6 gap-y-12 transition-opacity duration-340 ease-[var(--ease-brand)] sm:grid-cols-2 lg:grid-cols-3 ${
              expandedItem ? "pointer-events-none opacity-15" : ""
            }`}
          >
          {networkingExperiences.map((item, i) => (
            <Reveal as="li" key={item.name} delay={(i % 3) * 90}>
              <div className="group">
                <div
                  role="button"
                  tabIndex={0}
                  aria-expanded={expandedId === i}
                  onClick={() => setExpandedId(i)}
                  onKeyDown={(e) => {
                    if (e.key !== "Enter" && e.key !== " ") return;
                    e.preventDefault();
                    setExpandedId(i);
                  }}
                  className="rounded-tile shadow-soft group-hover:shadow-lift relative aspect-[4/5] cursor-pointer overflow-hidden transition-shadow duration-300 ease-[var(--ease-brand)]"
                >
                  <PlaceholderImage
                    src={item.image.src}
                    alt={item.image.alt}
                    fill
                    sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
                    className="object-cover transition-transform duration-600 ease-[var(--ease-brand)] group-hover:scale-[1.06]"
                  />
                  <div className="from-olive-deep/45 absolute inset-0 bg-gradient-to-t via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                  {/* No duration badge: none was supplied for these packages. */}
                  <BriefAffordance
                    name={item.name}
                    brief={item.brief}
                    open={openId === i}
                    setOpen={(fn) => setOpenId(fn(openId === i) ? i : null)}
                    enabled
                  />
                </div>

                <div className="mt-5 flex items-baseline justify-between gap-4">
                  <h3 className="display text-olive text-[1.35rem] leading-tight">
                    {item.name}
                  </h3>
                  <span className="text-terracotta shrink-0 text-[0.9375rem] font-semibold">
                    {item.price}
                  </span>
                </div>
                <p className="text-ink/45 mt-2 text-[0.6875rem] tracking-[0.16em] uppercase">
                  {item.tag}
                </p>
              </div>
            </Reveal>
          ))}
          </ul>

          {/* ---------- expanded detail panel ---------- */}
          {expandedItem && (
            <ExpandedDetail
              open
              onClose={closeExpanded}
              image={expandedItem.image}
              index={expandedId!}
              name={expandedItem.name}
              brief={expandedItem.brief}
              className="col-start-1 row-start-1 justify-self-center self-center"
            >
              <p className="eyebrow text-terracotta">
                Enhanced Networking Experience
              </p>

              <h3 className="display text-olive mt-3 text-[clamp(1.75rem,3.4vw,2.9rem)] leading-[1.05] sm:mt-4">
                {expandedItem.name}
              </h3>
              <p className="text-olive/60 mt-2 font-[family-name:var(--font-fraunces)] text-[1rem] italic">
                {expandedItem.tag}
              </p>

              <div className="border-olive/12 mt-5 flex flex-wrap items-baseline gap-x-3 border-y py-3.5 sm:mt-6 sm:py-4">
                <span className="display text-terracotta text-[1.75rem] leading-none">
                  {expandedItem.price.split(" per ")[0]}
                </span>
                <span className="text-olive/60 text-[0.75rem] font-semibold tracking-[0.14em] uppercase">
                  per guest
                </span>
              </div>

              <p className="text-ink/70 mt-5 max-w-xl text-[0.875rem] leading-[1.7] sm:mt-6 sm:text-[0.9375rem] sm:leading-[1.75]">
                {expandedItem.brief.summary}
              </p>

              {/* the expanded view carries the complete list, unlike the brief */}
              <dl className="mt-6 grid gap-x-8 gap-y-4 sm:grid-cols-2">
                <div>
                  <dt className="text-olive/45 text-[0.625rem] font-semibold tracking-[0.16em] uppercase">
                    Led by
                  </dt>
                  <dd className="text-ink/70 mt-1 text-[0.8125rem] leading-snug">
                    {expandedItem.brief.lead}
                  </dd>
                </div>
                <div>
                  <dt className="text-olive/45 text-[0.625rem] font-semibold tracking-[0.16em] uppercase">
                    Ideal for
                  </dt>
                  <dd className="text-ink/70 mt-1 text-[0.8125rem] leading-snug">
                    {expandedItem.brief.idealFor}
                  </dd>
                </div>
                <div className="sm:col-span-2">
                  <dt className="text-olive/45 text-[0.625rem] font-semibold tracking-[0.16em] uppercase">
                    Includes
                  </dt>
                  <dd className="text-ink/70 mt-1 text-[0.8125rem] leading-snug">
                    {expandedItem.includesFull}
                  </dd>
                </div>
              </dl>

              <div className="mt-6 flex flex-wrap items-center gap-4 sm:mt-8">
                <a href="#book" className="btn btn-lg btn-terracotta">
                  Reserve this table
                </a>
              </div>
            </ExpandedDetail>
          )}
        </div>

        {/* ---------- optional enhancements ---------- */}
        <Reveal>
          <div className="border-olive/12 mt-20 border-t pt-14 md:mt-24">
            <h3 className="display text-olive text-[clamp(1.4rem,2.6vw,2rem)] uppercase">
              Optional Enhancements
            </h3>

            <div className="mt-10 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
              {optionalEnhancements.map((group) => (
                <div key={group.group}>
                  <p className="eyebrow text-terracotta mb-4">{group.group}</p>
                  <ul>
                    {group.items.map((item) => (
                      <li
                        key={item.label}
                        className="border-olive/10 flex items-baseline justify-between gap-4 border-b py-2.5 last:border-0"
                      >
                        <span className="text-ink/70 text-[0.8125rem] leading-snug">
                          {item.label}
                          {item.note && (
                            <span className="text-ink/40 mt-0.5 block text-[0.6875rem]">
                              {item.note}
                            </span>
                          )}
                        </span>
                        <span className="text-olive shrink-0 text-[0.8125rem] font-medium">
                          {item.price}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="mt-16 flex justify-center">
            <a href="#featured" className="btn btn-lg btn-outline-olive">
              Explore All Tastings
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
