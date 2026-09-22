"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState, type UIEvent } from "react";

import type { Project } from "@/sanity/lib/types";
import { PERSON, PANEL_LABELS } from "@/lib/site-content";
import { wheelToX } from "@/lib/wheel-to-x";
import { HeroPanel } from "@/components/home/hero-panel";
import { WorkPanel } from "@/components/home/work-panel";
import { StackPanel } from "@/components/home/stack-panel";
import { ContactLinksPanel } from "@/components/home/contact-links-panel";
import { InquirePanel } from "@/components/home/inquire-panel";
import { PixelTransition } from "@/components/home/pixel-transition";

const PANEL_COUNT = PANEL_LABELS.length;
const INQUIRE_INDEX = PANEL_LABELS.indexOf("Inquire");

export function HomeExperience({ projects }: { projects: Project[] }) {
  const searchParams = useSearchParams();
  const initialPanel = searchParams.get("panel") === "inquire" ? INQUIRE_INDEX : 0;
  const trackRef = useRef<HTMLDivElement>(null);
  const [panel, setPanel] = useState(initialPanel);
  const [pixelOn, setPixelOn] = useState(false);
  const pxTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  function flashPixels() {
    clearTimeout(pxTimer.current);
    setPixelOn(true);
    pxTimer.current = setTimeout(() => setPixelOn(false), 1000);
  }

  function goPanel(i: number) {
    const el = trackRef.current;
    if (i !== panel) flashPixels();
    setPanel(i);
    el?.scrollTo({ left: i * el.clientWidth, behavior: "smooth" });
  }

  // Deep link: /?panel=inquire starts scrolled to the contact form. Initial
  // panel index comes from a lazy state read above; this effect only
  // performs the (non-state) side effect of scrolling the rail to match.
  useEffect(() => {
    const el = trackRef.current;
    if (initialPanel !== 0) el?.scrollTo({ left: initialPanel * el.clientWidth, behavior: "auto" });
    // Only run once on mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const tag = (e.target as HTMLElement | null)?.tagName ?? "";
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;
      if (e.key === "ArrowRight") goPanel(Math.min(PANEL_COUNT - 1, panel + 1));
      if (e.key === "ArrowLeft") goPanel(Math.max(0, panel - 1));
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [panel]);

  function onTrackScroll(e: UIEvent<HTMLDivElement>) {
    const el = e.currentTarget;
    const i = Math.round(el.scrollLeft / Math.max(1, el.clientWidth));
    if (i !== panel) setPanel(i);
  }

  return (
    <div className="fixed inset-0 overflow-hidden" style={{ background: "var(--color-bg)" }}>
      {/* Top nav */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-30 flex items-center justify-between px-[clamp(16px,4vw,34px)] py-4">
        <div className="pointer-events-auto flex items-center gap-2.5">
          <div
            className="flex h-7 w-7 items-center justify-center rounded-lg text-[11px] font-semibold text-[#b5abfc]"
            style={{ border: "1px solid var(--color-accent)" }}
          >
            {PERSON.initials}
          </div>
          <span className="text-[13px] font-medium">{PERSON.name}</span>
        </div>
        <div className="pointer-events-auto flex items-center gap-1">
          <span className="nav-labels flex items-center gap-1">
            {PANEL_LABELS.map((label, i) => (
              <button
                key={label}
                onClick={() => goPanel(i)}
                className="cursor-pointer rounded-lg border-none px-3 py-[7px] text-[12px] font-medium transition-colors"
                style={{
                  background: panel === i ? "rgba(145,132,217,.18)" : "transparent",
                  color: panel === i ? "#e9e9ed" : "rgba(233,233,237,.68)",
                }}
              >
                {label}
              </button>
            ))}
          </span>
          <Link href="/studio" className="btn btn-ghost ml-2 text-[12px]" aria-label="CMS sign in">
            CMS ↗
          </Link>
        </div>
      </div>

      {/* Horizontal rail */}
      <div
        ref={trackRef}
        onScroll={onTrackScroll}
        onWheel={wheelToX}
        className="hrail absolute inset-0 flex overflow-x-auto overflow-y-hidden"
        style={{ scrollSnapType: "x mandatory" }}
      >
        <HeroPanel onSeeWork={() => goPanel(1)} />
        <WorkPanel projects={projects} />
        <StackPanel />
        <ContactLinksPanel />
        <InquirePanel />
      </div>

      <PixelTransition active={pixelOn} />

      {/* Bottom indicator */}
      <div className="pointer-events-none absolute inset-x-0 bottom-[22px] z-30 flex items-center justify-center gap-3.5">
        <div className="pointer-events-auto flex gap-1.5">
          {PANEL_LABELS.map((label, i) => (
            <button
              key={label}
              onClick={() => goPanel(i)}
              aria-label={label}
              className="h-[7px] cursor-pointer rounded-full border-none p-0 transition-all duration-300"
              style={{
                width: panel === i ? 26 : 7,
                background: panel === i ? "#9184d9" : "rgba(233,233,237,.25)",
              }}
            />
          ))}
        </div>
        <span className="dock-hint text-[11px] text-[rgba(233,233,237,.62)]">scroll sideways · ← → keys</span>
      </div>
    </div>
  );
}
