"use client";

import Reveal from "./Reveal";

/**
 * OOTastings Video Lounge — two screens between the mission block and the
 * featured experiences. One reel was shot portrait and the other landscape, so
 * both sit in the same square frame to keep the row even.
 *
 * The videos are contained rather than cropped: the promo ends on a card
 * carrying the JoVell contact details, and a square centre-crop cut the text
 * off at both edges. Containing costs some letterboxing — symmetric, since a
 * square frame bars a 9:16 and a 16:9 reel by the same amount — but nothing in
 * either reel is lost.
 *
 * The heading stays always-visible (not behind scroll-reveal) so the section
 * cannot disappear if the observer is slow or hydration lags. Only the video
 * frames fade in.
 */
const VIDEOS: {
  title: string;
  src: string;
}[] = [
  {
    title: "From the Grove",
    src: "/videos/lounge-01.mp4",
  },
  {
    title: "At the Table",
    src: "/videos/lounge-02.mp4",
  },
];

export default function VideoLounge() {
  return (
    <section
      id="video-lounge"
      className="bg-linen anchor-offset relative isolate overflow-hidden"
    >
      <div className="grain absolute inset-0" />

      <div className="section-pad shell relative">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow text-terracotta mb-5">Pull up a seat</p>
          <h2 className="display text-olive text-[clamp(2.1rem,5.5vw,4.25rem)] uppercase">
            OOTastings Video Lounge
          </h2>
          <p className="text-ink/60 mx-auto mt-5 max-w-md text-[0.9375rem] leading-relaxed">
            A short look inside the tasting — the pour, the table, the
            conversation.
          </p>
        </div>

        <div className="mx-auto mt-14 grid max-w-4xl gap-6 sm:mt-16 sm:grid-cols-2 sm:gap-8">
          {VIDEOS.map((video, i) => (
            <Reveal key={video.title} delay={i * 120} as="figure">
              <div className="rounded-card shadow-soft relative aspect-square overflow-hidden bg-olive-deep">
                <video
                  className="absolute inset-0 h-full w-full object-contain"
                  src={video.src}
                  controls
                  playsInline
                  preload="metadata"
                  aria-label={video.title}
                />
              </div>
              <figcaption className="text-olive/55 mt-4 text-center text-[0.6875rem] font-semibold tracking-[0.16em] uppercase">
                {video.title}
              </figcaption>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
