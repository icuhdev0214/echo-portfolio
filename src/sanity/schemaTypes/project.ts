import { defineField, defineType } from "sanity";

export const project = defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "summary",
      title: "Summary",
      description: "One or two sentences shown on the project card.",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required().max(280),
    }),
    defineField({
      name: "role",
      title: "Role",
      type: "string",
    }),
    defineField({
      name: "client",
      title: "Client",
      description: "Leave blank for personal/self-initiated projects.",
      type: "string",
    }),
    defineField({
      name: "domain",
      title: "Domain",
      description: "One line describing the space, e.g. \"Personal finance\".",
      type: "string",
    }),
    defineField({
      name: "date",
      title: "Date",
      type: "date",
    }),
    defineField({
      name: "problem",
      title: "Problem",
      description: "Case study: what problem the project solved.",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "approach",
      title: "Approach",
      description: "Case study: how it was built.",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "outcomes",
      title: "Outcomes",
      description: "Case study: headline metrics, e.g. \"4\" / \"platforms from one codebase\".",
      type: "array",
      of: [
        {
          type: "object",
          name: "outcome",
          fields: [
            defineField({ name: "value", title: "Value", type: "string", validation: (rule) => rule.required() }),
            defineField({ name: "label", title: "Label", type: "string", validation: (rule) => rule.required() }),
          ],
          preview: {
            select: { value: "value", label: "label" },
            prepare: ({ value, label }) => ({ title: `${value} — ${label}` }),
          },
        },
      ],
    }),
    defineField({
      name: "headline",
      title: "Headline",
      description: "Short accent-colored one-liner shown on the project card, e.g. \"One codebase, four platforms, thirteen admin modules\".",
      type: "string",
    }),
    defineField({
      name: "tags",
      title: "Tags / Skills",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({
      name: "images",
      title: "Screenshots",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    }),
    defineField({
      name: "videoUrl",
      title: "Video / screen recording URL",
      description:
        "Link to a YouTube (unlisted), Vimeo, or Loom recording of the project in action.",
      type: "url",
    }),
    defineField({
      name: "liveUrl",
      title: "Live URL",
      type: "url",
    }),
    defineField({
      name: "codeUrl",
      title: "Code URL",
      type: "url",
    }),
    defineField({
      name: "caseStudyUrl",
      title: "Case study URL",
      description: "Optional link to a longer write-up.",
      type: "url",
    }),
    defineField({
      name: "featured",
      title: "Featured",
      description: "Show near the top of the horizontal project list.",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "order",
      title: "Sort order",
      type: "number",
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "client", media: "images.0" },
  },
});
