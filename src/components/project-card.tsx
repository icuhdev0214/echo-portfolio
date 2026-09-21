import Link from "next/link";

import type { Project } from "@/sanity/lib/types";
import { ProjectMedia } from "@/components/project-media";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug.current}`}
      className="card elev-sm group w-[min(340px,76vw)] shrink-0 gap-3 p-[18px] no-underline transition-transform duration-200 ease-out hover:-translate-y-1.5 hover:shadow-[var(--shadow-lg)]"
      style={{ scrollSnapAlign: "start" }}
    >
      <ProjectMedia project={project} />
      <div className="flex items-baseline justify-between gap-2.5">
        <div className="text-[14.5px] font-medium leading-[1.3]">{project.title}</div>
        {project.date && (
          <div className="shrink-0 text-[10.5px] text-[rgba(233,233,237,.66)]">
            {new Date(project.date).getFullYear()}
          </div>
        )}
      </div>
      <div className="text-[11.5px] leading-[1.6] text-[rgba(233,233,237,.66)]">{project.summary}</div>
      {project.headline && (
        <div className="mt-auto text-[11.5px] font-medium text-[#b5abfc]">{project.headline}</div>
      )}
      {project.tags && project.tags.length > 0 && (
        <div className="flex flex-wrap items-start gap-1.5">
          {project.tags.slice(0, 4).map((tag) => (
            <span key={tag} className="tag tag-outline whitespace-nowrap">{tag}</span>
          ))}
        </div>
      )}
    </Link>
  );
}
