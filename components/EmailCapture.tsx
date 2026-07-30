"use client";

import { useState } from "react";

export default function EmailCapture() {
  const [submitted, setSubmitted] = useState(false);

  return (
    /* #book — the header CTA target until a real /book route exists. */
    <section
      id="book"
      className="bg-cream anchor-offset relative isolate overflow-hidden"
    >
      <div className="grain absolute inset-0" />
      <div className="section-pad shell relative">
        <div className="bg-linen rounded-card relative overflow-hidden px-6 py-14 md:px-16 md:py-20">
          <span
            aria-hidden="true"
            className="bg-terracotta/10 absolute -top-24 -right-20 h-72 w-72 rounded-full blur-3xl"
          />

          <div className="relative grid gap-10 md:grid-cols-2 md:items-center md:gap-16">
            <div>
              <p className="eyebrow text-terracotta mb-5">Members' Pour</p>
              <h2 className="display text-olive text-[clamp(1.9rem,4.4vw,3.2rem)] uppercase">
                Join the Tasting Club
              </h2>
              <p className="text-ink/65 mt-5 max-w-md text-[0.9375rem] leading-relaxed">
                First look at new harvest flights, member-only pours, and the
                occasional long table dinner. One email a month, no more.
              </p>
            </div>

            {/* UI only — no submission handler is wired up in this pass. */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
              className="w-full"
            >
              <div className="border-olive/15 focus-within:border-olive/40 flex flex-col gap-3 rounded-3xl border bg-white/60 p-3 transition-colors duration-200 sm:flex-row sm:items-center sm:rounded-full sm:p-2">
                <label htmlFor="tasting-club-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="tasting-club-email"
                  type="email"
                  required
                  placeholder="you@email.com"
                  className="text-ink placeholder:text-ink/35 min-w-0 flex-1 bg-transparent px-5 py-3.5 text-[0.9375rem] outline-none"
                />
                <button
                  type="submit"
                  className="btn btn-md btn-olive px-7 py-3.5"
                >
                  {submitted ? "You're on the list" : "Join the Club"}
                </button>
              </div>
              <p className="text-ink/40 mt-3 pl-5 text-xs">
                No spam. Unsubscribe any time.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
