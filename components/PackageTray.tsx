"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { usePackage } from "./PackageProvider";

/**
 * Slim sticky summary of the current package.
 *
 * It only exists once something has been added, and it stands down as the
 * package section scrolls into view — the tray and the section are the same
 * information, so showing both at once would read as a duplicate. Crossfading
 * on that boundary is what makes the tray feel like it expands into the
 * section rather than being swapped out for it.
 */
export default function PackageTray() {
  const { tasting, table, count } = usePackage();
  const [sectionInView, setSectionInView] = useState(false);

  useEffect(() => {
    const section = document.getElementById("book");
    if (!section || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      ([entry]) => setSectionInView(entry.isIntersecting),
      { rootMargin: "-35% 0px -10% 0px" },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const visible = count > 0 && !sectionInView;
  const items = [tasting, table].filter(Boolean) as NonNullable<
    typeof tasting
  >[];

  return (
    <div
      aria-hidden={!visible}
      className={`fixed inset-x-0 bottom-0 z-40 flex justify-center px-4 pb-4 transition-all duration-400 ease-[var(--ease-brand)] sm:pb-6 ${
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-6 opacity-0"
      }`}
    >
      <div className="bg-olive-deep/95 text-cream shadow-lift flex w-full max-w-3xl items-center gap-4 rounded-full py-2.5 pr-2.5 pl-4 backdrop-blur-md sm:gap-5 sm:pl-5">
        <div className="flex -space-x-3">
          {items.map((item) => (
            <span
              key={item.kind}
              className="border-olive-deep relative h-10 w-10 overflow-hidden rounded-full border-2"
            >
              <Image
                src={item.image.src}
                alt=""
                fill
                sizes="40px"
                data-placeholder="true"
                className="object-cover"
              />
            </span>
          ))}
        </div>

        <div className="min-w-0 flex-1">
          <p className="truncate text-[0.8125rem] font-medium">
            {items.map((i) => i.name).join("  +  ")}
          </p>
          <p className="text-cream/55 truncate text-[0.6875rem] tracking-[0.06em]">
            {items.map((i) => i.priceLabel).join("  ·  ")}
          </p>
        </div>

        <a
          href="#book"
          className="btn btn-terracotta shrink-0 px-5 py-2.5 text-[0.8125rem]"
        >
          View &amp; Send
        </a>
      </div>
    </div>
  );
}
