import Image from "next/image";
import Link from "next/link";
import { INSTAGRAM_URL } from "./InstagramStrip";
import { PARENT_ORG } from "@/lib/seo";

/**
 * The same destinations the header carries, plus the booking section and the
 * legal page. "Contact" is not repeated here — this row sits inside the footer,
 * which is itself #contact. Hash links are rooted at "/" so they still resolve
 * from a real route such as /legal; `route` marks entries that are pages rather
 * than anchors.
 */
const UTILITY_LINKS = [
  { label: "Our Story", href: "/#mission" },
  { label: "Tastings", href: "/#featured" },
  { label: "Tables", href: "/#tables" },
  { label: "Build Your Package", href: "/#book" },
  { label: "Legal", href: "/legal", route: true },
];

const CONTACT_EMAIL = "info@ootastings.com";
const CONTACT_PHONE = "305.900.7092";

const SOCIALS = [
  {
    label: "Instagram",
    href: INSTAGRAM_URL,
    path: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </>
    ),
  },
  {
    label: "Email",
    href: `mailto:${CONTACT_EMAIL}`,
    path: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="3" />
        <path d="m4 7 8 6 8-6" />
      </>
    ),
  },
];

export default function Footer() {
  return (
    <footer
      id="contact"
      className="bg-olive-deep text-cream anchor-offset relative isolate overflow-hidden"
    >
      <div className="grain absolute inset-0" />

      <div className="shell relative pt-[clamp(3.5rem,7vw,6rem)] pb-10">
        <div className="grid gap-12 md:grid-cols-3 md:items-start md:gap-16">
          <div>
            <Link href="/" aria-label="OOT Tastings — home" className="block">
              <Image
                src="/logo-cream.png"
                alt="OOT Tastings"
                width={78}
                height={81}
                className="h-auto w-[72px] opacity-95 md:w-[84px]"
              />
            </Link>
            <p className="text-cream/55 mt-5 max-w-[26ch] text-sm leading-relaxed">
              Guided olive oil tastings, flights and pairings — poured by the
              people who source them.
            </p>
          </div>

          {/* The footer is the page's #contact target, so it carries the real
              contact details. (The old Visit Us block was placeholder address
              lines; it comes back when there is an address to put in it.) */}
          <div>
            <p className="eyebrow text-terracotta-soft mb-4">Get in Touch</p>
            <p className="text-cream/70 max-w-[34ch] text-sm leading-relaxed">
              Tastings are booked by inquiry — give us the date and the room, and
              we&rsquo;ll craft the full drizzle-driven experience around it.
            </p>
            <ul className="mt-4 space-y-1.5 text-sm">
              <li>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="text-cream/70 hover:text-cream transition-colors duration-200"
                >
                  {CONTACT_EMAIL}
                </a>
              </li>
              <li>
                <a
                  href={`tel:+1${CONTACT_PHONE.replace(/\D/g, "")}`}
                  className="text-cream/70 hover:text-cream transition-colors duration-200"
                >
                  {CONTACT_PHONE}
                </a>
              </li>
            </ul>
          </div>

          {/* Nav target: Private Events */}
          <div id="private-events" className="anchor-offset">
            <p className="eyebrow text-terracotta-soft mb-4">Private Events</p>
            <p className="text-cream/70 max-w-[34ch] text-sm leading-relaxed">
              Group tastings, corporate connection tables, and
              swirl-and-drizzle networking experiences crafted for all event
              formats and team-building engagements.
            </p>
            <a
              href="/#book"
              className="text-cream group mt-4 inline-flex items-center gap-2 text-sm font-medium"
            >
              Enquire about a private tasting
              <span className="transition-transform duration-300 ease-[var(--ease-brand)] group-hover:translate-x-1">
                →
              </span>
            </a>
          </div>
        </div>

        <div className="border-cream/12 mt-14 flex flex-wrap items-center justify-between gap-6 border-t pt-8">
          <nav aria-label="Footer" className="flex flex-wrap gap-x-8 gap-y-3">
            {UTILITY_LINKS.map((link) => {
              const className =
                "text-cream/70 hover:text-cream text-sm transition-colors duration-200";
              return link.route ? (
                <Link key={link.label} href={link.href} className={className}>
                  {link.label}
                </Link>
              ) : (
                <a key={link.label} href={link.href} className={className}>
                  {link.label}
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            {SOCIALS.map((social) => (
              <Link
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="border-cream/20 text-cream/70 hover:border-cream/60 hover:text-cream flex h-11 w-11 items-center justify-center rounded-full border transition-colors duration-200"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-[18px] w-[18px]"
                  aria-hidden="true"
                >
                  {social.path}
                </svg>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-cream/45 text-xs tracking-[0.14em] uppercase">
            © OOT Tastings 2026
          </p>
          <p className="text-cream/45 text-xs tracking-[0.14em] uppercase">
            Sip. Swirl. Taste the Grove.
          </p>
        </div>

        {/*
          Parent-company attribution. Deliberately sentence case and un-tracked,
          unlike the uppercase brand lines above it — that reads as a corporate
          footnote rather than a second brand mark, which is the point: a
          credibility signal, not co-branding. No JoVell logo or colours here.
        */}
        <p className="text-cream/50 mt-6 text-[0.6875rem] leading-relaxed">
          OOT Tastings is a {PARENT_ORG} company.
        </p>

        <div className="border-cream/10 mt-8 flex items-center gap-3 border-t pt-6">
          <span className="text-cream/45 text-[0.6875rem] tracking-[0.14em] uppercase">
            Site made by
          </span>
          <a
            href="https://mvella.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="MVella Studios — opens mvella.com"
            className="opacity-90 transition-opacity duration-200 hover:opacity-100"
          >
            <Image
              src="/mvella-studios.png"
              alt="MVella Studios"
              width={120}
              height={120}
              className="h-9 w-9 rounded-sm object-cover sm:h-10 sm:w-10"
            />
          </a>
        </div>
      </div>
    </footer>
  );
}
