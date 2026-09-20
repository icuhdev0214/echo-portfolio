import Link from "next/link";

import type { Project } from "@/sanity/lib/types";
import { Button } from "@/components/ui/button";
import { ProjectMedia } from "@/components/project-media";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="flex w-[85vw] shrink-0 snap-start flex-col gap-4 sm:w-[420px]">
      <Link href={`/projects/${project.slug.current}`}>
        <ProjectMedia project={project} />
      </Link>
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-semibold">
          <Link href={`/projects/${project.slug.current}`}>{project.title}</Link>
        </h3>
        <p className="text-sm text-muted-foreground">{project.summary}</p>
        {project.tags && project.tags.length > 0 && (
          <ul className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full bg-secondary px-2.5 py-0.5 text-xs text-secondary-foreground"
              >
                {tag}
              </li>
            ))}
          </ul>
        )}
        <div className="mt-2">
          <Button asChild variant="outline" size="sm">
            <Link href={`/?project=${encodeURIComponent(project.title)}#contact`}>
              Inquire about this project
            </Link>
          </Button>
        </div>
      </div>
    </article>
  );
}
