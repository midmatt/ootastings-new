import Link from "next/link";
import PlaceholderImage from "./PlaceholderImage";
import Reveal from "./Reveal";
import { instagramTiles } from "@/lib/placeholders";

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

export default function InstagramStrip() {
  return (
    <section className="bg-linen relative isolate overflow-hidden">
      <div className="grain absolute inset-0" />
      <div className="shell relative py-[clamp(3.5rem,7vw,6rem)]">
        <Reveal className="flex flex-wrap items-center justify-between gap-4">
          <Link
            href="https://instagram.com"
            className="group text-olive inline-flex items-center gap-3"
          >
            <InstagramGlyph className="h-5 w-5" />
            <span className="display text-[1.35rem] md:text-[1.6rem]">
              Follow @ootastings on Instagram
            </span>
          </Link>
          <span className="eyebrow text-ink/40">Straight from the grove</span>
        </Reveal>

        <ul className="mt-8 grid grid-cols-3 gap-3 sm:grid-cols-6 md:mt-10 md:gap-4">
          {instagramTiles.map((tile, i) => (
            <Reveal as="li" key={tile.src} delay={i * 60}>
              <Link
                href="https://instagram.com"
                className="group rounded-tile relative block aspect-square overflow-hidden"
                aria-label="View on Instagram"
              >
                <PlaceholderImage
                  src={tile.src}
                  alt={tile.alt}
                  fill
                  sizes="(max-width: 640px) 30vw, 15vw"
                  className="object-cover transition-transform duration-500 ease-[var(--ease-brand)] group-hover:scale-[1.08]"
                />
                <span className="bg-olive/0 group-hover:bg-olive/55 absolute inset-0 flex items-center justify-center transition-colors duration-300">
                  <InstagramGlyph className="text-cream h-6 w-6 scale-75 opacity-0 transition-all duration-300 ease-[var(--ease-brand)] group-hover:scale-100 group-hover:opacity-100" />
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
