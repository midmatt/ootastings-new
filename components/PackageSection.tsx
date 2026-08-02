"use client";

import { useState } from "react";
import Image from "next/image";
import { usePackage, type PackageItem } from "./PackageProvider";

type Status = "idle" | "sending" | "sent" | "error";

const FIELD =
  "border-olive/15 focus:border-olive/45 text-ink placeholder:text-ink/35 w-full rounded-2xl border bg-white/60 px-4 py-3 text-[0.9375rem] outline-none transition-colors duration-200";
const LABEL =
  "text-olive/55 mb-1.5 block text-[0.6875rem] font-semibold tracking-[0.16em] uppercase";

export default function PackageSection() {
  const { tasting, table, count, remove } = usePackage();
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const items = [tasting, table].filter(Boolean) as PackageItem[];

  const summaryCard = (item: PackageItem) => (
    <li
      key={item.kind}
      className="border-olive/12 flex items-center gap-4 rounded-2xl border bg-white/50 p-3"
    >
      <span className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl">
        <Image
          src={item.image.src}
          alt=""
          fill
          sizes="64px"
          data-placeholder="true"
          className="object-cover"
        />
      </span>
      <span className="min-w-0 flex-1">
        <span className="text-olive/45 block text-[0.625rem] font-semibold tracking-[0.16em] uppercase">
          {item.kind === "tasting" ? "Tasting experience" : "Networking table"}
        </span>
        <span className="display text-olive block text-[1.05rem] leading-tight">
          {item.name}
        </span>
        <span className="text-terracotta block text-[0.8125rem] font-semibold">
          {item.priceLabel}
          {item.priceNote && (
            <span className="text-ink/45 ml-2 font-normal">
              {item.priceNote}
            </span>
          )}
        </span>
      </span>
      <button
        type="button"
        onClick={() => remove(item.kind)}
        aria-label={`Remove ${item.name} from your package`}
        className="border-olive/15 text-olive/50 hover:border-olive/40 hover:text-olive flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-sm transition-colors duration-200"
      >
        ×
      </button>
    </li>
  );

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const payload = {
      name: String(data.get("name") ?? "").trim(),
      company: String(data.get("company") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
      phone: String(data.get("phone") ?? "").trim(),
      timeframe: String(data.get("timeframe") ?? "").trim(),
      guests: String(data.get("guests") ?? "").trim(),
      location: String(data.get("location") ?? "").trim(),
      message: String(data.get("message") ?? "").trim(),
      // Carried along so OOT gets the context without the guest retyping it.
      selection: items.map((i) => ({
        kind: i.kind,
        name: i.name,
        price: [i.priceLabel, i.priceNote].filter(Boolean).join(" "),
      })),
    };

    const errs: Record<string, string> = {};
    if (!payload.name) errs.name = "Please add your name.";
    if (!payload.company) errs.company = "Please add your company or organization.";
    if (!payload.email) errs.email = "Please add an email address.";
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(payload.email))
      errs.email = "That email address doesn't look right.";
    if (!payload.message) errs.message = "Please tell us a little about it.";
    setFieldErrors(errs);
    if (Object.keys(errs).length) return;

    setStatus("sending");
    setError(null);
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(body?.error ?? "Something went wrong.");
      setStatus("sent");
    } catch (err) {
      setStatus("error");
      setError(
        err instanceof Error ? err.message : "Something went wrong sending it.",
      );
    }
  }

  return (
    <section
      id="book"
      className="bg-cream anchor-offset relative isolate overflow-hidden"
    >
      <div className="grain absolute inset-0" />
      <div className="section-pad shell relative">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,42%)_1fr] lg:gap-16">
          {/* ---------------- package summary ---------------- */}
          <div>
            <p className="eyebrow text-terracotta mb-5">Your Package</p>
            <h2 className="display text-olive text-[clamp(2rem,4.6vw,3.4rem)] uppercase">
              Build your experience
            </h2>

            {count > 0 ? (
              <>
                <p className="text-ink/65 mt-5 max-w-md text-[0.9375rem] leading-relaxed">
                  Here&apos;s what you&apos;ve picked. Send it over and
                  we&apos;ll put together a quote around it.
                </p>
                <ul className="mt-8 space-y-3">{items.map(summaryCard)}</ul>
                <p className="text-ink/45 mt-4 text-[0.75rem] leading-relaxed">
                  Pricing shown is a starting point — final quotes depend on
                  guest count, location and enhancements.
                </p>
              </>
            ) : (
              <div className="border-olive/15 mt-8 rounded-2xl border border-dashed p-8">
                <p className="text-ink/70 text-[0.9375rem] leading-relaxed">
                  Nothing added yet. Pick a{" "}
                  <a
                    href="#featured"
                    className="text-olive underline decoration-terracotta/60 underline-offset-4"
                  >
                    tasting experience
                  </a>{" "}
                  and a{" "}
                  <a
                    href="#tables"
                    className="text-olive underline decoration-terracotta/60 underline-offset-4"
                  >
                    networking table
                  </a>{" "}
                  above to build your package — or just send us a message and
                  we&apos;ll help you shape it.
                </p>
              </div>
            )}
          </div>

          {/* ---------------- inquiry form ---------------- */}
          <div className="bg-linen rounded-card relative overflow-hidden p-6 sm:p-10">
            <span
              aria-hidden="true"
              className="bg-terracotta/10 absolute -top-24 -right-20 h-72 w-72 rounded-full blur-3xl"
            />

            {status === "sent" ? (
              <div className="relative py-10 text-center">
                <p className="eyebrow text-terracotta mb-4">Inquiry sent</p>
                <h3 className="display text-olive text-[1.9rem] leading-tight">
                  Thanks — we&apos;ll follow up within 1–2 business days.
                </h3>
                <p className="text-ink/60 mx-auto mt-4 max-w-sm text-[0.9375rem] leading-relaxed">
                  We&apos;ve got your package and your notes. If anything
                  changes in the meantime, just reply to our email.
                </p>
              </div>
            ) : (
              <form onSubmit={onSubmit} noValidate className="relative">
                <p className="eyebrow text-terracotta mb-5">Request a quote</p>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="pkg-name" className={LABEL}>
                      Name *
                    </label>
                    <input
                      id="pkg-name"
                      name="name"
                      className={FIELD}
                      placeholder="Your name"
                      aria-invalid={!!fieldErrors.name}
                    />
                    {fieldErrors.name && (
                      <p className="text-terracotta-deep mt-1.5 text-[0.75rem]">
                        {fieldErrors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="pkg-company" className={LABEL}>
                      Company Name *
                    </label>
                    <input
                      id="pkg-company"
                      name="company"
                      className={FIELD}
                      placeholder="Your company or organization"
                      aria-invalid={!!fieldErrors.company}
                    />
                    {fieldErrors.company && (
                      <p className="text-terracotta-deep mt-1.5 text-[0.75rem]">
                        {fieldErrors.company}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="pkg-email" className={LABEL}>
                      Email *
                    </label>
                    <input
                      id="pkg-email"
                      name="email"
                      type="email"
                      className={FIELD}
                      placeholder="you@email.com"
                      aria-invalid={!!fieldErrors.email}
                    />
                    {fieldErrors.email && (
                      <p className="text-terracotta-deep mt-1.5 text-[0.75rem]">
                        {fieldErrors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="pkg-phone" className={LABEL}>
                      Phone
                    </label>
                    <input
                      id="pkg-phone"
                      name="phone"
                      type="tel"
                      className={FIELD}
                      placeholder="Optional"
                    />
                  </div>

                  <div>
                    <label htmlFor="pkg-timeframe" className={LABEL}>
                      Preferred date or timeframe
                    </label>
                    <input
                      id="pkg-timeframe"
                      name="timeframe"
                      className={FIELD}
                      placeholder="e.g. late September, or flexible"
                    />
                  </div>

                  <div>
                    <label htmlFor="pkg-guests" className={LABEL}>
                      Estimated guests
                    </label>
                    <input
                      id="pkg-guests"
                      name="guests"
                      type="number"
                      min="1"
                      className={FIELD}
                      placeholder="Optional"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="pkg-location" className={LABEL}>
                      Venue or location
                    </label>
                    <input
                      id="pkg-location"
                      name="location"
                      className={FIELD}
                      placeholder="We come to you"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="pkg-message" className={LABEL}>
                      Message *
                    </label>
                    <textarea
                      id="pkg-message"
                      name="message"
                      rows={5}
                      className={`${FIELD} resize-y`}
                      placeholder="Tell us more about your event, timeline, or any questions you have"
                      aria-invalid={!!fieldErrors.message}
                    />
                    {fieldErrors.message && (
                      <p className="text-terracotta-deep mt-1.5 text-[0.75rem]">
                        {fieldErrors.message}
                      </p>
                    )}
                  </div>
                </div>

                {count > 0 && (
                  <p className="text-ink/45 mt-5 text-[0.75rem] leading-relaxed">
                    Your selected {items.map((i) => i.name).join(" and ")} will
                    be included with this message.
                  </p>
                )}

                {status === "error" && (
                  <p className="border-terracotta/30 bg-terracotta/8 text-terracotta-deep mt-5 rounded-2xl border px-4 py-3 text-[0.8125rem] leading-relaxed">
                    {error} You can also reach us directly at{" "}
                    <a href="mailto:hello@ootastings.com" className="underline">
                      hello@ootastings.com
                    </a>
                    .
                  </p>
                )}

                <div className="mt-7 flex flex-wrap items-center gap-4">
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="btn btn-lg btn-terracotta disabled:pointer-events-none disabled:opacity-60"
                  >
                    {status === "sending" ? "Sending…" : "Send Inquiry"}
                  </button>
                  <span className="text-ink/40 text-[0.75rem]">
                    We reply within 1–2 business days.
                  </span>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
