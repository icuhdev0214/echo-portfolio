import type { Image } from "sanity";

export interface Project {
  _id: string;
  title: string;
  slug: { current: string };
  summary: string;
  role?: string;
  client?: string;
  domain?: string;
  date?: string;
  problem?: string;
  approach?: string;
  outcomes?: { value: string; label: string }[];
  headline?: string;
  tags?: string[];
  images?: Image[];
  videoUrl?: string;
  liveUrl?: string;
  codeUrl?: string;
  caseStudyUrl?: string;
  featured?: boolean;
}
