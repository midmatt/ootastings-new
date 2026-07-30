import Image from "next/image";
import Link from "next/link";

const UTILITY_LINKS = [
  { label: "Our Story", href: "#story" },
  { label: "Private Events", href: "#private-events" },
  { label: "Visit Us", href: "#visit" },
  { label: "Contact", href: "#contact" },
];

const SOCIALS = [
  {
    label: "Instagram",
    href: "https://instagram.com",
    path: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </>
    ),
  },
  {
    label: "Facebook",
    href: "https://facebook.com",
    path: (
      <path d="M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.5-1.5H16.6V4.4A20 20 0 0 0 14.4 4.3c-2.2 0-3.7 1.3-3.7 3.9v2.3H8v3h2.7V21z" />
    ),
  },
  {
    label: "Email",
    href: "mailto:hello@ootastings.com",
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

          {/* Nav target: Visit Us */}
          <div id="visit" className="anchor-offset">
            <p className="eyebrow text-terracotta-soft mb-4">Visit Us</p>
            {/* TODO: client copy needed — real address, hours and directions. */}
            <p className="text-cream/70 text-sm leading-relaxed">
              The Tasting Room
              <br />
              Address line one
              <br />
              Address line two
            </p>
            <p className="text-cream/45 mt-3 text-sm leading-relaxed">
              Wed–Sun, 11:00–19:00
              <br />
              Tastings by reservation
            </p>
          </div>

          {/* Nav target: Private Events */}
          <div id="private-events" className="anchor-offset">
            <p className="eyebrow text-terracotta-soft mb-4">Private Events</p>
            <p className="text-cream/70 max-w-[30ch] text-sm leading-relaxed">
              Group tastings, corporate tables and long-table dinners for up to
              fourteen guests.
            </p>
            <a
              href="#book"
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
          <nav className="flex flex-wrap gap-x-8 gap-y-3">
            {UTILITY_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-cream/70 hover:text-cream text-sm transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
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
      </div>
    </footer>
  );
}
