import Image from "next/image";

import type { Project } from "@/sanity/lib/types";
import { urlForImage } from "@/sanity/lib/image";
import { getVideoEmbedUrl } from "@/lib/video";

function PlayIcon({ size = 10 }: { size?: number }) {
  return (
    <span
      className="inline-block"
      style={{
        width: 0,
        height: 0,
        borderLeft: `${size}px solid #b5abfc`,
        borderTop: `${size * 0.66}px solid transparent`,
        borderBottom: `${size * 0.66}px solid transparent`,
      }}
    />
  );
}

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
      <div className="aspect-video w-full overflow-hidden rounded-[var(--radius-md)]" style={{ background: "rgba(233,233,237,.05)" }}>
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
      <div className="relative aspect-video w-full overflow-hidden rounded-[var(--radius-md)]" style={{ background: "rgba(233,233,237,.05)" }}>
        <Image
          src={urlForImage(thumbnail).width(800).height(450).url()}
          alt={project.title}
          fill
          className="object-cover"
        />
        {project.videoUrl && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
            <PlayIcon size={13} />
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
        className="flex aspect-video w-full items-center justify-center gap-2 rounded-[var(--radius-md)] text-[11.5px]"
        style={{ background: "rgba(233,233,237,.05)", color: "rgba(233,233,237,.62)" }}
      >
        <PlayIcon /> Watch recording
      </a>
    );
  }

  return (
    <div
      className="flex aspect-video w-full items-center justify-center rounded-[var(--radius-md)] text-[10.5px]"
      style={{ background: "rgba(233,233,237,.05)", color: "rgba(233,233,237,.62)" }}
    >
      screenshot placeholder
    </div>
  );
}
