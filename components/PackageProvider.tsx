"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import type { PlaceholderPhoto } from "@/lib/placeholders";

/**
 * The package a guest is assembling: at most one tasting experience and at most
 * one networking table. Adding a second of either kind replaces the first
 * rather than stacking, which is the rule the client asked for.
 */
export type PackageKind = "tasting" | "table";

export type PackageItem = {
  kind: PackageKind;
  name: string;
  /** Headline price, e.g. "$5,000 base · up to 30 guests". */
  priceLabel: string;
  /** Secondary price line, e.g. "+$125 per guest after". */
  priceNote?: string;
  image: PlaceholderPhoto;
};

type PackageState = {
  tasting: PackageItem | null;
  table: PackageItem | null;
  /** True when this exact item is the current pick for its kind. */
  isSelected: (kind: PackageKind, name: string) => boolean;
  /** Adds, replaces, or clears if the same item is added twice. */
  toggle: (item: PackageItem) => void;
  remove: (kind: PackageKind) => void;
  count: number;
};

const PackageContext = createContext<PackageState | null>(null);

export function usePackage() {
  const ctx = useContext(PackageContext);
  if (!ctx) throw new Error("usePackage must be used inside PackageProvider");
  return ctx;
}

export default function PackageProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [tasting, setTasting] = useState<PackageItem | null>(null);
  const [table, setTable] = useState<PackageItem | null>(null);

  const toggle = useCallback((item: PackageItem) => {
    const set = item.kind === "tasting" ? setTasting : setTable;
    set((prev) => (prev?.name === item.name ? null : item));
  }, []);

  const remove = useCallback((kind: PackageKind) => {
    (kind === "tasting" ? setTasting : setTable)(null);
  }, []);

  const value = useMemo<PackageState>(
    () => ({
      tasting,
      table,
      isSelected: (kind, name) =>
        (kind === "tasting" ? tasting : table)?.name === name,
      toggle,
      remove,
      count: (tasting ? 1 : 0) + (table ? 1 : 0),
    }),
    [tasting, table, toggle, remove],
  );

  return (
    <PackageContext.Provider value={value}>{children}</PackageContext.Provider>
  );
}
