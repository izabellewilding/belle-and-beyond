import { client } from "./client";
import {
  getAllDestinationsQuery,
  getDestinationBySlugQuery,
  getFeaturedDestinationsQuery,
  getAllPostsQuery,
  getAllPostsWithDataQuery,
  getRecentPostsQuery,
  getPostBySlugQuery,
  getPostsByCountryQuery,
  getPostsByCategoryQuery,
  getPostsByCategoriesQuery,
  getAllGalleriesQuery,
  getGalleryBySlugQuery,
} from "./queries";

export async function getAllDestinations() {
  return await client.fetch(getAllDestinationsQuery);
}

export async function getDestinationBySlug(slug: string) {
  return await client.fetch(getDestinationBySlugQuery, { slug });
}

export async function getFeaturedDestinations() {
  return await client.fetch(getFeaturedDestinationsQuery);
}

export async function getAllPosts() {
  try {
    return await client.fetch(getAllPostsQuery);
  } catch (error) {
    console.error("Sanity fetch error:", error);
    return [];
  }
}

export async function getAllPostsWithData() {
  try {
    return await client.fetch(getAllPostsWithDataQuery);
  } catch (error) {
    console.error("Sanity fetch error:", error);
    return [];
  }
}

export async function getRecentPosts() {
  try {
    return await client.fetch(getRecentPostsQuery);
  } catch (error) {
    console.error("Sanity fetch error:", error);
    // Return empty array if Sanity is not available
    return [];
  }
}

export async function getPostBySlug(slug: string) {
  return await client.fetch(getPostBySlugQuery, { slug });
}

export async function getPostsByCountry(countryId: string) {
  return await client.fetch(getPostsByCountryQuery, { countryId });
}

export async function getPostsByCategory(categoryTitle: string) {
  return await client.fetch(getPostsByCategoryQuery, { categoryTitle });
}

export async function getPostsByCategories(categoryTitles: string[]) {
  return await client.fetch(getPostsByCategoriesQuery, { categoryTitles });
}

export async function getAllGalleries() {
  return await client.fetch(getAllGalleriesQuery);
}

export async function getGalleryBySlug(slug: string) {
  return await client.fetch(getGalleryBySlugQuery, { slug });
}
