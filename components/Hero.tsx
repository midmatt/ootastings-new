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

      <div className="shell relative pb-24 md:pb-28">
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
            className="text-cream/80 anim-rise mt-6 max-w-xl text-[1.1875rem] leading-relaxed md:mt-5 md:text-[1.25rem]"
            style={{ animationDelay: "440ms" }}
          >
            A sensory journey through the world&apos;s finest oils — crafted for
            curious palates, culinary lovers, and groups seeking a signature
            experience.
          </p>

          <div
            className="anim-rise mt-9 flex flex-wrap items-center gap-5 md:mt-8"
            style={{ animationDelay: "560ms" }}
          >
            {/* Same wording as the header CTA — two orange buttons on one
                screen saying different things reads as two different actions. */}
            <a href="#book" className="btn btn-lg btn-terracotta">
              Book a Tasting
            </a>
            <a
              href="#featured"
              className="text-cream/85 group inline-flex items-center gap-2 text-sm font-medium"
            >
              See the tastings
              <span className="transition-transform duration-300 ease-[var(--ease-brand)] group-hover:translate-x-1">
                →
              </span>
            </a>
          </div>
        </div>
      </div>

    </section>
  );
}
