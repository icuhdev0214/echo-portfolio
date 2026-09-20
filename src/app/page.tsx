import Link from "next/link";

import { ProjectCard } from "@/components/project-card";
import { ContactSection } from "@/components/contact-section";
import { sanityFetch } from "@/sanity/lib/fetch";
import { PROJECTS_QUERY } from "@/sanity/lib/queries";
import type { Project } from "@/sanity/lib/types";

// TODO: replace this scaffold layout with the real markup/styles ported from
// the "Portfolio Prototype Horizontal" Claude Design project once it's
// imported (see plan doc) — this keeps the horizontal-scroll structure so
// swapping in the real design is a styling pass, not a rewrite.
export default async function Home() {
  // Falls back to an empty list if Sanity isn't configured/reachable yet
  // (e.g. a fresh project, or CI building without real credentials) instead
  // of failing the whole page.
  const projects = await sanityFetch<Project[]>({ query: PROJECTS_QUERY }).catch((err) => {
    console.warn("[home] Failed to fetch projects from Sanity:", err);
    return [];
  });

  return (
    <div className="flex flex-1 flex-col">
      <section className="flex flex-col gap-4 px-6 py-24 sm:px-16">
        <h1 className="max-w-2xl text-4xl font-semibold tracking-tight sm:text-5xl">
          Independent developer, available for freelance work.
        </h1>
        <p className="max-w-xl text-lg text-muted-foreground">
          A selection of projects built on my own — scroll through the work,
          then reach out about yours.
        </p>
      </section>

      <section aria-label="Projects" className="flex flex-col gap-6 py-8">
        <h2 className="px-6 text-sm font-medium uppercase tracking-wide text-muted-foreground sm:px-16">
          Projects
        </h2>
        {projects.length > 0 ? (
          <div className="flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-4 sm:px-16">
            {projects.map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))}
          </div>
        ) : (
          <p className="px-6 text-muted-foreground sm:px-16">
            No projects published yet — add one in{" "}
            <Link href="/studio" className="underline">
              the Studio
            </Link>
            .
          </p>
        )}
      </section>

      <ContactSection />
    </div>
  );
}
