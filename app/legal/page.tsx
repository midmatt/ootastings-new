import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "Legal — OOT Tastings",
  description:
    "Privacy, terms, cancellation, cookies and accessibility for OOTastings and JoVell Hospitality Group.",
};

/**
 * /legal — the unified legal policy, linked from the footer.
 *
 * The page opens on an olive band rather than cream: the header is transparent
 * with cream type until it is scrolled, so a cream block at the top would hide
 * the nav entirely.
 */

const SECTIONS = [
  { id: "privacy", label: "Privacy Policy" },
  { id: "terms", label: "Terms & Conditions" },
  { id: "cancellation", label: "Cancellation & Refund Policy" },
  { id: "cookies", label: "Cookie Notice" },
  { id: "accessibility", label: "Accessibility Statement" },
  { id: "contact-legal", label: "Contact Us" },
];

export default function LegalPage() {
  return (
    <>
      <Header />
      <main>
        {/* ---------------- title band ---------------- */}
        <section className="bg-olive text-cream relative isolate overflow-hidden">
          <div className="grain absolute inset-0" />
          <div className="shell relative pt-[clamp(8rem,16vw,12rem)] pb-[clamp(3.5rem,7vw,6rem)]">
            <p className="eyebrow text-terracotta-soft mb-5">Legal</p>
            <h1 className="display text-[clamp(2.1rem,5.5vw,4.25rem)] uppercase">
              Unified Legal Policy
            </h1>
            <p className="text-cream/70 mt-6 text-[1.0625rem]">
              JoVell Hospitality Group · OOTastings
            </p>
            <p className="text-cream/45 mt-2 text-[0.75rem] tracking-[0.16em] uppercase">
              Last updated: August 2026
            </p>
          </div>
        </section>

        {/* ---------------- policy body ---------------- */}
        <section className="bg-cream relative isolate overflow-hidden">
          <div className="grain absolute inset-0" />
          <div className="section-pad shell relative">
            <div className="max-w-3xl">
              <p className="text-ink/70 text-[1.0625rem] leading-[1.75]">
                OOTastings (&ldquo;the Service&rdquo;) is a tasting experience
                created and operated by JoVell Hospitality Group
                (&ldquo;we,&rdquo; &ldquo;our,&rdquo; &ldquo;us&rdquo;). This
                Unified Legal Policy outlines how we collect and use
                information, the terms of using our website and services, our
                cancellation rules, cookie practices, and our commitment to
                accessibility.
              </p>
              <p className="text-ink/70 mt-5 text-[1.0625rem] leading-[1.75]">
                By using OOTastings.com or any JoVell Hospitality Group service,
                you agree to the policies described below.
              </p>

              {/* contents */}
              <nav
                aria-label="On this page"
                className="border-olive/12 mt-12 border-y py-7"
              >
                <p className="text-olive/55 mb-4 text-[0.6875rem] font-semibold tracking-[0.16em] uppercase">
                  On this page
                </p>
                <ol className="grid gap-x-10 gap-y-2.5 sm:grid-cols-2">
                  {SECTIONS.map((section, i) => (
                    <li key={section.id}>
                      <a
                        href={`#${section.id}`}
                        className="text-olive/75 hover:text-terracotta group inline-flex gap-3 text-[0.9375rem] transition-colors duration-200"
                      >
                        <span className="text-olive/35 font-mono text-[0.75rem] tabular-nums">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="group-hover:underline">
                          {section.label}
                        </span>
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>

              {/* ---------- 1. Privacy ---------- */}
              <Section n={1} id="privacy" title="Privacy Policy">
                <Heading>Information We Collect</Heading>
                <Body>We may collect the following information:</Body>
                <dl className="mt-5 space-y-5">
                  <Term
                    term="Personal Information"
                    detail="Name, email, phone number, company, and any details you provide when submitting an inquiry or booking a tasting."
                  />
                  <Term
                    term="Event Information"
                    detail="Dates, locations, group size, preferences, and logistical details needed to deliver your tasting or hospitality experience."
                  />
                  <Term
                    term="Technical Information"
                    detail="IP address, browser type, pages visited, and basic analytics used to improve website performance."
                  />
                </dl>

                <Heading>How We Use Your Information</Heading>
                <Body>We use your information to:</Body>
                <List
                  items={[
                    "Respond to inquiries",
                    "Provide quotes and proposals",
                    "Confirm and manage bookings",
                    "Deliver OOTastings and other JoVell Hospitality Group services",
                    "Improve our website and offerings",
                    "Send service-related updates (never spam)",
                  ]}
                />
                <Body>
                  We do not sell or share your information with third parties
                  for marketing.
                </Body>

                <Heading>How We Protect Your Information</Heading>
                <Body>
                  We use reasonable administrative, technical, and physical
                  safeguards to protect your data. While no system is perfect,
                  we take privacy seriously and work to secure your information.
                </Body>

                <Heading>Your Rights</Heading>
                <Body>
                  You may request to update, correct, or delete your personal
                  information at any time by contacting us.
                </Body>
              </Section>

              {/* ---------- 2. Terms ---------- */}
              <Section n={2} id="terms" title="Terms & Conditions">
                <Heading>Website Use</Heading>
                <Body>
                  All content on OOTastings.com is owned by JoVell Hospitality
                  Group. You may not reproduce or distribute any content without
                  written permission.
                </Body>

                <Heading>Booking & Payment</Heading>
                <List
                  items={[
                    "All tastings and hospitality services require a confirmed booking.",
                    "Pricing may vary based on group size, location, and customization.",
                    "Deposits may be required to secure your date.",
                    "Final payment terms will be outlined in your proposal or invoice.",
                  ]}
                />

                <Heading>Client Responsibilities</Heading>
                <Body>Clients are responsible for:</Body>
                <List
                  items={[
                    "Providing accurate event details",
                    "Ensuring venue access",
                    "Complying with local regulations",
                    "Providing alcoholic beverages when applicable",
                    "Covering travel fees, tolls, or parking when required",
                  ]}
                />

                <Heading>Liability</Heading>
                <Body>JoVell Hospitality Group is not liable for:</Body>
                <List
                  items={[
                    "Venue-related issues",
                    "Guest behavior",
                    "Damages caused by third-party vendors",
                    "Circumstances outside our control",
                  ]}
                />
                <Body>
                  Clients agree to maintain a safe environment for all guests
                  and staff.
                </Body>
              </Section>

              {/* ---------- 3. Cancellation ---------- */}
              <Section
                n={3}
                id="cancellation"
                title="Cancellation & Refund Policy"
              >
                <Heading>Tastings & Hospitality Experiences</Heading>
                <dl className="border-olive/12 divide-olive/12 mt-5 divide-y border-y">
                  <Tier when="14+ days before event" outcome="Full refund of deposit" />
                  <Tier when="7–13 days before event" outcome="50% refund of deposit" />
                  <Tier when="6 days or less" outcome="Deposit is non-refundable" />
                </dl>
                <Body>
                  Rescheduling is subject to availability and may incur
                  additional fees.
                </Body>

                <Heading>Custom Experiences</Heading>
                <Body>
                  Custom menus, curated pairings, or specialty items may be
                  non-refundable once purchased or prepared.
                </Body>
              </Section>

              {/* ---------- 4. Cookies ---------- */}
              <Section n={4} id="cookies" title="Cookie Notice">
                <Body className="mt-5">
                  Our website uses cookies to improve functionality and enhance
                  your browsing experience.
                </Body>

                <Heading>Types of Cookies Used</Heading>
                <List
                  items={[
                    "Essential cookies",
                    "Performance cookies",
                    "Functionality cookies",
                  ]}
                />
                <Body>
                  You may disable cookies in your browser settings. Some
                  features may not function properly without them.
                </Body>
              </Section>

              {/* ---------- 5. Accessibility ---------- */}
              <Section n={5} id="accessibility" title="Accessibility Statement">
                <Body className="mt-5">
                  JoVell Hospitality Group is committed to ensuring our website
                  is accessible to all users.
                </Body>
                <Body>
                  We strive to follow recognized accessibility standards and
                  continuously improve usability through:
                </Body>
                <List
                  items={[
                    "Clear, readable text",
                    "High-contrast design",
                    "Keyboard-friendly navigation",
                    "Descriptive alt text for images",
                  ]}
                />
                <Body>
                  If you need assistance accessing any part of our website,
                  contact us and we will provide the information in an
                  alternative format.
                </Body>
              </Section>

              {/* ---------- 6. Contact ---------- */}
              <Section n={6} id="contact-legal" title="Contact Us">
                <Body className="mt-5">
                  For questions about any policy or legal matter, please
                  contact:
                </Body>
                <div className="bg-linen/60 border-olive/10 mt-6 rounded-[1.25rem] border p-7">
                  <p className="display text-olive text-[1.35rem]">
                    JoVell Hospitality Group
                  </p>
                  <dl className="mt-4 space-y-2.5 text-[0.9375rem]">
                    <div className="flex flex-wrap gap-x-3">
                      <dt className="text-olive/50 w-16 shrink-0 text-[0.6875rem] font-semibold tracking-[0.16em] uppercase">
                        Email
                      </dt>
                      <dd>
                        <a
                          href="mailto:info@jovellhg.com"
                          className="text-terracotta hover:text-terracotta-deep underline underline-offset-4 transition-colors duration-200"
                        >
                          info@jovellhg.com
                        </a>
                      </dd>
                    </div>
                    <div className="flex flex-wrap gap-x-3">
                      <dt className="text-olive/50 w-16 shrink-0 text-[0.6875rem] font-semibold tracking-[0.16em] uppercase">
                        Phone
                      </dt>
                      <dd>
                        <a
                          href="tel:+13059007092"
                          className="text-terracotta hover:text-terracotta-deep underline underline-offset-4 transition-colors duration-200"
                        >
                          305.900.7092
                        </a>
                      </dd>
                    </div>
                  </dl>
                </div>
              </Section>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

/* ---------------------------------------------------------------
   Local building blocks — one place to keep the long-form rhythm
   --------------------------------------------------------------- */

function Section({
  n,
  id,
  title,
  children,
}: {
  n: number;
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="anchor-offset border-olive/12 mt-16 border-t pt-12">
      <div className="flex items-baseline gap-4">
        <span className="text-terracotta/70 font-mono text-[0.8125rem] font-semibold tabular-nums">
          {String(n).padStart(2, "0")}
        </span>
        <h2 className="display text-olive text-[clamp(1.5rem,3vw,2.15rem)]">
          {title}
        </h2>
      </div>
      {children}
    </section>
  );
}

function Heading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-olive mt-9 text-[0.75rem] font-semibold tracking-[0.16em] uppercase">
      {children}
    </h3>
  );
}

function Body({
  children,
  className = "mt-4",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p className={`text-ink/70 text-[0.9375rem] leading-[1.75] ${className}`}>
      {children}
    </p>
  );
}

function List({ items }: { items: string[] }) {
  return (
    <ul className="text-ink/70 mt-4 space-y-2.5 text-[0.9375rem] leading-[1.7]">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span
            aria-hidden="true"
            className="bg-terracotta/70 mt-2.5 h-1 w-1 shrink-0 rounded-full"
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function Term({ term, detail }: { term: string; detail: string }) {
  return (
    <div>
      <dt className="text-olive text-[0.9375rem] font-semibold">{term}</dt>
      <dd className="text-ink/70 mt-1 text-[0.9375rem] leading-[1.7]">
        {detail}
      </dd>
    </div>
  );
}

function Tier({ when, outcome }: { when: string; outcome: string }) {
  return (
    // Stacked on a phone: at that width some tiers wrap and some do not, which
    // reads as a broken table. The two-column split starts at sm.
    <div className="flex flex-col gap-y-1 py-3.5 sm:flex-row sm:flex-wrap sm:items-baseline sm:justify-between sm:gap-x-6">
      <dt className="text-olive text-[0.9375rem] font-semibold">{when}</dt>
      <dd className="text-ink/70 text-[0.9375rem]">{outcome}</dd>
    </div>
  );
}
