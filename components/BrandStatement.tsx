import Reveal from "./Reveal";

export default function BrandStatement() {
  return (
    <section
      id="story"
      className="bg-olive anchor-offset relative isolate overflow-hidden"
    >
      <div className="grain absolute inset-0" />

      {/* soft radial warmth so the flat block has depth */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(60% 55% at 50% 0%, rgba(192,107,60,0.22), transparent 70%)",
        }}
      />

      <div className="section-pad shell relative">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <p className="eyebrow text-terracotta-soft mb-8">Our Philosophy</p>
          </Reveal>

          <Reveal delay={80}>
            <h2 className="display text-cream text-[clamp(2.3rem,6.5vw,5rem)] text-balance uppercase">
              Never just a bottle
            </h2>
          </Reveal>

          <Reveal delay={160}>
            <p className="text-cream/75 mx-auto mt-8 max-w-2xl text-[1.0625rem] leading-[1.8] text-balance">
              {/* TODO: client copy needed */}
              We buy from growers we can name, in quantities small enough to
              taste every batch. Nothing sits long enough to go dull. If an oil
              isn't good enough to drink from the glass, it doesn't make the
              table — and everything on our table is poured for you by someone
              who was there at the press.
            </p>
          </Reveal>

          <Reveal delay={240}>
            <div className="mt-11 flex flex-wrap items-center justify-center gap-4">
              <a href="#book" className="btn btn-lg btn-terracotta">
                Book a Private Tasting
              </a>
              <a href="#visit" className="btn btn-lg btn-outline-cream">
                Plan Your Visit
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
