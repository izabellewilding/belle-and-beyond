import { DocumentTextIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";
import React from "react";

export const postType = defineType({
  name: "post",
  title: "Post",
  type: "document",
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: "title",
      type: "string",
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: {
        source: "title",
      },
    }),
    defineField({
      name: "oldSlugs",
      type: "array",
      title: "Old Slugs (for redirects)",
      description:
        "Previous slugs/URLs for this post. Used to redirect old URLs to the current slug.",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
    }),
    defineField({
      name: "author",
      type: "reference",
      to: { type: "author" },
    }),
    defineField({
      name: "country",
      type: "reference",
      to: { type: "destination" },
      description: "The country/destination this post is about",
      validation: (Rule) =>
        Rule.required().error(
          "Please select a country/destination for this post"
        ),
    }),
    defineField({
      name: "mainImage",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: "alt",
          type: "string",
          title: "Alternative text",
        }),
      ],
    }),
    defineField({
      name: "bannerImage",
      type: "image",
      title: "Banner Image",
      description: "Banner image displayed at the top of the blog post page",
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: "alt",
          type: "string",
          title: "Alternative text",
        }),
      ],
    }),
    defineField({
      name: "categories",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: { type: "category" } })],
    }),
    defineField({
      name: "publishedAt",
      type: "datetime",
    }),
    defineField({
      name: "body",
      type: "blockContent",
    }),
    // Chapter Icons for Table of Contents
    defineField({
      name: "chapterIcons",
      type: "array",
      title: "Chapter Icons",
      description: "Customize icons for H2 headings in the table of contents. The dropdown will show all H2 headings from your blog post.",
      of: [
        defineArrayMember({
          type: "object",
          name: "chapterIcon",
          fields: [
            defineField({
              name: "headingText",
              type: "string",
              title: "Heading Text",
              hidden: true,
            }),
            defineField({
              name: "icon",
              type: "string",
              title: "Icon",
              hidden: true,
            }),
          ],
          components: {
            input: (props: any) => {
              // Dynamically import the custom input component
              const ChapterIconInput = require("../components/ChapterIconInput").ChapterIconInput;
              return <ChapterIconInput {...props} />;
            },
          },
          preview: {
            select: {
              headingText: "headingText",
              icon: "icon",
            },
            prepare({ headingText, icon }) {
              const iconMap: { [key: string]: string } = {
                lightbulb: "💡",
                car: "🚗",
                utensils: "🍴",
                bed: "🏠",
                binoculars: "🔭",
                cloud: "☁️",
                default: "📄",
              };
              return {
                title: headingText || "Select a heading",
                subtitle: icon ? `Icon: ${iconMap[icon] || "📄"}` : "No icon selected",
              };
            },
          },
        }),
      ],
    }),
    // SEO Fields
    defineField({
      name: "seo",
      type: "object",
      title: "SEO Settings",
      description: "Optimize this post for search engines",
      options: {
        collapsible: true,
        collapsed: false,
      },
      fields: [
        defineField({
          name: "metaTitle",
          type: "string",
          title: "SEO Title",
          description:
            "Custom title for search engines (leave empty to use post title). Recommended: 50-60 characters",
          validation: (Rule) =>
            Rule.max(60).warning(
              "SEO titles should be 60 characters or less for best results"
            ),
        }),
        defineField({
          name: "metaDescription",
          type: "text",
          title: "Meta Description",
          description:
            "Brief description for search engines and social sharing. Recommended: 150-160 characters",
          rows: 3,
          validation: (Rule) =>
            Rule.max(160).warning(
              "Meta descriptions should be 160 characters or less for best results"
            ),
        }),
        defineField({
          name: "keywords",
          type: "array",
          title: "Keywords",
          description:
            "Add relevant keywords for this post (e.g., 'travel blog', 'Costa Rica', 'adventure travel')",
          of: [{ type: "string" }],
          options: {
            layout: "tags",
          },
        }),
        defineField({
          name: "focusKeyword",
          type: "string",
          title: "Focus Keyword",
          description:
            "The primary keyword you want this post to rank for (e.g., 'Costa Rica travel guide')",
        }),
        defineField({
          name: "ogTitle",
          type: "string",
          title: "Open Graph Title",
          description:
            "Custom title for social media sharing (leave empty to use SEO title or post title)",
        }),
        defineField({
          name: "ogDescription",
          type: "text",
          title: "Open Graph Description",
          description:
            "Custom description for social media sharing (leave empty to use meta description)",
          rows: 2,
        }),
        defineField({
          name: "ogImage",
          type: "image",
          title: "Open Graph Image",
          description:
            "Custom image for social media sharing (1200x630px recommended). Leave empty to use main image.",
          options: {
            hotspot: true,
          },
        }),
        defineField({
          name: "noindex",
          type: "boolean",
          title: "No Index",
          description:
            "Prevent search engines from indexing this post (use for drafts or private posts)",
          initialValue: false,
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      author: "author.name",
      media: "mainImage",
    },
    prepare(selection) {
      const { author } = selection;
      return { ...selection, subtitle: author && `by ${author}` };
    },
  },
});
