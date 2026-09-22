import type { WheelEvent } from "react";

/** Redirects vertical wheel/trackpad scroll into horizontal scroll on the target rail. */
export function wheelToX(e: WheelEvent<HTMLElement>) {
  const el = e.currentTarget;
  if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;
  const max = el.scrollWidth - el.clientWidth;
  if (max <= 0) return;
  e.preventDefault();
  el.scrollLeft = Math.max(0, Math.min(max, el.scrollLeft + e.deltaY));
}
