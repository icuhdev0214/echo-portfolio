"use client";

import { useRef, useState } from "react";

import { ProjectCard } from "@/components/project-card";
import type { Project } from "@/sanity/lib/types";
import { PROJECT_FILTERS } from "@/lib/site-content";
import { wheelToX } from "@/lib/wheel-to-x";

export function WorkPanel({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState("All");
  const [pct, setPct] = useState(0);
  const railRef = useRef<HTMLDivElement>(null);

  const visible = filter === "All" ? projects : projects.filter((p) => p.tags?.includes(filter));

  function nudge(dir: 1 | -1) {
    const el = railRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.max(300, el.clientWidth * 0.7), behavior: "smooth" });
  }

  return (
    <section
      className="flex h-full w-screen shrink-0 flex-col justify-center gap-5 overflow-hidden px-[clamp(34px,7vw,110px)] py-24"
      style={{ scrollSnapAlign: "start" }}
    >
      <div className="flex items-baseline justify-between gap-5">
        <h2 className="m-0 text-[clamp(20px,2.4vw,30px)] font-normal tracking-[-.02em]">Personal &amp; freelance projects</h2>
        <div className="flex flex-wrap justify-end gap-1.5">
          {PROJECT_FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className="cursor-pointer whitespace-nowrap rounded-full px-3 py-1.5 text-[11.5px] font-medium"
              style={{
                background: filter === f ? "rgba(145,132,217,.18)" : "transparent",
                border: `1px solid ${filter === f ? "#9184d9" : "rgba(233,233,237,.16)"}`,
                color: filter === f ? "#e9e9ed" : "rgba(233,233,237,.7)",
              }}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div
        ref={railRef}
        className="hrail flex items-stretch gap-[18px] overflow-x-auto overflow-y-hidden px-0.5 py-1 pb-2.5"
        onWheel={wheelToX}
        onScroll={(e) => {
          const el = e.currentTarget;
          const max = el.scrollWidth - el.clientWidth;
          setPct(max > 0 ? el.scrollLeft / max : 0);
        }}
      >
        {visible.length > 0 ? (
          visible.map((p) => <ProjectCard key={p._id} project={p} />)
        ) : (
          <p className="text-[13px] text-[rgba(233,233,237,.62)]">No projects match this filter yet.</p>
        )}
      </div>

      <div className="flex items-center gap-3">
        <button onClick={() => nudge(-1)} className="btn btn-secondary btn-icon" aria-label="Previous projects">←</button>
        <button onClick={() => nudge(1)} className="btn btn-secondary btn-icon" aria-label="Next projects">→</button>
        <div className="h-0.5 max-w-[280px] flex-1 overflow-hidden rounded-full" style={{ background: "rgba(233,233,237,.12)" }}>
          <div className="h-full bg-(--color-accent)" style={{ width: `${Math.round(pct * 100)}%` }} />
        </div>
        <span className="text-[11px] text-[rgba(233,233,237,.66)]">click a card for the case study</span>
      </div>
    </section>
  );
}
