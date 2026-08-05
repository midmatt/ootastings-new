import Reveal from "./Reveal";
import { INSTAGRAM_URL } from "@/lib/seo";

export const INSTAGRAM_HANDLE = "@evootastings";

/**
 * Re-exported so existing importers (Footer) keep working, but the value is
 * defined once in lib/seo.ts — the same constant feeds `sameAs` in the
 * Organization schema, and the two must not be able to drift apart.
 */
export { INSTAGRAM_URL };

function InstagramGlyph({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

/**
 * A follow prompt rather than a feed.
 *
 * This deliberately shows no post thumbnails. Reading a real feed needs the
 * Instagram Graph API — an Instagram Business/Creator account, a Meta app and a
 * refreshed long-lived token — and until that exists any grid here would be
 * stock photography passed off as the account's posts.
 */
export default function InstagramStrip() {
  return (
    <section className="bg-linen relative isolate overflow-hidden">
      <div className="grain absolute inset-0" />
      <div className="shell relative py-[clamp(3.5rem,7vw,6rem)]">
        <Reveal className="flex flex-col items-center gap-8 text-center sm:flex-row sm:items-end sm:justify-between sm:text-left">
          <div>
            <p className="eyebrow text-terracotta mb-4">
              Straight from the grove
            </p>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noreferrer"
              className="group text-olive hover:text-terracotta inline-flex items-center gap-3 transition-colors duration-250 ease-[var(--ease-brand)]"
            >
              <InstagramGlyph className="h-6 w-6 shrink-0 md:h-7 md:w-7" />
              <span className="display text-[clamp(1.6rem,4.4vw,2.6rem)]">
                {INSTAGRAM_HANDLE}
              </span>
            </a>
          </div>

          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noreferrer"
            className="btn btn-md btn-olive shrink-0"
          >
            Follow on Instagram
          </a>
        </Reveal>
      </div>
    </section>
  );
}
