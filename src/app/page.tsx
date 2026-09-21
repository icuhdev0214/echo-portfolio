import { Suspense } from "react";

import { HomeExperience } from "@/components/home/home-experience";
import { sanityFetch } from "@/sanity/lib/fetch";
import { PROJECTS_QUERY } from "@/sanity/lib/queries";
import type { Project } from "@/sanity/lib/types";
import { FALLBACK_PROJECTS } from "@/lib/fallback-projects";

export default async function Home() {
  // Falls back to demo projects if Sanity isn't configured/reachable yet or
  // has no real content — real Sanity content always takes priority once it
  // exists.
  const projects = await sanityFetch<Project[]>({ query: PROJECTS_QUERY }).catch((err) => {
    console.warn("[home] Failed to fetch projects from Sanity:", err);
    return [];
  });

  return (
    <Suspense fallback={null}>
      <HomeExperience projects={projects.length > 0 ? projects : FALLBACK_PROJECTS} />
    </Suspense>
  );
}
