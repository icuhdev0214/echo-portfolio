import { CONTACT_LINKS } from "@/lib/site-content";

export function ContactLinksPanel() {
  return (
    <section
      className="flex h-full w-screen shrink-0 flex-col justify-[safe_center] gap-7 overflow-y-auto overflow-x-hidden px-[clamp(34px,7vw,110px)] py-24"
      style={{ scrollSnapAlign: "start" }}
    >
      <h2 className="m-0 max-w-[24ch] text-[clamp(26px,3.6vw,44px)] font-light leading-[1.15] tracking-[-.025em]">
        Available for senior frontend and product engineering conversations.
      </h2>
      <div className="flex flex-wrap gap-3">
        {CONTACT_LINKS.map((c) => (
          <a
            key={c.label}
            href={c.href}
            className="card elev-sm min-w-[200px] shrink-0 gap-1.5 p-[15px] text-[var(--color-text)] no-underline transition-shadow duration-200 hover:shadow-[var(--shadow-md)]"
          >
            <span className="text-[10px] font-medium uppercase tracking-[.08em] text-[rgba(233,233,237,.58)]">{c.label}</span>
            <span className="text-[13px] break-all">{c.value}</span>
          </a>
        ))}
      </div>
    </section>
  );
}
