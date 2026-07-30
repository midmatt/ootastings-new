"use client";

import { useEffect, useRef, useState } from "react";
import { usePackage, type PackageItem } from "./PackageProvider";

/**
 * The CTA inside an expanded card. Adds the item to the package, flashes a
 * confirmation, and then settles into a selected state so the guest can see
 * what is currently picked while they keep browsing.
 */
export default function AddToPackageButton({ item }: { item: PackageItem }) {
  const { isSelected, toggle } = usePackage();
  const selected = isSelected(item.kind, item.name);
  const [flash, setFlash] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );

  const label = flash
    ? "Added ✓"
    : selected
      ? "Added to package — remove"
      : "Add to Package";

  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        const adding = !selected;
        toggle(item);
        if (timer.current) clearTimeout(timer.current);
        if (adding) {
          setFlash(true);
          timer.current = setTimeout(() => setFlash(false), 1400);
        } else {
          setFlash(false);
        }
      }}
      aria-pressed={selected}
      className={`btn btn-lg transition-colors duration-250 ease-[var(--ease-brand)] ${
        selected || flash ? "btn-olive" : "btn-terracotta"
      }`}
    >
      {label}
    </button>
  );
}
