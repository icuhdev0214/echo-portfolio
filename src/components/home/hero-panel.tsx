"use client";

import { useEffect, useState } from "react";

import { HERO, METRICS, PERSON } from "@/lib/site-content";

const HEAD_WORDS = HERO.headline.split(" ");

export function HeroPanel({ onSeeWork }: { onSeeWork: () => void }) {
  const [t, setT] = useState(0);
  const [spotlight, setSpotlight] = useState({ x: 0.2, y: 0.4 });

  useEffect(() => {
    const start = performance.now();
    let raf: number;
    const tick = () => {
      const p = Math.min(1, (performance.now() - start) / 1400);
      setT(1 - Math.pow(1 - p, 3));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section
      className="relative flex h-full w-screen shrink-0 items-[safe_center] overflow-y-auto overflow-x-hidden px-[clamp(34px,7vw,110px)]"
      style={{ scrollSnapAlign: "start", backgroundImage: "radial-gradient(circle at 20% 40%, rgba(145,132,217,.16), transparent 58%)" }}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        setSpotlight({ x: (e.clientX - r.left) / r.width, y: (e.clientY - r.top) / r.height });
      }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-45"
        style={{ backgroundImage: "radial-gradient(rgba(233,233,237,.16) 1px, transparent 1px)", backgroundSize: "26px 26px" }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ background: `radial-gradient(460px circle at ${spotlight.x * 100}% ${spotlight.y * 100}%, rgba(145,132,217,.13), transparent 70%)` }}
      />

      <div className="relative max-w-[820px]">
        <div
          className="text-[11px] font-medium uppercase tracking-[.1em] text-[#b5abfc]"
          style={{ animation: "rise .7s ease both" }}
        >
          {HERO.eyebrow}
        </div>

        <h1 className="m-0 mt-5 font-light leading-[1.03] tracking-[-.03em] text-[clamp(40px,5.6vw,80px)]">
          {HEAD_WORDS.map((w, i) => (
            <span
              key={i}
              className="mr-[.28em] inline-block"
              style={{ animation: "rise .85s cubic-bezier(.2,.7,.2,1) both", animationDelay: `${0.08 * i}s` }}
            >
              {w}
            </span>
          ))}
        </h1>

        <p
          className="mt-6 max-w-[52ch] text-[15px] leading-[1.7] text-[rgba(233,233,237,.74)]"
          style={{ animation: "rise .85s ease .55s both", textWrap: "pretty" }}
        >
          {HERO.body}
        </p>

        <div className="mt-8 flex gap-6" style={{ animation: "rise .85s ease .68s both" }}>
          {METRICS.map((m) => (
            <div key={m.label} className="flex flex-col gap-1.5">
              <div className="text-[clamp(26px,3vw,38px)] font-light leading-none tracking-[-.02em]">
                {(m.to * t).toFixed(m.dec)}{m.suffix}
              </div>
              <div className="max-w-[16ch] text-[11.5px] leading-[1.5] text-[rgba(233,233,237,.62)]">{m.label}</div>
            </div>
          ))}
        </div>

        <div className="mt-9 flex gap-2.5" style={{ animation: "rise .85s ease .8s both" }}>
          <button onClick={onSeeWork} className="btn btn-primary" style={{ padding: "11px 20px" }}>
            See the work →
          </button>
          <a href={`mailto:${PERSON.email}`} className="btn btn-secondary" style={{ padding: "11px 20px" }}>
            Email {PERSON.name.split(" ")[0]}
          </a>
        </div>
      </div>
    </section>
  );
}
