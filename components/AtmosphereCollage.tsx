import PlaceholderImage from "./PlaceholderImage";
import Reveal from "./Reveal";
import { atmosphere } from "@/lib/placeholders";

const FRAMES = [
  "col-span-12 md:col-span-5 aspect-[4/5]",
  "col-span-12 md:col-span-7 md:mt-14 aspect-[16/11]",
  "col-span-6 md:col-span-4 md:-mt-6 aspect-[3/4]",
  "col-span-6 md:col-span-3 md:mt-20 aspect-square",
  "col-span-12 md:col-span-5 md:mt-4 aspect-[5/4]",
];

export default function AtmosphereCollage() {
  return (
    <section
      id="atmosphere"
      className="bg-cream anchor-offset relative isolate overflow-hidden"
    >
      <div className="grain absolute inset-0" />
      <div className="section-pad shell relative">
        <Reveal className="max-w-2xl">
          <p className="eyebrow text-terracotta mb-5">The Room & The Grove</p>
          <h2 className="display text-olive text-[clamp(2.1rem,5.5vw,4.25rem)] uppercase">
            Where it all happens
          </h2>
          <p className="text-ink/65 mt-6 max-w-md text-[0.9375rem] leading-relaxed">
            {/* TODO: client copy needed — add real location / directions line. */}
            Long tables, cool stone, and the trees that started all of it.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-12 items-start gap-4 md:mt-20 md:gap-6">
          {atmosphere.map((photo, i) => (
            <Reveal
              as="figure"
              key={photo.src}
              delay={(i % 3) * 100}
              className={`${FRAMES[i]} group rounded-tile shadow-soft relative overflow-hidden`}
            >
              <PlaceholderImage
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(max-width: 768px) 90vw, 40vw"
                className="object-cover transition-transform duration-700 ease-[var(--ease-brand)] group-hover:scale-[1.05]"
              />
              <div className="from-olive-deep/40 absolute inset-0 bg-gradient-to-t via-transparent to-transparent opacity-0 transition-opacity duration-400 group-hover:opacity-100" />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
