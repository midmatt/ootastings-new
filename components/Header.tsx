"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

/**
 * Single-page build: every nav item is an in-page anchor. Plain <a> is used
 * rather than next/link so the browser handles the jump natively — that keeps
 * `scroll-behavior: smooth` and each section's `scroll-margin-top` in play.
 * These become real routes once /tastings, /our-story etc. exist.
 */
const NAV_LINKS = [
  { label: "Tastings", href: "#tastings" },
  { label: "Our Story", href: "#story" },
  { label: "Private Events", href: "#private-events" },
  { label: "Visit Us", href: "#visit" },
];

/** No /book route exists yet, so the CTA lands on the booking/enquiry block. */
const BOOK_HREF = "#book";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const solid = scrolled || menuOpen;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-300 ease-[var(--ease-brand)] ${
          solid
            ? "bg-cream/95 shadow-[0_1px_0_0_rgba(55,69,21,0.12)] backdrop-blur-md"
            : "bg-transparent"
        }`}
      >
        <div className="shell">
          <div
            className={`flex items-center justify-between transition-all duration-300 ease-[var(--ease-brand)] ${
              solid ? "h-[74px] md:h-[80px]" : "h-[86px] md:h-[104px]"
            }`}
          >
            {/* Logo */}
            <Link
              href="/"
              aria-label="OOT Tastings — home"
              className="relative block shrink-0 transition-opacity duration-200 hover:opacity-80"
            >
              <span
                className={`relative block transition-all duration-300 ease-[var(--ease-brand)] ${
                  solid
                    ? "h-[44px] w-[42px] md:h-[52px] md:w-[50px]"
                    : "h-[52px] w-[50px] md:h-[64px] md:w-[62px]"
                }`}
              >
                <Image
                  src="/logo-olive.png"
                  alt="OOT Tastings"
                  fill
                  priority
                  sizes="64px"
                  className={`object-contain transition-opacity duration-300 ${
                    solid ? "opacity-100" : "opacity-0"
                  }`}
                />
                <Image
                  src="/logo-cream.png"
                  alt=""
                  aria-hidden="true"
                  fill
                  priority
                  sizes="64px"
                  className={`object-contain transition-opacity duration-300 ${
                    solid ? "opacity-0" : "opacity-100"
                  }`}
                />
              </span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden items-center gap-9 lg:flex">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className={`group relative text-[0.9rem] font-medium tracking-[0.01em] transition-colors duration-200 ${
                    solid ? "text-olive" : "text-cream"
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute -bottom-1.5 left-0 h-px w-full origin-left scale-x-0 transition-transform duration-300 ease-[var(--ease-brand)] group-hover:scale-x-100 ${
                      solid ? "bg-terracotta" : "bg-terracotta-soft"
                    }`}
                  />
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <a
                href={BOOK_HREF}
                className="btn btn-md btn-terracotta hidden sm:inline-flex"
              >
                Book a Tasting
              </a>

              {/* Mobile menu toggle */}
              <button
                type="button"
                onClick={() => setMenuOpen((v) => !v)}
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                aria-expanded={menuOpen}
                className={`flex h-11 w-11 items-center justify-center rounded-full border transition-colors duration-200 lg:hidden ${
                  solid
                    ? "border-olive/25 text-olive"
                    : "border-cream/40 text-cream"
                }`}
              >
                <span className="relative block h-3 w-4.5">
                  <span
                    className={`absolute left-0 block h-px w-full bg-current transition-all duration-300 ease-[var(--ease-brand)] ${
                      menuOpen ? "top-1.5 rotate-45" : "top-0"
                    }`}
                  />
                  <span
                    className={`absolute left-0 block h-px w-full bg-current transition-all duration-300 ease-[var(--ease-brand)] ${
                      menuOpen ? "top-1.5 -rotate-45" : "top-3"
                    }`}
                  />
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-40 lg:hidden ${
          menuOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
        aria-hidden={!menuOpen}
      >
        <div
          className={`grain bg-olive absolute inset-0 transition-opacity duration-400 ease-[var(--ease-brand)] ${
            menuOpen ? "opacity-100" : "opacity-0"
          }`}
        />
        <nav className="relative flex h-full flex-col justify-center px-8 pt-24 pb-16">
          {NAV_LINKS.map((link, i) => (
            <a
              key={link.label}
              href={link.href}
              /* close the drawer as soon as a link is tapped */
              onClick={() => setMenuOpen(false)}
              className={`display text-cream border-cream/15 border-b py-5 text-[2.1rem] transition-all duration-500 ease-[var(--ease-brand)] ${
                menuOpen
                  ? "translate-y-0 opacity-100"
                  : "translate-y-4 opacity-0"
              }`}
              style={{ transitionDelay: menuOpen ? `${120 + i * 60}ms` : "0ms" }}
            >
              {link.label}
            </a>
          ))}
          <a
            href={BOOK_HREF}
            onClick={() => setMenuOpen(false)}
            className={`btn btn-lg btn-terracotta mt-10 self-start transition-all duration-500 ease-[var(--ease-brand)] ${
              menuOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
            style={{ transitionDelay: menuOpen ? "380ms" : "0ms" }}
          >
            Book a Tasting
          </a>
        </nav>
      </div>
    </>
  );
}
