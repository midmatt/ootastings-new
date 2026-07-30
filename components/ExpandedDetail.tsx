"use client";

import { useEffect, useRef, useState } from "react";
import BriefAffordance, { type Brief } from "./BriefAffordance";
import PlaceholderImage from "./PlaceholderImage";
import type { PlaceholderPhoto } from "@/lib/placeholders";

/**
 * The expanded detail view shared by the Featured Tasting Experiences carousel
 * and the networking package grid: a wide cream panel with the photograph on
 * one side and the copy on the other, a close X, and the same "+" brief that
 * sits on the cards.
 *
 * The parent owns placement (both drop it into a grid cell over their cards),
 * the dimmed backdrop, and open state; everything inside the panel — including
 * Escape-to-close and scrolling the panel into frame — lives here so the two
 * sections cannot drift apart.
 */
export default function ExpandedDetail({
  open,
  onClose,
  image,
  index,
  badge,
  name,
  brief,
  className = "",
  children,
}: {
  open: boolean;
  onClose: () => void;
  image: PlaceholderPhoto;
  index: number;
  /** Small pill on the photo, phone layout only (e.g. a duration). */
  badge?: string;
  name: string;
  brief: Brief;
  className?: string;
  children: React.ReactNode;
}) {
  const panel = useRef<HTMLDivElement>(null);
  const [infoOpen, setInfoOpen] = useState(false);

  // Bring the panel into frame, leaving room for the sticky header and the
  // panel's own close button.
  useEffect(() => {
    if (!open || !panel.current) return;
    const top = panel.current.getBoundingClientRect().top;
    window.scrollTo({ top: window.scrollY + top - 116, behavior: "smooth" });
  }, [open]);

  useEffect(() => {
    if (!open) return;
    setInfoOpen(false);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <div
      ref={panel}
      aria-hidden={!open}
      className={`z-40 w-[min(72rem,92vw)] transition-all duration-340 ease-[var(--ease-brand)] ${
        open ? "scale-100 opacity-100" : "pointer-events-none scale-95 opacity-0"
      } ${className}`}
    >
      <div className="bg-cream rounded-card shadow-lift relative grid max-h-[86vh] overflow-x-hidden overflow-y-auto md:max-h-none md:grid-cols-[minmax(0,44%)_1fr] md:overflow-hidden">
        <div className="relative h-44 sm:h-56 md:h-auto md:min-h-[30rem]">
          <PlaceholderImage
            src={image.src}
            alt={image.alt}
            fill
            sizes="(max-width: 768px) 92vw, 32rem"
            className="object-cover"
          />
          <div className="from-olive-deep/70 absolute inset-0 bg-gradient-to-t via-transparent to-transparent md:bg-gradient-to-r" />
          <span className="text-cream/85 absolute top-5 left-5 font-mono text-xs font-semibold tracking-[0.2em]">
            {String(index + 1).padStart(2, "0")}
          </span>
          {badge && (
            <span className="bg-cream/90 text-olive absolute top-4 right-4 rounded-full px-3.5 py-1.5 text-[0.6875rem] font-semibold tracking-[0.12em] uppercase md:hidden">
              {badge}
            </span>
          )}
        </div>

        <div className="relative flex flex-col p-6 pb-20 sm:p-10 sm:pb-24 lg:p-12 lg:pb-24">
          {children}
        </div>

        <BriefAffordance
          name={name}
          brief={brief}
          open={infoOpen}
          setOpen={setInfoOpen}
          enabled={open}
          tone="on-cream"
          panelClass="right-0 w-[min(34rem,100%)]"
        />
      </div>

      <button
        type="button"
        onClick={onClose}
        aria-label="Close expanded card"
        tabIndex={open ? 0 : -1}
        className="bg-cream text-olive absolute -top-4 -right-4 z-50 flex h-11 w-11 items-center justify-center rounded-full text-xl leading-none shadow-lg transition-transform duration-250 ease-[var(--ease-brand)] hover:scale-110"
      >
        ×
      </button>
    </div>
  );
}
