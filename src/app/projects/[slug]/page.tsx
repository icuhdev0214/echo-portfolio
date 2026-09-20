import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Button } from "@/components/ui/button";
import { ProjectMedia } from "@/components/project-media";
import { sanityFetch } from "@/sanity/lib/fetch";
import { urlForImage } from "@/sanity/lib/image";
import { PROJECT_QUERY, PROJECT_SLUGS_QUERY } from "@/sanity/lib/queries";
import type { Project } from "@/sanity/lib/types";

export async function generateStaticParams() {
  const slugs = await sanityFetch<string[]>({ query: PROJECT_SLUGS_QUERY }).catch((err) => {
    console.warn("[projects/slug] Failed to fetch slugs from Sanity:", err);
    return [];
  });
  return slugs.map((slug) => ({ slug }));
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await sanityFetch<Project | null>({
    query: PROJECT_QUERY,
    params: { slug },
  });

  if (!project) notFound();

  return (
    <article className="mx-auto flex w-full max-w-3xl flex-col gap-8 px-6 py-16 sm:px-0">
      <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
        &larr; Back to projects
      </Link>

      <header className="flex flex-col gap-3">
        <h1 className="text-3xl font-semibold tracking-tight">{project.title}</h1>
        <p className="text-lg text-muted-foreground">{project.summary}</p>
        <dl className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-muted-foreground">
          {project.role && (
            <div className="flex gap-1">
              <dt className="font-medium text-foreground">Role:</dt>
              <dd>{project.role}</dd>
            </div>
          )}
          {project.client && (
            <div className="flex gap-1">
              <dt className="font-medium text-foreground">Client:</dt>
              <dd>{project.client}</dd>
            </div>
          )}
          {project.date && (
            <div className="flex gap-1">
              <dt className="font-medium text-foreground">Date:</dt>
              <dd>{new Date(project.date).toLocaleDateString()}</dd>
            </div>
          )}
        </dl>
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
      </header>

      <ProjectMedia project={project} playable />

      {project.images && project.images.length > 1 && (
        <div className="grid grid-cols-2 gap-4">
          {project.images.slice(1).map((image, i) => (
            <div key={i} className="relative aspect-video overflow-hidden rounded-lg bg-muted">
              <Image
                src={urlForImage(image).width(800).height(450).url()}
                alt={`${project.title} screenshot ${i + 2}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
      )}

      <div className="flex flex-wrap gap-3">
        {project.liveUrl && (
          <Button asChild>
            <a href={project.liveUrl} target="_blank" rel="noreferrer">
              View live
            </a>
          </Button>
        )}
        {project.codeUrl && (
          <Button asChild variant="outline">
            <a href={project.codeUrl} target="_blank" rel="noreferrer">
              View code
            </a>
          </Button>
        )}
        {project.caseStudyUrl && (
          <Button asChild variant="outline">
            <a href={project.caseStudyUrl} target="_blank" rel="noreferrer">
              Case study
            </a>
          </Button>
        )}
        <Button asChild variant="ghost">
          <Link href={`/?project=${encodeURIComponent(project.title)}#contact`}>
            Inquire about this project
          </Link>
        </Button>
      </div>
    </article>
  );
}
