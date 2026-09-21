"use client";

import { useId, useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";

import { BUDGETS, INQUIRY_KINDS } from "@/lib/site-content";

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const searchParams = useSearchParams();
  const project = searchParams.get("project") ?? "";
  const formId = useId();

  const [status, setStatus] = useState<Status>("idle");
  const [kind, setKind] = useState(INQUIRY_KINDS[2]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage(null);

    const form = event.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          projectType: kind,
          budget: data.get("budget"),
          message: data.get("message"),
          project,
          company_url: data.get("company_url"), // honeypot
        }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.message ?? "Something went wrong.");
      }

      setStatus("success");
      form.reset();
      setKind(INQUIRY_KINDS[2]);
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (status === "success") {
    return (
      <p role="status" className="text-[13px]" style={{ color: "var(--color-accent-300)" }}>
        Sent ✓ — Message sent. I will reply to the address you gave.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="card elev-sm relative gap-[var(--space-6)] p-[22px]">
      {project && (
        <p className="m-0 text-[12px]" style={{ color: "rgba(233,233,237,.62)" }}>
          Regarding: <span className="font-medium text-[var(--color-text)]">{project}</span>
        </p>
      )}

      <div className="grid gap-[var(--space-4)]" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))" }}>
        <div className="field">
          <label htmlFor={`${formId}-name`}>Name</label>
          <input id={`${formId}-name`} className="input" type="text" name="name" required autoComplete="name" placeholder="Your name" />
        </div>
        <div className="field">
          <label htmlFor={`${formId}-email`}>Email</label>
          <input id={`${formId}-email`} className="input" type="email" name="email" required autoComplete="email" placeholder="you@company.com" />
        </div>
      </div>

      <div className="field">
        <label>What do you need?</label>
        <div className="seg flex-wrap">
          {INQUIRY_KINDS.map((k) => (
            <label key={k} className="seg-opt whitespace-nowrap">
              <input type="radio" name="kind" value={k} checked={kind === k} onChange={() => setKind(k)} />
              {k}
            </label>
          ))}
        </div>
      </div>

      <div className="field">
        <label htmlFor={`${formId}-budget`}>Budget range</label>
        <select id={`${formId}-budget`} className="input" name="budget" defaultValue={BUDGETS[0]}>
          {BUDGETS.map((b) => (
            <option key={b} value={b}>{b}</option>
          ))}
        </select>
      </div>

      <div className="field">
        <label htmlFor={`${formId}-message`}>Message</label>
        <textarea id={`${formId}-message`} className="input" name="message" rows={5} required placeholder="What are you building, and what is in the way?" />
      </div>

      {/* Honeypot: hidden via off-screen positioning (not type=hidden) so bots that skip hidden inputs still fill it in. */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-px w-px overflow-hidden">
        <label htmlFor={`${formId}-company-url`}>Company URL</label>
        <input id={`${formId}-company-url`} type="text" name="company_url" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-wrap items-center gap-3.5">
        <button type="submit" className="btn btn-primary" disabled={status === "submitting"} style={{ padding: "10px 20px", minWidth: 150 }}>
          {status === "submitting" ? "Sending…" : "Send message"}
        </button>
        {status === "error" ? (
          <span role="alert" className="max-w-[32ch] text-[12px] leading-[1.5]" style={{ color: "var(--color-accent-300)" }}>
            {errorMessage}
          </span>
        ) : (
          <span className="max-w-[32ch] text-[12px] leading-[1.5]" style={{ color: "rgba(233,233,237,.62)" }}>
            Honeypot field sits above the submit row, off-screen and aria-hidden.
          </span>
        )}
      </div>
    </form>
  );
}
