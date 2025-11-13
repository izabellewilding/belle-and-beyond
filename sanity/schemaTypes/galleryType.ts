import { defineField, defineType } from "sanity";

export const galleryType = defineType({
  name: "gallery",
  title: "Gallery",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      description: "Image displayed in the gallery directory",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "images",
      title: "Images",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "image",
              title: "Image",
              type: "image",
              options: {
                hotspot: true,
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "alt",
              title: "Alt Text",
              type: "string",
              description: "Descriptive alt text for SEO and accessibility",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "title",
              title: "Image Title",
              type: "string",
              description: "Optional title for the image",
            }),
            defineField({
              name: "photographer",
              title: "Photographer",
              type: "string",
              description: "Name of the photographer",
            }),
          ],
          preview: {
            select: {
              title: "title",
              alt: "alt",
              media: "image",
            },
            prepare({ title, alt, media }) {
              return {
                title: title || alt || "Untitled Image",
                subtitle: alt,
                media,
              };
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "images.0.image",
    },
  },
});
