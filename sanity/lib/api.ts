import { client } from "./client";
import {
  getAllDestinationsQuery,
  getDestinationBySlugQuery,
  getFeaturedDestinationsQuery,
  getRecentPostsQuery,
  getPostBySlugQuery,
  getPostsByCountryQuery,
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
