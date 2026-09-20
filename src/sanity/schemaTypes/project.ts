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
      name: "date",
      title: "Date",
      type: "date",
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
