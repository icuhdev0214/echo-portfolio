import { defineQuery } from "next-sanity";

export const PROJECTS_QUERY = defineQuery(`
  *[_type == "project"] | order(featured desc, order asc, date desc) {
    _id,
    title,
    slug,
    summary,
    role,
    client,
    date,
    tags,
    images,
    videoUrl,
    liveUrl,
    codeUrl,
    caseStudyUrl,
    featured
  }
`);

export const PROJECT_QUERY = defineQuery(`
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    summary,
    role,
    client,
    date,
    tags,
    images,
    videoUrl,
    liveUrl,
    codeUrl,
    caseStudyUrl,
    featured
  }
`);

export const PROJECT_SLUGS_QUERY = defineQuery(`
  *[_type == "project" && defined(slug.current)][].slug.current
`);
