import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";

import { ProjectMedia } from "@/components/project-media";
import { sanityFetch } from "@/sanity/lib/fetch";
import { PROJECT_QUERY, PROJECT_SLUGS_QUERY } from "@/sanity/lib/queries";
import type { Project } from "@/sanity/lib/types";
import { FALLBACK_PROJECTS } from "@/lib/fallback-projects";

export async function generateStaticParams() {
  const slugs = await sanityFetch<string[]>({ query: PROJECT_SLUGS_QUERY }).catch((err) => {
    console.warn("[projects/slug] Failed to fetch slugs from Sanity:", err);
    return [];
  });
  const all = new Set([...slugs, ...FALLBACK_PROJECTS.map((p) => p.slug.current)]);
  return Array.from(all).map((slug) => ({ slug }));
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const fetched = await sanityFetch<Project | null>({
    query: PROJECT_QUERY,
    params: { slug },
  }).catch((err) => {
    console.warn("[projects/slug] Failed to fetch project from Sanity:", err);
    return null;
  });
  const project = fetched ?? FALLBACK_PROJECTS.find((p) => p.slug.current === slug) ?? null;

  if (!project) notFound();

  const all = FALLBACK_PROJECTS; // navigation between the demo set when Sanity has no data
  const idx = all.findIndex((p) => p.slug.current === slug);
  const prev = idx >= 0 ? all[(idx - 1 + all.length) % all.length] : null;
  const next = idx >= 0 ? all[(idx + 1) % all.length] : null;

  return (
    <article className="mx-auto max-w-[1180px] px-[clamp(34px,7vw,110px)] py-[30px] pb-[60px]">
      <Link href="/" className="mb-[22px] inline-block text-[12px] font-medium text-[#b5abfc] no-underline">
        ← Back to work
      </Link>

      {project.client && (
        <div className="text-[11px] font-medium uppercase tracking-[.09em] text-[#b5abfc]">{project.client}</div>
      )}
      <h1 className="m-0 mt-3.5 max-w-[26ch] text-[clamp(28px,4vw,46px)] font-light leading-[1.12] tracking-[-.025em]">
        {project.title}
      </h1>

      <div className="mt-[22px] flex flex-wrap gap-[34px]">
        {project.role && <MetaField label="Role" value={project.role} />}
        {project.date && <MetaField label="Period" value={new Date(project.date).getFullYear().toString()} />}
        {project.domain && <MetaField label="Domain" value={project.domain} />}
      </div>

      <div className="my-[30px]">
        <ProjectMedia project={project} playable />
      </div>

      <div className="grid gap-[38px]" style={{ gridTemplateColumns: "minmax(0,1.7fr) minmax(0,1fr)" }}>
        <div className="flex flex-col gap-[26px]">
          {project.problem && (
            <CaseSection title="Problem">
              <p className="m-0 text-[14px] leading-[1.75]" style={{ color: "rgba(233,233,237,.84)", textWrap: "pretty" }}>
                {project.problem}
              </p>
            </CaseSection>
          )}
          {project.approach && (
            <CaseSection title="Approach">
              <p className="m-0 text-[14px] leading-[1.75]" style={{ color: "rgba(233,233,237,.84)", textWrap: "pretty" }}>
                {project.approach}
              </p>
            </CaseSection>
          )}
          {!project.problem && !project.approach && (
            <p className="m-0 text-[14px] leading-[1.75]" style={{ color: "rgba(233,233,237,.84)" }}>
              {project.summary}
            </p>
          )}
          {project.outcomes && project.outcomes.length > 0 && (
            <CaseSection title="Outcome">
              <div className="flex flex-wrap gap-[30px]">
                {project.outcomes.map((o) => (
                  <div key={o.label} className="flex flex-col gap-1.5">
                    <div className="text-[30px] font-light tracking-[-.02em]">{o.value}</div>
                    <div className="max-w-[22ch] text-[12px] leading-[1.5] text-[rgba(233,233,237,.62)]">{o.label}</div>
                  </div>
                ))}
              </div>
            </CaseSection>
          )}
        </div>

        <div className="card elev-sm items-start gap-3 self-start p-[18px]">
          {project.tags && project.tags.length > 0 && (
            <>
              <div className="text-[11px] font-medium uppercase tracking-[.08em] text-[#b5abfc]">Stack</div>
              <div className="flex flex-wrap items-start gap-1.5">
                {project.tags.map((s) => (
                  <span key={s} className="tag tag-outline whitespace-nowrap">{s}</span>
                ))}
              </div>
              <div className="my-1 h-px w-full" style={{ background: "var(--color-divider)" }} />
            </>
          )}
          <div className="flex w-full flex-wrap gap-2">
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noreferrer" className="btn btn-primary" style={{ padding: "9px 16px" }}>
                View live ↗
              </a>
            )}
            {project.codeUrl && (
              <a href={project.codeUrl} target="_blank" rel="noreferrer" className="btn btn-secondary" style={{ padding: "9px 16px" }}>
                View code ↗
              </a>
            )}
            {project.caseStudyUrl && (
              <a href={project.caseStudyUrl} target="_blank" rel="noreferrer" className="btn btn-ghost" style={{ padding: "9px 6px" }}>
                Read case study →
              </a>
            )}
          </div>
          <a href="mailto:jt.jabonete@gmail.com" className="btn btn-primary btn-block">Ask about this work</a>
        </div>
      </div>

      {prev && next && (
        <div className="mt-10 flex justify-between gap-4 border-t pt-[22px]" style={{ borderColor: "var(--color-divider)" }}>
          <Link href={`/projects/${prev.slug.current}`} className="max-w-[45%] text-left text-[12.5px] font-medium text-[#b5abfc] no-underline">
            ← {prev.title}
          </Link>
          <Link href={`/projects/${next.slug.current}`} className="max-w-[45%] text-right text-[12.5px] font-medium text-[#b5abfc] no-underline">
            {next.title} →
          </Link>
        </div>
      )}

      <div className="mt-8">
        <Link href={`/?panel=inquire&project=${encodeURIComponent(project.title)}`} className="btn btn-ghost">
          Inquire about this project →
        </Link>
      </div>
    </article>
  );
}

function MetaField({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-[10px] font-medium uppercase tracking-[.07em] text-[rgba(233,233,237,.66)]">{label}</span>
      <span className="text-[13px]">{value}</span>
    </div>
  );
}

function CaseSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <div className="mb-2.5 text-[11px] font-medium uppercase tracking-[.08em] text-[rgba(233,233,237,.6)]">{title}</div>
      {children}
    </div>
  );
}
