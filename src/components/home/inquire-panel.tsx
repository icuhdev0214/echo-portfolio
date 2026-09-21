import { Suspense } from "react";

import { ContactForm } from "@/components/contact-form";
import { PERSON } from "@/lib/site-content";

export function InquirePanel() {
  return (
    <section
      className="flex h-full w-screen shrink-0 items-[safe_center] overflow-y-auto px-[clamp(34px,7vw,110px)] py-24"
      style={{ scrollSnapAlign: "start" }}
    >
      <div
        className="grid w-full max-w-[1040px] items-start gap-[clamp(28px,5vw,64px)]"
        style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(300px,100%), 1fr))" }}
      >
        <div>
          <div className="text-[11px] font-medium uppercase tracking-[.1em] text-[#b5abfc]">Start a project</div>
          <h2 className="m-0 mt-4 max-w-[20ch] text-[clamp(24px,3.2vw,38px)] font-light leading-[1.16] tracking-[-.025em]">
            Tell me what you are building.
          </h2>
          <p className="mt-[18px] max-w-[40ch] text-[13.5px] leading-[1.7] text-[rgba(233,233,237,.72)]">
            A sentence about the problem is enough to start. I reply within two working days, usually the same evening.
          </p>
          <div className="mt-6 flex flex-col gap-2.5">
            <span className="text-[12px] text-[rgba(233,233,237,.62)]">Or reach me directly</span>
            <a href={`mailto:${PERSON.email}`} className="btn btn-secondary self-start" style={{ padding: "9px 16px" }}>
              {PERSON.email}
            </a>
          </div>
        </div>

        <Suspense fallback={null}>
          <ContactForm />
        </Suspense>
      </div>
    </section>
  );
}
