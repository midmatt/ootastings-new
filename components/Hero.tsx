import PlaceholderImage from "./PlaceholderImage";
import { heroImage } from "@/lib/placeholders";

export default function Hero() {
  return (
    <section className="relative isolate flex min-h-[100svh] flex-col justify-end overflow-hidden">
      {/* Full-bleed photography */}
      <div className="absolute inset-0 -z-20">
        <PlaceholderImage
          src={heroImage.src}
          alt={heroImage.alt}
          fill
          priority
          sizes="100vw"
          className="anim-drift object-cover"
        />
      </div>

      {/* Legibility + brand wash */}
      <div className="from-olive-deep/95 via-olive-deep/45 absolute inset-0 -z-10 bg-gradient-to-t to-transparent" />
      <div className="from-olive-deep/70 absolute inset-0 -z-10 bg-gradient-to-r via-transparent to-transparent" />
      <div className="grain absolute inset-0 -z-10" />

      <div className="shell relative pb-16 md:pb-24">
        <div className="max-w-4xl">
          <p
            className="eyebrow text-terracotta-soft anim-rise mb-6 flex items-center gap-4"
            style={{ animationDelay: "120ms" }}
          >
            <span className="bg-terracotta-soft/60 anim-wipe inline-block h-px w-10" />
            {/* TODO: client copy needed — add the real location line here. */}
            Guided Olive Oil Tastings
          </p>

          <h1 className="display text-cream anim-rise text-[clamp(2.75rem,9.5vw,7.5rem)] uppercase">
            <span
              className="anim-rise block"
              style={{ animationDelay: "180ms" }}
            >
              Sip. Swirl.
            </span>
            <span
              className="anim-rise block"
              style={{ animationDelay: "300ms" }}
            >
              Taste the{" "}
              <em className="text-terracotta-soft font-light not-italic">
                Grove.
              </em>
            </span>
          </h1>

          <p
            className="text-cream/80 anim-rise mt-7 max-w-xl text-[1.0625rem] leading-relaxed md:text-lg"
            style={{ animationDelay: "440ms" }}
          >
            An hour at the table with five oils, a little bread, and someone who
            can tell you exactly which hillside each one came from.
          </p>

          <div
            className="anim-rise mt-10 flex flex-wrap items-center gap-5"
            style={{ animationDelay: "560ms" }}
          >
            <a href="#book" className="btn btn-lg btn-terracotta">
              Reserve Your Tasting
            </a>
            <a
              href="#featured"
              className="text-cream/85 group inline-flex items-center gap-2 text-sm font-medium"
            >
              See the flights
              <span className="transition-transform duration-300 ease-[var(--ease-brand)] group-hover:translate-x-1">
                →
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div
        className="shell anim-rise relative pb-8"
        style={{ animationDelay: "760ms" }}
      >
        <div className="border-cream/15 flex items-center justify-between border-t pt-6">
          <span className="eyebrow text-cream/45">Est. Harvest to Table</span>
          <span className="text-cream/45 flex items-center gap-3 text-xs tracking-[0.2em] uppercase">
            Scroll
            <span className="bg-cream/30 relative block h-8 w-px overflow-hidden">
              <span className="bg-terracotta-soft absolute inset-x-0 top-0 block h-3 animate-[rise_1.8s_ease-in-out_infinite]" />
            </span>
          </span>
        </div>
      </div>
    </section>
  );
}
