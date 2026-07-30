import PlaceholderImage from "./PlaceholderImage";
import Reveal from "./Reveal";
import { experiences } from "@/lib/placeholders";

export default function ExperienceGrid() {
  return (
    <section
      id="tastings"
      className="bg-cream anchor-offset relative isolate overflow-hidden"
    >
      <div className="grain absolute inset-0" />
      <div className="section-pad shell relative">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Reveal className="max-w-2xl">
            <p className="eyebrow text-terracotta mb-5">The Tasting Room</p>
            <h2 className="display text-olive text-[clamp(2.1rem,5.5vw,4.25rem)] uppercase">
              Pick your table
            </h2>
          </Reveal>
          <Reveal delay={100} className="max-w-sm">
            <p className="text-ink/65 text-[0.9375rem] leading-relaxed">
              Six ways in — from a quick pour on your way past to a full
              afternoon under the trees.
            </p>
          </Reveal>
        </div>

        <ul className="mt-14 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {experiences.map((item, i) => (
            <Reveal as="li" key={item.title} delay={(i % 3) * 90}>
              <a href="#book" className="group block">
                <div className="rounded-tile shadow-soft group-hover:shadow-lift relative aspect-[5/4] overflow-hidden transition-shadow duration-300 ease-[var(--ease-brand)]">
                  <PlaceholderImage
                    src={item.image.src}
                    alt={item.image.alt}
                    fill
                    sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
                    className="object-cover transition-transform duration-600 ease-[var(--ease-brand)] group-hover:scale-[1.08]"
                  />
                  <div className="bg-olive-deep/0 group-hover:bg-olive-deep/15 absolute inset-0 transition-colors duration-300" />
                </div>

                <div className="mt-5">
                  <h3 className="display text-olive text-[1.45rem] leading-tight">
                    <span className="from-terracotta to-terracotta bg-gradient-to-r bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-1 transition-[background-size] duration-400 ease-[var(--ease-brand)] group-hover:bg-[length:100%_1px]">
                      {item.title}
                    </span>
                  </h3>
                  <span className="text-ink/45 mt-2.5 block text-[0.6875rem] tracking-[0.16em] uppercase">
                    {item.meta}
                  </span>
                </div>
              </a>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={120}>
          <div className="mt-16 flex justify-center">
            <a href="#featured" className="btn btn-lg btn-outline-olive">
              Explore All Tastings
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
