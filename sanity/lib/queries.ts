import { groq } from "next-sanity";

// Get all destinations
export const getAllDestinationsQuery = groq`*[_type == "destination"] | order(title asc) {
  _id,
  title,
  "slug": slug.current,
  description,
  "coverImage": coverImage.asset->url,
  "mainImage": mainImage.asset->url,
  featured
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

// Get recent posts
export const getRecentPostsQuery = groq`*[_type == "post"] | order(publishedAt desc)[0...3] {
  _id,
  title,
  "slug": slug.current,
  "mainImage": mainImage.asset->url,
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
  publishedAt,
  "author": author->name,
  body,
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
