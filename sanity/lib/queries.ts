import { groq } from "next-sanity";

// Get all destinations
export const getAllDestinationsQuery = groq`*[_type == "destination"] | order(title asc) {
  _id,
  title,
  "slug": slug.current,
  description,
  "coverImage": coverImage.asset->url,
  "mainImage": mainImage.asset->url,
  featured,
  _updatedAt
}`;

// Get a specific destination by slug
export const getDestinationBySlugQuery = groq`*[_type == "destination" && slug.current == $slug][0] {
  _id,
  title,
  "slug": slug.current,
  description,
  "mainImage": mainImage.asset->url,
  "coverImage": coverImage.asset->url,
  content,
  featured,
  publishedAt
}`;

// Get featured destinations
export const getFeaturedDestinationsQuery = groq`*[_type == "destination" && featured == true] | order(title asc) {
  _id,
  title,
  "slug": slug.current,
  description,
  "coverImage": coverImage.asset->url
}`;

// Get all posts (for sitemap)
export const getAllPostsQuery = groq`*[_type == "post"] | order(publishedAt desc) {
  _id,
  "slug": slug.current,
  _updatedAt
}`;

// Get all posts with full data (for blog listing page)
export const getAllPostsWithDataQuery = groq`*[_type == "post"] | order(publishedAt desc) {
  _id,
  title,
  "slug": slug.current,
  "mainImage": mainImage.asset->url + "?w=800&h=600&q=85&auto=format",
  publishedAt,
  "author": author->name,
  "description": pt::text(body[0..2]),
  "categories": categories[]->title
}`;

// Get recent posts
export const getRecentPostsQuery = groq`*[_type == "post"] | order(publishedAt desc, _createdAt desc)[0...3] {
  _id,
  title,
  "slug": slug.current,
  "mainImage": mainImage.asset->url + "?w=800&h=600&q=85&auto=format",
  publishedAt,
  "author": author->name,
  "description": pt::text(body[0..2]),
  "categories": categories[]->title
}`;

// Get a specific post by slug
export const getPostBySlugQuery = groq`*[_type == "post" && slug.current == $slug][0] {
  _id,
  title,
  "slug": slug.current,
  mainImage {
    asset->{_ref, url},
    alt
  },
  bannerImage {
    asset->{_ref, url},
    alt
  },
  publishedAt,
  "author": author->name,
  body,
  seo {
    metaTitle,
    metaDescription,
    keywords,
    focusKeyword,
    ogTitle,
    ogDescription,
    ogImage {
      asset->{_ref, url},
      alt
    },
    noindex
  }
}`;

// Get a post by old slug (for redirects)
export const getPostByOldSlugQuery = groq`*[_type == "post" && $oldSlug in oldSlugs][0] {
  _id,
  "slug": slug.current
}`;

// Get posts by country
export const getPostsByCountryQuery = groq`*[_type == "post" && country._ref == $countryId] | order(publishedAt desc)[0...6] {
  _id,
  title,
  "slug": slug.current,
  "mainImage": mainImage.asset->url,
  publishedAt,
  "author": author->name,
  "country": country->title,
  "description": pt::text(body[0..2]),
  "categories": categories[]->title
}`;

// Get posts by category
export const getPostsByCategoryQuery = groq`*[_type == "post" && $categoryTitle in categories[]->title] | order(publishedAt desc) {
  _id,
  title,
  "slug": slug.current,
  "mainImage": mainImage.asset->url,
  publishedAt,
  "author": author->name,
  "country": country->title,
  "description": pt::text(body[0..2]),
  "categories": categories[]->title
}`;

// Get posts by multiple categories
export const getPostsByCategoriesQuery = groq`*[_type == "post" && count((categories[]->title)[@ in $categoryTitles]) > 0] | order(publishedAt desc) {
  _id,
  title,
  "slug": slug.current,
  "mainImage": mainImage.asset->url,
  publishedAt,
  "author": author->name,
  "country": country->title,
  "description": pt::text(body[0..2]),
  "categories": categories[]->title
}`;

// Get all galleries
export const getAllGalleriesQuery = groq`*[_type == "gallery"] | order(title asc) {
  _id,
  title,
  "slug": slug.current,
  description,
  "coverImage": coverImage.asset->url,
  _updatedAt
}`;

// Get a specific gallery by slug with images
export const getGalleryBySlugQuery = groq`*[_type == "gallery" && slug.current == $slug][0] {
  _id,
  title,
  "slug": slug.current,
  description,
  images[] {
    "src": image.asset->url,
    alt,
    title,
    photographer
  }
}`;
