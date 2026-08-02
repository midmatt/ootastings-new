"use client";

import { useEffect, useRef } from "react";

/**
 * "Olive oil is a conversation" — the mission section, with an olive oil
 * pour as its dominant visual. Bottle and glass are both in frame; the bottle
 * tilts in, a curved stream leaves the spout and fills the glass, and the copy
 * settles alongside it.
 *
 * The sequence plays **once, on its own, when the section comes into view** —
 * it is not tied to scroll position, so the section is a normal-height block
 * that never pins or slows the page down as you scroll past it.
 *
 * Static end state (bottle tilted, glass full, copy visible) is what renders
 * with reduced motion and with no JS: the inline SVG defaults are the finished
 * frame, so nothing has to run for the static case.
 *
 * Performance: one rAF loop for the length of the animation and nothing after
 * it; values are written straight to element styles/attributes via refs so
 * React never re-renders while it plays; only transforms, opacity and one SVG
 * rotate attribute change.
 */

/**
 * The bottle pivots on its own spout tip, so the stream's origin never moves as
 * the bottle tips in. POUR_ANGLE is the settled pour pose (spout aimed down and
 * left at the glass); TILT_SWING is how far back from that it starts.
 */
const PIVOT_X = 150;
const PIVOT_Y = 95;
const POUR_ANGLE = 115;
const TILT_SWING = 45;

/** How far the stream's reveal mask travels, in viewBox units. */
const STREAM_TRAVEL = 175;

/** Length of the whole pour, in ms, and how much of the section must be on
 *  screen before it starts. */
const DURATION = 2200;
const TRIGGER_RATIO = 0.35;

const clamp = (v: number, min = 0, max = 1) => Math.min(max, Math.max(min, v));

/** Normalise v into [a,b], then smoothstep. */
const phase = (v: number, a: number, b: number) => {
  const t = clamp((v - a) / (b - a));
  return t * t * (3 - 2 * t);
};

