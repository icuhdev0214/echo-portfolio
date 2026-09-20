import Image from "next/image";
import { Play } from "lucide-react";

import type { Project } from "@/sanity/lib/types";
import { urlForImage } from "@/sanity/lib/image";
import { getVideoEmbedUrl } from "@/lib/video";

export function ProjectMedia({
  project,
  playable = false,
}: {
  project: Project;
  /** Detail view: render a real video embed. Card view: just a thumbnail with a play affordance. */
  playable?: boolean;
}) {
  const thumbnail = project.images?.[0];
  const embedUrl = project.videoUrl ? getVideoEmbedUrl(project.videoUrl) : null;

  if (playable && embedUrl) {
    return (
      <div className="aspect-video w-full overflow-hidden rounded-lg bg-muted">
        <iframe
          src={embedUrl}
          title={`${project.title} video`}
          className="h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  if (thumbnail) {
    return (
      <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-muted">
        <Image
          src={urlForImage(thumbnail).width(800).height(450).url()}
          alt={project.title}
          fill
          className="object-cover"
        />
        {project.videoUrl && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
            <Play className="h-10 w-10 text-white" fill="currentColor" />
          </div>
        )}
      </div>
    );
  }

  if (project.videoUrl) {
    return (
      <a
        href={project.videoUrl}
        target="_blank"
        rel="noreferrer"
        className="flex aspect-video w-full items-center justify-center gap-2 rounded-lg bg-muted text-sm text-muted-foreground hover:text-foreground"
      >
        <Play className="h-5 w-5" /> Watch recording
      </a>
    );
  }

  return <div className="aspect-video w-full rounded-lg bg-muted" />;
}
