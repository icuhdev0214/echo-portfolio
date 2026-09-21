import { MARQUEE_SKILLS, SKILL_GROUPS } from "@/lib/site-content";
import { wheelToX } from "@/lib/wheel-to-x";

const marquee = MARQUEE_SKILLS.concat(MARQUEE_SKILLS);

export function StackPanel() {
  return (
    <section
      className="flex h-full w-screen shrink-0 flex-col justify-[safe_center] gap-6 overflow-y-auto overflow-x-hidden py-24"
      style={{ scrollSnapAlign: "start" }}
    >
      <div className="px-[clamp(34px,7vw,110px)]">
        <h2 className="m-0 text-[clamp(20px,2.4vw,30px)] font-normal tracking-[-.02em]">Stack</h2>
        <p className="mt-3 max-w-[54ch] text-[13.5px] leading-[1.7] text-[rgba(233,233,237,.7)]">
          What I build with day to day, grouped by where it sits in the work.
        </p>
      </div>

      <div className="loop overflow-hidden" style={{ maskImage: "linear-gradient(90deg, transparent, #000 7%, #000 93%, transparent)" }}>
        <div className="loop-track flex w-max gap-2.5" style={{ animation: "slideL 32s linear infinite" }}>
          {marquee.map((t, i) => (
            <span
              key={i}
              className="flex shrink-0 items-center gap-2 whitespace-nowrap rounded-lg border border-[rgba(233,233,237,.12)] bg-(--color-surface) px-4 py-2.5 text-[12.5px] text-[rgba(233,233,237,.82)]"
            >
              <span className="h-3.5 w-3.5 rounded border border-[rgba(145,132,217,.55)]" />
              {t}
            </span>
          ))}
        </div>
      </div>

      <div className="hrail flex gap-4 overflow-x-auto overflow-y-hidden px-[clamp(34px,7vw,110px)] pb-2.5" onWheel={wheelToX}>
        {SKILL_GROUPS.map((g) => (
          <div key={g.title} className="card elev-sm w-[min(260px,72vw)] shrink-0 gap-3 p-4">
            <div className="text-[13.5px] font-medium">{g.title}</div>
            <div className="flex flex-wrap items-start gap-1.5">
              {g.skills.map((s) => (
                <span key={s} className="tag tag-outline whitespace-nowrap">{s}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