export default function PourMission() {
  const hostRef = useRef<HTMLDivElement>(null);
  const bottleRef = useRef<SVGGElement>(null);
  const streamMaskRef = useRef<SVGRectElement>(null);
  const fillRef = useRef<SVGGElement>(null);
  const glowRef = useRef<SVGEllipseElement>(null);
  const copyRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const stillMotion =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Reduced motion, or no IntersectionObserver: leave the finished frame up.
    if (stillMotion || typeof IntersectionObserver === "undefined") {
      render(1);
      return;
    }

    // Rewind to the start now, before the section can be seen, then wait for it
    // to come into view.
    render(0);

    let frame = 0;
    let start = 0;

    const step = (now: number) => {
      if (!start) start = now;
      const p = clamp((now - start) / DURATION);
      render(p);
      frame = p < 1 ? requestAnimationFrame(step) : 0;
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          observer.disconnect(); // plays once — it reads as a finished action
          frame = requestAnimationFrame(step);
        });
      },
      { threshold: TRIGGER_RATIO },
    );

    observer.observe(host);

    return () => {
      observer.disconnect();
      if (frame) cancelAnimationFrame(frame);
    };

    function render(p: number) {
      // 1. bottle tilts from upright into the pour angle
      const tilt = phase(p, 0, 0.16);
      // 2. oil leaves the spout and runs down the curve
      const stream = phase(p, 0.13, 0.44);
      // 3. the glass fills, slowly, and holds
      const level = phase(p, 0.24, 0.6);

      if (bottleRef.current) {
        // Composed with the parent's static rotate(-115): the bottle starts
        // tipped back at -70 deg and rotates down into the pour pose.
        bottleRef.current.setAttribute(
          "transform",
          `rotate(${(TILT_SWING * (1 - tilt)).toFixed(2)} ${PIVOT_X} ${PIVOT_Y})`,
        );
      }

      if (streamMaskRef.current) {
        streamMaskRef.current.style.transform = `translateY(${(
          (stream - 1) *
          STREAM_TRAVEL
        ).toFixed(2)}px)`;
      }

      if (fillRef.current) {
        fillRef.current.style.transform = `translateY(${((1 - level) * 100).toFixed(2)}%)`;
      }

      if (glowRef.current) {
        glowRef.current.style.opacity = (0.06 + level * 0.34).toFixed(3);
      }

      // copy trails the pour so reading is never rushed
      const copyPhases: [number, number][] = [
        [0.3, 0.46],
        [0.36, 0.62],
        [0.48, 0.8],
        [0.56, 0.88],
      ];
      copyRefs.current.forEach((el, i) => {
        if (!el) return;
        const t = phase(p, copyPhases[i][0], copyPhases[i][1]);
        el.style.opacity = String(t);
        el.style.transform = `translate3d(0, ${((1 - t) * 22).toFixed(2)}px, 0)`;
      });
    }
  }, []);

  const setCopyRef = (i: number) => (el: HTMLElement | null) => {
    copyRefs.current[i] = el;
  };

  return (
    <section
      id="mission"
      ref={hostRef}
      className="bg-cream anchor-offset relative isolate"
    >
      <div className="section-pad relative flex items-center overflow-hidden">
        <div className="grain pointer-events-none absolute inset-0" />

        <div className="shell relative w-full">
          <div className="grid items-center gap-12 md:grid-cols-[1fr_minmax(0,44%)] md:gap-16 lg:gap-20">
            {/* ---------------- copy ---------------- */}
            <div className="order-2 max-w-xl md:order-1">
              <p
                ref={setCopyRef(0)}
                className="eyebrow text-terracotta mb-7 will-change-[opacity,transform]"
              >
                Everyone&apos;s Invited
              </p>

              <h2
                ref={setCopyRef(1)}
                className="display text-olive text-[clamp(2rem,4.6vw,3.6rem)] text-balance uppercase will-change-[opacity,transform]"
              >
                Olive oil is a{" "}
                <em className="font-normal italic">conversation</em>, not a
                condiment.
              </h2>

              {/* One ref for the whole block: the body fades in as a single
                  beat, so the pour choreography keeps its four cues. */}
              <div
                ref={setCopyRef(2)}
                className="text-ink/70 mt-8 max-w-lg space-y-5 text-[1.0625rem] leading-[1.75] will-change-[opacity,transform]"
              >
                <p>
                  It invites curiosity, connection, and a moment of pause — the
                  kind of moment that brings people together.
                </p>
                <p>
                  At JoVell Hospitality Group, we never deliver a
                  one-size-fits-all tasting. We craft an experience around your
                  story — your values, your culture, your purpose, and your
                  guests.
                </p>
                <p>
                  Every tasting becomes a dialogue: between flavor and memory,
                  between your team and ours, between who you are and how you
                  show up in the world.
                </p>
                <p>
                  Your guests leave not only with new connections, but with a
                  deeper understanding of what makes your organization unique —
                  and a completely new way of tasting everything else.
                </p>
              </div>

              <div
                ref={setCopyRef(3)}
                className="mt-11 flex items-center gap-4 will-change-[opacity,transform]"
              >
                <span className="bg-olive/20 h-px w-16" />
                <span className="bg-terracotta h-1.5 w-1.5 rotate-45" />
              </div>
            </div>

            {/* ---------------- pour scene ---------------- */}
            <div className="order-1 flex justify-center md:order-2 md:justify-end">
              <svg
                viewBox="52 12 232 406"
                fill="none"
                aria-hidden="true"
                className="h-[46vh] max-h-[560px] min-h-[300px] w-auto md:h-[64vh]"
              >
                <defs>
                  {/* liquid in the glass — warm surface, deep olive base */}
                  <linearGradient id="oilBody" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#ADA54B" />
                    <stop offset="24%" stopColor="#9C9738" />
                    <stop offset="68%" stopColor="#828C3C" />
                    <stop offset="100%" stopColor="#63752F" />
                  </linearGradient>
                  {/* the ribbon leaving the spout */}
                  <linearGradient id="oilStream" x1="0" y1="0" x2="0.4" y2="1">
                    <stop offset="0%" stopColor="#A69F42" />
                    <stop offset="45%" stopColor="#979238" />
                    <stop offset="100%" stopColor="#7A8B3F" />
                  </linearGradient>
                  <radialGradient id="oilGlow">
                    <stop offset="0%" stopColor="#A8A03C" stopOpacity="0.38" />
                    <stop offset="100%" stopColor="#A8A03C" stopOpacity="0" />
                  </radialGradient>

                  <clipPath id="glassBowl">
                    <path d="M73,234 L84.5,380 C85.4,389 92,394 102,394 L138,394 C148,394 154.6,389 155.5,380 L167,234 Z" />
                  </clipPath>
                  <clipPath id="streamReveal">
                    <rect
                      ref={streamMaskRef}
                      x="96"
                      y="84"
                      width="90"
                      height={STREAM_TRAVEL}
                      style={{
                        transformBox: "fill-box",
                        transformOrigin: "center",
                        willChange: "transform",
                      }}
                    />
                  </clipPath>
                </defs>

                {/* warmth pooling around the glass */}
                <ellipse
                  ref={glowRef}
                  cx="120"
                  cy="312"
                  rx="112"
                  ry="104"
                  fill="url(#oilGlow)"
                  opacity="0.4"
                />

                {/* ---- bottle (thin line), pivoting on its spout ---- */}
                <g transform={`rotate(-${POUR_ANGLE} ${PIVOT_X} ${PIVOT_Y})`}>
                  <g ref={bottleRef}>
                    <path
                      d="M143,97 L143,137 C143,145 130,149 130,161 L130,207 C130,213 133,216 139,216 L161,216 C167,216 170,213 170,207 L170,161 C170,149 157,145 157,137 L157,97 Z"
                      fill="rgba(55,69,21,0.035)"
                      stroke="rgba(55,69,21,0.42)"
                      strokeWidth="1.9"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M142,107 L158,107"
                      stroke="rgba(55,69,21,0.3)"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                    />
                    <rect
                      x="136"
                      y="172"
                      width="28"
                      height="30"
                      rx="3"
                      stroke="rgba(55,69,21,0.22)"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M141,182 L159,182 M141,190 L154,190"
                      stroke="rgba(55,69,21,0.16)"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </g>
                </g>

                {/* ---- pour stream: arcs from the spout into the glass ---- */}
                <g clipPath="url(#streamReveal)">
                  {/* soft continuous glow along the ribbon */}
                  <path
                    d="M150,95 C119,109 118,180 120,242"
                    stroke="#A8A03C"
                    strokeWidth="14"
                    strokeLinecap="round"
                    opacity="0.09"
                  />
                  <path
                    d="M150,95 C119,109 118,180 120,242"
                    stroke="#A8A03C"
                    strokeWidth="9"
                    strokeLinecap="round"
                    opacity="0.16"
                  />
                  {/* the ribbon */}
                  <path
                    d="M150,95 C119,109 118,180 120,242"
                    stroke="url(#oilStream)"
                    strokeWidth="5.6"
                    strokeLinecap="round"
                  />
                  {/* glossy streak — the cue that reads oil, not water */}
                  <path
                    d="M148.6,98 C118,111.5 116.4,180 118.4,240"
                    stroke="#EFE9B4"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    opacity="0.5"
                  />
                </g>

                {/* ---- liquid in the glass ---- */}
                <g clipPath="url(#glassBowl)" opacity="0.94">
                  <g
                    ref={fillRef}
                    style={{
                      transformBox: "fill-box",
                      transformOrigin: "center bottom",
                      willChange: "transform",
                    }}
                  >
                    <rect
                      x="66"
                      y="232"
                      width="108"
                      height="172"
                      fill="url(#oilBody)"
                    />
                    {/* surface + its highlight */}
                    <ellipse
                      cx="120"
                      cy="233"
                      rx="50"
                      ry="3.6"
                      fill="#E4DE9E"
                      opacity="0.5"
                    />
                    <ellipse
                      cx="101"
                      cy="234"
                      rx="17"
                      ry="2"
                      fill="#F2EDC0"
                      opacity="0.45"
                    />
                    {/* elongated sheen down the body of the oil */}
                    <rect
                      x="85"
                      y="248"
                      width="7"
                      height="128"
                      rx="3.5"
                      fill="#EFE9B4"
                      opacity="0.13"
                    />
                  </g>
                </g>

                {/* ---- glass (thin line) ---- */}
                <path
                  d="M68,230 L80,382 C81,392 89,398 100,398 L140,398 C151,398 159,392 160,382 L172,230 Z"
                  stroke="rgba(55,69,21,0.4)"
                  strokeWidth="1.9"
                  strokeLinejoin="round"
                />
                <ellipse
                  cx="120"
                  cy="230"
                  rx="52"
                  ry="6.2"
                  stroke="rgba(55,69,21,0.45)"
                  strokeWidth="1.9"
                />
                <path
                  d="M82,243 L93,368"
                  stroke="rgba(55,69,21,0.16)"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                />
                <ellipse
                  cx="120"
                  cy="405"
                  rx="58"
                  ry="6"
                  fill="rgba(55,69,21,0.1)"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
