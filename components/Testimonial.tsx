import PlaceholderImage from "./PlaceholderImage";
import Reveal from "./Reveal";
import { testimonialPortrait } from "@/lib/placeholders";

export default function Testimonial() {
  return (
    <section className="bg-olive relative isolate overflow-hidden">
      <div className="grain absolute inset-0" />

      {/* Oversized quote mark */}
      <span
        aria-hidden="true"
        className="display text-cream/[0.06] pointer-events-none absolute -top-16 left-1/2 -translate-x-1/2 text-[22rem] leading-none select-none md:text-[30rem]"
      >
        &rdquo;
      </span>

      <div className="section-pad shell relative">
        <Reveal className="mx-auto max-w-4xl text-center">
          <p className="eyebrow text-terracotta-soft mb-10">From the table</p>

          {/* TODO: client copy needed — replace with a real, permissioned guest quote */}
          <blockquote className="text-cream font-[family-name:var(--font-fraunces)] text-[clamp(1.6rem,4.2vw,3.1rem)] leading-[1.22] font-light text-balance italic">
            &ldquo;I came in thinking olive oil was olive oil. I left with three
            bottles, a page of notes, and a completely different way of tasting
            everything else.&rdquo;
          </blockquote>

          <div className="mt-12 flex items-center justify-center gap-4">
            <span className="border-cream/25 relative h-14 w-14 overflow-hidden rounded-full border">
              <PlaceholderImage
                src={testimonialPortrait.src}
                alt={testimonialPortrait.alt}
                fill
                sizes="56px"
                className="object-cover"
              />
            </span>
            <span className="text-left">
              <span className="text-cream block text-sm font-semibold tracking-wide">
                Sofia R.
              </span>
              <span className="text-cream/55 block text-xs tracking-[0.16em] uppercase">
                Estate Reserve Tasting
              </span>
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
